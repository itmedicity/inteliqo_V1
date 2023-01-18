import { Actiontypes } from "../constants/action.type";

const {
    FETCH_RESIGN_COUNT,
    FETCH_CONTRACT_CLOSE,
    FETCH_OVERTIME_COUNT,
    FETCH_OVERTIME_INCHARGE,
    FETCH_OVERTIME_COUNT_HOD,
    FETCH_OVERTIME_COUNT_CEO,
    FETCH_OVERTIME_COUNT_USER,
    FETCH_LEAVE_REQ_COUNT_INCHARGE,
    FETCH_LEAVE_REQ_COUNT_HOD,
    FETCH_LEAVE_REQ_COUNT_CEO,
    FETCH_GET_LEAVE_REQ_COUNT_HR,
    FETCH_LEAVE_REQ_COUNT_USER,
    FETCH_RESIGN_REQ_COUNT_INCHARGE,
    FETCH_RESIGN_REQ_COUNT_HOD,
    FETCH_RESIGN_REQ_COUNT_CEO,
    FETCH_CONTRACT_RENEW_COUNT,
    FETCH_TRAIN_COUNT,
    FETCH_REGISTER_RENEW,
    FETCH_PROBATION,
    FETCH_ANNUAL,
    FETCH_HOD_APPRAISAL_COUNT,
    FETCH_INCHARGE_APPARAISAL_COUNT,
    FETCH_CEO_APPRAISAL_COUNT,
    FETCH_APPRAISAL_COMPLETE

} = Actiontypes;


const dashBoadNotify = {
    //for leave request
    133: { slno: 133, name: "Leave Request", count: 0, status: true },
    134: { slno: 134, name: "Leave Request User", count: 0, status: true },
    135: { slno: 135, name: "Leave Request Incharge", count: 0, status: true },
    136: { slno: 136, name: "Leave Request HOD", count: 0, status: true },
    137: { slno: 137, name: "Leave Request CEO", count: 0, status: true },

    //ot 
    141: { slno: 141, name: "Overtime Request", count: 0, status: true },
    142: { slno: 142, name: "Overtime Request User", count: 0, status: true },
    143: { slno: 143, name: "Overtime Request Incharge", count: 0, status: true },
    144: { slno: 144, name: "Overtime Request HOD", count: 0, status: true },
    145: { slno: 145, name: "Overtime Request CEO", count: 0, status: true },

    //resignation
    146: { slno: 146, name: "Resignation Request", count: 0, status: true },
    147: { slno: 147, name: "Resignation Request Incharge", count: 0, status: true },
    148: { slno: 148, name: "Resignation Request HOD", count: 0, status: true },
    149: { slno: 149, name: "Resignation Request CEO", count: 0, status: true },
    154: { slno: 154, name: "Registration Renew", count: 0, status: true },

    //for appraisal or category change
    139: { slno: 139, name: "Training End", count: 0, status: true },
    187: { slno: 187, name: "Probation End", count: 0, status: true },
    188: { slno: 188, name: "Annual End", count: 0, status: true },
    138: { slno: 138, name: "Contract Renewal", count: 0, status: true },
    140: { slno: 140, name: "Contract Closed", count: 0, status: true },

    //appraisal process
    215: { slno: 215, name: "Appraisal HOD", count: 0, status: true },
    216: { slno: 216, name: "Appraisal Incharge", count: 0, status: true },
    217: { slno: 217, name: "Appraisal CEO", count: 0, status: true },
    219: { slno: 219, name: "Appraisal HR", count: 0, status: true },
}

export const getDashboardNotification = (state = dashBoadNotify, { type, payload, status }) => {

    switch (type) {
        case FETCH_RESIGN_COUNT:
            return { ...state, 146: { slno: 146, name: "Resignation Request", count: payload, status: status } }
        case FETCH_CONTRACT_CLOSE:
            return { ...state, 140: { slno: 140, name: "Contract Closed", count: payload, status: status } }
        case FETCH_OVERTIME_COUNT:
            return { ...state, 141: { slno: 141, name: "Overtime Request", count: payload, status: false } }
        case FETCH_OVERTIME_INCHARGE:
            return { ...state, 143: { slno: 143, name: "Overtime Request Incharge", count: payload, status: false } }
        case FETCH_OVERTIME_COUNT_HOD:
            return { ...state, 144: { slno: 144, name: "Overtime Request HOD", count: payload, status: false } }
        case FETCH_OVERTIME_COUNT_CEO:
            return { ...state, 145: { slno: 145, name: "Overtime Request CEO", count: payload, status: false } }
        case FETCH_OVERTIME_COUNT_USER:
            return { ...state, 142: { slno: 142, name: "Overtime Request User", count: payload, status: false } }
        case FETCH_LEAVE_REQ_COUNT_INCHARGE:
            return { ...state, 135: { slno: 135, name: "Leave Request Incharge", count: payload, status: false } }
        case FETCH_LEAVE_REQ_COUNT_HOD:
            return { ...state, 136: { slno: 136, name: "Leave Request HOD", count: payload, status: false } }
        case FETCH_LEAVE_REQ_COUNT_CEO:
            return { ...state, 137: { slno: 137, name: "Leave Request CEO", count: payload, status: false } }
        case FETCH_GET_LEAVE_REQ_COUNT_HR:
            return { ...state, 133: { slno: 133, name: "Leave Request", count: payload, status: false } }
        case FETCH_LEAVE_REQ_COUNT_USER:
            return { ...state, 134: { slno: 134, name: "Leave Request User", count: payload, status: false } }
        case FETCH_RESIGN_REQ_COUNT_INCHARGE:
            return { ...state, 147: { slno: 147, name: "Resignation Request Incharge", count: payload, status: false } }
        case FETCH_RESIGN_REQ_COUNT_HOD:
            return { ...state, 148: { slno: 148, name: "Resignation Request HOD", count: payload, status: false } }
        case FETCH_RESIGN_REQ_COUNT_CEO:
            return { ...state, 149: { slno: 149, name: "Resignation Request CEO", count: payload, status: false } }
        case FETCH_CONTRACT_RENEW_COUNT:
            return { ...state, 138: { slno: 138, name: "Contract Renewal", count: payload, status: false } }
        case FETCH_TRAIN_COUNT:
            return { ...state, 139: { slno: 139, name: "Training End", count: payload, status: false } }
        case FETCH_REGISTER_RENEW:
            return { ...state, 154: { slno: 154, name: "Registration Renew", count: payload, status: false } }
        case FETCH_PROBATION:
            return { ...state, 187: { slno: 187, name: "Probation End", count: payload, status: false } }
        case FETCH_ANNUAL:
            return { ...state, 188: { slno: 188, name: "Annual Appraisal", count: payload, status: false } }
        case FETCH_HOD_APPRAISAL_COUNT:
            return { ...state, 215: { slno: 215, name: "Appraisal HOD", count: payload, status: false } }
        case FETCH_INCHARGE_APPARAISAL_COUNT:
            return { ...state, 216: { slno: 216, name: "Appraisal Incharge", count: payload, status: false } }
        case FETCH_CEO_APPRAISAL_COUNT:
            return { ...state, 217: { slno: 217, name: "Appraisal CEO", count: payload, status: false } }
        case FETCH_APPRAISAL_COMPLETE:
            return { ...state, 219: { slno: 219, name: "Appraisal HR", count: payload, status: false } }
        default:
            return state;
    }
}

