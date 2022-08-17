import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_ACTIVECOUNT } = Actiontypes;

export const setActiveempCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/activecount/countlist');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_ACTIVECOUNT, payload: data })
    }
}
