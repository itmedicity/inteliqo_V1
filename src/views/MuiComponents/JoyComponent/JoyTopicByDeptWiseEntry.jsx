import React, { Fragment, memo, useEffect, useState } from 'react'
import { Option, Select } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const JoyTopicByDeptWiseEntry = ({ value, setValue, dept }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async () => {
            const result = await axioslogin.get(`/TrainingTopic/topic_by_dept/${dept}`)
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
                <Option disabled value={0}>Select Training Topics</Option>
                {
                    view?.map((val, index) => {
                        return <Option key={index} value={val.topic_slno}>{val.training_topic_name}</Option>
                    })
                }
            </Select>
        </Fragment>
    )
}

export default memo(JoyTopicByDeptWiseEntry) 
