import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_BLOODGROUP } = Actiontypes;

const empBloodgrp = {
    empBlood: []
}
export const getEmployeeBloodgrp = (state = empBloodgrp, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_BLOODGROUP:
            return { ...state, empBlood: payload }
        default:
            return state
    }
}