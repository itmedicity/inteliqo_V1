import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";


const {
    FETCH_LEAVEREPORT_REQUEST,
    FETCH_HALFDAY_REQUEST,
    FETCH_NOPUNCH_REQUEST,
    FETCH_COMPOFF_REQUEST,
    FETCH_ONEHR_REQUEST,
    FETCH_ONDUTY_REQUEST,
} = Actiontypes;


export const getLeaveReportAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/leaverequest')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_LEAVEREPORT_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_LEAVEREPORT_REQUEST, payload: 0, status: false })
    }
}
export const getHalfdayRprtAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/halfday')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_HALFDAY_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_HALFDAY_REQUEST, payload: 0, status: false })
    }
}
export const getNopunchRprttAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/nopunch')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_NOPUNCH_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_NOPUNCH_REQUEST, payload: 0, status: false })
    }
}
export const getCompOffRprtAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/Coff')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMPOFF_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_COMPOFF_REQUEST, payload: 0, status: false })
    }
}
export const getOneHrAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/OneHour')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ONEHR_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ONEHR_REQUEST, payload: 0, status: false })
    }
}
export const getOndutyAll = () => async (dispatch) => {
    const result = await axioslogin.get('/LeaveReport/OnDuty')
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ONDUTY_REQUEST, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ONDUTY_REQUEST, payload: 0, status: false })
    }
}