import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPT_SHIFT_DATA } = Actiontypes;

const deptshiftInitialData = {
    deptShiftData: []
}

export const getDepartmentShiftData = (state = deptshiftInitialData, { type, payload }) => {
    switch (type) {
        case FETCH_DEPT_SHIFT_DATA:
            return { ...state, deptShiftData: payload }
        default:
            return state
    }
}