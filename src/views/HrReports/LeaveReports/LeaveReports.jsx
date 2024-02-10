import React, { memo, useCallback, useEffect, useState } from 'react'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import IconButton from '@mui/joy/IconButton';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { ToastContainer } from 'react-toastify';
import { setDepartment } from 'src/redux/actions/Department.action';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import ReportLayout from '../ReportComponent/ReportLayout';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import moment from 'moment';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import _ from 'underscore';
import { format } from 'date-fns'


const LeaveReports = () => {
    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)
    const [Empno, setEmpNo] = useState(0)
    const [Data, setData] = useState([])
    const [fromdate, Setfromdate] = useState(moment().format('yyyy-MM'))

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])



    useEffect(() => {
        dispatch(getLeaveRequestAll())
        dispatch(getHalfdayRqstAll())
        dispatch(getNopunchRqstAll())
        dispatch(getCompOffRqstAll())
    }, [dispatch])

    //API DATA 
    const halfdayRqList = useSelector(state => state.setAllLeaveApproval.halfdayRqData.halfdayRqList, _.isEqual);
    const leaveRqList = useSelector(state => state.setAllLeaveApproval.leaveRqData.leaveRqList, _.isEqual);
    const nopunchRqList = useSelector(state => state.setAllLeaveApproval.nopunchRqData.nopunchRqList, _.isEqual);
    const compOffRqList = useSelector(state => state.setAllLeaveApproval.compOffrqData.compOffRqList, _.isEqual);

    // Employee Record List
    const getEmployeeList = useCallback(async (e) => {
        e.preventDefault()
        if (Empno !== 0) {
            const leaveRequestList = leaveRqList?.filter(val => val.em_no === parseInt(Empno) && format(new Date(val?.leavetodate), "yyyy-MM") === fromdate)

            const newList = leaveRequestList?.map((val) => {

                return {
                    rslno: val.rslno,
                    dept_id: val.dept_id,
                    dept_section: val.dept_section,
                    leaveid: val.leave_slno,
                    type: "Leave Request",
                    reason: val.leave_reason,
                    slno: val.lve_uniq_no,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leavetype_name: val.leavetype_name,
                    leave_name: val.leave_name,
                    hrstatus: val.hr_apprv_status,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'Approved' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: moment(val?.leave_date).format("DD-MM-YYYY"),
                    toDate: val.leavetodate
                }
            })

            const haldayRq = halfdayRqList?.filter((val) => val.em_no === parseInt(Empno) && format(new Date(val?.leavedate), "yyyy-MM") === fromdate)

            const newHalfday = haldayRq?.map((val) => {
                return {
                    type: "Halfday Request",
                    reason: val.hf_reason,
                    slno: val.half_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leave_name: val?.month,
                    leavetype_name: "Halfday Request",
                    status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    hrstatus: val.hf_hr_apprv_status,
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: moment(val?.leavedate).format("DD-MM-YYYY"),

                }
            })
            const NopunchRq = nopunchRqList?.filter((val) => val.em_no === parseInt(Empno) && format(new Date(val?.nopunchdate), "yyyy-MM") === fromdate)
            const newNopunch = NopunchRq?.map((val) => {
                return {
                    type: "No Punch Request",
                    reason: val.np_reason,
                    slno: val.nopunch_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'Approved' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: moment(val?.nopunchdate).format("DD-MM-YYYY"),
                    toDate: val.leavetodate,
                    leavetype_name: "Miss punch",
                    leave_name: moment(val?.nopunchdate).format("DD-MM-YYYY"),
                }
            })
            const CompReq = compOffRqList?.filter((val) => val.em_no === parseInt(Empno) && format(new Date(val?.leave_date), "yyyy-MM") === fromdate)
            const newCompRq = CompReq?.map((val) => {
                return {
                    type: "Compensatory Off Request",
                    reason: val.cf_reason,
                    slno: val.cmp_off_reqid,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leavetype_name: val?.reqtype_name,
                    leave_name: moment(val?.leave_date).format("DD-MM-YYYY"),
                    cancelstatus: val.lv_cancel_status,
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1) ? 'Approved' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: moment(val?.leave_date).format("DD-MM-YYYY"),
                    toDate: val.leavetodate,

                }
            })
            setEmpNo(0)
            setData([...newList, ...newHalfday, ...newCompRq, ...newNopunch])
        } else if (deptName !== 0 && deptSecName !== 0) {

            const leaveRequestList = leaveRqList?.filter(val => val.dept_id === deptName && val.dept_section === deptSecName && format(new Date(val?.leavetodate), "yyyy-MM") === fromdate)

            const newList = leaveRequestList?.map((val) => {
                return {
                    rslno: val.rslno,
                    dept_id: val.dept_id,
                    dept_section: val.dept_section,
                    leaveid: val.leave_slno,
                    type: "Leave Request",
                    reason: val.leave_reason,
                    slno: val.lve_uniq_no,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leavetype_name: val.leavetype_name,
                    leave_name: val.leave_name,
                    hrstatus: val.hr_apprv_status,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'Approved' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: moment(val?.leave_date).format("DD-MM-YYYY"),
                    toDate: val.leavetodate
                }
            })
            const haldayRq = halfdayRqList?.filter((val) => val.dept_id === deptName && val.dept_section === deptSecName && format(new Date(val?.leavedate), "yyyy-MM") === fromdate)

            const newHalfday = haldayRq?.map((val) => {
                return {
                    type: "Halfday Request",
                    dept_id: val.dept_id,
                    dept_section: val.dept_section,
                    reason: val.hf_reason,
                    slno: val.half_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leave_name: val?.month,
                    leavetype_name: "Halfday Request",
                    status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    hrstatus: val.hf_hr_apprv_status,
                    code: 2,
                    reqDate: val.requestdate,
                    leaveDate: val.leavedate,
                    fromDate: moment(val?.leavedate).format("DD-MM-YYYY"),

                }
            })
            const NopunchRq = nopunchRqList?.filter((val) => val.em_department === deptName && val.em_dept_section === deptSecName && format(new Date(val?.nopunchdate), "yyyy-MM") === fromdate)

            const newNopunch = NopunchRq?.map((val) => {
                return {
                    type: "No Punch Request",
                    reason: val.np_reason,
                    dept_id: val.dept_id,
                    dept_section: val.dept_section,
                    slno: val.nopunch_slno,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    hrstatus: val.np_hr_apprv_status,
                    status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'Approved' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 3,
                    reqDate: val.request_date,
                    fromDate: moment(val?.nopunchdate).format("DD-MM-YYYY"),
                    toDate: val.leavetodate,
                    leavetype_name: "Miss punch",
                    leave_name: moment(val?.nopunchdate).format("DD-MM-YYYY"),
                }
            })
            const CompReq = compOffRqList?.filter((val) => val.em_department === deptName && val.em_dept_section === deptSecName && format(new Date(val?.leave_date), "yyyy-MM") === fromdate)

            const newCompRq = CompReq?.map((val) => {
                return {
                    type: "Compensatory Off Request",
                    reason: val.cf_reason,
                    dept_id: val.dept_id,
                    dept_section: val.dept_section,
                    slno: val.cmp_off_reqid,
                    emno: val.em_no,
                    name: val.em_name,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    leavetype_name: val?.reqtype_name,
                    leave_name: moment(val?.leave_date).format("DD-MM-YYYY"),
                    cancelstatus: val.lv_cancel_status,
                    status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1) ? 'Approved' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                    code: 4,
                    reqDate: val.request_date,
                    fromDate: moment(val?.leave_date).format("DD-MM-YYYY"),
                    toDate: val.leavetodate
                }
            })
            setData([...newList, ...newHalfday, ...newCompRq, ...newNopunch])
        } else {
            warningNofity("No Employee to Show")
        }

    }, [Empno, leaveRqList, compOffRqList, nopunchRqList, halfdayRqList, deptName, deptSecName, fromdate])

    useEffect(() => {
        if (Data?.length === 0) {
            setEmpNo(0)
            warningNofity("No Details To Show")
        }
    }, [Data])
    const [columnDef] = useState([
        // { headerName: 'Sl No', field: 'rslno', minWidth: 10, filter: true },
        { headerName: 'Emp No', field: 'emno', minWidth: 10, filter: true },
        { headerName: 'Name', field: 'name', autoHeight: true, wrapText: true, minWidth: 150, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 150 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 150 },
        { headerName: 'Leave date', field: 'fromDate', wrapText: true, minWidth: 150 },
        { headerName: 'Status', field: 'status', minWidth: 90 },
        { headerName: 'Leave Category', field: 'type', minWidth: 150 },
        { headerName: 'Leave Type', field: 'leavetype_name', minWidth: 90 },
        { headerName: 'Leave Month', field: 'leave_name', minWidth: 90 },
    ])
    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <ReportLayout title="Leave Reports" data={Data} displayClose={true} >
                <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>

                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DepartmentDropRedx getDept={setDepartmentName} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DepartmentSectionRedx getSection={setDepartSecName} />
                        </Box>

                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                                <InputComponent
                                    type="number"
                                    size="sm"
                                    placeholder="Employee Number"
                                    name="Empno"
                                    value={Empno}
                                    onchange={(e) => setEmpNo(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <InputComponent
                                type="Month"
                                size="sm"
                                placeholder="From Date"
                                name="Fromdate"
                                value={fromdate}
                                onchange={(e) => Setfromdate(e.target.value)}
                            />

                        </Box>
                        <Box sx={{ ml: 1 }}>

                            <IconButton variant="outlined" size='lg' color="primary" onClick={getEmployeeList}>
                                <PublishedWithChangesIcon />
                            </IconButton>

                        </Box>

                    </Box>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >

                        <CustomAgGridRptFormatOne
                            tableDataMain={Data}
                            columnDefMain={columnDef}
                        />
                    </Paper>

                </Paper>
            </ReportLayout>
        </Box >

    )
}

export default memo(LeaveReports)