import { Button, IconButton, LinearProgress } from '@mui/material';
import moment from 'moment';
import React, { Fragment, memo, Suspense } from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

const DropDownList = ({ data }) => {
    const { emp_id, start, end } = data;
    const [dutyplan, setDutyplan] = useState();
    const [change, setChange] = useState(0)

    const postdata = {
        emp_id: emp_id,
        start_date: start,
        end_date: end
    }
    //Get the Duty Plan Details from Database
    useEffect(() => {
        const getDutyPlan = async () => {
            const result = await axioslogin.post("/plan", postdata);
            const { success, data } = result.data;
            setDutyplan(data)
        }
        getDutyPlan()

    }, [])

    const [empPlan, setEmpPlan] = useState([]);
    // filter the changed duty plan details to avoid duplication
    const handleChange = (e, index, slno, plan) => {
        const plan_date = moment(plan).format('YYYY-MM-DD')
        const newPlanArray = empPlan.filter((val) => {
            return val.plan_slno !== slno
        })
        setEmpPlan([...newPlanArray, { plan_date: plan_date, plan_slno: slno, shift_slno: e.target.value }]);
        setChange(1);
    }

    // Submit the Duty Plan to the Database 
    const handleSubmit = () => {
        // console.log(emp_id, empPlan)
        setChange(0)
    }

    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    dutyplan && dutyplan.map((val, index) => {
                        return <td key={val.plan_slno} className='text-center' width={300} >
                            <select className="custom-select"
                                onChange={(e) => handleChange(e, index, val.plan_slno, val.duty_day)}
                            >
                                <option defaultValue="0">Choose...</option>
                                <option value="1">M-1</option>
                                <option value="2">M-2</option>
                                <option value="3">M-3</option>
                            </select>
                        </td>
                    })
                }
                {/* <td><Button onClick={handleSubmit} >Update</Button></td> */}
                <td className='text-center' >
                    <IconButton className='p-0' onClick={handleSubmit}  >
                        <ChangeCircleOutlinedIcon style={change === 1 ? { color: 'red' } : { color: 'green' }} />
                    </IconButton>
                </td>
            </Suspense>
        </Fragment>
    )
}

export default memo(DropDownList)
