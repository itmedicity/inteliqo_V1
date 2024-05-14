import React, { Fragment, memo, useCallback, useEffect, useState, lazy } from 'react'
import { useHistory } from 'react-router'
import Tooltip from "@material-ui/core/Tooltip";
import { getleaverequest, infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { Box, IconButton, Paper } from '@mui/material';
import { CssVarsProvider, Radio, RadioGroup } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import _ from 'underscore';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Suspense } from 'react';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
const LeaveRequestModal = lazy(() => import('./Modal/LeaveRequestModal'));
// const CompansatoryOff = lazy(() => import('./Modal/CompansatoryOff'));
const NoPunchLeaveRequest = lazy(() => import('./Modal/NoPunchLeaveRequest'));
const HalfDayLeaveRequest = lazy(() => import('./Modal/HalfDayLeaveRequest'));

const ApprovalHR = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [count, setCount] = useState(0)

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
    //const compOffRqList = useSelector(state => state.setAllLeaveApproval.compOffrqData.compOffRqList, _.isEqual);

    // HR APPROVLA REQUEST FORM DATA STATE
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [value, setValue] = useState(1);
    const [tableData, setTableData] = useState([])

    //LEAVE TYPE GET FUNCTION FROM DB
    useEffect(() => {
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
    }, [setleaverequesttype])

    //RADIO BUTTON HANDLE FUNCTION
    const handleChangeRadioBtn = useCallback(async (event) => {
        let radioBtnVal = event.target.value;
        setValue(radioBtnVal);
        //CALCULATE AND FILTER THE FUNCTION

        if (radioBtnVal === '1') {
            //LEAVE REQUEST 
            if (Object.keys(leaveRqList).length > 0) {

                const arrinch = leaveRqList?.filter((k) => k.incapprv_status !== 2)
                    ?.filter((k) => k.hod_apprv_status !== 2)
                    ?.filter((k) => k.hr_apprv_status !== 2)
                    ?.map((val) => {
                        return {
                            slno: val.lve_uniq_no,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Approval Pending',
                            hrstatus: val.hr_apprv_status,
                            code: 1,
                            reqDate: val.request_date,
                            fromDate: val.leave_date,
                            toDate: val.leavetodate
                        }
                    })?.filter((k) => k.hrstatus !== 1)
                setTableData(arrinch)
            } else {

                setTableData([])
                infoNofity('No Leave Request Found')
            }
        } else if (radioBtnVal === '2') {

            //HALF DAY LEAVE REQUEST
            if (Object.keys(halfdayRqList).length > 0) {

                const arr = await halfdayRqList
                    ?.filter((k) => k.hf_incapprv_status !== 2)
                    ?.filter((k) => k.hf_hod_apprv_status !== 2)
                    ?.filter((k) => k.hf_hr_apprv_status !== 2)
                    ?.map((val) => {
                        return {
                            slno: val.half_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            dept_section: val.dept_section,
                            checkIn: val.checkIn,
                            checkOut: val.checkOut,
                            month: val.month,
                            halfday_status: val.halfday_status,
                            status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                            hrstatus: val.hf_hr_apprv_status,
                            code: 2,
                            reqDate: val.requestdate,
                            leaveDate: val.leavedate,
                            shift_id: val.shift_id,
                            planslno: val.planslno

                        }
                    })?.filter((k) => k.hrstatus !== 1)

                setTableData(arr)

            } else {
                setTableData([])
                infoNofity('No Halfday Request Found')
            }
        } else if (radioBtnVal === '3') {
            //NO PUNCH
            if (Object.keys(nopunchRqList).length > 0) {
                const arrinch = nopunchRqList
                    ?.filter((k) => k.np_incapprv_status !== 2)
                    ?.filter((k) => k.np_hod_apprv_status !== 2)
                    ?.filter((k) => k.np_hr_apprv_status !== 2)
                    ?.map((val) => {
                        return {
                            slno: val.nopunch_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            dept_section: val.dept_section,
                            shift_id: val.shift_id,
                            status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' :
                                                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' : 'HR Approval Pending',
                            hrstatus: val.np_hr_apprv_status,
                            code: 3,
                            reqDate: val.request_date,
                            fromDate: val.leave_date,
                            toDate: val.leavetodate
                        }
                    })?.filter((k) => k.hrstatus !== 1)
                setTableData(arrinch)
            } else {
                setTableData([])
                infoNofity('No Nopunch Request Found')
            }
        }
    }, [halfdayRqList, leaveRqList, nopunchRqList]);

    useEffect(() => {
        if (value === 1) {
            const arrinch = leaveRqList
                ?.filter((k) => k.incapprv_status !== 2)
                ?.filter((k) => k.hod_apprv_status !== 2)
                ?.filter((k) => k.hr_apprv_status !== 2)
                ?.map((val) => {
                    return {
                        slno: val.lve_uniq_no,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        dept_section: val.dept_section,
                        status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2 && val.hod_apprv_status === 1) ? 'HR Rejected' : 'HR Approval Pending',
                        hrstatus: val.hr_apprv_status,
                        code: 1,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })?.filter((k) => k.hrstatus !== 1 && k.hrstatus !== 2)

            setTableData(arrinch)

        } else if (value === 2) {
            if (Object.keys(halfdayRqList).length > 0) {
                const arrinch = halfdayRqList
                    ?.filter((k) => k.hf_incapprv_status !== 2)
                    ?.filter((k) => k.hf_hod_apprv_status !== 2)
                    ?.filter((k) => k.hf_hr_apprv_status !== 2)
                    ?.map((val) => {
                        return {
                            slno: val.half_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            dept_section: val.dept_section,
                            checkIn: val.checkIn,
                            checkOut: val.checkOut,
                            month: val.month,
                            halfday_status: val.halfday_status,
                            status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                            hrstatus: val.hf_hr_apprv_status,
                            code: 2,
                            reqDate: val.requestdate,
                            leaveDate: val.leavedate,
                            shift_id: val.shift_id,
                            planslno: val.planslno
                        }
                    })?.filter((k) => k.hrstatus !== 1)
                setTableData(arrinch)
            }
            else {
                setTableData([])
            }
        } else if (value === 3) {
            if (Object.keys(nopunchRqList).length > 0) {
                const arrinch = nopunchRqList
                    ?.filter((k) => k.np_incapprv_status !== 2)
                    ?.filter((k) => k.np_hod_apprv_status !== 2)
                    ?.filter((k) => k.np_hr_apprv_status !== 2)
                    ?.map((val) => {
                        return {
                            slno: val.nopunch_slno,
                            emno: val.em_no,
                            name: val.em_name,
                            section: val.sect_name,
                            dept_section: val.dept_section,
                            shift_id: val.shift_id,
                            status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected ' :
                                                (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' :
                                                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' : 'HR Approval Pending',
                            hrstatus: val.np_hr_apprv_status,
                            code: 3,
                            reqDate: val.request_date,
                            fromDate: val.leave_date,
                            toDate: val.leavetodate
                        }
                    })?.filter((k) => k.hrstatus !== 1)
                setTableData(arrinch)
            }
            else {
                setTableData([])
            }
        }
    }, [leaveRqList, value, halfdayRqList, nopunchRqList])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'status', minWidth: 200, filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hrstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }
        },
    ])


    //MODAL STATES FOR RENDERING OPEN MODAL & UPDATE DATA
    const [leaveReqModal, setleaveReqModal] = useState(false);
    //const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    // const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});

    //MODAL OPENING FUNCTION
    let handleClickIcon = useCallback(async (table) => {
        dispatch(setCommonSetting())
        dispatch(setShiftDetails())
        const { code } = table.data;
        if (code === 1) {
            setlveData(table.data)
            setleaveReqModal(true)
        } else if (code === 2) {
            sethalfData(table.data)
            sethalfDayReqModal(true)
        } else if (code === 3) {
            setnoPunchData(table.data)
            setnoPunchReqModal(true)
        }

    }, [dispatch])

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <Suspense>
                <LeaveRequestModal open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                {/* <CompansatoryOff open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} /> */}
                <NoPunchLeaveRequest open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <HalfDayLeaveRequest open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
            </Suspense>
            <PageLayoutCloseOnly
                heading="Leave Approval HR"
                redirect={RedirectToProfilePage}
            >
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                <RadioGroup
                                    defaultValue="female"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChangeRadioBtn}
                                    sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}
                                    size="lg"
                                >
                                    {
                                        leaverequesttype && leaverequesttype?.map((val, idx) => {
                                            return <Box key={idx} sx={{ display: 'flex', flex: 1 }}>
                                                <Radio
                                                    value={val.lrequest_slno}
                                                    label={val.lrequest_type}
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        })
                                    }
                                </RadioGroup>
                            }
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(ApprovalHR)
