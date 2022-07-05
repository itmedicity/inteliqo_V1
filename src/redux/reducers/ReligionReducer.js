import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_RELIGION } = Actiontypes;

const empReligions = {
    empRel: []
}
export const getEmployeeReligion = (state = empReligions, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_RELIGION:
            return { ...state, empRel: payload }
        default:
            return state
    }
}