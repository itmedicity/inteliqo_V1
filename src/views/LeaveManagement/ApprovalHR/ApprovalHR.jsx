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
const LeaveRequestModal = lazy(() => import('./Modal/LeaveRequestModal'));
const CompansatoryOff = lazy(() => import('./Modal/CompansatoryOff'));
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
    const compOffRqList = useSelector(state => state.setAllLeaveApproval.compOffrqData.compOffRqList, _.isEqual);

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

        // {lrequest_slno: 1, lrequest_short: 'LR', lrequest_type: 'LEAVE REQUEST'}
        // {lrequest_slno: 2, lrequest_short: 'HDLR', lrequest_type: 'HALF DAY LEAVE REQUEST'}
        // {lrequest_slno: 3, lrequest_short: 'NOP', lrequest_type: 'NO PUNCH'}
        // {lrequest_slno: 4, lrequest_short: 'COFF', lrequest_type: 'COMPANSATORY OFF'}
        if (radioBtnVal === '1') {
            //LEAVE REQUEST 
            if (Object.keys(leaveRqList).length > 0) {
                const leaveRequestList = await leaveRqList?.map((val) => {
                    return {
                        slno: val.lve_uniq_no,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'Approved' :
                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hr_apprv_status,
                        code: 1,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            } else {

                setTableData([])
                infoNofity('No Leave Request Found')
            }
        } else if (radioBtnVal === '2') {
            //HALF DAY LEAVE REQUEST
            if (Object.keys(halfdayRqList).length > 0) {
                const arr = halfdayRqList && halfdayRqList.filter((k) => {
                    return (k.hf_hr_apprv_status !== 1 && (k.hf_incapprv_status !== 2 || k.hf_hod_apprv_status !== 2))
                })
                console.log(arr);
                const leaveRequestList = await arr?.map((val) => {
                    return {
                        slno: val.half_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hf_hr_apprv_status,
                        code: 2,
                        reqDate: val.requestdate,
                        leaveDate: val.leave_date

                    }
                })
                setTableData(leaveRequestList)
            } else {
                setTableData([])
                infoNofity('No Halfday Request Found')
            }
        } else if (radioBtnVal === '3') {
            //NO PUNCH
            if (Object.keys(nopunchRqList).length > 0) {
                const leaveRequestList = await nopunchRqList?.map((val) => {
                    return {
                        slno: val.nopunch_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'Approved' :
                                        (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.np_hr_apprv_status,
                        code: 3,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            } else {

                setTableData([])
                infoNofity('No Nopunch Request Found')
            }

        } else if (radioBtnVal === '4') {
            //COMPANSATORY OFF
            if (Object.keys(compOffRqList).length > 0) {
                const leaveRequestList = await compOffRqList?.map((val) => {
                    return {
                        slno: val.cmp_off_reqid,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.cf_hr_apprv_status,
                        code: 4,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            } else {

                setTableData([])
                infoNofity('No Coff Request Found')
            }
        }

    }, [halfdayRqList, leaveRqList, nopunchRqList, compOffRqList]);



    useEffect(() => {
        if (value === 1) {
            if (Object.keys(leaveRqList).length > 0) {
                const leaveRequestList = leaveRqList?.map((val) => {
                    return {
                        slno: val.lve_uniq_no,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'Approved' :
                                        (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hr_apprv_status,
                        code: 1,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })
                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            }
            else {
                setTableData([])
            }
        } else if (value === 2) {
            if (Object.keys(halfdayRqList).length > 0) {
                const leaveRequestList = halfdayRqList?.map((val) => {
                    return {
                        slno: val.half_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'Approved' :
                                            (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hf_hr_apprv_status,
                        code: 2,
                        reqDate: val.requestdate,
                        leaveDate: val.leave_date

                    }
                })
                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                console.log(arr);
                setTableData(arr)
            }
            else {
                setTableData([])
            }
        } else if (value === 3) {
            if (Object.keys(nopunchRqList).length > 0) {
                const leaveRequestList = nopunchRqList?.map((val) => {
                    return {
                        slno: val.nopunch_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'Approved' :
                                        (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.np_hr_apprv_status,
                        code: 3,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })
                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            }
            else {
                setTableData([])
            }
        } else if (value === 4) {
            if (Object.keys(compOffRqList).length > 0) {
                const leaveRequestList = compOffRqList?.map((val) => {
                    return {
                        slno: val.cmp_off_reqid,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.sect_name,
                        status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 1) ? 'Approved' :
                                        (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.cf_hr_apprv_status,
                        code: 4,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                const arr = leaveRequestList && leaveRequestList.filter((k) => {
                    return (k.hrstatus !== 1)
                })
                setTableData(arr)
            }
            else {
                setTableData([])
            }
        }
    }, [leaveRqList, value, halfdayRqList, nopunchRqList, compOffRqList])

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
    const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});

    //MODAL OPENING FUNCTION
    let handleClickIcon = useCallback(async (table) => {
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
        } else if (code === 4) {
            setcoffData(table.data)
            setcoffReqModal(true)
        }
    }, [])

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <Suspense>
                <LeaveRequestModal open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <CompansatoryOff open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
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
