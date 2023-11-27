
import React, { useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { memo } from 'react';
import { Option, Select } from '@mui/joy';

const StateSelect = ({ value, setValue }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        const getState = async () => {
            const result = await axioslogin.get('/common/getState');
            const { success, data } = await result.data;
            if (success === 1) {
                setState(data)
            } else {
                setState([])
            }
        }
        getState()
    }, []);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select State </Option>
            {
                state?.map((val, index) => {
                    return <Option key={index} value={val.state_slno}>{val.state_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(StateSelect)
