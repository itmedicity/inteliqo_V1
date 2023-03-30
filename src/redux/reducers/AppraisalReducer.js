import { Actiontypes } from '../constants/action.type'

const {
    FETCH_HOD_APPRAISAL_LIST,
    FETCH_INCHARGE_APPARAISAL_LIST,
    FETCH_CEO_APPRAISAL_LIST,
    FETCH_APPRAISAL_COMPLETE_LIST,
    FETCH_EMP_PERFORMANCE_ASSESSMNT,
    FETCH_EMP_COMP_ASSESSMENT,
    FETCH_PENDING_APPRAISAL,
    FETCH_APPRVD_APPRAISAL,
    FETCH_TRAINING_PENDING,
    FETCH_PROBATION_PENDING,
    FETCH_PERAMANENT_PENDING,
    FETCH_CONTRACT_PENDING
} = Actiontypes;


const appraisalData = {
    appraisalHod: {
        appraisalHodList: [],
        appraisalHodStatus: false
    },
    appraisalIncharge: {
        appraisalInchargeList: [],
        appraisalInchargeStatus: false
    },
    appraisalCeo: {
        appraisalCeoList: [],
        appraisalCeoStatus: false
    },
    allAppraisal: {
        allAppraisalList: [],
        allAppraisalstatus: false
    },
    performanceAssessment: {
        performanceAssessmentList: [],
        performanceAssessmentSatus: false
    },
    compAssessment: {
        compAssessmentList: [],
        compAssessmentStatus: false
    },
    pendingAppraisal: {
        pendingAppraisalList: [],
        pendningAppraisalStatus: false
    },
    approvedAppraisal: {
        approvedAppraisalList: [],
        aprovedAppraisalStatus: false
    },
    trainingPending: {
        trainingPendingList: [],
        trainingPendingStatus: false
    },
    probationPending: {
        probationPendingList: [],
        probatonPendingStatus: false
    },
    permanentPending: {
        permanentPendingList: [],
        permanentPendingStatus: false
    },
    contractPending: {
        contractPendingList: [],
        contractPendingStatus: false
    }
}

export const getAppraisalData = (state = appraisalData, { type, payload }) => {
    switch (type) {
        case FETCH_HOD_APPRAISAL_LIST:
            return {
                ...state,
                appraisalHod: {
                    ...state.appraisalHod,
                    appraisalHodList: payload,
                    appraisalHodStatus: true
                }
            }
        case FETCH_INCHARGE_APPARAISAL_LIST:
            return {
                ...state,
                appraisalIncharge: {
                    ...state.appraisalIncharge,
                    appraisalInchargeList: payload,
                    appraisalInchargeStatus: true
                }
            }
        case FETCH_CEO_APPRAISAL_LIST:
            return {
                ...state,
                appraisalCeo: {
                    ...state.appraisalCeo,
                    appraisalCeoList: payload,
                    appraisalCeoStatus: true
                }
            }
        case FETCH_APPRAISAL_COMPLETE_LIST:
            return {
                ...state,
                allAppraisal: {
                    ...state.allAppraisal,
                    allAppraisalList: payload,
                    allAppraisalstatus: true
                }
            }
        case FETCH_EMP_PERFORMANCE_ASSESSMNT:
            return {
                ...state,
                performanceAssessment: {
                    ...state.performanceAssessment,
                    performanceAssessmentList: payload,
                    performanceAssessmentSattus: true
                }
            }
        case FETCH_EMP_COMP_ASSESSMENT:
            return {
                ...state,
                compAssessment: {
                    ...state.compAssessment,
                    compAssessmentList: payload,
                    compAssessmentStatus: true
                }
            }
        case FETCH_PENDING_APPRAISAL:
            return {
                ...state,
                pendingAppraisal: {
                    ...state.pendingAppraisal,
                    pendingAppraisalList: payload,
                    pendningAppraisalStatus: true
                }
            }
        case FETCH_APPRVD_APPRAISAL:
            return {
                ...state,
                approvedAppraisal: {
                    ...state.approvedAppraisal,
                    approvedAppraisalList: payload,
                    aprovedAppraisalStatus: true
                }
            }
        case FETCH_TRAINING_PENDING:
            return {
                ...state,
                trainingPending: {
                    ...state.trainingPending,
                    trainingPendingList: payload,
                    trainingPendingStatus: true
                }
            }
        case FETCH_PROBATION_PENDING:
            return {
                ...state,
                probationPending: {
                    ...state.probationPending,
                    probationPendingList: payload,
                    probatonPendingStatus: true
                }
            }
        case FETCH_PERAMANENT_PENDING:
            return {
                ...state,
                permanentPending: {
                    ...state.permanentPending,
                    permanentPendingList: payload,
                    permanentPendingStatus: true
                }
            }

        case FETCH_CONTRACT_PENDING:
            return {
                ...state,
                contractPending: {
                    ...state.contractPending,
                    contractPendingList: payload,
                    contractPendingStatus: true
                }
            }
        default:
            return state
    }
}