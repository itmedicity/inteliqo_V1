import { Actiontypes } from '../constants/action.type'
const { FETCH_JOB_GENERIC } = Actiontypes;

const jobGeneric = {
    jobGenericList: [],
    loadingStatus: false
}

export const getJobGenric = (state = jobGeneric, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_GENERIC:
            return { ...state, jobGenericList: payload, loadingStatus: true }
        default:
            return state
    }
}