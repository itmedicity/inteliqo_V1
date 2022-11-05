import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_SUMMARY } = Actiontypes;

export const setJobSummary = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/getjobsummary', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_SUMMARY, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_SUMMARY, payload: [], status: false })
    }
}
