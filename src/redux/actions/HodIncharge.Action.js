import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_HOD_INCHARGE } = Actiontypes;

export const setHODInchargeNameList = () => async (dispatch) => {
    /** to get hod, incharge list from database */
    const result = await axioslogin.get('/performanceappriasalrights/names/list');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_HOD_INCHARGE, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_HOD_INCHARGE, payload: [], loadingStatus: false })
    }
}