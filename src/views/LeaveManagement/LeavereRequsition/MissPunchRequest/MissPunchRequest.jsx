import { Box, Button, Checkbox, Grid, Input, Sheet, Textarea, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addHours, format, lastDayOfMonth, startOfMonth, subDays, subHours } from 'date-fns';
import moment from 'moment';
import React, { useCallback, memo, useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited, getInchargeHodAuthorization, getLeaveReqApprovalLevel, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { employeeIdNumber } from 'src/views/Constant/Constant';

const MissPunchRequest = ({ setRequestType, setCount }) => {

    const [fromDate, setFromDate] = useState(moment(new Date()))

    const [drop, setDropOpen] = useState(false)
    const [shiftData, setShiftData] = useState({})

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

    const [disableCheck, setDisableCheck] = useState(true)
    const [disableDate, setDisableDate] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

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

    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { holiday_leave_request, week_off_day } = commonStates;

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
            setShiftData(data[0])
            const { plan_slno, shift_id, shft_desc, shft_chkin_time, shft_chkout_time, holiday, } = data[0];
            if (holiday === 1 && holiday_leave_request === 1) {
                warningNofity("Cannot Apply for No punch request on Holiday")
            } else if (week_off_day === shift_id) {
                warningNofity("Cannot Apply Miss Punch Request on Week Off")
            } else {
                setDisableCheck(false)
                setDisableDate(true)
                setShiftDesc(shft_desc)
                setCheckin(format(new Date(shft_chkin_time), 'hh:mm'))
                setCheckOut(format(new Date(shft_chkout_time), 'hh:mm'))
                setPlanSlno(plan_slno)
                setShiftId(shift_id)
                setshft_chkin_time(shft_chkin_time)
                setshft_chkout_time(shft_chkout_time)
            }
        } else {
            warningNofity("Duty Not Planned For the Selected Date")
            setPlanSlno(0)
            setShiftId(0)
        }
    }, [em_id, holiday_leave_request, week_off_day])

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
            crted_user: employeeIdNumber(),
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

        const { first_half_in, first_half_out, second_half_in, second_half_out,
            shft_cross_day } = shiftData;

        if (checkInCheck === false && checkOutCheck === false) {
            warningNofity("Check In || Check Out Needs To Check")
        } else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        } else {
            //  setDropOpen(true)
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
                    warningNofity("Monthly Salary Process Done !! Can't Apply No punch Request!!  ")
                    setDropOpen(false)
                } else {
                    if (checkInCheck === true) {

                        const inTime = format(new Date(first_half_in), 'HH:mm');
                        const outTime = format(new Date(first_half_out), 'HH:mm');
                        const chekIn = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${inTime}`;
                        const chekOut = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${outTime}`;

                        //TO FETCH PUNCH DATA FROM TABLE
                        const postDataForpunchMaster = {
                            date1: format(new Date(chekOut), 'yyyy-MM-dd H:mm:ss'),
                            date2: format(subHours(new Date(chekIn), 2), 'yyyy-MM-dd H:mm:ss'),
                            em_no: em_no
                        }
                        //FETCH THE PUNCH TIME FROM PUNCH DATA
                        const result = await axioslogin.post('common/getShiftdata/', postDataForpunchMaster)
                        const { success, } = result.data;

                        if (success === 1) {
                            warningNofity("Cannot Apply No Punch Request, There Exist A Punch!")
                        } else {
                            const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', misspunchReqPostData)
                            const { success, message } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setDropOpen(false)
                                setRequestType(0)
                                setDisableButton(true)
                            } else if (success === 2) {
                                warningNofity(message)
                                setDropOpen(false)
                                setRequestType(0)
                            } else {
                                errorNofity(` Contact IT ${JSON.stringify(message)} `)
                                setDropOpen(false)
                                setRequestType(0)
                            }
                        }
                    } else {
                        const inTime = format(new Date(second_half_in), 'HH:mm');
                        const outTime = format(new Date(second_half_out), 'HH:mm');

                        const chekIn = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${inTime}`;
                        const chekOut = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${outTime}`;

                        //shft_cross_day
                        //TO FETCH PUNCH DATA FROM TABLE
                        const postDataForpunchMaster = {
                            date1: shft_cross_day === 0 ? format(addHours(new Date(chekOut), 2), 'yyyy-MM-dd H:mm:ss') : format(addHours(new Date(addDays(new Date(chekOut), 1)), 2), 'yyyy-MM-dd H:mm:ss'),
                            date2: shft_cross_day === 0 ? format(new Date(chekIn), 'yyyy-MM-dd H:mm:ss') : format(new Date(addDays(new Date(chekIn), 1)), 'yyyy-MM-dd H:mm:ss'),
                        }

                        //FETCH THE PUNCH TIME FROM PUNCH DATA
                        const result = await axioslogin.post('common/getShiftdata/', postDataForpunchMaster)
                        const { success } = result.data;
                        if (success === 1) {
                            warningNofity("Cannot Apply No Punch Request, There Exist A Punch!")
                        } else {
                            const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', misspunchReqPostData)
                            const { success, message } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setDropOpen(false)
                                setRequestType(0)
                                setDisableButton(true)
                            } else if (success === 2) {
                                warningNofity(message)
                                setDropOpen(false)
                                setRequestType(0)
                            } else {
                                errorNofity(` Contact IT ${JSON.stringify(message)} `)
                                setDropOpen(false)
                                setRequestType(0)
                            }
                        }
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [reason, checkInCheck, checkOutCheck, em_department, em_dept_section, em_id, em_no, fromDate,
        planSlno, shiftId, loginEmno, loginHod, loginIncharge, masterGroupStatus, setRequestType,
        shft_chkin_time, shft_chkout_time, setCount, deptApprovalLevel, shiftData
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
                            maxDate={subDays(new Date(), 1)}
                            value={fromDate}
                            disabled={disableDate}
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
                        '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                    }}>
                        <Checkbox
                            overlay
                            label={`Check In: ${checkIn} `}
                            variant="outlined"
                            size="sm"
                            disabled={disableCheck}
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
                        '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                    }}>
                        <Checkbox
                            overlay
                            label={`Check Out: ${checkOut} `}
                            variant="outlined"
                            size="sm"
                            disabled={disableCheck}
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
                                disabled={disableButton}
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