import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENT } = Actiontypes;

const dept = {
    departmentlist: [],
    loadingStatus: false
}

export const getdept = (state = dept, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENT:
            return { ...state, departmentlist: payload, loadingStatus: true }
        default:
            return state
    }
}