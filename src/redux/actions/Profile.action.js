import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const {
    FETCH_EMP_PROFILE_DATA,
    FETCH_EMP_RECORD_LIST,
    FETCH_EMP_PERSONAL_INFOM,
    FETCH_ACADEMIC_DATA,
    FETCH_EXPERIENCE_DATA,
    FETCH_LEAVE_AVAIL_LIST,
    FETCH_NOTIFYDETL,
    FETCH_JOB_DESCRIPTION
} = Actiontypes;

export const setProfileData = (id) => async (dispatch) => {
    const result = await axioslogin.get(`common/getEmpProfileInform/${id}`);
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_PROFILE_DATA, payload: data[0] })
    }
}

export const setEmployeeList = (emprecord) => {
    return (dispatch) => {
        return dispatch({ type: FETCH_EMP_RECORD_LIST, payload: emprecord })
    }
}

export const setPersonalData = (id) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`common/getEmpProfileInform/${id}`);
        const { data, success } = result.data;
        if (success === 1) {
            dispatch({ type: FETCH_EMP_PERSONAL_INFOM, payload: data[0], status: true })
        }
    }
}

export const setAccademicData = (no) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`qualify/${no}`);
        const { data, success } = result.data;
        if (success === 1) {
            dispatch({ type: FETCH_ACADEMIC_DATA, payload: data, status: true })
        } else {
            dispatch({ type: FETCH_ACADEMIC_DATA, payload: [], status: false })
        }
    }
}

export const setExperienceData = (no) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`experience/select/${no}`);
        const { data, success } = result.data;
        if (success === 1) {
            dispatch({ type: FETCH_EXPERIENCE_DATA, payload: data, status: true })
        } else {
            dispatch({ type: FETCH_EXPERIENCE_DATA, payload: [], status: false })
        }
    }
}
export const getannualleave = (no) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`/leaveRequestType/leavesetdata/${no}`)
        const { success, data } = result.data
        if (success === 1) {
            dispatch({ type: FETCH_LEAVE_AVAIL_LIST, payload: data[0] })
        }
    }
}

export const notify = (no) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`/common/getnotifydata/${no}`)
        const { success, data } = result.data

        if (success === 1) {
            dispatch({ type: FETCH_NOTIFYDETL, payload: data[0] })
        }
    }
}

export const jondescription = (desg) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`/jobdescription/${desg}`)
        const { success, data } = result.data
        if (success === 1) {
            dispatch({ type: FETCH_JOB_DESCRIPTION, payload: data })
        }
    }
}



