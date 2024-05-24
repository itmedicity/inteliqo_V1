import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_DEPARTMENT } = Actiontypes;

export const setDept = () => async (dispatch) => {
    const result = await axioslogin.get('/common/getdept');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENT, payload: [], loadingStatus: false })
    }
}

