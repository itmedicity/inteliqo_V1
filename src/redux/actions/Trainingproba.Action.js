import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_TRAININPROBA } = Actiontypes;

/** to get education id,name from database */
export const setTraningProba = () => async (dispatch) => {
    const result = await axioslogin.get('/TraingProbaReport/trainingprob');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_TRAININPROBA, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_TRAININPROBA, payload: [], loadingStatus: false })
    }
}