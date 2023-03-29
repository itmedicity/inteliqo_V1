import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { format } from 'date-fns';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NopunchRqModel = ({ open, handleClose, hafdaydata, authority, em_id, count, setcount }) => {
    const [npreason, setnpreason] = useState('')
    useEffect(() => {
        if (hafdaydata.length === 1) {
            const { np_reason } = hafdaydata[0]
            setnpreason(np_reason)
        }
    }, [hafdaydata])
    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const updatenopunchreq = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitnopunch = async () => {
        const submitpunch = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: hafdaydata[0].nopunch_slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', submitpunch)
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
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${hafdaydata[0].nopunch_slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { np_inc_apprv_req, np_incapprv_status } = data[0]
                if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', submitpunch)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', submitpunch)
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
                    const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', submitpunch)
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
        else if (authority === 3) {
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceonopunch', submitpunch)
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
        else if (authority === 4) {
            const result = await axioslogin.patch('/LeaveRequestApproval/HrNopunch', submitpunch)
            const { success, data, message } = result.data;
            if (success === 1) {
                const post = data.map((val) => {
                    if (val.checkinflag === 1) {
                        const postData = {
                            date: moment(new Date(val.nopunchdate)).format('YYYY-MM-DD'),
                            req_type: 'NP',
                            em_no: val.em_no,
                            punch: val.checkintime,
                        }
                        return postData
                    } else if (val.checkoutflag === 1) {
                        const postData = {
                            date: moment(new Date(val.nopunchdate)).format('YYYY-MM-DD'),
                            req_type: 'NP',
                            em_no: val.em_no,
                            punch: val.checkouttime,
                        }
                        return postData

                    }
                })
                if (data[0].checkinflag === 1) {
                    const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchnopunch', post)
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
                } else if (data[0].checkoutflag === 1) {
                    const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchnopunchOUt', post)
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
            }
            else {
                errorNofity(message)
            }
        }
        // else if (authority === 5) {
        //     const result = await axioslogin.patch('./LeaveRequestApproval/nopunchCancel', submitpunch)
        //     const { success, message } = result.data
        //     if (success === 1) {
        //         succesNofity(message)
        //         getHRnopunchrequst(arraydepsect).then((val) => {
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
                <DialogTitle>{"No Punch Request Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    width: '100%',
                    height: 600
                }}>
                    <Box sx={{
                        width: "100%",
                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                    }} >
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table sx={{ minWidth: 50 }} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Days</TableCell>
                                            <TableCell align="center">Check IN</TableCell>
                                            <TableCell align="center">Check Out</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            hafdaydata && hafdaydata.map((val, index) => {
                                                const tr = <TableRow key={index}>
                                                    <TableCell align="center">{val.nopunchdate}</TableCell>
                                                    <TableCell align="center">{val.checkinflag === 1 ? format(new Date(val.checkintime), 'HH:mm:ss') : '00:00:00'}</TableCell>
                                                    <TableCell align="center">{val.checkoutflag === 1 ? format(new Date(val.checkouttime), 'HH:mm:ss') : '00:00:00'}</TableCell>
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
                                    value={npreason}
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
                                                updatenopunchreq(e)
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
                                                updatenopunchreq(e)
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
                    <Button color="primary" onClick={submitnopunch} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(NopunchRqModel) 