import { Actiontypes } from '../constants/action.type'

const { LOGIN_EMP_DEPTSECT } = Actiontypes;

const deptSectData = {
    deptSectList: [],
    loadingStatus: false
}

export const getloginDeptSection = (state = deptSectData, { type, payload }) => {
    switch (type) {
        case LOGIN_EMP_DEPTSECT:
            return { ...state, deptSectList: payload, loadingStatus: true }
        default:
            return state
    }
}