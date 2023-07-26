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
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';

const EnableMispunchmodal = ({ open, setOpen, data, setCount, count, authority }) => {


    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [miss, setMis] = useState('');
    const [remark, setRemark] = useState('');
    const [details, setDetails] = useState(
        {
            slno: '',
            emno: '',
            name: '',
            section: '',
            status: '',
            reqDate: '',
            punchDate: '',
            reason: '',
            shft_desc: '',
            inchargeComment: '',
            hodComment: '',
            ceoComment: '',
            emid: '',
            checkInFlag: 0,
            checkOutFlag: 0,
            checkIn: '',
            checkOut: '',
        }
    )
    const { slno, emno, name, section, status, reqDate, punchDate, reason, shft_desc,
        inchargeComment, hodComment, ceoComment, checkInFlag, checkOutFlag,
        checkIn, checkOut, } = details;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { slno, emno, name, section, status, reqDate, punchDate, shft_desc,
                check_in, check_out, checkInflag, checkoutflag, reason, inchargeComment,
                hodComment, ceoComment, emid } = data[0];
            const details = {
                slno: slno,
                emno: emno,
                name: name,
                section: section,
                status: status,
                reqDate: reqDate,
                punchDate: punchDate,
                reason: reason,
                shft_desc: shft_desc,
                checkIn: check_in,
                checkOut: check_out,
                inchargeComment: inchargeComment,
                hodComment: hodComment,
                ceoComment: ceoComment,
                emid: emid,
                checkInFlag: checkInflag,
                checkOutFlag: checkoutflag
            }
            setDetails(details)
            setMis(checkInflag === 1 ? check_in : checkoutflag === 1 ? check_out : null)
        }
        else {
            setDetails({})
        }
    }, [data])

    const NoPunchRejectdata = useMemo(() => {
        return {
            incharge_approval_status: 2,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const hodReject = useMemo(() => {
        return {
            hod_approval_status: 2,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const ceoreject = useMemo(() => {
        return {
            ceo_approval_status: 2,
            ceo_approval_comment: remark,
            ceo_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            ceo_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const hrReject = useMemo(() => {
        return {
            hr_approval_status: 2,
            hr_approval_comment: remark,
            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_empId: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const handleRejectRequest = async () => {
        if (authority === 1) {
            const result = await axioslogin.patch('/CommonReqst/incharge/enable', NoPunchRejectdata)
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
        } else if (authority === 2) {

            const result = await axioslogin.patch('/CommonReqst/hod/enable', hodReject)
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
        } else if (authority === 3) {
            const result = await axioslogin.patch('/CommonReqst/ceo/enable', ceoreject)
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
        else if (authority === 4) {
            const result = await axioslogin.patch('/CommonReqst/hr/enable', hrReject)
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


    const NoPunchApprovedata = useMemo(() => {
        return {
            incharge_approval_status: 1,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])


    const hodApprove = useMemo(() => {
        return {
            hod_approval_status: 1,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const ceoApprove = useMemo(() => {
        return {
            ceo_approval_status: 1,
            ceo_approval_comment: remark,
            ceo_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            ceo_empid: employeeNumber(),
            slno: slno
        }
    }, [remark, slno])

    const hrApprove = useMemo(() => {
        return {
            id: 99999999,
            emp_code: emno,
            punch_time: checkInFlag === 1 ? checkIn : checkOutFlag === 1 ? checkOut : null,
            punch_state: checkInFlag === 1 ? 0 : 1,
            enabled_punch_flag: 1,
            hr_approval_status: 1,
            hr_approval_comment: remark,
            hr_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_empId: employeeNumber(),
            slno: slno
        }
    }, [remark, slno, emno, checkInFlag, checkOutFlag, checkIn, checkOut])


    const handleApproverequest = async () => {
        if (authority === 1) {
            setOpenBkDrop(true)
            const result = await axioslogin.patch('/CommonReqst/incharge/enable', NoPunchApprovedata)
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
        } else if (authority === 2) {
            setOpenBkDrop(true)
            const result = await axioslogin.patch('/CommonReqst/hod/enable', hodApprove)
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

        } else if (authority === 3) {
            setOpenBkDrop(true)
            const result = await axioslogin.patch('/CommonReqst/ceo/enable', ceoApprove)
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
        } else if (authority === 4) {
            setOpenBkDrop(true)
            const result = await axioslogin.patch('/CommonReqst/hr/enable/comment', hrApprove)
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


    return (
        <Fragment>
            <ToastContainer />
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
                                Miss Punch Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(punchDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Requested Miss Punch Information.
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
                                    Time:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {miss}
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
                            {
                                authority === 2 || authority === 3 ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
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

export default memo(EnableMispunchmodal) 