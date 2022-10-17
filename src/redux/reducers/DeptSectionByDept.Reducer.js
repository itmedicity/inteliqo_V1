import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENTSECTION } = Actiontypes;

const departmentSec = {
    deptSecList: [],
    loadingStatus: false
}
export const getDeptSecList = (state = departmentSec, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENTSECTION:
            return { ...state, deptSecList: payload, loadingStatus: true }
        default:
            return state
    }
}