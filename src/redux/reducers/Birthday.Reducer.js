import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_BIRTHDAY } = Actiontypes;

const empBirthday = {
    empBirthdayList: [],
    loadingStatus: false
}

export const getBirthdayList = (state = empBirthday, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_BIRTHDAY:
            return { ...state, empBirthdayList: payload, loadingStatus: true }
        default:
            return state
    }
}