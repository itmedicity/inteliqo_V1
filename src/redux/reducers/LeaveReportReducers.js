import { Actiontypes } from '../constants/action.type'

const {
    FETCH_LEAVEREPORT_REQUEST,
    FETCH_HALFDAY_REQUEST,
    FETCH_NOPUNCH_REQUEST,
    FETCH_COMPOFF_REQUEST
} = Actiontypes;

const LeaveReportData = {
    leaveRqData: {
        leaveRqList: [],
        leaveRqStatus: false
    },
    halfdayRqData: {
        halfdayRqList: [],
        halfdayRqStatus: false
    },
    nopunchRqData: {
        nopunchRqList: [],
        nopunchRqStatus: false
    },
    compOffrqData: {
        compOffRqList: [],
        compOffRqStatus: false
    }
}



export const getLeaveReport = (state = LeaveReportData, { type, payload }) => {
    switch (type) {
        case FETCH_LEAVEREPORT_REQUEST:
            return {
                ...state,
                leaveRqData: {
                    ...state.leaveRqData,
                    leaveRqList: payload,
                    leaveRqStatus: true
                }
            }
        case FETCH_HALFDAY_REQUEST:
            return {
                ...state,
                halfdayRqData: {
                    ...state.halfdayRqData,
                    halfdayRqList: payload,
                    halfdayRqStatus: true
                }
            }
        case FETCH_NOPUNCH_REQUEST:
            return {
                ...state,
                nopunchRqData: {
                    ...state.nopunchRqData,
                    nopunchRqList: payload,
                    nopunchRqStatus: true
                }
            }
        case FETCH_COMPOFF_REQUEST:
            return {
                ...state,
                compOffrqData: {
                    ...state.compOffrqData,
                    compOffRqList: payload,
                    compOffRqStatus: true
                }
            }
        default:
            return state
    }
}