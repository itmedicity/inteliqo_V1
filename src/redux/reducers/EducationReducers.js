import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_EDUCATION } = Actiontypes;

const empEducation = {
    EducationList: [],
    loadingStatus: false
}
/** to get education list */
export const getEmployeeEducation = (state = empEducation, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_EDUCATION:
            return { ...state, EducationList: payload, loadingStatus: true }
        default:
            return state
    }
}