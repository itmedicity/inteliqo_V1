import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const ModuleSelection = ({ value, setValue }) => {

    const [moduleName, setModuleName] = useState([])

    useEffect(() => {
        const getModuleNameList = async () => {
            const result = await axioslogin.get('/common/getModuleName');
            const { data, success } = result.data;
            if (success === 1) {
                setModuleName(data)
            } else {
                setModuleName([])
            }
        }
        getModuleNameList()
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
            <Option disabled value={0}>Select Module Name</Option>
            {
                moduleName?.map((val, index) => {
                    return <Option key={index} value={val.module_slno}>{val.module_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(ModuleSelection) 