import { Option, Select } from '@mui/joy';
import React, { memo } from 'react'

const JoyClicnicalType = ({ value, setValue }) => {
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option value={0}>Select Type</Option>
            <Option value={1}>Clinical</Option>
            <Option value={2}>Non Clinical</Option>
            <Option value={3}>Accademic</Option>
        </Select>
    )
}

export default memo(JoyClicnicalType) 