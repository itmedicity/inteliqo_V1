import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const { FETCH_COMMON_SETTING, FETCH_DEPT_SECTION_DETL, FETCH_EMPLOYEE_DETL, FETCH_PUNCH_MASTER_DATA,
    FETCH_EMPLOYEE_TYPE } = Actiontypes;

export const setCommonSetting = () => async (dispatch) => {
    const result = await axioslogin.get('/commonsettings');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_COMMON_SETTING, payload: data[0] })
    }
}


export const getDepartmentSection = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/section/sect/${id}`);
    const { success, data } = await result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DEPT_SECTION_DETL, payload: data })
    } else {
        dispatch({ type: FETCH_DEPT_SECTION_DETL, payload: [] })
    }
}

export const getEmployeeBasedSection = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/empmast/getempName', postData)
    const { data, success } = await result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMPLOYEE_DETL, payload: data })
    } else {
        dispatch({ type: FETCH_EMPLOYEE_DETL, payload: [] })
    }
}

export const getPunchMasterData = (postData) => async (dispatch) => {
    const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
    const { success, planData } = await punch_master_data.data;
    if (success === 1) {
        dispatch({ type: FETCH_PUNCH_MASTER_DATA, payload: planData })
    } else {
        dispatch({ type: FETCH_PUNCH_MASTER_DATA, payload: [] })
    }
}

export const getEmployeetype = () => async (dispatch) => {
    const result = await axioslogin.get('/emptype');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMPLOYEE_TYPE, payload: data })
    } else {
        dispatch({ type: FETCH_EMPLOYEE_TYPE, payload: [] })
    }
}