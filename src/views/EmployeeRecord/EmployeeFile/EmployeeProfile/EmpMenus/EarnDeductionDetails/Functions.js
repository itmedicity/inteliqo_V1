import { axioslogin } from "src/views/Axios/Axios";

export const insertWage = async (arr) => {
    const result = await axioslogin.post('/empearndeduction/create/getwage', arr)
    const { message, success } = result.data;
    if (success === 1) {
        return { status: 1, message: message }
    } else {
        return { status: 0, message: message }
    }
}


export const updateEmpmaster = async (no) => {
    const result = await axioslogin.get(`/payrollprocess/getTotalGrosssalaryByno/${no}`)
    const { message, success, data } = result.data;
    if (success === 1) {
        const { em_id } = data[0]
        const sumWithInitial = data.map(item => item.em_amount).reduce((prev, next) => Number(prev) + Number(next));
        const updatedata = {
            gross_salary: sumWithInitial,
            em_id: em_id,
            salary_split_flag: 1
        }
        const result = await axioslogin.patch('/empearndeduction/update/empmaster', updatedata)
        const { message, success } = result.data;
        if (success === 2) {
            return { status: 1, message: message }
        } else {
            return { status: 0, message: message }
        }
    }
    else {
        return { status: 0, message: message }
    }
}