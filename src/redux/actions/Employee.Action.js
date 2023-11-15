import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMPLOYEE_LIST } = Actiontypes;

export const setEmployee = (dept) => async (dispatch) => {

    const result = await axioslogin.get(`/common/getemp/${dept}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMPLOYEE_LIST, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMPLOYEE_LIST, payload: [], loadingStatus: false })
    }
}