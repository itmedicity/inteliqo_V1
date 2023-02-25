import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const { FETCH_LEAVE_TYPE_ALL } = Actiontypes;

export const setLeaveType = () => async (dispatch) => {
    const result = await axioslogin.get(`/leaveType`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_LEAVE_TYPE_ALL, payload: data })
    } else {
        dispatch({ type: FETCH_LEAVE_TYPE_ALL, payload: [] })
    }
}