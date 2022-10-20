import { Actiontypes } from "../constants/action.type"
const { FETCH_SHIFT_DATA } = Actiontypes;

const shift = {
    shiftDetails: [],
    loadingStatus: false
}
/** to get shift list */
export const getShiftList = (state = shift, { type, payload }) => {
    switch (type) {
        case FETCH_SHIFT_DATA:
            return { ...state, shiftDetails: payload, loadingStatus: true }
        default:
            return state
    }
}