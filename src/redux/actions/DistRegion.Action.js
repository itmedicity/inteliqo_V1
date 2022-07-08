import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_DISTREGION } = Actiontypes;

export const setDistRegion = (district) => async (dispatch) => {
    const result = await axioslogin.get(`/reports/distregion/${district}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_DISTREGION, payload: data })
    }
}