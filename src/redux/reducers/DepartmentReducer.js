import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENT_LIST } = Actiontypes;

const empDepartment = {
    empDepartmentList: []
}

export const getDepartmentList = (state = empDepartment, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENT_LIST:
            return { ...state, empDepartmentList: payload }
        default:
            return state
    }
}