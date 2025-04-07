import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { addDays, addMonths, differenceInMinutes, format, formatDuration, intervalToDuration, isValid, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import moment from 'moment';
import { errorNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, CssVarsProvider, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useCallback } from 'react';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import { memo } from 'react';
import { Suspense } from 'react';
import { lazy } from 'react';
import { useMemo } from 'react';
import _ from 'underscore'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { getEmpNameHodSectionBased, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection';
import HodWiseEmpList from 'src/views/MuiComponents/JoyComponent/HodWiseEmpList';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { getCommonSettings } from '../../../redux/reduxFun/reduxHelperFun';
import { dailyPunchMarkingFunction } from './Function';
const TableRows = lazy(() => import('./TableRows'))

const BasedonSecondPolicy = () => {

    const dispatch = useDispatch();
    const [openBkDrop, setOpenBkDrop] = useState(false)
    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting())
        dispatch(setShiftDetails())
    }, [dispatch])

    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [tableArray, setTableArray] = useState([]);
    const [disable, setDisable] = useState(false)
    const { em_no } = emply
    const [department, setDepart] = useState(0)
    const [self, setSelf] = useState(false)
    const [punchData, setPunchData] = useState([])

    const punchDta = useMemo(() => punchData, [punchData])
    const punchMast = useMemo(() => tableArray, [tableArray])

    //get the employee details for taking the HOd and Incharge Details
    const shiftInformation = useSelector((state) => state?.getShiftList?.shiftDetails)
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_name, sect_name, dept_name, em_department, em_dept_section, groupmenu } = employeeProfileDetl;


    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    //DATA SELECTETOR
    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const commonSetting = useMemo(() => state, [state])
    const { week_off_day, notapplicable_shift, default_shift, noff, doff } = commonSetting;

    useEffect(() => {
        if ((hod === 1 || incharge === 1) && self === false) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
            changeDept(department)
        } else if ((hod === 1 || incharge === 1) && self === true) {
            changeDept(em_department)
            changeSection(em_dept_section)
            getEmployee(employeeProfileDetl)
        }
        else {
            changeDept(em_department)
            changeSection(em_dept_section)
            getEmployee(employeeProfileDetl)
        }
    }, [hod, dispatch, em_id, incharge, em_department, em_dept_section, employeeProfileDetl, department, self])

    const shiftPunchMarkingHandleClickFun = useCallback(async () => {
        if (Object.keys(emply).length === 0 && dept === 0 && section === 0) {
            warningNofity('Select The basic information for Process')
            setOpenBkDrop(false)
        } else {
            //CHECK PUNCHMARKING HR COMPLETED WITH THE SELECTED DATE
            const monthStartDate = format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
            const postData = {
                month: monthStartDate,
                section: section
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(value)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd')

                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! can't do the Process !! ")
                    setDisable(true)

                    /////////////// ONLY FOR DISPLAYING PUNCHMARKING DATA AFTER 
                    const getPunchMast_PostData = {
                        fromDate_punchMaster: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        toDate_punchMaster: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        empList: [emply.em_no]
                    }
                    const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", getPunchMast_PostData); //GET PUNCH MASTER DATA
                    const { success, planData } = punch_master_data.data;
                    if (success === 1) {
                        const tb = planData?.map((e) => {

                            const crossDay = shiftInformation?.find((shft) => shft.shft_slno === e.shift_id);
                            const crossDayStat = crossDay?.shft_cross_day ?? 0;

                            let shiftIn = `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_in), 'HH:mm')}`;
                            let shiftOut = crossDayStat === 0 ? `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}` :
                                `${format(addDays(new Date(e.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}`;

                            // GET THE HOURS WORKED IN MINITS
                            let interVal = intervalToDuration({
                                start: isValid(new Date(e.punch_in)) ? new Date(e.punch_in) : 0,
                                end: isValid(new Date(e.punch_out)) ? new Date(e.punch_out) : 0
                            })
                            return {
                                punch_slno: e.punch_slno,
                                duty_day: e.duty_day,
                                shift_id: e.shift_id,
                                emp_id: e.emp_id,
                                em_no: e.em_no,
                                punch_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : e.punch_in,
                                punch_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : e.punch_out,
                                shift_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
                                shift_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
                                hrs_worked: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                    formatDuration({ days: interVal.days, hours: interVal.hours, minutes: interVal.minutes }) : 0,
                                hrsWrkdInMints: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                    differenceInMinutes(new Date(e.punch_out), new Date(e.punch_in)) : 0,
                                late_in: e.late_in,
                                early_out: e.early_out,
                                shiftIn: e.shift_in,
                                shiftOut: e.shift_out,
                                hideStatus: 1,
                                isWeekOff: (e.shift_id === week_off_day),
                                isNOff: e.shift_id === noff,
                                lvereq_desc: e.lvereq_desc,
                                duty_desc: e.duty_desc,
                                leave_status: e.leave_status,
                                isDoff: e.shift_id === doff
                            }
                        })
                        const array = tb.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
                        setTableArray(array)
                    }
                    setOpenBkDrop(false)
                } else {
                    const today = format(new Date(), 'yyyy-MM-dd');
                    const selectedDate = format(new Date(value), 'yyyy-MM-dd');
                    const todayStatus = selectedDate <= today ? true : false; // selected date less than today date
                    const postData_getPunchData = {
                        preFromDate: format(subDays(new Date(lastUpdateDate), 2), 'yyyy-MM-dd 00:00:00'),
                        preToDate: todayStatus === true ? format(addDays(lastDayOfMonth(new Date(value)), 1), 'yyyy-MM-dd 23:59:59') : format(addDays(new Date(value), 1), 'yyyy-MM-dd 23:59:59'),
                        fromDate: format(new Date(lastUpdateDate), 'yyyy-MM-dd'),
                        toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        fromDate_dutyPlan: format(new Date(lastUpdateDate), 'yyyy-MM-dd'),
                        toDate_dutyPlan: todayStatus === true ? format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd') : format(new Date(value), 'yyyy-MM-dd'),
                        fromDate_punchMaster: format(subDays(new Date(lastUpdateDate), 0), 'yyyy-MM-dd'),
                        toDate_punchMaster: todayStatus === true ? format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd') : format(new Date(value), 'yyyy-MM-dd'),
                        section: section,
                        empList: [emply.em_no],
                        loggedEmp: em_no,
                        frDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        trDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    }
                    // GET PUNCH DATA FROM TABLE START
                    const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData_getPunchData);
                    const { su, result_data } = punch_data.data;
                    if (su === 1) {
                        const punchaData = result_data;
                        setPunchData(punchaData)
                        //PUNCH MARKING HR PROCESS START
                        const result = await dailyPunchMarkingFunction(
                            postData_getPunchData,
                            punchaData,
                            shiftInformation,
                            commonSetting,
                            // empSalary
                        )
                        const { status, message, errorMessage, punchMastData } = result;
                        if (status === 1) {
                            const tb = punchMastData?.map((e) => {
                                const crossDay = shiftInformation?.find((shft) => shft.shft_slno === e.shift_id);
                                const crossDayStat = crossDay?.shft_cross_day ?? 0;

                                let shiftIn = `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_in), 'HH:mm')}`;
                                let shiftOut = crossDayStat === 0 ? `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}` :
                                    `${format(addDays(new Date(e.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}`;

                                // GET THE HOURS WORKED IN MINITS
                                let interVal = intervalToDuration({
                                    start: isValid(new Date(e.punch_in)) ? new Date(e.punch_in) : 0,
                                    end: isValid(new Date(e.punch_out)) ? new Date(e.punch_out) : 0
                                })
                                return {
                                    punch_slno: e.punch_slno,
                                    duty_day: e.duty_day,
                                    shift_id: e.shift_id,
                                    emp_id: e.emp_id,
                                    em_no: e.em_no,
                                    punch_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : e.punch_in,
                                    punch_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : e.punch_out,
                                    shift_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
                                    shift_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff || e.shift_id === doff) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
                                    hrs_worked: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                        formatDuration({ days: interVal.days, hours: interVal.hours, minutes: interVal.minutes }) : 0,
                                    hrsWrkdInMints: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                        differenceInMinutes(new Date(e.punch_out), new Date(e.punch_in)) : 0,
                                    late_in: e.late_in,
                                    early_out: e.early_out,
                                    shiftIn: e.shift_in,
                                    shiftOut: e.shift_out,
                                    hideStatus: 0,
                                    isWeekOff: (e.shift_id === week_off_day),
                                    isNOff: e.shift_id === noff,
                                    holiday_status: e.holiday_status,
                                    lvereq_desc: e.lvereq_desc,
                                    duty_desc: e.duty_desc,
                                    leave_status: e.leave_status,
                                    isDoff: e.shift_id === doff
                                }
                            })
                            const array = tb.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
                            setTableArray(array)
                            setOpenBkDrop(false)
                            succesNofity('Punch Master Updated Successfully')
                        } else {
                            setOpenBkDrop(false)
                            warningNofity(message, errorMessage)
                        }
                    } else {
                        warningNofity("Error getting punch Data From DB")
                        setOpenBkDrop(false)
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [emply, dept, section, doff, value, commonSetting, default_shift, em_no, noff,
        notapplicable_shift, shiftInformation])

    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <CustomLayout title="Punch In/Out Marking" displayClose={true} >
                <Box sx={{ width: '100%', }}>
                    {
                        self === true ?
                            <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                                <Box sx={{ flex: 1, px: 0.5, pl: 1, width: '20%', }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year', 'month']}
                                            minDate={subMonths(new Date(), 1)}
                                            maxDate={addMonths(new Date(), 1)}
                                            value={value}
                                            size="small"
                                            onChange={(newValue) => {
                                                setDisable(false)
                                                setValue(newValue);
                                            }}
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
                                <Box sx={{ display: 'flex', py: 0, width: '60%', }}>
                                    <Box sx={{ flex: 1, px: 0.5, width: '25%', }}>
                                        <Box sx={{
                                            border: 1,
                                            display: 'flex',
                                            flex: 1,
                                            alignItems: 'center',
                                            height: '100%',
                                            borderRadius: 1.5,
                                            borderColor: '#cdd7e1',
                                            color: '#9fa6ad',
                                            paddingLeft: 1,
                                        }} >
                                            <Typography level="title-sm" noWrap > {dept_name} </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5, width: '25%' }}>
                                        <Box sx={{
                                            border: 1,
                                            display: 'flex',
                                            flex: 1,
                                            alignItems: 'center',
                                            height: '100%',
                                            borderRadius: 1.5,
                                            borderColor: '#cdd7e1',
                                            color: '#9fa6ad',
                                            paddingLeft: 1,
                                        }} >
                                            <Typography level="title-sm" noWrap > {sect_name} </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5, width: '10%' }}>
                                        <Box sx={{
                                            border: 1,
                                            display: 'flex',
                                            flex: 1,
                                            alignItems: 'center',
                                            height: '100%',
                                            borderRadius: 1.5,
                                            borderColor: '#cdd7e1',
                                            color: '#9fa6ad',
                                            paddingLeft: 1
                                        }} >
                                            {em_name}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 0.5, width: '30%' }}>
                                    <CssVarsProvider>
                                        <Button
                                            aria-label="Like"
                                            variant="outlined"
                                            color="neutral"
                                            size='sm'
                                            onClick={shiftPunchMarkingHandleClickFun}
                                            fullWidth
                                            startDecorator={<HourglassEmptyOutlinedIcon />}
                                            sx={{ mx: 0.5 }}
                                        >
                                            Process
                                        </Button>
                                        <Button
                                            aria-label="Like"
                                            variant="outlined"
                                            color="neutral"
                                            size='sm'
                                            fullWidth
                                            startDecorator={<CleaningServicesOutlinedIcon />}
                                            sx={{ mx: 0.5 }}
                                        >
                                            Clear
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : //else conditions
                            <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                                {
                                    hod === 1 || incharge === 1 ? <Box sx={{ flex: 1, px: 0.5, mt: 1 }} >
                                        <JoyCheckbox
                                            label='Self'
                                            name="self"
                                            checked={self}
                                            onchange={(e) => setSelf(e.target.checked)}
                                        />
                                    </Box> : null
                                }
                                <Box sx={{ flex: 1, px: 0.5, width: '20%', }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year', 'month']}
                                            minDate={subMonths(new Date(), 1)}
                                            maxDate={addMonths(new Date(), 1)}
                                            value={value}
                                            size="small"
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
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
                                {
                                    groupStatus === true ? <Box sx={{ display: 'flex', width: '60%', }}>

                                        <Box sx={{ flex: 1, px: 0.5 }}>
                                            <DepartmentDropRedx getDept={changeDept} />
                                        </Box>
                                        <Box sx={{ flex: 1, px: 0.5 }}>
                                            <DepartmentSectionRedx getSection={changeSection} />
                                        </Box>
                                        <Box sx={{ flex: 1, px: 0.5 }}>
                                            <SectionBsdEmployee getEmploy={getEmployee} />
                                        </Box>
                                    </Box> :
                                        hod === 1 || incharge === 1 ?
                                            <Box sx={{ display: 'flex', width: '60%', }}>
                                                <Box sx={{ flex: 1, px: 0.5 }}>
                                                    <HodWiseDeptSection detSection={section} setSectionValue={changeSection} />
                                                </Box>
                                                <Box sx={{ flex: 1, px: 0.5 }}>
                                                    <HodWiseEmpList section={section} setEmployee={getEmployee} />
                                                </Box>
                                            </Box> :
                                            <Box sx={{ display: 'flex', py: 0, width: '60%', }}>
                                                <Box sx={{ flex: 1, px: 0.5, width: '25%', }}>
                                                    <Box sx={{
                                                        border: 1,
                                                        display: 'flex',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        height: '100%',
                                                        borderRadius: 1.5,
                                                        borderColor: '#cdd7e1',
                                                        color: '#9fa6ad',
                                                        paddingLeft: 1
                                                    }} >
                                                        {dept_name}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1, px: 0.5, width: '25%' }}>
                                                    <Box sx={{
                                                        border: 1,
                                                        display: 'flex',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        height: '100%',
                                                        borderRadius: 1.5,
                                                        borderColor: '#cdd7e1',
                                                        color: '#9fa6ad',
                                                        paddingLeft: 1
                                                    }} >
                                                        {sect_name}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1, px: 0.5, width: '10%' }}>
                                                    <Box sx={{
                                                        border: 1,
                                                        display: 'flex',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        height: '100%',
                                                        borderRadius: 1.5,
                                                        borderColor: '#cdd7e1',
                                                        color: '#9fa6ad',
                                                        paddingLeft: 1
                                                    }} >
                                                        {em_name}
                                                    </Box>
                                                </Box>
                                            </Box>
                                }
                                <Box sx={{ display: 'flex', px: 0.5, width: '30%' }}>
                                    <CssVarsProvider>
                                        <Button
                                            aria-label="Like"
                                            variant="outlined"
                                            color="neutral"
                                            onClick={shiftPunchMarkingHandleClickFun}
                                            fullWidth
                                            startDecorator={<HourglassEmptyOutlinedIcon />}
                                            sx={{ mx: 0.5 }}
                                        >
                                            Process
                                        </Button>
                                        <Button
                                            aria-label="Like"
                                            variant="outlined"
                                            color="neutral"
                                            fullWidth
                                            startDecorator={<CleaningServicesOutlinedIcon />}
                                            sx={{ mx: 0.5 }}
                                        >
                                            Clear
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                    }
                    <Box sx={{ flex: 1, pt: 0.5 }} >
                        <TableContainer component={Paper}>
                            <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                                <TableHead>
                                    <TableRow sx={{ color: '#003A75' }} hover >
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }} >#</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }} >Date</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Emp No</TableCell>
                                        <TableCell size='small' padding='none' align="center" colSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Shift Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" colSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Punch Data</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Hours</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>LIN</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>EGO</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                    </TableRow>
                                    <TableRow hover >
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>In Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>Out Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>In Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>Out Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Suspense>
                                        {
                                            tableArray?.map((val, ind) => {
                                                return <TableRows key={ind} no={ind} data={val} disable={disable} punchData={punchDta} punchMaster={punchMast} setTableArray={setTableArray} />
                                            })
                                        }
                                    </Suspense>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </CustomLayout>
        </Fragment >
    )
}

export default memo(BasedonSecondPolicy) 