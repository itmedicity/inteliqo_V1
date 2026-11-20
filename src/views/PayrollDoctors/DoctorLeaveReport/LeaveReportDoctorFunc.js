import { format, isValid } from "date-fns"
import { axioslogin } from "src/views/Axios/Axios"

const formatDateSafe = (dateVal, formatStr = 'dd-MM-yyyy') => {
    if (!dateVal) return 'NIL'
    const d = new Date(dateVal)
    return isValid(d) ? format(d, formatStr) : 'NIL'
}

const getHodStatus = (val) => {
    if (val?.hod_required_status !== 1) return 'NIL'
    if (val?.hod_approval_status === 1) return 'HOD Approved'
    if (val?.hod_approval_status === 2) return 'HOD Rejected'
    return 'HOD Pending'
}

const getDmsStatus = (val) => {
    if (val?.dms_required_status !== 1) return 'NIL'
    if (val?.dms_approval_status === 1) return 'DMS Approved'
    if (val?.dms_approval_status === 2) return 'DMS Rejected'
    return 'DMS Pending'
}

const getMsStatus = (val) => {
    if (val?.ms_required_status !== 1) return 'NIL'
    if (val?.ms_approval_status === 1) return 'MS Approved'
    if (val?.ms_approval_status === 2) return 'MS Rejected'
    return 'MS Pending'
}

const getOverallStatus = (val) => {
    if (val?.lv_cancel_status === 1) return 'Cancelled'
    if (val?.ms_required_status === 1 && val?.ms_approval_status === 1) return 'Approved'
    if (val?.ms_required_status === 1 && val?.ms_approval_status === 2) return 'MS Rejected'
    if (val?.dms_required_status === 1 && val?.dms_approval_status === 2) return 'DMS Rejected'
    if (val?.hod_required_status === 1 && val?.hod_approval_status === 2) return 'HOD Rejected'
    if (val?.ms_required_status === 1 && val?.ms_approval_status === 0 && val?.dms_approval_status === 1) return 'MS Pending'
    if (val?.dms_required_status === 1 && val?.dms_approval_status === 0 && val?.hod_approval_status === 1) return 'DMS Pending'
    if (val?.hod_required_status === 1 && val?.hod_approval_status === 0) return 'HOD Pending'
    return 'Pending'
}

export const getDoctorWiseLeaveReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/DoctorsProcess/doctorLeaveReport', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                reqDate: formatDateSafe(val.request_date),
                lvDate: formatDateSafe(val.leave_dates || val.leave_date),
                lvFromDate: formatDateSafe(val.leave_date),
                lvToDate: formatDateSafe(val.leavetodate),
                rejoinDate: formatDateSafe(val.rejoin_date),
                leave_name: val.leave_name || val.leavetype_name || 'NIL',
                hod: getHodStatus(val),
                dms: getDmsStatus(val),
                ms: getMsStatus(val),
                showStatus: getOverallStatus(val),
                cancel: val.lv_cancel_status === 1 ? 'Leave Cancelled' : 'Active',
                cancelComment: val.lv_cancel_cmnt ? val.lv_cancel_cmnt : 'NIL',
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getDoctorWiseCoffReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/DoctorsProcess/doctorCoffReport', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                reqDate: formatDateSafe(val.reqestdate),
                lvDate: formatDateSafe(val.leave_date),
                dutyTakenDate: formatDateSafe(val.duty_taken_date),
                dutyTyp: val.duty_type === 1 ? 'Night Duty' : val.duty_type === 2 ? 'Duty Taken' : 'NIL',
                specialType: val.special_duty_type === 1 ? 'Inside Duty' : val.special_duty_type === 2 ? 'Outside Duty' : 'NIL',
                hod: getHodStatus(val),
                dms: getDmsStatus(val),
                ms: getMsStatus(val),
                showStatus: getOverallStatus(val),
                cancel: val.lv_cancel_status === 1 ? 'COFF Cancelled' : 'Active',
                cancelComment: val.lv_cancel_cmnt ? val.lv_cancel_cmnt : 'NIL',
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}

export const getDoctorWiseAccademicReport = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/DoctorsProcess/doctorAccademicReport', postdata)
    const { data, success } = result.data
    if (success === 1) {
        const arr = data?.map((val) => {
            return {
                ...val,
                reqDate: formatDateSafe(val.request_date),
                lvDate: formatDateSafe(val.leave_fromdate),
                lvToDate: formatDateSafe(val.leave_todate),
                rejoinDate: formatDateSafe(val.rejoin_date),
                hod: getHodStatus(val),
                dms: getDmsStatus(val),
                ms: getMsStatus(val),
                showStatus: getOverallStatus(val),
                cancel: val.lv_cancel_status === 1 ? 'Academic Leave Cancelled' : 'Active',
                cancelComment: val.lv_cancel_cmnt ? val.lv_cancel_cmnt : 'NIL',
            }
        })
        return { ...dataObj, status: 1, data: arr }
    } else {
        return { ...dataObj, status: 2, data: [] }
    }
}
