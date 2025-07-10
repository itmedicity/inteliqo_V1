import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
const UniversitySelect = ({ value, setValue, unidisable }) => {

    const [data, setData] = useState([])
    useEffect(() => {
        const getUniversity = async () => {
            const result = await axioslogin.get('/common/getUniver');
            const { data, success } = await result.data;
            if (success === 1) {
                setData(data)
            } else {
                setData([])
            }
        }
        getUniversity()
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
            <Option disabled value={0}>Select University</Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.unver_slno}>{val.unver_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(UniversitySelect)