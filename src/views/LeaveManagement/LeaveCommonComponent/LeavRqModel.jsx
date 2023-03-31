import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import { format } from 'date-fns';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const LeavRqModel = ({ open, handleClose, leaveremastdata, leavestatedetail, authority, em_id, setcount, count }) => {
    const {
        emno,
        leave_date,
        leavetodate,
        leave_slno,
        reqtype,
        nodays,
        lve_uniq_no,
        leave_reason
    } = leaveremastdata[0]
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const [reason, setreason] = useState('')

    const updateInchargeApproval = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitdata = async () => {
        const postleavedata = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: leave_slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id,
            lve_uniq_no: lve_uniq_no
        }
        if (authority === 1) {
            const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', postleavedata)
            const { success, message } = result.data;
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

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/${leave_slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { inc_apprv_req, incapprv_status } = data[0]
                if (inc_apprv_req === 1 && incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', postleavedata)
                    const { success } = result.data;
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', postleavedata)
                        const { success, message } = result.data;
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

                        } else if (success === 2) {
                            warningNofity(message)
                        }
                        else {
                            errorNofity(message)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', postleavedata)
                    const { success, message } = result.data;
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

                    } else if (success === 2) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }

        }
        else if (authority === 3) {
            const result = await axioslogin.patch('/LeaveRequestApproval/CeoApprvLeave', postleavedata)
            const { success, message } = result.data;
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

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        } else if (authority === 4) {

            const result = await axioslogin.patch('/LeaveRequestApproval/HRLeaveApprv', postleavedata)
            const { success, data, message } = result.data;
            if (success === 1) {
                const post = data.map((val) => {
                    const postData = {
                        date: moment(new Date(val.leave_dates)).format('YYYY-MM-DD'),
                        req_type: 'LV',
                        leave: val.leave_typeid,
                        leave_subreq: val.leave_processid,
                        em_no: emno,
                    }
                    return postData
                })
                const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuch', post)
                const { success, message } = results.data
                if (success === 1) {
                    succesNofity("Updated")
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
            else {
                errorNofity(message)
            }
        }
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
                <DialogTitle>{"Leave Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    width: '100%',
                    height: 600
                }}>
                    <Box sx={{
                        width: "100%",
                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                    }} >
                        <Box sx={{ width: "100%", }}>
                            <CssVarsProvider>
                                <Typography>
                                    {reqtype}
                                </Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', pt: 0.5, justifyContent: 'space-between' }}>
                            <Tooltip title="From Date" followCursor placement='top' arrow>
                                <Box sx={{ width: '100%', p: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth" size="small"
                                        disabled
                                        value={leave_date}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="To Date" followCursor placement='top' arrow>
                                <Box sx={{ width: '100%', p: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth" size="small"
                                        disabled
                                        value={leavetodate}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="No of days" followCursor placement='top' arrow>
                                <Box sx={{ width: '100%', p: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth" size="small"
                                        disabled
                                        value={nodays}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table sx={{ minWidth: 50 }} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Days</TableCell>
                                            <TableCell align="center">Leave Type</TableCell>
                                            <TableCell align="center">Month of Leaves</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            leavestatedetail && leavestatedetail.map((val, index) => {
                                                const tr = <TableRow key={index}>
                                                    <TableCell align="center">{format(new Date(val.leave_dates), 'dd-MM-yyyy')}</TableCell>
                                                    <TableCell align="center">{val.leavetype_name}</TableCell>
                                                    <TableCell align="center">{val.leave_name}</TableCell>
                                                </TableRow>

                                                return tr
                                            })
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Box sx={{ width: "100%", pt: 1 }}>
                            <Tooltip title="Reason" followCursor placement='top' arrow>
                                <TextField
                                    fullWidth
                                    id="fullWidth" size="small"
                                    disabled
                                    value={leave_reason}
                                />
                            </Tooltip>
                        </Box>
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
                                                updateInchargeApproval(e)
                                            }
                                        />
                                    }
                                    label="Approve"
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
                                                updateInchargeApproval(e)
                                            }
                                        />
                                    }
                                    label="Reject"
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", pt: 1 }}>
                            <Tooltip title="Remark" followCursor placement='top' arrow>
                                <TextField
                                    id="fullWidth"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    value={reason}
                                    name="reasonautho"
                                    onChange={(e) => setreason(e.target.value)}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </DialogContent >
                <DialogActions>
                    <Button color="primary" onClick={submitdata} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(LeavRqModel)