import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Paper, Slide, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment'
import { CssVarsProvider, Typography } from '@mui/joy';
import _ from 'underscore';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HaldayRqModel = ({ open, handleClose, authority, em_id, setcount, count, slno }) => {

    //redux data all halfday request
    const halfdayRqData = useSelector((state) => state?.setAllLeaveApproval?.halfdayRqData?.halfdayRqList, _.isEqual)
    const [formdata, setformData] = useState({
        emp_name: '',
        emp_id: '',
        halfdayareason: '',
        leavedate: '',
        requestdate: '',
        month: ''
    })
    const { emp_name, emp_id, halfdayareason, leavedate, requestdate, month } = formdata;

    useEffect(() => {
        if (Object.keys(halfdayRqData).length > 0) {
            //filtering selected row from all halfday request
            const array = halfdayRqData && halfdayRqData.filter((val) => val.half_slno === slno)
            const { em_name, em_no, hf_reason, month, requestdate, leavedate } = array[0]
            const formdata = {
                emp_id: em_no,
                emp_name: em_name,
                halfdayareason: hf_reason,
                requestdate: moment(new Date(requestdate)).format('DD-MM-YYYY'),
                month: month,
                leavedate: moment(new Date(leavedate)).format('DD-MM-YYYY'),
            }
            setformData(formdata)
        }
    }, [halfdayRqData, slno])

    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const updateHalfdatereq = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submithaday = async () => {
        const submhalfday = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        //incharge approval
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                const ob1 = {
                    apprv: false,
                    reject: false

                }
                setstatus(ob1)
                setreason('')
                setcount(count + 1)
                handleClose()
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        //hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                        const { success, message } = result.data
                        if (success === 1) {
                            const ob1 = {
                                apprv: false,
                                reject: false

                            }
                            setstatus(ob1)
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
                        const ob1 = {
                            apprv: false,
                            reject: false

                        }
                        setstatus(ob1)
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
        //ceo approval
        else if (authority === 3) {
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                const ob1 = {
                    apprv: false,
                    reject: false

                }
                setstatus(ob1)
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
        // else if (authority === 5) {
        //     const result = await axioslogin.patch('./LeaveRequestApproval/halfdaycancelReq', submhalfday)
        //     const { success, message } = result.data
        //     if (success === 1) {
        //         succesNofity(message)
        //         Hrhalfdayrequest(arraydepsect).then((val) => {
        //             setleavereq(val)
        //         })
        //         handleClose()
        //     }
        //     else if (success === 2) {
        //         warningNofity(message)
        //     }
        //     else {
        //         errorNofity(message)
        //     }
        // }
    }
    return (
        <Fragment>
            <ToastContainer />
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
            </Dialog >
        </Fragment >
    )
}

export default HaldayRqModel