import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";
const {
    FETCH_RESIGN_COUNT,
    FETCH_CONTRACT_CLOSE,
    FETCH_OVERTIME_COUNT,
    FETCH_OVERTIME_INCHARGE,
    FETCH_OVERTIME_COUNT_HOD,
    FETCH_OVERTIME_COUNT_CEO,
    FETCH_OVERTIME_COUNT_USER,
    FETCH_LEAVE_REQ_COUNT_INCHARGE,
    FETCH_LEAVE_REQ_COUNT_HOD,
    FETCH_LEAVE_REQ_COUNT_CEO,
    FETCH_GET_LEAVE_REQ_COUNT_HR,
    FETCH_LEAVE_REQ_COUNT_USER,
    FETCH_RESIGN_REQ_COUNT_INCHARGE,
    FETCH_RESIGN_REQ_COUNT_HOD,
    FETCH_RESIGN_REQ_COUNT_CEO,
    FETCH_CONTRACT_RENEW_COUNT,
    FETCH_TRAIN_COUNT,
    FETCH_REGISTER_RENEW
} = Actiontypes;

export const getResignCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count')
    const { success, data } = result.data
    if (success === 1) {
        const { resignreqcount } = data[0]
        dispatch({ type: FETCH_RESIGN_COUNT, payload: resignreqcount, status: false })
    } else {
        dispatch({ type: FETCH_RESIGN_COUNT, payload: 0, status: false })
    }

}

export const getcontractCloseCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/contractcloseCount')
    const { success, data } = result.data
    if (success === 1) {
        const { contractcloseCount } = data[0]
        dispatch({ type: FETCH_CONTRACT_CLOSE, payload: contractcloseCount, status: false })
    } else {
        dispatch({ type: FETCH_CONTRACT_CLOSE, payload: 0, status: false })
    }
}

export const getovertimeCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqHRCount')
    const { success, data } = result.data
    if (success === 1) {
        const { othrcount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT, payload: othrcount, status: false })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT, payload: 0, status: false })
    }
}

export const getovertimeCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqInchargeCount')
    const { success, data } = result.data
    if (success === 1) {
        const { otcountincharge } = data[0]
        dispatch({ type: FETCH_OVERTIME_INCHARGE, payload: otcountincharge, status: false })
    } else {
        dispatch({ type: FETCH_OVERTIME_INCHARGE, payload: 0, status: false })
    }
}

export const getovertimeCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { othodcount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_HOD, payload: othodcount, status: false })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_HOD, payload: 0, status: false })
    }
}

export const getovertimeCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqCEOCount')
    const { success, data } = result.data
    if (success === 1) {
        const { otceocount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_CEO, payload: otceocount, status: false })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_CEO, payload: 0, status: false })
    }
}

export const getovertimeCountUser = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Count/OtRequest/CountUser/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
        const { otusercount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_USER, payload: otusercount, status: false })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_USER, payload: 0, status: false })
    }
}

export const getleavereqCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqInchargeCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leaveinchargecount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_INCHARGE, payload: leaveinchargecount, status: false })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_INCHARGE, payload: 0, status: false })
    }
}

export const getleavereqCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leavehodcount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_HOD, payload: leavehodcount, status: false })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_HOD, payload: 0, status: false })
    }
}

export const getleavereqCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqCeoCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leaveceocount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_CEO, payload: leaveceocount, status: false })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_CEO, payload: 0, status: false })
    }
}

export const getleavereqCountHR = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqHrCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leavehrcount } = data[0]
        dispatch({ type: FETCH_GET_LEAVE_REQ_COUNT_HR, payload: leavehrcount, status: false })
    } else {
        dispatch({ type: FETCH_GET_LEAVE_REQ_COUNT_HR, payload: 0, status: false })
    }
}

export const getLeaveRequestCountUser = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Count/LeaveReqCount/User/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
        const { leaveusercount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_USER, payload: leaveusercount, status: false })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_USER, payload: 0, status: false })
    }
}

export const getresignreqCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqInchargeCount')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncountincharge } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_INCHARGE, payload: resigncountincharge, status: false })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_INCHARGE, payload: 0, status: false })
    }
}

export const getresignreqCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncounthod } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_HOD, payload: resigncounthod, status: false })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_HOD, payload: 0, status: false })
    }
}

export const getresignreqCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqCeoCount')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncountceo } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_CEO, payload: resigncountceo, status: false })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_CEO, payload: 0, status: false })
    }
}

export const getContractRenewalCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/contractrenewalCount')
    const { success, data } = result.data
    if (success === 1) {
        const { Contractendcount } = data[0]
        dispatch({ type: FETCH_CONTRACT_RENEW_COUNT, payload: Contractendcount, status: false })
    } else {
        dispatch({ type: FETCH_CONTRACT_RENEW_COUNT, payload: 0, status: false })
    }
}

export const getTrainingCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/trainingconformationCount')
    const { success, data } = result.data
    if (success === 1) {
        const { ProbationEndCount } = data[0]
        dispatch({ type: FETCH_TRAIN_COUNT, payload: ProbationEndCount, status: false })
    } else {
        dispatch({ type: FETCH_TRAIN_COUNT, payload: 0, status: false })
    }
}

export const getRegistRenew = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/registration/pending')
    const { success, data } = result.data
    if (success === 1) {
        const { RegistrationRenewCount } = data[0]
        dispatch({ type: FETCH_REGISTER_RENEW, payload: RegistrationRenewCount, status: false })
    } else {
        dispatch({ type: FETCH_REGISTER_RENEW, payload: 0, status: false })
    }
}