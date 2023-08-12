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
    const result = await axioslogin.get(`/payrollprocess/grosssalarybyid/${no}`)
    const { message, success, data } = result.data;
    if (success === 1) {
        const { em_id, gross_salary } = data[0]
        const updatedata = {
            gross_salary: gross_salary,
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