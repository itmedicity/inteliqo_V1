import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_RELIGION } = Actiontypes;

export const setReligion = () => async (dispatch) => {
    /** to get religion list from database */
    const result = await axioslogin.get('/Religion');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_RELIGION, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_EMP_RELIGION, payload: [], loadingStatus: false })
    }
}