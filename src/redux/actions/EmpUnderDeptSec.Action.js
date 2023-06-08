import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMPLOYEE_UNDER_DEPTSEC } = Actiontypes;

export const setEmpUnderDeptSec = (deptsec) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getEmpName/${deptsec}`)
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMPLOYEE_UNDER_DEPTSEC, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMPLOYEE_UNDER_DEPTSEC, payload: [], loadingStatus: false })
    }
}