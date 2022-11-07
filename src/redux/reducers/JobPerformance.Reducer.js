import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_PERFORMANCE } = Actiontypes;

const jobPerformance = {
    jobPerformanceList: [],
    loadingStatus: false
}

export const getJobPerformance = (state = jobPerformance, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_PERFORMANCE:
            return { ...state, jobPerformanceList: payload, loadingStatus: true }
        default:
            return state
    }
}