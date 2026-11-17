import { format, getDaysInMonth, startOfMonth } from "date-fns"
import { axioslogin } from "src/views/Axios/Axios"

export const employeeEarnDeduction = async (getEmpData) => {
    let dataObj = { status: 0, data: [] }
    const result1 = await axioslogin.post("/payrollprocess/empDeduction", getEmpData)
    const { data, success } = result1.data
    if (success === 1 || success === 2) {
        return { ...dataObj, status: 1, data: data }
    } else {
        return { ...dataObj, status: 0, data: [] }
    }
}

export const getAllPunchmastData = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
    const { data, success } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }
    } else if (success === 0) {
        return { ...dataObj, status: 0, data: [] }
    }
    else {
        return { ...dataObj, status: 0, data: [] }
    }
}


// export const attendnaceCountCalculationFunc = async (employeeData, deductData, data, value, commonSettings) => {

//       const apprenticeshipCash=deductData?.filter((value) => value?.em_salary_desc === commonSettings?.apprenticeship_type)
//       const finalDataArry = employeeData?.map((val) => {
        
//         const empwise = data?.filter((value) => value.emp_id === val.em_id)

//         const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
//         const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
//         const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length
//         const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

//         const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

//       const apprenticeshipDeductAmount= (apprenticeshipCash?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

//         const npsamount = val.nps === 1 ? val.npsamount : 0
//         const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

//         const onedaySalary = (val?.gross_salary - apprenticeshipDeductAmount)/ getDaysInMonth(new Date(value))

//         const workday =
//             (empwise?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
//                 val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
//                 val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
//                 val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
//                 val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
//                 val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length

//         const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

//         const totalDays = getDaysInMonth(new Date(value))
//         const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0;
//         const totalPayday = workday + (totalHD * 0.5)
//         const totallopCount = totalDays - totalPayday;
//         const lopamount = totallopCount * ((val?.gross_salary - apprenticeshipDeductAmount)/ totalDays);
//        // const totalSalary = Number(val.gross_salary).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2) - Number(deductValue).toFixed(2) - Number(lopamount).toFixed(2)
//         const totalSalary = Number(val.gross_salary-apprenticeshipDeductAmount).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2)  - Number(lopamount).toFixed(2)

//         return {
//             em_no: val.em_no,
//             em_name: val.em_name,
//             branch_name: val.branch_name,
//             dept_name: val.dept_name,
//             sect_name: val.sect_name,
//             ecat_name: val.ecat_name,
//             desg_name: val.desg_name,
//             inst_emp_type: val.inst_emp_type,
//             empSalary: val.gross_salary,
//             em_account_no: val.em_account_no,
//             em_ifsc: val.em_ifsc,
//             totalDays: getDaysInMonth(new Date(value)),
//             totalLeaves: totalLV,
//             totalHoliday: totalH,
//             totallopCount: totalPayday === 0 ? getDaysInMonth(new Date(value)) : totallopCount,
//             holidayworked: totalHP,
//             totalHD: totalHD,
//             totalLC: totalLC,
//             paydays: totalPayday,
//             lopAmount: Math.round(onedaySalary * totallopCount),
//             npsamount: npsamount,
//             lwfamount: lwfamount,
//             holidaySalary: Math.round(holidaysalary),
//             deductValue: deductValue,
//             totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary),
//             branch_slno: val.branch_slno,
//             category_slno: val.category_slno,
//             dept_id: val.dept_id,
//             desg_slno: val.desg_slno,
//             em_id: val.em_id,
//             inst_slno: val.inst_slno,
//             sect_id: val.sect_id,
//             processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
//         }
//     })
//     return { data: finalDataArry, status: 1 }
// }

// export const attendnaceCountCalculationFunc = async (employeeData, deductData, data, value, commonSettings) => {

//     const finalDataArry = employeeData?.map((val) => {
        
//         const empwise = data?.filter((value) => value.emp_id === val.em_id)

//         const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
//         const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
//         const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length
//         const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

//         const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

//         const npsamount = val.nps === 1 ? val.npsamount : 0
//         const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

//         const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

//         const workday =
//             (empwise?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
//                 val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
//                 val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
//                 val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
//                 val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
//                 val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length

//         const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

//         const totalDays = getDaysInMonth(new Date(value))
//         const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0;
//         const totalPayday = workday + (totalHD * 0.5)
//         const totallopCount = totalDays - totalPayday;
//         const lopamount = totallopCount * (val.gross_salary / totalDays);
//         const totalSalary = Number(val.gross_salary).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2) - Number(deductValue).toFixed(2) - Number(lopamount).toFixed(2)

//         return {
//             em_no: val.em_no,
//             em_name: val.em_name,
//             branch_name: val.branch_name,
//             dept_name: val.dept_name,
//             sect_name: val.sect_name,
//             ecat_name: val.ecat_name,
//             desg_name: val.desg_name,
//             inst_emp_type: val.inst_emp_type,
//             empSalary: val.gross_salary,
//             em_account_no: val.em_account_no,
//             em_ifsc: val.em_ifsc,
//             totalDays: getDaysInMonth(new Date(value)),
//             totalLeaves: totalLV,
//             totalHoliday: totalH,
//             totallopCount: totalPayday === 0 ? getDaysInMonth(new Date(value)) : totallopCount,
//             holidayworked: totalHP,
//             totalHD: totalHD,
//             totalLC: totalLC,
//             paydays: totalPayday,
//             lopAmount: Math.round(onedaySalary * totallopCount),
//             npsamount: npsamount,
//             lwfamount: lwfamount,
//             holidaySalary: Math.round(holidaysalary),
//             deductValue: deductValue,
//             totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary),
//             branch_slno: val.branch_slno,
//             category_slno: val.category_slno,
//             dept_id: val.dept_id,
//             desg_slno: val.desg_slno,
//             em_id: val.em_id,
//             inst_slno: val.inst_slno,
//             sect_id: val.sect_id,
//             processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
//         }
//     })
//     return { data: finalDataArry, status: 1 }
// }
// export const attendnaceCountCalculationFunc = async (employeeData, deductData, data, value, commonSettings) => {

//     const finalDataArry = employeeData?.map((val) => {
        
//         const empwise = data?.filter((value) => value.emp_id === val.em_id)

//         const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
//         const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
//         const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length
//         const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

//         const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

//         const npsamount = val.nps === 1 ? val.npsamount : 0
//         const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

//         const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

//         const workday =
//             (empwise?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
//                 val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
//                 val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
//                 val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
//                 val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
//                 val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length

//         const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

//         const totalDays = getDaysInMonth(new Date(value))
//         const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0;
//         const totalPayday = workday + (totalHD * 0.5)
//         const totallopCount = totalDays - totalPayday;
//         const lopamount = totallopCount * (val.gross_salary / totalDays);
//         const totalSalary = Number(val.gross_salary).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2) - Number(deductValue).toFixed(2) - Number(lopamount).toFixed(2)

//         return {
//             em_no: val.em_no,
//             em_name: val.em_name,
//             branch_name: val.branch_name,
//             dept_name: val.dept_name,
//             sect_name: val.sect_name,
//             ecat_name: val.ecat_name,
//             desg_name: val.desg_name,
//             inst_emp_type: val.inst_emp_type,
//             empSalary: val.gross_salary,
//             em_account_no: val.em_account_no,
//             em_ifsc: val.em_ifsc,
//             totalDays: getDaysInMonth(new Date(value)),
//             totalLeaves: totalLV,
//             totalHoliday: totalH,
//             totallopCount: totalPayday === 0 ? getDaysInMonth(new Date(value)) : totallopCount,
//             holidayworked: totalHP,
//             totalHD: totalHD,
//             totalLC: totalLC,
//             paydays: totalPayday,
//             lopAmount: Math.round(onedaySalary * totallopCount),
//             npsamount: npsamount,
//             lwfamount: lwfamount,
//             holidaySalary: Math.round(holidaysalary),
//             deductValue: deductValue,
//             totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary),
//             branch_slno: val.branch_slno,
//             category_slno: val.category_slno,
//             dept_id: val.dept_id,
//             desg_slno: val.desg_slno,
//             em_id: val.em_id,
//             inst_slno: val.inst_slno,
//             sect_id: val.sect_id,
//             processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
//         }
//     })
//     return { data: finalDataArry, status: 1 }
// }

export const attendnaceCountCalculationFunc = async (
  employeeData,
  deductData,
  data,
  value,
  commonSettings
) => {

  // Get the total number of days in the selected month
  const totalDays = getDaysInMonth(new Date(value));

  // Get the first date of the selected month in YYYY-MM-DD format
  const processedMonth = format(
    startOfMonth(new Date(value)),
    'yyyy-MM-dd'
  );

  // Leave types that are considered as working/payable days
  const leaveTypes = new Set([
    'P',
    'WOFF',
    'COFF',
    'NOFF',
    'DOFF',
    'SL',
    'HP',
    'CL',
    'EL',
    'H',
    'OHP',
    'ODP',
    'OBS',
    'LC'
  ]);

  // Leave types counted as full-day leaves
  const leaveCountTypes = new Set([
    'SL',
    'CL',
    'COFF',
    'EL'
  ]);

  // Leave types that are considered as half-day
  const halfDayTypes = new Set([
    'HD',
    'CHD',
    'EGHD',
    'HDSL',
    'HDCL'
  ]);

  // Get only apprenticeship-related deduction records
  const apprenticeshipCash = deductData?.filter(
    item =>
      item?.em_salary_desc === commonSettings?.apprenticeship_type
  ) || [];

  // Calculate salary details for each employee
  const finalDataArray = employeeData?.map(employee => {

    // Get attendance/leave records belonging to the current employee
    const empwise = data?.filter(
      item => item?.emp_id === employee?.em_id
    ) || [];

    // Count holidays for the employee
    const totalH = empwise.filter(
      item => item?.holiday_status === 1
    ).length;

    // Count full-day leaves
    const totalLV = empwise.filter(
      item => leaveCountTypes.has(item.lvereq_desc)
    ).length;

    // Count half-day leaves
    const totalHD = empwise.filter(
      item => halfDayTypes.has(item.lvereq_desc)
    ).length;

    // Count loss of pay / LC records
    const totalLC = empwise.filter(
      item => item.lvereq_desc === 'LC'
    ).length;

    // Count total payable/worked days
    const workday = empwise.filter(
      item => leaveTypes.has(item.lvereq_desc)
    ).length;

    // Count holidays on which the employee worked
    const totalHP = empwise.filter(
      item => item.lvereq_desc === 'HP'
    ).length;

    // Calculate total deductions for the employee
    const deductValue =
      deductData
        ?.filter(item => item.em_no === employee.em_no)
        .reduce(
          (sum, item) => sum + Number(item.em_amount || 0),
          0
        ) || 0;

    // Calculate apprenticeship deduction amount
    const apprenticeshipDeductAmount =
      apprenticeshipCash
        .filter(item => item.em_no === employee.em_no)
        .reduce(
          (sum, item) => sum + Number(item.em_amount || 0),
          0
        ) || 0;

    // Calculate NPS amount only when NPS is enabled for the employee
    const npsamount =
      employee.nps === 1
        ? Number(employee.npsamount || 0)
        : 0;

    // Calculate LWF amount only when LWF is enabled
    const lwfamount =
      employee.lwf_status === 1
        ? Number(employee.lwfamount || 0)
        : 0;

    // Salary after deducting apprenticeship amount
    const salaryAfterApprenticeship =
      Number(employee.gross_salary || 0) -
      apprenticeshipDeductAmount;

    // Calculate one day's salary
    const oneDaySalary =
      salaryAfterApprenticeship / totalDays;

    // Calculate total payable days
    // Half-day leave is counted as 0.5 day
    const totalPayday =
      workday + totalHD * 0.5;

    // Calculate total Loss of Pay days
    const totalLopCount =
      totalDays - totalPayday;

    // Calculate Loss of Pay amount
    const lopAmount =
      totalLopCount * oneDaySalary;

    // Calculate holiday salary
    // Holiday salary is applicable only when gross salary
    // is less than or equal to the configured salary limit
    const holidaySalary =
      employee?.gross_salary <= commonSettings?.salary_above
        ? oneDaySalary * totalHP
        : 0;

    // Calculate final salary after all applicable deductions
    const totalSalary =
      salaryAfterApprenticeship -
      npsamount -
      lwfamount -
      lopAmount;

    // Return calculated salary and attendance information
    return {
      // Employee details
      em_no: employee.em_no,
      em_name: employee.em_name,
      branch_name: employee.branch_name,
      dept_name: employee.dept_name,
      sect_name: employee.sect_name,
      ecat_name: employee.ecat_name,
      desg_name: employee.desg_name,
      inst_emp_type: employee.inst_emp_type,

      // Bank and salary details
      empSalary: employee.gross_salary,
      em_account_no: employee.em_account_no,
      em_ifsc: employee.em_ifsc,

      // Attendance calculation details
      totalDays,
      totalLeaves: totalLV,
      totalHoliday: totalH,
      totalHD,
      totalLC,
      holidayworked: totalHP,

      // Payable and LOP days
      paydays: totalPayday,
      totallopCount:
        totalPayday === 0
          ? totalDays
          : totalLopCount,

      // Salary calculations
      lopAmount: Math.round(
        oneDaySalary * totalLopCount
      ),
      npsamount,
      lwfamount,
      holidaySalary: Math.round(holidaySalary),
      deductValue,

      // Prevent negative salary
      totalSalary:
        totalSalary < 0
          ? 0
          : Math.round(totalSalary),

      // Employee IDs / master data
      branch_slno: employee.branch_slno,
      category_slno: employee.category_slno,
      dept_id: employee.dept_id,
      desg_slno: employee.desg_slno,
      em_id: employee.em_id,
      inst_slno: employee.inst_slno,
      sect_id: employee.sect_id,

      // Processed salary month
      processed_month: processedMonth,
    };
  });

  // Return the calculated employee salary data
  return {
    data: finalDataArray,
    status: 1
  };
};
