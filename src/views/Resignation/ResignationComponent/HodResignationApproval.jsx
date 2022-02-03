import React, { Fragment } from 'react';
import { FormControl, MenuItem, Select, TextareaAutosize, Typography } from '@material-ui/core'
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import TextInput from 'src/views/Component/TextInput';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { Button, Checkbox, DialogActions } from '@mui/material';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useContext } from 'react';
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import InchargeStatus from './InchargeStatus';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HodResignationApproval = ({ open, handleClose, slno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [approvalData, setApprovalData] = useState({
        relieving_date: '',
        request_date: '',
        resign_reason: '',
        emp_id: '',
        designation: '',
        resig_slno: '',
        inch_app_status: '',
        inch_coment: '',
        incharge_required: '0'
    })
    const [formData, setFormData] = useState({
        approve: false,
        reject: false,
        hod_comment: '',
        replacement: false
    })
    const defaultState = {
        approve: false,
        reject: false,
        hod_comment: '',
        replacement: false
    }
    const { approve, reject, hod_comment, replacement } = formData
    const { resig_slno, relieving_date, request_date, resign_reason, emp_id, designation,
        inch_app_status, inch_coment, incharge_required } = approvalData
    useEffect(() => {
        const getApprovalData = async () => {
            const result = await axioslogin.get(`/Resignation/hodpending/${slno}`)
            console.log(result)
            const { success, data } = result.data
            if (success === 1) {
                const { resig_slno, relieving_date, request_date, resign_reason, em_id,
                    designation, inch_app_status, inch_coment, incharge_required,
                } = data[0]
                const apprveData = {
                    relieving_date: relieving_date,
                    request_date: request_date,
                    resign_reason: resign_reason,
                    designation: designation,
                    emp_id: em_id,
                    resig_slno: resig_slno,
                    incharge_required: incharge_required,
                    inch_app_status: inch_app_status,
                    inch_coment: inch_coment
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
        em_id: emp_id,
        designation: designation,
        hod_id: em_id,
        hod_app_date: moment(new Date()).format('YYYY-MM-DD'),
        hod_app_status: approve === true ? 1 : reject === true ? 0 : 0,
        hod_coment: hod_comment,
        resig_slno: resig_slno,
        replacement_required_hod: replacement === true ? 1 : 0
    }
    const submitFormdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/Resignation/resignhod', approveData)
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
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
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
                                </div>{
                                    incharge_required === 1 ? <InchargeStatus inch_app_status={inch_app_status} inch_coment={inch_coment} /> : null
                                }

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
                                            placeholder="HOD Comment"
                                            style={{ width: 500 }}
                                            name="hod_comment"
                                            value={hod_comment}
                                            onChange={(e) => updateInchargeApproval(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-0 pl-5">
                                    <div className="col-md-12" >
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="replacement"
                                                    color="primary"
                                                    value={replacement}
                                                    checked={replacement}
                                                    className="ml-2"
                                                    onChange={(e) =>
                                                        updateInchargeApproval(e)

                                                    }
                                                />
                                            }
                                            label="Replacement Required"
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

export default HodResignationApproval;
