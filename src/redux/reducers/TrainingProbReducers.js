import { Actiontypes } from "../constants/action.type"
const { FETCH_EMP_TRAININPROBA } = Actiontypes;

const empTrianingprobation = {
    TraningprobaList: [],
    loadingStatus: false
}

export const getEmployeeTrainingProbation = (state = empTrianingprobation, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_TRAININPROBA:
            return { ...state, TraningprobaList: payload, loadingStatus: true }
        default:
            return state
    }
}