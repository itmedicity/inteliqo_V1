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


export const attendnaceCountCalculationFunc = async (employeeData, deductData, data, value, commonSettings) => {

    const finalDataArry = employeeData?.map((val) => {
        const empwise = data.filter((value) => value.emp_id === val.em_id)

        const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
        //  const totalLOP = (empwise?.filter(val => val.lvereq_desc === 'A' || val.lvereq_desc === 'ESI' || val.lvereq_desc === 'LWP' || val.lvereq_desc === 'ML')).length
        const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
        const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length
        const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

        const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

        const npsamount = val.nps === 1 ? val.npsamount : 0
        const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

        const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

        // const totallopCount = totalLC > commonSettings?.max_late_day_count ? totalLOP + (totalHD * 0.5) + ((totalLC - commonSettings?.max_late_day_count) / 2) : totalLOP + (totalHD * 0.5)
        // const totallopCount = totalLOP + (totalHD * 0.5)

        const workday =
            (empwise?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
                val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
                val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
                val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
                val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
                val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length

        const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

        const totalDays = getDaysInMonth(new Date(value))
        const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0;
        const totalPayday = workday + (totalHD * 0.5)
        const totallopCount = totalDays - totalPayday;
        // const totalPayday = workday === 0 ? 0 : totalDays - totallopCount
        const lopamount = totallopCount * (val.gross_salary / totalDays);
        //const paydaySalay = (val.gross_salary / totalDays) * totalPayday
        const totalSalary = Number(val.gross_salary).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2) - Number(deductValue).toFixed(2) - Number(lopamount).toFixed(2)

        return {
            em_no: val.em_no,
            em_name: val.em_name,
            branch_name: val.branch_name,
            dept_name: val.dept_name,
            sect_name: val.sect_name,
            ecat_name: val.ecat_name,
            desg_name: val.desg_name,
            inst_emp_type: val.inst_emp_type,
            empSalary: val.gross_salary,
            em_account_no: val.em_account_no,
            em_ifsc: val.em_ifsc,
            totalDays: getDaysInMonth(new Date(value)),
            totalLeaves: totalLV,
            totalHoliday: totalH,
            totallopCount: totalPayday === 0 ? getDaysInMonth(new Date(value)) : totallopCount,
            holidayworked: totalHP,
            totalHD: totalHD,
            totalLC: totalLC,
            paydays: totalPayday,
            lopAmount: Math.round(onedaySalary * totallopCount),
            npsamount: npsamount,
            lwfamount: lwfamount,
            holidaySalary: Math.round(holidaysalary),
            deductValue: deductValue,
            totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary),
            branch_slno: val.branch_slno,
            category_slno: val.category_slno,
            dept_id: val.dept_id,
            desg_slno: val.desg_slno,
            em_id: val.em_id,
            inst_slno: val.inst_slno,
            sect_id: val.sect_id,
            processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
        }
    })
    return { data: finalDataArry, status: 1 }
}