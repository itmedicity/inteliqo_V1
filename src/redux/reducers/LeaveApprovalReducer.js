import { Actiontypes } from '../constants/action.type'

const {
    FETCH_ALL_LEAVE_REQUEST,
    FETCH_ALL_HALFDAY_REQUEST,
    FETCH_ALL_NOPUNCH_REQUEST,
    FETCH_ALL_COMPOFF_REQUEST
} = Actiontypes;

const LeaveApprovalData = {
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



export const setAllLeaveApproval = (state = LeaveApprovalData, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_LEAVE_REQUEST:
            return {
                ...state,
                leaveRqData: {
                    ...state.leaveRqData,
                    leaveRqList: payload,
                    leaveRqStatus: true
                }
            }
        case FETCH_ALL_HALFDAY_REQUEST:
            return {
                ...state,
                halfdayRqData: {
                    ...state.halfdayRqData,
                    halfdayRqList: payload,
                    halfdayRqStatus: true
                }
            }
        case FETCH_ALL_NOPUNCH_REQUEST:
            return {
                ...state,
                nopunchRqData: {
                    ...state.nopunchRqData,
                    nopunchRqList: payload,
                    nopunchRqStatus: true
                }
            }
        case FETCH_ALL_COMPOFF_REQUEST:
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