import React, { Fragment, memo } from 'react';
import { TextareaAutosize, Typography } from '@material-ui/core'
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import TextInput from 'src/views/Component/TextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { Button, Checkbox, DialogActions } from '@mui/material';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useContext } from 'react';
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const CEOApprovalComponent = ({ open, handleClose, slno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [approvalData, setApprovalData] = useState({
        relieving_date: '',
        request_date: '',
        resign_reason: '',
        emp_id: '',
        designation: '',
        resig_slno: ''
    })
    const [formData, setFormData] = useState({
        approve: false,
        reject: false,
        ceo_comment: '',
    })
    const defaultState = {
        approve: false,
        reject: false,
        ceo_comment: '',
    }
    const { approve, reject, ceo_comment } = formData
    const { resig_slno, relieving_date, request_date, resign_reason } = approvalData
    useEffect(() => {
        const getApprovalData = async () => {
            const result = await axioslogin.get(`/Resignation/ceopendingbyID/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { resig_slno, relieving_date, request_date, resign_reason, em_id, designation } = data[0]
                const apprveData = {
                    relieving_date: relieving_date,
                    request_date: request_date,
                    resign_reason: resign_reason,
                    designation: designation,
                    emp_id: em_id,
                    resig_slno: resig_slno
                }
                setApprovalData(apprveData)
            }
        }
        getApprovalData()
    }, [slno])
    const updateInchargeApproval = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const approveData = {
        ceo_id: em_id,
        ceo_appr_date: moment(new Date()).format('YYYY-MM-DD'),
        ceo_appr_status: approve === true ? 1 : reject === true ? 0 : 0,
        ceo_comment: ceo_comment,
        resig_slno: resig_slno,
    }
    const submitFormdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/Resignation/resignhr', approveData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity("Resignation Request Approved")
            setCount(count + 1)
            setFormData(defaultState)
            handleClose()
        }
        else if (success === 2) {
            warningNofity(message)
        }
        else {
            errorNofity(message)
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
                    {"Resignation Approval/Reject"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        minWidth: 800,
                        maxWidth: 800,
                        width: 800,
                    }}
                >
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12">
                                <div className="row g-1">
                                    <div className="col-md-5 pt-1" >
                                        <Typography>Resignation Date</Typography>
                                    </div>
                                    <div className="col-md-7" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Resign Date"
                                            fullWidth
                                            disabled="Disabled"
                                            value={request_date}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-5 pt-1" >
                                        <Typography>Relieving Date</Typography>
                                    </div>
                                    <div className="col-md-7" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Relieving Date"
                                            fullWidth
                                            disabled="Disabled"
                                            value={relieving_date}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <Typography variant='h6'>
                                            Resignation Reason
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <Typography align='justify'>
                                            {resign_reason}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="approve"
                                                        color="primary"
                                                        value={approve}
                                                        checked={approve}
                                                        disabled={reject === true ? true : false}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updateInchargeApproval(e)
                                                        }
                                                    />
                                                }
                                                label="Approve"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="reject"
                                                        color="primary"
                                                        value={reject}
                                                        checked={reject}
                                                        disabled={approve === true ? true : false}
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
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="CEO Comment"
                                            style={{ width: 500 }}
                                            name="ceo_comment"
                                            value={ceo_comment}
                                            onChange={(e) => updateInchargeApproval(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitFormdata} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default memo(CEOApprovalComponent);
