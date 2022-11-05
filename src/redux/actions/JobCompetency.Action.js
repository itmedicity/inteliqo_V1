import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_COMPETENCY } = Actiontypes;

export const setJobCompetency = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/get/jobcompetency', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_COMPETENCY, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_COMPETENCY, payload: [], status: false })
    }
}
