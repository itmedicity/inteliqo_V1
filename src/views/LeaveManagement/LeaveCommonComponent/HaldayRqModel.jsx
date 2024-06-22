import React, { Fragment, memo, useCallback, useState } from 'react'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { CssVarsProvider, Typography } from '@mui/joy';
import { useSelector } from 'react-redux';
// import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog, Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const HaldayRqModel = ({ setOpen, open, handleClose, authority, empData, setcount }) => {

    const { Employee_name, requestdate, leavedate, month, hf_reason, Emp_no, sect_name, SlNo,
        planslno } = empData;

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    // const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')
    //redux data all halfday request


    const handleApproverequest = useCallback(async () => {
        const submhalfday = {
            status: 1,
            comment: reason,
            slno: SlNo,
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
                    handleClose()
                } else {
                    errorNofity(message)
                }
            }
        }//hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${SlNo}`)
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
                            handleClose()
                        }
                        else if (success === 2) {
                            warningNofity(message)
                        }
                        else {
                            errorNofity(message)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        setreason('')
                        setcount(Math.random())
                        succesNofity(message)
                        handleClose()
                    }
                    else if (success === 2) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }
        }
    }, [reason, SlNo, em_id, handleClose, setcount, authority])


    const handleRegectRequest = useCallback(async () => {
        const submhalfday = {
            status: 2,
            comment: reason,
            slno: SlNo,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id,
            hrm_cl_slno: planslno
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
                    handleClose()
                } else {
                    errorNofity(message)
                }
            }
        }
        //hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${SlNo}`)
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
                            handleClose()
                        }
                        else if (success === 2) {
                            warningNofity(message)
                        }
                        else {
                            errorNofity(message)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/HodRejectHalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        setreason('')
                        setcount(Math.random())
                        succesNofity(message)
                        handleClose()
                    }
                    else if (success === 2) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }
        }
    }, [reason, SlNo, authority, handleClose, setcount, em_id, planslno])


    return (
        <Fragment>
            {/* <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" /> */}
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
                            {Employee_name}
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
                                {Emp_no}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee ID #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Request Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {requestdate}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Leave Type</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: Casual leave</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Leave Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: {leavedate}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">Month of Leave</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {month}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Leave Reason</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: {hf_reason}</Typography>
                            </CssVarsProvider>
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