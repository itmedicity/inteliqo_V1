import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_BLOODGROUP } = Actiontypes;
/** Initialize state */
const empBloodgrp = {
    empBlood: [],
    loadingStatus: false
}

/** to get employee bloodgroup list */
export const getEmployeeBloodgrp = (state = empBloodgrp, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_BLOODGROUP:
            return { ...state, empBlood: payload, loadingStatus: true }
        default:
            return state
    }
}