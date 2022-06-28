import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Slide, TextareaAutosize, Typography } from '@material-ui/core'
import moment from 'moment';
import React, { Fragment, useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import TextInput from 'src/views/Component/TextInput';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ContractCloseHrApprovalModel = ({ open, handleClose, slno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [dueDept, SetDueDept] = useState({})
    const [approvalData, setApprovalData] = useState({
        em_cont_start: '',
        em_cont_close_date: '',
        emp_id: '',
        em_department: '',
        em_dept_section: '',
        em_no: '',
        em_designation: ''
    })
    const { em_cont_start, em_cont_close_date, emp_id, em_department, em_dept_section,
        em_no, em_designation } = approvalData

    useEffect(() => {
        const postDeptData = {
            dept_id: em_department,
            sect_id: em_dept_section,
        }
        const getContractdetlbyId = async () => {
            const result = await axioslogin.get(`/empcontract/contractclosedetl/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_close_date, em_id, em_department, em_dept_section,
                    em_no, em_designation } = data[0]
                const apprdata = {
                    em_cont_start: em_cont_start,
                    em_cont_close_date: em_cont_close_date,
                    emp_id: em_id,
                    em_department: em_department,
                    em_dept_section: em_dept_section,
                    em_no: em_no,
                    em_designation: em_designation
                }
                setApprovalData(apprdata)
            }
            else {
                errorNofity("Error Occured!!!Please Contact Edp")
            }
            //getting due clearence Department
            if (em_department !== 0 && em_dept_section !== 0) {
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
        getContractdetlbyId()
    }, [slno, em_department, em_dept_section])
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
    const updateInchargeApproval = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        dept_id: em_department,
        sect_id: em_dept_section,
        em_id: emp_id,
        em_no: em_no,
        designation: em_designation,
        resignation_type: 3,
        request_date: em_cont_close_date,
        relieving_date: em_cont_close_date,
        resign_reason: "Contract Closed",
        contract_close_resign: 'C',
        hr_id: em_id,
        hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
        hr_app_status: approve === true ? 1 : reject === true ? 0 : 0,
        hr_coment: hr_comment,
        resign_status: approve === true ? 'A' : reject === true ? 'R' : null,
    }
    const submitFormdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/Resignation/contractcloseHrapprvl', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity("Resignation Request Approved")
            setFormData(defaultState)
            setCount(count + 1)
            handleClose()
            if (approve === true) {
                await axioslogin.post('/dueclearence', dueDept)
            }
            else {

            }
        }
        else if (success === 2) {
            warningNofity(message)
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
                    {"Contract Close HR Approval"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="row g-1">
                                    <div className="col-md-6 pt-1" >
                                        <Typography>Contract Start Date</Typography>
                                    </div>
                                    <div className="col-md-6" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Cpntarct Start Date"
                                            fullWidth
                                            disabled="Disabled"
                                            value={em_cont_start}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-6 pt-1" >
                                        <Typography>Contarct End Date</Typography>
                                    </div>
                                    <div className="col-md-6" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Contarct End Date"
                                            fullWidth
                                            disabled="Disabled"
                                            value={em_cont_close_date}
                                        />
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
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitFormdata} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default ContractCloseHrApprovalModel