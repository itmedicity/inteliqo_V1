import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_SUMMARY } = Actiontypes;

const jobSummary = {
    jobSummaryList: [],
    loadingStatus: false
}

export const getJobSummary = (state = jobSummary, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_SUMMARY:
            return { ...state, jobSummaryList: payload, loadingStatus: true }
        default:
            return state
    }
}
