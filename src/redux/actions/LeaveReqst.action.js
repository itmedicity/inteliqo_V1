import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const {
    FETCH_EMP_LEAVE_LIST,
    FETCH_HOD_INCAHRGE_SECTION,
    FETCH_HOD_INCAHRGE_SECT_EMP_NAME,
    FETCH_COMMON_LEAVES_DATA,
    FETCH_EMPLOYEE_INFORMATION_FOR_LVE_REQ,
    GET_EMPLOYEE_APPROVAL_LEVEL,
    FETCH_CREDITED_CASUAL_LEAVE_DETL,
    FETCH_CREDITED_COMMON_LEAVE,
    FETCH_CREDITED_HOLIDAYS_LEAVE,
    FETCH_CREDITED_COMPENSATORY_OFF_LEAVE,
    FETCH_CREDITED_EARNLEAVE_OFF_LEAVE,
    FETCH_DUTY_PLANNED_SHIFT_HALF_DAY,
    FETCH_EMP_COFF_DATA
} = Actiontypes;

export const getlevedata = (id) => async (dispatch) => {

    const result = await axioslogin.post('/LeaveRequestApproval/getleaverequestdep', id)
    const { success, data } = result.data;

    if (success === 1) {
        const leavereqst = data.map((val) => {

            const data1 = {
                req_type: 1,
                SlNo: val.leave_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                Status: val.hr_apprv_status === 0 ? 'Pending' : 'Approved',
                ceo_apprv: val.ceo_apprv_status,
                ceo_req: val.ceo_req_status,
                hod_req: val.hod_apprv_req,
                hodaprv: val.hod_apprv_status,
                hr_apprv: val.hr_apprv_status,
                hrreq: val.hr_aprrv_requ,
                increq: val.inc_apprv_req,
                incaprv: val.incapprv_status,
                longleave_spclleave: val.longleave_spclleave
            }
            return data1
        })

        dispatch({ type: FETCH_EMP_LEAVE_LIST, payload: leavereqst })

    } else {
        dispatch({ type: FETCH_EMP_LEAVE_LIST, payload: [] })
    }
}

export const getHodBasedDeptSectionName = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getDepartSetionHodIncharge/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_HOD_INCAHRGE_SECTION, payload: data })
    } else {
        dispatch({ type: FETCH_HOD_INCAHRGE_SECTION, payload: [] })
    }
}

export const getEmpNameHodSectionBased = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getSectionBasedEmpoyeeHodIncharge/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_HOD_INCAHRGE_SECT_EMP_NAME, payload: data })
    } else {
        dispatch({ type: FETCH_HOD_INCAHRGE_SECT_EMP_NAME, payload: [] })
    }
}

export const getCommonLeaveData = (no) => async (dispatch) => {
    const result = await axioslogin.get(`/leaveRequestType/empCommonLeave/${no}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_COMMON_LEAVES_DATA, payload: data })
    } else {
        dispatch({ type: FETCH_COMMON_LEAVES_DATA, payload: [] })
    }
}

export const getEmployeeInformation = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getEmpoyeeInfomation/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMPLOYEE_INFORMATION_FOR_LVE_REQ, payload: data })
    } else {
        dispatch({ type: FETCH_EMPLOYEE_INFORMATION_FOR_LVE_REQ, payload: [] })
    }
}

export const getEmployeeApprovalLevel = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getapproval/levels/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: GET_EMPLOYEE_APPROVAL_LEVEL, payload: data[0] })
    } else {
        dispatch({ type: GET_EMPLOYEE_APPROVAL_LEVEL, payload: {} })
    }
}

// GET THE CRDITED CASUAL LEAVES 

export const getCreditedCasualLeave = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/yearleaveprocess/allwbleCL/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CREDITED_CASUAL_LEAVE_DETL, payload: data })
    } else {
        dispatch({ type: FETCH_CREDITED_CASUAL_LEAVE_DETL, payload: [] })
    }
}

// GET THE CRDITED COMMON LEAVES 

export const getCreitedCommonLeave = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/yearleaveprocess/allowablcommon/allowableconleave/data/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_CREDITED_COMMON_LEAVE, payload: data })
    } else {
        dispatch({ type: FETCH_CREDITED_COMMON_LEAVE, payload: [] })
    }
}

// GET THE HOLIDAY LEAVES

export const getCreitedHolidayLeave = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/yearleaveprocess/allowableholiday/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_CREDITED_HOLIDAYS_LEAVE, payload: data })
    } else {
        dispatch({ type: FETCH_CREDITED_HOLIDAYS_LEAVE, payload: [] })
    }
}

// GET THE COMPANSATORY OFF LEAVES

export const getCreitedCompansatoryOffLeave = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/common/getcoffDetl/${id}`);
    console.log(result)
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_CREDITED_COMPENSATORY_OFF_LEAVE, payload: data })
    } else {
        dispatch({ type: FETCH_CREDITED_COMPENSATORY_OFF_LEAVE, payload: [] })
    }
}

// GET THE EARN LEAVES

export const getCreditedEarnLeave = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/yearleaveprocess/allowableholiday/allowableearnleave/data/${id}`);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_CREDITED_EARNLEAVE_OFF_LEAVE, payload: data })
    } else {
        dispatch({ type: FETCH_CREDITED_EARNLEAVE_OFF_LEAVE, payload: [] })
    }
}

//GET THE DUTY PLANNED BASED SHIFT INFORMATION FOR HALF DAY LEAVE REQUEST
export const getDutyPlannedShiftForHalfDayRequest = (postData) => async (dispatch) => {
    const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DUTY_PLANNED_SHIFT_HALF_DAY, payload: data })
    } else {
        dispatch({ type: FETCH_DUTY_PLANNED_SHIFT_HALF_DAY, payload: [] })
    }
}


export const getEmpCoffData = (postData) => async (dispatch) => {

    const result = await axioslogin.post('/common/empCoffdata/', postData);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_COFF_DATA, payload: data })
    } else {
        dispatch({ type: FETCH_EMP_COFF_DATA, payload: [] })
    }
}