import { Option, Select } from '@mui/joy';
import React, { useState } from 'react'
import { memo } from 'react';
import { useEffect } from 'react';
import { axioslogin } from '../Axios/Axios';

const DistrictSelection = ({ value, setValue }) => {

    const [district, setDistrict] = useState([]);
    useEffect(() => {
        const getDistrictDetl = async () => {
            const result = await axioslogin.get('/common/getdist');
            const { success, data } = await result.data;
            if (success === 1) {
                setDistrict(data);
            } else {
                setDistrict(1)
            }
        }
        getDistrictDetl()
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
            <Option disabled value={0}>Select District </Option>
            {
                district?.map((val, index) => {
                    return <Option key={index} value={val.dist_slno}>{val.dist_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DistrictSelection)
