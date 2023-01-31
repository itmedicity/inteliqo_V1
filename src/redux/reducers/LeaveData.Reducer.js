import { Actiontypes } from "../constants/action.type";

const { FETCH_CASUAL_LEAVE_DATA } = Actiontypes;

const casualLeaveData = []

export const getCasualLeaveData = (state = casualLeaveData, { type, payload }) => {
    switch (type) {
        case FETCH_CASUAL_LEAVE_DATA:
            return [payload]
        default:
            return state
    }
}