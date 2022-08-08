import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_BRANCH } = Actiontypes;

export const setBranch = () => async (dispatch) => {
    /** To get branch slno, name */
    const result = await axioslogin.get('/branch');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_BRANCH, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_BRANCH, payload: [], loadingStatus: false })
    }
}