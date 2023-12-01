import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const DeptSecSelectAuth = ({ sectValue, getDeptSection, setDeptname }) => {
    const [deptsec, setDeptsec] = useState([]);

    useEffect(() => {
        const getdeptsection = async () => {
            const result = await axioslogin.get('/section/select/all')
            const { success, data } = result.data;
            if (success === 1) {
                setDeptsec(data)
            } else {
                setDeptsec([])
            }
        }
        getdeptsection()
    }, []);

    return (
        <Select
            value={sectValue}
            onChange={(event, newValue) => {
                setDeptname(event.target.innerText);
                getDeptSection(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Department Section</Option>
            {
                deptsec?.map((val, index) => {
                    return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DeptSecSelectAuth)
