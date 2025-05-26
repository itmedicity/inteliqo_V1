import { Option, Select } from '@mui/joy';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const InactiveEmployeeSelect = ({ deptName, deptSecName, setEmpNo, Empno }) => {

    const [empdata, setEmpdata] = useState([])

    useEffect(() => {
        const getEmpData = {
            dept_id: deptName,
            sect_id: deptSecName,
        }
        const getEmployee = async () => {
            const result = await axioslogin.post('/empmast/getEmpDetInactive', getEmpData)
            const { success, data } = result.data
            if (success === 1) {
                setEmpdata(data)
            } else {
                setEmpdata([])
            }
        }

        getEmployee(deptName, deptSecName)
    }, [deptName, deptSecName])

    return (
        <Select
            value={Empno?.em_id}
            onChange={(event, newValue) => {
                setEmpNo(newValue)
                //setEmpNo(newValue)
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Employee</Option>
            {
                empdata?.map((val, index) => {
                    return <Option key={index} value={val}>{val.emp_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(InactiveEmployeeSelect) 