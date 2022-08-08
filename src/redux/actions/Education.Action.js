import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_EDUCATION } = Actiontypes;

/** to get education id,name from database */
export const setEducation = () => async (dispatch) => {
    const result = await axioslogin.get('/QualificationReport/education');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_EDUCATION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_EDUCATION, payload: [], loadingStatus: false })
    }
}
