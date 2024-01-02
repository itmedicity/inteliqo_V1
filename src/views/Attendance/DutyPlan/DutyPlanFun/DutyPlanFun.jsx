import { eachDayOfInterval } from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";

export const planInitialState = {
    FROM_DATE: "FROM_DATE",
    TO_DATE: "TO_DATE",
    DEPT_NAME: "DEPT_NAME",
    DEPT_SEC_NAME: "DEPT_SEC_NAME",
}

const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState;

export const dutyPlanInitialState = {
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    deptName: 0,
    deptSecName: 0
}

export const dutyPlanReducer = (state = dutyPlanInitialState, action) => {
    switch (action.type) {
        case FROM_DATE:
            return { ...state, fromDate: action.from };
        case TO_DATE:
            return { ...state, toDate: action.to };
        case DEPT_NAME:
            return { ...state, deptName: action.deptSlno };
        case DEPT_SEC_NAME:
            return { ...state, deptSecName: action.deptSecSlno };
        default:
            return state;
    }
}

//get employee details 
export const getEmployeeDetlDutyPlanBased = async (postData) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post("/plan/empdetl", postData);
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }
    } else {
        return { ...dataObj, status: 0, data: [] }
    }
}

const getDutyPlanDetl = async (getDateOnly, emplyeeDetl) => {
    const getDutyPlanDetl = await axioslogin.post("/plan/planDetl", getDateOnly);
    const { success, data } = getDutyPlanDetl.data;
    if (success === 1) {
        if (Object.keys(data).length > 0) {
            let planObj = { emp_id: 0, em_no: 0, emp_name: "", plan: [] }

            return emplyeeDetl.map((values, index) => {
                return {
                    ...planObj,
                    emp_id: values.em_id,
                    em_no: values.em_no,
                    emp_name: values.em_name,
                    plan: [...planObj.plan, data.filter((val) => val.emp_id === values.em_id ? val : null)]
                }
            })
        }
    } else {
        return null
    }

}

// duty plan insert function

export const dutyPlanInsertFun = async (formData, commonSettings, holidayList, employeeDetl, deptShift) => {
    let message = { status: 0, message: '', data: [], dateFormat: [] };
    const { notapplicable_shift, default_shift } = commonSettings;
    const { fromDate, toDate, deptName, deptSecName } = formData;
    const { status, data } = holidayList;

    const departmentDetl = {
        em_department: deptName,
        em_dept_section: deptSecName,
    }

    let holidayFilterList = []; // filter holidays based on from to dates
    let employeeDetails; //new object based on employee details

    if (status === 1) {
        holidayFilterList = data?.map((values) => {
            return values.hld_date >= fromDate && values.hld_date <= toDate ? values : null;
        }).filter((val) => val !== null);
    } else {
        return { ...message, status: 0, message: 'Holiday List Not Updated', data: [] }
    }

    // return planState;
    employeeDetails = employeeDetl?.map((val) => {
        return {
            desg_name: val.desg_name,
            em_id: val.em_id,
            em_name: val.em_name,
            em_no: val.em_no,
            em_doj: val.contract_status === 1 ? val.em_cont_start : val.em_doj
        }
    })

    if (Object.keys(employeeDetails).length > 0) {

        const checkingForShiftMapped = await axioslogin.post("/departmentshift/checkshift", departmentDetl);
        const { successs } = checkingForShiftMapped.data
        if (successs === 1) {

            //finding the dates between start date and end date
            const dateRange = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) });
            //date format for top Head
            const dateAndDayFormat = dateRange.map((val) => {
                return { date: moment(val).format('MMM-D'), sunday: moment(val).format('d'), days: moment(val).format('ddd') }
            });

            const addHolidayToDateRange = (values) => {
                const holidayDate = holidayFilterList.find((val) => moment(val.hld_date).format('MMM-D') === values.date)
                if (holidayDate !== undefined) {
                    return {
                        date: values.date,
                        sunday: values.sunday,
                        days: values.days,
                        holiday: 1,
                        holidayDays: holidayDate.hld_desc
                    }
                } else {
                    return {
                        date: values.date,
                        sunday: values.sunday,
                        days: values.days,
                        holiday: 0,
                        holidayDays: null
                    }
                }
            }

            const newDateRange = dateAndDayFormat.map(addHolidayToDateRange)

            //duty plan date range
            const dutyPlanDateRange = dateRange?.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } });

            //getting employee id from employee details - date fomat --> {date: '2022-10-01'} 
            const employeeId = (await employeeDetails) && employeeDetails.map((val) => val.em_id);

            //hrm_duty_plan insert initial array data making
            const shiftDutyDay = await employeeDetails.map((val) => {
                return dutyPlanDateRange.map((value) => {
                    return { date: value.date, emp_id: val.em_id, doj: val.em_doj, em_no: val.em_no }
                })
            }).flat(Infinity)

            //add the holiday details into the shift plan array
            const holidayFilterFun = (values) => {
                const holiday = holidayFilterList.find((val) => val.hld_date === values.date)
                if (holiday !== undefined) {
                    return {
                        date: values.date,
                        emp_id: values.emp_id,
                        em_no: values.em_no,
                        shift: values.date >= values.doj ? default_shift : notapplicable_shift,
                        holidayStatus: 1,
                        holidayName: holiday.hld_desc,
                        holidaySlno: holiday.hld_slno
                    }
                } else {
                    return {
                        date: values.date,
                        emp_id: values.emp_id,
                        em_no: values.em_no,
                        shift: values.date >= values.doj ? default_shift : notapplicable_shift,
                        holidayStatus: 0,
                        holidayName: null,
                        holidaySlno: 0
                    }
                }
            }

            //checking wheher duty plan is already inserted in these dates
            const postDate = {
                start_date: moment(fromDate).format('YYYY-MM-DD'),
                end_date: moment(toDate).format('YYYY-MM-DD'),
                empData: employeeId
            }

            const result = await axioslogin.post("/plan/check", postDate)
            const { success, data } = result.data;

            const getDateOnly = {
                start_date: moment(fromDate).format('YYYY-MM-DD'),
                end_date: moment(toDate).format('YYYY-MM-DD'),
            }

            if (success === 1) {
                /******** If duty plan is already inserted *********/

                if (default_shift === null || notapplicable_shift === null) {
                    return { ...message, status: 0, message: 'Default and Not Applicable Shift Not Mapped', data: [] }
                } else {
                    // after the holiday inserted duty day array
                    const insertDutyPlanArray = await shiftDutyDay.map(holidayFilterFun);

                    //filtering the data from the data base and inserting dates and finding the new array to insert
                    /***
                     * filtering the data from the database if the all date have the shift id inserted or not 
                     * if no shift id in that date filter that date and return a new array
                     * if all date have the shift id then blank array will return
                     */

                    const newFilterdArray = insertDutyPlanArray.filter((val) => {
                        return data.filter((data) => {
                            return val.emp_id === data.emp_id && val.date === moment(data.duty_day).format('YYYY-MM-DD')
                        }).length === 0
                    })

                    if (newFilterdArray.length === 0) {
                        // no Date with out duty plan in the database 
                        return getDutyPlanDetl(getDateOnly, employeeDetails).then((values) => {
                            return { ...message, status: 1, message: 'Duty Plan Inserted', data: values, dateFormat: newDateRange }
                        })

                    } else {
                        //date with out duty plan - need to insert the default duty plans
                        const insertDutyPlainIntDB = await axioslogin.post("/plan/insert", newFilterdArray)
                        const { success1 } = insertDutyPlainIntDB.data;
                        if (success1 === 1) {
                            //duty plan inserted 
                            return getDutyPlanDetl(getDateOnly, employeeDetails).then((values) => {
                                return { ...message, status: 1, message: 'Pending Duty Plan Inserted', data: values, dateFormat: newDateRange }
                            })

                        } else {
                            return { ...message, status: 0, message: 'Error Updating Duty Plan', data: [] }
                        }
                    }
                }
            }
            else {
                /******** if not excist  **********/
                if (default_shift === null || notapplicable_shift === null) {
                    return { ...message, status: 0, message: 'Default and Not Applicable Shift Not Mapped', data: [] }
                } else {
                    // after the holiday inserted duty day array
                    const insertDutyPlanArray = await shiftDutyDay.map(holidayFilterFun);

                    //duty plan inserting function
                    const insertDutyPlainIntDB = await axioslogin.post("/plan/insert", insertDutyPlanArray)
                    const { success1 } = insertDutyPlainIntDB.data;
                    if (success1 === 1) {
                        //duty plan inserted 
                        return getDutyPlanDetl(getDateOnly, employeeDetails).then((values) => {
                            return { ...message, status: 1, message: 'initial Inserting Duty Plan', data: values, dateFormat: newDateRange }
                        })

                    } else {
                        return { ...message, status: 0, message: 'Error initial Inserting Duty Plan', data: [] }
                    }
                }
            }

        } else {
            return { ...message, status: 0, message: 'Shift Mapping is Not Done For This Department Section', data: [] }
        }
    } else {
        return { ...message, status: 0, message: 'There Is No Employees Under This Department Section', data: [] }
    }
}