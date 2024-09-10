import { Actiontypes } from '../constants/action.type'

const { FETCH_EMPLOYEE_LIST } = Actiontypes;

const emp = {
    Employelist: [],
    loadingStatus: false
}

export const getemp = (state = emp, { type, payload }) => {
    switch (type) {
        case FETCH_EMPLOYEE_LIST:
            return { ...state, Employelist: payload, loadingStatus: true }
        default:
            return state
    }
}