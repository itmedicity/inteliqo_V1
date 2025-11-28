import { axioslogin } from "src/views/Axios/Axios";

export const getMenuNameList = async () => {
    return await axioslogin.get('/modulegroup/select/menulist').then((res) => {
        const { success, data } = res.data
        if (success === 1) {

            const arr = data?.map((val) => {
                const obj = {
                    showStatus: val.menu_status === "1" ? 'Yes' : 'No'
                }
                return { ...val, ...obj }
            })
            return arr
        } else {
            return []
        }
    })
}

export const getModuleNameList = async () => {
    return await axioslogin.get('/common/getModuleName').then((res) => {
        const { success, data } = res.data
        if (success === 1) {

            const arr = data?.map((val) => {
                const obj = {
                    showStatus: val.module_status === 1 ? 'Yes' : 'No'
                }
                return { ...val, ...obj }
            })
            return arr
        } else {
            return []
        }
    })
}


export const getDoctordutyList = async () => {
    return await axioslogin.get('/DoctorsProcess/select/dutylist').then((res) => {
        const { success, data } = res.data
        if (success === 1) {

            const arr = data?.map((val) => {
                const obj = {
                    showStatus: val.duty_status === 1 ? 'Yes' : 'No'
                }
                return { ...val, ...obj }
            })
            return arr
        } else {
            return []
        }
    })
}

export const getemployeeRightsList = async () => {
    return await axioslogin.get('/DoctorsProcess/employee/rights').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            const arr = data?.map((val) => {
                const obj = {
                    showStatus: val?.right_status === 1 ? 'Yes' : 'No'
                }
                return { ...val, ...obj }
            })
            return arr
        } else {
            return []
        }
    })
}