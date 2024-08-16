
import { Button, Checkbox, IconButton, Input, Sheet, Textarea, Tooltip, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addDays, addHours, addMinutes, format, isAfter, isBefore, isEqual, lastDayOfMonth, startOfMonth, subDays, subHours } from 'date-fns'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCommonSettings, getEmployeeInformationLimited, getInchargeHodAuthorization, getLeaveReqApprovalLevel, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DeleteIcon from '@mui/icons-material/Delete';

const OneHour = lazy(() => import('./OneHourCancelModal'))

const OneHourRequest = () => {

    const [fromDate, setFromDate] = useState(new Date())
    const [shiftDesc, setShiftDesc] = useState('Data Not Found');
    const [selectedShift, setSelectedShift] = useState(0)

    const [checkinBox, setCheckInCheck] = useState(false)
    const [checkoutBox, setCheckOutCheck] = useState(false)

    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckout] = useState('00:00');

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);
    const [reason, setReason] = useState('')
    const [punchData, setPunchData] = useState([])
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)
    const [disbaleCheck, setDisbaleCheck] = useState(true)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [empdata, setEmpdata] = useState({})

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_department, em_dept_section, } = selectedEmpInform;

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_id: loginEmid, groupmenu } = empInformationFromRedux;

    const apprLevel = useSelector((state) => getLeaveReqApprovalLevel(state))
    const deptApprovalLevel = useMemo(() => apprLevel, [apprLevel])

    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    const state = useSelector((state) => state?.getCommonSettings,)
    const { cmmn_grace_period, comp_hour_count, default_shift, notapplicable_shift, week_off_day } = state;

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    useEffect(() => {
        const getOneHour = async (em_id) => {
            const getID = {
                em_id: em_id
            }
            const result = await axioslogin.post('/CommonReqst/onhour/empwise', getID)
            const { data, success } = result.data;
            if (success === 1) {
                setCount(0)
                const array2 = data && data.filter((val) => {
                    return (val.em_id === em_id)
                })
                const newOne = array2.map((val) => {
                    return {
                        ...val,
                        typeslno: 3,
                        type: 'One Hour Request',
                        em_no: val.em_no,
                        slno: val.request_slno,
                        serialno: val.serialno,
                        empname: val.em_name,
                        sectname: val.sect_name,
                        reqDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                        dutyDate: format(new Date(val.one_hour_duty_day), 'dd-MM-yyyy'),
                        reason: val.reason,
                        inchStatus: val.incharge_approval_status,
                        hodStatus: val.hod_approval_status,
                        hrstatus: val.hr_approval_status,
                        cancelStatus: val.cancel_status,
                        status: val.cancel_status === 1 ? 'Request Cancelled' :
                            (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                                (val.incharge_req_status === 1 && val.incharge_approval_status === 2) ? 'Incharge Approved' :
                                    (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                        (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                            (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                    (val.hod_req_status === 1 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                            (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                                (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Reject' : 'HR Approval Pending',
                    }
                })
                setTableData(newOne)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        if (em_id !== 0) {
            getOneHour(em_id)
        }

    }, [em_id, count])


    const handleChangeDate = useCallback(async (date) => {
        setFromDate(date)
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: em_id
        }
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data: shiftData } = result.data;
        if (success === 1) {
            const { shft_desc, shft_chkin_time, shft_chkout_time, shft_cross_day, holiday, shift_id } = shiftData[0];
            if (holiday === 1) {
                warningNofity("Cannot Apply One request on Holiday")
            } else if (shift_id === default_shift || shift_id === notapplicable_shift || shift_id === week_off_day) {
                warningNofity("Selected Date Must Have A Duty Plan")
            }
            else {
                setSelectedShift(shift_id)
                setShiftDesc(shft_desc)
                const inTime = format(new Date(shft_chkin_time), 'hh:mm');
                setCheckin(format(new Date(shft_chkin_time), 'hh:mm'))
                setCheckout(format(new Date(shft_chkout_time), 'hh:mm'))

                const chekIn = `${format(new Date(date), 'yyyy-MM-dd')} ${inTime}`;
                const chekOut = shft_cross_day === 0 ? `${format(new Date(date), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}` :
                    `${format(addDays(new Date(date), 1), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}`;

                setPunchInTime(chekIn)
                setPunchOutTime(chekOut)
                const postDataForpunchMaster = {
                    date1: format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd HH:mm:ss'),
                    date2: format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd HH:mm:ss'),
                    em_no: em_no
                }

                //FETCH THE PUNCH TIME FROM PUNCH DATA
                const result = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster)
                const { success, data } = result.data;
                if (success === 1) {
                    setPunchData(data)
                    setDisbaleCheck(false)
                    succesNofity('Done , Select The Punching Info')
                } else {
                    warningNofity('Punching Data Not Found')
                    setDisbaleCheck(true)
                }
            }
        } else {
            warningNofity("Duty Not Planned For the Selected Date")
        }
    }, [em_id, comp_hour_count, em_no, default_shift, notapplicable_shift, week_off_day])

    const handleChangeCheckInCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckInCheck(true)
            setCheckOutCheck(false)
        }
    }, [])

    const handleChangeCheckOutCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckOutCheck(true)
            setCheckInCheck(false)
        }
    }, [])

    const submitRequest = useCallback(async () => {

        const approveStatus = await getInchargeHodAuthorization(masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmid)

        if (checkinBox === false && checkoutBox === false) {
            warningNofity("Check In || Check Out Needs To Check")
        } else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        }
        else {
            const postData = {
                em_id: em_id,
                em_no: em_no,
                dept_id: em_department,
                dept_sect_id: em_dept_section,
                request_date: format(new Date(), 'yyyy-MM-dd H:m:s'),
                one_hour_duty_day: format(new Date(fromDate), 'yyyy-MM-dd H:m:s'),
                checkin_flag: checkinBox === true ? 1 : 0,
                checkout_flag: checkoutBox === true ? 1 : 0,
                check_in: punchInTime,
                check_out: punchOutTime,
                shift_id: selectedShift,
                reason: reason,
                attendance_marking_month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                incharge_req_status: approveStatus.inc_apr,
                incharge_approval_status: approveStatus.inc_stat,
                incharge_approval_comment: approveStatus.inc_cmnt,
                incharge_approval_date: approveStatus.inc_apr_time,
                hod_req_status: approveStatus.hod_apr,
                hod_approval_status: approveStatus.hod_stat,
                hod_approval_comment: approveStatus.hod_cmnt,
                hod_approval_date: approveStatus.hod_apr_time,
                ceo_req_status: 0,
                hr_req_status: 1,
                incharge_empid: approveStatus.usCode_inch,
                hod_empid: approveStatus.usCode_hod,
            }
            const monthStartDate = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
            const dateCheck = {
                month: monthStartDate,
                section: em_dept_section
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", dateCheck);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')

                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                } else {
                    //check in time correct
                    if (checkinBox === true) {
                        const intime = format(addHours(new Date(punchInTime), 1), 'yyyy-MM-dd H:mm')
                        const relaxTime = format(addMinutes(new Date(intime), cmmn_grace_period), 'yyyy-MM-dd H:mm')
                        const result = punchData.find((val) => val)
                        const dd = isBefore(new Date(result.punch_time), new Date(relaxTime)) && isAfter(new Date(result.punch_time), new Date(punchInTime)) || isEqual(new Date(result.punch_time), new Date(punchInTime)) ? 1 : 0
                        if (dd === 0) {
                            warningNofity("Can't Apply For One Hour Request!!");
                            setSelectedShift(0)
                            setFromDate(new Date())
                            setReason('')
                            setPunchInTime(0)
                            setPunchOutTime(0)
                            setCheckInCheck(false)
                            setCheckOutCheck(false)
                        } else {
                            const result = await axioslogin.post('/CommonReqst', postData)
                            const { message, success } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setSelectedShift(0)
                                setFromDate(new Date())
                                setReason('')
                                setPunchInTime(0)
                                setPunchOutTime(0)
                                setCheckInCheck(false)
                                setCheckOutCheck(false)
                            } else {
                                warningNofity(message)
                                setSelectedShift(0)
                                setFromDate(new Date())
                                setReason('')
                                setPunchInTime(0)
                                setPunchOutTime(0)
                                setCheckInCheck(false)
                                setCheckOutCheck(false)
                            }
                        }
                    } else {
                        const outtime = format(subHours(new Date(punchOutTime), 1), 'yyyy-MM-dd H:mm')
                        const result = punchData.findLast((val) => val)
                        const dd = isBefore(new Date(result.punch_time), new Date(punchOutTime)) && isAfter(new Date(result.punch_time), new Date(outtime)) || isEqual(new Date(result.punch_time), new Date(outtime)) ? 1
                            : 0

                        if (dd === 0) {
                            warningNofity("Can't Apply For One Hour Request!!");
                            setSelectedShift(0)
                            setFromDate(new Date())
                            setReason('')
                            setPunchInTime(0)
                            setPunchOutTime(0)
                            setCheckInCheck(false)
                            setCheckOutCheck(false)
                        } else {

                            const result = await axioslogin.post('/CommonReqst', postData)
                            const { message, success } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setSelectedShift(0)
                                setFromDate(new Date())
                                setReason('')
                                setPunchInTime(0)
                                setPunchOutTime(0)
                                setCheckInCheck(false)
                                setCheckOutCheck(false)
                            } else {
                                warningNofity(message)
                                setSelectedShift(0)
                                setFromDate(new Date())
                                setReason('')
                                setPunchInTime(0)
                                setPunchOutTime(0)
                                setCheckInCheck(false)
                                setCheckOutCheck(false)
                            }

                        }
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [checkinBox, checkoutBox, cmmn_grace_period, em_dept_section, fromDate, deptApprovalLevel,
        punchData, punchInTime, punchOutTime, reason, em_department, em_id, em_no, loginEmid, loginHod,
        loginIncharge, masterGroupStatus, selectedShift])


    const [columndef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Emp Name', field: 'empname', minWidth: 200, filter: true },
        { headerName: 'Department Section ', field: 'sectname', minWidth: 250, filter: true },
        { headerName: 'Request Type ', field: 'type', minWidth: 200, filter: true },
        { headerName: 'Duty Date ', field: 'dutyDate', filter: true, minWidth: 200 },
        { headerName: 'Request Date', field: 'reqDate', filter: true, minWidth: 200 },
        { headerName: 'Reason ', field: 'reason', minWidth: 200 },
        { headerName: 'Status', field: 'status', filter: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params => {
                if (params.data.hrstatus === 1 || params.data.inchStatus === 1 || params.data.hodStatus === 1 || params.data.cancelStatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5 }} >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => deleteRequest(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                }
            }
        },
    ])

    const deleteRequest = useCallback(async (params) => {
        const data = params.data
        const { hrstatus } = data;
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        }
        else if (hrstatus === 2) {
            warningNofity("HR Rejected, You can't delete request")
        } else {
            setDeleteOpen(true)
            setEmpdata(data)
        }
    }, [])

    return (

        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
            <OneHour open={deleteOpen} setOpen={setDeleteOpen} empData={empdata} setCount={setCount} />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                <Box sx={{ alignItems: 'center', display: 'flex' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Duty Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={fromDate}
                            maxDate={subDays(new Date(), 1)}
                            size="small"
                            onChange={handleChangeDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Input
                        size="md"
                        fullWidth
                        variant="outlined"
                        value={shiftDesc}
                        disabled
                    />
                </Box>
                <Box sx={{ width: '60%', }}>
                    <Box sx={{ width: '100%', px: 0.5, alignItems: 'center', display: "flex", flexDirection: 'row', }} >
                        <Box sx={{ display: "flex", p: 0.5, flex: 1, alignItems: 'center' }} >
                            <Sheet variant="outlined" sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                flex: 1,
                                paddingX: 2,
                                paddingY: 1.15,
                                borderRadius: 5,
                                // height: 10,
                                '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                            }}>
                                <Checkbox
                                    overlay
                                    label={`After : ${checkIn}`}
                                    variant="outlined"
                                    size="sm"
                                    disabled={disbaleCheck}
                                    onChange={(e) => handleChangeCheckInCheck(e)}
                                    checked={checkinBox}
                                />
                            </Sheet>
                        </Box>
                        <Box sx={{ display: "flex", p: 0.5, flex: 1, alignItems: 'center' }} >
                            <Sheet variant="outlined" sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                flex: 1,
                                paddingX: 2,
                                paddingY: 1.15,
                                borderRadius: 5,
                                // height: 10,
                                '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                                // backgroundColor: 'green'
                            }}>
                                <Checkbox
                                    overlay
                                    label={`Before : ${checkOut}`}
                                    variant="outlined"
                                    size="sm"
                                    disabled={disbaleCheck}
                                    onChange={(e) => handleChangeCheckOutCheck(e)}
                                    checked={checkoutBox}
                                />
                            </Sheet>
                        </Box>
                    </Box >
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 0.5 }}>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.2 }}>
                    <Textarea
                        label="Outlined"
                        placeholder="Reason"
                        variant="outlined"
                        color="warning"
                        size="md"
                        minRows={1}
                        maxRows={2}
                        name='reason'
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Box sx={{ px: 0.5, mt: 0.2 }}>
                    <Tooltip title="Save Request" variant="outlined" placement="top">
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={submitRequest}
                        >
                            Save Request
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Paper square sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid
                    columnDefs={columndef}
                    tableData={tableData}
                    sx={{
                        height: 400,
                        width: "100%"
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Paper>
        </Paper>
    )
}

export default memo(OneHourRequest) 