import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_HIGHLEVEL_DATA } = Actiontypes;

export const setHighLevelData = () => async (dispatch) => {
    const result = await axioslogin.get('/HighLevel/list');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_HIGHLEVEL_DATA, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_HIGHLEVEL_DATA, payload: [], loadingStatus: false })
    }
}