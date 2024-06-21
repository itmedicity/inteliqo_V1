import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { employeeNumber } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

const OndutyReqstModal = ({ open, setOpen, data, setCount, count, authority }) => {

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
            emid: 0
        }
    )
    const { slno, emno, name, section, status, reqDate, dutyDate, reason, shft_desc,
        inchargeComment, hodComment, ceoComment, dept_sect_id } = details;

    const [shiftData, setShiftData] = useState({})

    const shiftInformation = useSelector((state) => state.getDutyPlannedShift.shiftInformation, _.isEqual);

    useEffect(() => {
        setShiftData(shiftInformation?.[0])
    }, [shiftInformation])

    const {
        shft_chkin_time,
        shft_chkout_time,
    } = shiftData || {};

    const inTime = moment(shft_chkin_time).format('HH:mm:ss');
    const outTime = moment(shft_chkout_time).format('HH:mm:ss');

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { slno, emno, name, section, status, reqDate, onDutydate, shft_desc,
                reason, check_in, check_out, inchargeComment, hodComment, ceoComment, emid,
                shiftId } = data[0];
            const details = {
                slno: slno,
                emno: emno,
                name: name,
                section: section,
                status: status,
                reqDate: reqDate,
                dutyDate: onDutydate,
                reason: reason,
                shft_desc: shft_desc,
                checkIn: check_in,
                checkOut: check_out,
                inchargeComment: inchargeComment,
                hodComment: hodComment,
                ceoComment: ceoComment,
                emid: emid,
                shiftId: shiftId
            }
            setDetails(details)
        } else {
            setDetails({})
        }

    }, [data])

    const rejectData = useMemo(() => {
        return {
            incharge_approval_status: 2,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const approveData = useMemo(() => {
        return {
            incharge_approval_status: 1,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const hodApprove = useMemo(() => {
        return {
            hod_approval_status: 1,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const hodReject = useMemo(() => {
        return {
            hod_approval_status: 2,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const ceoreject = useMemo(() => {
        return {
            ceo_approval_status: 2,
            ceo_approval_comment: remark,
            ceo_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            ceo_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const ceoApprove = useMemo(() => {
        return {
            ceo_approval_status: 1,
            ceo_approval_comment: remark,
            ceo_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            ceo_empid: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const hrReject = useMemo(() => {
        return {
            hr_approval_status: 2,
            hr_approval_comment: remark,
            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_empId: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno])

    const hrApprove = useMemo(() => {
        return {
            punch_in: `${moment(dutyDate).format('YYYY-MM-DD')} ${inTime}`,
            punch_out: `${moment(dutyDate).format('YYYY-MM-DD')} ${outTime}`,
            emno: emno,
            duty_day: moment(dutyDate).format('YYYY-MM-DD'),
            hr_approval_status: 1,
            hr_approval_comment: remark,
            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_empId: employeeNumber(),
            onduty_slno: slno
        }
    }, [remark, slno, inTime, dutyDate, outTime, emno])

    const handleRejectRequest = async () => {
        if (authority === 1) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/incharge/onduty', rejectData)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        } else if (authority === 2) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/hod/onduty', hodReject)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        } else if (authority === 3) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/ceo/onduty', ceoreject)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setCount(count + 1)
                    setOpen(false)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        }
        else if (authority === 4) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/hr/onduty', hrReject)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        }
    }

    const handleApproverequest = async () => {
        setOpenBkDrop(true)
        if (authority === 1) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                setOpenBkDrop(true)
                const result = await axioslogin.patch('/CommonReqst/incharge/onduty', approveData)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        } else if (authority === 2) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                setOpenBkDrop(true)
                const result = await axioslogin.patch('/CommonReqst/hod/onduty', hodApprove)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setCount(count + 1)
                    setOpen(false)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        } else if (authority === 3) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                setOpenBkDrop(true)
                const result = await axioslogin.patch('/CommonReqst/ceo/onduty', ceoApprove)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    succesNofity(message)
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setCount(count + 1)
                    errorNofity(message)
                }
            }
        } else if (authority === 4) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                setOpenBkDrop(true)

                const postDataForAttendaceMark = {
                    month: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
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
                        const result = await axioslogin.patch('/CommonReqst/hr/onduty/comment', hrApprove)
                        const { message, success } = result.data;
                        if (success === 1) {
                            setOpenBkDrop(false)
                            setOpen(false)
                            setCount(count + 1)
                            succesNofity(message)
                        } else {
                            setOpenBkDrop(false)
                            setOpen(false)
                            setCount(count + 1)
                            errorNofity(message)
                        }
                    }
                } else {
                    errorNofity("Error getting PunchMarkingHR ")
                }


            }
        }
    }

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
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >
                            {section}
                        </Typography>
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
                                On Duty Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(dutyDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Requested On Duty Information.
                        </Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Shift:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {shft_desc}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Reason:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {reason}
                                </Typography>
                            </Box>
                        </Box>
                        {
                            authority === 2 || authority === 3 || authority === 4 ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Incharge Comment:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {inchargeComment === null ? 'NIL' : inchargeComment}
                                </Typography>
                            </Box> : null
                        }
                        {
                            authority === 3 || authority === 4 ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Hod Comment:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {hodComment === null ? 'NIL' : hodComment}
                                </Typography>
                            </Box> : null
                        }
                        {
                            authority === 4 ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Ceo Comment:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {ceoComment === null ? 'NIL' : ceoComment}
                                </Typography>
                            </Box> : null
                        }
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