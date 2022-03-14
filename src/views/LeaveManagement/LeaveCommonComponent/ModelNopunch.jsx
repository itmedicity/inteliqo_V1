import React, { Fragment, memo, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
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
import { errorNofity, getnopunchrequst, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelNopunch = ({ open, handleClose, hafdaydata, setleavereq, authority, em_id }) => {
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
                getnopunchrequst().then((val) => {
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
            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', submitpunch)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                getnopunchrequst().then((val) => {
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
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceonopunch', submitpunch)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                getnopunchrequst().then((val) => {
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
                        getnopunchrequst().then((val) => {
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
                } else if (data[0].checkoutflag === 1) {
                    const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchnopunchOUt', post)
                    const { success, message } = results.data
                    if (success === 1) {
                        succesNofity("Updated")
                        getnopunchrequst().then((val) => {
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
            else {
                errorNofity(message)
            }
        }
        else if (authority === 5) {
            const result = await axioslogin.patch('./LeaveRequestApproval/nopunchCancel', submitpunch)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                getnopunchrequst().then((val) => {
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
                <DialogTitle>{"No Punch Request"}</DialogTitle>
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
                                                            <TableCell align="center">Check IN</TableCell>
                                                            <TableCell align="center">Check Out</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        {
                                                            hafdaydata.map((val, index) => {
                                                                const tr = <TableRow key={index}>
                                                                    <TableCell align="center">{format(new Date(val.nopunchdate), 'dd-MM-yyyy')}</TableCell>
                                                                    <TableCell align="center">{val.checkinflag === 1 ? val.checkintime : ''}</TableCell>
                                                                    <TableCell align="center">{val.checkoutflag === 1 ? format(new Date(val.checkouttime), 'HH:mm:ss') : ''}</TableCell>
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
                                        // value={}
                                        // name=""
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
                                                            updatenopunchreq(e)
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
                                                            updatenopunchreq(e)
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
                    <Button color="primary" onClick={submitnopunch} >Submit</Button>
                    <Button
                        onClick={handleClose}
                        color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment>
    )
}

export default ModelNopunch