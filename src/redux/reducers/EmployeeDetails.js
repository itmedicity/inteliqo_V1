import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_DETAILS } = Actiontypes;

const EmpdetlInitialState = {
    EmpdetlInitialdata: []
}

export const getEmployeedetailsDutyplan = (state = EmpdetlInitialState, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DETAILS:
            return { ...state, EmpdetlInitialdata: payload }
        default:
            return state
    }
}