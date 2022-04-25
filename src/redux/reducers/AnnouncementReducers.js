import { Actiontypes } from '../constants/action.type'

const { FETCH_ANNOUNCEMENT_MESSAGE } = Actiontypes;

const emAnnouncement = {
    AnnouncementList: []
}

export const getAnnouncementList = (state = emAnnouncement, { type, payload }) => {
    switch (type) {
        case FETCH_ANNOUNCEMENT_MESSAGE:
            return { ...state, AnnouncementList: payload }
        default:
            return state
    }
}