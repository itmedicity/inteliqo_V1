import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const ModuleSelection = ({ value, setValue }) => {
    const [moduleGroupName, setModuleGroupName] = useState([])

    useEffect(() => {
        const getModuleNamelist = async () => {
            const result = await axioslogin.get('/modulegroup/select')
            const { success, data } = result.data;
            if (success === 1) {
                setModuleGroupName(data)
            } else {
                setModuleGroupName([])
            }
        }
        getModuleNamelist()
    }, [])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Module Group</Option>
            {
                moduleGroupName?.map((val, index) => {
                    return <Option key={index} value={val.mdgrp_slno}>{val.module_group_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(ModuleSelection)
