import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_BRANCH } = Actiontypes;
/** Initialize state */
const empBranch = {
    branchList: [],
    loadingStatus: false
}
/** to get branch list */
export const getBranchList = (state = empBranch, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_BRANCH:
            return { ...state, branchList: payload, loadingStatus: true }
        default:
            return state
    }
}