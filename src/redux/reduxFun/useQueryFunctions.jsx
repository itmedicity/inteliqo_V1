import { axioslogin } from "src/views/Axios/Axios";

export const getEmployeeSalary = async (deptSection) => {
    return await axioslogin.get(`/common/getgrossSalaryByEmployeeNo/${deptSection}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}


export const getLeaveRequestType = async () => {
    return await axioslogin.get('/leaveRequestType/select').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}