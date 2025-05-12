import React, { Fragment, memo, useCallback, useState } from 'react'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Typography } from '@mui/joy';
import { useSelector } from 'react-redux';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog, Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const HaldayRqModel = ({ setOpen, open, authority, empData, setcount }) => {

    const { em_name, requestDate, halfday_date, month, hf_reason, em_no, sect_name, slno,
        planslno, halfday_status, shft_desc, leavedate } = empData;

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    // const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')
    //redux data all halfday request


    const handleApproverequest = useCallback(async () => {
        const submhalfday = {
            status: 1,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        //incharge approval
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add remark!")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(Math.random())
                    setOpen(false)
                } else {
                    errorNofity(message)
                    setOpen(false)
                }
            }
        }//hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(Math.random())
                            succesNofity(message)
                            setOpen(false)
                        }
                        else if (success === 2) {
                            warningNofity(message)
                            setOpen(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        setreason('')
                        setcount(Math.random())
                        succesNofity(message)
                        setOpen(false)
                    }
                    else if (success === 2) {
                        warningNofity(message)
                        setOpen(false)
                    }
                    else {
                        errorNofity(message)
                        setOpen(false)
                    }
                }
            }
        }
    }, [reason, slno, em_id, setcount, authority, setOpen])


    const handleRegectRequest = useCallback(async () => {
        const submhalfday = {
            status: 2,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id,
            hrm_cl_slno: planslno,
            em_no: em_no,
            duty_day: leavedate
        }
        //incharge approval
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add remark!")
            } else {
                const result = await axioslogin.patch('/LeaveRequestApproval/inchargeRejectHalfday', submhalfday)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(Math.random())
                    setOpen(false)
                } else {
                    errorNofity(message)
                    setOpen(false)
                }
            }
        }
        //hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeRejectHalfday', submhalfday)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/HodRejectHalfday', submhalfday)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(Math.random())
                            succesNofity(message)
                            setOpen(false)
                        }
                        else if (success === 2) {
                            warningNofity(message)
                            setOpen(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/HodRejectHalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        setreason('')
                        setcount(Math.random())
                        succesNofity(message)
                        setOpen(false)
                    }
                    else if (success === 2) {
                        warningNofity(message)
                        setOpen(false)
                    }
                    else {
                        errorNofity(message)
                        setOpen(false)
                    }
                }
            }
        }
    }, [reason, slno, authority, setcount, em_id, setOpen, planslno, em_no, leavedate])


    return (
        <Fragment>
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
                            {em_name}
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
                                {em_no}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee ID #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
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
                                    :{requestDate}
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
                                    Halfday Taken Date
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{halfday_date}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Halfday Taken Time
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{halfday_status === 1 ? 'First Half' : 'Second Half'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Month of Leave
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{month}
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
                                    :{hf_reason}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Approve/Reject The Request here…"
                            variant="outlined" onChange={(e) => setreason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Halfday Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                halfday Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(HaldayRqModel) 