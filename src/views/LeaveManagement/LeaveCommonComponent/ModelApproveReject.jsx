import React, { Fragment, memo, useState } from 'react'
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
import { Checkbox, Typography } from '@material-ui/core';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment'
import { errorNofity, getleaverequestget, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelApproveReject = ({ open, handleClose, leaveremastdata, leavestatedetail, setleavereq, authority, em_id }) => {
    const {
        emno,
        leave_date,
        leavetodate, leave_slno,
        reqtype, nodays, lve_uniq_no, leave_reason
    } = leaveremastdata[0]
    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
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
                getleaverequestget().then((val) => {
                    setleavereq(val)
                })
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', postleavedata)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                getleaverequestget().then((val) => {
                    setleavereq(val)
                })
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }

        }
        else if (authority === 3) {
            const result = await axioslogin.patch('/LeaveRequestApproval/CeoApprvLeave', postleavedata)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                getleaverequestget().then((val) => {
                    setleavereq(val)
                })
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 4) {
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
                    getleaverequestget().then((val) => {
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
        } else if (authority === 5) {
            const result = await axioslogin.patch('/LeaveRequestApproval/lveReqCancel', postleavedata)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                getleaverequestget().then((val) => {
                    setleavereq(val)
                })
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }

    }
    const updateInchargeApproval = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false

        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
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
                <DialogTitle>{"Leave Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12" >
                                <div className="col-md-12 col-sm-12">
                                    {/* <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Leave Request Type"
                                        fullWidth
                                        disabled="Disabled"
                                        value={reqtype}
                                    // name=""
                                    /> */}
                                    <Typography>{reqtype}</Typography>
                                </div>
                                <div className="row g-1 pt-1">
                                    <div className="col-md-4">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                            disabled="Disabled"
                                            value={leave_date}
                                        //name="finestart"
                                        // changeTextValue={(e) => {
                                        //     getstart(e)
                                        // }}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="End  Date"
                                            disabled="Disabled"
                                            value={leavetodate}

                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="No of days"
                                            fullWidth
                                            disabled="Disabled"
                                            value={nodays}


                                        />
                                    </div>
                                </div>
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
                                                            leavestatedetail.map((val, index) => {
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
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Reason"
                                            fullWidth
                                            disabled="Disabled"
                                            value={leave_reason}
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
                                                            updateInchargeApproval(e)
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
                                                            updateInchargeApproval(e)
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
                                            name="reasonautho"
                                            changeTextValue={(e) => setreason(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </DialogContent >
                <DialogActions>
                    <Button color="primary" onClick={submitdata} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(ModelApproveReject)
