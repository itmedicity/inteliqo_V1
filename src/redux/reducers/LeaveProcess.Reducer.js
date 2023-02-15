import { Actiontypes } from "../constants/action.type";

const {
    FETCH_HOLIDAY_LIST,
    FETCH_COMMON__LIST,
    FETCH_HOLIDAY_LEAVE_LIST,
    FETCH_COMMON_LEAVE_LIST,
    FETCH_CASUAL_LEAVE_LIST,
    FETCH_PRIVILEGE_LEAVE_LIST,
    FETCH_CARRY_FORWARD_LEAVE_LIST,
    FETCH_CREDIT_LEAVE_LIST,
    UPDATE_CASUAL_LEAVE
} = Actiontypes;

const holiday = {
    status: 2,
    data: []
};
const commonLeave = {
    status: 2,
    data: []
};

const casualLeaveList = [];
const holidayLeaveList = [];
const privilegeLeaveList = [];
const commonLeaveList = [];
const carryForwardList = [];
const creditLeaveList = [];

//gET tHE hOLIDAY lIST (cURRENT yEAR)
export const getHolidayList = (state = holiday, { type, payload }) => {
    switch (type) {
        case FETCH_HOLIDAY_LIST:
            return { ...state, data: payload.data, status: payload.status }
        default:
            return state
    }
}

//gET tHE cOMMON lEAVE 

export const getCommonLeave = (state = commonLeave, { type, payload }) => {
    switch (type) {
        case FETCH_COMMON__LIST:
            return { ...state, data: payload.data, status: payload.status }
        default:
            return state
    }
}

//get credited casual leaves
export const getCreditedCasualLeaves = (state = casualLeaveList, { type, payload }) => {
    switch (type) {
        case FETCH_CASUAL_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}

//get credited holiday leaves
export const getCreditedHolidayLeaves = (state = holidayLeaveList, { type, payload }) => {
    switch (type) {
        case FETCH_HOLIDAY_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}

//get credited common leaves
export const getCreditedCommonLeaves = (state = commonLeaveList, { type, payload }) => {
    switch (type) {
        case FETCH_COMMON_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}

//get credited privilege leaves
export const getCreditedPrivilegeLeaves = (state = privilegeLeaveList, { type, payload }) => {
    switch (type) {
        case FETCH_PRIVILEGE_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}

//get credited Carry Forward leaves
export const getCreditedCarryForwardLeaves = (state = carryForwardList, { type, payload }) => {
    switch (type) {
        case FETCH_CARRY_FORWARD_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}

//get credited Credited leaves
export const getCreditedCreditedLeaves = (state = creditLeaveList, { type, payload }) => {
    switch (type) {
        case FETCH_CREDIT_LEAVE_LIST:
            return { ...state, data: payload }
        default:
            return state
    }
}


const casualLeaveStatus = 0;

export const updateCasualLeaveStatus = (state = casualLeaveStatus, { type }) => {
    switch (type) {
        case UPDATE_CASUAL_LEAVE:
            return state + 1
        default:
            return state
    }
}