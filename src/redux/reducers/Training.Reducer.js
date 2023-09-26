const { Actiontypes } = require("../constants/action.type");

const {
    FETCH_TRAINING_TYPE_ALL,
    FETCH_SELECT_NEW_JOINERS,
    FETCH_TRAINING_CATEGORY_ALL,
    FETCH_TRAINING_NAMES_ALL,
    FETCH_TRAINING_SCHEDULE_ALL,
    FETCH_DEPARTMENTAL_TRAINING_SCHEDULE_ALL
} = Actiontypes;

const TrainingData = {
    trainingType: {
        trainingTypeList: [],
        trainingTypeStatus: false
    },
    newJoiners: {
        newJoinersList: [],
        newJoinersStatus: false
    },
    trainingCategory: {
        trainingCategoryList: [],
        trainingCategoryStatus: false
    },
    trainingNames: {
        trainingNamesList: [],
        trainingNamesStatus: false
    },
    trainingSchedule: {
        trainingScheduleList: [],
        trainingScheduleStatus: false
    },
    departmentalTrainingSchedule: {
        departmentalTrainingScheduleList: [],
        departmentalTrainingScheduleStatus: false
    }
}

export const gettrainingData = (state = TrainingData, { type, payload }) => {
    switch (type) {
        case FETCH_TRAINING_TYPE_ALL:
            return {
                ...state,
                trainingType: {
                    ...state.trainingType,
                    trainingTypeList: payload,
                    trainingTypeStatus: true
                }
            }
        case FETCH_SELECT_NEW_JOINERS:
            return {
                ...state,
                newJoiners: {
                    ...state.newJoiners,
                    newJoinersList: payload,
                    newJoinersStatus: true
                }
            }
        case FETCH_TRAINING_CATEGORY_ALL:
            return {
                ...state,
                trainingCategory: {
                    ...state.trainingCategory,
                    trainingCategoryList: payload,
                    trainingCategoryStatus: true
                }
            }
        case FETCH_TRAINING_NAMES_ALL:
            return {
                ...state,
                trainingNames: {
                    ...state.trainingNames,
                    trainingNamesList: payload,
                    trainingNamesStatus: true
                }
            }
        case FETCH_TRAINING_SCHEDULE_ALL:
            return {
                ...state,
                trainingSchedule: {
                    ...state.trainingSchedule,
                    trainingScheduleList: payload,
                    trainingScheduleStatus: true
                }
            }
        case FETCH_DEPARTMENTAL_TRAINING_SCHEDULE_ALL:
            return {
                ...state,
                departmentalTrainingSchedule: {
                    ...state.departmentalTrainingSchedule,
                    departmentalTrainingScheduleList: payload,
                    departmentalTrainingScheduleStatus: true
                }
            }
        default:
            return state;
    }

}