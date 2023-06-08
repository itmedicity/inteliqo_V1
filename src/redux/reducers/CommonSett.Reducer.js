import moment from 'moment';
import { Actiontypes } from '../constants/action.type';

const { FETCH_COMMON_SETTING, SELECTED_DEPT_VAL, FETCH_DEPT_SECTION_DETL, FETCH_EMPLOYEE_DETL, FETCH_PUNCH_DATA, FETCH_SHIFT_DATA, FETCH_PUNCH_MASTER_DATA,
    UPDATE_PUNCHMASTER_TABLE } = Actiontypes;


const commonSetting = {
    carry_cl: 0,
    carry_el: 0,
    carry_hl: 0,
    carry_sl: 0,
    cmmn_early_out: 0,
    cmmn_early_out_grace: 0,
    cmmn_grace_period: 0,
    cmmn_late_in: 0,
    cmmn_late_in_grace: 0,
    default_shift: null,
    esi_employee: 0,
    esi_employer: 0,
    esi_limit: 0,
    max_salary: 0,
    min_salary: 0,
    noofadvanceinyear: null,
    notapplicable_shift: null,
    pf_age: 56,
    pf_employee: 0,
    pf_employer: 0,
    verification_level: 0,
    week_off_day: 0,
    salary_above: 0,
    noff_count: 0
}

export const getCommonSettings = (state = commonSetting, { type, payload }) => {
    switch (type) {
        case FETCH_COMMON_SETTING:
            return { ...state, ...payload }
        default:
            return state;
    }
}

//GET DEPARTMENT ID 

const selectedDept = {
    dept: 0
}

export const selectedDeptCode = (state = selectedDept, { type, payload }) => {
    switch (type) {
        case SELECTED_DEPT_VAL:
            return { ...state, dept: payload }
        default:
            return state;
    }
}


//GET THE DEPT SECTION 

const deptSection = {
    section: []
}

export const getDepartmentSection = (state = deptSection, { type, payload }) => {
    switch (type) {
        case FETCH_DEPT_SECTION_DETL:
            return { ...state, section: payload }
        default:
            return state;
    }
}

//GET THE EMPLOYEE DETAILS

const empBasedSection = {
    emp: []
}

export const getEmployeeBasedSection = (state = empBasedSection, { type, payload }) => {
    switch (type) {
        case FETCH_EMPLOYEE_DETL:
            return { ...state, emp: payload }
        default:
            return state;
    }
}

const punchData = {
    punchDta: []
}

export const getPunchData = (state = punchData, { type, payload }) => {
    switch (type) {
        case FETCH_PUNCH_DATA:
            return { ...state, punchDta: payload }
        default:
            return state;
    }
}


const shiftData = {
    shiftData: []
}

export const getShiftData = (state = shiftData, { type, payload }) => {
    switch (type) {
        case FETCH_SHIFT_DATA:
            return { ...state, shiftData: payload }
        default:
            return state;
    }
}

//GET PUNCH MASTER DATA DATE & EMP WISE

const punchMasterData = {
    punchMaster: []
}

export const getPunchMasterData = (state = punchMasterData, { type, payload }) => {
    switch (type) {
        case FETCH_PUNCH_MASTER_DATA:
            return { ...state, punchMaster: payload }
        default:
            return state;
    }
}

//UPDATED PUNCHMASTER DATA 
const updatedPunchInOutData = {
    puMaData: {}
}

export const fetchupdatedPunchInOutData = (state = updatedPunchInOutData, { type, payload }) => {
    switch (type) {
        case UPDATE_PUNCHMASTER_TABLE:
            return { ...state, puMaData: payload }
        default:
            return state;
    }
}