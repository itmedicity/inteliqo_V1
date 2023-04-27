import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const {
    FETCH_ALL_LEAVE_REQUEST,
    FETCH_ALL_HALFDAY_REQUEST,
    FETCH_ALL_NOPUNCH_REQUEST,
    FETCH_ALL_COMPOFF_REQUEST
} = Actiontypes;

export const getLeaveRequestAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveRequestApproval')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_LEAVE_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_LEAVE_REQUEST, payload: 0, status: false })
    }
}
export const getHalfdayRqstAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveRequestApproval/ceopending/halfday')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_HALFDAY_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_HALFDAY_REQUEST, payload: 0, status: false })
    }
}
export const getNopunchRqstAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveRequestApproval/Ceonopunch/nopunch')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_NOPUNCH_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_NOPUNCH_REQUEST, payload: 0, status: false })
    }
}
export const getCompOffRqstAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveRequestApproval/ceoCoff/Coff')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_COMPOFF_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_COMPOFF_REQUEST, payload: 0, status: false })
    }
}