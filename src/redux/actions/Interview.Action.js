import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_INTERVIEWQUESTION_LIST, FETCH_INTERVIEW_LIST } = Actiontypes

export const Interview = (desigid) => async (dispatch) => {
    const result = await axioslogin.get(`/Applicationform/Getquestion/${desigid}`);
    const { questionsuccess, questiondata } = result.data;

    if (questionsuccess === 1) {
        dispatch({ type: FETCH_INTERVIEWQUESTION_LIST, payload: questiondata, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_INTERVIEWQUESTION_LIST, payload: [], loadingStatus: false })
    }

    const vacancyresult = await axioslogin.get(`/Applicationform/vacancylist`);
    const { success, data } = vacancyresult.data;
    if (success === 1) {
        dispatch({ type: FETCH_INTERVIEW_LIST, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_INTERVIEW_LIST, payload: [], loadingStatus: false })
    }
}
