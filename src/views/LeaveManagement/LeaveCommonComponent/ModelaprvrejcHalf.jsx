import React, { Fragment, memo, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { Checkbox } from '@material-ui/core';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { errorNofity, halfdayrequest, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelaprvrejcHalf = ({ open, handleClose, hafdaydata, setleavereq, authority, em_id }) => {
    const [halfreason, setHalfreason] = useState('')
    useEffect(() => {
        if (hafdaydata.length === 1) {
            const { hf_reason } = hafdaydata[0]
            setHalfreason(hf_reason)
        }
    }, [hafdaydata])
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
            slno: hafdaydata[0].half_slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                halfdayrequest().then((val) => {
                    setleavereq(val)
                })
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
            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                halfdayrequest().then((val) => {
                    setleavereq(val)
                })
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
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                halfdayrequest().then((val) => {
                    setleavereq(val)
                })
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
            const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
            const { success, data, message } = result.data;
            if (success === 1) {
                const post = data.map((val) => {
                    const postData = {
                        date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                        req_type: 'HL',
                        leave: 1,
                        leave_subreq: val.planslno,
                        em_no: hafdaydata[0].em_no,
                    }
                    return postData
                })
                const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
                const { success, message } = results.data
                if (success === 1) {
                    succesNofity("Updated")
                    halfdayrequest().then((val) => {
                        setleavereq(val)
                    })
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
            const result = await axioslogin.patch('./LeaveRequestApproval/halfdaycancelReq', submhalfday)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                halfdayrequest().then((val) => {
                    setleavereq(val)
                })
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
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>{"Half Day Leave"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12" >
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12">
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
                                                            hafdaydata.map((val, index) => {
                                                                const tr = <TableRow key={index}>
                                                                    <TableCell align="center">{format(new Date(val.leavedate), 'dd-MM-yyyy')}</TableCell>
                                                                    <TableCell align="center">Casual Leave</TableCell>
                                                                    <TableCell align="center">{val.month}</TableCell>
                                                                </TableRow>

                                                                return tr
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=" Reason For Leave"
                                            fullWidth
                                            disabled="Disabled"
                                            value={halfreason}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 ">
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-3">
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
                                                label="Approve"
                                            />
                                        </div>
                                        <div className="col-md-3">
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
                                                label="Reject"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Remark"
                                            fullWidth
                                            value={reason}
                                            changeTextValue={(e) => setreason(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </DialogContent >
                <DialogActions>
                    <Button color="primary" onClick={submithaday} >Submit</Button>
                    <Button
                        onClick={handleClose}
                        color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment>
    )
}

export default memo(ModelaprvrejcHalf)