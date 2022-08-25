import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_MENU_SLNO } = Actiontypes;

const menuCmp = {
    slno: 0
}

export const getMenuRenderCompRights = (state = menuCmp, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_MENU_SLNO:
            return { ...state, slno: payload }
        default:
            return state
    }
}