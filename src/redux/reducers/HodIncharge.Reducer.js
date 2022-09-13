import { Actiontypes } from '../constants/action.type'

const { FETCH_HOD_INCHARGE } = Actiontypes;

/** Initialize state */
const names = {
    nameList: [],
    loadingStatus: false
}

export const getHODInchargeNameList = (state = names, { type, payload }) => {
    switch (type) {
        case FETCH_HOD_INCHARGE:
            return { ...state, nameList: payload, loadingStatus: true }
        default:
            return state
    }
}