import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const {
    FETCH_ALL_OT_INCHARGE,
    FETCH_ALL_OT_HOD,
    FETCH_ALL_OT_CEO_APPROVAL,
    FETCH_ALL_OT_HR_APPROVAL
} = Actiontypes;

export const getAllInchrgeApprvl = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/overtimerequest/otincharge', postData)
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ALL_OT_INCHARGE, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_OT_INCHARGE, payload: 0, status: false })
    }
}

export const getAllHodApprvl = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/overtimerequest/othod', postData)
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ALL_OT_HOD, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_OT_HOD, payload: 0, status: false })
    }
}
export const getAllCeoApprvl = () => async (dispatch) => {
    const result = await axioslogin.get('/overtimerequest/allceo/list')
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ALL_OT_CEO_APPROVAL, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_OT_CEO_APPROVAL, payload: 0, status: false })
    }
}
export const getAllHrApprvl = () => async (dispatch) => {
    const result = await axioslogin.get('/overtimerequest/allhrot/data/list')
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ALL_OT_HR_APPROVAL, payload: data, status: true })
    } else {
        dispatch({ type: FETCH_ALL_OT_HR_APPROVAL, payload: 0, status: false })
    }
}