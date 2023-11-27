import React, { useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { memo } from 'react';
import { Option, Select } from '@mui/joy';

const NationSlnoSelection = ({ value, setValue }) => {

    const [nation, setNation] = useState([]);
    useEffect(() => {
        const getNation = async () => {
            const result = await axioslogin.get('/common/getNation');
            const { success, data } = await result.data;
            if (success === 1) {
                setNation(data)
            } else {
                setNation([])
            }
        }
        getNation()
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
            <Option disabled value={0}>Select Nation </Option>
            {
                nation?.map((val, index) => {
                    return <Option key={index} value={val.nat_slno}>{val.nat_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(NationSlnoSelection)
