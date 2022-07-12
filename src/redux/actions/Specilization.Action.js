import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_SPECILIZATION } = Actiontypes;

/** to get specilizaton id,name from database from database */
export const setSpecialization = (course) => async (dispatch) => {
    const result = await axioslogin.post('/reports/specialization/ById', course);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_SPECILIZATION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_SPECILIZATION, payload: [], loadingStatus: false })
    }
}