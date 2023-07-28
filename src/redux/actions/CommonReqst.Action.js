import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const {
    FETCH_ONE_HOUR_DATA,
    FETCH_ON_DUTY_DATA,
    FETCH_ENABLE_MISSPUNCH_DATA,
    FETCH_GENERAL_RQ_DATA
} = Actiontypes;


export const getOneHourReqst = () => async (dispatch) => {
    const result = await axioslogin.get('/CommonReqst/all/onehour')
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ONE_HOUR_DATA, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ONE_HOUR_DATA, payload: [], status: false })
    }
}
export const getOnDutyReqst = () => async (dispatch) => {
    const result = await axioslogin.get('/CommonReqst/all/onDuty')
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ON_DUTY_DATA, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ON_DUTY_DATA, payload: [], status: false })
    }
}
export const getEnableMisspunch = () => async (dispatch) => {
    const result = await axioslogin.get('/CommonReqst/all/enableMiss')
    const { data, success } = result.data;;
    if (success === 1) {
        dispatch({ type: FETCH_ENABLE_MISSPUNCH_DATA, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ENABLE_MISSPUNCH_DATA, payload: [], status: false })
    }
}
export const getGeneralRqst = () => async (dispatch) => {
    const result = await axioslogin.get('/CommonReqst/all/general')
    const { data, success } = result.data;;
    if (success === 1) {
        dispatch({ type: FETCH_GENERAL_RQ_DATA, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_GENERAL_RQ_DATA, payload: [], status: false })
    }
}