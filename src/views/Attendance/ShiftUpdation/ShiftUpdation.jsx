import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, useContext, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { FcPlus, FcCancel, FcProcess } from "react-icons/fc";
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useState } from 'react';
import { addDays, addMonths, differenceInMinutes, format, formatDuration, getMonth, getYear, intervalToDuration, isValid, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import moment from 'moment';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { infoNofity, getDayDiffrence, errorNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect';
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { styled } from '@mui/system';
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
import CloseIcon from '@mui/icons-material/Close'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import { getAndUpdatePunchingData } from './Function';
import { memo } from 'react';
import { Suspense } from 'react';
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar';
import { lazy } from 'react';
import { Actiontypes } from 'src/redux/constants/action.type';
import { getPunchMasterData } from 'src/redux/actions/Common.Action';
import { useMemo } from 'react';

const ShiftTableDataRow = lazy(() => import('./ShiftUpdationTblRow'))
const TableRows = lazy(() => import('./TableRows'))

const ShiftUpdation = () => {
    const dispatch = useDispatch();
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const { FETCH_PUNCH_DATA, FETCH_SHIFT_DATA, UPDATE_PUNCHMASTER_TABLE } = Actiontypes;
    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [])

    //DATA SELECTETOR
    const empInform = useSelector((state) => state.getEmployeeBasedSection.emp);
    const punchMasterDataUpdateData = useSelector((state) => state.fetchupdatedPunchInOutData.puMaData);
    const updatedDataPunchInOut = useMemo(() => punchMasterDataUpdateData, [punchMasterDataUpdateData])

    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState(0);
    const [tableArray, setTableArray] = useState([]);
    const [disable, setDisable] = useState(false)
    const { em_no } = emply


    //HANDLE FETCH PUNCH DETAILS AGINST EMPLOYEE SELECTION
    const handleOnClickFuntion = useCallback(async () => {
        setOpenBkDrop(true)
        setTableArray([])
        // const selectedDate = moment(value).format('YYYY-MM-DD');
        // const startDate = format(subDays(startOfMonth(new Date(value)), 1), 'yyyy-MM-dd');
        // const endDate = format(addDays(lastDayOfMonth(new Date(value)), 1), 'yyyy-MM-dd');

        const selectedDate = moment(value).format('YYYY-MM-DD');
        if (dept !== 0 && section !== 0 && emply !== 0) {

            const postdata = {
                em_no: em_no,
                attendance_marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
            }

            const dataExist = await axioslogin.post("/attendCal/checkAttendanceProcess/", postdata);
            const { success } = dataExist.data
            if (success === 1) {
                warningNofity("Attendance procees Already Done")
                setDisable(true)
                setOpenBkDrop(false)
            }

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

                // dispatch(getPunchMasterData(postData));
                const resultdel = await axioslogin.get(`/common/getgrossSalary/${em_id}`);
                const { dataa } = resultdel.data
                const { gross_salary } = dataa[0]

                const gracePeriod = await axioslogin.get('/commonsettings')
                const { data } = gracePeriod.data
                const { cmmn_late_in_grace, cmmn_early_out_grace } = data[0]

                const SelectMonth = getMonth(new Date(selectedDate))
                const SelectYear = getYear(new Date(selectedDate))

                const getHolidayPost = {
                    month: SelectMonth + 1,
                    year: SelectYear
                }
                const holiday_data = await axioslogin.post("/attendCal/getHolidayDate/", getHolidayPost);
                const { holidaydata } = holiday_data.data;


                const result = await getAndUpdatePunchingData(postData, holidaydata, cmmn_late_in_grace, cmmn_early_out_grace,
                    gross_salary, empInform, dispatch)
                const { status, message, shift, punch_data } = result;
                if (status === 1) {
                    dispatch({ type: FETCH_PUNCH_DATA, payload: punch_data })
                    dispatch({ type: FETCH_SHIFT_DATA, payload: shift })
                    const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
                    const { success, planData } = punch_master_data.data;

                    // if (await punchMasterData.length > 0) {

                    // }

                    if (success === 1) {

                        const tableData = planData?.map((data) => {
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
                                punch_in: (data.shift_id === 1 || data.shift_id === 2 || data.shift_id === 3) ? crossDay?.shft_desc : data.punch_in,
                                punch_out: (data.shift_id === 1 || data.shift_id === 2 || data.shift_id === 3) ? crossDay?.shft_desc : data.punch_out,
                                shift_in: (data.shift_id === 1 || data.shift_id === 2 || data.shift_id === 3) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
                                shift_out: (data.shift_id === 1 || data.shift_id === 2 || data.shift_id === 3) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
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
        }
    }, [value, dept, section, emply, empInform])

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
    }, [updatedDataPunchInOut])


    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <PageLayoutCloseOnly
                heading="Punch In/Out Marking"
                redirect={() => { }}
            >
                <Box sx={{ display: 'flex', py: 0.5, flex: 1 }}>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
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
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={changeSection} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBsdEmployee getEmploy={getEmployee} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, px: 0.5 }}>
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
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(ShiftUpdation) 
