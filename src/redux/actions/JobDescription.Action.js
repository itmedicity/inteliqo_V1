import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const {
    FETCH_JOB_SUMMARY,
    FETCH_JOB_COMPETENCY,
    FETCH_JOB_DUTIES,
    FETCH_JOB_GENERIC,
    FETCH_JOB_PERFORMANCE,
    FETCH_JOB_QUALIFICATION
} = Actiontypes;

export const setJobSummary = (id) => async (dispatch) => {

    const result = await axioslogin.get(`/jobsummary/getsummByid/${id}`)
    const { data, success } = result.data;

    if (success === 1) {
        dispatch({ type: FETCH_JOB_SUMMARY, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_SUMMARY, payload: [], status: false })
    }

    const dutyresult = await axioslogin.get(`/jobsummary/getduties/${id}`)
    const { duty, dutysuccess } = dutyresult.data;

    if (dutysuccess === 1) {
        dispatch({ type: FETCH_JOB_DUTIES, payload: duty, status: true })
    } else {
        dispatch({ type: FETCH_JOB_DUTIES, payload: [], status: false })
    }

    const genericresult = await axioslogin.get(`/jobsummary/getgenricByid/${id}`)
    const { genricdata, genericsuccess } = genericresult.data;

    if (genericsuccess === 1) {
        dispatch({ type: FETCH_JOB_GENERIC, payload: genricdata, status: true })
    } else {
        dispatch({ type: FETCH_JOB_GENERIC, payload: [], status: false })
    }

    const compresult = await axioslogin.get(`/jobsummary/getcompbyid/${id}`)
    const { competency, comsuccess } = compresult.data;
    if (comsuccess === 1) {
        dispatch({ type: FETCH_JOB_COMPETENCY, payload: competency, status: true })
    } else {
        dispatch({ type: FETCH_JOB_COMPETENCY, payload: [], status: false })
    }


    const perfresult = await axioslogin.get(`/jobsummary/getperfombyid/${id}`)
    const { performance, persuccess } = perfresult.data;
    if (persuccess === 1) {
        dispatch({ type: FETCH_JOB_PERFORMANCE, payload: performance, status: true })
    } else {
        dispatch({ type: FETCH_JOB_PERFORMANCE, payload: [], status: false })
    }

    const qualresult = await axioslogin.get(`/jobsummary/getqualibyid/${id}`)
    const { Qualify, qualifsuccess } = qualresult.data;
    if (qualifsuccess === 1) {
        dispatch({ type: FETCH_JOB_QUALIFICATION, payload: Qualify, status: true })
    } else {
        dispatch({ type: FETCH_JOB_QUALIFICATION, payload: [], status: false })
    }
}


// export const setJobGeneric = (id) => async (dispatch) => {
//     const result = await axioslogin.get(`/jobsummary/getgenricByids/${id}`)
//     const { data, success } = result.data;
//     if (success === 1) {
//         dispatch({ type: FETCH_JOB_GENERIC, payload: data, status: true })
//     } else {
//         dispatch({ type: FETCH_JOB_GENERIC, payload: [], status: false })
//     }
// }
// export const setJobPerformance = (id) => async (dispatch) => {
//     const result = await axioslogin.get(`/jobsummary/getperfombyid/${id}`)
//     const { data, success } = result.data;
//     if (success === 1) {
//         dispatch({ type: FETCH_JOB_PERFORMANCE, payload: data, status: true })
//     } else {
//         dispatch({ type: FETCH_JOB_PERFORMANCE, payload: [], status: false })
//     }
// }

// export const setJobQualification = (id) => async (dispatch) => {
//     const result = await axioslogin.get(`/jobsummary/getqualibyid/${id}`)
//     const { data, success } = result.data;
//     if (success === 1) {
//         dispatch({ type: FETCH_JOB_QUALIFICATION, payload: data, status: true })
//     } else {
//         dispatch({ type: FETCH_JOB_QUALIFICATION, payload: [], status: false })
//     }
// }

// export const setJobCompetency = (id) => async (dispatch) => {
//     const result = await axioslogin.get(`/jobsummary/getcompbyid/${id}`)
//     const { data, success } = result.data;
//     if (success === 1) {
//         dispatch({ type: FETCH_JOB_COMPETENCY, payload: data, status: true })
//     } else {
//         dispatch({ type: FETCH_JOB_COMPETENCY, payload: [], status: false })
//     }
// }
