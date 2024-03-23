import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment'
import { CssVarsProvider, Typography } from '@mui/joy';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog, Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const HaldayRqModel = ({ setOpen, open, handleClose, authority, em_id, setcount, count, slno }) => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')
    //redux data all halfday request
    const halfdayRqData = useSelector((state) => state?.setAllLeaveApproval?.halfdayRqData?.halfdayRqList, _.isEqual)
    const [formdata, setformData] = useState({
        emp_name: '',
        emp_id: '',
        halfdayareason: '',
        leavedate: '',
        requestdate: '',
        month: '',
        sect_name: '',
        planslno: 0
    })
    const { emp_name, emp_id, halfdayareason, leavedate, requestdate, month, sect_name,
        planslno } = formdata;

    useEffect(() => {
        if (Object.keys(halfdayRqData).length > 0) {
            //filtering selected row from all halfday request
            const array = halfdayRqData && halfdayRqData.filter((val) => val.half_slno === slno)

            const { em_name, em_no, hf_reason, month, requestdate, leavedate, sect_name,
                planslno } = array[0]
            const formdata = {
                emp_id: em_no,
                emp_name: em_name,
                halfdayareason: hf_reason,
                requestdate: moment(new Date(requestdate)).format('DD-MM-YYYY'),
                month: month,
                leavedate: moment(new Date(leavedate)).format('DD-MM-YYYY'),
                sect_name: sect_name,
                planslno: planslno

            }
            setformData(formdata)
        }
    }, [halfdayRqData, slno])

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
                    setcount(count + 1)
                    handleClose()
                } else {
                    errorNofity(message)
                }
            }
        }//hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(count + 1)
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
                    const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        setreason('')
                        setcount(count + 1)
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
    }, [reason, slno, em_id, count, handleClose, setcount, authority])


    const handleRegectRequest = useCallback(async () => {
        const submhalfday = {
            status: 2,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id,
            hrm_cl_slno: planslno
        }
        //incharge approval
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add remark!")
            } else {
                const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(count + 1)
                    handleClose()
                } else {
                    errorNofity(message)
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
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/HodRejectHalfday', submhalfday)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(count + 1)
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
                        setcount(count + 1)
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
    }, [reason, slno, planslno, authority, count, handleClose, setcount, em_id])


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
                            {emp_name}
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
                                {emp_id}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
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
                                <Typography level="body1" fontSize="md">: {halfdayareason}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setreason(e.target.value)} />
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
            {/* <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent sx={{ width: '100%', height: 'auto' }}>
                    <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography fontSize="xl" level="body1">Halfday Request Approval </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Emp. ID</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {emp_id}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", textTransform: "capitalize" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {emp_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Request Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {requestdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Leave Type</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: Casual leave</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Leave Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {leavedate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">Month of Leave</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {month}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Leave Reason</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {halfdayareason}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', pt: 0.5, justifyContent: 'space-between' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="apprv"
                                                color="primary"
                                                value={apprv}
                                                checked={apprv}
                                                onChange={(e) =>
                                                    updateHalfdatereq(e)
                                                }
                                            />
                                        }
                                        label="Halfday Request Approve"
                                    />
                                </Box>

                                <Box sx={{ width: '100%', }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="reject"
                                                color="primary"
                                                value={reject}
                                                checked={reject}

                                                className="ml-2 "
                                                onChange={(e) =>
                                                    updateHalfdatereq(e)
                                                }
                                            />
                                        }
                                        label="Halfday Request Reject"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", pt: 1, display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Remark</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                    <TextField
                                        id="fullWidth"
                                        size="small"
                                        type="text"
                                        fullWidth
                                        value={reason}
                                        name="reasonautho"
                                        onChange={(e) => setreason(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Button color="primary" onClick={submithaday} >SAVE</Button>
                            <Button onClick={handleClose} color="primary" >CLOSE</Button>
                        </DialogActions>
                    </Paper>
                </DialogContent >
            </Dialog > */}
        </Fragment >
    )
}

export default HaldayRqModel