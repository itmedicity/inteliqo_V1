import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_GENERIC } = Actiontypes;

export const setJobGeneric = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/getjobgeneric', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_GENERIC, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_GENERIC, payload: [], status: false })
    }
}