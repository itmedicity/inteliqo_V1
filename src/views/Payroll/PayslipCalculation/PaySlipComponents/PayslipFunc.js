import { eachDayOfInterval } from "date-fns"
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios"

export const getEmployeeData = async (postData) => {

    const result = await axioslogin.post("/payrollprocess/getPayslip/data", postData)
    if (result.data.success === 1) {
        return { status: 1, empData: result.data.data }
    } else {
        return { status: 0, empData: [] }
    }

}

export const getAllEarnByDept = async (checkdatas) => {
    const result = await axioslogin.post("/payrollprocess/allData", checkdatas)
    if (result.data.success === 1) {
        return { status: 1, earnData: result.data.data }
    } else {
        return { status: 0, earnData: [] }
    }
}

export const getPunchdata = async (postData) => {
    const result = await axioslogin.post("/payrollprocess/duty/data", postData)
    if (result.data.success === 1) {
        return { status: 1, punchData: result.data.data }
    } else {
        return { status: 0, punchData: [] }
    }
}

// export const dutyData = async (formData, commonSettings, holidayList, employeeDetl) => {
//     let message = { status: 0, message: '', data: [], dateFormat: [], empData: [] };
//     const { notapplicable_shift, default_shift, week_off_day } = commonSettings;
//     const { fromDate, toDate, deptName, deptSecName } = formData;
//     const { status, data } = holidayList;

//     const departmentDetl = {
//         em_department: deptName,
//         em_dept_section: deptSecName,
//     }

//     const postData = {
//         dept_id: deptName,
//         sect_id: deptSecName
//     }

//     let holidayFilterList = []; // filter holidays based on from to dates
//     let employeeDetails; //new object based on employee details

//     if (status === 1) {
//         holidayFilterList = data && data.map((values) => {
//             return values.hld_date >= fromDate && values.hld_date <= toDate ? values : null;
//         }).filter((val) => val !== null);
//     } else {
//         return { ...message, status: 0, message: 'Holiday List Not Updated', data: [] }
//     }

//     // return planState;
//     employeeDetails = employeeDetl.map((val) => {
//         return {
//             em_id: val.em_id,
//             em_name: val.em_name,
//             em_no: val.em_no,
//             em_doj: val.contract_status === 1 ? val.em_cont_start : val.em_doj
//         }
//     })
//     if (Object.keys(employeeDetails).length > 0) {
//         const checkingForShiftMapped = await axioslogin.post("/departmentshift/checkshift", departmentDetl)
//         const { successs } = checkingForShiftMapped.data
//         if (successs === 1) {
//             //finding the dates between start date and end date
//             const dateRange = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) });
//             //date format for top Head
//             const dateAndDayFormat = dateRange.map((val) => {
//                 return { date: moment(val).format('MMM-D'), sunday: moment(val).format('d'), days: moment(val).format('ddd') }
//             });
//             const addHolidayToDateRange = (values) => {
//                 const holidayDate = holidayFilterList.find((val) => moment(val.hld_date).format('MMM-D') === values.date)
//                 if (holidayDate !== undefined) {
//                     return {
//                         date: values.date,
//                         sunday: values.sunday,
//                         days: values.days,
//                         holiday: 1,
//                         holidayDays: holidayDate.hld_desc
//                     }
//                 } else {
//                     return {
//                         date: values.date,
//                         sunday: values.sunday,
//                         days: values.days,
//                         holiday: 0,
//                         holidayDays: null
//                     }
//                 }
//             }
//             const newDateRange = dateAndDayFormat.map(addHolidayToDateRange)

//             //duty plan date range
//             const dutyPlanDateRange = dateRange.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } });

//             //getting employee id from employee details - date fomat --> {date: '2022-10-01'}
//             const employeeId = await employeeDetails && employeeDetails.map((val) => val.em_id);

//             //hrm_duty_plan insert initial array data making
//             const shiftDutyDay = await employeeDetails.map((val) => {
//                 return dutyPlanDateRange.map((value) => {
//                     return { date: value.date, emp_id: val.em_id, doj: val.em_doj, em_no: val.em_no }
//                 })
//             }).flat(Infinity)

//             //add the holiday details into the shift plan array
//             const holidayFilterFun = (values) => {
//                 const holiday = holidayFilterList.find((val) => val.hld_date === values.date)
//                 if (holiday !== undefined) {
//                     return {
//                         date: values.date,
//                         emp_id: values.emp_id,
//                         em_no: values.em_no,
//                         shift: values.date >= values.doj ? default_shift : notapplicable_shift,
//                         holidayStatus: 1,
//                         holidayName: holiday.hld_desc,
//                         holidaySlno: holiday.hld_slno
//                     }
//                 } else {
//                     return {
//                         date: values.date,
//                         emp_id: values.emp_id,
//                         em_no: values.em_no,
//                         shift: values.date >= values.doj ? default_shift : notapplicable_shift,
//                         holidayStatus: 0,
//                         holidayName: null,
//                         holidaySlno: 0
//                     }
//                 }
//             }

//             //checking wheher duty plan is already inserted in these dates
//             const postDate = {
//                 start_date: moment(fromDate).format('YYYY-MM-DD'),
//                 end_date: moment(toDate).format('YYYY-MM-DD'),
//                 empData: employeeId
//             }

//             const result = await axioslogin.post("/payrollprocess/duty/data", postDate)
//             const { success, data } = result.data;


//             if (default_shift === null || notapplicable_shift === null) {
//                 return { ...message, status: 0, message: 'Default and Not Applicable Shift Not Mapped', data: [] }
//             } else if (data.length === 0) {
//                 return { ...message, status: 0, message: 'Duty Plan is done for this Department!', data: [] }
//             }
//             else {
//                 //     // after the holiday inserted duty day array
//                 //     const insertDutyPlanArray = await shiftDutyDay.map(holidayFilterFun);
//                 console.log(data);

//                 const offdays = newDateRange?.filter(item => item.days === "Sun")

//                 const newFun = (val) => {
//                     const tot_days = dutyPlanDateRange.length
//                     var workdays = (data?.filter(item => val.em_id === item.emp_id).reduce((acc, curr) => acc + (curr.duty_status), 0));
//                     var leaves = (data?.filter(item => val.em_id === item.emp_id).reduce((acc, curr) => acc + (curr.leave_status), 0));
//                     var holiday_worked = (data?.filter(item => val.em_id === item.emp_id).reduce((acc, curr) => acc + (curr.holiday_status), 0));

//                     return {

//                         ...val,
//                         "array": data?.filter(item => val.em_id === item.emp_id),
//                         "tot_days": tot_days,
//                         "workdays": workdays,
//                         "offdays": offdays.length,
//                         "leaves": leaves,
//                         "holiday": holidayFilterList.length,
//                         "holiday_worked": holiday_worked
//                     }
//                 }
//                 const newEmp = employeeDetails?.map(newFun)

//                 console.log(newEmp);
//                 return { ...message, status: 1, message: 'data added', data: newEmp, dateFormat: newDateRange, empData: employeeDetails }
//             }
//         }
//         else {
//             return { ...message, status: 0, message: 'Shift Mapping is Not Done For This Department Section', data: [] }
//         }
//     }
//     else {
//         return { ...message, status: 0, message: 'There Is No Employees Under This Department Section', data: [] }
//     }

// }