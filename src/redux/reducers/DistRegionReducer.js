import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_DISTREGION } = Actiontypes;
/** Initialize state */
const empDistRegion = {
    empDistReg: [],
    loadingStatus: false
}
/** to get district wise region list */
export const getDistRegion = (state = empDistRegion, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DISTREGION:
            return { ...state, empDistReg: payload, loadingStatus: true }
        default:
            return state
    }
}