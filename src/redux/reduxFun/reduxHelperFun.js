import { endOfYear, format, subMonths } from "date-fns";
import moment from "moment";
import { getDepartmentSectionBasedHod } from "src/views/LeaveManagement/LeavereRequsition/Func/LeaveFunction";

//SELECT ALL DEPARTMENT NAMES
export const getDepartmentAll = (state) => state?.getdept?.departmentlist; //dispatch(setDept())
//SELECT ALL DEPARTMENT SECTION NAME LIST
export const getDepartmentSectionAll = (state) => state?.getDeprtSection?.empDeptSectionList; //dispatch(setdeptSection())
//SELECT DEPARTMENT SECTION BASED ON DEPARTMENT ID // dispatch(setdeptSection())
export const getDepartmentSectBasedDeptID = (state, deptID) => {
    const departmentSectionAll = state?.getDeprtSection?.empDeptSectionList;
    return departmentSectionAll?.filter((e) => e.dept_id === deptID)
};
//get employee information ( em_no,em_id,group_id,hod,incharge) //setProfileData(empid)
export const getEmployeeInformationLimited = (state) => {
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name } = state?.getProfileData?.ProfileData[0];
    const empInform = { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name }
    return empInform;
}

export const getCommonSettings = (state, menuno) => {
    const commonState = state?.getCommonSettings?.group_slno;
    const Obj = commonState !== undefined && JSON.parse(commonState);
    const result = Obj && Obj?.find((e) => e === menuno) === undefined ? false : true
    return result
}

export const findBalanceCommonLeveCount = (state) => {
    const commonLeaves = state?.getCreitedCommonLeave?.commonLerave;
    const findBalance = commonLeaves?.map((el) => {
        return {
            type: el.llvetype_slno,
            balance: el.cmn_lv_balance
        }
    })
    return findBalance
}



//GET AND FILTER ALL LEAVE AND CONVERT TO AN ARRAY
export const allLeavesConvertAnArray = (state) => {
    let creditedLeavesArray = {
        status: false,
        data: []
    }
    const casualLeaves = state?.getCreditedCasualLeave?.casualLeave;
    const earnLeaves = state?.getCreditedEarnLeave?.earnLeave;
    const compansatoryOff = state?.getCreitedCompansatoryOffLeave?.compansatory;
    const commonLeaves = state?.getCreitedCommonLeave?.commonLerave;

    // Push casual leaves to the array if available
    if (casualLeaves?.length > 0) {
        const newCasualLeavesAttay = casualLeaves?.map((e) => {
            let leveCount = e.cl_lv_taken === 0 ? 1 : e.cl_lv_taken;
            return {
                type: 'CL',
                name: 'Casual Leave',
                leavetype: 1,
                slno: e.hrm_cl_slno,
                month: e.cl_lv_mnth + '-' + leveCount,
                count: leveCount,
                lveRequest: e.hl_lv_tkn_status, // Leave requested status not approved status
                common_slno: 0,
                cmn: 0
            }
        })?.filter((e) => e.lveRequest === 0) //REQUESTED LEAVE STATUS CHANGED TO 1 AFTER APPROVAL IT BECOME 1
        creditedLeavesArray.data.push(...newCasualLeavesAttay)
    }

    // Push earned leaves to the array if available
    if (earnLeaves?.length > 0) {
        const newErnLeaves = earnLeaves?.map((e) => {
            let leveCount = e.ernlv_taken === 0 ? 1 : e.ernlv_taken;
            return {
                type: 'EL',
                name: 'Earn Leave',
                leavetype: 8,
                slno: e.hrm_ernlv_slno,
                month: e.ernlv_mnth + '-' + leveCount,
                count: leveCount,
                lveRequest: e.hl_lv_tkn_status, // Leave requested status not approved status
                common_slno: 0,
                cmn: 0
            }
        })?.filter((e) => e.lveRequest === 0) //REQUESTED LEAVE STATUS CHANGED TO 1 AFTER APPROVAL IT BECOME 1
        creditedLeavesArray.data.push(...newErnLeaves)
    }

    // Push compensatory off leaves to the array if available
    if (compansatoryOff?.length > 0) {
        const newCompanSatoryLeaves = compansatoryOff?.map((e) => {
            return {
                type: 'COFF',
                name: 'Compansatory Off',
                leavetype: 11,
                slno: e.hrm_calc_holiday,
                month: e.calculated_date,
                count: e.credited,
                taken: e.taken,
                credited: e.credited_date,
                remark: e.specail_remark,
                lveRequest: e.hl_lv_tkn_status, // Leave requested status not approved status,
                common_slno: 0,
                cmn: 0
            }
        })?.filter((e) => e.lveRequest === 0)//REQUESTED LEAVE STATUS CHANGED TO 1 AFTER APPROVAL IT BECOME 1
        creditedLeavesArray.data.push(...newCompanSatoryLeaves)
    }

    // Push common leaves to the array if available
    if (commonLeaves?.length > 0) {
        const findSickLeave = commonLeaves.find((e) => e.llvetype_slno === 7);
        if (findSickLeave !== undefined) {
            let count = findSickLeave.cmn_lv_balance;

            const integerPart = Math.floor(count);
            const fractionalPart = count - integerPart;
            const resultArray = Array(integerPart).fill(1);
            const sickLeave = fractionalPart > 0 ? [...resultArray, fractionalPart] : resultArray;

            const sickLeaveArray = sickLeave?.map((e, index) => {

                return {
                    type: 'SL',
                    name: 'Sick Leave',
                    leavetype: 7,
                    slno: index + 1,
                    month: format(subMonths(endOfYear(new Date()), index + 1), 'MMMM') + ' ' + e,
                    count: e,
                    taken: 0,
                    common_slno: findSickLeave?.hrm_lv_cmn,
                    cmn: 1
                }
            })
            creditedLeavesArray.data.push(...sickLeaveArray); // Push the newly created array to creditedLeavesArray
        }
    }

    if (commonLeaves?.length > 0) {
        const findSickLeave = commonLeaves.find((e) => e.llvetype_slno === 2);
        if (findSickLeave !== undefined) {
            const array = [{
                type: 'ML',
                name: 'Maternity Leave',
                leavetype: 2,
                slno: 1,
                month: `MATERNITY LEAVE`,
                count: findSickLeave?.cmn_lv_allowed,
                taken: findSickLeave?.cmn_lv_taken,
                common_slno: findSickLeave?.hrm_lv_cmn,
                cmn: 1
            }]

            creditedLeavesArray.data.push(...array); // Push the newly created array to creditedLeavesArray
        }
    }

    if (commonLeaves?.length > 0) {
        const findSickLeave = commonLeaves.find((e) => e.llvetype_slno === 5);
        if (findSickLeave !== undefined) {
            const array = [{
                type: 'LWP',
                name: 'LWP',
                leavetype: 5,
                slno: 1,
                month: `LWP`,
                count: findSickLeave?.cmn_lv_allowed,
                taken: findSickLeave?.cmn_lv_taken,
                common_slno: findSickLeave?.hrm_lv_cmn,
                cmn: 1
            }]

            creditedLeavesArray.data.push(...array); // Push the newly created array to creditedLeavesArray
        }
    }

    if (commonLeaves?.length > 0) {
        const findSickLeave = commonLeaves.find((e) => e.llvetype_slno === 6);
        if (findSickLeave !== undefined) {
            const array = [{
                type: 'ESI',
                name: 'ESI',
                leavetype: 6,
                slno: 1,
                month: `ESI`,
                count: findSickLeave?.cmn_lv_allowed,
                taken: findSickLeave?.cmn_lv_taken,
                common_slno: findSickLeave?.hrm_lv_cmn,
                cmn: 1
            }]

            creditedLeavesArray.data.push(...array); // Push the newly created array to creditedLeavesArray
        }
    }

    creditedLeavesArray.status = true
    // Return the array with all credited leaves
    return creditedLeavesArray;

}


// AANUAL LEAVES INFORMATIOM COUNT FOR SHOWING IN THE TABLE

export const getLeavesCountEMIDwise = (state) => state?.getPrifileDateEachEmp?.empLeaveData;

//GET SELECTED EMPLOYEE DATA FROM THE DATABASE 
export const getSelectedEmpInformation = (state) => state?.getEmployeeInformationState?.empData[0] ?? {};

export const getCaualLeaveDetl = (state) => {
    const casualLeave = state?.getCreditedCasualLeave?.casualLeave;
    return casualLeave?.map((e) => {
        let leveCount = e.cl_lv_taken === 0 ? 1 : e.cl_lv_taken;
        return {
            slno: e.hrm_cl_slno,
            month: e.cl_lv_mnth + '-' + leveCount,
            count: leveCount,
            status: e.hl_lv_tkn_status
        }
    })?.filter(e => e.status === 0)
}


//GET CONTRACT CLOSE DATA 
export const getContractClosedata = (state) => state?.getContractClosedata;

//GET APPROVAL LEVEL FOR LEAVE REQUEST IS INCHARGE LEVEL APPROVAL NEEDE OR IS HOD LEVEL APPROVAL NEEDE 
export const getLeaveReqApprovalLevel = (state) => {
    const result = state.getEmployeeApprovalLevel.payload
    const { authorization_hod, authorization_incharge } = result
    return authorization_hod === 1 && authorization_incharge === 1 ? 3
        : authorization_hod === 1 && authorization_incharge === 0 ? 2
            : authorization_hod === 0 && authorization_incharge === 1 ? 1 : 0
    /*
     *3 -> hod and incharge
     *2 -> hod only
     *1 -> incharge only
     *0 -> nothing  
     */
};


//GET AUTHORIZATION 

export const getInchargeHodAuthorization = async (masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmno) => {

    //console.log(masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmno);

    const deptLevelApprove = (deptApprovalLevel === 3) ? // 3 -> hod and incharge
        {
            inc_apr: 1,
            inc_stat: 0,
            inc_cmnt: '',
            inc_apr_time: null,
            usCode_inch: null,
            hod_apr: 1,
            hod_stat: 0,
            hod_cmnt: '',
            hod_apr_time: null,
            usCode_hod: null
        }
        : (deptApprovalLevel === 2) ? // 2 -> hod only
            {
                inc_apr: 0,
                inc_stat: 0,
                inc_cmnt: '',
                inc_apr_time: null,
                usCode_inch: null,
                hod_apr: 1,
                hod_stat: 0,
                hod_cmnt: '',
                hod_apr_time: null,
                usCode_hod: null
            }
            : (deptApprovalLevel === 1) ? // 1 -> incharge only
                {
                    inc_apr: 1,
                    inc_stat: 0,
                    inc_cmnt: '',
                    inc_apr_time: null,
                    usCode_inch: null,
                    hod_apr: 0,
                    hod_stat: 0,
                    hod_cmnt: '',
                    hod_apr_time: null,
                    usCode_hod: null
                } :
                {
                    inc_apr: 0,
                    inc_stat: 0,
                    inc_cmnt: '',
                    inc_apr_time: null,
                    usCode_inch: null,
                    hod_apr: 0,
                    hod_stat: 0,
                    hod_cmnt: '',
                    hod_apr_time: null,
                    usCode_hod: null
                }

    //console.log(deptLevelApprove);

    return (masterGroupStatus === true) ?
        {
            inc_apr: 1,
            hod_apr: 1,
            inc_stat: 1,
            hod_stat: 1,
            inc_cmnt: 'DIRECT',
            hod_cmnt: 'DIRECT',
            inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
            hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
            usCode_inch: loginEmno,
            usCode_hod: loginEmno
        } :
        (loginHod === 1) ?
            {
                inc_apr: 1,
                inc_stat: 1,
                inc_cmnt: 'DIRECT',
                inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                usCode_inch: loginEmno,
                hod_apr: 1,
                hod_stat: 1,
                hod_cmnt: 'DIRECT',
                hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                usCode_hod: loginEmno
            }
            :
            (loginIncharge === 1) ?
                {
                    inc_apr: 1,
                    inc_stat: 1,
                    inc_cmnt: 'DIRECT',
                    inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                    usCode_inch: loginEmno,
                    hod_apr: deptLevelApprove.hod_apr === 1 ? 1 : 0,
                    hod_stat: deptLevelApprove.hod_stat === 1 ? 1 : 0,
                    hod_cmnt: deptLevelApprove.hod_apr === 1 ? '' : 'DIRECT',
                    hod_apr_time: deptLevelApprove.hod_apr === 1 ? null : format(new Date(), 'yyyy-MM-dd H:m:s'),
                    usCode_hod: deptLevelApprove.hod_apr === 1 ? null : loginEmno
                }
                :
                {
                    inc_apr: deptLevelApprove.inc_apr === 1 ? 1 : 0,
                    inc_stat: deptLevelApprove.inc_stat === 1 ? 1 : 0,
                    inc_cmnt: deptLevelApprove.inc_apr === 1 ? '' : 'DIRECT',
                    inc_apr_time: deptLevelApprove.inc_apr === 1 ? null : format(new Date(), 'yyyy-MM-dd H:m:s'),
                    usCode_inch: deptLevelApprove.inc_apr === 1 ? null : loginEmno,
                    hod_apr: deptLevelApprove.hod_apr === 1 ? 1 : 0,
                    hod_stat: deptLevelApprove.hod_stat === 1 ? 1 : 0,
                    hod_cmnt: deptLevelApprove.hod_apr === 1 ? '' : 'DIRECT',
                    hod_apr_time: deptLevelApprove.hod_apr === 1 ? null : format(new Date(), 'yyyy-MM-dd H:m:s'),
                    usCode_hod: deptLevelApprove.hod_apr === 1 ? null : loginEmno
                }


}


export const getAllCopensatoryRequest = (state) => state?.setAllLeaveApproval?.compOffrqData?.compOffRqList;



export const getDutyPlanBasedSHift = (state) => state?.getDutyPlannedShift?.shiftInformation?.[0]


export const inchargeHod = async (em_id, em_dept_section) => {

    const result = await getDepartmentSectionBasedHod(em_id);
    const section = await result?.map((e) => e.dept_section)
    const flag = section?.find((e) => e === em_dept_section) === undefined ? true : false
    return flag
}


export const getEmployeeRequests = async (leaveRequest, misspunch, halfday, hod, incharge, masterGroupStatus, em_id, em_dept_section) => {

    // const leave = state?.getLeaveRequests?.leaveRequest
    // const misspunch = state?.getMisspunchRequests?.misspunchRequests
    // const halfday = state?.getHalfdayRequests?.halfdayRequest

    const sectionWiseLeaveRequest = leaveRequest;
    const sectionWisehalfdayRequest = misspunch;
    const sectionWiseMisspunchRequest = halfday;

    if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {

        const newList = sectionWiseLeaveRequest?.map((val) => {
            return {
                leaveid: val.lve_uniq_no,
                type: "Leave Request",
                reason: val.leave_reason,
                slno: val.leave_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.incapprv_status,
                hodstatus: val.hod_apprv_status,
                hrstatus: val.hr_apprv_status,
                status:
                    (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1) ? 'HOD Approved' :
                                        (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0) ? 'HOD Approved' :
                                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                code: 1,
                reqDate: val.request_date,
                fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                toDate: val.leavetodate
            }
        })

        const newHalfday = sectionWisehalfdayRequest?.map((val) => {
            return {
                type: "Halfday Request",
                reason: val.hf_reason,
                slno: val.half_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_apprv_status === 0) ? 'HOD Approved' :
                                    (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_hod_apprv_status === 1) ? 'HR Approved' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2 && val.hf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                inchargestatus: val.hf_incapprv_status,
                hodstatus: val.hf_hod_apprv_status,
                hrstatus: val.hf_hr_apprv_status,
                code: 2,
                reqDate: val.requestdate,
                leaveDate: val.leavedate,
                fromDate: moment(new Date(val.leavedate)).format('DD-MM-YYYY'),

            }
        })

        const newNopunch = sectionWiseMisspunchRequest?.map((val) => {
            return {
                type: "Miss Punch Request",
                reason: val.np_reason,
                slno: val.nopunch_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.np_incapprv_status,
                hodstatus: val.np_hod_apprv_status,
                hrstatus: val.np_hr_apprv_status,
                status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
                                    (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                        (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
                                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                code: 3,
                reqDate: val.creteddate,
                fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
                toDate: val.nopunchdate
            }
        })

        return ([...newList, ...newHalfday, ...newNopunch])
        // return newArray

    } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
        return await getDepartmentSectionBasedHod(em_id).then((hodSection) => {
            const checkHodSection = hodSection?.find(e => e.dept_section === em_dept_section) === undefined ?? false
            return {
                data0: sectionWiseLeaveRequest
                    ?.filter(val => val.dept_section !== em_dept_section)
                    ?.concat(sectionWiseLeaveRequest?.filter(e => checkHodSection === true ? e.em_id === em_id : e))
                    ?.map((val) => {
                        return {
                            leaveid: val.lve_uniq_no,
                            type: "Leave Request",
                            reason: val.leave_reason,
                            slno: val.leave_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            inchargestatus: val.incapprv_status,
                            hodstatus: val.hod_apprv_status,
                            hrstatus: val.hr_apprv_status,
                            status:
                                (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                                    (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                        (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                                (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1) ? 'HOD Approved' :
                                                    (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0) ? 'HOD Approved' :
                                                        (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                            (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                            code: 1,
                            reqDate: val.request_date,
                            fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                            toDate: val.leavetodate
                        }
                    }),
                data1: sectionWisehalfdayRequest
                    ?.filter(val => val.dept_section !== em_dept_section)
                    ?.concat(sectionWisehalfdayRequest?.filter(e => checkHodSection === true ? e.em_id === em_id : e))
                    ?.map((val) => {
                        return {
                            type: "Halfday Request",
                            reason: val.hf_reason,
                            slno: val.half_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_apprv_status === 0) ? 'HOD Approved' :
                                                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_hod_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2 && val.hf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                            inchargestatus: val.hf_incapprv_status,
                            hodstatus: val.hf_hod_apprv_status,
                            hrstatus: val.hf_hr_apprv_status,
                            code: 2,
                            reqDate: val.requestdate,
                            leaveDate: val.leavedate,
                            fromDate: moment(new Date(val.leavedate)).format('DD-MM-YYYY'),

                        }
                    }),
                data2: sectionWiseMisspunchRequest
                    ?.filter(val => val.dept_section !== em_dept_section)
                    ?.concat(sectionWiseMisspunchRequest?.filter(e => checkHodSection === true ? e.em_id === em_id : e))
                    ?.map((val) => {
                        return {
                            type: "Miss Punch Request",
                            reason: val.np_reason,
                            slno: val.nopunch_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            inchargestatus: val.np_incapprv_status,
                            hodstatus: val.np_hod_apprv_status,
                            hrstatus: val.np_hr_apprv_status,
                            status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
                                                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
                                                        (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                            code: 3,
                            reqDate: val.creteddate,
                            fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
                            toDate: val.nopunchdate
                        }
                    })

            }
        })




        // const Halfdayarr = sectionWisehalfdayRequest
        //     ?.filter(val => val.dept_section !== em_dept_section)
        //     ?.concat(sectionWisehalfdayRequest?.filter(e => e.emp_id === em_id))


        // const Nopuncharr = sectionWiseMisspunchRequest
        //     ?.filter(val => val.dept_section !== em_dept_section)
        //     ?.concat(sectionWiseMisspunchRequest?.filter(e => e.em_id === em_id))

        // const newList = Leavearr?.map((val) => {
        //     return {
        //         leaveid: val.lve_uniq_no,
        //         type: "Leave Request",
        //         reason: val.leave_reason,
        //         slno: val.leave_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         inchargestatus: val.incapprv_status,
        //         hodstatus: val.hod_apprv_status,
        //         hrstatus: val.hr_apprv_status,
        //         status:
        //             (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
        //                 (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
        //                     (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
        //                             (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1) ? 'HOD Approved' :
        //                                 (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0) ? 'HOD Approved' :
        //                                     (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
        //                                         (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
        //                                             (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
        //                                                 (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
        //                                                     (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
        //         code: 1,
        //         reqDate: val.request_date,
        //         fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
        //         toDate: val.leavetodate
        //     }
        // })

        // const newHalfday = Halfdayarr?.map((val) => {
        //     return {
        //         type: "Halfday Request",
        //         reason: val.hf_reason,
        //         slno: val.half_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
        //             (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
        //                 (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                     (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_apprv_status === 0) ? 'HOD Approved' :
        //                             (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected ' :
        //                                 (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_hod_apprv_status === 1) ? 'HR Approved' :
        //                                     (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2 && val.hf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
        //         inchargestatus: val.hf_incapprv_status,
        //         hodstatus: val.hf_hod_apprv_status,
        //         hrstatus: val.hf_hr_apprv_status,
        //         code: 2,
        //         reqDate: val.requestdate,
        //         leaveDate: val.leavedate,
        //         fromDate: moment(new Date(val.leavedate)).format('DD-MM-YYYY'),

        //     }
        // })

        // const newNopunch = Nopuncharr?.map((val) => {
        //     return {
        //         type: "Miss Punch Request",
        //         reason: val.np_reason,
        //         slno: val.nopunch_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         inchargestatus: val.np_incapprv_status,
        //         hodstatus: val.np_hod_apprv_status,
        //         hrstatus: val.np_hr_apprv_status,
        //         status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
        //             (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
        //                 (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                     (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
        //                             (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
        //                                 (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
        //                                     (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
        //         code: 3,
        //         reqDate: val.creteddate,
        //         fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
        //         toDate: val.nopunchdate
        //     }
        // })


        // const newArray = [...newList, ...newHalfday, ...newNopunch]

        // return ([...newList, ...newHalfday, ...newNopunch])
        // } else {

        // }
        // }).catch(error => {

        //     return []
        // })


    } else {


        // const newList = leave?.map((val) => {
        //     return {
        //         leaveid: val.lve_uniq_no,
        //         type: "Leave Request",
        //         reason: val.leave_reason,
        //         slno: val.leave_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         inchargestatus: val.incapprv_status,
        //         hodstatus: val.hod_apprv_status,
        //         hrstatus: val.hr_apprv_status,
        //         status:
        //             (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
        //                 (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
        //                     (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
        //                             (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1) ? 'HOD Approved' :
        //                                 (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0) ? 'HOD Approved' :
        //                                     (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
        //                                         (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
        //                                             (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
        //                                                 (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
        //                                                     (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
        //         code: 1,
        //         reqDate: val.request_date,
        //         fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
        //         toDate: val.leavetodate
        //     }
        // })

        // const newHalfday = halfday?.map((val) => {
        //     return {
        //         type: "Halfday Request",
        //         reason: val.hf_reason,
        //         slno: val.half_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
        //             (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
        //                 (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                     (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1) ? 'HOD Approved' :
        //                             (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1) ? 'HOD Approved' :
        //                                 (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
        //                                     (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Approved' :
        //                                         (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
        //                                             (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
        //                                                 (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Pending',
        //         inchargestatus: val.hf_incapprv_status,
        //         hodstatus: val.hf_hod_apprv_status,
        //         hrstatus: val.hf_hr_apprv_status,
        //         code: 2,
        //         reqDate: val.requestdate,
        //         leaveDate: val.leavedate,
        //         fromDate: moment(new Date(val.leavedate)).format('DD-MM-YYYY'),

        //     }
        // })

        // const newNopunch = misspunch?.map((val) => {
        //     return {
        //         type: "Miss Punch Request",
        //         reason: val.np_reason,
        //         slno: val.nopunch_slno,
        //         emno: val.em_no,
        //         name: val.em_name,
        //         section: val.sect_name,
        //         inchargestatus: val.np_incapprv_status,
        //         hodstatus: val.np_hod_apprv_status,
        //         hrstatus: val.np_hr_apprv_status,
        //         status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
        //             (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
        //                 (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                     (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
        //                         (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
        //                             (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
        //                                 (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
        //                                     (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
        //         code: 3,
        //         reqDate: val.creteddate,
        //         fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
        //         toDate: val.nopunchdate
        //     }
        // })


        // const newArray = [...newList, ...newHalfday, ...newNopunch]
        // return newArray

    }
}

export const getEmployeeLeaveRs = (state, hod, incharge, masterGroupStatus, em_id, em_dept_section, checkStatus) => {


    const leave = state?.getLeaveRequests?.leaveRequest
    const misspunch = state?.getMisspunchRequests?.misspunchRequests
    const halfday = state?.getHalfdayRequests?.halfdayRequest

    const sectionWiseLeaveRequest = state?.getSectLeaveRequests?.sectLeaves
    const sectionWisehalfdayRequest = state?.getSectHalfdayRequests?.sectHalfday
    const sectionWiseMisspunchRequest = state?.getSectMisspunchRequests?.sectMisspunch

    // console.log(sectionWiseMisspunchRequest);

    if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {
        const newList = sectionWiseLeaveRequest?.map((val) => {
            return {
                leaveid: val.lve_uniq_no,
                type: "Leave Request",
                reason: val.leave_reason,
                slno: val.leave_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.incapprv_status,
                hodstatus: val.hod_apprv_status,
                hrstatus: val.hr_apprv_status,
                status:
                    (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Approval Pending',
                code: 1,
                reqDate: val.request_date,
                fromDate: new Date(val.leave_date),
                toDate: val.leavetodate
            }
        })

        const newHalfday = sectionWisehalfdayRequest?.map((val) => {
            return {
                type: "Halfday Request",
                reason: val.hf_reason,
                slno: val.half_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                inchargestatus: val.hf_incapprv_status,
                hodstatus: val.hf_hod_apprv_status,
                hrstatus: val.hf_hr_apprv_status,
                code: 2,
                reqDate: val.requestdate,
                leaveDate: val.leavedate,
                fromDate: new Date(val.leavedate),

            }
        })

        const newNopunch = sectionWiseMisspunchRequest?.map((val) => {
            return {
                type: "Miss Punch Request",
                reason: val.np_reason,
                slno: val.nopunch_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.np_incapprv_status,
                hodstatus: val.np_hod_apprv_status,
                hrstatus: val.np_hr_apprv_status,
                status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                code: 3,
                reqDate: val.creteddate,
                fromDate: new Date(val.nopunchdate),
                toDate: val.nopunchdate
            }
        })

        const newArray = [...newList, ...newHalfday, ...newNopunch]?.sort((a, b) => b.fromDate - a.fromDate)?.map((e) => {
            return {
                ...e,
                fromDate: format(new Date(e.fromDate), 'dd-MM-yyyy')
            }
        })
        return newArray

    } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
        const newList = sectionWiseLeaveRequest
            ?.filter(val => val.dept_section !== em_dept_section)
            ?.concat(sectionWiseLeaveRequest?.filter(e => checkStatus === true ? e.em_id === em_id : e))
            ?.map((val) => {
                return {
                    leaveid: val.lve_uniq_no,
                    type: "Leave Request",
                    reason: val.leave_reason,
                    slno: val.leave_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.sect_name,
                    inchargestatus: val.incapprv_status,
                    hodstatus: val.hod_apprv_status,
                    hrstatus: val.hr_apprv_status,
                    status:
                        (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Approval Pending',
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: new Date(val.leave_date),
                    toDate: val.leavetodate
                }
            })

        const newHalfday = sectionWisehalfdayRequest
            ?.filter(val => val.dept_section !== em_dept_section)
            ?.concat(sectionWisehalfdayRequest?.filter(e => checkStatus === true ? e.em_id === em_id : e))
            ?.map((val) => {
                return {
                    type: "Halfday Request",
                    reason: val.hf_reason,
                    slno: val.half_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.sect_name,
                    status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    inchargestatus: val.hf_incapprv_status,
                    hodstatus: val.hf_hod_apprv_status,
                    hrstatus: val.hf_hr_apprv_status,
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: new Date(val.leavedate),

                }
            })
        const newNopunch = sectionWiseMisspunchRequest
            ?.filter(val => val.dept_section !== em_dept_section)
            ?.concat(sectionWiseMisspunchRequest?.filter(e => checkStatus === true ? e.em_id === em_id : e))
            ?.map((val) => {
                return {
                    type: "Miss Punch Request",
                    reason: val.np_reason,
                    slno: val.nopunch_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.sect_name,
                    inchargestatus: val.np_incapprv_status,
                    hodstatus: val.np_hod_apprv_status,
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' :
                                                (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' : 'HR Approval Pending',
                    code: 3,
                    reqDate: val.creteddate,
                    fromDate: new Date(val.nopunchdate),
                    toDate: val.nopunchdate
                }
            })
        const newArray = [...newList, ...newHalfday, ...newNopunch]?.sort((a, b) => b.fromDate - a.fromDate)?.map((e) => {
            return {
                ...e,
                fromDate: format(new Date(e.fromDate), 'dd-MM-yyyy')
            }
        })
        return newArray

    } else {
        const newList = leave?.map((val) => {
            return {
                leaveid: val.lve_uniq_no,
                type: "Leave Request",
                reason: val.leave_reason,
                slno: val.leave_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.incapprv_status,
                hodstatus: val.hod_apprv_status,
                hrstatus: val.hr_apprv_status,
                status:
                    (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Approval Pending',
                code: 1,
                reqDate: val.request_date,
                fromDate: new Date(val.leave_date),
                toDate: val.leavetodate
            }
        })

        const newHalfday = halfday?.map((val) => {
            return {
                type: "Halfday Request",
                reason: val.hf_reason,
                slno: val.half_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                inchargestatus: val.hf_incapprv_status,
                hodstatus: val.hf_hod_apprv_status,
                hrstatus: val.hf_hr_apprv_status,
                code: 2,
                reqDate: val.requestdate,
                leaveDate: val.leavedate,
                fromDate: new Date(val.leavedate),

            }
        })

        const newNopunch = misspunch?.map((val) => {
            return {
                type: "Miss Punch Request",
                reason: val.np_reason,
                slno: val.nopunch_slno,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.np_incapprv_status,
                hodstatus: val.np_hod_apprv_status,
                hrstatus: val.np_hr_apprv_status,
                status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                        (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' :
                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' : 'HR Approval Pending',
                code: 3,
                reqDate: val.creteddate,
                fromDate: new Date(val.nopunchdate),
                toDate: val.nopunchdate
            }
        })
        const newArray = [...newList, ...newHalfday, ...newNopunch]?.sort((a, b) => b.fromDate - a.fromDate)?.map((e) => {
            return {
                ...e,
                fromDate: format(new Date(e.fromDate), 'dd-MM-yyyy')
            }
        })
        return newArray
    }
}

export const getCoffTableData = (state, hod, incharge, masterGroupStatus, em_id, em_dept_section, checkStatus) => {
    const employeeCoff = state?.getEmpCoffRequests?.empCoff
    const sectionCoff = state?.getSectCoffRequests?.sectCoff

    if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {
        const newList = sectionCoff?.map((val) => {
            return {
                type: "Compensatory Off Request",
                reason: val.cf_reason,
                slno: val.cmp_off_reqid,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.cf_incapprv_status,
                hodstatus: val.cf_hod_apprv_status,
                hrstatus: val.cf_hr_apprv_status,
                reqDate: moment(new Date(val.reqestdate)).format('DD-MM-YYYY'),
                fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                toDate: val.leavetodate
            }
        })
        return newList
    } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
        const newList = sectionCoff
            ?.filter(val => val.em_dept_section !== em_dept_section)
            ?.concat(sectionCoff?.filter(e => checkStatus === true ? e.em_id === em_id : e))
            ?.map((val) => {
                return {
                    type: "Compensatory Off Request",
                    reason: val.cf_reason,
                    slno: val.cmp_off_reqid,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.sect_name,
                    inchargestatus: val.cf_incapprv_status,
                    hodstatus: val.cf_hod_apprv_status,
                    hrstatus: val.cf_hr_apprv_status,
                    reqDate: moment(new Date(val.reqestdate)).format('DD-MM-YYYY'),
                    fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                    toDate: val.leavetodate
                }
            })
        return newList
    }
    else {
        const arr = employeeCoff?.map((val) => {
            return {
                type: "Compensatory Off Request",
                reason: val.cf_reason,
                slno: val.cmp_off_reqid,
                emno: val.em_no,
                name: val.em_name,
                section: val.sect_name,
                inchargestatus: val.cf_incapprv_status,
                hodstatus: val.cf_hod_apprv_status,
                hrstatus: val.cf_hr_apprv_status,
                reqDate: moment(new Date(val.reqestdate)).format('DD-MM-YYYY'),
                fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                toDate: val.leavetodate
            }
        })
        return arr
    }
}