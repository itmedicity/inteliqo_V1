import { Option, Select } from '@mui/joy';
import React, { memo } from 'react'

const LeavePolicySelect = ({ value, setValue }) => {
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option value={0}>Select Leave Credit Policy</Option>
            <Option value={1}>Day</Option>
            <Option value={2}>Monthly</Option>
            <Option value={3}>Yearly</Option>
            <Option value={4}>  Based On Leave</Option>
        </Select>
    )
}

export default memo(LeavePolicySelect) 