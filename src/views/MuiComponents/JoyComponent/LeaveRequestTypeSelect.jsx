import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getLeaveRequestType } from '../../../redux/reduxFun/useQueryFunctions';
import { Option, Select } from '@mui/joy';

const LeaveRequestTypeSelect = ({ value, setValue }) => {

    const { data } = useQuery({
        queryKey: ['leaveRequestType'],
        queryFn: getLeaveRequestType
    })

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Leave Request Type</Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.lrequest_slno}>{val.lrequest_type}</Option>
                })
            }
        </Select>
    )
}

export default LeaveRequestTypeSelect