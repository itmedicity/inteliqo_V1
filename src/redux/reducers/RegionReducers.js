import { Actiontypes } from '../constants/action.type'

const { FETCH_REGION_DATA, FETCH_PIN_WISE_REGION } = Actiontypes;

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


const pinwiseRegion = {
    pinWiseRegionList: [],
    regionLoadingStatus: false
}

export const getPinWiseRegionData = (state = pinwiseRegion, { type, payload }) => {
    switch (type) {
        case FETCH_PIN_WISE_REGION:
            return { ...state, pinWiseRegionList: payload, loadingStatus: true }
        default:
            return state
    }
}