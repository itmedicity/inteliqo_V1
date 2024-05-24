import { Actiontypes } from '../constants/action.type'
const { FETCH_INTERVIEWQUESTION_LIST, FETCH_INTERVIEW_LIST } = Actiontypes;

const interviewlist = {
    questionType: {
        QuestionList: [],
        QuestionStatus: false,
    },
    InterviewType: {
        InterviewList: [],
        InterviewStatus: false,
    },
}
export const getInterviewquestion = (state = interviewlist, { type, payload }) => {

    switch (type) {
        case FETCH_INTERVIEWQUESTION_LIST:
            return {
                ...state,
                questionType: {
                    ...state.questionType,
                    QuestionList: payload,
                    QuestionStatus: true
                }
            }
        case FETCH_INTERVIEW_LIST:
            return {
                ...state,
                InterviewType: {
                    ...state.InterviewType,
                    InterviewList: payload,
                    InterviewStatus: true
                }
            }
        default:
            return state
    }

}
