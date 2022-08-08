import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_SUBSECTION } = Actiontypes;
/** initialize state */
const empSubSect = {
    SectionList: [],
    loadingStatus: false
}
/** to get district list */
export const getEmployeeSubSect = (state = empSubSect, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_SUBSECTION:
            return { ...state, SectionList: payload, loadingStatus: true }
        default:
            return state
    }
}
