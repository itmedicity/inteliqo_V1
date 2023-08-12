import { Actiontypes } from '../constants/action.type'

const {
    FETCH_ONE_HOUR_DATA,
    FETCH_ON_DUTY_DATA,
    FETCH_ENABLE_MISSPUNCH_DATA,
    FETCH_GENERAL_RQ_DATA,
    FETCH_COMMON_REQUEST
} = Actiontypes;

const CommonReqstData = {
    oneHourData: {
        oneHourDataList: [],
        oneHourStatus: false
    },
    onDutyData: {
        onDutyDataLis: [],
        oneDutyStatus: false
    },
    enableData: {
        enableDataList: [],
        enableDataStatus: false
    },
    generalData: {
        generalDataList: [],
        generalDataStatus: false
    },
    empDetl: {
        em_id: 0,
        em_no: 0,
        dept: 0,
        deptSection: 0
    }
}

export const setCommonreqstAll = (state = CommonReqstData, { type, payload }) => {
    switch (type) {
        case FETCH_ONE_HOUR_DATA:
            return {
                ...state,
                oneHourData: {
                    ...state.oneHourData,
                    oneHourDataList: payload,
                    oneHourStatus: true
                }
            }
        case FETCH_ON_DUTY_DATA:
            return {
                ...state,
                onDutyData: {
                    ...state.onDutyData,
                    onDutyDataLis: payload,
                    oneDutyStatus: true
                }
            }
        case FETCH_ENABLE_MISSPUNCH_DATA:
            return {
                ...state,
                enableData: {
                    ...state.enableData,
                    enableDataList: payload,
                    enableDataStatus: true
                }
            }
        case FETCH_GENERAL_RQ_DATA:
            return {
                ...state,
                generalData: {
                    ...state.generalData,
                    generalDataList: payload,
                    generalDataStatus: true
                }
            }
        case FETCH_COMMON_REQUEST:
            return {
                ...state, empDetl: {
                    ...state.empDetl,
                    em_id: payload.empId,
                    em_no: payload.empNo,
                    dept: payload.deptId,
                    deptSection: payload.sectId
                }
            }
        default:
            return state
    }
}