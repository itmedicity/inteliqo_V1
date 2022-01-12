import { IconButton, LinearProgress } from '@mui/material';
import moment from 'moment';
import React, { Fragment, memo, Suspense } from 'react'
import { useState, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import DepartmentShiftSelect from 'src/views/Attendance/DutyPlanning/DepartmentShiftSelect';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const DropDownList = ({ data, duty, count }) => {
    const { emp_id, start, end } = data;
    const [dutyplan, setDutyplan] = useState();
    const [change, setChange] = useState(0)
    const postdata = {
        emp_id: emp_id,
        start_date: moment(start).format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(end).format('YYYY-MM-DD HH:mm:ss'),
    }
    // Get the Duty Plan Details from Database
    useEffect(() => {
        if (duty === 1) {
            const getDutyPlan = async () => {
                const result = await axioslogin.post("/plan", postdata);
                const { success, data } = result.data;
                if (success === 1) {
                    setDutyplan(data)
                }
                else if (success === 0) {
                    warningNofity("No Record Found")
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }
            }
            getDutyPlan()
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }, [duty, count, postdata])
    // shift Array 
    const [empPlan, setEmpPlan] = useState([]);
    // Submit the Duty Plan to the Database 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch("/plan", empPlan)
        const { success } = result.data
        if (success === 1) {
            succesNofity("Duty Plan Updated")
            setChange(0)
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    dutyplan && dutyplan.map((val, index) => {

                        return <td key={val.plan_slno} className='text-center' width={300} >
                            <DepartmentShiftSelect index={index} data={val} setDutyPlan={setEmpPlan}
                                planArray={empPlan} changeColor={setChange} />
                        </td>
                    })
                }
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
