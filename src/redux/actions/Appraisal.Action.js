import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const {
    FETCH_EMP_PERFORMANCE_ASSESSMNT,
    FETCH_EMP_COMP_ASSESSMENT,
    FETCH_PENDING_APPRAISAL,
    FETCH_APPRVD_APPRAISAL,
    FETCH_TRAINING_PENDING,
    FETCH_PROBATION_PENDING,
    FETCH_PERAMANENT_PENDING,
    FETCH_CONTRACT_PENDING
} = Actiontypes;

export const getPerformanceAssesment = (emp_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Performance/Perfdata/${emp_id}`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_PERFORMANCE_ASSESSMNT, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_EMP_PERFORMANCE_ASSESSMNT, payload: 0, status: false })
    }
}

export const getCompAssesment = (emp_id) => async (dispatch) => {
    const result = await axioslogin.get(`/Performance/getAll/compt/${emp_id}`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_COMP_ASSESSMENT, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_EMP_COMP_ASSESSMENT, payload: 0, status: false })
    }

}

export const getPendingAppraisal = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/pendg')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PENDING_APPRAISAL, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_PENDING_APPRAISAL, payload: [], status: false })
    }
}

export const getComApprvdApprsl = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/completed')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_APPRVD_APPRAISAL, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_APPRVD_APPRAISAL, payload: [], status: false })
    }
}

export const getTrainingPending = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/training/pendng')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_TRAINING_PENDING, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_TRAINING_PENDING, payload: [], status: false })
    }
}

export const getProbationPending = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/probation/pendng')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PROBATION_PENDING, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_PROBATION_PENDING, payload: [], status: false })
    }
}

export const getPermanentPending = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/permanent/pendng')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PERAMANENT_PENDING, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_PERAMANENT_PENDING, payload: [], status: false })
    }
}

export const getContractPending = () => async (dispatch) => {
    const result = await axioslogin.get('/Performance/contract/pendng')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CONTRACT_PENDING, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_CONTRACT_PENDING, payload: [], status: false })
    }
}


