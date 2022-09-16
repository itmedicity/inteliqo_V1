import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_ACTIVECOUNT } = Actiontypes;

const empActiveCount = {
    empActiveCountList: []
}

export const getActiveCountemp = (state = empActiveCount, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_ACTIVECOUNT:
            return { ...state, empActiveCountList: payload }
        default:
            return state
    }
}