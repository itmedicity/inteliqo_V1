import { Actiontypes } from "../constants/action.type"
const { GET_EXCEL_DATA, FETCH_PAYSLIP_TABLEDATA } = Actiontypes;

const excelData = {
    status: true,
    excelList: []
};

export const getExcelData = (state = excelData, { type, payload }) => {
    switch (type) {
        case GET_EXCEL_DATA:
            return { ...state, excelList: payload, status: false }
        default:
            return state
    }
}

const paySlipData = {
    status: true,
    dataList: []
}

export const getPaySlipData = (state = paySlipData, { type, payload }) => {
    switch (type) {
        case FETCH_PAYSLIP_TABLEDATA:
            return { ...state, dataList: payload, status: false }
        default:
            return state
    }
}