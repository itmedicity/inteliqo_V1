import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_BLOODGROUP } = Actiontypes;

export const setBloodgrp = () => async (dispatch) => {
    const result = await axioslogin.get('/reports/bloodgroup');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_BLOODGROUP, payload: data })
    }
}