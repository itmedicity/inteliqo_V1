import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_CATEGORY } = Actiontypes;

const empCategory = {
    empCategory: [],
    loadingStatus: false
}
/** to get category list */
export const getEmployeeCategory = (state = empCategory, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_CATEGORY:
            return { ...state, empCategory: payload, loadingStatus: true }
        default:
            return state
    }
}