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
import HodStatus from './HodStatus';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HRApprovalComponent = ({ open, handleClose, slno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [dueDept, SetDueDept] = useState({})
    const [approvalData, setApprovalData] = useState({
        relieving_date: '',
        request_date: '',
        resign_reason: '',
        emp_id: '',
        sect_id: '0',
        dept_id: '0',
        designation: '',
        resig_slno: '',
        inch_app_status: '',
        inch_coment: '',
        incharge_required: '0',
        hod_coment: '',
        hod_required: '0',
        hod_app_status: ''
    })
    const [formData, setFormData] = useState({
        approve: false,
        reject: false,
        hr_comment: '',
    })
    const defaultState = {
        approve: false,
        reject: false,
        hr_comment: '',
    }
    const { approve, reject, hr_comment } = formData
    const { resig_slno, relieving_date, request_date, resign_reason, emp_id, designation, sect_id, dept_id,
        inch_app_status, inch_coment, incharge_required, hod_coment, hod_required, hod_app_status } = approvalData
    useEffect(() => {
        const getApprovalData = async () => {
            const postDeptData = {
                dept_id: dept_id,
                sect_id: sect_id,
            }
            const result = await axioslogin.get(`/Resignation/hrpendingbyID/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { resig_slno, relieving_date, request_date, resign_reason, em_id, sect_id, dept_id,
                    designation, inch_app_status, inch_coment, incharge_required, hod_coment, hod_required
                } = data[0]
                const apprveData = {
                    relieving_date: relieving_date,
                    request_date: request_date,
                    resign_reason: resign_reason,
                    designation: designation,
                    emp_id: em_id,
                    sect_id: sect_id,
                    dept_id: dept_id,
                    resig_slno: resig_slno,
                    incharge_required: incharge_required,
                    inch_app_status: inch_app_status,
                    inch_coment: inch_coment,
                    hod_coment: hod_coment,
                    hod_required: hod_required,
                    hod_app_status: hod_app_status,
                }
                setApprovalData(apprveData)

            }
            else {
                errorNofity("Error Occured Please Contact EDP")
            }
            //getting due clearence Department
            if (dept_id !== 0 && sect_id !== 0) {
                const results = await axioslogin.post('/Duedepartment/duedept', postDeptData)
                const { success1, data1 } = results.data
                if (success1 === 1) {
                    const { due_dept_code } = data1[0]
                    const duedepartment = JSON.parse(due_dept_code)
                    const duedeptdetl = duedepartment.map((val) => {
                        return { deptcode: val.deptcode, deptname: val.deptdesc, emp_id: emp_id }
                    })
                    SetDueDept(duedeptdetl)
                }
            }

        }
        getApprovalData()
    }, [slno, dept_id, sect_id])
    console.log(dueDept)
    const updateInchargeApproval = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const approveData = {
        em_id: emp_id,
        hr_id: em_id,
        hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
        hr_app_status: approve === true ? 1 : reject === true ? 0 : 0,
        hr_coment: hr_comment,
        resign_status: approve === true ? 'A' : reject === true ? 'R' : null,
        resig_slno: resig_slno,
    }
    const submitFormdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/Resignation/resignapproval', approveData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity("Resignation Request Approved")
            setCount(count + 1)
            setFormData(defaultState)
            handleClose()
            if (approve === true) {
                const result = await axioslogin.post('/dueclearence', dueDept)
            }
            else {

            }


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
                                {
                                    hod_required === 1 ? <HodStatus hod_app_status={hod_app_status} hod_coment={hod_coment} /> : null
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
                                            placeholder="HR Comment"
                                            style={{ width: 500 }}
                                            name="hr_comment"
                                            value={hr_comment}
                                            onChange={(e) => updateInchargeApproval(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogActions>
                        <Button color="primary" onClick={submitFormdata} >Submit</Button>
                        <Button onClick={handleClose} color="primary" >Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
};

export default HRApprovalComponent;
