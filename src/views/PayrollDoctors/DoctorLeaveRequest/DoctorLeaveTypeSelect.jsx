import { Option, Select } from '@mui/joy'
import React, { memo } from 'react'

const DoctorLeaveTypeSelect = ({ value, setValue }) => {
    const leaveRequestType = [
        { lrequest_slno: 1, lrequest_type: 'Leave Request' },
        { lrequest_slno: 2, lrequest_type: 'Compensatory OFF' },
    ]

    return (
        <Select
            defaultValue={value}
            onChange={(event, newValue) => { setValue(newValue) }}
            size="md"
            sx={{ width: '100%' }}
            variant="outlined"
            color="primary"
        >
            <Option value={0} disabled>
                Leave Request Type ...
            </Option>
            {leaveRequestType &&
                leaveRequestType.map((val, index) => {
                    return (
                        <Option key={index} value={val.lrequest_slno}>
                            {val.lrequest_type}
                        </Option>
                    )
                })}
        </Select>
    )
}

export default memo(DoctorLeaveTypeSelect) 
