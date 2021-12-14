import React, { Fragment, useState } from 'react'
import TextInput from 'src/views/Component/TextInput';
import { Switch, Typography, Stack, IconButton } from '@mui/material'
import '../EmpStyle.css'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { employeeNumber } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';
import { FormatListBulletedSharp } from '@material-ui/icons';


const FixedWagesSalaryIncre = ({ value, emno, emid }) => {
    const { earnded_name, em_amount, changed_date, em_salary_desc } = value;
    const [color, setColor] = useState(false);
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
        incr_start_date: moment(start_date).format('YYYY-MM-DD'),
        incre_type: increment_type === false ? 0 : 1,
        incre_amount: increment_type === false ? parseInt(em_amount) - parseInt(increment_amount) : parseInt(em_amount) + parseInt(increment_amount),
        incre_last_changed_date: changed_date === null ? '0000:00:00' : moment(changed_date).format('YYYY-MM-DD'),
        create_user: employeeNumber()

    }
    console.log(postData)
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
        }
    }


    return (
        <Fragment>
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between " >
                    <div className="col-md-3 text-start">{earnded_name}</div>
                    <div className="col-md-1 text-start">{em_amount}</div>
                    <div className="col-md-2 text-start">{changed_date}</div>
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

export default FixedWagesSalaryIncre
