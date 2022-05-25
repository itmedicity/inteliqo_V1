import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextareaAutosize } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import moment from 'moment'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const LeaveCancelUserModel = ({ open, handleClose, slnum, lvtype, em_id, count, setCount }) => {
    const [formData, setFormdata] = useState({
        leave_cancel: ''
    })
    const defaultstate = {
        leave_cancel: ''
    }
    const { leave_cancel } = formData
    const updateLeaveCancel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormdata({ ...formData, [e.target.name]: value })
    }
    const postData = {
        status: 1,
        comment: leave_cancel,
        apprvdate: moment(new Date()).format('YYYY-MM-DD'),
        us_code: em_id,
        slno: slnum,
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        if (lvtype === 1) {
            const result = await axioslogin.patch('/LeaveRequestApproval/lveReqCancelUser', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormdata(defaultstate)
                handleClose()
            }
            else {
                warningNofity(message)
            }
        }
        else if (lvtype === 2) {
            const result = await axioslogin.patch('/LeaveRequestApproval/halfdaycancelReqUser', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormdata(defaultstate)
                handleClose()
            }
            else {
                warningNofity(message)
            }
        }
        else if (lvtype === 3) {
            const result = await axioslogin.patch('/LeaveRequestApproval/nopunchCanceluser', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormdata(defaultstate)
                handleClose()
            }
            else {
                warningNofity(message)
            }
        }
        else if (lvtype === 4) {
            const result = await axioslogin.patch('/LeaveRequestApproval/coffCanceluser', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormdata(defaultstate)
                handleClose()
            }
            else {
                warningNofity(message)
            }
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
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
                <DialogTitle>
                    {"Leave Cancel"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-1 pt-2">
                                <div className="col-md-12" >
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="Cancel Reason"
                                        style={{ width: 500 }}
                                        name="leave_cancel"
                                        value={leave_cancel}
                                        onChange={(e) => updateLeaveCancel(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitFormData} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default LeaveCancelUserModel