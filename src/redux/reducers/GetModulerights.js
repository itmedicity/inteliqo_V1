import { Actiontypes } from '../constants/action.type'

const { GET_MODULE_RIGHTS } = Actiontypes;

const modulerights = {
    modulerightsList: []
}

export const getModuleRightList = (state = modulerights, { type, payload }) => {
    switch (type) {
        case GET_MODULE_RIGHTS:
            return { ...state, modulerightsList: payload }
        default:
            return state
    }
}