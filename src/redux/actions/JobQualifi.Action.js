import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_QUALIFICATION } = Actiontypes;

export const setJobQualification = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/jobsummary/getjobQual', postData)
    const { data, success } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_JOB_QUALIFICATION, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_JOB_QUALIFICATION, payload: [], status: false })
    }
}
