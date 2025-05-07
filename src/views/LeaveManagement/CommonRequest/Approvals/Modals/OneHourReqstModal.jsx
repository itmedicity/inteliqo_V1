import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box, } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, addHours, format, lastDayOfMonth, startOfMonth, subHours } from 'date-fns';
import { getAttendanceCalculation, getLateInTimeIntervel, punchInOutChecking } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';
import { useSelector } from 'react-redux';

const OneHourReqstModal = ({ open, setOpen, data, setCount }) => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [remark, setRemark] = useState('');
    const [details, setDetails] = useState(
        {
            slno: '',
            emno: '',
            name: '',
            section: '',
            status: '',
            reqDate: '',
            dutyDate: '',
            reason: '',
            shft_desc: '',
            checkIn: '',
            checkOut: '',
            inchargeComment: '',
            hodComment: '',
            ceoComment: '',
            emid: '',
            checkInFlag: 0,
            checkOutFlag: 0,
            increq: 0,
            incaprv: 0,
            shift_id: 0
        }
    )
    const { slno, emno, name, section, reqDate, dutyDate, reason, shft_desc,
        inchargeComment, hodComment, checkInFlag, checkOutFlag, dept_sect_id,
        one_hour_day, shift_id
    } = details;

    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)
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
        noff, // night off SHIFT ID
        halfday_time_count,
        comp_hour_count
    } = commonSettings; //COMMON SETTING

    //FIND THE CROSS DAY
    const crossDay = shiftData?.find(shft => shft.shft_slno === shift_id);
    //const { shft_chkin_time, shft_chkout_time } = crossDay;
    const crossDayStat = crossDay?.shft_cross_day ?? 0;


    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { slno, emno, name, section, status, requestDate, one_hour_duty_day, shft_desc,
                check_in, check_out, incharge_approval_comment, hod_approval_comment, reason,
                emid, checkin_flag, checkout_flag, increq, incaprv, one_hour_day, shift_id } = data;
            const details = {
                slno: slno,
                emno: emno,
                name: name,
                section: section,
                status: status,
                reqDate: requestDate,
                dutyDate: one_hour_duty_day,
                reason: reason,
                shft_desc: shft_desc,
                checkIn: check_in,
                checkOut: check_out,
                inchargeComment: incharge_approval_comment,
                hodComment: hod_approval_comment,
                emid: emid,
                checkInFlag: checkin_flag,
                checkOutFlag: checkout_flag,
                increq: increq,
                incaprv: incaprv,
                one_hour_day: one_hour_day,
                shift_id: shift_id
            }
            setDetails(details)
        } else {
            setDetails({})
        }
    }, [data])

    const hrReject = useMemo(() => {
        return {
            hr_approval_status: 2,
            hr_approval_comment: remark,
            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_empId: loginem_id,
            request_slno: slno,
            em_no: emno,
            duty_day: dutyDate
        }
    }, [remark, slno, loginem_id, emno, dutyDate])

    const handleRejectRequest = useCallback(async () => {
        if (remark === "") {
            infoNofity("Please Add Remarks!")
        } else {
            const result = await axioslogin.patch('/CommonReqst/hr/oneHour', hrReject)
            const { message, success } = result.data;
            if (success === 1) {
                setOpenBkDrop(false)
                setOpen(false)
                setCount(Math.random())
                succesNofity(message)
            } else {
                setOpenBkDrop(false)
                setOpen(false)
                setCount(Math.random())
                errorNofity(message)
            }
        }
    }, [remark, hrReject, setCount, setOpen])

    const handleApproverequest = useCallback(async () => {
        if (remark === "") {
            infoNofity("Please Add Remarks!")
        } else {
            setOpenBkDrop(true)
            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date(dutyDate)), 'yyyy-MM-dd'),
                section: dept_sect_id
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(dutyDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(dutyDate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Approve Halfday Leave Request!!  ")
                    setOpenBkDrop(false)
                    setOpen(false)
                } else {

                    const postData = {
                        preFromDate: format(subHours(new Date(dutyDate), comp_hour_count), 'yyyy-MM-dd 00:00:00'),
                        preToDate: crossDayStat === 0 ? format(addHours(new Date(dutyDate), comp_hour_count), 'yyyy-MM-dd 23:59:59') : format(addHours(new Date(addDays(new Date(dutyDate), 1)), comp_hour_count), 'yyyy-MM-dd 23:59:59'),
                        empList: [emno],
                    }

                    const punchmastData = {
                        empno: emno,
                        dutyday: format(new Date(dutyDate), 'yyyy-MM-dd')
                    }
                    const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData);
                    const { su, result_data } = punch_data.data;
                    if (su === 1) {
                        const punchaData = result_data;
                        const punch_master_data = await axioslogin.post("/attendCal/attendanceshiftdetl/", punchmastData); //GET PUNCH MASTER DATA
                        const { success, data } = punch_master_data.data;
                        if (success === 1) {
                            let shiftIn = `${format(new Date(dutyDate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkInTime), 'HH:mm:ss')}`;
                            let shiftOut = crossDayStat === 0 ? `${format(new Date(dutyDate), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}` :
                                `${format(addDays(new Date(dutyDate), 1), 'yyyy-MM-dd')} ${format(new Date(crossDay?.checkOutTime), 'HH:mm:ss')}`;

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
                                return Promise.allSettled(
                                    punchMasterMappedData?.map(async (val) => {

                                        const holidayStatus = val.holiday_status;
                                        const punch_In = checkInFlag === 1 ? new Date(shiftIn) : val.punch_in === null ? null : new Date(val.punch_in);
                                        const punch_out = checkOutFlag === 1 ? new Date(shiftOut) : val.punch_out === null ? null : new Date(val.punch_out);

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
                                            val.maximumLateInTime,
                                            halfday_time_count
                                        )

                                        return {
                                            punch_slno: val.punch_slno,
                                            punch_in: checkInFlag === 1 ? format(new Date(punch_In), 'yyyy-MM-dd HH:mm:ss') : val.punch_in,
                                            punch_out: checkOutFlag === 1 ? format(new Date(punch_out), 'yyyy-MM-dd HH:mm:ss') : val.punch_out,
                                            hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                                            late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                                            early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                                            duty_status: getAttendanceStatus?.duty_status,
                                            holiday_status: val.holiday_status,
                                            leave_status: 1,
                                            lvereq_desc: getAttendanceStatus?.lvereq_desc,
                                            duty_desc: 'OHP',
                                            lve_tble_updation_flag: 1,
                                            duty_day: format(new Date(dutyDate), 'yyyy-MM-dd'),

                                            hr_approval_status: 1,
                                            hr_approval_comment: remark,
                                            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
                                            hr_empId: loginem_id,
                                            request_slno: slno,
                                            em_no: emno,
                                        }
                                    })
                                ).then(async (element) => {
                                    const { value } = element[0];
                                    const result = await axioslogin.patch('/CommonReqst/hr/comment', value)
                                    const { success } = result.data;
                                    if (success === 1) {
                                        setOpenBkDrop(false)
                                        setOpen(false)
                                        setCount(Math.random())
                                        succesNofity("HR Approved Successfully!")
                                    } else {
                                        setOpenBkDrop(false)
                                        setOpen(false)
                                        setCount(Math.random())
                                        errorNofity("Error Occured! Contact IT")
                                    }
                                })
                            })

                        } else {
                            warningNofity("There Is No Punchmast Data!")
                        }
                    } else {
                        warningNofity("There Is No Punch Data!")
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [remark, dutyDate, dept_sect_id, setCount, setOpen, emno, checkInFlag, checkOutFlag,
        cmmn_early_out, cmmn_grace_period, cmmn_late_in, comp_hour_count, crossDay, crossDayStat,
        default_shift, halfday_time_count, loginem_id, noff, notapplicable_shift, salary_above,
        slno, week_off_day])


    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)
                }
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
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >
                            {section}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center', px: 1, borderBlockStyle: 'outset',
                            flexDirection: 'column',
                        }} >
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Request Date
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{reqDate}
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
                                    :{shft_desc}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    One Hour day
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{one_hour_day}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    One Hour Time
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{checkInFlag === 1 ? 'In Punch Time' : checkOutFlag === 1 ? 'Out Punch Time' : null}
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
                                    :{reason}
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
                                    :{inchargeComment === null ? 'NIL' : inchargeComment === '' ? 'NIL' : inchargeComment}
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
                                    :{hodComment === null ? 'NIL' : hodComment === '' ? 'NIL' : hodComment}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Remark For Approve/Reject The Request here…"
                            variant="outlined" onChange={(e) => setRemark(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRejectRequest}>
                                Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(OneHourReqstModal) 