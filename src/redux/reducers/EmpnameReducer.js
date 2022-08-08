import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_NAME } = Actiontypes;

const empName = {
    empNameList: [],
    loadingStatus: false
}
export const getEmpNameList = (state = empName, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_NAME:
            return { ...state, empNameList: payload, loadingStatus: true }
        default:
            return state
    }
}