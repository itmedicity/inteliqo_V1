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
    FETCH_REGISTER_RENEW,
    FETCH_PROBATION,
    FETCH_ANNUAL,
    FETCH_HOD_APPRAISAL_COUNT,
    FETCH_INCHARGE_APPARAISAL_COUNT,
    FETCH_HOD_APPRAISAL_LIST,
    FETCH_INCHARGE_APPARAISAL_LIST,
    FETCH_CEO_APPRAISAL_COUNT,
    FETCH_CEO_APPRAISAL_LIST,
    FETCH_APPRAISAL_COMPLETE,
    FETCH_APPRAISAL_COMPLETE_LIST,
    FETCH_NOTADDED_ESIEMP_LIST,
    FETCH_RETIREMENT_LIST
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
    //  const result = await axioslogin.get('/Count/contractcloseCount/list')
    const result = await axioslogin.get('/Performance/contractclosed')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CONTRACT_CLOSE, payload: data.length, status: false })
    } else {
        dispatch({ type: FETCH_CONTRACT_CLOSE, payload: 0, status: false })
    }
}

export const getovertimeCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqHRCount')
    const { success, data } = result.data
    if (success === 1) {
        const { othrcount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT, payload: othrcount, status: true })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT, payload: 0, status: false })
    }
}

export const getovertimeCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqInchargeCount')
    const { success, data } = result.data
    if (success === 1) {
        const { otcountincharge } = data[0]
        dispatch({ type: FETCH_OVERTIME_INCHARGE, payload: otcountincharge, status: true })
    } else {
        dispatch({ type: FETCH_OVERTIME_INCHARGE, payload: 0, status: false })
    }
}

export const getovertimeCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { othodcount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_HOD, payload: othodcount, status: true })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_HOD, payload: 0, status: false })
    }
}

export const getovertimeCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/OtReqCEOCount')
    const { success, data } = result.data
    if (success === 1) {
        const { otceocount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_CEO, payload: otceocount, status: true })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_CEO, payload: 0, status: false })
    }
}

export const getovertimeCountUser = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Count/OtRequest/CountUser/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
        const { otusercount } = data[0]
        dispatch({ type: FETCH_OVERTIME_COUNT_USER, payload: otusercount, status: true })
    } else {
        dispatch({ type: FETCH_OVERTIME_COUNT_USER, payload: 0, status: false })
    }
}

export const getleavereqCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqInchargeCount/all')
    const { success, data } = result.data
    if (success === 1) {
        const { leaveinchargecount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_INCHARGE, payload: leaveinchargecount, status: true })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_INCHARGE, payload: 0, status: false })
    }
}

export const getleavereqCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leavehodcount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_HOD, payload: leavehodcount, status: true })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_HOD, payload: 0, status: false })
    }
}

export const getleavereqCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqCeoCount')
    const { success, data } = result.data
    if (success === 1) {
        const { leaveceocount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_CEO, payload: leaveceocount, status: true })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_CEO, payload: 0, status: false })
    }
}

export const getleavereqCountHR = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/LeaveReqHrCount/all')
    const { success, data } = result.data
    if (success === 1) {
        const { leavehrcount } = data[0]
        dispatch({ type: FETCH_GET_LEAVE_REQ_COUNT_HR, payload: leavehrcount, status: true })
    } else {
        dispatch({ type: FETCH_GET_LEAVE_REQ_COUNT_HR, payload: 0, status: false })
    }
}

export const getLeaveRequestCountUser = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Count/LeaveReqCount/User/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
        const { leaveusercount } = data[0]
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_USER, payload: leaveusercount, status: true })
    } else {
        dispatch({ type: FETCH_LEAVE_REQ_COUNT_USER, payload: 0, status: false })
    }
}

export const getresignreqCountIncharge = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqInchargeCount/count')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncountincharge } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_INCHARGE, payload: resigncountincharge, status: true })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_INCHARGE, payload: 0, status: false })
    }
}

export const getresignreqCountHOD = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqHodCount')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncounthod } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_HOD, payload: resigncounthod, status: true })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_HOD, payload: 0, status: false })
    }
}

export const getresignreqCountCEO = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/ResignReqCeoCount')
    const { success, data } = result.data
    if (success === 1) {
        const { resigncountceo } = data[0]
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_CEO, payload: resigncountceo, status: true })
    } else {
        dispatch({ type: FETCH_RESIGN_REQ_COUNT_CEO, payload: 0, status: false })
    }
}

export const getContractRenewalCount = () => async (dispatch) => {
    // const result = await axioslogin.get('/Count/contractcount/list')
    const result = await axioslogin.get('/empcat/contract/detl')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CONTRACT_RENEW_COUNT, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_CONTRACT_RENEW_COUNT, payload: 0, status: false })
    }
}

export const getTrainingCount = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/trainingcount/list')
    const { success, data } = result.data
    if (success === 1) {
        // const { trainingcount } = data[0]
        dispatch({ type: FETCH_TRAIN_COUNT, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_TRAIN_COUNT, payload: 0, status: false })
    }
}

export const getRegistRenew = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/registration/pending')
    const { success, data } = result.data
    if (success === 1) {
        const { RegistrationRenewCount } = data[0]
        dispatch({ type: FETCH_REGISTER_RENEW, payload: RegistrationRenewCount, status: true })
    } else {
        dispatch({ type: FETCH_REGISTER_RENEW, payload: 0, status: false })
    }
}

export const getProbation = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/probCount/list')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PROBATION, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_PROBATION, payload: 0, status: false })
    }
}

export const getAnnual = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/annualempcount/list')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ANNUAL, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_ANNUAL, payload: 0, status: false })
    }
}

export const getAppraisalHod = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/Performance/hodData/${id}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_HOD_APPRAISAL_LIST, payload: data, status: true })
        dispatch({ type: FETCH_HOD_APPRAISAL_COUNT, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_HOD_APPRAISAL_LIST, payload: [], status: false })
        dispatch({ type: FETCH_HOD_APPRAISAL_COUNT, payload: 0, status: false })
    }
}

export const getAppraisalIncharge = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/Performance/inchargeData/${id}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_INCHARGE_APPARAISAL_LIST, payload: data, status: true })
        dispatch({ type: FETCH_INCHARGE_APPARAISAL_COUNT, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_INCHARGE_APPARAISAL_LIST, payload: [], status: false })
        dispatch({ type: FETCH_INCHARGE_APPARAISAL_COUNT, payload: 0, status: false })
    }
}

export const getAppraisalCeo = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/ceodata')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CEO_APPRAISAL_LIST, payload: data, status: true })
        dispatch({ type: FETCH_CEO_APPRAISAL_COUNT, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_CEO_APPRAISAL_LIST, payload: [], status: false })
        dispatch({ type: FETCH_CEO_APPRAISAL_COUNT, payload: 0, status: false })
    }
}

export const getAllAppraisal = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/hrlist')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_APPRAISAL_COMPLETE_LIST, payload: data, status: true })
        dispatch({ type: FETCH_APPRAISAL_COMPLETE, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_APPRAISAL_COMPLETE_LIST, payload: [], status: false })
        dispatch({ type: FETCH_APPRAISAL_COMPLETE, payload: 0, status: false })
    }
}
export const getesiNotAddedEmp = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/esi/list')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_NOTADDED_ESIEMP_LIST, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_NOTADDED_ESIEMP_LIST, payload: 0, status: false })
    }

}

export const getRetiredEmployees = () => async (dispatch) => {
    const result = await axioslogin.get('/Count/retirement/list')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_RETIREMENT_LIST, payload: data.length, status: true })
    } else {
        dispatch({ type: FETCH_RETIREMENT_LIST, payload: 0, status: false })
    }

}