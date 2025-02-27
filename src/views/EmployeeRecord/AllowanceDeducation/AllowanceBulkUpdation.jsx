import { IconButton } from '@mui/material'
import React, { Fragment, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import moment from 'moment';
import { employeeIdNumber } from 'src/views/Constant/Constant';
import ModelSalaryIncrement from '../EmployeeFile/EmpFileComponent/ModelSalaryIncrement';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';


const AllowanceBulkUpdation = ({ value }) => {
    const { em_no, em_id, em_name, earnded_name, em_amount, em_salary_desc } = value
    const [color, setColor] = useState(false);
    const [open, setOpen] = useState(false);
    //initializing
    const [formData, setFormData] = useState({
        start_date: "",
        increment_amount: 0,
    })
    const defaultState = {
        start_date: "",
        increment_amount: 0,
    }
    const [changedAmount, setChangedAmount] = useState(0)

    const { start_date, increment_amount } = formData
    const updateSalaryIncrement = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    const postData = {
        em_id: em_id,
        em_no: em_no,
        em_salary_desc: em_salary_desc,
        last_amount: em_amount,
        incr_start_date: moment(start_date).format('YYYY-MM-DD'),
        incre_type: 1,
        incre_amount: changedAmount,
        create_user: employeeIdNumber()
    }
    //calculating the changed allowance
    const updateChangeAmount = async (e) => {
        if (e !== '') {
            const changedamount = parseInt(e) + parseInt(em_amount)
            setChangedAmount(changedamount)
        }
        else {
            setChangedAmount(0)
        }
    }
    //saving 
    const SubmitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/salaryIncrement', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setColor(!color)
            setFormData(defaultState)
            setChangedAmount(0)
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
    //for closing model
    const handleClose = () => {
        setOpen(false);
        setFormData(defaultState)
        setChangedAmount(0)
    };
    return (
        <Fragment>
            {open === true ? <ModelSalaryIncrement open={open} handleClose={handleClose} em_salary_desc={em_salary_desc} emno={em_no} /> : null}
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between" >
                    <div className="col-md-1 text-start">{em_no}</div>
                    <div className="col-md-2  text-start">{em_name}</div>
                    <div className="col-md-2  text-start">{earnded_name}</div>
                    <div className="col-md-1  text-start">{em_amount}</div>
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
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="number"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="0.00"
                            name="increment_amount"
                            value={increment_amount}
                            changeTextValue={(e) => {
                                updateSalaryIncrement(e)
                                updateChangeAmount(e.target.value)
                            }}
                        />
                    </div>
                    <div className="col-md-1 text-start">
                        <TextInput
                            type="number"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="0.00"
                            name="changed_amount"
                            value={changedAmount}
                            changeTextValue={(e) => setChangedAmount(e.target.value)}
                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={SubmitFormData} >
                            <AddTaskRoundedIcon color={color === false ? "success" : "error"} />
                        </IconButton>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}

export default AllowanceBulkUpdation
