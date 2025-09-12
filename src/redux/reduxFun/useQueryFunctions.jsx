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

export const getHolidayListAll = async () => {
    return await axioslogin.get('/yearleaveprocess/year/holiday').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getDepartmentSectionShift = async (postData) => {
    return await axioslogin.post('/departmentshift/SectionShift', postData).then((result) => {
        const { success, data } = result.data;
        if (success === 1) {
            const { shft_code } = data[0]
            const obj = JSON.parse(shft_code)
            return obj
        } else {
            return []
        }
    })
}

export const getCommonSettingData = async () => {
    return await axioslogin.get('/commonsettings').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data[0]
        } else {
            return []
        }
    })
}

export const getDoctorDepartment = async () => {
    return await axioslogin.get('/DoctorsProcess/dept').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getDepartmentSection = async (dept) => {
    return await axioslogin.get(`/section/sect/${dept}`).then((result) => {
        const { success, data } = result.data;
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getSectionDoctor = async (sect) => {
    return await await axioslogin.get(`/common/getEmpName/${sect}`).then((result) => {
        const { success, data } = result.data;
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

