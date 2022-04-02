import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTSEC_LIST } = Actiontypes;

export const setdeptSection = () => async (dispatch) => {
    const result = await axioslogin.get('/section/select/all');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTSEC_LIST, payload: data })
    }
}