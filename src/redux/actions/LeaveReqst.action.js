import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_LEAVE_LIST, FETCH_HOD_INCAHRGE_SECTION, FETCH_HOD_INCAHRGE_SECT_EMP_NAME, FETCH_COMMON_LEAVES_DATA } = Actiontypes;

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