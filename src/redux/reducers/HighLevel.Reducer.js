import { Actiontypes } from '../constants/action.type'

const { FETCH_HIGHLEVEL_DATA } = Actiontypes;

const HighLevel = {
    HighLevelData: [],
    loadingStatus: false
}
export const getHighLevelData = (state = HighLevel, { type, payload }) => {
    switch (type) {
        case FETCH_HIGHLEVEL_DATA:
            return { ...state, HighLevelData: payload, loadingStatus: true }
        default:
            return state
    }
}