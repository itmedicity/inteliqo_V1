import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_PROFILE_DATA } = Actiontypes;

const Profile_inititalData = {
    ProfileData: {},
    lodingStatus: false,
    error: {}
}

export const getProfileData = (state = Profile_inititalData, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_PROFILE_DATA:
            return { ...state, ProfileData: payload, lodingStatus: true }
        default:
            return state
    }
}