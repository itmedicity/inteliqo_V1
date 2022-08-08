import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_SUBSECTION } = Actiontypes;

/** to get category id,name from database  */
export const setSubSection = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/DeptSectionReport/deptsection', postData);
    const { success, data } = result.data

    if (success === 1) {
        dispatch({ type: FETCH_EMP_SUBSECTION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_SUBSECTION, payload: [], loadingStatus: false })
    }
}