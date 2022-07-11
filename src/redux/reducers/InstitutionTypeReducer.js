import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_INSTITUTION } = Actiontypes;

const InstitutionType = {
    InstitutionList: [],
    loadingStatus: false
}
/** to get institution type list */
export const getInstitutionType = (state = InstitutionType, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_INSTITUTION:
            return { ...state, InstitutionList: payload, loadingStatus: true }
        default:
            return state
    }
}
