import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_VACCINATION_DETAILS } = Actiontypes;


const empVaccination = {
    VaccinationList: [],
    loadingStatus: false

}

export const setVaccinationemp = (state = empVaccination, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_VACCINATION_DETAILS:
            return { ...state, VaccinationList: payload, loadingStatus: true }
        default:
            return state
    }
}
