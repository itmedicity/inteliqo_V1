import { Actiontypes } from '../constants/action.type'

const { FETCH_LEAVE_TYPE_ALL } = Actiontypes;

const LeaveType = {
    LeaveTypeList: [],
    loadingStatus: false
}

export const getLeaveType = (state = LeaveType, { type, payload }) => {
    switch (type) {
        case FETCH_LEAVE_TYPE_ALL:
            return { ...state, LeaveTypeList: payload, loadingStatus: true }
        default:
            return state
    }
}
