import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const { FETCH_CASUAL_LEAVE_DATA } = Actiontypes;

export const getCasualLeaveData = (no) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getcasual/${no}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CASUAL_LEAVE_DATA, payload: data })
    } else {
        dispatch({ type: FETCH_CASUAL_LEAVE_DATA, payload: [] })
    }
}