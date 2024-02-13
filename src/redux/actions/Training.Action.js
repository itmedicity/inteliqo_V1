import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type"

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
    FETCH_TRAINING_TYPE_WISE_TOPICS
} = Actiontypes;

export const TrainingType = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingType/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_TYPE_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_TYPE_ALL, payload: [], status: false })
    }
}
export const NewJoiners = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_SELECT_NEW_JOINERS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_SELECT_NEW_JOINERS, payload: [], status: false })
    }
}
export const TrainingCategory = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingCategory/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_CATEGORY_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_CATEGORY_ALL, payload: [], status: false })
    }
}
export const TrainingNames = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingName/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_NAMES_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_NAMES_ALL, payload: [], status: false })
    }
}
export const TrainingSchedule = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/selectSchedule`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_SCHEDULE_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_SCHEDULE_ALL, payload: [], status: false })
    }
}
export const DepartmentalTrainingSchedule = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/selectScheduleDetails`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_DEPARTMENTAL_TRAINING_SCHEDULE_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENTAL_TRAINING_SCHEDULE_ALL, payload: [], status: false })
    }
}
export const TrainingTopics = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingTopic/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_TOPICS_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_TOPICS_ALL, payload: [], status: false })
    }
}
export const TrainerNames = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainerName/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINER_NAMES_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINER_NAMES_ALL, payload: [], status: false })
    }
}
export const EmpBasedonDept = (dept) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/select/${dept}`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DEPT_EMP_NAME, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPT_EMP_NAME, payload: [], status: false })
    }
}
export const TrainingProcessdetails = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/select`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_PROCESS_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_PROCESS_ALL, payload: [], status: false })
    }
}
export const DepartmentalTrainingDetails = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/selectdepartmentaltrainings`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_DEPARTMENTAL_TRAINING_SCHEDULE, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENTAL_TRAINING_SCHEDULE, payload: [], status: false })
    }
}
export const DeptEmployeeNameDesList = (empDept) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/selectemp/${empDept}`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DEPT_EMP_NAME_DESG, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPT_EMP_NAME_DESG, payload: [], status: false })
    }
}
export const ScheduleTopicListOfEmp = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/empTopics/${em_id}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_SCHEDULE_TOPIC_BASED_ON_EMP, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_SCHEDULE_TOPIC_BASED_ON_EMP, payload: [], status: false })
    }
}

export const QuestionList = (obj) => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingProcess/selectQuest/list`, obj)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_ALL_QUESTIONS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_ALL_QUESTIONS, payload: [], status: false })
    }
}
export const OnlineTrainingTopicListOfEmp = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingOnline/empOnlineTopics/${em_id}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_ONLINE_TRAINING_DETAILS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_ONLINE_TRAINING_DETAILS, payload: [], status: false })
    }
}
export const DepartmentalScheduledTopicsDpDw = (dept) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingAfterJoining/deptTrainingtopic/${dept}`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW, payload: [], status: false })
    }
}
export const TrainingCompletedList = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/trainingcompleted`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_COMPLETED_LIST, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_COMPLETED_LIST, payload: [], status: false })
    }
}
export const TodaysTraining = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/todaystrainings`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TODAYS_TRAINING__LIST, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TODAYS_TRAINING__LIST, payload: [], status: false })
    }
}
export const TrainingAttendance = (topic) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/attendancedetails/${topic}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_ATTENDANCE_DETAILS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_ATTENDANCE_DETAILS, payload: [], status: false })
    }
}
export const TrainingEmpDetailsAll = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/showEmpDetails`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_EMP_DETAILS_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_EMP_DETAILS_ALL, payload: [], status: false })
    }
}
export const TrainingEmpDatas = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/trainingEmployees`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_EMP_LIST, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_EMP_LIST, payload: [], status: false })
    }
}
export const AllotedToPostTest = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/allotPostTest`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_POST_TEST_ALLOTED_TO_EMP, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_POST_TEST_ALLOTED_TO_EMP, payload: [], status: false })
    }
}

//PreTest All Emp List-valid
export const PreTestEmpListAll = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/preTestEmpAll`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_PRETEST_EMP_LIST_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_PRETEST_EMP_LIST_ALL, payload: [], status: false })
    }
}

export const PreTestEmpDetails = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingOnline/preTestEmpDetails/${id}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_PRETEST_QR_EMP_DETAILS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_PRETEST_QR_EMP_DETAILS, payload: [], status: false })
    }
}

export const PostTestEmpListAll = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/postTestEmpAll`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_POSTEST_EMP_LIST_ALL, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_POSTEST_EMP_LIST_ALL, payload: [], status: false })
    }
}

//post test emp details based on slno
export const PostTestEmpDetails = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingOnline/postTestEmpDetails/${id}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_POSTTEST_QR_EMP_DETAILS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_POSTTEST_QR_EMP_DETAILS, payload: [], status: false })
    }
}

//Below Average Employee Names List
export const BelowAverageEmployeeList = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingEmployee_Dashboard/belowAvgEmp`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BELOW_AVERAGE_EMP_LIST, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_BELOW_AVERAGE_EMP_LIST, payload: [], status: false })
    }
}

//Get retest employee topics by em_id
export const RestestEmployeeTopicsByemId = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingEmployee_Dashboard/retestEmptopics/${id}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_RETEST_EMP_TOPICS_BY_EMID, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_RETEST_EMP_TOPICS_BY_EMID, payload: [], status: false })
    }
}
//Get Retest Questions by topic and count base
export const ResetQuestionsByTopic = (obj) => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingEmployee_Dashboard/resetQuestions`, obj)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_RETEST_QUESTIONS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_RETEST_QUESTIONS, payload: [], status: false })
    }
}

export const DepartmentNamesAll = () => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingMonthlyReport/getDept`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_ALL_DEPARTMENT_NAMES, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_ALL_DEPARTMENT_NAMES, payload: [], status: false })
    }
}

export const DepartmentSecNamesAll = () => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingMonthlyReport/getDeptSec/ById`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_DEPARTMENT_SECTION_NAMES, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_ALL_DEPARTMENT_SECTION_NAMES, payload: [], status: false })
    }
}

export const DepartmentalTopicsAll = () => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingMonthlyReport/getDeptTopics/ById`)
    const { data, success } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ALL_TOPICS_UNDER_DEPT, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_ALL_TOPICS_UNDER_DEPT, payload: [], status: false })
    }
}

export const TrainingTopicsByDept = (dept) => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingTopic/select/${dept}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_TOPIC_BY_DEPT, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_TOPIC_BY_DEPT, payload: [], status: false })
    }
}
export const CommonTrainingPreTopics = () => async (dispatch) => {
    const result = await axioslogin.get(`/CommonPreTestPage/ListPreTestTopics`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_COMMON_PRETEST_TOPICS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_COMMON_PRETEST_TOPICS, payload: [], status: false })
    }
}

export const CommonTrainingPostTopics = () => async (dispatch) => {
    const result = await axioslogin.get(`/CommonPreTestPage/ListPostTesttTopics`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_COMMON_POSTTEST_TOPICS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_COMMON_POSTTEST_TOPICS, payload: [], status: false })
    }
}

export const InductionNewJoinees = (obj) => async (dispatch) => {
    const result = await axioslogin.post(`/InductionTraining/getEmps`, obj)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_NEWJOINEES_LIST, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_NEWJOINEES_LIST, payload: [], status: false })
    }
}
export const TrainingTypeWiseTopics = (type) => async (dispatch) => {
    const result = await axioslogin.post(`/TrainingTopic/selectbyType/${type}`)
    const { data, success } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_TRAINING_TYPE_WISE_TOPICS, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_TRAINING_TYPE_WISE_TOPICS, payload: [], status: false })
    }
}

