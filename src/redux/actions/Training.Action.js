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