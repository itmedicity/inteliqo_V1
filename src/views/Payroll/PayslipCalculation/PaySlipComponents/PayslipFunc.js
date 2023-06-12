
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

export const MapFunction = async (earningData, data, datas) => {

    const empData = data?.map((val) => {
        return {
            em_name: val.em_name,
            em_no: val.em_no,
            em_uan_no: val.em_uan_no,
            ipnumber: val.em_esi_no,
            dept_name: val.dept_name,
            desg_name: val.desg_name,
            gross_amount: val.gross_amount,
            net_amount: val.net_amount,
            em_account_no: val.em_account_no,
            total_days: val.total_days,
            total_working_days: val.total_working_days,
            total_lop: val.total_lop,
            calculated_lop: val.calculated_lop,
            fixed: earningData.reduce((accumulator, currentValue) => {
                accumulator[currentValue.earnded_id] = {
                    id: currentValue.earnded_id,
                    name: currentValue.earnded_name,
                    amount: datas?.find((element) => element.em_salary_desc === currentValue.earnded_id && val.em_no === element.em_no)?.worked_amount || 0
                }
                return accumulator
            }, {})
        }
    })
    return empData
}