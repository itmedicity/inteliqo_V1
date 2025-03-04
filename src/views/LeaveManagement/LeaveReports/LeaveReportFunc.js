import { format } from "date-fns"
import { axioslogin } from "src/views/Axios/Axios"

export const getEmployeeWiseLeaveReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/LeaveReport/empLeaveYearWise', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                lvDate: format(new Date(val.leave_dates), 'dd-MM-yyyy'),
                reqDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                incharge: val.inc_apprv_req === 1 && val.incapprv_status === 0 ? 'Incharge Approval Pending' :
                    val.inc_apprv_req === 1 && val.incapprv_status === 1 ? 'Incharge Approved' :
                        val.inc_apprv_req === 1 && val.incapprv_status === 2 ? 'Incharge Rejected' : 'NIL',
                hod: val.hod_apprv_req === 1 && val.hod_apprv_status === 0 ? 'HOD Approval Pending' :
                    val.hod_apprv_req === 1 && val.hod_apprv_status === 1 ? 'HOD Approved' :
                        val.hod_apprv_req === 1 && val.hod_apprv_status === 2 ? 'HOD Rejected' : 'NIL',
                HR: val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 ? 'HR Approval Pending' :
                    val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1 ? 'HR Approved' :
                        val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 ? 'HR Rejected' : 'NIL',
                cancel: val.lv_cancel_status === 1 ? 'Leave Cancelled' : val.lv_cancel_status_user === 1 ? 'Leave Cancelled' : 'NIL',
                cancelComment: val.lv_cancel_cmnt === null ? 'NIL' :
                    val.lv_cancel_cmnt !== null ? val.lv_cancel_cmnt :
                        val.lv_cancel_cmnt_user === null ? 'NIL' : val.lv_cancel_cmnt_user
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getEmployeeWiseHalfdayReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/LeaveReport/empHalfdayYearWise', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                lvDate: format(new Date(val.leavedate), 'dd-MM-yyyy'),
                reqDate: format(new Date(val.requestdate), 'dd-MM-yyyy'),
                halfdaytime: val.halfday_status === 1 ? 'First Half' : 'Second Half',
                incharge: val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 ? 'Incharge Approval Pending' :
                    val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 1 ? 'Incharge Approved' :
                        val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2 ? 'Incharge Rejected' : 'NIL',
                hod: val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 ? 'HOD Approval Pending' :
                    val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 ? 'HOD Approved' :
                        val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2 ? 'HOD Rejected' : 'NIL',
                HR: val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0 ? 'HR Approval Pending' :
                    val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 ? 'HR Approved' :
                        val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2 ? 'HR Rejected' : 'NIL',
                cancel: val.lv_cancel_status === 1 ? 'Halfday Cancelled' : val.lv_cancel_status_user === 1 ? 'Halfday Cancelled' : 'NIL',
                cancelComment: val.lv_cancel_cmnt === null ? 'NIL' :
                    val.lv_cancel_cmnt !== null ? val.lv_cancel_cmnt :
                        val.lv_cancel_cmnt_user === null ? 'NIL' : val.lv_cancel_cmnt_user
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getEmployeeWisemisspunchReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/LeaveReport/empMisspunchyearwise', postdata)
    const { data, success } = result.data

    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                lvDate: format(new Date(val.nopunchdate), 'dd-MM-yyyy'),
                misspunchtime: val.checkinflag === 1 ? 'In Punch' : 'Out Punch',
                reqDate: format(new Date(val.creteddate), 'dd-MM-yyyy'),
                incharge: val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 ? 'Incharge Approval Pending' :
                    val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 ? 'Incharge Approved' :
                        val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2 ? 'Incharge Rejected' : 'NIL',
                hod: val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 ? 'HOD Approval Pending' :
                    val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 ? 'HOD Approved' :
                        val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2 ? 'HOD Rejected' : 'NIL',
                HR: val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0 ? 'HR Approval Pending' :
                    val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 ? 'HR Approved' :
                        val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 ? 'HR Rejected' : 'NIL',
                cancel: val.lv_cancel_status === 1 ? 'Miss punch Cancelled' : val.lv_cancel_req_status_user === 1 ? 'Miss punch Cancelled' : 'NIL',
                cancelComment: val.lv_cancel_cmnt === null ? 'NIL' :
                    val.lv_cancel_cmnt !== null ? val.lv_cancel_cmnt :
                        val.lv_cancel_cmnt_user === null ? 'NIL' : val.lv_cancel_cmnt_user
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getEmployeeWiseonehourReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/LeaveReport/emOnehouryearwise', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                lvDate: format(new Date(val.one_hour_duty_day), 'dd-MM-yyyy'),
                reqDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                misspunchtime: val.checkin_flag === 1 ? 'In Punch' : 'Out Punch',
                incharge: val.incharge_req_status === 1 && val.incharge_approval_status === 0 ? 'Incharge Approval Pending' :
                    val.incharge_req_status === 1 && val.incharge_approval_status === 1 ? 'Incharge Approved' :
                        val.incharge_req_status === 1 && val.incharge_approval_status === 2 ? 'Incharge Rejected' : 'NIL',
                hod: val.hod_req_status === 1 && val.hod_approval_status === 0 ? 'HOD Approval Pending' :
                    val.hod_req_status === 1 && val.hod_approval_status === 1 ? 'HOD Approved' :
                        val.hod_req_status === 1 && val.hod_approval_status === 2 ? 'HOD Rejected' : 'NIL',
                HR: val.hr_req_status === 1 && val.hr_approval_status === 0 ? 'HR Approval Pending' :
                    val.hr_req_status === 1 && val.hr_approval_status === 1 ? 'HR Approved' :
                        val.hr_req_status === 1 && val.hr_approval_status === 2 ? 'HR Rejected' : 'NIL',
                cancel: val.cancel_status === 1 ? 'Onhour Cancelled' : 'NIL',
                cancelComment: val.cancel_comment === null ? 'NIL' : val.cancel_comment
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getEmployeeWiseOndutyReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/LeaveReport/empOndutyyearwise', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                lvDate: format(new Date(val.on_duty_date), 'dd-MM-yyyy'),
                reqDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                incharge: val.incharge_req_status === 1 && val.incharge_approval_status === 0 ? 'Incharge Approval Pending' :
                    val.incharge_req_status === 1 && val.incharge_approval_status === 1 ? 'Incharge Approved' :
                        val.incharge_req_status === 1 && val.incharge_approval_status === 2 ? 'Incharge Rejected' : 'NIL',
                hod: val.hod_req_status === 1 && val.hod_approval_status === 0 ? 'HOD Approval Pending' :
                    val.hod_req_status === 1 && val.hod_approval_status === 1 ? 'HOD Approved' :
                        val.hod_req_status === 1 && val.hod_approval_status === 2 ? 'HOD Rejected' : 'NIL',
                HR: val.hr_req_status === 1 && val.hr_approval_status === 0 ? 'HR Approval Pending' :
                    val.hr_req_status === 1 && val.hr_approval_status === 1 ? 'HR Approved' :
                        val.hr_req_status === 1 && val.hr_approval_status === 2 ? 'HR Rejected' : 'NIL',
                cancel: val.cancel_status === 1 ? 'Onhour Cancelled' : 'NIL',
                cancelComment: val.cancel_comment === null ? 'NIL' : val.cancel_comment
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}