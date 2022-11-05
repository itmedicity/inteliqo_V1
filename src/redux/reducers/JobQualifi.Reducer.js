import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_QUALIFICATION } = Actiontypes;

const jobQualification = {
    jobQualificationList: [],
    loadingStatus: false
}

export const getJobQualification = (state = jobQualification, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_QUALIFICATION:
            return { ...state, jobQualificationList: payload, loadingStatus: true }
        default:
            return state
    }
}