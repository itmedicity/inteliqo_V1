import React, { memo, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
const OndutyModal = ({ setOpen, open, authority, empData, setCount }) => {

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
            emid: 0
        }
    )
    const { slno, emno, name, section, reqDate, dutyDate, reason, shft_desc,
        inchargeComment } = details;

    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    useEffect(() => {
        if (Object.keys(empData).length !== 0) {
            const { slno, em_no, em_name, sect_name, status, shft_desc,
                onduty_reason, incharge_approval_comment, hod_approval_comment, em_id, requestDate,
                shiftId, on_dutydate } = empData;
            const details = {
                slno: slno,
                emno: em_no,
                name: em_name,
                section: sect_name,
                status: status,
                reqDate: requestDate,
                dutyDate: on_dutydate,
                reason: onduty_reason,
                shft_desc: shft_desc,
                inchargeComment: incharge_approval_comment,
                hodComment: hod_approval_comment,
                emid: em_id,
                shiftId: shiftId
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
            onduty_slno: slno
        }
    }, [remark, slno, loginem_id])

    const approveData = useMemo(() => {
        return {
            incharge_approval_status: 1,
            incharge_approval_comment: remark,
            incharge_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            incharge_empid: loginem_id,
            onduty_slno: slno
        }
    }, [remark, slno, loginem_id])

    const hodApprove = useMemo(() => {
        return {
            hod_approval_status: 1,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: loginem_id,
            onduty_slno: slno
        }
    }, [remark, slno, loginem_id])

    const hodReject = useMemo(() => {
        return {
            hod_approval_status: 2,
            hod_approval_comment: remark,
            hod_approval_date: moment().format('YYYY-MM-DD HH:mm'),
            hod_empid: loginem_id,
            onduty_slno: slno
        }
    }, [remark, slno, loginem_id])

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
                const result = await axioslogin.patch('/CommonReqst/hod/onduty', hodReject)
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
                setOpenBkDrop(true)
                const result = await axioslogin.patch('/CommonReqst/hod/onduty', hodApprove)
                const { message, success } = result.data;
                if (success === 1) {
                    setOpenBkDrop(false)
                    setCount(Math.random())
                    setOpen(false)
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
                            {
                                authority === 2 ?
                                    <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                            <Typography fontSize="sm" fontWeight="lg"  >
                                                Incharge Comment:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                                {inchargeComment === null ? 'NIL' : inchargeComment}
                                            </Typography>
                                        </Box>
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
        </>
    )
}

export default memo(OndutyModal) 