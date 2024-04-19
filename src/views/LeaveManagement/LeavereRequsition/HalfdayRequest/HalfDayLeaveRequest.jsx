import React, { memo, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, CssVarsProvider, Input, Radio, Table, Tooltip, Typography } from '@mui/joy'
import { Paper, TextField } from '@mui/material'
import { useState } from 'react';
import { addDays, differenceInCalendarDays, differenceInDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useSelector } from 'react-redux';
import { allLeavesConvertAnArray, findBalanceCommonLeveCount, getCaualLeaveDetl, getCommonSettings, getEmployeeInformationLimited, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { useMemo } from 'react';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import LeaveRequestTable from './Func/LeaveRequestTable';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CachedIcon from '@mui/icons-material/Cached';
import Textarea from '@mui/joy/Textarea';
import { useEffect } from 'react';

const HalfDayLeaveRequest = ({ setRequestType }) => {
    const [fromDate, setFromDate] = useState(new Date())
    const [casualLve, setCasualLve] = useState([])
    const [halfDayStat, setHalfDayStat] = useState(0)
    const [creditedLve, setCreditedLve] = useState(0)

    const [selectedCL, setSelectedCL] = useState(0)
    const [selectedClName, setselectedClName] = useState('')
    const [reson, setReason] = useState('')
    const [empShiftInform, setempShiftInform] = useState({})
    const [disabled, setdisabled] = useState(true)


    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_department, em_dept_section, hod, incharge } = selectedEmpInform;

    const getCasualLeaves = useSelector((state) => getCaualLeaveDetl(state));
    const casualLeave = useMemo(() => getCasualLeaves, [getCasualLeaves]);


    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_no: loginEmno, em_id: loginEmid, em_department: loginDept, em_dept_section: loginSection, groupmenu } = empInformationFromRedux;


    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    // console.log(halfDayStat, creditedLve)

    const handleGetCreditedLeaves = useCallback(async () => {
        if (halfDayStat === null || creditedLve === null) {
            warningNofity("Select all the required fields for the request.")
        } else {
            if (casualLeave?.length > 0) {
                setCasualLve(casualLeave)
            } else {
                warningNofity("You have no leaves available for a half-day request.")
            }
        }

        //GET  SHIFT INFOMATION
        const postData = {
            startDate: format(new Date(fromDate), 'yyyy-MM-dd'),
            em_id: em_id
        }
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const shiftData = data[0]
            setempShiftInform(shiftData)
        }
        setdisabled(false)
    }, [casualLeave, halfDayStat, creditedLve, em_department, em_dept_section, em_id, fromDate])

    //GET CASUAL LEAVES FUN
    const getCasualeaves = useCallback((e, val) => {
        const selectedLeaveName = e?.nativeEvent?.target?.innerText;
        setselectedClName(selectedLeaveName)
        setSelectedCL(val)
    }, [])


    //SUBMIT HALF DAY LEAVE REQUEST
    const handleSubmitHalfDayRequest = useCallback(async () => {
        //CHECK FOR ATTENDNCE MARKED OR NOT
        /** PUNCH MARKING HR START **/

        const postDataForAttendaceMark = {
            month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
            section: em_dept_section
        }

        const checkAttendanceMarking = await axioslogin.post('/attendCal/checkPunchMarkingHR', postDataForAttendaceMark);
        const { data: attMarkCheckData, success: attMarkCheckSuccess } = checkAttendanceMarking.data;
        const lastUpdateDate = attMarkCheckData[0]?.last_update_date;

        if (attMarkCheckSuccess === 2) {
            errorNofity("Error Checking Attendance Already Marked or Not ,Try Again !!")
        } else if ((attMarkCheckSuccess === 0 || attMarkCheckSuccess === 1) && (attMarkCheckSuccess === 1 && isValid(new Date(lastUpdateDate)) && new Date(lastUpdateDate) < new Date(fromDate))) {

            // [1,2]
            if (Object.keys(empShiftInform).length === 0) {
                warningNofity("Duty Plan Not Planned")
            } else {

                if (selectedCL === 0 || reson === '') {
                    warningNofity("Select the leave name and reason.")
                } else {
                    const { plan_slno, shift_id, shft_desc, first_half_in, first_half_out, second_half_in, second_half_out } = empShiftInform

                    const first_half_inTime = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(first_half_in), 'HH:mm')}`;
                    const first_half_outTime = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(first_half_out), 'HH:mm')}`;
                    const second_half_inTime = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(second_half_in), 'HH:mm')}`;
                    const second_half_outTime = `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(second_half_out), 'HH:mm')}`;


                    const approveStatus = (masterGroupStatus === true) ?
                        {
                            inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                            usCode_inch: loginEmno, usCode_hod: loginEmno
                        } :
                        (loginHod === 1 && loginIncharge === 1) ?
                            {
                                inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                                usCode_inch: loginEmno, usCode_hod: loginEmno
                            }
                            :
                            (loginHod === 1 && loginIncharge === 0) ?
                                {
                                    inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                                    usCode_inch: null, usCode_hod: loginEmno
                                }
                                :
                                (loginHod === 0 && loginIncharge === 1) ?
                                    {
                                        inc_apr: 0, hod_apr: 1, inc_stat: 1, hod_stat: 0, inc_cmnt: 'DIRECT', hod_cmnt: '', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: null,
                                        usCode_inch: loginEmno, usCode_hod: null
                                    }
                                    :
                                    {
                                        inc_apr: 0, hod_apr: 0, inc_stat: 0, hod_stat: 0, inc_cmnt: 'DIRECT', hod_cmnt: '', inc_apr_time: null, hod_apr_time: null,
                                        usCode_inch: null, usCode_hod: null
                                    }

                    const halfdaysavedata = {
                        checkIn: halfDayStat === 1 ? first_half_inTime : second_half_inTime,
                        checkOut: halfDayStat === 1 ? first_half_outTime : second_half_outTime,
                        leavedate: format(new Date(fromDate), 'yyyy-MM-dd H:m:s'),
                        planslno: selectedCL, // selected leave name slno 
                        shiftid: shift_id,
                        month: selectedClName, // Selected leave Name
                        em_id: em_id,
                        em_no: em_no,
                        em_department: em_department,
                        em_dept_section: em_dept_section,
                        attendance_marking_month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                        inc_apprv_req: approveStatus.inc_apr,
                        incapprv_status: approveStatus.inc_stat,
                        inc_apprv_cmnt: approveStatus.inc_cmnt,
                        inc_apprv_time: approveStatus.inc_apr_time,
                        inc_usCode: approveStatus.usCode_inch,
                        hod_apprv_req: approveStatus.hod_apr,
                        hod_apprv_status: approveStatus.hod_stat,
                        hod_apprv_cmnt: approveStatus.hod_cmnt,
                        hod_apprv_time: approveStatus.hod_apr_time,
                        hod_usCOde: approveStatus.usCode_hod,
                        hr_aprrv_requ: 1,
                        ceo_req_status: 0,
                        resonforleave: reson,
                        dutyPlanSlno: plan_slno // duty plan table slno 
                    }

                    const result = await axioslogin.post('/LeaveRequest/inserthalfdayreque', halfdaysavedata)
                    const { success, message } = result.data;
                    if (success === 1) {
                        // console.log(success, message)
                        succesNofity(message)
                        setRequestType(0)

                    } else {
                        errorNofity(message)
                        setRequestType(0)
                    }
                }
            }
        }

    }, [selectedCL, reson, fromDate, em_dept_section, em_department, empShiftInform, loginHod, loginIncharge, loginEmno, masterGroupStatus, halfDayStat, selectedClName])

    return (
        <Box sx={{ mb: 0.5 }}>
            <Paper variant="outlined" sx={{ mt: 0.5 }} >
                <Box sx={{ display: 'flex', flexDirection: { xl: 'row', lg: 'column', md: 'column', sm: 'column', xs: 'column' }, p: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, mb: { xl: 0, lg: 1 } }}>
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    minDate={startOfMonth(new Date())}
                                    value={fromDate}
                                    size="small"
                                    onChange={(newValue) => setFromDate(newValue)}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' variant='outlined' />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={(e, val) => setHalfDayStat(val)}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Select Half Day Section"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={1}>Shift First Half</Option>
                                <Option value={2}>Shift Second Half</Option>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={(e, val) => setCreditedLve(val)}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Allowed Leave Types"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={1}>Casual Leave</Option>
                            </Select>
                        </Box>
                        <Box sx={{ px: 0.3 }} >
                            <CssVarsProvider>
                                <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="success"
                                        onClick={handleGetCreditedLeaves}
                                        size='sm'
                                        sx={{ width: '100%' }}
                                        endDecorator={<Box>Get Credited Leaves</Box>}
                                    // disabled={addDateDisable}
                                    >
                                        <ExitToAppOutlinedIcon fontSize='large' />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', px: { xl: 0, lg: 20 } }} >
                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={getCasualeaves}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Casual Leaves"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={0}>Casual Leave</Option>
                                {
                                    casualLve?.map((e) => <Option key={e.slno} value={e.slno}>{e.month}</Option>)
                                }
                            </Select>
                        </Box>

                        <Box sx={{ flex: 1, px: 0.3 }}  >
                            <CssVarsProvider>
                                <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color='danger'
                                        onClick={handleSubmitHalfDayRequest}
                                        size='sm'
                                        sx={{ width: '100%' }}
                                        endDecorator={<Box>Save</Box>}
                                        disabled={disabled}
                                    >
                                        <ExitToAppOutlinedIcon fontSize='large' />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Paper variant="outlined" sx={{ display: 'none' }} >

                </Paper>
                <Box sx={{ p: 1 }} >
                    <Textarea
                        color="primary"
                        minRows={2}
                        defaultValue=''
                        placeholder="Leave Request Reason ..."
                        size="sm"
                        variant="outlined"
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(HalfDayLeaveRequest) 