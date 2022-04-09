import { Actiontypes } from '../constants/action.type'

const { FETCH_ALERT_MESSAGE } = Actiontypes;

const emAlert = {
    alertList: []
}

export const getAlertList = (state = emAlert, { type, payload }) => {
    switch (type) {
        case FETCH_ALERT_MESSAGE:
            return { ...state, alertList: payload }
        default:
            return state
    }
}