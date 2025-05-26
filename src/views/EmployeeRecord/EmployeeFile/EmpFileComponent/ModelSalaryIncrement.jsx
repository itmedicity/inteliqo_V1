import React, { Fragment, memo, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import { Stack, Switch, Typography } from '@mui/material';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { format } from 'date-fns';
import { employeeIdNumber } from 'src/views/Constant/Constant';
import moment from 'moment';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelSalaryIncrement = ({ open, handleClose, emno, em_salary_desc }) => {
    //setting initial use state
    const [modeldta, setmodeldata] = useState({
        incre_slno: 0,
        em_salary_desc: 0,
        em_no: emno,
        description: "",
        start_date: "",
        increment_type: true,
        increment_amount: 0,
        last_amount: 0,
    })
    //destructuring
    const { incre_slno, em_no, description, start_date, increment_type, increment_amount, last_amount } = modeldta
    const postData1 = useMemo(() => {
        return {
            em_no: emno,
            em_salary_desc: em_salary_desc
        }
    }, [emno, em_salary_desc])
    //getting salary increment details for edit
    useEffect(() => {
        if (open === true) {
            const getSalaryIncrementsetting = async () => {
                const result = await axioslogin.post('/salaryIncrement/create', postData1)
                const { success, data } = result.data
                if (success === 1) {
                    const { em_salary_desc, incre_slno, em_no, earnded_name, incr_start_date, incre_type, incre_amount, last_amount } = data[0]
                    const frmData = {
                        incre_slno,
                        em_salary_desc,
                        em_no: em_no,
                        description: earnded_name,
                        last_amount: last_amount,
                        start_date: format(new Date(incr_start_date), "yyyy-MM-dd"),
                        increment_type: incre_type === 1 ? true : false,
                        increment_amount: incre_amount
                    }
                    setmodeldata(frmData)
                }
            }
            getSalaryIncrementsetting()
        }
    }, [postData1, open])
    //getting data from the model
    const updateSalaryIncrementSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setmodeldata({ ...modeldta, [e.target.name]: value })
    }
    const updateData = {
        em_salary_desc: em_salary_desc,
        em_no: em_no,
        last_amount: last_amount,
        incr_start_date: moment(start_date).format('YYYY-MM-DD'),
        incre_type: increment_type === false ? 0 : 1,
        incre_amount: increment_type === false ? parseInt(last_amount) - parseInt(increment_amount) : parseInt(last_amount) + parseInt(increment_amount),
        edit_user: employeeIdNumber(),
        incre_slno: incre_slno
    }
    //for editing salary increment settings
    const submitformData = async (e) => {
        e.preventDefault()
        if (increment_type === false && (increment_amount > last_amount)) {
            infoNofity('Decrement Amount Is Greater Than Current Amount')
        }
        else {
            const result = await axioslogin.patch('/salaryIncrement', updateData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                handleClose()
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
    }
    return (
        <Fragment>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"
                    maxWidth="xl"
                >
                    <DialogTitle>{"Salary Increment Process"}</DialogTitle>
                    <DialogContent sx={{
                        minWidth: 300,
                        maxWidth: 600,
                        width: 600,

                    }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="col-md-12 col-sm-12" >
                                    <div className="row g-2">
                                        <div className="col-md-12 col-sm-12">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Salary Description"
                                                disabled={true}
                                                name="description"
                                                alignItems="center"
                                                value={description}
                                            //changeTextValue={(e) => updateSalaryIncrementSettings(e)}
                                            />
                                        </div>
                                        <div className="d-md-flex justify-content-between">
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="date"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Start Date"
                                                    name="start_date"
                                                    alignItems="center"
                                                    value={start_date}
                                                    changeTextValue={(e) => updateSalaryIncrementSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography>-</Typography>
                                                    <Switch size="small"
                                                        color="success"
                                                        checked={increment_type}
                                                        name="increment_type"
                                                        value={increment_type}
                                                        onChange={(e) => updateSalaryIncrementSettings(e)}
                                                    />
                                                    <Typography>+</Typography>
                                                </Stack>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Last Amount"
                                                disabled={true}
                                                name="last_amount"
                                                alignItems="center"
                                                value={last_amount}
                                            //changeTextValue={(e) => updateSalaryIncrementSettings(e)}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Incremented Amount"
                                                name="increment_amount"
                                                alignItems="center"
                                                value={increment_amount}
                                                changeTextValue={(e) => updateSalaryIncrementSettings(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitformData} color="secondary" >Submit</Button>
                        <Button onClick={handleClose} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment >
    )
}

export default memo(ModelSalaryIncrement) 
