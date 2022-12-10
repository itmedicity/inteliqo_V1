import { Actiontypes } from '../constants/action.type'
const {
    FETCH_EMP_LEAVE_LIST,
    FETCH_HOD_INCAHRGE_SECTION,
    FETCH_HOD_INCAHRGE_SECT_EMP_NAME,
    FETCH_LEAVE_REQUEST,
    FETCH_COMMON_LEAVES_DATA,
    CHNAGE_REQ_LVE_TYPE
} = Actiontypes;

const Leavestate = [];
export const leavedata = (state = Leavestate, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_LEAVE_LIST:
            return [...state, ...payload]
        default:
            return state
    }
}

const hodAuthorisedSectionName = {
    sectionDetal: []
};

export const hodAuthorisedSection = (state = hodAuthorisedSectionName, { type, payload }) => {
    switch (type) {
        case FETCH_HOD_INCAHRGE_SECTION:
            return { ...state, sectionDetal: payload }
        default:
            return state
    }
}

const hodBasedSectionNames = {
    sectionEmployeeName: []
};

export const hodBasedSectionNameList = (state = hodBasedSectionNames, { type, payload }) => {
    switch (type) {
        case FETCH_HOD_INCAHRGE_SECT_EMP_NAME:
            return { ...state, sectionEmployeeName: payload }
        default:
            return state
    }
}

//for getting All the Leave information
const creditedLeave = {
    commonLeave: [],
    casualLeave: [],
    earnLeave: [],
    holiday: [],
    carryForward: [],
    creditedLeaves: []
}

//for getting the Common Leaves
export const getEmpLeaveData = (state = creditedLeave, { type, payload }) => {
    switch (type) {
        case FETCH_COMMON_LEAVES_DATA:
            return { ...state, commonLeave: payload }
        default:
            return state
    }
}


// for getting the leave request form data
const leaveRequestState = {
    empDetl: {
        em_no: 0,
        requestType: 0,
        deptSection: 0
    }
}

export const getLeaveRequestInfom = (state = leaveRequestState, { type, payload }) => {
    switch (type) {
        case FETCH_LEAVE_REQUEST:
            return {
                ...state, empDetl: { ...state.empDetl, em_no: payload.empNo, requestType: payload.requestType, deptSection: payload.deptSection }
            }
        case CHNAGE_REQ_LVE_TYPE:
            return {
                ...state, empDetl: { ...state.empDetl.requestType, requestType: payload.requestType }
            }
        default:
            return state
    }
}



