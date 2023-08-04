import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const {
    FETCH_HOLIDAY_LIST,
    FETCH_COMMON__LIST,
    FETCH_HOLIDAY_LEAVE_LIST,
    FETCH_COMMON_LEAVE_LIST,
    FETCH_CASUAL_LEAVE_LIST,
    FETCH_PRIVILEGE_LEAVE_LIST,
    FETCH_CARRY_FORWARD_LEAVE_LIST,
    FETCH_CREDIT_LEAVE_LIST,
    FETCH_EMP_ESI_PF_DATA
} = Actiontypes;

//gET tHE hOLIDAY lIST (cURRENT yEAR)
export const getHolidayList = () => async (dispatch) => {
    let holidayListData;
    const holidayList = await axioslogin.get('/yearleaveprocess/year/holiday');
    const { success, data } = holidayList.data
    if (success === 1) {
        holidayListData = {
            status: 1,
            data: data
        }
        dispatch({ type: FETCH_HOLIDAY_LIST, payload: holidayListData })
    } else {
        holidayListData = {
            status: 2,
            data: []
        }
        dispatch({ type: FETCH_HOLIDAY_LIST, payload: holidayListData })
    }
}

//gET tHE cOMMON lEAVE lIST
export const getCommonLeave = () => async (dispatch) => {
    let commonLeaveList;
    const commonLeave = await axioslogin.get('/yearlyleaves/get/getcommonleave');
    const { successcommonleave, messagecommonleave } = commonLeave.data;
    if (successcommonleave === 1) {
        commonLeaveList = {
            status: 1,
            data: messagecommonleave
        }
        dispatch({ type: FETCH_COMMON__LIST, payload: commonLeaveList })
    } else {
        commonLeaveList = {
            status: 2,
            data: []
        }
        dispatch({ type: FETCH_COMMON__LIST, payload: commonLeaveList })
    }
}


//casual Leave
export const getCreditedCasualLeaves = (em_id) => async (dispatch) => {
    const casualLeave = await axioslogin.get(`/common/getcasual/${em_id}`);
    const { success, data } = casualLeave.data;
    if (success === 1) {
        dispatch({ type: FETCH_CASUAL_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_CASUAL_LEAVE_LIST, payload: [] })
    }
}

//holiday
export const getCreditedHolidayLeaves = (em_id) => async (dispatch) => {
    const holiday = await axioslogin.get(`/common/getleaveholiday/${em_id}`);
    const { success, data } = holiday.data;
    if (success === 1) {
        dispatch({ type: FETCH_HOLIDAY_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_HOLIDAY_LEAVE_LIST, payload: [] })
    }
}


//common leave
export const getCreditedCommonLeaves = (em_id) => async (dispatch) => {
    const common = await axioslogin.get(`/common/getleavecommon/${em_id}`);
    const { success, data } = common.data;
    if (success === 1) {
        dispatch({ type: FETCH_COMMON_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_COMMON_LEAVE_LIST, payload: [] })
    }
}


//privilege leave
export const getCreditedPrivilegeLeaves = (em_id) => async (dispatch) => {
    const privilege = await axioslogin.get(`/common/getearnleave/${em_id}`);
    const { success, data } = privilege.data;
    if (success === 1) {
        dispatch({ type: FETCH_PRIVILEGE_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_PRIVILEGE_LEAVE_LIST, payload: [] })
    }
}


//carry formawrd leave
export const getCreditedCarryForwardLeaves = (em_id) => async (dispatch) => {
    const carryForwrd = await axioslogin.get(`/common/carry/getcarryleave/${em_id}`);
    const { success, data } = carryForwrd.data;
    if (success === 1) {
        dispatch({ type: FETCH_CARRY_FORWARD_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_CARRY_FORWARD_LEAVE_LIST, payload: [] })
    }
}


//credited Leace leave
export const getCreditedCreditedLeaves = (em_id) => async (dispatch) => {
    const creditedLev = await axioslogin.get(`/common/getcoff/${em_id}`);
    const { success, data } = creditedLev.data;
    if (success === 1) {
        dispatch({ type: FETCH_CREDIT_LEAVE_LIST, payload: data })
    } else {
        dispatch({ type: FETCH_CREDIT_LEAVE_LIST, payload: [] })
    }
}

//statutory
export const getStatutoryInfo = (em_no) => async (dispatch) => {
    const result = await axioslogin.get(`/yearleaveprocess/esidetails/${em_no}`);
    const { success, data } = result.data;
    if (success === 0) {
        dispatch({ type: FETCH_EMP_ESI_PF_DATA, payload: data })
    } else {
        dispatch({ type: FETCH_EMP_ESI_PF_DATA, payload: [] })
    }
}