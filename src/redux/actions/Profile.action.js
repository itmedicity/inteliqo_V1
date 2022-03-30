import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const {
    FETCH_EMP_PROFILE_DATA,
    FETCH_EMP_RECORD_LIST,
    FETCH_EMP_PERSONAL_INFOM,
    FETCH_ACADEMIC_DATA,
    FETCH_EXPERIENCE_DATA
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
        }
    }
}

export const setExperienceData = (id) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`/experience/select/${id}`);
        const { data, success } = result.data;
    }
}

