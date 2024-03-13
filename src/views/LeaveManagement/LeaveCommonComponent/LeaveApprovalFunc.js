
export const MappingData = async (filtered) => {
    const leaverq = filtered.map((val) => {
        const data4 = {
            row_slno: val.rslno,
            req_type: 1,
            SlNo: val.leave_slno,
            Emp_no: val.em_no,
            Employee_name: val.em_name,
            sect_name: val.sect_name,
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
            inStatus:  (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
            (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
            (val.inc_apprv_req === 0 &&val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0  ) ? 'HOD Approved' :
                (val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2 ) ? 'HOD Rejected ' :
                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1 && val.hod_apprv_status === 1) ? 'HR Approved' :
                    (val.hr_aprrv_requ === 1  && val.hr_apprv_status === 2 && val.hod_apprv_status === 1)? 'HR Rejected' :'HR Pending',
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
            sect_name: val.sect_name,
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
            (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
            (val.hf_inc_apprv_req === 0 &&val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_apprv_status === 0  ) ? 'HOD Approved' :
                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2 ) ? 'HOD Rejected ' :
                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_hod_apprv_status === 1) ? 'HR Approved' :
                    (val.hf_hr_aprrv_requ === 1  && val.hf_hr_apprv_status === 2 && val.hf_hod_apprv_status === 1)? 'HR Rejected' :'HR Pending',
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
            sect_name: val.sect_name,
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
            inStatus:   (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
            (val.np_inc_apprv_req === 0 &&val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0  ) ? 'HOD Approved' :
                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2 ) ? 'HOD Rejected ' :
                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
                    (val.np_hr_aprrv_requ === 1  && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1)? 'HR Rejected' :'HR Pending',
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
            sect_name: val.sect_name,
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
            inStatus:(val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
            (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
            (val.cf_inc_apprv_req === 0 &&val.cf_incapprv_status === 0 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 ) ? 'HOD Approval Pending' :
                (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 1 && val.cf_hr_apprv_status === 0  ) ? 'HOD Approved' :
                (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 2 ) ? 'HOD Rejected ' :
                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_hod_apprv_status === 1) ? 'HR Approved' :
                    (val.cf_hr_aprrv_requ === 1  && val.cf_hr_apprv_status === 2 && val.cf_hod_apprv_status === 1)? 'HR Rejected' :'HR Pending',
        }
        return data4
    })
    return leaverq
}