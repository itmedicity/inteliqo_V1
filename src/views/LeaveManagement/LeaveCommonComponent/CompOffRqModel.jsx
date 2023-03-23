import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CompOffRqModel = ({ open, handleClose, hafdaydata, authority, em_id, setcount, count }) => {
    const [coffreason, setcoffreason] = useState('')
    useEffect(() => {
        if (hafdaydata.length === 1) {
            const { cf_reason } = hafdaydata[0]
            setcoffreason(cf_reason)
        }
    }, [hafdaydata])
    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status

    const updatecompensatory = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitcompensatry = async () => {
        const sumbcompens = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: hafdaydata[0].cmp_off_reqid,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvcoff', sumbcompens)
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
        else if (authority === 2) {
            const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
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
        else if (authority === 3) {
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceocoff', sumbcompens)
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
            const result = await axioslogin.patch('/LeaveRequestApproval/HrCoff', sumbcompens)
            const { success, data, message } = result.data;
            if (success === 1) {
                const { em_id } = data[0]
                const postData = {
                    calculated_date: format(new Date(), 'yyyy-MM-dd'),
                    emp_id: em_id,
                }
                const results = await axioslogin.post('/LeaveRequestApproval/insertcoffleaveCalc', postData)
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
        else if (authority === 5) {
            const result = await axioslogin.patch('./LeaveRequestApproval/coffCancel', sumbcompens)
            const { success, message } = result.data
            if (success === 1) {
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
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table sx={{ minWidth: 50 }} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Day</TableCell>
                                            <TableCell align="center">Duty Hour</TableCell>
                                            <TableCell align="center">Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            hafdaydata && hafdaydata.map((val, index) => {
                                                const tr = <TableRow key={index}>
                                                    <TableCell align="center">{format(new Date(val.leave_date), 'dd-MM-yyyy')}</TableCell>
                                                    <TableCell align="center">{`${Math.floor(val.durationpunch / 60)}:${val.durationpunch % 60}`}</TableCell>
                                                    <TableCell align="center">{val.reqtype_name}</TableCell>
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
                                    value={coffreason}
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
                                                updatecompensatory(e)
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
                                                updatecompensatory(e)
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
                    <Button color="primary" onClick={submitcompensatry} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(CompOffRqModel) 