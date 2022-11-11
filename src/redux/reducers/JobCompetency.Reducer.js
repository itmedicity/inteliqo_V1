import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_COMPETENCY } = Actiontypes;

const jobCompetency = {
    jobCompetencyList: [],
    loadingStatus: false
}

export const getJobCompetency = (state = jobCompetency, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_COMPETENCY:
            return { ...state, jobCompetencyList: payload, loadingStatus: true }
        default:
            return state
    }
}