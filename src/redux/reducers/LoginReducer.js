import { Actiontypes } from '../constants/action.type'

const { FETCH_LOGIN_CRED } = Actiontypes;

const LoginInitialState = {}

export const LoginCredential = (state = LoginInitialState, { type, payload }) => {
    switch (type) {
        case FETCH_LOGIN_CRED:
            return { ...state, ...payload }
        default:
            return state
    }
}