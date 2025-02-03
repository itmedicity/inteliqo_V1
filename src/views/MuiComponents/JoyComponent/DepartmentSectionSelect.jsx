import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const DepartmentSectionSelect = ({ value, setValue, dept }) => {

    const [section, setSection] = useState([])

    useEffect(() => {
        const getDeptSection = async () => {
            const result = await axioslogin.get(`/section/sect/${dept}`);
            const { success, data } = await result.data;
            if (success === 1) {
                setSection(data)
            } else {
                setSection([])
            }
        }
        getDeptSection()
    }, [dept])

    return (
        <Select
            value={value === null ? 0 : value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Department Section</Option>
            {
                section?.map((val, index) => {
                    return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DepartmentSectionSelect) 