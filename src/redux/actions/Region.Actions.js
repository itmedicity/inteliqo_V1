import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_REGION_DATA } = Actiontypes;

export const setRegionList = () => async (dispatch) => {
    /** to get region list from databse */
    const result = await axioslogin.get('/region')
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_REGION_DATA, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_REGION_DATA, payload: [], loadingStatus: false })
    }
}
