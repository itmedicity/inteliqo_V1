import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENT_LIST } = Actiontypes;

const empDepartment = {
    empDepartmentList: [],
    loadingStatus: false
}

export const getDepartmentList = (state = empDepartment, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENT_LIST:
            return { ...state, empDepartmentList: payload, loadingStatus: true }
        default:
            return state
    }
}