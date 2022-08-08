import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_EMP_BLOODGROUP } = Actiontypes;

export const setBloodgrp = () => async (dispatch) => {
    /** To get bloodgroup slno, name */
    const result = await axioslogin.get('/bloodgrpReport/bloodgroup');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_EMP_BLOODGROUP, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_BLOODGROUP, payload: [], loadingStatus: false })
    }
}