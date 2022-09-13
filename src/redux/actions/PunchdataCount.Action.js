import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_PUNCHCOUNT } = Actiontypes;

export const setPunchCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/punch/count');
    const { success, data } = result.data;
    // console.log(data);
    if (success === 1) {
        dispatch({ type: FETCH_EMP_PUNCHCOUNT, payload: data })
    }
}
