import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_INSTITUTION } = Actiontypes;

const InstitutionType = {
    InstitutionList: []
}

export const getInstitutionType = (state = InstitutionType, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_INSTITUTION:
            return { ...state, InstitutionList: payload }
        default:
            return state
    }
}
