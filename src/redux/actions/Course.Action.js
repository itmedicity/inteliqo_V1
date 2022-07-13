import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_COURSE } = Actiontypes;

/** to get category id,name from database */
export const setCourse = (education) => async (dispatch) => {
    const result = await axioslogin.post('/reports/course/ById', education);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_COURSE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_COURSE, payload: [], loadingStatus: false })
    }

}