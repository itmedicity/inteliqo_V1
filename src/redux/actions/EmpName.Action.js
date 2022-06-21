import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_NAME } = Actiontypes;

export const setEmployeeName = (sect) => async (dispatch) => {
    const result = await axioslogin.get(`/reports/empname/${sect}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_NAME, payload: data })
    }
}