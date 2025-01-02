import { axioslogin } from "src/views/Axios/Axios";

export const getAllHodList = async () => {
    //hod list , doctor_status=0
    return await axioslogin.get(`/common/hodlist`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}


export const getShiftDetails = async () => {
    /** to get shift list from database */
    return await axioslogin.get('/shift').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    });
}

export const getCommonsettingData = async () => {
    return await axioslogin.get('/commonsettings').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data[0]
        } else return []
    })
}
