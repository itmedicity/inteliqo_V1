import React, { Fragment, useCallback, memo, useMemo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { addDays, addHours, format, lastDayOfMonth, startOfMonth, subHours } from 'date-fns';
import { useSelector } from 'react-redux';
import { getAttendanceCalculation, getLateInTimeIntervel, punchInOutChecking } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc'

const NoPunchLeaveRequest = ({ open, setOpen, data, setCount }) => {

    const misspunchdata = useMemo(() => data, [data])

    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)
    // const [punchslno, setPuncslno] = useState(0)

    //DISPLAY THE DATA 
    const { slno, emno, name, section, dept_section, shift_id, nopunchdate,
        checkinflag, checkoutflag } = misspunchdata;

    const shiftData = useSelector((state) => state?.getShiftList?.shiftDetails)
    const commonSettings = useSelector((state) => state?.getCommonSettings)
    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff, // night off SHIFT ID,
        halfday_time_count,
        doff,//duty off 24, DA, respiratory 
        coff_min_working_hour,//credit off minimum working hour
        holiday_min_working// holiday min hour exist or not
    } = commonSettings; //COMMON SETTING

    //FIND THE CROSS DAY
    const crossDay = shiftData?.find(shft => shft.shft_slno === shift_id);
    //const { shft_chkin_time, shft_chkout_time } = crossDay;
    const crossDayStat = crossDay?.shft_cross_day ?? 0;

    const handleApproverequest = useCallback(async () => {
        // setOpenBkDrop(true)

        if (reason === '') {
            warningNofity("Plaese Add Remark")
            setOpenBkDrop(false)
        } else {
            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                section: dept_section
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(nopunchdate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(nopunchdate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Approve Halfday Leave Request!!  ")
                    setOpenBkDrop(false)
                    setOpen(false)
                } else {


                    const postData = {
                        preFromDate: format(subHours(new Date(nopunchdate), 8), 'yyyy-MM-dd 00:00:00'),
                        preToDate: crossDayStat === 0 ? format(addHours(new Date(nopunchdate), 8), 'yyyy-MM-dd 23:59:59') : format(addHours(new Date(addDays(new Date(nopunchdate), 1)), 8), 'yyyy-MM-dd 23:59:59'),
                        empList: emno,
                    }
                    const punchmastData = {
                        empno: emno,
                        dutyday: format(new Date(nopunchdate), 'yyyy-MM-dd')
                    }

                    const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData);
                    const { su, result_data } = punch_data.data;
                    if (su === 1) {
                        const punchaData = result_data;
                        const punch_master_data = await axioslogin.post("/attendCal/attendanceshiftdetl/", punchmastData); //GET PUNCH MASTER DATA
                        const { data } = punch_master_data.data;


                        let shiftIn = `${format(new Date(nopunchdate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkInTime), 'HH:mm:ss')}`;
                        let shiftOut = crossDayStat === 0 ? `${format(new Date(nopunchdate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}` :
                            `${format(addDays(new Date(nopunchdate), 1), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}`;

                        return Promise.allSettled(
                            data?.map(async (row, index) => {

                                //const sortedShiftData = shiftData?.find((e) => e.shft_slno === shift_id)// SHIFT DATA
                                //const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                                const shiftMergedPunchMaster = {
                                    ...row,
                                    shft_chkin_start: crossDay?.shft_chkin_start,
                                    shft_chkin_end: crossDay?.shft_chkin_end,
                                    shft_chkout_start: crossDay?.shft_chkout_start,
                                    shft_chkout_end: crossDay?.shft_chkout_end,
                                    shft_cross_day: crossDay?.shft_cross_day,
                                    gross_salary: crossDay?.gross_salary,
                                    earlyGoingMaxIntervl: cmmn_early_out,
                                    gracePeriodInTime: cmmn_grace_period,
                                    maximumLateInTime: cmmn_late_in,
                                    salaryLimit: salary_above,
                                    woff: week_off_day,
                                    naShift: notapplicable_shift,
                                    defaultShift: default_shift,
                                    noff: noff,
                                    holidayStatus: crossDay?.holiday_status,
                                    doff: doff,
                                    coff_min_working_hour: coff_min_working_hour,
                                    holiday_min_working: holiday_min_working
                                }

                                //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                                return await punchInOutChecking(shiftMergedPunchMaster, punchaData)
                            })
                        ).then((data) => {
                            const punchMasterMappedData = data?.map((e) => e.value)
                            return Promise.allSettled(
                                punchMasterMappedData?.map(async (val) => {
                                    const holidayStatus = val.holiday_status;
                                    const punch_In = checkinflag === 1 ? new Date(shiftIn) : val.punch_in === null ? null : new Date(val.punch_in);
                                    const punch_out = checkoutflag === 1 ? new Date(shiftOut) : val.punch_out === null ? null : new Date(val.punch_out);

                                    const shift_in = new Date(val.shift_in);
                                    const shift_out = new Date(val.shift_out);

                                    const getLateInTime = await getLateInTimeIntervel(punch_In, shift_in, punch_out, shift_out)

                                    //SALARY LINMIT
                                    const salaryLimit = val.gross_salary > val.salaryLimit ? true : false;

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
                                        halfday_time_count,
                                        doff,
                                        coff_min_working_hour,
                                        holiday_min_working
                                    )
                                    return {
                                        punch_slno: val.punch_slno,
                                        punch_in: checkinflag === 1 ? format(new Date(punch_In), 'yyyy-MM-dd HH:mm:ss') : val.punch_in,
                                        punch_out: checkoutflag === 1 ? format(new Date(punch_out), 'yyyy-MM-dd HH:mm:ss') : val.punch_out,
                                        hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                                        late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                                        early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                                        duty_status: getAttendanceStatus?.duty_status,
                                        holiday_status: val.holiday_status,
                                        leave_status: 1,
                                        lvereq_desc: getAttendanceStatus?.lvereq_desc,
                                        duty_desc: 'MPP',
                                        lve_tble_updation_flag: 1,
                                        status: 1,
                                        comment: reason,
                                        em_no: emno,
                                        duty_day: format(new Date(nopunchdate), 'yyyy-MM-dd'),
                                        apprvdate: format(new Date(), 'yyyy-MM-dd '),
                                        us_code: loginem_id,
                                        slno: slno
                                    }
                                })
                            ).then(async (element) => {
                                const { value } = element[0];
                                const resultdel = await axioslogin.patch(`/LeaveRequestApproval/HrNopunch`, value);
                                const { success, message } = await resultdel.data;
                                if (success === 1) {
                                    setOpenBkDrop(false)
                                    setCount(Math.random())
                                    succesNofity('Miss punch Request Approved')
                                    setOpen(false)
                                }
                                else {
                                    errorNofity(message)
                                }
                            })
                        })
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [reason, setCount, setOpen, slno, dept_section, nopunchdate, crossDay, cmmn_early_out,
        cmmn_grace_period, cmmn_late_in, crossDayStat, default_shift, emno, noff, notapplicable_shift,
        salary_above, week_off_day, checkinflag, checkoutflag, loginem_id, halfday_time_count,
        coff_min_working_hour, doff, holiday_min_working])

    const NoPunchRejectdata = useMemo(() => {
        return {
            np_hr_apprv_status: 2,
            np_hr_apprv_cmnt: reason,
            np_hr_apprv_time: format(new Date(), 'yyyy-MM-dd HH:mm'),
            np_hr_uscode: loginem_id,
            nopunch_slno: slno,
            em_no: emno,
            duty_day: nopunchdate
        }
    }, [reason, slno, loginem_id, emno, nopunchdate])

    // HALF DAY LEAVE HR REJECT
    const handleRegectRequest = useCallback(async () => {
        const result = await axioslogin.patch(`/LeaveRequestApproval/NoPunchReqRejectHr`, NoPunchRejectdata);
        const { success } = result.data
        if (success === 1) {
            setOpenBkDrop(false)
            setOpen(false)
            setCount(Math.random())
            succesNofity('Leave Request Reject')
        }
        else {
            setOpenBkDrop(false)
            setOpen(false)
            setCount(Math.random)
            errorNofity('Error Updating Leave Request')
        }
    }, [NoPunchRejectdata, setCount, setOpen])


    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center', }} >
                        <Typography
                            fontSize="xl2"
                            lineHeight={1}
                            startDecorator={
                                <EmojiEmotionsOutlinedIcon sx={{ color: 'green' }} />
                            }
                            sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            lineHeight={1}
                            component="h3"
                            id="modal-title"
                            level="h5"
                            textColor="inherit"
                            fontWeight="md"
                            // mb={1}
                            endDecorator={<Typography
                                level="h6"
                                justifyContent="center"
                                alignItems="center"
                                alignContent='center'
                                lineHeight={1}
                            >
                                {emno}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{section}</Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box
                            sx={{
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', px: 1, flexDirection: 'column',
                            }} >
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Request Date
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.requestDate}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Shift
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.shft_desc}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Miss Punch Day
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.nopunch_date}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Miss Punch Time
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{checkinflag === 1 ? 'In Time' : checkoutflag === 1 ? 'Out Time' : 'NIL'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Reason
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.np_reason}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Incharge Comment
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.np_inc_apprv_cmnt === null ? 'NIL' : misspunchdata?.np_inc_apprv_cmnt === '' ? 'NIL' : misspunchdata?.np_inc_apprv_cmnt}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Hod Comment
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{misspunchdata?.np_hod_apprv_cmnt === null ? 'NIL' : misspunchdata?.np_hod_apprv_cmnt === '' ? 'NIL' : misspunchdata?.np_hod_apprv_cmnt}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Approve/Reject The Request here…"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Nopunch Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                Nopunch Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>

    )
}
export default memo(NoPunchLeaveRequest)