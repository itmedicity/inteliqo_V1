import { Option, Select } from '@mui/joy';
import React, { memo } from 'react'

const JoyGender = ({ value, setValue, disabled }) => {
    return (
        <Select
            value={value}
            disabled={disabled}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >

            <Option value={0}>Select Gender</Option>
            <Option value="1">Male</Option>
            <Option value="2">Female</Option>
            <Option value="3">Others</Option>
        </Select>
    )
}

export default memo(JoyGender)