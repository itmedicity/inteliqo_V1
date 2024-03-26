import { IconButton, Paper } from '@mui/material'
import React, { Fragment, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import moment from 'moment';
import DeptSectionBasedEmpTable from './DeptSectionBasedEmpTable';
import LeaveCancelEmp from '../EmpView/LeaveCancelEmp';
import HalfdayCancelEmp from '../EmpView/HalfdayCancelEmp';
import NopunchCancelEmp from '../EmpView/NopunchCancelEmp';
import CompOffCancelEmp from '../EmpView/CompOffCancelEmp';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const RequestedLeaveTable = () => {

    const dispatch = useDispatch()
    const [leavecanceldetl, setleavecanceldetl] = useState([])
    const [flag, stFlag] = useState(0)
    const [count, setCount] = useState(0)

    //MODAL STATES FOR RENDERING OPEN MODAL & UPDATE DATA
    const [leaveReqModal, setleaveReqModal] = useState(false);
    const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_no } = employeeProfileDetl;

    const state = useSelector((state) => state.hodAuthorisedSection.sectionDetal, _.isEqual);
    const authorizationBasedDeptSection = useMemo(() => state, [state]);

    useEffect(() => {
        dispatch(getLeaveRequestAll())
        dispatch(getHalfdayRqstAll())
        dispatch(getNopunchRqstAll())
        dispatch(getCompOffRqstAll())
    }, [dispatch, count])

    //API DATA 
    const halfdayRqList = useSelector(state => state.setAllLeaveApproval.halfdayRqData.halfdayRqList, _.isEqual);
    const leaveRqList = useSelector(state => state.setAllLeaveApproval.leaveRqData.leaveRqList, _.isEqual);
    const nopunchRqList = useSelector(state => state.setAllLeaveApproval.nopunchRqData.nopunchRqList, _.isEqual);
    const compOffRqList = useSelector(state => state.setAllLeaveApproval.compOffrqData.compOffRqList, _.isEqual);

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            const leaveRequestList = leaveRqList?.filter((val) => val.em_no === em_no)
            const newList = leaveRequestList?.map((val) => {
                return {
                    leaveid: val.lve_uniq_no,
                    type: "Leave Request",
                    reason: val.leave_reason,
                    slno: val.leave_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    inchargestatus: val.incapprv_status,
                    hodstatus: val.hod_apprv_status,
                    hrstatus: val.hr_apprv_status,
                    status:
                        (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
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

            const haldayRq = halfdayRqList?.filter((val) => val.em_no === em_no)

            const newHalfday = haldayRq?.map((val) => {
                return {
                    type: "Halfday Request",
                    reason: val.hf_reason,
                    slno: val.half_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
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
            const NopunchRq = nopunchRqList?.filter((val) => val.em_no === em_no)
            const newNopunch = NopunchRq?.map((val) => {
                return {
                    type: "No Punch Request",
                    reason: val.np_reason,
                    slno: val.nopunch_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    inchargestatus: val.np_incapprv_status,
                    hodstatus: val.np_hod_apprv_status,
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
                                        (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
                                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
                    toDate: val.leavetodate
                }
            })
            const CompReq = compOffRqList?.filter((val) => val.em_no === em_no)
            const newCompRq = CompReq?.map((val) => {
                return {
                    type: "Compensatory Off Request",
                    reason: val.cf_reason,
                    slno: val.cmp_off_reqid,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    cancelstatus: val.lv_cancel_status,
                    inchargestatus: val.cf_incapprv_status,
                    hodstatus: val.cf_hod_apprv_status,
                    hrstatus: val.cf_hr_apprv_status,
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.cf_inc_apprv_req === 0 && val.cf_incapprv_status === 0 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 1 && val.cf_hr_apprv_status === 0) ? 'HOD Approved' :
                                        (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_hod_apprv_status === 1) ? 'HR Approved' :
                                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2 && val.cf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                    toDate: val.leavetodate
                }
            })
            setleavecanceldetl([...newList, ...newHalfday, ...newNopunch, ...newCompRq])
        } else {
            stFlag(1)
            let array = leaveRqList.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.dept_section === val.dept_section;
                })
            })
            const newList = array?.map((val) => {
                return {
                    type: "Leave Request",
                    leaveid: val.lve_uniq_no,
                    reason: val.leave_reason,
                    slno: val.leave_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    inchargestatus: val.incapprv_status,
                    hodstatus: val.hod_apprv_status,
                    hrstatus: val.hr_apprv_status,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.incapprv_status === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
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
            let array1 = halfdayRqList.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.dept_section === val.dept_section;
                })
            })
            const newHalfday = array1?.map((val) => {
                return {
                    type: "Halfday Request",
                    reason: val.hf_reason,
                    slno: val.half_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    inchargestatus: val.hf_incapprv_status,
                    hodstatus: val.hf_hod_apprv_status,
                    hrstatus: val.hf_hr_apprv_status,
                    status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_apprv_status === 0) ? 'HOD Approved' :
                                        (val.hf_incapprv_status === 1 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_hod_apprv_status === 1) ? 'HR Approved' :
                                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2 && val.hf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: moment(new Date(val.leavedate)).format('DD-MM-YYYY'),

                }
            })
            let array2 = nopunchRqList.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.em_dept_section === val.dept_section;
                })
            })
            const newNopunch = array2?.map((val) => {
                return {
                    type: "No Punch Request",
                    reason: val.np_reason,
                    slno: val.nopunch_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    inchargestatus: val.np_incapprv_status,
                    hodstatus: val.np_hod_apprv_status,
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_apprv_status === 0) ? 'HOD Approved' :
                                        (val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approved' :
                                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2 && val.np_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: moment(new Date(val.nopunchdate)).format('DD-MM-YYYY'),
                    toDate: val.leavetodate
                }
            })
            let array3 = compOffRqList.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.em_dept_section === val.dept_section;
                })
            })
            const newCompRq = array3?.map((val) => {
                return {
                    type: "Compensatory Off Request",
                    reason: val.cf_reason,
                    slno: val.cmp_off_reqid,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    cancelstatus: val.lv_cancel_status,
                    inchargestatus: val.cf_incapprv_status,
                    hodstatus: val.cf_hod_apprv_status,
                    hrstatus: val.cf_hr_apprv_status,
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
                            (val.cf_inc_apprv_req === 0 && val.cf_incapprv_status === 0 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 1 && val.cf_hr_apprv_status === 0) ? 'HOD Approved' :
                                        (val.cf_incapprv_status === 1 && val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_hod_apprv_status === 1) ? 'HR Approved' :
                                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2 && val.cf_hod_apprv_status === 1) ? 'HR Rejected' : 'HR Pending',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: moment(new Date(val.leave_date)).format('DD-MM-YYYY'),
                    toDate: val.leavetodate
                }
            })
            setleavecanceldetl([...newList, ...newHalfday, ...newNopunch, ...newCompRq])
        }
    }, [hod, incharge, em_id, leaveRqList, nopunchRqList, em_no,
        compOffRqList, halfdayRqList, authorizationBasedDeptSection])

    const LeaveCancel = useCallback(async (params) => {
        const { code } = params?.data
        if (code === 1) {
            setlveData(params.data)
            setleaveReqModal(true)
        } else if (code === 2) {
            sethalfData(params.data)
            sethalfDayReqModal(true)
        } else if (code === 3) {
            setnoPunchData(params.data)
            setnoPunchReqModal(true)
        } else if (code === 4) {
            setcoffData(params.data)
            setcoffReqModal(true)
        }
    }, [])

    const [columnDef] = useState([
        { headerName: 'Emp. ID', field: 'emno', filter: true },
        { headerName: 'Emp. Name', field: 'name', filter: true },
        { headerName: 'Dept. Section', field: 'section', filter: true },
        { headerName: 'Request Type', field: 'type', },
        { headerName: 'Leave Date', field: 'fromDate', filter: true },
        { headerName: 'Leave Reason', field: 'reason', },
        { headerName: 'Status', field: 'status', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hrstatus === 1 | params.data.inchargestatus === 1 || params.data.hodstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ paddingY: 0.5 }} onClick={() => LeaveCancel(params)} >
                        <DeleteIcon color='primary' />
                    </IconButton>
                }
            }
        },
    ])

    return (
        <Fragment>
            <Suspense>
                <LeaveCancelEmp open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <HalfdayCancelEmp open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
                <NopunchCancelEmp open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <CompOffCancelEmp open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
            </Suspense>
            {
                flag === 1 ? <DeptSectionBasedEmpTable leavecanceldetl={leavecanceldetl} setCount={setCount} /> :
                    <Paper square elevation={0} sx={{
                        p: 1, mt: 0.5, display: 'flex', flexDirection: "column",
                        width: "100%"
                    }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={leavecanceldetl}
                            sx={{
                                height: 400,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
            }
        </Fragment>
    )
}

export default memo(RequestedLeaveTable)