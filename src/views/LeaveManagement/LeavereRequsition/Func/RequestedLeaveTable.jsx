import { Box } from '@mui/system'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
// import LeaveCancelUserModel from './Component/LeaveCancelUserModel';
import _ from 'underscore';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import moment from 'moment';
import DeptSectionBasedEmpTable from './DeptSectionBasedEmpTable';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveCancelEmp from '../EmpView/LeaveCancelEmp';
import HalfdayCancelEmp from '../EmpView/HalfdayCancelEmp';
import NopunchCancelEmp from '../EmpView/NopunchCancelEmp';
import CompOffCancelEmp from '../EmpView/CompOffCancelEmp';

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
                    leaveid: val.leave_slno,
                    type: "Leave Request",
                    reason: val.leave_reason,
                    slno: val.lve_uniq_no,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    hrstatus: val.hr_apprv_status,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.ceo_req_status === 1 && val.ceo_apprv_status === 0 && val.hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.ceo_req_status === 1 || val.ceo_req_status === 0 && val.ceo_apprv_status === 0 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.hod_apprv_status === 1 || val.ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1 && val.ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: val.leave_date,
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
                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0 && val.hf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 || val.hf_ceo_apprv_status === 0 && val.hf_hr_apprv_status === 0 && val.hf_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.hf_hr_aprrv_requ === 1 || val.hf_ceo_apprv_status === 0 && val.hf_hr_apprv_status === 0 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    hrstatus: val.hf_hr_apprv_status,
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: val.leavedate,

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
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0 && val.np_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 || val.np_ceo_apprv_status === 0 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.np_hr_aprrv_requ === 1 || val.np_ceo_apprv_status === 0 && val.np_hr_apprv_status === 0 && val.np_hod_apprv_status === 2) ? 'HOD Reject' :
                                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: val.nopunchdate,
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
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0 && val.cf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 || val.cf_ceo_apprv_status === 0 && val.cf_hr_apprv_status === 1 && val.cf_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.cf_hr_aprrv_requ === 1 || val.cf_ceo_apprv_status === 0 && val.cf_hr_apprv_status === 0 && val.cf_hod_apprv_status === 2) ? 'HOD Reject' :
                                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: val.leave_date,
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
                    reason: val.leave_reason,
                    slno: val.lve_uniq_no,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    hrstatus: val.hr_apprv_status,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.ceo_req_status === 1 && val.ceo_apprv_status === 0 && val.hod_apprv_status === 1 && val.hr_apprv_status === 0) ? 'CEO Approval Pending' :
                                    ((val.ceo_req_status === 1 || val.ceo_req_status === 0) && val.ceo_apprv_status === 0 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.hod_apprv_status === 1 || val.ceo_apprv_status === 1) ? 'HR Approval Pending' :
                                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0 && val.ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1 && val.ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: val.leave_date,
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
                    hrstatus: val.hf_hr_apprv_status,
                    status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0 && val.hf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 || val.hf_ceo_apprv_status === 0 && val.hf_hr_apprv_status === 0 && val.hf_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.hf_hr_aprrv_requ === 1 || val.hf_ceo_apprv_status === 0 && val.hf_hr_apprv_status === 0 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1 && val.hf_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: val.leavedate,

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
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0 && val.np_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 || val.np_ceo_apprv_status === 0 && val.np_hr_apprv_status === 1 && val.np_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.np_hr_aprrv_requ === 1 || val.np_ceo_apprv_status === 0 && val.np_hr_apprv_status === 0 && val.np_hod_apprv_status === 2) ? 'HOD Reject' :
                                            (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1 && val.np_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: val.nopunchdate,
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
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 1) ? 'HOD Approval Pending' :
                            (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0 && val.cf_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0 && val.cf_hod_apprv_status === 1) ? 'CEO Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 || val.cf_ceo_apprv_status === 0 && val.cf_hr_apprv_status === 1 && val.cf_hod_apprv_status === 1) ? 'HR Approval Pending' :
                                        (val.cf_hr_aprrv_requ === 1 || val.cf_ceo_apprv_status === 0 && val.cf_hr_apprv_status === 0 && val.cf_hod_apprv_status === 2) ? 'HOD Reject' :
                                            (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_ceo_apprv_status === 2) ? 'CEO Rejected' :
                                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_ceo_apprv_status === 0) ? 'Approved' : 'Approved',
                    // (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0 && val.cf_hod_apprv_status === 1 && val.cf_hr_apprv_status === 0) ? 'CEO Approval Pending' :
                    //     (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1 && val.cf_ceo_apprv_status === 0 && val.cf_ceo_req_status === 1) ? 'Approved' :
                    //         (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: val.leave_date,
                    toDate: val.leavetodate
                }
            })
            setleavecanceldetl([...newList, ...newHalfday, ...newNopunch, ...newCompRq])
        }
    }, [hod, incharge, em_id, leaveRqList, nopunchRqList, em_no,
        compOffRqList, halfdayRqList, authorizationBasedDeptSection])


    const LeaveCancel = useCallback(async (event) => {
        const { hrstatus, code } = event
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        } else {
            if (code === 1) {
                setlveData(event)
                setleaveReqModal(true)
            } else if (code === 2) {
                sethalfData(event)
                sethalfDayReqModal(true)
            } else if (code === 3) {
                setnoPunchData(event)
                setnoPunchReqModal(true)
            } else if (code === 4) {
                setcoffData(event)
                setcoffReqModal(true)
            }
        }

    }, [])

    return (
        <Fragment>
            <Suspense>
                <LeaveCancelEmp open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <HalfdayCancelEmp open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
                <NopunchCancelEmp open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <CompOffCancelEmp open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
            </Suspense>
            <Box sx={{
                flex: 1, p: 0.5,
                display: 'flex',
                overflow: 'auto',
                '::-webkit-scrollbar': {
                    height: 8,
                },
                '::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                    borderRadius: '0px',
                },

                '::-webkit-scrollbar-thumb': {
                    // background: '#077DFA',
                    borderRadius: '0px',
                },

                '::-webkit-scrollbar-thumb:hover': {
                    //   background: 'rgb(255, 251, 251)',
                },
                maxHeight: 400
            }}  >
                {
                    flag === 1 ? <DeptSectionBasedEmpTable leavecanceldetl={leavecanceldetl} setCount={setCount} /> : <TableContainer component={Paper}>
                        <Table sx={{ border: 1 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Request Type</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Date</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Reason</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Status</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Cancel</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    leavecanceldetl && leavecanceldetl.map((val, index) => {

                                        return < TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{val.type} </TableCell>
                                            <TableCell align="center">{moment(val.fromDate).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell align="center">{val.reason}</TableCell>
                                            <TableCell align="center">{val.status}</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small"
                                                    onClick={(e) => {
                                                        LeaveCancel(val)
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Box >
        </Fragment>
    )
}

export default memo(RequestedLeaveTable)