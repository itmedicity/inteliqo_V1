import React, { Fragment, useCallback, memo, useMemo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { employeeNumber } from 'src/views/Constant/Constant';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { addDays, addHours, format, lastDayOfMonth, startOfMonth, subHours } from 'date-fns';
import { useSelector } from 'react-redux';
import { getAttendanceCalculation, getLateInTimeIntervel, punchInOutChecking } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';

const HalfDayLeaveRequest = ({ open, setOpen, data, setCount }) => {

    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)
    //DISPLAY THE DATA 
    const { slno, emno, name, section, status, reqDate, dept_section, leaveDate, shift_id,
        planslno, checkIn, checkOut, month, halfday_status } = data;

    const shiftData = useSelector((state) => state?.getShiftList?.shiftDetails)
    const commonSettings = useSelector((state) => state?.getCommonSettings)

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

    //FIND THE CROSS DAY
    const crossDay = shiftData?.find(shft => shft.shft_slno === shift_id);
    //const { shft_chkin_time, shft_chkout_time } = crossDay;
    const crossDayStat = crossDay?.shft_cross_day ?? 0;


    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        if (reason === '') {
            warningNofity("Plaese Add Remark")
            setOpenBkDrop(false)
        } else {
            //UPDATE LEAVE MASTER TABLE

            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                section: dept_section
            }

            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(leaveDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(leaveDate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Approve Halfday Leave Request!!  ")
                    setOpenBkDrop(false)
                    setOpen(false)
                } else {

                    const postData = {
                        preFromDate: format(subHours(new Date(leaveDate), 8), 'yyyy-MM-dd 00:00:00'),
                        preToDate: crossDayStat === 0 ? format(addHours(new Date(leaveDate), 8), 'yyyy-MM-dd 23:59:59') : format(addHours(new Date(addDays(new Date(leaveDate), 1)), 8), 'yyyy-MM-dd 23:59:59'),
                        empList: emno,
                    }
                    const punchmastData = {
                        empno: emno,
                        dutyday: format(new Date(leaveDate), 'yyyy-MM-dd')
                    }

                    const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData);
                    const { su, result_data } = punch_data.data;
                    if (su === 1) {
                        const punchaData = result_data;
                        const punch_master_data = await axioslogin.post("/attendCal/attendanceshiftdetl/", punchmastData); //GET PUNCH MASTER DATA
                        const { success, data } = punch_master_data.data;
                        if (success === 1) {
                            let shiftIn = `${format(new Date(leaveDate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkInTime), 'HH:mm:ss')}`;
                            let shiftOut = crossDayStat === 0 ? `${format(new Date(leaveDate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}` :
                                `${format(addDays(new Date(leaveDate), 1), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}`;

                            return Promise.allSettled(
                                data?.map(async (row, index) => {
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
                                        holidayStatus: crossDay?.holiday_status
                                    }

                                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                                    return await punchInOutChecking(shiftMergedPunchMaster, punchaData)
                                })
                            ).then((data) => {
                                const punchMasterMappedData = data?.map((e) => e.value)
                                //console.log(punchMasterMappedData);
                                return Promise.allSettled(
                                    punchMasterMappedData?.map(async (val) => {

                                        const holidayStatus = val.holiday_status;
                                        const punch_In = halfday_status === 1 ? new Date(shiftIn) : new Date(val.punch_in);
                                        const punch_out = halfday_status === 2 ? new Date(shiftOut) : new Date(val.punch_out);

                                        const shift_in = new Date(shiftIn);
                                        const shift_out = new Date(shiftOut);

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
                                            punch_in: halfday_status === 1 ? format(new Date(punch_In), 'yyyy-MM-dd HH:mm:ss') : val.punch_in,
                                            punch_out: halfday_status === 2 ? format(new Date(punch_out), 'yyyy-MM-dd HH:mm:ss') : val.punch_out,
                                            hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                                            late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                                            early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                                            duty_status: getAttendanceStatus?.duty_status,
                                            holiday_status: val.holiday_status,
                                            leave_status: 1,
                                            lvereq_desc: getAttendanceStatus?.lvereq_desc,
                                            duty_desc: 'HCL',
                                            lve_tble_updation_flag: 1,
                                            duty_day: format(new Date(leaveDate), 'yyyy-MM-dd'),
                                            hf_hr_apprv_status: 1,
                                            em_no: emno,
                                            hf_hr_apprv_cmnt: reason,
                                            planSlno: planslno,
                                            hf_hr_apprv_date: format(new Date(), 'yyyy-MM-dd '),
                                            hf_hr_uscode: employeeNumber(),
                                            half_slno: slno
                                        }
                                    })
                                ).then(async (element) => {
                                    const { value } = element[0];
                                    console.log(value);
                                    const resultdel = await axioslogin.patch(`/LeaveRequestApproval/Hrhalfday`, value);
                                    const { success, message } = await resultdel.data;
                                    if (success === 1) {
                                        setOpenBkDrop(false)
                                        setCount(Math.random())
                                        succesNofity('Leave Request Approved')
                                        setOpen(false)
                                    }
                                    else {
                                        succesNofity(message)
                                    }
                                })
                            })

                        }
                    }

                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [setCount, setOpen, reason, slno, leaveDate, emno, dept_section, crossDay, cmmn_early_out, cmmn_grace_period,
        cmmn_late_in, crossDayStat, default_shift, noff, notapplicable_shift, salary_above,
        week_off_day, halfday_status, planslno])

    const LeaveRejectdata = useMemo(() => {
        return {
            hf_hr_apprv_status: 2,
            hf_hr_apprv_cmnt: reason,
            hf_hr_apprv_date: moment().format('YYYY-MM-DD HH:mm'),
            hf_hr_uscode: employeeNumber(),
            half_slno: slno,
            hrm_cl_slno: planslno
        }
    }, [reason, planslno, slno])
    // HALF DAY LEAVE HR REJECT
    const handleRegectRequest = useCallback(async () => {
        const result = await axioslogin.patch(`/LeaveRequestApproval/HalfDayReqRejectHr`, LeaveRejectdata);
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
            setCount(Math.random())
            errorNofity('Error Updating Leave Request')
        }
    }, [LeaveRejectdata, setOpen, setCount])

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
                    <Box sx={{ mt: 0.5, pt: 1 }} >
                        <Typography variant="outlined" color="success">
                            {status}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                        <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Request Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(reqDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                        <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Leave Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(leaveDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Requested HalfDay Leave Information.
                        </Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}  >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Check In:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {moment(checkIn).format('hh:mm:ss')}
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ pl: 2 }} >
                                    Check Out:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {moment(checkOut).format('hh:mm:ss')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Month of Leave:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                    {month}
                                </Typography>
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
                                Leave Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                Leave Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>

    )
}

export default memo(HalfDayLeaveRequest)

