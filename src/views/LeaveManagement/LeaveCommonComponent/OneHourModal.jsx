import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';


const OneHourModal = ({ setOpen, open, authority, empData, setCount }) => {

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
            emid: '',
            checkInFlag: 0,
            checkOutFlag: 0,
            increq: 0,
            incaprv: 0
        }
    )
    const { slno, emno, name, section, reqDate, dutyDate, reason, shft_desc,
        inchargeComment, checkInFlag, checkOutFlag, increq, incaprv,
    } = details;


    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    useEffect(() => {
        if (Object.keys(empData).length !== 0) {
            const { slno, em_no, em_name, sect_name, status, requestDate, shft_desc,
                check_in, check_out, incharge_approval_comment, hod_approval_comment, reason, one_hour_duty_day,
                em_id, checkin_flag, checkout_flag, incharge_req_status, incharge_approval_status } = empData;
            const details = {
                slno: slno,
                emno: em_no,
                name: em_name,
                section: sect_name,
                status: status,
                reqDate: requestDate,
                dutyDate: one_hour_duty_day,
                reason: reason,
                shft_desc: shft_desc,
                checkIn: check_in,
                checkOut: check_out,
                inchargeComment: incharge_approval_comment,
                hodComment: hod_approval_comment,
                emid: em_id,
                checkInFlag: checkin_flag,
                checkOutFlag: checkout_flag,
                increq: incharge_req_status,
                incaprv: incharge_approval_status
            }
            setDetails(details)
        } else {
            setDetails({})
        }
    }, [empData])

    const rejectData = useMemo(() => {
        return {
            incharge_approval_status: 2,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: loginem_id,
            request_slno: slno,
            em_no: emno,
            duty_day: dutyDate
        }
    }, [remark, slno, loginem_id, emno])

    const approveData = useMemo(() => {
        return {
            incharge_approval_status: 1,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: loginem_id,
            request_slno: slno
        }
    }, [remark, slno, loginem_id])


    const hodApprove = useMemo(() => {
        return {
            hod_approval_status: 1,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: loginem_id,
            request_slno: slno
        }
    }, [remark, slno, loginem_id])

    const hodReject = useMemo(() => {
        return {
            hod_approval_status: 2,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: loginem_id,
            request_slno: slno,
            em_no: emno,
            duty_day: dutyDate
        }
    }, [remark, slno, loginem_id, emno, dutyDate])

    const handleRejectRequest = useCallback(async () => {
        if (authority === 1) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/incharge/inactiveOnehour', rejectData)
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
        } else if (authority === 2) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/CommonReqst/hod/inactive/onehour', hodReject)
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
    }, [rejectData, hodReject, remark, authority, setCount, setOpen])

    const handleApproverequest = useCallback(async () => {
        if (authority === 1) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                setOpenBkDrop(true)
                const result = await axioslogin.patch('/CommonReqst/incharge/onehour', approveData)
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
        } else if (authority === 2) {
            if (remark === "") {
                infoNofity("Please Add Remarks!")
            } else {
                if (increq === 1 && incaprv === 0) {
                    setOpenBkDrop(true)
                    const result = await axioslogin.patch('/CommonReqst/incharge/onehour', approveData)
                    const { message, success } = result.data;
                    if (success === 1) {
                        const result = await axioslogin.patch('/CommonReqst/hod/onehour', hodApprove)
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
                } else {
                    setOpenBkDrop(true)
                    const result = await axioslogin.patch('/CommonReqst/hod/onehour', hodApprove)
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
        }
    }, [remark, hodApprove, approveData, authority, increq, incaprv, setCount, setOpen])

    return (
        <>
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
                                    : {moment(dutyDate).format('DD-MM-YYYY')}
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
                        {
                            authority === 2 ? <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Incharge Comment
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{inchargeComment === "" ? 'NIL' : inchargeComment === null ? 'NIL' : inchargeComment}
                                    </Typography>
                                </Box>
                            </Box> : null
                        }
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
        </>
    )
}

export default memo(OneHourModal) 