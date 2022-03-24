import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_RECORD_LIST } = Actiontypes;

const empRecordInitState = {
    empRecordData: []
}

export const getEmployeeRecordList = (state = empRecordInitState, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_RECORD_LIST:
            return { ...state, empRecordData: payload }
        default:
            return state
    }
}