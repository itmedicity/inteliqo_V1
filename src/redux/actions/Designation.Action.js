import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_DESIGNATION } = Actiontypes;

/** to get designation id,name from database from database */
export const setDesignation = () => async (dispatch) => {
    const result = await axioslogin.get('/reports/designation');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_DESIGNATION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_DESIGNATION, payload: [], loadingStatus: false })
    }
}

