import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Checkbox, CssVarsProvider, Grid, Input, Option, Select, Textarea, Tooltip } from '@mui/joy';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getDepartmentShiftDetails } from '../LeavereRequsition/Func/LeaveFunction';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, addHours, differenceInHours, format, subHours, isValid, isAfter, isEqual, differenceInMinutes, addMinutes, isBefore } from 'date-fns'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import RefreshIcon from '@mui/icons-material/Refresh';

const OffSubmitForm = ({ employeeData, setCount, setShowForm }) => {

    const empData = useMemo(() => employeeData, [employeeData])

    const [fromDate, setFromDate] = useState(moment(new Date()))
    //const [disShift, setDisShift] = useState(false)
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)
    const [punchSlno, setPunchSlno] = useState(0)

    const [shiftTiming, setShiftTiming] = useState([])
    const [punchDetl, setPunchDetl] = useState([])
    const [disableCheck, setDisableCheck] = useState(true)
    const [selectedShiftTiming, setselectedShiftTiming] = useState({})
    const [reason, setReason] = useState('')

    const [checkinBox, setCheckIn] = useState(false)
    const [checkoutBox, setCheckOut] = useState(false)

    const [disableIn, setDisableIn] = useState(true)
    const [disableOut, setDisableOut] = useState(true)

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [disableDate, setDisableDate] = useState(false)
    const [holiday_status, setHoliday] = useState(0)

    const [planSlno, setPlanSlno] = useState(0)
    const [inactiveShift, setInactiveShift] = useState(false)

    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { salary_above, week_off_day, comp_hour_count, coff_min_working_hour, holiday_min_working, cmmn_late_in } = commonStates;

    useEffect(() => {
        if (Object.keys(empData).length !== 0) {
            getDepartmentShiftDetails(empData).then((values) => {
                const { status, deptShift, shiftTime } = values;
                if (status === 1) {
                    setDeptShift(deptShift);
                    setShiftTiming(shiftTime)
                    // setDisShift(false)
                } else {
                    setDeptShift([]);
                    setShiftTiming([])
                }
            })
        }
    }, [empData])

    const handleChangeDate = useCallback(async (date) => {
        setOpenBkDrop(true)
        setFromDate(date)
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: empData?.emID
        }
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const { plan_slno, shift_id, holiday, gross_salary } = data[0]
            setHoliday(holiday)
            if (holiday !== 0 && gross_salary <= salary_above && shift_id !== week_off_day) {
                warningNofity('Cannot Apply for Compensatory Off, Salary must be greater than 25k!')
                setOpenBkDrop(false)
                setInactiveShift(true)
            } else if (shift_id !== week_off_day && holiday === 0) {
                warningNofity("Can't Apply for Compensatory Off, Shift Must be Week Off")
                setOpenBkDrop(false)
                setInactiveShift(true)
            } else if (holiday === 1) {
                setSelectedShift(shift_id)
                setPlanSlno(plan_slno)
                setOpenBkDrop(false)
                setInactiveShift(true)
            } else {
                setPlanSlno(plan_slno)
                setOpenBkDrop(false)
            }
        } else {
            setPlanSlno(0)
            setOpenBkDrop(false)
        }
    }, [empData, salary_above, week_off_day])



    const handleChangefetchShift = useCallback(async () => {
        setOpenBkDrop(true)
        setDisableDate(true)
        if (selectedShift !== 0 && isValid(new Date(fromDate)) && Object.keys(empData).length !== 0) {
            //GET SHIFT DATA 
            const postData = {
                emp_id: empData?.emID,
                duty_day: format(new Date(fromDate), 'yyyy-MM-dd')
            }
            const result = await axioslogin.post('common/getShiftdetails/', postData);
            const { success, data, message } = result.data;
            if (success === 1) {
                const { ot_request_flag, punch_slno, holiday_slno, punch_in, punch_out } = data[0];
                setPunchSlno(punch_slno)
                const selectedShiftTiming = shiftTiming?.filter(val => val?.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time, shft_cross_day } = selectedShiftTiming[0]

                const inTime = moment(shft_chkin_time).format('HH:mm:ss');
                const outTime = moment(shft_chkout_time).format('HH:mm:ss');

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                const chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;

                const selecteShiftData = {
                    inCheck: chekIn,
                    outCheck: chekOut
                }
                setselectedShiftTiming(selecteShiftData);


                if (ot_request_flag === 1) {
                    warningNofity('Selected Date Already Raised A COFF Request')
                    setDisableCheck(true)
                    setOpenBkDrop(false)
                }
                else {
                    //TO FETCH PUNCH DATA FROM TABLE
                    const postDataForpunchMaster = {
                        date1: shft_cross_day === 0 ? format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(addHours(new Date(addDays(new Date(fromDate), 1)), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                        date2: shft_cross_day === 0 ? format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(subHours(new Date(fromDate), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                        em_no: empData?.emNo
                    }

                    //FETCH THE PUNCH TIME FROM PUNCH DATA
                    const result = await axioslogin.post('common/getShiftdata/', postDataForpunchMaster)
                    const { success, data: punchmastdata } = result.data;

                    if (success === 1) {
                        if (holiday_slno !== 0) {
                            const formattedPunchIn = formatToMinute(punch_in);
                            const inpunch = punchmastdata?.find(val => formatToMinute(val.punch_time) === formattedPunchIn);
                            //const inpunch = punchmastdata?.find(val => isEqual(new Date(val?.punch_time), new Date(punch_in)));
                            setPunchInTime(inpunch?.punch_time)
                            const formattedPunchOut = formatToMinute(punch_out);
                            const outpunch = punchmastdata?.find(val => formatToMinute(val.punch_time) === formattedPunchOut);
                            // const outpunch = punchmastdata?.find(val => isEqual(new Date(val?.punch_time), new Date(punch_out)));
                            setPunchOutTime(outpunch?.punch_time)
                        } else {
                            setPunchDetl(punchmastdata)
                            succesNofity('Done , Select The Punching Info')
                            setDisableCheck(false)
                        }
                        setOpenBkDrop(false)
                    } else if (success === 0) {
                        //no record
                        warningNofity('Punching Data Not Found')
                        setDisableCheck(true)
                        setOpenBkDrop(false)
                    } else {
                        // error
                        errorNofity(message)
                        setDisableCheck(true)
                        setOpenBkDrop(false)
                    }
                }
            } else {
                warningNofity('Duty Plan Not Done')
                setOpenBkDrop(false)
                setDisableCheck(true)
            }
        } else {
            warningNofity('Select The Off Type and Shift Feild')
            setDisableCheck(true)
            setOpenBkDrop(false)
        }
    }, [fromDate, selectedShift, empData, shiftTiming, comp_hour_count])

    // Extract date parts for comparison
    const formatToMinute = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    };

    const handleChangeCheckInCheck = useCallback((e) => {
        const checkin = e.target.checked;
        setCheckIn(checkin)
        setDisableIn(!checkin)
    }, [])

    const handleChangeCheckOutCheck = useCallback((e) => {
        const checkout = e.target.checked;
        setCheckOut(checkout)
        setDisableOut(!checkout)
    }, [])

    //submit coff request 
    const handleChangeSubmitCoffRequest = useCallback(async () => {

        const { inCheck, outCheck } = selectedShiftTiming;
        const checkinlate = addMinutes(new Date(inCheck), cmmn_late_in)

        if (holiday_min_working === 1 && (differenceInHours(new Date(punchOutTime), new Date(punchInTime)) < coff_min_working_hour)) {
            warningNofity("Can't Apply for COFF request, minimum hours work needed")
        } else if (isBefore(new Date(punchInTime), new Date(checkinlate)) === false && isAfter(new Date(punchOutTime), new Date(outCheck)) === false && isEqual(new Date(punchOutTime), new Date(outCheck)) === false) {
            warningNofity("Can't Apply COFF on Holiday While Attendnace is HD")
            setDisableCheck(true)
            setOpenBkDrop(false)
        }
        else if (holiday_status === 0 && (punchInTime === 0 || punchOutTime === 0)) {
            warningNofity('Please Select In and Out Punch')
        } else if (reason === '') {
            warningNofity('Request Reason Is Mandatory')
        } else {
            setOpenBkDrop(true)
            const coffPostData = {
                startdate: format(new Date(fromDate), 'yyyy-MM-dd'),
                punchindata: punchInTime,
                punchoutdata: punchOutTime,
                req_type: 1,
                reqtype_name: "C Off",
                shiftduration: differenceInMinutes(new Date(outCheck), new Date(inCheck)),
                durationpunch: differenceInMinutes(new Date(punchOutTime), new Date(punchInTime)),
                extratime: differenceInMinutes(new Date(outCheck), new Date(inCheck)),
                em_id: empData?.emID,
                em_no: empData?.emNo,
                em_department: empData?.deptID,
                em_dept_section: empData?.sectionID,
                inc_apprv_req: 1,
                incapprv_status: 1,
                inc_apprv_cmnt: "DIRECT",
                inc_apprv_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                hod_apprv_req: 1,
                hod_apprv_status: 1,
                hod_apprv_cmnt: "DIRECT",
                hod_apprv_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                hr_aprrv_requ: 1,
                hr_apprv_status: 1,
                hr_apprv_cmnt: "DIRECT",
                hr_user: empData?.emNo,
                hr_apprv_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                ceo_req_status: 1,
                resonforleave: reason,
                shift_id: selectedShift,
                punchSlno: punchSlno,
                calculated_date: format(new Date(fromDate), 'yyyy-MM-dd'),
                credited_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                emp_id: empData?.emID,
                lvetype_slno: 11,
                plan_slno: planSlno
            }
            const result = await axioslogin.post('/LeaveRequest/creditCoff', coffPostData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity('C-OFF Credited SuccessFully')
                setCount(Math.random())
                setOpenBkDrop(false)
                setShowForm(0)
                setInactiveShift(false)
            } else {
                errorNofity(`Contact EDP , ${JSON.stringify(message)}`)
                setOpenBkDrop(false)
                setShowForm(0)
                setInactiveShift(false)
            }
        }
    }, [reason, punchSlno, fromDate, punchInTime, punchOutTime, selectedShift, selectedShiftTiming,
        setCount, empData, coff_min_working_hour, setShowForm, planSlno, holiday_status, cmmn_late_in,
        holiday_min_working])

    const refresh = useCallback(() => {
        setDisableDate(false)
        setInactiveShift(false)
    }, [])

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5, py: 0.5 }}>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Submitting COFF Request" />
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={fromDate}
                            size="small"
                            disabled={disableDate}
                            onChange={handleChangeDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <CssVarsProvider>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    </CssVarsProvider>
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
                        placeholder='Compensatory OFF'
                        disabled
                    />
                </Box>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Select
                        value={selectedShift}
                        onChange={(event, newValue) => {
                            setSelectedShift(newValue);
                        }}
                        size='md'
                        variant='outlined'
                        disabled={inactiveShift}
                    >
                        <Option disabled value={0}>Select Shift</Option>
                        {
                            deptShift?.map((val) => {
                                return <Option key={val.shiftcode} value={val.shiftcode}>{val.shiftDescription}</Option>
                            })
                        }
                    </Select>
                </Box>
                <Box sx={{ px: 0.5, mt: 0.5 }}>
                    <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="success"
                            onClick={handleChangefetchShift}
                            size='sm'
                            sx={{ width: '100%' }}
                            endDecorator={<Box>Show Punch Data</Box>}
                        >
                            <ExitToAppOutlinedIcon fontSize='medium' />
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ px: 0.5, mt: 0.5 }}>
                    <Tooltip title="Refresh" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={refresh}
                            size='sm'
                            sx={{ width: '100%' }}
                        >
                            <RefreshIcon fontSize='medium' />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: 1, px: 1, mt: 0.3, alignItems: 'center', justifyContent: 'space-evenly' }} >
                <Box sx={{ display: "flex", mx: 2, alignItems: 'center', }} >
                    <Checkbox
                        label={`Check In`}
                        variant="outlined"
                        color='danger'
                        size="lg"
                        disabled={disableCheck}
                        onChange={(e) => handleChangeCheckInCheck(e)}
                        checked={checkinBox}
                    />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, p: 0.2, }} >
                    {
                        holiday_status === 1 ? <Input
                            size="md"
                            fullWidth
                            placeholder='In punch'
                            value={punchInTime}
                            disabled
                        /> : <Select
                            value={punchInTime}
                            onChange={(event, newValue) => {
                                setPunchInTime(newValue)
                            }}
                            sx={{ width: '100%' }}
                            size='md'
                            variant='outlined'
                            disabled={disableIn}
                        >
                            <Option disabled value={0}>Select Check In Time</Option>
                            {
                                punchDetl?.map((val, index) => {
                                    return <Option key={index} value={val.punch_time}>{val.punch_time}</Option>
                                })
                            }
                        </Select>
                    }

                </Box>
                <Box sx={{ display: "flex", mx: 2, alignItems: 'center', }} >
                    <Checkbox
                        label={`Check Out`}
                        variant="outlined"
                        color='danger'
                        size="lg"
                        disabled={disableCheck}
                        onChange={(e) => handleChangeCheckOutCheck(e)}
                        checked={checkoutBox}
                    />

                </Box>
                <Box sx={{ display: 'flex', flex: 1, p: 0.2, }} >
                    {
                        holiday_status === 1 ? <Input
                            size="md"
                            fullWidth
                            placeholder='Out punch'
                            value={punchOutTime}
                            disabled
                        /> : <Select
                            value={punchOutTime}
                            onChange={(event, newValue) => {
                                setPunchOutTime(newValue);
                            }}
                            sx={{ width: '100%' }}
                            size='md'
                            variant='outlined'
                            disabled={disableOut}
                        >
                            <Option disabled value={0}>Select Check Out Time</Option>
                            {
                                punchDetl?.map((val, index) => {
                                    return <Option key={index} value={val.punch_time}>{val.punch_time}</Option>
                                })
                            }
                        </Select>
                    }
                </Box>
            </Box>
            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, px: 1 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 3 }} >
                    <Textarea
                        label="Outlined"
                        placeholder="Reason For Compansatory OFF Request"
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
                                onClick={handleChangeSubmitCoffRequest}
                            >
                                Save Request
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Paper >
    )
}

export default memo(OffSubmitForm) 