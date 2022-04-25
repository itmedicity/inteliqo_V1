import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_ANNOUNCEMENT_MESSAGE } = Actiontypes;

export const setAnnouncementList = () => async (dispatch) => {
    const result = await axioslogin.get('/hrmAnnouncement');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ANNOUNCEMENT_MESSAGE, payload: data })
    }
}
