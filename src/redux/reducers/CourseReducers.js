import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_COURSE } = Actiontypes;

const empCourse = {
    CourseList: [],
    loadingStatus: false
}
/** to get course list */
export const getEmployeeCourse = (state = empCourse, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_COURSE:
            return { ...state, CourseList: payload, loadingStatus: true }
        default:
            return state
    }
}