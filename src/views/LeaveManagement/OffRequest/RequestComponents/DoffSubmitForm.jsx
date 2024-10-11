import { Box, Paper } from '@mui/material'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { Button, Checkbox, IconButton, Input, Option, Select, Textarea, Tooltip, Typography } from '@mui/joy';
import { addDays, addHours, format, isEqual, isValid, lastDayOfMonth, startOfMonth, subHours } from 'date-fns';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { getAttendanceCalculation, getLateInTimeIntervel } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';

const Doffcancel = lazy(() => import('./DoffCancelModal'))

const DoffSubmitForm = () => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [planSlno, setPlanSlno] = useState(0)
    const [requiredDate, setRequiredDate] = useState(moment(new Date()))

    const [reson, setReason] = useState('')
    const [shiftDesc, setShiftDesc] = useState('Data Not Found');

    const [tableData, setTableData] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [empdata, setEmpdata] = useState({})
    const [count, setCount] = useState(0)
    const [doffPlanSlno, setDoffPlanSlno] = useState(0)
    const [disableCheck, setDisableCheck] = useState(true)
    const [punchDetl, setPunchDetl] = useState([])

    const [checkinBox, setCheckIn] = useState(false)
    const [checkoutBox, setCheckOut] = useState(false)

    const [disableIn, setDisableIn] = useState(true)
    const [disableOut, setDisableOut] = useState(true)

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);

    const [shiftIn, setShiftIn] = useState('')
    const [shiftOut, setShiftOut] = useState('')

    const [shiftId, setShiftId] = useState(0)
    const [holiday_status, setHolidayStatus] = useState(0)

    const [disablesave, setDisableSave] = useState(true)

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_dept_section, gross_salary } = selectedEmpInform;

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { em_id: loginEmid } = empInformationFromRedux;

    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { doff, comp_hour_count,
        // cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff // night off SHIFT ID
    } = commonStates;

    //to show table data
    useEffect(() => {
        const getDoff = async () => {
            const getID = {
                em_id: em_id
            }
            const result = await axioslogin.post('/OffRequest/getDoff', getID)
            const { data, success } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    return {
                        ...val,
                        twentyDuty: format(new Date(val.duty_date), 'dd-MM-yyyy'),
                        doffdate: format(new Date(val.required_date), 'dd-MM-yyyy'),
                        deleteStatus: val.delete_status === 1 ? "Request Cancelled" : "NIL"
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        if (em_id !== 0) {
            getDoff(em_id)
        }
    }, [em_id, count])


    const handleChangeDate = useCallback(async (date) => {
        setFromDate(date)
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: em_id
        }
        //getting 24 hr shift details
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const { plan_slno, doff_updation_flag, shft_desc, twenty_four, shft_cross_day,
                shft_chkin_time, shft_chkout_time, shift_id, holiday } = data[0];
            if (doff_updation_flag === 1) {
                infoNofity("This Date Is Already Used For DOFF Request")
                setFromDate(moment(new Date()))
            } else if (twenty_four === 0) {
                infoNofity("This Shift Is Not Applicable For Doff Request!")
            } else {
                setShiftId(shift_id)
                setHolidayStatus(holiday)

                const inTime = format(new Date(shft_chkin_time), 'hh:mm');
                const chekIn = `${format(new Date(date), 'yyyy-MM-dd')} ${inTime}`;
                const chekOut = shft_cross_day === 0 ? `${format(new Date(date), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}` :
                    `${format(addDays(new Date(date), 1), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}`;

                setShiftIn(chekIn)
                setShiftOut(chekOut)

                const postDataForpunchMaster = {
                    date1: format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd HH:mm:ss'),
                    date2: format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd HH:mm:ss'),
                    em_no: em_no
                }
                const result = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster)
                const { success, data, message } = result.data;
                if (success === 1) {
                    setPunchDetl(data)
                    succesNofity('Done , Select The Punching Info')
                    setDisableCheck(false)
                    setShiftDesc(shft_desc)
                    setPlanSlno(plan_slno)
                } else if (success === 0) {
                    //no record
                    warningNofity('Punching Data Not Found')
                    setDisableCheck(true)
                } else {
                    // error
                    errorNofity(message)
                    setDisableCheck(true)
                }
            }
        } else {
            warningNofity("Duty Not Planned For the Selected Date")
            setPlanSlno(0)
            // setShiftId(0)
        }
    }, [em_id, comp_hour_count, em_no])

    useEffect(() => {
        //DOFF REQUIRED DATE SHIFT DETAILS FOR SUBMITTING
        const getOffShift = async () => {
            const postData = {
                startDate: format(new Date(requiredDate), 'yyyy-MM-dd'),
                em_id: em_id
            }
            const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { plan_slno, } = data[0];
                setDoffPlanSlno(plan_slno)
            } else {
                setDoffPlanSlno(0)
            }
        }
        getOffShift()
    }, [requiredDate, em_id])

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

    const processPunchData = useCallback(async () => {
        const punch_In = new Date(punchInTime);
        const punch_out = new Date(punchOutTime);
        const shift_In = new Date(shiftIn)
        const shift_out = new Date(shiftOut)
        const holidayStatus = holiday_status;

        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_In, punch_out, shift_out)
        if (isEqual(new Date(punch_In), new Date(punch_out))) {
            infoNofity("Both selected Punch Time Are Same!")
        }
        else if (isValid(punch_In) === true && isValid(punch_out) === true) {

            const salaryLimit = gross_salary > salary_above ? true : false;

            const getAttendance = await getAttendanceCalculation(
                punch_In, shift_In, punch_out, shift_out, cmmn_grace_period, getLateInTime, holidayStatus, shiftId, default_shift, notapplicable_shift, noff, week_off_day, salaryLimit, cmmn_late_in
            )
            if (getAttendance?.lvereq_desc === 'P' || getAttendance?.lvereq_desc === 'LC') {
                setDisableSave(false)
            } else {
                infoNofity("Can't Apply DOFF Request, Description Must be P or LC")
                setDisableSave(true)
            }
        } else {
            //one of the date or both dates are not a valid dates
            infoNofity("Both Dates are not Valid!")
        }

    }, [punchInTime, punchOutTime, shiftId, holiday_status, shiftIn, shiftOut, gross_salary, cmmn_grace_period,
        cmmn_late_in, default_shift, noff, notapplicable_shift, salary_above, week_off_day])

    const SubmitDoffRequest = useCallback(async () => {
        setOpenBkDrop(true)
        const savedata = {
            em_no: em_no,
            em_id: em_id,
            duty_date: format(new Date(fromDate), 'yyyy-MM-dd'),
            required_date: format(new Date(requiredDate), 'yyyy-MM-dd'),
            create_user: loginEmid,
            reason: reson,
            duty_day: format(new Date(requiredDate), 'yyyy-MM-dd'),
            emp_id: em_id,
            shift_id: doff,
            plan_slno: planSlno,
            doffPlanSlno: doffPlanSlno
        }

        if (reson === '') {
            setOpenBkDrop(false)
            warningNofity("Add Reason!")

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
                    warningNofity("Punch Marking Monthly Process Done !! Can't Apply DOFF Request!!  ")
                    setOpenBkDrop(false)
                } else {
                    const check = {
                        duty_day: format(new Date(requiredDate), 'yyyy-MM-dd'),
                        em_no: em_no,
                    }
                    const checkDutyPlan = await axioslogin.post('/plan/existornot', check);
                    const { success, } = checkDutyPlan.data;
                    if (success === 1) {
                        const result = await axioslogin.post('/OffRequest/create', savedata)
                        const { success, message } = result.data;
                        if (success === 1) {
                            succesNofity(message)
                            setCount(Math.random())
                            setOpenBkDrop(false)
                        } else {
                            warningNofity(message)
                            setOpenBkDrop(false)
                        }
                    } else {
                        setOpenBkDrop(false)
                        warningNofity("There is No DutyPlan For This Required date")
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
                setOpenBkDrop(false)
            }
        }

    }, [reson, em_id, fromDate, em_dept_section, em_no, loginEmid, requiredDate, planSlno, doff,
        doffPlanSlno])


    const [columndef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Emp Name', field: 'em_name', minWidth: 200, filter: true },
        { headerName: '24 Duty Date ', field: 'twentyDuty', filter: true, minWidth: 200 },
        { headerName: 'Off Date', field: 'doffdate', filter: true, minWidth: 200 },
        { headerName: 'Status', field: 'deleteStatus', filter: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params => {
                if (params.data.cancelStatus === 1) {
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
        setDeleteOpen(true)
        setEmpdata(data)
    }, [])

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
            <Doffcancel open={deleteOpen} setOpen={setDeleteOpen} empData={empdata} setCount={setCount} />
            <CustomBackDrop open={openBkDrop} text="Please wait !. Submitting DOFF Request" />
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >
                <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >24 Duty Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
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
                {/* <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Input
                        size="md"
                        fullWidth
                        placeholder='Duty OFF'
                        disabled
                    />
                </Box> */}
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Input
                        size="md"
                        fullWidth
                        variant="outlined"
                        value={shiftDesc}
                        disabled
                    />
                </Box>


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
                    <Select
                        value={punchInTime}
                        onChange={(event, newValue) => {
                            setPunchInTime(newValue);
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
                    <Select
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
                </Box>
                <Box sx={{ px: 0.5, mt: 0.5 }}>
                    <Tooltip title="Process" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="success"
                            onClick={processPunchData}
                            size='sm'
                            sx={{ width: '100%' }}
                            endDecorator={<Box>Process</Box>}
                        >
                            <ExitToAppOutlinedIcon fontSize='medium' />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center', }} >
                <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >OFF Required Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={requiredDate}
                            minDate={new Date(fromDate)}
                            maxDate={addDays(new Date(fromDate), 30)}
                            size="small"
                            disabled={disablesave}
                            onChange={(newValue) => {
                                setRequiredDate(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ px: 0.5, mt: 0.5, flex: 1 }}>
                    <Tooltip title="reason" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Box sx={{ p: 1 }} >
                            <Textarea
                                color="warning"
                                defaultValue=''
                                disabled={disablesave}
                                placeholder="DOFF Request Reason ..."
                                size="md"
                                variant="outlined"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', }} >
                    <Tooltip title="Save Compansatory Off Request" variant="outlined" color="success" placement="top" followCursor arrow>
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            fullWidth
                            color="primary"
                            disabled={disablesave}
                            onClick={SubmitDoffRequest}
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

export default memo(DoffSubmitForm) 