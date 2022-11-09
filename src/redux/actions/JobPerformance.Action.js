import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_PERFORMANCE } = Actiontypes;

export const setJobPerformance = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/getjobspecific', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_PERFORMANCE, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_PERFORMANCE, payload: [], status: false })
    }
}
