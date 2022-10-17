import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENTSECTION } = Actiontypes;

export const setDeptartmentSect = (dept) => async (dispatch) => {
    const result = await axioslogin.get(`/section/sect/${dept}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENTSECTION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENTSECTION, payload: [], loadingStatus: false })
    }
}