import { Actiontypes } from '../constants/action.type'

const { FETCH_EARNDEDUCTION_DATA } = Actiontypes;
/** initialize state */
const earnDeductData = {
    DataList: [],
    loadingStatus: false
}

export const getEarnData = (state = earnDeductData, { type, payload }) => {
    switch (type) {
        case FETCH_EARNDEDUCTION_DATA:
            return { ...state, DataList: payload, loadingStatus: true }
        default:
            return state
    }
}