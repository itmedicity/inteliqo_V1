import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { addDays, addMonths, differenceInMinutes, format, formatDuration, getMonth, getYear, intervalToDuration, isValid, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import moment from 'moment';
import { errorNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, CssVarsProvider } from '@mui/joy';
import Input from '@mui/joy/Input';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useCallback } from 'react';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import { getAndUpdatePunchingData } from './Function';
import { memo } from 'react';
import { Suspense } from 'react';
import { lazy } from 'react';
import { Actiontypes } from 'src/redux/constants/action.type';
import { useMemo } from 'react';
import _ from 'underscore'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
// const ShiftTableDataRow = lazy(() => import('./ShiftUpdationTblRow'))
const TableRows = lazy(() => import('./TableRows'))

const ShiftUpdation = () => {

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_name, sect_name, dept_name, em_department, em_dept_section } = employeeProfileDetl;

    const dispatch = useDispatch();
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const { FETCH_PUNCH_DATA, FETCH_SHIFT_DATA, UPDATE_PUNCHMASTER_TABLE } = Actiontypes;
    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    //DATA SELECTETOR
    const empInform = useSelector((state) => state.getEmployeeBasedSection.emp);
    const punchMasterDataUpdateData = useSelector((state) => state.fetchupdatedPunchInOutData.puMaData);
    const updatedDataPunchInOut = useMemo(() => punchMasterDataUpdateData, [punchMasterDataUpdateData])

    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [tableArray, setTableArray] = useState([]);
    const [disable, setDisable] = useState(false)
    const { em_no } = emply

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            changeDept(em_department)
            changeSection(em_dept_section)
            getEmployee(employeeProfileDetl)
        }
    }, [hod, incharge, em_department, em_dept_section, employeeProfileDetl])

    //HANDLE FETCH PUNCH DETAILS AGINST EMPLOYEE SELECTION
    const handleOnClickFuntion = useCallback(async () => {
        setOpenBkDrop(true)
        setTableArray([])
        const selectedDate = moment(value).format('YYYY-MM-DD');
        if (dept !== 0 && section !== 0 && emply.em_id !== 0) {
            const postdata = {
                em_no: em_no,
                attendance_marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
            }
            //To Check attendance Proess Done
            const dataExist = await axioslogin.post("/attendCal/checkAttendanceProcess/", postdata);
            const { success } = dataExist.data
            if (success === 1) {
                warningNofity("Attendance procees Already Done")
                setDisable(true)
                setOpenBkDrop(false)
            }
            // //If Not done 
            else {
                const { em_id } = emply
                const postData = {
                    fromDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    preFromDate: format(subDays(startOfMonth(new Date(value)), 1), 'yyyy-MM-dd 00:00:00'),
                    toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    preToDate: format(addDays(lastDayOfMonth(new Date(value)), 1), 'yyyy-MM-dd 23:59:59'),
                    dept: dept,
                    section: section,
                    empId: emply
                }

                const chckdata = {
                    fromDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    em_no: em_no
                }

                const punchInOutHr = await axioslogin.post("/attendCal/checkInOutMarked/", chckdata);
                const { success } = punchInOutHr.data
                if (success === 1) {
                    //Get Emp salary and common late in and early out
                    const resultdel = await axioslogin.get(`/common/getgrossSalary/${em_id}`);
                    const { dataa } = resultdel.data
                    const { gross_salary } = dataa[0]

                    const gracePeriod = await axioslogin.get('/commonsettings')
                    const { data } = gracePeriod.data
                    const { cmmn_early_out, cmmn_grace_period, cmmn_late_in, salary_above,
                        week_off_day, notapplicable_shift, default_shift } = data[0]

                    const SelectMonth = getMonth(new Date(selectedDate))
                    const SelectYear = getYear(new Date(selectedDate))

                    const getHolidayPost = {
                        month: SelectMonth + 1,
                        year: SelectYear
                    }
                    //Get Holiday lIst
                    const holiday_data = await axioslogin.post("/attendCal/getHolidayDate/", getHolidayPost);
                    const { holidaydata } = holiday_data.data;

                    //Function for punch master updation. Based on duty plan and punch details in punch data 
                    const result = await getAndUpdatePunchingData(postData, holidaydata,
                        cmmn_early_out, cmmn_grace_period, cmmn_late_in,
                        gross_salary, empInform, dispatch, salary_above,
                        week_off_day, notapplicable_shift, default_shift)

                    if (result !== undefined) {
                        const { status, message, shift, punch_data } = result;
                        if (status === 1) {
                            dispatch({ type: FETCH_PUNCH_DATA, payload: punch_data })
                            dispatch({ type: FETCH_SHIFT_DATA, payload: shift })
                            const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
                            const { success, planData } = punch_master_data.data;
                            const arr = planData.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));

                            if (success === 1) {

                                const tableData = arr?.map((data) => {
                                    //FIND THE CROSS DAY
                                    const crossDay = shift?.find(shft => shft.shft_slno === data.shift_id);
                                    const crossDayStat = crossDay?.shft_cross_day ?? 0;

                                    let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_in), 'HH:mm')}`;
                                    let shiftOut = crossDayStat === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}` :
                                        `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}`;

                                    // GET THE HOURS WORKED IN MINITS
                                    let interVal = intervalToDuration({
                                        start: isValid(new Date(data.punch_in)) ? new Date(data.punch_in) : 0,
                                        end: isValid(new Date(data.punch_out)) ? new Date(data.punch_out) : 0
                                    })

                                    return {
                                        punch_slno: data.punch_slno,
                                        duty_day: data.duty_day,
                                        shift_id: data.shift_id,
                                        emp_id: data.emp_id,
                                        em_no: data.em_no,
                                        punch_in: (data.shift_id === default_shift || data.shift_id === notapplicable_shift || data.shift_id === week_off_day) ? crossDay?.shft_desc : data.punch_in,
                                        punch_out: (data.shift_id === default_shift || data.shift_id === notapplicable_shift || data.shift_id === week_off_day) ? crossDay?.shft_desc : data.punch_out,
                                        shift_in: (data.shift_id === default_shift || data.shift_id === notapplicable_shift || data.shift_id === week_off_day) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
                                        shift_out: (data.shift_id === default_shift || data.shift_id === notapplicable_shift || data.shift_id === week_off_day) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
                                        hrs_worked: (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
                                            formatDuration({ hours: interVal.hours, minutes: interVal.minutes }) : 0,
                                        hrsWrkdInMints: (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
                                            differenceInMinutes(new Date(data.punch_out), new Date(data.punch_in)) : 0,
                                        late_in: data.late_in,
                                        early_out: data.early_out
                                    }
                                })
                                setOpenBkDrop(false)
                                setTableArray(tableData)
                                succesNofity(message)
                            }
                        } else {
                            setTableArray([])
                            errorNofity(message)
                            setOpenBkDrop(false)
                        }
                    }
                    else {
                        errorNofity("Duty Doesnot Planed, Please do Duty Plan")
                        setOpenBkDrop(false)
                    }
                }
                else {
                    warningNofity("Attendance Saved HR,You Cannot save Punch Details, Plaese Contact HR")
                    setOpenBkDrop(false)
                }
            }
        }
        else {
            warningNofity("Plaese Select All Option!!")
            setOpenBkDrop(false)

        }
    }, [value, dept, section, emply, empInform, FETCH_PUNCH_DATA, FETCH_SHIFT_DATA, dispatch, em_no])

    //ATTENDANCE TABLE UPDATION FUNCTION
    useEffect(() => {
        if (Object.keys(updatedDataPunchInOut).length > 0) {
            const getUpdatedTable = async () => {
                const tableDataArray = await tableArray?.map((val) => {
                    return val.punch_slno === updatedDataPunchInOut.slno ?
                        {
                            ...val, punch_in: updatedDataPunchInOut.in, punch_out: updatedDataPunchInOut.out, hrs_worked: updatedDataPunchInOut.wrkMinitusInWord,
                            late_in: updatedDataPunchInOut.lateIn, early_out: updatedDataPunchInOut.earlyOut
                        } : val
                })
                await setTableArray(tableDataArray)
                // return tableDataArray;
            }
            getUpdatedTable()
            dispatch({ type: UPDATE_PUNCHMASTER_TABLE, payload: {} })
        }
    }, [updatedDataPunchInOut, UPDATE_PUNCHMASTER_TABLE, dispatch, tableArray])

    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <CustomLayout title="Punch In/Out Marking" displayClose={true} >
                <Box sx={{ width: '100%', }}>
                    <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
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
                        {hod === 1 || incharge === 1 ?

                            <Box sx={{ display: 'flex', width: '60%', }}>

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
                            <Box sx={{ display: 'flex', py: 0.5, width: '60%' }}>

                                <Box sx={{ flex: 1, px: 0.5, width: '25%' }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={dept_name}
                                        sx={{ display: 'flex', mt: 0.5 }}
                                        disabled
                                    />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5, width: '25%' }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={sect_name}
                                        sx={{ display: 'flex', mt: 0.5 }}
                                        disabled
                                    />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5, width: '10%' }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={em_name}
                                        sx={{ display: 'flex', mt: 0.5 }}
                                        disabled
                                    />
                                </Box>
                            </Box>
                        }
                        <Box sx={{ display: 'flex', px: 0.5, width: '30%' }}>
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleOnClickFuntion}
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
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Hrs Worked</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>L-IN(min)</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>E-GO(min)</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                    </TableRow>
                                    <TableRow hover >
                                        {/* <TableCell>Date</TableCell> */}
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
                                                return <TableRows key={ind} data={val}
                                                    disable={disable} />
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

export default memo(ShiftUpdation) 
