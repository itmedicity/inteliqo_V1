import { Actiontypes } from "../constants/action.type"
const { FETCH_SHIFT_DATA, GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_UPDATED_SHIFT_ID } = Actiontypes;

const shift = {
    shiftDetails: [],
    loadingStatus: false
}
/** to get shift list */
export const getShiftList = (state = shift, { type, payload }) => {
    switch (type) {
        case FETCH_SHIFT_DATA:
            return { ...state, shiftDetails: payload, loadingStatus: true }
        default:
            return state
    }
}

const planDetl = {
    status: true,
    shiftData: []
};

export const getShiftPlanDetl = (state = planDetl, { type, payload }) => {
    switch (type) {
        case GET_SHIFT_PLAN_DETL:
            return { ...state, shiftData: payload, status: false }
        default:
            return state
    }
}


const planDateFormat = {
    status: true,
    dateFormat: []
};

export const getShiftDateFormat = (state = planDateFormat, { type, payload }) => {
    switch (type) {
        case GET_SHIFT_DATE_FORMAT:
            return { ...state, dateFormat: payload, status: false }
        default:
            return state
    }
}


const updatedShiftState = []

export const getUpdatedShiftId = (state = updatedShiftState, { type, payload }) => {
    switch (type) {
        case FETCH_UPDATED_SHIFT_ID:
            let newArray = [...state];
            const newUpdatedShiftArray = newArray.filter((val) => {
                return val.plan_slno !== payload.plan_slno;
            })
            return [...newUpdatedShiftArray, payload];
        default:
            return state;
    }
}
