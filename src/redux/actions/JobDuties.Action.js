import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_DUTIES } = Actiontypes;

export const setJobDuties = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/getJobDuties', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_DUTIES, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_DUTIES, payload: [], status: false })
    }
}
