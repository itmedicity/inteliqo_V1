import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const TrainingTopicByTrainingName = ({ trainingname, value, setValue }) => {
    const [view, setView] = useState([]);

    useEffect(() => {
        const selectData = async (trainingname) => {
            const result = await axioslogin.get(`/TrainingEmployeeSchedule/selecttopic/${trainingname}`)
            const { success, data } = result.data;
            if (success === 1) {
                setView(data);
            } else {
                setView([]);
            }
        }
        selectData(trainingname)
    }, [trainingname])

    return (
        <Fragment>
            <FormControl
                fullWidth
                size='small'
            >
                <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                >
                    <MenuItem disabled value={0}  >
                        Select Training Topics
                    </MenuItem>
                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.topic_slno}>{val.training_topic_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(TrainingTopicByTrainingName)