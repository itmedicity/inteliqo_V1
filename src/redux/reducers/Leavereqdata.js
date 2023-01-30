import moment from 'moment';
import { Actiontypes } from '../constants/action.type'
const {
    FETCH_EMP_LEAVE_LIST,
    FETCH_HOD_INCAHRGE_SECTION,
    FETCH_HOD_INCAHRGE_SECT_EMP_NAME,
    FETCH_LEAVE_REQUEST,
    FETCH_COMMON_LEAVES_DATA,
    CHNAGE_REQ_LVE_TYPE,
    FETCH_SINGLE_LEAVE_REQ_FORM_DATA,
    FETCH_EMPLOYEE_INFORMATION_FOR_LVE_REQ,
    LEAVE_REQ_DEFAULT,
    GET_EMPLOYEE_APPROVAL_LEVEL
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
                ...state, empDetl: {
                    ...state.empDetl,
                    em_no: payload.empNo,
                    requestType: payload.requestType,
                    deptSection: payload.deptSection
                }
            }
        case CHNAGE_REQ_LVE_TYPE:
            return {
                ...state, empDetl: {
                    ...state.empDetl.requestType,
                    requestType: payload.requestType
                }
            }
        default:
            return state
    }
}

export const singleLeaveReqState = {
    leaveReqState: {
        dateRangeCheck: false,
        fromDate: moment().format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        singleLevCheck: false,
        singleLeaveType: 0,
        singleLeaveDesc: '',
        totalDays: 0,
        formSubmit: false
    }
}

export const singleLeaveRequestFormState = (state = singleLeaveReqState, { type, payload }) => {
    switch (type) {
        case FETCH_SINGLE_LEAVE_REQ_FORM_DATA:
            return {
                ...state, leaveReqState: {
                    ...state.leaveReqState,
                    dateRangeCheck: payload.dateRangeCheck,
                    fromDate: payload.fromDate,
                    toDate: payload.toDate,
                    singleLevCheck: payload.singleLevCheck,
                    singleLeaveType: payload.singleLeaveType,
                    singleLeaveDesc: payload.singleLeaveDesc,
                    totalDays: payload.totalDays,
                    formSubmit: payload.formSubmit
                }
            }
        case LEAVE_REQ_DEFAULT:
            return singleLeaveReqState
        default:
            return state
    }
}

const employeeInfomState = {
    empData: []
}

export const getEmployeeInformationState = (state = employeeInfomState, { type, payload }) => {
    switch (type) {
        case FETCH_EMPLOYEE_INFORMATION_FOR_LVE_REQ:
            return { ...state, empData: payload }
        default:
            return state
    }
}

const employeeApprovalLevel = []

export const getEmployeeApprovalLevel = (state = employeeApprovalLevel, { type, payload }) => {
    switch (type) {
        case GET_EMPLOYEE_APPROVAL_LEVEL:
            return [...state, payload[0]]
        default:
            return state
    }
}