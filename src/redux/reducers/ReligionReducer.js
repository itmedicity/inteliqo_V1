import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_RELIGION } = Actiontypes;

const empReligions = {
    empRel: [],
    loadingStatus: false
}
/** to get religion list */
export const getEmployeeReligion = (state = empReligions, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_RELIGION:
            return { ...state, empRel: payload, loadingStatus: true }
        default:
            return state
    }
}