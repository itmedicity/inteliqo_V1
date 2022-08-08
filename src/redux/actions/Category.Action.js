import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_CATEGORY } = Actiontypes;

/** to get category id,name from database  */
export const setCategory = () => async (dispatch) => {
    const result = await axioslogin.get('/CategoryReport/category');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_CATEGORY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_CATEGORY, payload: [], loadingStatus: false })
    }
}