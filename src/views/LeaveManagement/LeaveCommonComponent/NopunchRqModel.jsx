import React, { memo, useCallback, useMemo, useState } from 'react'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/joy';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import Button from '@mui/joy/Button';

const NopunchRqModel = ({ setOpen, open, authority, empData, setcount }) => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')

    const { em_name, em_no, sect_name, requestDate, nopunch_date, np_reason, shft_desc, slno, checkinflag, checkoutflag } = empData;

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    const approve = useMemo(() => {
        return {
            status: 1,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
    }, [reason, slno, em_id])

    const rejectd = useMemo(() => {
        return {
            status: 2,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
    }, [reason, slno, em_id])



    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', approve)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(Math.random())
                    setOpen(false)
                    setOpenBkDrop(false)
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
            }
        } else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${slno}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { np_inc_apprv_req, np_incapprv_status } = data[0]
                    if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', approve)
                        const { success } = result.data
                        if (success === 1) {
                            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', approve)
                            const { success, message } = result.data
                            if (success === 1) {
                                succesNofity(message)
                                setreason('')
                                setcount(Math.random())
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                            else {
                                errorNofity(message)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', approve)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)
                            setreason('')
                            setcount(Math.random())
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                    }
                }
            }
        }
    }, [authority, approve, setOpen, setcount, slno, reason])

    const handleRegectRequest = useCallback(async () => {
        setOpenBkDrop(true)
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', rejectd)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(Math.random())
                    setOpen(false)
                    setOpenBkDrop(false)
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
            }
        }
        //submitting hod approval
        else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${slno}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { np_inc_apprv_req, np_incapprv_status } = data[0]
                    if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', rejectd)
                        const { success } = result.data
                        if (success === 1) {
                            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', rejectd)
                            const { success, message } = result.data
                            if (success === 1) {
                                succesNofity(message)
                                setreason('')
                                setcount(Math.random())
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                            else {
                                errorNofity(message)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', rejectd)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)
                            setreason('')
                            setcount(Math.random())
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                    }
                }
            }
        }
    }, [rejectd, authority, setcount, slno, setOpen, reason])

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
                            {`employee ID#`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
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
                                        Miss Punch Day
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        :{nopunch_date}
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
                                        :{checkinflag === 1 ? 'Check In' : checkoutflag === 1 ? 'Check Out' : 'NIL'}
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
                                        :{np_reason}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Approve/Reject The Request here…" variant="outlined" onChange={(e) => setreason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Miss punch Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                Miss punch Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    )
}
export default memo(NopunchRqModel)