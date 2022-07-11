import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_DISTRICT } = Actiontypes;

export const setDistrict = () => async (dispatch) => {
    /** to get dsitrict slno, name from databse */
    const result = await axioslogin.get('/district/');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_DISTRICT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_DISTRICT, payload: [], loadingStatus: false })
    }
}