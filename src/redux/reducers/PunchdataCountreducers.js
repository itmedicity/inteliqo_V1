import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_PUNCHCOUNT } = Actiontypes;

const empPunchCount = {
    empPunchCountList: []
}

export const getPunchCount = (state = empPunchCount, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_PUNCHCOUNT:
            return { ...state, empPunchCountList: payload }
        default:
            return state
    }
}