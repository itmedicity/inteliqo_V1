import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_DISTREGION } = Actiontypes;
const empDistRegion = {
    empDistReg: []
}
export const getDistRegion = (state = empDistRegion, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DISTREGION:
            return { ...state, empDistReg: payload }
        default:
            return state
    }
}