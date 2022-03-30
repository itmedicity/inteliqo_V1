import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_LEAVE_LIST } = Actiontypes;

const Leavestate = [];
export const leavedata = (state = Leavestate, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_LEAVE_LIST:
            return [...state, ...payload]
        default:
            return state
    }
}