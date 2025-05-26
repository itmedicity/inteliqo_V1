import React, { memo, useEffect, useState } from 'react'
import { Option, Select } from '@mui/joy';
import { axioslogin } from '../../Axios/Axios';

const JoyLeaveType = ({ value, setValue }) => {
    const [leavetype, setleaveType] = useState([]);

    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/leaveType/select')
                .then((response) => {
                    const arr = response?.data?.data?.filter((val) => val.lvetype_slno === 1 || val.lvetype_slno === 7 || val.lvetype_slno === 8)
                    setleaveType(arr)
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

export default memo(JoyLeaveType) 