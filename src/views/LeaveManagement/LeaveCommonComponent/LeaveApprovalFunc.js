
export const MappingData = async (filtered) => {
    const leaverq = filtered.map((val) => {
        const data4 = {
            row_slno: val.rslno,
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
                (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 1) ? 'HOD Approval Pending' :
                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 2) ? 'Incharge Reajected' :
                        (val.ceo_req_status === 1 && val.ceo_apprv_status === 0 && val.hod_apprv_status === 1) ? 'CEO Approval Pending' :
                            (val.ceo_req_status === 1 || val.ceo_req_status === 0 && val.ceo_apprv_status === 0 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.ceo_apprv_status === 2) ? 'CEO Rejected' : 'Approved'
        }
        return data4
    })
    return leaverq
}

export const Halfdaymapping = async (filtered) => {
    const leaverq = filtered.map((val) => {
        const data4 = {
            row_slno: val.rslno,
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
                (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 1) ? 'HOD Approval Pending' :
                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0 && val.hf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                            (val.hf_ceo_req_status === 1 || val.hf_ceo_req_status === 0 && val.hf_ceo_apprv_status === 0 && val.hf_hod_apprv_status === 2) ? 'Hod Rejected' :
                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0 && val.hf_ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0 && val.hf_ceo_apprv_status === 2) ? 'CEO Rejected' : 'Approved'
        }
        return data4
    })
    return leaverq
}

export const nopunchmapping = async (filtered) => {
    const leaverq = filtered.map((val) => {
        const data4 = {
            row_slno: val.rslno,
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
                (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 1) ? 'HOD Approval Pending' :
                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0 && val.np_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                            (val.np_ceo_req_status === 1 || val.np_ceo_req_status === 0 && val.np_ceo_apprv_status === 0 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0 && val.np_ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0 && val.np_ceo_apprv_status === 2) ? 'CEO Rejected' : 'Approved'
        }
        return data4
    })
    return leaverq
}
export const compensatoryMapping = async (filtered) => {
    const leaverq = filtered.map((val) => {
        const data4 = {
            row_slno: val.rslno,
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
                (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 1) ? 'HOD Approval Pending' :
                    (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.cf_hod_apprv_req === 1 && val.cf_ceo_apprv_status === 0 && val.cf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                            (val.cf_ceo_req_status === 1 || val.cf_ceo_req_status === 0 && val.cf_ceo_apprv_status === 0 && val.cf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0 && val.cf_ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0 && val.cf_ceo_apprv_status === 2) ? 'CEO Rejected' : 'Approved'
        }
        return data4
    })
    return leaverq
}