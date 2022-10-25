import { Actiontypes } from '../constants/action.type';

const { FETCH_COMMON_SETTING } = Actiontypes;


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
    week_off_day: 0
}

export const getCommonSettings = (state = commonSetting, { type, payload }) => {
    switch (type) {
        case FETCH_COMMON_SETTING:
            return { ...state, ...payload }
        default:
            return state;
    }
}