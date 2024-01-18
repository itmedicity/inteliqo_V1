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
    FETCH_ONLINE_TRAINING_DETAILS,
    FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW,
    FETCH_TRAINING_COMPLETED_LIST,
    FETCH_TODAYS_TRAINING__LIST,
    FETCH_TRAINING_ATTENDANCE_DETAILS,
    FETCH_TRAINING_EMP_DETAILS_ALL,
    FETCH_TRAINING_EMP_LIST,
    FETCH_TRAINING_POST_TEST_ALLOTED_TO_EMP,
    FETCH_TRAINING_PRETEST_EMP_LIST_ALL,
    FETCH_TRAINING_PRETEST_QR_EMP_DETAILS,
    FETCH_TRAINING_POSTEST_EMP_LIST_ALL,
    FETCH_TRAINING_POSTTEST_QR_EMP_DETAILS,
    FETCH_BELOW_AVERAGE_EMP_LIST,
    FETCH_RETEST_EMP_TOPICS_BY_EMID,
    FETCH_RETEST_QUESTIONS,
    // FETCH_MONTHLY_TRAINING_REPORT_BY_MONTH,
    FETCH_ALL_DEPARTMENT_NAMES,
    FETCH_ALL_DEPARTMENT_SECTION_NAMES,
    FETCH_ALL_TOPICS_UNDER_DEPT,
    FETCH_TRAINING_TOPIC_BY_DEPT

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
    },
    OnlineTraining: {
        OnlineTrainingList: [],
        OnlineTrainingStatus: false
    },
    ScheduletopicDropdown: {
        ScheduletopicDropdownList: [],
        ScheduletopicDropdownStatus: false
    },
    TrainingCompleted: {
        TrainingCompletedList: [],
        TrainingCompletedStatus: false
    },
    TodaysTrainings: {
        TodaysTrainingsList: [],
        TodaysTrainingsStatus: false
    },
    Attendance: {
        AttendanceList: [],
        AttendanceStatus: false
    },
    trainingEmpDetails: {
        trainingEmpDetailsList: [],
        trainingEmpDetailsStatus: false
    },
    trainingEmp: {
        trainingEmpList: [],
        trainingEmpStatus: false
    },
    AllotPosttest: {
        AllotPosttestList: [],
        AllotPosttestStatus: false
    },
    PreTestEmpListAll: {
        PreTestEmpListAllList: [],
        PreTestEmpListAllStatus: false
    },
    PreTestEmpDetails: {
        PreTestEmpDetailsList: [],
        PreTestEmpDetailsStatus: false
    },
    PostTestEmpDetails: {
        PostTestEmpDetailsList: [],
        PostTestEmpDetailsStatus: false
    },
    PostEmpDetails: {
        PostEmpDetailsList: [],
        PostEmpDetailsStatus: false
    },
    BelowAvgEmp: {
        BelowAvgEmpList: [],
        BelowAvgEmpStatus: false
    },
    RetestEmpTopics: {
        RetestEmpTopicsList: [],
        RetestEmpTopicsStatus: false
    },
    RetestQuestions: {
        RetestQuestionsList: [],
        RetestQuestionsStatus: false
    },
    // MonthlyDetails: {
    //     MonthlyDetailsList: [],
    //     MonthlyDetailsStatus: false
    // },
    DepartmentNames: {
        DepartmentNamesList: [],
        DepartmentNamesStatus: false
    },
    DepartmentSecNames: {
        DepartmentSecNamesList: [],
        DepartmentSecNamesStatus: false
    },
    DepartmentalTrainingTopics: {
        DepartmentalTrainingTopicsList: [],
        DepartmentalTrainingTopicsStatus: false
    },

    TrainingTopicByDept: {
        TrainingTopicByDeptList: [],
        TrainingTopicByDeptStatus: false
    },
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
        case FETCH_ONLINE_TRAINING_DETAILS:
            return {
                ...state,
                OnlineTraining: {
                    ...state.OnlineTraining,
                    OnlineTrainingList: payload,
                    OnlineTrainingStatus: true
                }
            }
        case FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW:
            return {
                ...state,
                ScheduletopicDropdown: {
                    ...state.ScheduletopicDropdown,
                    ScheduletopicDropdownList: payload,
                    ScheduletopicDropdownStatus: true
                }
            }
        case FETCH_TRAINING_COMPLETED_LIST:
            return {
                ...state,
                TrainingCompleted: {
                    ...state.TrainingCompleted,
                    TrainingCompletedList: payload,
                    TrainingCompletedStatus: true
                }
            }
        case FETCH_TODAYS_TRAINING__LIST:
            return {
                ...state,
                TodaysTrainings: {
                    ...state.TodaysTrainings,
                    TodaysTrainingsList: payload,
                    TodaysTrainingsStatus: true
                }
            }
        case FETCH_TRAINING_ATTENDANCE_DETAILS:
            return {
                ...state,
                Attendance: {
                    ...state.Attendance,
                    AttendanceList: payload,
                    AttendanceStatus: true
                }
            }
        case FETCH_TRAINING_EMP_DETAILS_ALL:
            return {
                ...state,
                trainingEmpDetails: {
                    ...state.trainingEmpDetails,
                    trainingEmpDetailsList: payload,
                    trainingEmpDetailsStatus: true
                }
            }
        case FETCH_TRAINING_EMP_LIST:
            return {
                ...state,
                trainingEmp: {
                    ...state.trainingEmp,
                    trainingEmpList: payload,
                    trainingEmpStatus: true
                }
            }
        case FETCH_TRAINING_POST_TEST_ALLOTED_TO_EMP:
            return {
                ...state,
                AllotPosttest: {
                    ...state.AllotPosttest,
                    AllotPosttestList: payload,
                    AllotPosttestStatus: true
                }
            }
        case FETCH_TRAINING_PRETEST_EMP_LIST_ALL:
            return {
                ...state,
                PreTestEmpListAll: {
                    ...state.PreTestEmpListAll,
                    PreTestEmpListAllList: payload,
                    PreTestEmpListAllStatus: true
                }
            }
        case FETCH_TRAINING_PRETEST_QR_EMP_DETAILS:
            return {
                ...state,
                PreTestEmpDetails: {
                    ...state.PreTestEmpDetails,
                    PreTestEmpDetailsList: payload,
                    PreTestEmpDetailsStatus: true
                }
            }
        case FETCH_TRAINING_POSTEST_EMP_LIST_ALL:
            return {
                ...state,
                PostTestEmpDetails: {
                    ...state.PostTestEmpDetails,
                    PostTestEmpDetailsList: payload,
                    PostTestEmpDetailsStatus: true
                }
            }
        case FETCH_TRAINING_POSTTEST_QR_EMP_DETAILS:
            return {
                ...state,
                PostEmpDetails: {
                    ...state.PostEmpDetails,
                    PostEmpDetailsList: payload,
                    PostEmpDetailsStatus: true
                }
            }
        case FETCH_BELOW_AVERAGE_EMP_LIST:
            return {
                ...state,
                BelowAvgEmp: {
                    ...state.BelowAvgEmp,
                    BelowAvgEmpList: payload,
                    BelowAvgEmpStatus: true
                }
            }
        case FETCH_RETEST_EMP_TOPICS_BY_EMID:
            return {
                ...state,
                RetestEmpTopics: {
                    ...state.RetestEmpTopics,
                    RetestEmpTopicsList: payload,
                    RetestEmpTopicsStatus: true
                }
            }
        case FETCH_RETEST_QUESTIONS:
            return {
                ...state,
                RetestQuestions: {
                    ...state.RetestQuestions,
                    RetestQuestionsList: payload,
                    RetestQuestionsStatus: true
                }
            }
        // case FETCH_MONTHLY_TRAINING_REPORT_BY_MONTH:
        //     return {
        //         ...state,
        //         MonthlyDetails: {
        //             ...state.MonthlyDetails,
        //             MonthlyDetailsList: payload,
        //             MonthlyDetailsStatus: true
        //         }
        //     }
        case FETCH_ALL_DEPARTMENT_NAMES:
            return {
                ...state,
                DepartmentNames: {
                    ...state.DepartmentNames,
                    DepartmentNamesList: payload,
                    DepartmentNamesStatus: true
                }
            }
        case FETCH_ALL_DEPARTMENT_SECTION_NAMES:
            return {
                ...state,
                DepartmentSecNames: {
                    ...state.DepartmentSecNames,
                    DepartmentSecNamesList: payload,
                    DepartmentSecNamesStatus: true
                }
            }
        case FETCH_ALL_TOPICS_UNDER_DEPT:
            return {
                ...state,
                DepartmentalTrainingTopics: {
                    ...state.DepartmentalTrainingTopics,
                    DepartmentalTrainingTopicsList: payload,
                    DepartmentalTrainingTopicsStatus: true
                }
            }
        case FETCH_TRAINING_TOPIC_BY_DEPT:
            return {
                ...state,
                TrainingTopicByDept: {
                    ...state.TrainingTopicByDept,
                    TrainingTopicByDeptList: payload,
                    TrainingTopicByDeptStatus: true
                }
            }
        default:
            return state;
    }


}
