import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_REGISTRATION_TYPE } = Actiontypes;

const empRegistrationType = {
    RegistrationTypeList: [],
    loadingStatus: false
}

export const getEmpRegistrationType = (state = empRegistrationType, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_REGISTRATION_TYPE:
            return { ...state, RegistrationTypeList: payload, loadingStatus: true }
        default:
            return state
    }
}