import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_USERRIGHTS } = Actiontypes;

const userRights = {
    rightslist: [],
    loadingStatus: false
}
export const getUserRights = (state = userRights, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_USERRIGHTS:
            return { ...state, rightslist: payload, loadingStatus: true }
        default:
            return state
    }
}