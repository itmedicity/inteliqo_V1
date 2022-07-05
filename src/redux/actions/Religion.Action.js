import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_RELIGION } = Actiontypes;

export const setReligion = () => async (dispatch) => {
    const result = await axioslogin.get('/reports/religion');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_RELIGION, payload: data })
    }
}