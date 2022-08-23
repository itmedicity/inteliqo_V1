import { Actiontypes } from '../constants/action.type'

const { FETCH_GRADE_LIST } = Actiontypes;

const grade = {
    gradeList: [],
    loadingStatus: false
}

export const getGradeList = (state = grade, { type, payload }) => {
    switch (type) {
        case FETCH_GRADE_LIST:
            return { ...state, gradeList: payload, loadingStatus: true }
        default:
            return state
    }
}