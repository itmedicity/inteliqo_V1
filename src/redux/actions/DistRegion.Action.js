import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_DISTREGION } = Actiontypes;

export const setDistRegion = (district) => async (dispatch) => {
    /** to get district wise region slno, name from database */
    const result = await axioslogin.post('/reports/distregion/', district);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_DISTREGION, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_EMP_DISTREGION, payload: [], loadingStatus: false })
    }
}