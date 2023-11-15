const { Actiontypes } = require("../constants/action.type");

const {
    FETCH_TRAINING_TYPE_ALL,
    FETCH_SELECT_NEW_JOINERS,
    FETCH_TRAINING_CATEGORY_ALL,
    FETCH_TRAINING_NAMES_ALL,
    FETCH_TRAINING_SCHEDULE_ALL,
    FETCH_DEPARTMENTAL_TRAINING_SCHEDULE_ALL,
    FETCH_TRAINING_TOPICS_ALL,
    FETCH_TRAINER_NAMES_ALL,
    FETCH_DEPT_EMP_NAME,
    FETCH_TRAINING_PROCESS_ALL,
    FETCH_DEPARTMENTAL_TRAINING_SCHEDULE,
    FETCH_DEPT_EMP_NAME_DESG,
    FETCH_SCHEDULE_TOPIC_BASED_ON_EMP,
    FETCH_ALL_QUESTIONS,
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
    },
    trainingTopics: {
        trainingTopicsList: [],
        trainingTopicsStatus: false
    },
    trainerNames: {
        trainerNamesList: [],
        trainerNamesStatus: false
    },
    deptBasedonEmp: {
        deptBasedonEmpList: [],
        deptBasedonEmpStatus: false
    },
    trainingProcess: {
        trainingProcessList: [],
        trainingProcessStatus: false
    },
    departmentalTrainingDetails: {
        departmentalTrainingDetailsList: [],
        departmentalTrainingDetailsStatus: false
    },
    deptEmpNameDesDetails: {
        deptEmpNameDesDetailsList: [],
        deptEmpNameDesDetailsStatus: false
    },
    scheduleTopicOnEmp: {
        scheduleTopicOnEmpList: [],
        scheduleTopicOnEmpStatus: false
    },
    QuestionDetails: {
        QuestionDetailsList: [],
        QuestionDetailsStatus: false
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
        case FETCH_TRAINING_TOPICS_ALL:
            return {
                ...state,
                trainingTopics: {
                    ...state.trainingTopics,
                    trainingTopicsList: payload,
                    trainingTopicsStatus: true
                }
            }
        case FETCH_TRAINER_NAMES_ALL:
            return {
                ...state,
                trainerNames: {
                    ...state.trainerNames,
                    trainerNamesList: payload,
                    trainerNamesStatus: true
                }
            }
        case FETCH_DEPT_EMP_NAME:
            return {
                ...state,
                deptBasedonEmp: {
                    ...state.deptBasedonEmp,
                    deptBasedonEmpList: payload,
                    deptBasedonEmpStatus: true
                }
            }
        case FETCH_TRAINING_PROCESS_ALL:
            return {
                ...state,
                trainingProcess: {
                    ...state.trainingProcess,
                    trainingProcessList: payload,
                    trainingProcessStatus: true
                }
            }
        case FETCH_DEPARTMENTAL_TRAINING_SCHEDULE:
            return {
                ...state,
                departmentalTrainingDetails: {
                    ...state.departmentalTrainingDetails,
                    departmentalTrainingDetailsList: payload,
                    departmentalTrainingDetailsStatus: true
                }
            }
        case FETCH_DEPT_EMP_NAME_DESG:
            return {
                ...state,
                deptEmpNameDesDetails: {
                    ...state.deptEmpNameDesDetails,
                    deptEmpNameDesDetailsList: payload,
                    deptEmpNameDesDetailsStatus: true
                }
            }
        case FETCH_SCHEDULE_TOPIC_BASED_ON_EMP:
            return {
                ...state,
                scheduleTopicOnEmp: {
                    ...state.scheduleTopicOnEmp,
                    scheduleTopicOnEmpList: payload,
                    scheduleTopicOnEmpStatus: true
                }
            }
        case FETCH_ALL_QUESTIONS:
            return {
                ...state,
                QuestionDetails: {
                    ...state.QuestionDetails,
                    QuestionDetailsList: payload,
                    QuestionDetailsStatus: true
                }
            }
        default:
            return state;
    }

}