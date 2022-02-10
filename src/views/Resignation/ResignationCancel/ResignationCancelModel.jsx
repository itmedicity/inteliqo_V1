import { Dialog, DialogContent, DialogTitle, TextareaAutosize, Slide, DialogActions, Button } from '@material-ui/core';
import moment from 'moment';
import React, { Fragment } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ResignationCancelModel = ({ open, handleClose, slno, count, setCount }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [formData, setFormData] = useState({
        resign_cancel: ''
    })
    const { resign_cancel } = formData
    const updateResignCancel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        resign_cancel: 'C',
        resign_cancel_reason: resign_cancel,
        cancel_user: em_id,
        resign_cancel_date: moment(new Date()).format('YYYY-MM-DD'),
        resig_slno: slno
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/Resignation/resigncancelhr', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(count + 1)
            handleClose()
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDP")
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
                    {"Resignation Cancel"}
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
                                        name="resign_cancel"
                                        value={resign_cancel}
                                        onChange={(e) => updateResignCancel(e)}
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
};

export default ResignationCancelModel;
