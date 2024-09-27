import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

const OndutyReqstModal = ({ open, setOpen, data, setCount }) => {

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
            inchargeComment: '',
            hodComment: '',
            ceoComment: '',
            checkIn: '',
            checkOut: '',
            emid: 0,
            on_duty_date: '',
            gross_salary: 0,
            em_id: 0
        }
    )
    const { slno, emno, name, section, reqDate, dutyDate, reason, shft_desc,
        inchargeComment, hodComment, dept_sect_id, on_duty_date, gross_salary, em_id } = details;

    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    const [shiftData, setShiftData] = useState({})

    const shiftInformation = useSelector((state) => state.getDutyPlannedShift.shiftInformation, _.isEqual);
    const state = useSelector((state) => state?.getCommonSettings)
    const commonSetting = useMemo(() => state, [state])
    const { salary_above } = commonSetting;

    useEffect(() => {
        setShiftData(shiftInformation?.[0])
    }, [shiftInformation])

    const {
        shft_chkin_time,
        shft_chkout_time,
        holiday
    } = shiftData || {};

    const inTime = moment(shft_chkin_time).format('HH:mm:ss');
    const outTime = moment(shft_chkout_time).format('HH:mm:ss');

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { slno, emno, name, section, status, requestDate, on_dutydate, shft_desc,
                onduty_reason, incharge_approval_comment, hod_approval_comment, emid, on_duty_date,
                shiftId, gross_salary, em_id } = data;
            const details = {
                slno: slno,
                emno: emno,
                name: name,
                section: section,
                status: status,
                reqDate: requestDate,
                dutyDate: on_dutydate,
                reason: onduty_reason,
                shft_desc: shft_desc,
                inchargeComment: incharge_approval_comment,
                hodComment: hod_approval_comment,
                emid: emid,
                shiftId: shiftId,
                on_duty_date: on_duty_date,
                gross_salary: gross_salary,
                em_id: em_id
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
            hr_approval_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            hr_empId: loginem_id,
            onduty_slno: slno
        }
    }, [remark, slno, loginem_id])

    const handleRejectRequest = useCallback(async () => {
        if (remark === "") {
            infoNofity("Please Add Remarks!")
        } else {
            const result = await axioslogin.patch('/CommonReqst/hr/onduty', hrReject)
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
        setOpenBkDrop(true)

        if (remark === "") {
            infoNofity("Please Add Remarks!")
        } else {
            const hrApprove = {
                punch_in: `${moment(on_duty_date).format('YYYY-MM-DD')} ${inTime}`,
                punch_out: `${moment(on_duty_date).format('YYYY-MM-DD')} ${outTime}`,
                lvereq_desc: holiday === 1 && gross_salary <= salary_above ? 'HP' : 'ODP',
                emno: emno,
                hr_approval_status: 1,
                duty_day: `${moment(on_duty_date).format('YYYY-MM-DD')}`,
                hr_approval_comment: remark,
                hr_approval_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                hr_empId: loginem_id,
                onduty_slno: slno
            }
            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date(on_duty_date)), 'yyyy-MM-dd'),
                section: dept_sect_id
            }

            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(on_duty_date)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(on_duty_date)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Approve Halfday Leave Request!!  ")
                    setOpenBkDrop(false)
                    setOpen(false)
                } else {

                    if (holiday === 1 && gross_salary <= salary_above) {
                        const result = await axioslogin.patch('/CommonReqst/hr/onduty/comment', hrApprove)
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
                    } else if (holiday === 1 && gross_salary > salary_above) {
                        const credit = {
                            emp_id: em_id,
                            calculated_date: format(new Date(on_duty_date), 'yyyy-MM-dd'),
                            credited_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                            lvetype_slno: 11,
                        }
                        const result = await axioslogin.post('/CommonReqst/creditoff/insert', credit)
                        const { message, success } = result.data;
                        if (success === 1) {
                            const result = await axioslogin.patch('/CommonReqst/hr/onduty/comment', hrApprove)
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
                        } else {
                            setOpenBkDrop(false)
                            setOpen(false)
                            setCount(Math.random())
                            errorNofity(message)
                        }
                    }
                    else {
                        const result = await axioslogin.patch('/CommonReqst/hr/onduty/comment', hrApprove)
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
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [on_duty_date, dept_sect_id, remark, setCount, setOpen, holiday, salary_above, em_id,
        emno, gross_salary, inTime, loginem_id, outTime, slno])

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
                            {`employee ID#`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >
                            {section}
                        </Typography>
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
                                        On Duty Day
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{dutyDate}
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
                    </Paper>
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

export default memo(OndutyReqstModal) 