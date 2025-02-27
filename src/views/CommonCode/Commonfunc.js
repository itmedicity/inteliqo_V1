import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';
import moment from 'moment';
import { axioslogin } from '../Axios/Axios';

export const succesNofity = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

//Get Total Shift Hours In Minits
export const getTotalShiftHours = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const minits = duration.asMinutes()
        return minits;
    }
    return 0;
}

//Get Total Worked Hours In Minits
export const getTotalMinitsWorked = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const minits = duration.asMinutes()
        return minits;
    }
    return 0;
}

//Get Total Hours Worked Based on Check In and Check out with Specifiv Format (1 D:3 h : 30 m) 
export const getHoursWorked = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const days = duration.days();
        const hours = duration.hours();
        const minits = duration.minutes();
        return days === 0 ? `${hours} h:${minits} m` : `${days} D:${hours} h:${minits} m`;
    }
    return 0;
}

export const getleaverequest = async () => {
    const result = await axioslogin.get('/leaveRequestType/select')
    const { success, data } = result.data;
    if (success === 1) {
        return data
    }
}

// for get leave requesst details
export const getleaverequestget = async (getDeptSection) => {
    const result = await axioslogin.post('/LeaveRequestApproval/getleaverequestdep', getDeptSection)
    const { success, data } = result.data;
    if (success === 1) {
        const leavereqst = data.map((val) => {
            const data1 = {
                req_type: 1,
                SlNo: val.leave_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.dept_section,
                Status: val.hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.ceo_apprv_status,
                ceo_req: val.ceo_req_status,
                hod_req: val.hod_apprv_req,
                hodaprv: val.hod_apprv_status,
                hr_apprv: val.hr_apprv_status,
                hrreq: val.hr_aprrv_requ,
                increq: val.inc_apprv_req,
                incaprv: val.incapprv_status,
                longleave_spclleave: val.longleave_spclleave,
                inStatus: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data1
        })
        return leavereqst

    } else {
        return []
    }
}

// get nopunch request
export const getnopunchrequst = async (getDeptSection) => {
    const result = await axioslogin.post('/LeaveRequestApproval/nopunchreq', getDeptSection)
    const { success, data } = result.data;
    if (success === 1) {
        const nopunchreq = data.map((val) => {
            const data2 = {
                req_type: 3,
                SlNo: val.nopunch_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.np_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.np_ceo_apprv_status,
                ceo_req: val.np_ceo_req_status,
                hod_req: val.np_hod_apprv_req,
                hodaprv: val.np_hod_apprv_status,
                hr_apprv: val.np_hr_apprv_status,
                hrreq: val.np_hr_aprrv_requ,
                increq: val.np_inc_apprv_req,
                incaprv: val.np_incapprv_status,
                inStatus: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data2
        })
        return nopunchreq
    }
    else {
        return []
    }
}

// get halfdayrequest
export const halfdayrequest = async (getDeptSection) => {
    const result = await axioslogin.post('/LeaveRequestApproval/halfrequst', getDeptSection)
    const { success, data } = result.data;
    if (success === 1) {
        const halfdayreq = data.map((val) => {
            const data3 = {
                req_type: 2,
                SlNo: val.half_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.dept_section,
                Status: val.hf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.hf_ceo_apprv_status,
                ceo_req: val.hf_ceo_req_status,
                hod_req: val.hf_hod_apprv_req,
                hodaprv: val.hf_hod_apprv_status,
                hr_apprv: val.hf_hr_apprv_status,
                hrreq: val.hf_hr_aprrv_requ,
                increq: val.hf_inc_apprv_req,
                incaprv: val.hf_incapprv_status,
                inStatus: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data3
        })
        return halfdayreq
    }
    else {
        return []
    }
}
// get compensatory off  request 
export const compensatory = async (getDeptSection) => {
    const result = await axioslogin.post('/LeaveRequestApproval/getcompenoff', getDeptSection)
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: 4,
                SlNo: val.cmp_off_reqid,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.cf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.cf_ceo_apprv_status,
                ceo_req: val.cf_ceo_req_status,
                hod_req: val.cf_hod_apprv_req,
                hodaprv: val.cf_hod_apprv_status,
                hr_apprv: val.cf_hr_apprv_status,
                hrreq: val.cf_hr_aprrv_requ,
                increq: val.cf_inc_apprv_req,
                incaprv: val.cf_incapprv_status,
                inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}
export const ceoLeavereq = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval')
    const { success, data } = result.data;
    if (success === 1) {
        const ceoLeave = data.map((val) => {
            const data4 = {
                req_type: 1,
                SlNo: val.leave_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                dept_section: val.dept_section,
                Department_section: val.dept_name,
                Status: val.hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.ceo_apprv_status,
                ceo_req: val.ceo_req_status,
                hod_req: val.hod_apprv_req,
                hodaprv: val.hod_apprv_status,
                hr_apprv: val.hr_apprv_status,
                hrreq: val.hr_aprrv_requ,
                increq: val.inc_apprv_req,
                incaprv: val.incapprv_status,
                longleave_spclleave: val.longleave_spclleave,
                inStatus: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return ceoLeave
    }
    else {
        return []
    }
}

export const HrLeave = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/hrPending/leave')
    const { success, data } = result.data;
    if (success === 1) {
        const HrLeave = data.map((val) => {
            const data4 = {
                req_type: 1,
                SlNo: val.leave_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.dept_section,
                Status: val.hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.ceo_apprv_status,
                ceo_req: val.ceo_req_status,
                hod_req: val.hod_apprv_req,
                hodaprv: val.hod_apprv_status,
                hr_apprv: val.hr_apprv_status,
                hrreq: val.hr_aprrv_requ,
                increq: val.inc_apprv_req,
                incaprv: val.incapprv_status,
                longleave_spclleave: val.longleave_spclleave,
                inStatus: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0) ? 'HR Approval Pending' :
                                'Approved'
            }
            return data4
        })
        return HrLeave
    }
    else {
        return []
    }
}

// get halfdayrequest
export const CEohalfdayrequest = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/ceopending/halfday')
    const { success, data } = result.data;
    if (success === 1) {
        const halfdayreq = data.map((val) => {
            const data3 = {
                req_type: 2,
                SlNo: val.half_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.dept_section,
                Status: val.hf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.hf_ceo_apprv_status,
                ceo_req: val.hf_ceo_req_status,
                hod_req: val.hf_hod_apprv_req,
                hodaprv: val.hf_hod_apprv_status,
                hr_apprv: val.hf_hr_apprv_status,
                hrreq: val.hf_hr_aprrv_requ,
                increq: val.hf_inc_apprv_req,
                incaprv: val.hf_incapprv_status,
                inStatus: (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data3
        })
        return halfdayreq
    }
    else {
        return []
    }
}
export const Hrhalfdayrequest = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/HrHalfdayreq/halfDay')
    const { success, data } = result.data;
    if (success === 1) {
        const halfdayreq = data.map((val) => {
            const data3 = {
                req_type: 2,
                SlNo: val.half_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.dept_section,
                Status: val.hf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.hf_ceo_apprv_status,
                ceo_req: val.hf_ceo_req_status,
                hod_req: val.hf_hod_apprv_req,
                hodaprv: val.hf_hod_apprv_status,
                hr_apprv: val.hf_hr_apprv_status,
                hrreq: val.hf_hr_aprrv_requ,
                increq: val.hf_inc_apprv_req,
                incaprv: val.hf_incapprv_status,
                inStatus: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data3
        })
        return halfdayreq
    }
    else {
        return []
    }
}
// get nopunch request
export const getCEOnopunchrequst = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/Ceonopunch/nopunch')
    const { success, data } = result.data;
    if (success === 1) {
        const nopunchreq = data.map((val) => {
            const data2 = {
                req_type: 3,
                SlNo: val.nopunch_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.np_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.np_ceo_apprv_status,
                ceo_req: val.np_ceo_req_status,
                hod_req: val.np_hod_apprv_req,
                hodaprv: val.np_hod_apprv_status,
                hr_apprv: val.np_hr_apprv_status,
                hrreq: val.np_hr_aprrv_requ,
                increq: val.np_inc_apprv_req,
                incaprv: val.np_incapprv_status,
                inStatus: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data2
        })
        // setnopunch(nopunchreq)
        return nopunchreq
    }
    else {
        return []
    }
}
// get nopunch request
export const getHRnopunchrequst = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/HrNopunch/Nopunch')
    const { success, data } = result.data;
    if (success === 1) {
        const nopunchreq = data.map((val) => {
            const data2 = {
                req_type: 3,
                SlNo: val.nopunch_slno,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.np_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.np_ceo_apprv_status,
                ceo_req: val.np_ceo_req_status,
                hod_req: val.np_hod_apprv_req,
                hodaprv: val.np_hod_apprv_status,
                hr_apprv: val.np_hr_apprv_status,
                hrreq: val.np_hr_aprrv_requ,
                increq: val.np_inc_apprv_req,
                incaprv: val.np_incapprv_status,
                inStatus: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data2
        })
        // setnopunch(nopunchreq)
        return nopunchreq
    }
    else {
        return []
    }
}
// get compensatory off  request 
export const compensatoryCeo = async (getDeptSection) => {
    const result = await axioslogin.get('/LeaveRequestApproval/ceoCoff/Coff')
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: 4,
                SlNo: val.cmp_off_reqid,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.cf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.cf_ceo_apprv_status,
                ceo_req: val.cf_ceo_req_status,
                hod_req: val.cf_hod_apprv_req,
                hodaprv: val.cf_hod_apprv_status,
                hr_apprv: val.cf_hr_apprv_status,
                hrreq: val.cf_hr_aprrv_requ,
                increq: val.cf_inc_apprv_req,
                incaprv: val.cf_incapprv_status,
                inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}
// get compensatory off  request 
export const compensatoryHr = async () => {
    const result = await axioslogin.get('/LeaveRequestApproval/HrCoff/coff')
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: 4,
                SlNo: val.cmp_off_reqid,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.dept_name,
                dept_section: val.em_dept_section,
                Status: val.cf_hr_apprv_status === 0 ? 'HR Approval Pending' : 'HR Approved',
                ceo_apprv: val.cf_ceo_apprv_status,
                ceo_req: val.cf_ceo_req_status,
                hod_req: val.cf_hod_apprv_req,
                hodaprv: val.cf_hod_apprv_status,
                hr_apprv: val.cf_hr_apprv_status,
                hrreq: val.cf_hr_aprrv_requ,
                increq: val.cf_inc_apprv_req,
                incaprv: val.cf_incapprv_status,
                inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}
//GET DAYS BETWEEN TWO DAYS
export const getDayDiffrence = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const daysDuration = moment.duration(y.diff(x));
        const days = daysDuration.asDays()
        return days;
    }
    return 0;
}


export const getAll = async (DeptSect) => {
    const result = await axioslogin.post('/LeaveRequestApproval/Allreq/list', DeptSect)
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: val.reqtype,
                SlNo: val.ROW_NUM,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.sect_name,
                dept_section: val.sect_name,
                inStatus: val.typename,
                increq: val.increq,
                incaprv: val.incaprv
                // inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                //     (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                //         (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                //             (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}

export const getAllHod = async (DeptSect) => {
    const result = await axioslogin.post('/LeaveRequestApproval/allHod/list', DeptSect)
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: val.reqtype,
                SlNo: val.ROW_NUM,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.sect_name,
                dept_section: val.sect_name,
                inStatus: val.typename,
                hod_req: val.hod_req,
                hodaprv: val.hodaprv
                // inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                //     (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                //         (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                //             (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}
export const getAllCeo = async (DeptSect) => {
    const result = await axioslogin.post('/LeaveRequestApproval/allceo/list')
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: val.reqtype,
                SlNo: val.ROW_NUM,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.sect_name,
                dept_section: val.sect_name,
                inStatus: val.typename,
                ceo_req: val.ceo_req,
                ceo_apprv: val.ceo_apprv
                // inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                //     (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                //         (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                //             (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}

export const getAllHr = async (DeptSect) => {
    const result = await axioslogin.post('/LeaveRequestApproval/allHr/list',)
    const { success, data } = result.data;
    if (success === 1) {
        const compensatory = data.map((val) => {
            const data4 = {
                req_type: val.reqtype,
                SlNo: val.ROW_NUM,
                Emp_no: val.em_no,
                Employee_name: val.em_name,
                Department_section: val.sect_name,
                dept_section: val.sect_name,
                inStatus: val.typename,
                hrreq: val.hrreq,
                hr_apprv: val.hr_apprv
                // inStatus: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                //     (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                //         (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                //             (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved'
            }
            return data4
        })
        return compensatory
    }
    else {
        return []
    }
}



