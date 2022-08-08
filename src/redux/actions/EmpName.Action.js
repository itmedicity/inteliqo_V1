import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_NAME } = Actiontypes;

export const setEmployeeName = () => async (dispatch) => {
    const result = await axioslogin.get('/experienceReport/empname');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_NAME, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_NAME, payload: [], loadingStatus: false })
    }
}