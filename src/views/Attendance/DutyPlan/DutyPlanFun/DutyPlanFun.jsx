import { eachDayOfInterval } from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";

export const planInitialState = {
    FROM_DATE: "FROM_DATE",
    TO_DATE: "TO_DATE",
    DEPT_NAME: "DEPT_NAME",
    DEPT_SEC_NAME: "DEPT_SEC_NAME"
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
    const result = await axioslogin.post("/plan/create", postData);
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }
    } else {
        return { ...dataObj, status: 0, data: [] }
    }
}



// duty plan insert function

export const dutyPlanInsertFun = async (formData, commonSettings, holidayList, employeeDetl, deptShift) => {
    let message = { status: 0, message: '', data: [] };
    const { notapplicable_shift, default_shift, week_off_day } = commonSettings;
    const { fromDate, toDate, deptName, deptSecName } = formData;
    const { status, data } = holidayList;

    const departmentDetl = {
        em_department: deptName,
        em_dept_section: deptSecName,
    }

    const postData = {
        dept_id: deptName,
        sect_id: deptSecName
    }

    let holidayFilterList; // filter holidays based on from to dates
    let employeeDetails; //new object based on employee details

    if (status === 1) {
        holidayFilterList = data && data.map((values) => {
            return values.hld_date >= fromDate && values.hld_date <= toDate ? values : null;
        }).filter((val) => val !== null);
    } else {
        return { ...message, status: 0, message: 'Holiday List Not Updated', data: [] }
    }
    // return planState;

    employeeDetails = employeeDetl.map((val) => {
        return {
            desg_name: val.desg_name,
            em_id: val.em_id,
            em_name: val.em_name,
            em_no: val.em_no,
            em_doj: val.contract_status === 1 ? val.em_cont_start : val.em_doj
        }
    }).filter((val) => val.em_id === 144)

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

            //duty plan date range
            const dutyPlanDateRange = dateRange.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } });

            //getting employee id from employee details - date fomat --> {date: '2022-10-01'} 
            const employeeId = await employeeDetails && employeeDetails.map((val) => val.em_id);

            //hrm_duty_plan insert initial array data making
            const shiftDutyDay = await employeeDetails.map((val) => {
                return dutyPlanDateRange.map((value) => {
                    return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
                })
            }).flat(Infinity)

            // initital array -> add the default and not applicabele shift based on date of join
            const insertDutyPlanArray = await shiftDutyDay.map((val) => {
                return holidayFilterList.map((values) => {
                    if (values.hld_date === val.date) {
                        return {
                            date: val.date,
                            emp_id: val.emp_id,
                            shift: val.date >= val.doj ? default_shift : notapplicable_shift,
                            holidayStatus: values.hld_date === val.date ? 1 : 0,
                            holidayName: values.hld_date === val.date ? values.hld_desc : null,
                            holidaySlno: values.hld_date === val.date ? values.hld_slno : 0
                        }
                    }
                    else {
                        return null
                    }
                })
                return {
                    date: val.date,
                    emp_id: val.emp_id,
                    shift: val.date >= val.doj ? default_shift : notapplicable_shift
                }
            })

            console.log(insertDutyPlanArray)
            // console.log(holidayFilterList)

            //checking wheher duty plan is already inserted in these dates
            const postDate = {
                start_date: moment(fromDate).format('YYYY-MM-DD'),
                end_date: moment(toDate).format('YYYY-MM-DD'),
                empData: employeeId
            }

            const result = await axioslogin.post("/plan/check", postDate)
            const { success, data } = result.data;

            if (success === 1) {
                /******** If duty plan is already inserted *********/

            } else {
                /******** if not excist  **********/





            }

        } else {
            return { ...message, status: 0, message: 'Shift Mapping is Not Done For This Department Section', data: [] }
        }
    } else {
        return { ...message, status: 0, message: 'There Is No Employees Under This Department Section', data: [] }
    }
}