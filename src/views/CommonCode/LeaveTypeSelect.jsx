import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Option, Select } from '@mui/joy';

const LeaveTypeSelect = ({ value, setValue }) => {
    const [leavetype, setleaveType] = useState([]);

    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/common/getLeaveType')
                .then((response) => {
                    setleaveType(response.data.data)
                    return response.data.data;
                })
                .catch((error) => {
                    return error;
                });
            return result;
        }
        getleaveTypeData();
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
            <Option disabled value={0}> Select Leave Type </Option>
            {
                leavetype?.map((val, index) => {
                    return <Option key={index} value={val.lvetype_slno}>{val.lvetype_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(LeaveTypeSelect)
