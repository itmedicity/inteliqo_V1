import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Option, Select } from '@mui/joy';

const JoyDeptWiseTrainingNames = ({ value, setValue, dept }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async () => {
            // const result = await axioslogin.get(`/TrainingSchedule/training_names_by_dept/${dept}`)
            const result = await axioslogin.get('/TrainingSchedule/selecttrainingname')
            const { success, data } = result.data;
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        selectData()
    }, [dept])

    return (
        <Fragment>

            <Select
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                size='md'
                variant='outlined'
            >
                <Option disabled value={0}>Select Training Names</Option>
                {
                    view?.map((val, index) => {
                        return <Option key={index} value={val.name_slno}>{val.training_name}</Option>
                    })
                }
            </Select>
        </Fragment>
    )
}


export default memo(JoyDeptWiseTrainingNames) 
