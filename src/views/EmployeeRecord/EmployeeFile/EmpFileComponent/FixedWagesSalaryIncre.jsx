import React, { Fragment, memo, useState } from 'react'
import TextInput from 'src/views/Component/TextInput';
import { Switch, Typography, Stack, IconButton } from '@mui/material'
import '../EmpStyle.css'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { employeeNumber } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';
import ModelSalaryIncrement from './ModelSalaryIncrement';
const FixedWagesSalaryIncre = ({ value, emno, emid }) => {
    const { earnded_name, em_amount, em_salary_desc } = value;

    const [color, setColor] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        start_date: "",
        increment_type: true,
        increment_amount: 0
    })
    const { start_date, increment_type, increment_amount } = formData
    const defaultState = {
        start_date: "",
        increment_type: true,
        increment_amount: 0
    }
    const updateSalaryIncrement = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        em_id: emid,
        em_no: emno,
        em_salary_desc: em_salary_desc,
        last_amount: em_amount,
        incr_start_date: moment(start_date).format('YYYY-MM-DD'),
        incre_type: increment_type === false ? 0 : 1,
        incre_amount: increment_type === false ? parseInt(em_amount) - parseInt(increment_amount) : parseInt(em_amount) + parseInt(increment_amount),
        create_user: employeeNumber()
    }

    //saving salary increment setting
    const SubmitFormData = async (e) => {
        e.preventDefault()
        if (increment_type === false && (increment_amount > em_amount)) {
            infoNofity('Decrement Amount Is Greater Than Current Amount')
        }
        else {
            const result = await axioslogin.post('/salaryIncrement', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setColor(!color)
                setFormData(defaultState)
            }
            else if (success === 7) {
                infoNofity(message)
                setOpen(true);
            }
            else if (success === 2) {
                infoNofity(message)
            }
            else {
                errorNofity("Error Occured Please Contact EDP")
            }
        }
    }
    //for closing model
    const handleClose = () => {
        setOpen(false);
        setFormData(defaultState)
    };
    return (
        <Fragment>
            {open === true ? <ModelSalaryIncrement open={open} handleClose={handleClose} em_salary_desc={em_salary_desc} emno={emno} /> : null}
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between" >
                    <div className="col-md-3 text-start">{earnded_name}</div>
                    <div className="col-md-1 text-start">{em_amount}</div>
                    <div className="col-md-2 text-start">
                        <div className="col-md-10">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm custom-datefeild-height"
                                Placeholder="Date"
                                name="start_date"
                                value={start_date}
                                changeTextValue={(e) => updateSalaryIncrement(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-1 text-start">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>-</Typography>
                            <Switch size="small"
                                color="success"
                                checked={increment_type}
                                name="increment_type"
                                value={increment_type}
                                onChange={(e) => updateSalaryIncrement(e)}
                            />
                            <Typography>+</Typography>
                        </Stack>
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="number"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="0.00"
                            name="increment_amount"
                            value={increment_amount}
                            changeTextValue={(e) => updateSalaryIncrement(e)}
                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={SubmitFormData}  >
                            <AddTaskRoundedIcon color={color === false ? "success" : "error"} />
                        </IconButton>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}

export default memo(FixedWagesSalaryIncre) 
