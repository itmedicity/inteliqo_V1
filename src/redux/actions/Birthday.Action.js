import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_BIRTHDAY } = Actiontypes;

export const setBirthdayAlert = () => async (dispatch) => {
    const result = await axioslogin.get('/hrmAnnouncement/birthday');
    const { success, data } = result.data;
    if (success === 1) {
        const arr = data?.map(val => {
            return {
                ...val, showStatus: 1
            }
        })
        dispatch({ type: FETCH_EMP_BIRTHDAY, payload: arr, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_EMP_BIRTHDAY, payload: [], loadingStatus: false })
    }
}
