import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_SHIFT_DATA } = Actiontypes;

export const setShiftDetails = () => async (dispatch) => {
    /** to get shift list from database */
    const result = await axioslogin.get('/shift');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_SHIFT_DATA, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_SHIFT_DATA, payload: [], loadingStatus: false })
    }
}