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
export const QuestionList = (questCount) => async (dispatch) => {
    const result = await axioslogin.get(`/TrainingProcess/selectQuest/list/${questCount}`)
    const { data, success } = result.data
    if (success === 1) {
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
    console.log("action", dept);
    const result = await axioslogin.get(`/TrainingAfterJoining/deptTrainingtopic/${dept}`)
    const { data, success } = result.data
    console.log(data);
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW, payload: data, status: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENTAL_SCHEDULED_TOPIC_DPDW, payload: [], status: false })
    }
}





