import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EARNDEDUCTION_DATA } = Actiontypes;

export const getEarnDeduction = () => async (dispatch) => {
    /** to get dsitrict slno, name from databse */
    const result = await axioslogin.get('/common/getWageDescription');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EARNDEDUCTION_DATA, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EARNDEDUCTION_DATA, payload: [], loadingStatus: false })
    }
}