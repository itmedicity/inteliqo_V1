import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_MESSAGE } = Actiontypes;

const emMessage = {
    MessageList: []
}

export const getMsgList = (state = emMessage, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_MESSAGE:
            return { ...state, MessageList: payload }
        default:
            return state
    }
}