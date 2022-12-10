import { Actiontypes } from '../constants/action.type'
const {
    FETCH_JOB_SUMMARY,
    FETCH_JOB_COMPETENCY,
    FETCH_JOB_DUTIES,
    FETCH_JOB_GENERIC,
    FETCH_JOB_PERFORMANCE,
    FETCH_JOB_QUALIFICATION } = Actiontypes;

// const jobSummary = {
//     jobSummaryList: [],
//     loadingStatus: false
// }

const jobDescription = {
    jobSummary: {
        jobSummaryList: [],
        summaryStatus: false
    },
    jobDuties: {
        jobDutiesList: [],
        jobDutiesStatus: false
    },
    jobCompetency: {
        jobCompetencyList: [],
        jobCompetencyStatus: false
    },
    jobPerformance: {
        jobPerformanceList: [],
        jobPerformanceStatus: false
    },
    jobGeneric: {
        jobGenericList: [],
        jobGenericStatus: false
    },
    jobQualification: {
        jobQualificationList: [],
        jobQualiStatus: false
    }
}

export const getJobSummary = (state = jobDescription, { type, payload }) => {
    switch (type) {
        case FETCH_JOB_SUMMARY:
            // return { ...state, jobSummaryList: payload, loadingStatus: true }
            return {
                ...state,
                jobSummary: {
                    ...state.jobSummary,
                    jobSummaryList: payload,
                    summaryStatus: true
                }
            }
        case FETCH_JOB_DUTIES:
            return {
                ...state,
                jobDuties: {
                    ...state.jobDuties,
                    jobDutiesList: payload,
                    jobDutiesStatus: true
                }
            }
        case FETCH_JOB_COMPETENCY:
            return {
                ...state,
                jobCompetency: {
                    ...state.jobCompetency,
                    jobCompetencyList: payload,
                    jobCompetencyStatus: true
                }
            }
        case FETCH_JOB_PERFORMANCE:
            return {
                ...state,
                jobPerformance: {
                    ...state.jobPerformance,
                    jobPerformanceList: payload,
                    jobPerformanceStatus: true
                }
            }
        case FETCH_JOB_GENERIC:
            return {
                ...state,
                jobGeneric: {
                    ...state.jobGeneric,
                    jobGenericList: payload,
                    jobGenericStatus: true
                }
            }
        case FETCH_JOB_QUALIFICATION:
            return {
                ...state,
                jobQualification: {
                    ...state.jobQualification,
                    jobQualificationList: payload,
                    jobQualiStatus: true
                }
            }
        default:
            return state
    }
}
