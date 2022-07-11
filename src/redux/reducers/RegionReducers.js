import { Actiontypes } from '../constants/action.type'

const { FETCH_REGION_DATA } = Actiontypes;

/** Initialize state */
const emRegion = {
    RegionList: [],
    loadingStatus: false
}

export const getRegionList = (state = emRegion, { type, payload }) => {
    switch (type) {
        case FETCH_REGION_DATA:
            return { ...state, RegionList: payload, loadingStatus: true }
        default:
            return state
    }
}