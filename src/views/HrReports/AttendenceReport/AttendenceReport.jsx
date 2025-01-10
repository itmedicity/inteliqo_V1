import { Box, IconButton, CssVarsProvider, Typography, Input } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import ReportLayout from '../ReportComponent/ReportLayout';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Paper } from '@mui/material';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { Actiontypes } from 'src/redux/constants/action.type'
// import { addDays, format } from 'date-fns';
import { getAttendanceCalculation, getLateInTimeIntervel, } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { addDays, addHours, differenceInHours, format, endOfMonth, isValid, max, min, subHours, formatDuration, intervalToDuration, lastDayOfMonth, startOfMonth } from "date-fns";
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const AttendenceReport = () => {
    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)
    const [Empno, setEmpNo] = useState({})
    const dispatch = useDispatch();
    const [fromdate, Setfromdate] = useState(moment(new Date()));
    const [todate, Settodate] = useState(moment(new Date()));
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const commonSettings = useSelector((state) => state?.getCommonSettings)
    const shiftInformation = useSelector((state) => state?.getShiftList?.shiftDetails)
    const { em_no } = Empno
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting())
        dispatch(setShiftDetails())
    }, [dispatch])

    const postData = useMemo(() => {
        return {
            empno: em_no,
            fromdate: isValid(new Date(fromdate)) ? format(new Date(fromdate), 'yyyy-MM-dd') : null,
            todate: isValid(new Date(todate)) ? format(addDays(new Date(todate), 1), 'yyyy-MM-dd ') : null,
        }

    }, [em_no, fromdate, todate])


    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff // night off SHIFT ID
    } = commonSettings; //COMMON SETTING

    const getData = useCallback(async (e) => {
        //GET ALL SHIFT INFORMATION 
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (deptName !== 0 && fromdate !== '' && todate !== '' && deptSecName !== 0) {
            setOpenBkDrop(true)
            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date(fromdate)), 'yyyy-MM-dd'),
                section: deptSecName
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromdate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(fromdate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! can't do the Process !! ")
                    const { em_id } = Empno;
                    const getPunchMast_PostData = {
                        fromDate_punchMaster: format(new Date(fromdate), 'yyyy-MM-dd'),
                        toDate_punchMaster: format(new Date(todate), 'yyyy-MM-dd '),
                        empList: [em_id],
                    }
                    const punch_master_data = await axioslogin.post("/attendCal/punchMastData/emid/", getPunchMast_PostData); //GET PUNCH MASTER DATA
                    const { success, planData: punchMasterData } = punch_master_data.data;

                    if (success === 1) {
                        const arr = punchMasterData?.map((val) => {

                            const inTime = moment(val?.shift_in).format('HH:mm');
                            const outTime = moment(val?.shift_out).format('HH:mm');
                            const chekIn = `${moment(val?.duty_day).format('DD-MM-yyyy')} ${inTime}`;
                            const chekOut = `${moment(val?.duty_day).format('DD-MM-yyyy')} ${outTime}`;

                            let interVal = intervalToDuration({
                                start: isValid(new Date(val.punch_in)) ? new Date(val.punch_in) : 0,
                                end: isValid(new Date(val.punch_out)) ? new Date(val.punch_out) : 0
                            })

                            return {
                                punch_in: (moment(val?.punch_in).format("HH:mm")) === "Invalid date" ? "No Punch" : (moment(val?.punch_in).format("HH:mm")),
                                punch_out: (moment(val?.punch_out).format(" HH:mm")) === "Invalid date" ? "No Punch" : (moment(val?.punch_out).format("HH:mm")),
                                lvereq_desc: val?.lvereq_desc,
                                duty_desc: val?.duty_desc,
                                sect: val?.sect_name,
                                Duty: (moment(val?.duty_day).format("DD-MM-yyyy")),
                                Shift_in: chekIn,
                                Shift_Out: chekOut,
                                // hrsWorked: formatDuration({ hours: val?.hrs_worked.hours, minutes: val?.hrs_worked.minutes }),
                                worked: (isValid(new Date(val.punch_in)) && val.punch_in !== null) && (isValid(new Date(val.punch_out)) && val.punch_out !== null) ?
                                    formatDuration({ hours: interVal.hours, minutes: interVal.minutes }) : 0,
                                late: val?.late_in,
                                early: val?.early_out,
                                em_no: val?.em_no,
                            }

                        })
                        setTableData(arr)
                        setOpenBkDrop(false)
                    } else {
                        setTableData([])
                        setOpenBkDrop(false)
                    }
                } else {
                    dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
                    const punch_data = await axioslogin.post("/AttendenceReport/getPunchDataEmCodeWiseDateWise/", postData);
                    const { su, result_data } = punch_data.data;
                    if (su === 1 && result_data?.length > 0) {
                        const punchaData = result_data;
                        const punch_master_data = await axioslogin.post("/AttendenceReport/getPunchMasterDataSectionWise/", postData); //GET PUNCH MASTER DATA
                        const { success, planData } = punch_master_data.data;

                        if (success === 1 && planData?.length > 0) {
                            const punchMasterData = planData; //PUNCHMSTER DATA
                            const maindata = await Promise.allSettled(
                                punchMasterData?.map(async (data, index) => {

                                    const sortedShiftData = shiftInformation?.find((e) => e.shft_slno === data.shift_id)// SHIFT DATA
                                    // const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                                    const shiftMergedPunchMaster = {
                                        ...data,
                                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                                        shft_cross_day: sortedShiftData?.shft_cross_day,
                                        // gross_salary: sortedSalaryData?.gross_salary,
                                        earlyGoingMaxIntervl: cmmn_early_out,
                                        gracePeriodInTime: cmmn_grace_period,
                                        maximumLateInTime: cmmn_late_in,
                                        salaryLimit: salary_above,
                                        woff: week_off_day,
                                        naShift: notapplicable_shift,
                                        defaultShift: default_shift,
                                        noff: noff,
                                        holidayStatus: sortedShiftData?.holiday_status
                                    }

                                    const employeeBasedPunchData = punchaData?.filter((e) => e.emp_code = data.em_no)

                                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                                })
                            ).then((data) => {
                                if (data?.length > 0) {
                                    const punchMasterMappedData = data?.map((e) => e.value)
                                    return Promise.allSettled(
                                        punchMasterMappedData?.map(async (val) => {
                                            const holidayStatus = val.holiday_status;
                                            const punch_In = val.punch_in === null ? null : new Date(val.punch_in);
                                            const punch_out = val.punch_out === null ? null : new Date(val.punch_out);
                                            const shift_in = new Date(val.shift_in);
                                            const shift_out = new Date(val.shift_out);
                                            let interVal = intervalToDuration({
                                                start: isValid(new Date(val.punch_in)) ? new Date(val.punch_in) : 0,
                                                end: isValid(new Date(val.punch_out)) ? new Date(val.punch_out) : 0
                                            })
                                            //SALARY LINMIT
                                            const salaryLimit = val.gross_salary > val.salaryLimit ? true : false;
                                            const getLateInTime = await getLateInTimeIntervel(punch_In, shift_in, punch_out, shift_out)
                                            const getAttendanceStatus = await getAttendanceCalculation(
                                                punch_In,
                                                shift_in,
                                                punch_out,
                                                shift_out,
                                                cmmn_grace_period,
                                                getLateInTime,
                                                holidayStatus,
                                                val.shift_id,
                                                val.defaultShift,
                                                val.naShift,
                                                val.noff,
                                                val.woff,
                                                salaryLimit,
                                                val.maximumLateInTime
                                            )

                                            return {

                                                punch_slno: val.punch_slno,
                                                punch_in: (moment(val?.punch_in).format("HH:mm")) === "Invalid date" ? "No Punch" : (moment(val?.punch_in).format("HH:mm")),
                                                punch_out: (moment(val?.punch_out).format(" HH:mm")) === "Invalid date" ? "No Punch" : (moment(val?.punch_out).format("HH:mm")),
                                                hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                                                late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                                                early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                                                duty_status: getAttendanceStatus?.duty_status,
                                                holiday_status: val.holiday_status,
                                                leave_status: val.leave_status,
                                                lvereq_desc: val?.leave_status === 1 ? val?.lvereq_desc : getAttendanceStatus?.lvereq_desc,
                                                duty_desc: val?.leave_status === 1 ? val?.duty_desc : getAttendanceStatus?.duty_desc,
                                                lve_tble_updation_flag: val.lve_tble_updation_flag,
                                                name: val?.em_name,
                                                dept: val?.dept_name,
                                                sect: val?.sect_name,
                                                Duty: (moment(val?.duty_day).format("DD-MM-yyyy")),
                                                Shift_in: (moment(val?.shift_in).format("DD-MM-yyyy HH:mm")),
                                                Shift_Out: (moment(val?.shift_out).format("DD-MM-yyyy HH:mm ")),
                                                // hrsWorked: formatDuration({ hours: val?.hrs_worked.hours, minutes: val?.hrs_worked.minutes }),
                                                worked: (isValid(new Date(val.punch_in)) && val.punch_in !== null) && (isValid(new Date(val.punch_out)) && val.punch_out !== null) ?
                                                    formatDuration({ hours: interVal.hours, minutes: interVal.minutes }) : 0,
                                                late: val?.late_in,
                                                early: val?.early_out,
                                                em_no: val?.em_no,
                                            }
                                        })
                                    ).then(async (element) => {

                                        if (element?.length > 0) {
                                            const extractedValues = element?.map(item => item.value);
                                            return { status: 1, data: extractedValues }
                                            setOpenBkDrop(false)
                                            // setTableData(extractedValues)
                                        } else {
                                            return { status: 0, message: "something went wrong", errorMessage: '' }
                                            setOpenBkDrop(false)
                                        }
                                    })

                                } else {
                                    return { status: 0, message: "something went wrong", errorMessage: '' }
                                    setOpenBkDrop(false)
                                }
                            })
                            if (maindata?.status === 1) {
                                setTableData(maindata?.data.slice(0, -1))
                                setOpenBkDrop(false)
                            } else {
                                setTableData([])
                                setOpenBkDrop(false)
                            }
                        } else {
                            return { status: 0, message: "something went wrong", errorMessage: '' }
                            setOpenBkDrop(false)
                        }
                    } else {
                        setOpenBkDrop(false)
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
                setOpenBkDrop(false)
            }
        } else {
            warningNofity("Please Select All Fields")

        }
    }, [fromdate, todate, postData, shiftInformation, cmmn_early_out, deptSecName, deptName,
        cmmn_grace_period, Empno,
        cmmn_late_in,
        salary_above,
        week_off_day,
        notapplicable_shift,
        default_shift,
        dispatch,
        noff])

    const punchInOutMapping = async (shiftMergedPunchMaster, employeeBasedPunchData) => {
        const crossDay = shiftMergedPunchMaster?.shft_cross_day;
        const shiftInTime = `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_in), 'HH:mm')}`;
        const shiftOutTime = crossDay === 0 ? `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}` :
            `${format(addDays(new Date(shiftMergedPunchMaster?.duty_day), crossDay), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}`;

        //SHIFT MASTER DATA    
        const shiftIn = new Date(shiftMergedPunchMaster?.shift_in);
        const shiftOut = new Date(shiftMergedPunchMaster?.shift_out);
        const shiftInStart = new Date(shiftMergedPunchMaster?.shft_chkin_start);
        const shiftInEnd = new Date(shiftMergedPunchMaster?.shft_chkin_end);
        const shiftOutStart = new Date(shiftMergedPunchMaster?.shft_chkout_start);
        const shiftOutEnd = new Date(shiftMergedPunchMaster?.shft_chkout_end);

        //Diffrence in Check IN time Intervel in Hours
        const shiftInStartDiffer = differenceInHours(shiftIn, shiftInStart);
        const shiftInEndDiffer = differenceInHours(shiftInEnd, shiftIn);

        //Diffrence in Check OUT time Intervel in Hours
        const shiftOutStartDiffer = differenceInHours(shiftOut, shiftOutStart);
        const shiftOutEndDiffer = differenceInHours(shiftOutEnd, shiftOut);

        const checkInTIme = new Date(shiftInTime);
        const checkOutTime = new Date(shiftOutTime);

        const checkInStartTime = subHours(checkInTIme, shiftInStartDiffer);
        const checkInEndTime = addHours(checkInTIme, shiftInEndDiffer);

        const checkOutStartTime = subHours(checkOutTime, shiftOutStartDiffer)
        const checkOutEndTime = addHours(checkOutTime, shiftOutEndDiffer);

        const empPunchData = employeeBasedPunchData?.map((e) => new Date(e.punch_time));

        const inTimesArray = empPunchData?.filter((e) => (e >= checkInStartTime && e <= checkInEndTime))
        const outTimeArray = empPunchData?.filter((e) => (e >= checkOutStartTime && e <= checkOutEndTime))
        const inPunch = min(inTimesArray)
        const outPunch = max(outTimeArray)
        return {
            ...shiftMergedPunchMaster,
            punch_in: isValid(inPunch) === true ? format(inPunch, 'yyyy-MM-dd HH:mm') : null,
            punch_out: isValid(outPunch) === true ? format(outPunch, 'yyyy-MM-dd HH:mm') : null,
            shift_in: checkInTIme,
            shift_out: checkOutTime,
            shiftInStart: checkInStartTime,
            shiftInEnd: checkInEndTime,
            shiftOutStart: checkOutStartTime,
            shiftOutEnd: checkOutEndTime
        }
    }

    const [columnDef] = useState([
        { headerName: 'Em Id', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Duty Day', field: 'Duty', wrapText: true, minWidth: 200 },
        { headerName: 'Shift In', field: 'Shift_in', wrapText: true, minWidth: 200 },
        { headerName: 'Shift Out', field: 'Shift_Out', wrapText: true, minWidth: 200 },
        { headerName: 'Punch In', field: 'punch_in', wrapText: true, minWidth: 200 },
        { headerName: 'Punch Out', field: 'punch_out', wrapText: true, minWidth: 200 },
        { headerName: 'Hours Worked', field: 'worked', wrapText: true, minWidth: 200 },
        { headerName: 'Late In', field: 'late', wrapText: true, minWidth: 100 },
        { headerName: 'Early Go', field: 'early', wrapText: true, minWidth: 100 },
        { headerName: 'Attendence', field: 'lvereq_desc', wrapText: true, minWidth: 200 }

    ])



    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
            <ReportLayout title="Attendence Report" displayClose={true} data={tableData} >
                <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={setDepartmentName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={setDepartSecName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <SectionBsdEmployee getEmploy={setEmpNo} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    // disableFuture={true}
                                    views={['day']}
                                    value={fromdate}
                                    maxDate={new Date()}
                                    inputFormat='dd-MM-yyyy'
                                    size="small"
                                    onChange={(e) => {
                                        Setfromdate(moment(e).format("YYYY-MM-DD"));
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>To:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    // disableFuture={true}
                                    views={['day']}
                                    value={todate}
                                    inputFormat='dd-MM-yyyy'
                                    maxDate={new Date()}
                                    size="small"
                                    onChange={(e) => {
                                        Settodate(moment(e).format("YYYY-MM-DD"));
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ px: 0.5, mr: 1, mt: .5 }}>
                            <IconButton variant="outlined" size='sm' color="primary"
                                onClick={getData}
                            >
                                <PublishedWithChangesIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={tableData}
                            columnDefMain={columnDef}
                        />
                    </Paper>
                </Paper>
            </ReportLayout>
        </Box >
    )
}

export default memo(AttendenceReport)