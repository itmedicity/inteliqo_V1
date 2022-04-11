import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_MESSAGE } = Actiontypes;

export const setMsgList = (empid) => async (dispatch) => {
    const result = await axioslogin.get(`/hrmMessage/${empid}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_MESSAGE, payload: data })
    }
}
