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
    FETCH_ALL_DEPARTMENT_NAMES,
    FETCH_ALL_DEPARTMENT_SECTION_NAMES,
    FETCH_ALL_TOPICS_UNDER_DEPT,
    FETCH_TRAINING_TOPIC_BY_DEPT,
    FETCH_COMMON_PRETEST_TOPICS,
    FETCH_COMMON_POSTTEST_TOPICS,
    FETCH_NEWJOINEES_LIST,
    FETCH_TRAINING_TYPE_WISE_TOPICS,
    FETCH_INDUCTION_CALENDER_DETAILS,
    FETCH__PREPOST_TOPICS,
    FETCH_INDUCTION_TODAY,
    FETCH_INDUCTION_ATTENDACE_DETAILS,
    FETCH_INDUCTION_COMPLETED_LIST,
    FETCH_TRAINING_TEST_EMP_DETAILS,
    FETCH_INDUCT_POSTTEST_EMP_DETAILS,
    FETCH_INDUCT_PENDING_LIST,
    FETCH_BELOWAVG_EMP_LIST,
    FETCH_INDUCTION_RETEST_EMP_TOPICS_BY_EMID,
    FETCH_INDUCT_RETEST_QUESTIONS,
    FETCH_INDUCTION_ONLINE_TRAINING_DETAILS,
    FETCH_INDUCTION_TRAINING_CALENDER_DETAILS_ALL,
    FETCH_TRAINING_TOPIC_BY_TYPE,
    FETCH_DEPARTMENTAL_TRAININGS,
    FETCH_INDUCTION_TRAININGS,
    FETCH_TRAINER_APPRVL_DATA,
    FETCH_TRAINER_APPRVL_INDUCT_DATA,
    FETCH_DEPT_PREPOST_QR_DASHBOARD_DATA,
    FETCH_CALENDER_DETAILS,
    FETCH_MONTHWISE_DEPT_SCHEDULE
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
    CommonPreTopics: {
        CommonPreTopicsList: [],
        CommonPreTopicsStatus: false
    },
    CommonPostTopics: {
        CommonPostTopicsList: [],
        CommonPostTopicsStatus: false
    },
    NewJoinees: {
        NewJoineesList: [],
        NewJoineesStatus: false
    },
    TrainingTypeTopic: {
        TrainingTypeTopicList: [],
        TrainingTypeTopicStatus: false
    },
    InductionTrainingDetails: {
        InductionTrainingDetailsList: [],
        InductionTrainingDetailsStatus: false
    },
    InductionPrePostTopics: {
        InductionPrePostTopicsList: [],
        InductionPrePostTopicsStatus: false
    },
    InductionToday: {
        InductionTodayList: [],
        InductionTodayStatus: false
    },
    InductionAttendanceDetails: {
        InductionAttendanceDetailsList: [],
        InductionAttendanceDetailsStatus: false
    },
    InductionCompleted: {
        InductionCompletedList: [],
        InductionCompletedStatus: false
    },
    InductionTestEmp: {
        InductionTestEmpList: [],
        InductionTestEmpStatus: false
    },
    InductionPostTestEmp: {
        InductionPostTestEmpList: [],
        InductionPostTestEmpStatus: false
    },
    InductionPpendingEmp: {
        InductionPpendingEmpList: [],
        InductionPpendingEmpStatus: false
    },
    BelowAvg: {
        BelowAvgList: [],
        BelowAvgStatus: false
    },
    InductionEmpRetest: {
        InductionEmpRetestList: [],
        InductionEmpRetestStatus: false
    },
    InductionQuestn: {
        InductionQuestnList: [],
        InductionQuestnStatus: false
    },
    InductionOnlineTraining: {
        InductionOnlineTrainingList: [],
        InductionOnlineTrainingStatus: false
    },
    InductionTrainingCalender: {
        InductionTrainingCalenderList: [],
        InductionTrainingCalenderStatus: false
    },
    TopicByType: {
        TopicByTypeList: [],
        TopicByTypeStatus: false
    },
    GetDepartmentalTrainings: {
        GetDepartmentalTrainingsList: [],
        GetDepartmentalTrainingsStatus: false
    },
    GetInductionTrainings: {
        GetInductionTrainingsList: [],
        GetInductionTrainingsStatus: false
    },
    GetTrainerApprvls: {
        GetTrainerApprvlsList: [],
        GetTrainerApprvlsStatus: false
    },
    GetTrainerInductApprvls: {
        GetTrainerInductApprvlsList: [],
        GetTrainerInductApprvlsStatus: false
    },
    DashboardPreTopics: {
        DashboardPreTopicsList: [],
        DashboardPreTopicsStatus: false
    },
    InductionCalenderDatas: {
        InductionCalenderDatasList: [],
        InductionCalenderDatasStatus: false
    },
    MothWiseDeptSchedules: {
        MothWiseDeptSchedulesList: [],
        MothWiseDeptSchedulesStatus: false
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
        case FETCH_COMMON_PRETEST_TOPICS:
            return {
                ...state,
                CommonPreTopics: {
                    ...state.CommonPreTopics,
                    CommonPreTopicsList: payload,
                    CommonPreTopicsStatus: true
                }
            }
        case FETCH_COMMON_POSTTEST_TOPICS:
            return {
                ...state,
                CommonPostTopics: {
                    ...state.CommonPostTopics,
                    CommonPostTopicsList: payload,
                    CommonPostTopicsStatus: true
                }
            }
        case FETCH_NEWJOINEES_LIST:
            return {
                ...state,
                NewJoinees: {
                    ...state.NewJoinees,
                    NewJoineesList: payload,
                    NewJoineesStatus: true
                }
            }
        case FETCH_TRAINING_TYPE_WISE_TOPICS:
            return {
                ...state,
                TrainingTypeTopic: {
                    ...state.TrainingTypeTopic,
                    TrainingTypeTopicList: payload,
                    TrainingTypeTopicStatus: true
                }
            }
        case FETCH_INDUCTION_CALENDER_DETAILS:
            return {
                ...state,
                InductionTrainingDetails: {
                    ...state.InductionTrainingDetails,
                    InductionTrainingDetailsList: payload,
                    InductionTrainingDetailsStatus: true
                }
            }
        case FETCH__PREPOST_TOPICS:
            return {
                ...state,
                InductionPrePostTopics: {
                    ...state.InductionPrePostTopics,
                    InductionPrePostTopicsList: payload,
                    InductionPrePostTopicsStatus: true
                }
            }
        case FETCH_INDUCTION_TODAY:
            return {
                ...state,
                InductionToday: {
                    ...state.InductionToday,
                    InductionTodayList: payload,
                    InductionTodayStatus: true
                }
            }
        case FETCH_INDUCTION_ATTENDACE_DETAILS:
            return {
                ...state,
                InductionAttendanceDetails: {
                    ...state.InductionAttendanceDetails,
                    InductionAttendanceDetailsList: payload,
                    InductionAttendanceDetailsStatus: true
                }
            }
        case FETCH_INDUCTION_COMPLETED_LIST:
            return {
                ...state,
                InductionCompleted: {
                    ...state.InductionCompleted,
                    InductionCompletedList: payload,
                    InductionCompletedStatus: true
                }
            }
        case FETCH_TRAINING_TEST_EMP_DETAILS:
            return {
                ...state,
                InductionTestEmp: {
                    ...state.InductionTestEmp,
                    InductionTestEmpList: payload,
                    InductionTestEmpStatus: true
                }
            }
        case FETCH_INDUCT_POSTTEST_EMP_DETAILS:
            return {
                ...state,
                InductionPostTestEmp: {
                    ...state.InductionPostTestEmp,
                    InductionPostTestEmpList: payload,
                    InductionPostTestEmpStatus: true
                }
            }
        case FETCH_INDUCT_PENDING_LIST:
            return {
                ...state,
                InductionPpendingEmp: {
                    ...state.InductionPpendingEmp,
                    InductionPpendingEmpList: payload,
                    InductionPpendingEmpStatus: true
                }
            }
        case FETCH_BELOWAVG_EMP_LIST:
            return {
                ...state,
                BelowAvg: {
                    ...state.BelowAvg,
                    BelowAvgList: payload,
                    BelowAvgStatus: true
                }
            }
        case FETCH_INDUCTION_RETEST_EMP_TOPICS_BY_EMID:
            return {
                ...state,
                InductionEmpRetest: {
                    ...state.InductionEmpRetest,
                    InductionEmpRetestList: payload,
                    InductionEmpRetestStatus: true
                }
            }
        case FETCH_INDUCT_RETEST_QUESTIONS:
            return {
                ...state,
                InductionQuestn: {
                    ...state.InductionQuestn,
                    InductionQuestnList: payload,
                    InductionQuestnStatus: true
                }
            }
        case FETCH_INDUCTION_ONLINE_TRAINING_DETAILS:
            return {
                ...state,
                InductionOnlineTraining: {
                    ...state.InductionOnlineTraining,
                    InductionOnlineTrainingList: payload,
                    InductionOnlineTrainingStatus: true
                }
            }
        case FETCH_INDUCTION_TRAINING_CALENDER_DETAILS_ALL:
            return {
                ...state,
                InductionTrainingCalender: {
                    ...state.InductionTrainingCalender,
                    InductionTrainingCalenderList: payload,
                    InductionTrainingCalenderStatus: true
                }
            }
        case FETCH_TRAINING_TOPIC_BY_TYPE:
            return {
                ...state,
                TopicByType: {
                    ...state.TopicByType,
                    TopicByTypeList: payload,
                    TopicByTypeStatus: true
                }
            }
        case FETCH_DEPARTMENTAL_TRAININGS:
            return {
                ...state,
                GetDepartmentalTrainings: {
                    ...state.GetDepartmentalTrainings,
                    GetDepartmentalTrainingsList: payload,
                    GetDepartmentalTrainingsStatus: true
                }
            }
        case FETCH_INDUCTION_TRAININGS:
            return {
                ...state,
                GetInductionTrainings: {
                    ...state.GetInductionTrainings,
                    GetInductionTrainingsList: payload,
                    GetInductionTrainingsStatus: true
                }
            }
        case FETCH_TRAINER_APPRVL_DATA:
            return {
                ...state,
                GetTrainerApprvls: {
                    ...state.GetTrainerApprvls,
                    GetTrainerApprvlsList: payload,
                    GetTrainerApprvlsStatus: true
                }
            }
        case FETCH_TRAINER_APPRVL_INDUCT_DATA:
            return {
                ...state,
                GetTrainerInductApprvls: {
                    ...state.GetTrainerInductApprvls,
                    GetTrainerInductApprvlsList: payload,
                    GetTrainerInductApprvlsStatus: true
                }
            }
        case FETCH_DEPT_PREPOST_QR_DASHBOARD_DATA:
            return {
                ...state,
                DashboardPreTopics: {
                    ...state.DashboardPreTopics,
                    DashboardPreTopicsList: payload,
                    DashboardPreTopicsStatus: true
                }
            }
        case FETCH_CALENDER_DETAILS:
            return {
                ...state,
                InductionCalenderDatas: {
                    ...state.InductionCalenderDatas,
                    InductionCalenderDatasList: payload,
                    InductionCalenderDatasStatus: true
                }
            }
        case FETCH_MONTHWISE_DEPT_SCHEDULE:
            return {
                ...state,
                MothWiseDeptSchedules: {
                    ...state.MothWiseDeptSchedules,
                    MothWiseDeptSchedulesList: payload,
                    MothWiseDeptSchedulesStatus: true
                }
            }
        default:
            return state;
    }
}


