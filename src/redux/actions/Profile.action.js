import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_PROFILE_DATA, FETCH_ACADEMIC_DATA, FETCH_EMP_RECORD_LIST } = Actiontypes;

export const setProfileData = (id) => async (dispatch) => {
    const result = await axioslogin.get(`common/getEmpProfileInform/${id}`);
    const { data } = result.data;
    dispatch({ type: FETCH_EMP_PROFILE_DATA, payload: data[0] })
}

export const setEmployeeList = (emprecord) => {
    return (dispatch) => {
        return dispatch({ type: FETCH_EMP_RECORD_LIST, payload: emprecord })
    }
}


