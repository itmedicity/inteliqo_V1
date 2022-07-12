import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_DESIGNATION } = Actiontypes;

const empDesignation = {
    designationList: [],
    loadingStatus: false
}
/** to get designation  list */
export const getEmployeeDesignation = (state = empDesignation, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DESIGNATION:
            return { ...state, designationList: payload, loadingStatus: true }
        default:
            return state
    }
}