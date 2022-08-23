import { Actiontypes } from '../constants/action.type'

const { FETCH_CONTRACT_CLOSE_DATA, FETCH_CONT_CLOSE_ATTENDANCE, FETCH_CONTRACT_ARREAR, FETCH_OLD_DATA_TO_COPY,
    FETCH_OLD_PERSONAL_DATA, FETCH_OLD_QUALIFICATION, FETCH_OLD_EXPERIENCE, FETCH_OLD_SALARYINFORM } = Actiontypes;



const contractDataInitialState = {
    contractclose: {
        contCloseData: {},
    },
    attendancedetls: {
        attendancedata: {}
    },
    arreardetails: {
        arreardata: {}
    },
    olDataTocopy: {
        dataTocopy: []
    },
    oldPersonalData: {
        personalData: []
    },
    oldSalaryInform: {
        SalaryData: []
    }
}

export const getContractClosedata = (state = contractDataInitialState, { type, payload }) => {
    switch (type) {
        case FETCH_CONTRACT_CLOSE_DATA:
            return {
                ...state,
                contractclose: {
                    ...state.contractclose,
                    contCloseData: payload,

                }
            }
        case FETCH_CONT_CLOSE_ATTENDANCE:
            return {
                ...state,
                attendancedetls: {
                    ...state.attendancedetls,
                    attendancedata: payload,
                }
            }
        case FETCH_CONTRACT_ARREAR:
            return {
                ...state,
                arreardetails: {
                    ...state.arreardetails,
                    arreardata: payload,
                }
            }
        case FETCH_OLD_DATA_TO_COPY:
            return {
                ...state,
                olDataTocopy: {
                    ...state.olDataTocopy,
                    dataTocopy: payload,
                }

            }
        case FETCH_OLD_PERSONAL_DATA:
            return {
                ...state,
                oldPersonalData: {
                    ...state.oldPersonalData,
                    personalData: payload,
                }

            }
        case FETCH_OLD_SALARYINFORM:
            return {
                ...state,
                oldSalaryInform: {
                    ...state.oldSalaryInform,
                    SalaryData: payload,
                }

            }
        default:
            return state
    }
}







