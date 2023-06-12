import { Actiontypes } from '../constants/action.type'

const { FETCH_EMPLOYEE_UNDER_DEPTSEC } = Actiontypes;

const empNames = {
    empNamesList: [],
    loadingStatus: false
}
export const getEmpUnderDeptsecList = (state = empNames, { type, payload }) => {
    switch (type) {
        case FETCH_EMPLOYEE_UNDER_DEPTSEC:
            return { ...state, empNamesList: payload, loadingStatus: true }
        default:
            return state
    }
}