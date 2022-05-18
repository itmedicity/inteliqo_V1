import { Actiontypes } from '../constants/action.type'

const { FETCH_REGION_DATA } = Actiontypes;

const emRegion = {
    RegionList: []
}

export const getRegionList = (state = emRegion, { type, payload }) => {
    switch (type) {
        case FETCH_REGION_DATA:
            return { ...state, RegionList: payload }
        default:
            return state
    }
}