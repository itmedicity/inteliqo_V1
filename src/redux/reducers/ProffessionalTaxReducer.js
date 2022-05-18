import { Actiontypes } from '../constants/action.type'

const { FETCH_PROFFESSIONAL_TAX } = Actiontypes;

const proTax = {
    proTaxList: []
}

export const getProTaxList = (state = proTax, { type, payload }) => {
    switch (type) {
        case FETCH_PROFFESSIONAL_TAX:
            return { ...state, proTaxList: payload }
        default:
            return state
    }
}