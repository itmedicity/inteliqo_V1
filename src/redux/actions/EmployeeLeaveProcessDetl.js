import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type"

const { FETCH_EMP_LEAVE_PROCESS_DETL } = Actiontypes;

export const setEmployeeProcessDetail = (no) => {
    return async (dispatch) => {
        const result = await axioslogin.get(`common/empLeaveProcessDates/${no}`);
        const { success, data } = result.data;
        if (success === 1) {
            dispatch({ type: FETCH_EMP_LEAVE_PROCESS_DETL, payload: data[0] })
        }
    }
}