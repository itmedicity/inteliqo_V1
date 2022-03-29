import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTSEC_LIST } = Actiontypes;

const empDeptSection = {
    empDeptSectionList: []
}

export const getDeprtSection = (state = empDeptSection, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTSEC_LIST:
            return { ...state, empDeptSectionList: payload }
        default:
            return state
    }
}