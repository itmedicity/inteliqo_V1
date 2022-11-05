import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_DUTIES } = Actiontypes;

const jobDuties = {
    jobDutiesList: [],
    loadingStatus: false
}

export const getJobDuties = (state = jobDuties, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_DUTIES:
            return { ...state, jobDutiesList: payload, loadingStatus: true }
        default:
            return state
    }
}
