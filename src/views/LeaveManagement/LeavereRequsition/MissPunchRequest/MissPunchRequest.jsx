import { Box, Button, Checkbox, Grid, Input, Sheet, Textarea, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { useCallback, memo, useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited, getInchargeHodAuthorization, getLeaveReqApprovalLevel, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { employeeNumber } from 'src/views/Constant/Constant';

const MissPunchRequest = ({ setRequestType, setCount }) => {

    // const dispatch = useDispatch();
    // const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    // const changeForm = useCallback(() => {
    //     let requestType = { requestType: 0 };
    //     dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
    //     dispatch({ type: LEAVE_REQ_DEFAULT })
    //     setReason('')
    //     setFromDate(moment(new Date()))
    //     setShiftDesc('Data Not Found')
    //     setCheckInCheck(false)
    //     setCheckOutCheck(false)
    // }, [dispatch, FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT])

    const [fromDate, setFromDate] = useState(moment(new Date()))
    // const [shiftData, setShiftData] = useState({})

    const [drop, setDropOpen] = useState(false)

    const [shiftDesc, setShiftDesc] = useState('Data Not Found');
    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckOut] = useState('00:00');

    const [checkInCheck, setCheckInCheck] = useState(false);
    const [checkOutCheck, setCheckOutCheck] = useState(false);

    const [reason, setReason] = useState('')
    const [shiftId, setShiftId] = useState(0)
    const [planSlno, setPlanSlno] = useState(0)

    const [shft_chkin_time, setshft_chkin_time] = useState()
    const [shft_chkout_time, setshft_chkout_time] = useState()


    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_department, em_dept_section, } = selectedEmpInform;

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_no: loginEmno, groupmenu } = empInformationFromRedux;


    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    const apprLevel = useSelector((state) => getLeaveReqApprovalLevel(state))
    const deptApprovalLevel = useMemo(() => apprLevel, [apprLevel])

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    const handleChangeDate = useCallback(async (date) => {
        setFromDate(date)
        setCheckInCheck(false)
        setCheckOutCheck(false)
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: em_id
        }
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const { plan_slno, shift_id, shft_desc, shft_chkin_time, shft_chkout_time, } = data[0];
            setShiftDesc(shft_desc)
            setCheckin(format(new Date(shft_chkin_time), 'hh:mm'))
            setCheckOut(format(new Date(shft_chkout_time), 'hh:mm'))
            setPlanSlno(plan_slno)
            setShiftId(shift_id)
            setshft_chkin_time(shft_chkin_time)
            setshft_chkout_time(shft_chkout_time)
        } else {
            warningNofity("Duty Not Planned For the Selected Date")
            setPlanSlno(0)
            setShiftId(0)
        }
    }, [em_id])

    const handleChangeCheckInCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckInCheck(true)
            setCheckOutCheck(false)
        } else {
            setCheckOutCheck(true)
            setCheckInCheck(false)
        }
    }, [])

    const handleChangeCheckOutCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckOutCheck(true)
            setCheckInCheck(false)
        } else {
            setCheckInCheck(true)
            setCheckOutCheck(false)
        }
    }, [])

    const handleChangeMissPunchRequest = useCallback(async () => {
        if (planSlno === 0) {
            warningNofity("Duty Not Planned For the Selected Date")
        } else if (checkInCheck === false && checkOutCheck === false) {
            warningNofity("Check In || Check Out Needs To Check")
        } else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        } else if (shiftDesc === 'WOFF') {
            warningNofity("Cannot Apply Miss Punch Request on Week Off")
        }
        else {
            setDropOpen(true)

            const approveStatus = await getInchargeHodAuthorization(masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmno)

            const misspunchReqPostData = {
                checkinflag: checkInCheck === true ? 1 : 0,
                checkintime: `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(shft_chkin_time), 'HH:mm')}`,
                checkoutflag: checkOutCheck === true ? 1 : 0,
                checkouttime: `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}`,
                nopunchdate: format(new Date(fromDate), 'yyyy-MM-dd'),  // mispunch date
                attendance_marking_month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                plan_slno: planSlno,
                shift_id: shiftId,
                crted_user: employeeNumber(),
                em_id: em_id,
                em_no: em_no,
                em_department: em_department,
                em_dept_section: em_dept_section,
                inc_apprv_req: approveStatus.inc_apr,
                incapprv_status: approveStatus.inc_stat,
                inc_apprv_cmnt: approveStatus.inc_cmnt,
                inc_apprv_time: approveStatus.inc_apr_time,
                hod_apprv_req: approveStatus.hod_apr,
                hod_apprv_status: approveStatus.hod_stat,
                hod_apprv_cmnt: approveStatus.hod_cmnt,
                hod_apprv_time: approveStatus.hod_apr_time,
                hr_aprrv_requ: 1,
                ceo_req_status: 0,
                resonforleave: reason,
            }

            const holidayData = {
                em_id: em_id,
                date: format(new Date(fromDate), 'yyyy-MM-dd')
            }

            const result = await axioslogin.post('/LeaveRequest/getHoliday', holidayData)
            const { success, data } = result.data;
            if (success === 1) {
                const { holiday_status } = data[0]
                if (holiday_status === 1) {
                    warningNofity("Cannot Apply for No punch request on Holiday")
                    setDropOpen(false)
                } else {
                    const monthStartDate = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                    const postData = {
                        month: monthStartDate,
                        section: em_dept_section
                    }
                    const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
                    const { success, data } = checkPunchMarkingHr.data
                    if (success === 0 || success === 1) {
                        const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                        const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                        if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                            warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                            setDropOpen(false)
                        } else {
                            const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', misspunchReqPostData)
                            const { success, message } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                // changeForm()
                                setDropOpen(false)
                                setRequestType(0)
                            } else if (success === 2) {
                                warningNofity(message)
                                // changeForm()
                                setDropOpen(false)
                                setRequestType(0)
                            } else {
                                errorNofity(` Contact IT ${JSON.stringify(message)} `)
                                // changeForm()
                                setDropOpen(false)
                                setRequestType(0)
                            }
                        }
                    } else {
                        errorNofity("Error getting PunchMarkingHR ")
                    }
                }
            } else {
                warningNofity("Duty plan data not found, Contact HRD")
                setDropOpen(false)
            }
        }
    }, [reason, checkInCheck, checkOutCheck, em_department, em_dept_section, em_id, em_no, fromDate,
        planSlno, shiftId, loginEmno, loginHod, loginIncharge, masterGroupStatus, setRequestType,
        shft_chkin_time, shft_chkout_time, setCount, deptApprovalLevel, shiftDesc
    ])

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
            <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            value={fromDate}
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
                <Box sx={{ display: "flex", p: 0.2, flex: 1 }} >
                    <Input
                        size="md"
                        fullWidth
                        variant="outlined"
                        value={shiftDesc}
                        disabled
                    />
                </Box>
                <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
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
                            label={`Check In: ${checkIn} `}
                            variant="outlined"
                            size="sm"
                            onChange={(e) => handleChangeCheckInCheck(e)}
                            checked={checkInCheck}
                        />
                    </Sheet>
                </Box>
                <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
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
                            label={`Check Out: ${checkOut} `}
                            variant="outlined"
                            size="sm"
                            onChange={(e) => handleChangeCheckOutCheck(e)}
                            checked={checkOutCheck}
                        />
                    </Sheet>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, p: 0.3 }} component={Grid} >
                <Box sx={{ display: 'flex', flex: 3 }} >
                    <Textarea
                        label="Outlined"
                        placeholder="Reason For Miss Punch Request"
                        variant="outlined"
                        color="warning"
                        size="sm"
                        minRows={1}
                        maxRows={2}
                        onChange={(e) => setReason(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', px: 1, justifyContent: "space-evenly" }}>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Tooltip title="Save Compansatory Off Request" variant="outlined" color="success" placement="top" followCursor arrow>
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                fullWidth
                                color="primary"
                                onClick={handleChangeMissPunchRequest}
                            >
                                Save Request
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(MissPunchRequest)