import { Box, Button, Input, Table, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { addDays, addHours, differenceInHours, eachDayOfInterval, endOfMonth, format, formatDuration, intervalToDuration, isValid, max, min, subHours } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { getAllHodList, getCommonsettingData, getShiftDetails } from 'src/views/CommonCode/CommonReactQueries';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getAttendanceCalculation, getLateInTimeIntervel, } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { ToastContainer } from 'react-toastify';
import ReportWithFunction from '../ReportComponent/ReportWithFunction';
import { ExporttoExcel } from '../DayWiseAttendence/ExportToExcel';

const HODAttendnaceReport = () => {

    const [fromdate, Setfromdate] = useState(new Date());
    const [todate, Settodate] = useState(new Date());
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])
    const [empArray, setEmpArray] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [click, setClick] = useState(0)

    const { data: hodlist, isError: isHodError, isLoading: isHodListLoading } = useQuery({
        queryKey: ['hodList'],
        queryFn: getAllHodList
    })

    const { data: shiftDetails, isError: isShiftError, isLoading: isShiftDetailsLoading } = useQuery({
        queryKey: ['allshiftDetails'],
        queryFn: getShiftDetails
    })

    const { data: commonSettings, isError: isCommonError, isLoading: isCommonDataLoading } = useQuery({
        queryKey: ['commonSettingdata'],
        queryFn: getCommonsettingData
    })

    const getEmpdata = useCallback(async () => {
        setClick(1)
        setOpenBkDrop(true)
        const {
            cmmn_early_out, // Early going time interval
            cmmn_grace_period, // common grace period for late in time
            cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
            salary_above, //Salary limit for calculating the holiday double wages
            week_off_day, // week off SHIFT ID
            notapplicable_shift, //not applicable SHIFT ID
            default_shift, //default SHIFT ID
            noff, // night off SHIFT ID
            halfday_time_count,
        } = commonSettings; //COMMON SETTING

        const getPunchMast_PostData = {
            fromDate_punchMaster: isValid(new Date(fromdate)) ? format(new Date(fromdate), 'yyyy-MM-dd') : null,
            toDate_punchMaster: isValid(new Date(todate)) ? format(addDays(new Date(todate), 2), 'yyyy-MM-dd ') : null,
            empList: hodlist?.map(val => val.em_no),
            preFromDate: format(new Date(fromdate), 'yyyy-MM-dd'),
            preToDate: isValid(new Date(todate)) ? format(addDays(new Date(todate), 2), 'yyyy-MM-dd ') : null,
        }
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", getPunchMast_PostData); //GET PUNCH MASTER DATA
        const { success, planData: punchMasterData } = punch_master_data.data;
        if (success === 1) {
            const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", getPunchMast_PostData);
            const { su, result_data: punchData } = punch_data.data;
            if (su === 1) {
                const maindata = await Promise.allSettled(
                    punchMasterData?.map(async (data, index) => {
                        const sortedShiftData = shiftDetails?.find((e) => e.shft_slno === data.shift_id)// SHIFT DATA
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

                        const employeeBasedPunchData = punchData.filter((e) => String(e.emp_code) === String(data.em_no));

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
                                    val.maximumLateInTime,
                                    halfday_time_count
                                )

                                return {
                                    punch_slno: val.punch_slno,
                                    punch_in: val.punch_in,
                                    punch_out: val.punch_out,
                                    duty_day: val.duty_day,
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
                                    Duty: format(new Date(val?.duty_day), 'dd-MM-yyy'),
                                    Shift_in: format(new Date(val?.shift_in), 'dd-MM-yyy HH:mm'),
                                    Shift_Out: format(new Date(val?.shift_out), 'dd-MM-yyy HH:mm'),
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
                            } else {
                                return { status: 0, message: "something went wrong", errorMessage: '' }
                            }
                        })
                    } else {
                        return { status: 0, message: "something went wrong", errorMessage: '' }
                    }
                })

                const mainarray = maindata?.data
                const dateRange = eachDayOfInterval({ start: new Date(fromdate), end: new Date(todate) })
                    ?.map(e => format(new Date(e), 'yyyy-MM-dd'));

                const resultss = [...new Set(mainarray?.map(e => e.em_no))]
                    ?.map((el) => {
                        const empArray = mainarray?.filter(e => e.em_no === el)
                        let emName = empArray?.find(e => e.em_no === el).name;
                        let deptName = empArray?.find(e => e.em_no === el).dept;
                        let sect_name = empArray?.find(e => e.em_no === el).sect;

                        return {
                            em_no: el,
                            emName: emName,
                            dateAray: dateRange?.map(e => format(new Date(e), 'dd')),
                            daysAry: dateRange?.map(e => format(new Date(e), 'eee')),
                            dept_name: deptName,
                            sect_name: sect_name,
                            punchMaster: dateRange?.map((e) => {

                                return {
                                    attDate: e,
                                    em_name: empArray?.find(em => em.duty_day === e)?.em_name ?? emName,

                                    duty_desc: empArray?.find(em => em.duty_day === e)?.duty_desc ?? 'A',
                                    lvereq_desc: empArray?.find(em => em.duty_day === e)?.lvereq_desc ?? 'A',

                                }
                            }),
                        }
                    })

                setEmpArray(resultss);
                setdaysStr(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.daysAry)
                setdaysNum(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.dateAray)
                setOpenBkDrop(false)
            } else {
                infoNofity("Punch Data Not Found")
                setOpenBkDrop(false)
            }
        } else {
            infoNofity("There Is No Dutyplan Data")
            setOpenBkDrop(false)
        }

    }, [fromdate, todate, hodlist, shiftDetails, commonSettings])





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

    if (isHodListLoading || isShiftDetailsLoading || isCommonDataLoading) return <p>Loading...</p>;
    if (isHodError || isShiftError || isCommonError) return <p>Error occurred.</p>;

    const toDownload = async () => {
        if (click === 0) {
            warningNofity("Please Click Search Button")
        } else {
            const fileName = "Attendance_Report";
            const headers = ["Name", "Emp Id", "Department", "Department Section", ...daysNum.map(val => val)];
            const days = ["Days", "", "", "", ...daysStr.map(val => val)];
            // Rows for Excel file
            const rows = empArray?.map(row => {
                const rowData = [
                    row.emName,
                    row.em_no,
                    row.dept_name,
                    row.sect_name,
                    ...row.punchMaster.map(val => val.lvereq_desc)
                ];
                return rowData;
            });

            // Prepare data for Excel export
            const excelData = [headers, days, ...rows];

            // Call ExporttoExcel function
            ExporttoExcel(excelData, fileName);
        }

    }

    return (
        <>
            <CustomBackDrop open={openBkDrop} text="Please wait !. " />

            <ToastContainer />
            <ReportWithFunction title="HOD`s Attendence Report" displayClose={true} download={toDownload} >
                <Paper variant='outlined' elevation={0} sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    // disableFuture={true}
                                    views={['day']}
                                    value={fromdate}
                                    maxDate={new Date()}
                                    inputFormat='dd-MM-yyyy'
                                    size="small"
                                    onChange={(newValue) => Setfromdate(newValue)}

                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>

                                            <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />

                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                            <Typography sx={{ p: 1 }}>To:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    // disableFuture={true}
                                    views={['day']}
                                    value={todate}
                                    inputFormat='dd-MM-yyyy'
                                    maxDate={endOfMonth(new Date(fromdate))}
                                    size="small"
                                    onChange={(newValue) => Settodate(newValue)}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>

                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', pl: 0.5,
                        }} >
                            <Tooltip title="Save" followCursor placement='top' arrow >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={getEmpdata}
                                    fullWidth
                                    startDecorator={<SearchIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Search
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>

                    {empArray.length > 0 ?

                        <Box sx={{ overflowY: "auto", width: "100%", height: window.innerHeight - 200, mt: 1 }}>
                            <Table
                                borderAxis="bothBetween"
                                // stripe="odd"
                                size="sm"
                                hoverRow
                                stickyHeader
                                sx={{
                                    '& tr > *:first-of-type': {
                                        position: 'sticky',
                                        left: 0,
                                        boxShadow: '1px 0 var(--TableCell-borderColor)',
                                        bgcolor: 'background.surface',


                                    },


                                }}
                            >
                                <thead  >
                                    <tr>
                                        <th style={{ width: 200, p: 0, m: 0 }}>Name</th>
                                        <th style={{ width: 100, p: 0, m: 0 }}>ID#</th>
                                        <th style={{ width: 100, p: 0, m: 0 }}>Department</th>
                                        <th style={{ width: 100, p: 0, m: 0 }}>Department Section</th>
                                        {daysNum && daysNum.map((val, index) => (
                                            <th key={index} style={{ width: 70, p: 0, m: 0, textAlign: "center", }}>
                                                {val}
                                            </th>
                                        ))}

                                    </tr>
                                    <tr>
                                        <th style={{ textAlign: "center", }}> Days </th>
                                        <th style={{ textAlign: "center", }}>  </th>
                                        <th style={{ textAlign: "center", }}>  </th>
                                        <th style={{ textAlign: "center", }}>  </th>
                                        {daysStr && daysStr.map((val, index) => (
                                            <th key={index} style={{}}>
                                                <Box sx={{
                                                    textAlign: "center",
                                                    textTransform: 'capitalize',
                                                    // color: val.holiday === 1 || val.sunday === '0' ? 'red' : '#212121'
                                                }} >
                                                    {val}
                                                </Box>
                                            </th>
                                        ))}

                                    </tr>
                                </thead>
                                <tbody>
                                    {empArray && empArray.map((row, index) => (
                                        <tr key={index} >
                                            <td >
                                                <Box > {row.emName}</Box>
                                            </td>
                                            <td >
                                                <Box sx={{ textAlign: "center", }}> {row?.em_no}</Box>
                                            </td>
                                            <td >
                                                <Box sx={{ textAlign: "center", }}> {row?.dept_name}</Box>
                                            </td>
                                            <td >
                                                <Box sx={{ textAlign: "center", }}> {row?.sect_name}</Box>
                                            </td>
                                            {row.punchMaster?.map((val, index) => (

                                                <td key={index} style={{

                                                    backgroundColor: val.lvereq_desc === "LC" ? "#F6FDC3" :
                                                        val.lvereq_desc === "A" ? "#FAD4D4" :
                                                            val.lvereq_desc === "CL" ? "#FFDEFA" :
                                                                val.lvereq_desc === "HD" ? "#CDF5FD" :
                                                                    val.lvereq_desc === "COFF" ? "#89CFF3" :
                                                                        val.lvereq_desc === "SL" ? "#FAD4D4" :
                                                                            val.lvereq_desc === "ODP" ? "#BAFFB4" :
                                                                                val.lvereq_desc === "OHP" ? "#A3F7BF" :
                                                                                    val.lvereq_desc === "EL" ? "#F0FFC2" :
                                                                                        val.lvereq_desc === "EGHD" ? "#B5EAEA" : null
                                                }}>
                                                    <Box sx={{
                                                        textAlign: "center",
                                                        color: val.duty_desc === "LC" ? "ORANGE" :
                                                            val.duty_desc === "A" ? "RED" : null
                                                    }}>
                                                        {val.lvereq_desc}

                                                    </Box>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>

                                {/* <Sheet /> */}
                            </Table>
                        </Box>
                        : null}



                </Paper>
            </ReportWithFunction>
        </>
    )
}

export default memo(HODAttendnaceReport) 