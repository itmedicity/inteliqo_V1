import { Actiontypes } from '../constants/action.type'

const {
    FETCH_HOD_APPRAISAL_LIST,
    FETCH_INCHARGE_APPARAISAL_LIST
} = Actiontypes;


const appraisalData = {
    appraisalHod: {
        appraisalHodList: [],
        appraisalHodStatus: false
    },
    appraisalIncharge: {
        appraisalInchargeList: [],
        appraisalInchargeStatus: false
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
        default:
            return state
    }
}