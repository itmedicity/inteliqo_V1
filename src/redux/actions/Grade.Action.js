import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_GRADE_LIST } = Actiontypes;

export const setGradeList = () => async (dispatch) => {
    const result = await axioslogin.get('/grade');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_GRADE_LIST, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_GRADE_LIST, payload: [], loadingStatus: false })
    }
}
