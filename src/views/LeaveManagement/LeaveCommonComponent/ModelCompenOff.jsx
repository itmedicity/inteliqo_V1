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
import { errorNofity, compensatory, succesNofity, warningNofity, compensatoryHr, compensatoryCeo } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelCompenOff = ({ open, handleClose, DeptSect, hafdaydata, setleavereq, authority, em_id }) => {
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
    var arraydepsect;
    if ((authority === 1) || (authority === 2)) {
        arraydepsect = DeptSect.map((val) => { return val.dept_section })
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
                succesNofity(message)
                compensatory(arraydepsect).then((val) => {
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
            const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                compensatory(arraydepsect).then((val) => {
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
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceocoff', sumbcompens)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                compensatoryCeo(arraydepsect).then((val) => {
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
                    compensatoryHr(arraydepsect).then((val) => {
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
            const result = await axioslogin.patch('./LeaveRequestApproval/coffCancel', sumbcompens)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                compensatoryHr(arraydepsect).then((val) => {
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
                                                            <TableCell align="center">Day</TableCell>
                                                            <TableCell align="center">Duty Hour</TableCell>
                                                            <TableCell align="center">Type</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            hafdaydata.map((val, index) => {
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
                                            value={coffreason}
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
                                                            updatecompensatory(e)
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
                                                            updatecompensatory(e)
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
                    <Button color="primary" onClick={submitcompensatry}>Submit</Button>
                    <Button
                        onClick={handleClose}
                        color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment>
    )
}

export default memo(ModelCompenOff)