import { Actiontypes } from "../constants/action.type";

const { FETCH_EMP_LEAVE_PROCESS_DETL } = Actiontypes;

const EmployeeProceeRecord = {
    ProcessRecord: {
        category_slno: 0,
        em_category: 0,
        em_conf_end_date: "2000-01-01",
        em_cont_close_date: 0,
        em_cont_end: "2000-01-01",
        em_cont_renew: 0,
        em_cont_start: "2000-01-01",
        contract_end_date: "2000-01-01",
        date_of_join: "2000-01-01",
        em_id: 0,
        em_no: 0,
        probation_end_date: "2000-01-01",
        next_updatedate: "2000-01-01",
        is_under_contract: 0,
        is_under_probation: 0,
        em_gender: 0
    },
    loadingStatus: false,
    error: {}
}

export const getEmployeeProcessRecord = (state = EmployeeProceeRecord, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_LEAVE_PROCESS_DETL:
            return { ...state, ProcessRecord: payload, loadingStatus: true }
        default:
            return state
    }
}