import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_DISTRICT } = Actiontypes;
/** initialize state */
const empDistrict = {
    DidtrictList: [],
    loadingStatus: false
}
/** to get district list */
export const getDistrictList = (state = empDistrict, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_DISTRICT:
            return { ...state, DidtrictList: payload, loadingStatus: true }
        default:
            return state
    }
}
