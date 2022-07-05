import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_DISTRICT } = Actiontypes;

const empDistrict = {
    DidtrictList: []
}

export const getDistrictList = (state = empDistrict, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DISTRICT:
            return { ...state, DidtrictList: payload }
        default:
            return state
    }
}
