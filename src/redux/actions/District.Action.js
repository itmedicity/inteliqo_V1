import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_DISTRICT } = Actiontypes;

export const setDistrict = () => async (dispatch) => {
    const result = await axioslogin.get('/district/');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_DISTRICT, payload: data })
    }
}