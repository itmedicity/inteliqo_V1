import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Checkbox, CssVarsProvider, Grid, Input, Option, Select, Textarea, Tooltip, Typography, Chip, IconButton } from '@mui/joy';
import { Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentShiftDetails } from 'src/views/LeaveManagement/LeavereRequsition/Func/LeaveFunction';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, getTotalShiftHours, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addHours, format, subHours, isValid } from 'date-fns';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { getEmployeeApprovalLevel } from 'src/redux/actions/LeaveReqst.action';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import _ from 'underscore';

// Extract date parts for comparison
const formatToMinute = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const OtSubmitForm = ({ employeeData, setCount, setShowForm }) => {

    const dispatch = useDispatch();
    const empData = useMemo(() => employeeData, [employeeData]);

    console.log(empData)

    const [fromDate, setFromDate] = useState(moment(new Date()));
    const [deptShift, setDeptShift] = useState([]);
    const [selectedShift, setSelectedShift] = useState(0);
    const [shiftTiming, setShiftTiming] = useState([]);
    const [selectedShiftTiming, setSelectedShiftTiming] = useState({});

    const [punchDetl, setPunchDetl] = useState([]);
    const [disableCheck, setDisableCheck] = useState(true);

    const [openBkDrop, setOpenBkDrop] = useState(false);
    const [disableDate, setDisableDate] = useState(false);
    const [holiday_status, setHoliday] = useState(0);
    const [planSlno, setPlanSlno] = useState(0);
    const [planShift, setPlanShift] = useState(0);
    const [inactiveShift, setInactiveShift] = useState(true);
    const [additionalDuty, setAdditionalDuty] = useState(false);

    const state = useSelector((state) => state?.getCommonSettings);
    const commonStates = useMemo(() => state, [state]);
    const { comp_hour_count } = commonStates || {};

    const [checkinBox, setCheckIn] = useState(false);
    const [checkoutBox, setCheckOut] = useState(false);
    const [disableIn, setDisableIn] = useState(true);
    const [disableOut, setDisableOut] = useState(true);

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);
    const [dutyday, setDutyday] = useState(new Date());

    const [ot_reason, setOt_reason] = useState('');
    const [ot_remark, setOt_remark] = useState('');
    const [ot_amount, setOt_amount] = useState(0);

    const [empDetails, setEmpDetails] = useState({
        em_name: '',
        sect_name: '',
        desg_name: '',
        ot_amount: 0
    });

    // Approval levels and Logged in user info
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels]);

    const empInform = useSelector((state) => getEmployeeInformationLimited(state));
    console.log(empInform)
    const { hod, incharge, em_name, sect_name } = useMemo(() => empInform, [empInform]);

    // Fetch department shift list
    useEffect(() => {
        if (empData && Object.keys(empData).length !== 0) {
            getDepartmentShiftDetails(empData).then((values) => {
                const { status, deptShift: shifts, shiftTime } = values;
                if (status === 1) {
                    setDeptShift(shifts);
                    setShiftTiming(shiftTime);
                } else {
                    setDeptShift([]);
                    setShiftTiming([]);
                }
            });
        }
    }, [empData]);

    // Refresh state
    const refresh = useCallback(() => {
        setDisableDate(false);
        setInactiveShift(true);
        setAdditionalDuty(false);
        setPlanShift(0);
        setHoliday(0);
        setPlanSlno(0);
        setFromDate(moment(new Date()));
        setSelectedShift(0);
        setSelectedShiftTiming({});
        setPunchDetl([]);
        setDisableCheck(true);
        setCheckIn(false);
        setCheckOut(false);
        setDisableIn(true);
        setDisableOut(true);
        setPunchInTime(0);
        setPunchOutTime(0);
        setDutyday(new Date());
        setOt_reason('');
        setOt_remark('');
    }, []);

    const handleChangeDate = useCallback(async (date) => {
        setOpenBkDrop(true);
        setInactiveShift(true);
        setFromDate(date);
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: empData?.emID
        };
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const { plan_slno, shift_id, holiday } = data[0];
            setHoliday(holiday);
            setSelectedShift(shift_id);
            setPlanShift(shift_id);
            setPlanSlno(plan_slno);
            setAdditionalDuty(false);
            setInactiveShift(true);
            setOpenBkDrop(false);
        } else {
            setPlanSlno(0);
            setSelectedShift(0);
            setPlanShift(0);
            setAdditionalDuty(false);
            setInactiveShift(true);
            setOpenBkDrop(false);
            warningNofity("Duty Not Planned For the Selected Date");
        }
    }, [empData]);

    // Check-in and Check-out checkboxes
    const handleChangeCheckInCheck = useCallback((e) => {
        const checkin = e.target.checked;
        setCheckIn(checkin);
        setDisableIn(!checkin);
        if (!checkin) setPunchInTime(0);
    }, []);

    const handleChangeCheckOutCheck = useCallback((e) => {
        const checkout = e.target.checked;
        setCheckOut(checkout);
        setDisableOut(!checkout);
        if (!checkout) setPunchOutTime(0);
    }, []);

    // Additional duty checkbox handler
    const handleAdditionalDutyChange = useCallback((e) => {
        const isChecked = e.target.checked;
        setAdditionalDuty(isChecked);
        setInactiveShift(!isChecked);
        if (!isChecked && planShift !== 0) {
            setSelectedShift(planShift);
        }
    }, [planShift]);

    // Fetch Shift Details & Punch Data for the Selected Date and Shift
    const handleChangeFetchShift = useCallback(async () => {
        if (selectedShift === 0) {
            warningNofity("Please Select Any Shift!!");
            return;
        }

        if (!additionalDuty && planSlno === 0) {
            warningNofity("Duty Not Planned For the Selected Date");
            return;
        }

        if (!isValid(new Date(fromDate))) {
            warningNofity("Please Select a Valid Date");
            return;
        }

        setOpenBkDrop(true);
        setDisableDate(true);

        try {
            const postData = {
                emp_id: empData?.emID,
                duty_day: moment(fromDate).format('YYYY-MM-DD')
            };

            const result = await axioslogin.post('/overtimerequest/shiftdata/', postData);
            const { success, data } = result.data;

            if (success === 1 && data?.length > 0) {
                const { punch_slno, punch_in, punch_out } = data[0];
                const selectedTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift);

                if (!selectedTiming || selectedTiming.length === 0) {
                    warningNofity("Selected Shift timing not found in schedule");
                    setOpenBkDrop(false);
                    return;
                }

                const { shft_chkin_time, shft_chkout_time, shft_cross_day } = selectedTiming[0];

                const inTime = moment(shft_chkin_time).format('HH:mm:ss');
                const outTime = moment(shft_chkout_time).format('HH:mm:ss');

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                let chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;
                if (shft_cross_day === 1 || moment(chekOut).isBefore(moment(chekIn))) {
                    chekOut = `${moment(fromDate).add(1, 'days').format('YYYY-MM-DD')} ${outTime}`;
                }

                setSelectedShiftTiming({
                    inCheck: chekIn,
                    outCheck: chekOut
                });

                if (punch_slno === 0) {
                    warningNofity('No Punch Details found for this date');
                    setDisableCheck(true);
                    setOpenBkDrop(false);
                } else {
                    const postDataForpunchMaster = {
                        date1: format(subHours(new Date(chekIn), comp_hour_count || 6), 'yyyy-MM-dd HH:mm:ss'),
                        date2: format(addHours(new Date(chekOut), comp_hour_count || 6), 'yyyy-MM-dd HH:mm:ss'),
                        em_no: String(empData?.emNo)
                    };

                    const punchResult = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster);
                    const { success: pSuccess, data: pData, message: pMsg } = punchResult.data;

                    if (pSuccess === 1 && pData?.length > 0) {
                        const formattedPunchIn = punch_in ? formatToMinute(punch_in) : null;
                        const inpunch = formattedPunchIn ? pData.find(val => formatToMinute(val.punch_time) === formattedPunchIn) : null;
                        const selectedIn = inpunch ? inpunch.punch_time : (punch_in || pData[0].punch_time);

                        const formattedPunchOut = punch_out ? formatToMinute(punch_out) : null;
                        const outpunch = formattedPunchOut ? pData.find(val => formatToMinute(val.punch_time) === formattedPunchOut) : null;
                        const selectedOut = outpunch ? outpunch.punch_time : (punch_out || (pData.length > 1 ? pData[pData.length - 1].punch_time : pData[0].punch_time));

                        let updatedPData = [...pData];
                        if (selectedIn && !updatedPData.some(v => v.punch_time === selectedIn)) {
                            updatedPData = [{ punch_time: selectedIn }, ...updatedPData];
                        }
                        if (selectedOut && !updatedPData.some(v => v.punch_time === selectedOut)) {
                            updatedPData = [...updatedPData, { punch_time: selectedOut }];
                        }

                        console.log(selectedOut)
                        setPunchDetl(updatedPData);
                        setDisableCheck(false);

                        if (selectedIn) {
                            setCheckIn(true);
                            setDisableIn(false);
                            setPunchInTime(selectedIn);
                        }

                        if (selectedOut) {
                            setCheckOut(true);
                            setDisableOut(false);
                            setPunchOutTime(selectedOut);
                        }

                        succesNofity('Punching Data Loaded and Selected');
                    } else if (pSuccess === 0) {
                        warningNofity('Punching Data Not Found');
                        setDisableCheck(true);
                        setPunchDetl([]);
                    } else {
                        errorNofity(pMsg || 'Error fetching punch data');
                        setDisableCheck(true);
                        setPunchDetl([]);
                    }
                    setOpenBkDrop(false);
                }
            } else {
                warningNofity('Duty Plan Not Done for the Selected Date');
                setDisableCheck(true);
                setOpenBkDrop(false);
            }
        } catch (err) {
            errorNofity(err?.message || 'Error communicating with server');
            setOpenBkDrop(false);
            setDisableCheck(true);
        }
    }, [selectedShift, planSlno, additionalDuty, fromDate, empData, shiftTiming, comp_hour_count]);


    // Overtime Calculations
    const inTimeValue = moment(selectedShiftTiming?.inCheck);
    const outTimeValue = moment(selectedShiftTiming?.outCheck);
    const exactWork = (selectedShiftTiming?.inCheck && selectedShiftTiming?.outCheck)
        ? getTotalShiftHours(inTimeValue, outTimeValue)
        : 0;

    const punchInValue = moment(punchInTime);
    const punchOutValue = moment(punchOutTime);
    const working = (punchInTime !== 0 && punchOutTime !== 0)
        ? getTotalShiftHours(punchInValue, punchOutValue)
        : 0;

    const overTime = working > exactWork ? (working - exactWork) : 0;
    const othour = Math.floor(overTime / 60);
    const otminute = overTime % 60;
    const finaltime = `${othour}h ${otminute}m`;

    let minRate = 0;
    let hrRate = othour * (ot_amount || 0);
    if (otminute >= 30) {
        minRate = (ot_amount || 0) / 2;
    }
    const amount = hrRate + minRate;

    // Submit Request
    const handleSubmitOtRequest = async () => {
        if (punchInTime === 0 || punchOutTime === 0) {
            warningNofity("Please select both Check-In and Check-Out times");
            return;
        }

        if (overTime < 60) {
            warningNofity("Over Time Less Than 1 Hour, cannot apply for OT");
            return;
        }

        if (!ot_reason || ot_reason.trim() === '') {
            warningNofity("Please enter OT Reason");
            return;
        }

        setOpenBkDrop(true);

        const { authorization_incharge, authorization_hod, co_assign } = empApprovalLevel || {};
        const isHodOrIncharge = (incharge === 1 || hod === 1);
        const isHod = (hod === 1);

        const postData = {
            emp_id: empData?.emID,
            em_no: empData?.emNo,
            ot_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            ot_days: moment(fromDate).format('YYYY-MM-DD'),
            ot_shift_id: selectedShift,
            check_in: punchInTime,
            check_out: punchOutTime,
            over_time: overTime,
            ot_reson: ot_reason.trim(),
            ot_remarks: (ot_remark && ot_remark.trim()) ? ot_remark.trim() : 'NIL',
            ot_convert: 0,
            ot_amount: amount,
            ot_inch_require: isHodOrIncharge ? 1 : (authorization_incharge === 1 ? 1 : 0),
            ot_inch_status: isHodOrIncharge ? 1 : 0,
            ot_inch_remark: isHodOrIncharge ? "DIRECT" : "NIL",
            ot_hod_require: isHod ? 1 : (authorization_hod === 1 ? 1 : 0),
            ot_hod_status: isHod ? 1 : 0,
            ot_hod_remark: isHod ? "DIRECT" : "NIL",
            ot_hr_require: 1,
            ot_ceo_require: co_assign === undefined ? 0 : co_assign,
            ot_deptsec_id: empData?.sectionID,
            duty_day: moment(dutyday).format("YYYY-MM-DD")
        };

        const editdata = punchDetl.filter((val) => val.punch_time === punchInTime || val.punch_time === punchOutTime);
        const obj = { punch_taken: 2 };
        const array = editdata.map((item) => item.punch_taken === 0 ? { ...item, ...obj } : item);

        try {
            const result = await axioslogin.post('/overtimerequest', postData);
            const { message, success } = result.data;

            if (success === 1) {
                if (array.length > 0) {
                    await axioslogin.patch('/overtimerequest/update/punch', array);
                }
                succesNofity("Over Time Requested Successfully");
                setCount(prev => prev + 1);
                setShowForm(0);
            } else if (success === 7) {
                warningNofity("Already requested for OT for this day");
            } else if (success === 0) {
                infoNofity(message?.sqlMessage || message || "Error requesting OT");
            } else {
                infoNofity(message || "Error requesting OT");
            }
        } catch (err) {
            errorNofity(err?.message || "Error submitting OT request");
        } finally {
            setOpenBkDrop(false);
            setDisableDate(false);
            setInactiveShift(true);
            setAdditionalDuty(false);
            setPlanShift(0);
        }
    };

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5, p: 1, borderRadius: 'md', bgcolor: '#fafafa' }}>
            <CustomBackDrop open={openBkDrop} text="Please wait... Processing Overtime Request" />

            {/* TOP BAR: SELECTED EMPLOYEE SUMMARY & CLOSE */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1, mb: 1, borderBottom: '1px solid #e0e0e0', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    {/* <Typography level="title-sm" color="primary">Employee:</Typography>
                    <Chip size="sm" variant="soft" color="primary">ID: {empData?.emNo}</Chip>
                    <Chip size="sm" variant="soft" color="neutral">{em_name || 'Selected Employee'}</Chip>
                    <Chip size="sm" variant="soft" color="neutral">{sect_name || 'Section'}</Chip>
                    <Chip size="sm" variant="soft" color="neutral">{empDetails.desg_name || 'Designation'}</Chip>
                    {holiday_status === 1 && (
                        <Chip size="sm" variant="solid" color="danger">Holiday</Chip>
                    )} */}
                    {/* <Chip size="sm" variant="soft" color="warning" startDecorator={<CurrencyRupeeIcon sx={{ fontSize: 14 }} />}>
                        Rate: ₹{ot_amount}/hr
                    </Chip> */}
                </Box>
                <Tooltip title="Close Form" placement="top" arrow>
                    <IconButton size="sm" variant="plain" color="neutral" onClick={() => setShowForm(0)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* ROW 1: DATE, SHIFT SELECTION, SHOW PUNCH DATA, REFRESH */}
            <Box sx={{ display: "flex", flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ minWidth: 160, flex: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={fromDate}
                            disabled={disableDate}
                            onOpen={() => setInactiveShift(true)}
                            onChange={handleChangeDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => setInactiveShift(true)}>
                                    <CssVarsProvider>
                                        <Input ref={inputRef} {...inputProps} size="sm" style={{ width: '100%' }} disabled={true} />
                                    </CssVarsProvider>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>

                <Box sx={{ minWidth: 200, flex: 2 }}>
                    <Select
                        value={selectedShift}
                        onChange={(event, newValue) => setSelectedShift(newValue)}
                        size='sm'
                        variant='outlined'
                        disabled={inactiveShift}
                        placeholder="Select Shift"
                    >
                        <Option disabled value={0}>Select Shift</Option>
                        {deptShift?.map((val) => (
                            <Option key={val.shiftcode} value={val.shiftcode}>
                                {val.shiftDescription}
                            </Option>
                        ))}
                    </Select>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', px: 0.5 }}>
                    <Checkbox
                        label="check if additional duty done"
                        variant="outlined"
                        color="primary"
                        size="sm"
                        checked={additionalDuty}
                        onChange={handleAdditionalDutyChange}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Fetch Punch Details for Selected Shift" placement="top" arrow variant="outlined" color="success">
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleChangeFetchShift}
                            size='sm'
                            endDecorator={<Box>Show Punch Data</Box>}
                        >
                            <ExitToAppOutlinedIcon fontSize='small' />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Reset Form" placement="top" arrow variant="outlined" color="primary">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={refresh}
                            size='sm'
                        >
                            <RefreshIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>

            {/* ROW 2: PUNCH IN & PUNCH OUT SELECTION */}
            <Box sx={{ display: "flex", flexWrap: 'wrap', alignItems: 'center', gap: 1.5, my: 1, p: 1, bgcolor: '#ffffff', borderRadius: 'sm', border: '1px solid #eeeeee' }}>
                <Box sx={{ display: "flex", alignItems: 'center', minWidth: 120 }}>
                    <Checkbox
                        label="Check In"
                        variant="outlined"
                        color='primary'
                        size="md"
                        disabled={disableCheck}
                        onChange={handleChangeCheckInCheck}
                        checked={checkinBox}
                    />
                </Box>

                <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Select
                        value={punchInTime}
                        onChange={(event, newValue) => setPunchInTime(newValue)}
                        size='sm'
                        variant='outlined'
                        disabled={disableIn}
                        placeholder="Select Check In Time"
                    >
                        <Option disabled value={0}>Select Check In Time</Option>
                        {punchDetl?.map((val, index) => (
                            <Option key={index} value={val.punch_time}>
                                {val.punch_time}
                            </Option>
                        ))}
                    </Select>
                </Box>

                <Box sx={{ display: "flex", alignItems: 'center', minWidth: 120 }}>
                    <Checkbox
                        label="Check Out"
                        variant="outlined"
                        color='primary'
                        size="md"
                        disabled={disableCheck}
                        onChange={handleChangeCheckOutCheck}
                        checked={checkoutBox}
                    />
                </Box>

                <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Select
                        value={punchOutTime}
                        onChange={(event, newValue) => setPunchOutTime(newValue)}
                        size='sm'
                        variant='outlined'
                        disabled={disableOut}
                        placeholder="Select Check Out Time"
                    >
                        <Option disabled value={0}>Select Check Out Time</Option>
                        {punchDetl?.map((val, index) => (
                            <Option key={index} value={val.punch_time}>
                                {val.punch_time}
                            </Option>
                        ))}
                    </Select>
                </Box>
            </Box>

            {/* ROW 3: OVERTIME CALCULATION SUMMARY CARDS */}
            {(punchInTime !== 0 && punchOutTime !== 0) && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                    <Paper elevation={0} sx={{ flex: 1, minWidth: 130, p: 1, bgcolor: '#f0f4f8', borderRadius: 1, border: '1px solid #d0d7de', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="action" fontSize="small" />
                        <Box>
                            <Typography level="body-xs" color="neutral">Shift Duration</Typography>
                            <Typography level="title-sm">{Math.floor(exactWork / 60)}h {exactWork % 60}m</Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={0} sx={{ flex: 1, minWidth: 130, p: 1, bgcolor: '#f0f4f8', borderRadius: 1, border: '1px solid #d0d7de', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkOutlineIcon color="action" fontSize="small" />
                        <Box>
                            <Typography level="body-xs" color="neutral">Worked Duration</Typography>
                            <Typography level="title-sm">{Math.floor(working / 60)}h {working % 60}m</Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={0} sx={{ flex: 1, minWidth: 130, p: 1, bgcolor: overTime >= 60 ? '#e8f5e9' : '#fff3e0', borderRadius: 1, border: `1px solid ${overTime >= 60 ? '#a5d6a7' : '#ffe0b2'}`, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HourglassEmptyIcon color={overTime >= 60 ? 'success' : 'warning'} fontSize="small" />
                        <Box>
                            <Typography level="body-xs" color="neutral">Overtime</Typography>
                            <Typography level="title-sm" color={overTime >= 60 ? 'success' : 'warning'}>{finaltime}</Typography>
                        </Box>
                    </Paper>
                    {/* 
                    <Paper elevation={0} sx={{ flex: 1, minWidth: 130, p: 1, bgcolor: '#e3f2fd', borderRadius: 1, border: '1px solid #90caf9', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CurrencyRupeeIcon color="primary" fontSize="small" />
                        <Box>
                            <Typography level="body-xs" color="neutral">OT Amount</Typography>
                            <Typography level="title-sm" color="primary">₹{amount.toFixed(2)}</Typography>
                        </Box>
                    </Paper> */}
                </Box>
            )}

            {/* ROW 4: REASON, REMARKS & SAVE BUTTON */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, alignItems: 'flex-start' }} component={Grid}>
                <Box sx={{ flex: 2, minWidth: 250 }}>
                    <Input
                        placeholder="Reason For Overtime Request *"
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        value={ot_reason}
                        onChange={(e) => setOt_reason(e.target.value)}
                    />
                </Box>
                <Box sx={{ flex: 3, minWidth: 250 }}>
                    <Textarea
                        placeholder="Remarks (Optional)"
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        minRows={1}
                        maxRows={2}
                        value={ot_remark}
                        onChange={(e) => setOt_remark(e.target.value)}
                    />
                </Box>
                <Box sx={{ minWidth: 140 }}>
                    <Tooltip title="Save Overtime Request" variant="outlined" color="primary" placement="top" followCursor arrow>
                        <Button
                            variant="solid"
                            size="sm"
                            fullWidth
                            color="primary"
                            onClick={handleSubmitOtRequest}
                        >
                            Save Request
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </Paper>
    );
};

export default memo(OtSubmitForm);
