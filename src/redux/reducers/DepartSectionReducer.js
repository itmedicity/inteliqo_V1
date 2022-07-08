import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_DEPTSECT } = Actiontypes;

const deptSection = {
    deptSectionList: []
}
export const getDeptSectList = (state = deptSection, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DEPTSECT:
            return { ...state, deptSectionList: payload }
        default:
            return state
    }
}