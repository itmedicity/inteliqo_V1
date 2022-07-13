import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_SPECILIZATION } = Actiontypes;

const empSpecilization = {
    SpecilizationList: [],
    loadingStatus: false
}
/** to get specilization list */
export const getEmployeeSpeclization = (state = empSpecilization, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_SPECILIZATION:
            return { ...state, SpecilizationList: payload, loadingStatus: true }
        default:
            return state
    }
}