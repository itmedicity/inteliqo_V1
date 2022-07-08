import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_NAME } = Actiontypes;

const empNameList = {
    empNameList: []
}
export const getEmpNameList = (state = empNameList, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_NAME:
            return { ...state, empNameList: payload }
        default:
            return state
    }
}