import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Slide, TextareaAutosize } from '@material-ui/core';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DeptClearence from './DeptClearence'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DueClearenceApprovalModel = ({ open, handleClose, slno, setCount, count }) => {
    const [emp, setEmp] = useState(0)
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [approveData, setapproveData] = useState({
        due_dept_code: '',
        due_emp_id: '',
        due_slno: '',
        em_department: '',
        em_dept_section: ''
    })
    const { due_dept_code, due_slno, em_department, em_dept_section } = approveData
    useEffect(() => {
        const getDueDetails = async () => {
            const result = await axioslogin.get(`/dueclearence/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { due_dept_code, due_emp_id, due_slno, em_department, em_dept_section } = data[0]
                const frmData = {
                    due_dept_code: due_dept_code,
                    due_emp_id: due_emp_id,
                    due_slno: due_slno,
                    em_department: em_department,
                    em_dept_section: em_dept_section,
                }
                setapproveData(frmData)
            }
        }
        getDueDetails()
    }, [slno])
    const [formData, setFormData] = useState({
        approve: false,
        reject: false,
        hold: false,
        comment: ''
    })
    const defaultState = {
        approve: false,
        reject: false,
        hold: false,
        comment: ''
    }
    const { approve, reject, hold, comment } = formData
    const updatedueClearence = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        due_dept_status: approve === true ? 'A' : reject === true ? 'R' : hold === true ? 'H' : null,
        due_dept_comment: comment,
        approved_date: moment(new Date()).format('YYYY-MM-DD'),
        approved_user: em_id,
        charge_handover_emp: emp === 0 ? null : emp,
        due_slno: due_slno
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/dueclearence', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
            setFormData(defaultState)
            handleClose()
        }
        else if (success === 3) {
            warningNofity(message)
        }
        else {
            errorNofity("Error Occured!!Please Contact EDP")
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
                    {"Due Clearence"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <div className="card">
                        <div className="card-body">
                            {em_department !== '' && (em_department === due_dept_code) ? <DeptClearence em_department={em_department} em_dept_section={em_dept_section} setEmp={setEmp} /> : null}
                            <div className="row g-1">
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="approve"
                                                    color="primary"
                                                    value={approve}
                                                    checked={approve}
                                                    disabled={reject === true || hold === true ? true : false}
                                                    className="ml-2 "
                                                    onChange={(e) =>
                                                        updatedueClearence(e)
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
                                                    disabled={approve === true || hold === true ? true : false}
                                                    className="ml-2 "
                                                    onChange={(e) =>
                                                        updatedueClearence(e)
                                                    }
                                                />
                                            }
                                            label="Reject"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="hold"
                                                    color="primary"
                                                    value={hold}
                                                    checked={hold}
                                                    disabled={approve === true || reject === true ? true : false}
                                                    className="ml-2 "
                                                    onChange={(e) =>
                                                        updatedueClearence(e)
                                                    }
                                                />
                                            }
                                            label="Hold"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-1">
                                <div className="col-md-12" >
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="Comment"
                                        style={{ width: 500 }}
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => updatedueClearence(e)}
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

export default DueClearenceApprovalModel;
