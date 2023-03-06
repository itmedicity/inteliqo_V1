import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';

const HalfDayCasualLeaveOption = ({ disable, handleChange, value }) => {
    const [casualLeve, setCasualLeave] = useState([]);
    const [name, setName] = useState('')

    const casulLeves = useSelector((state) => state.getCreditedCasualLeave, _.isEqual);
    const casualLve = useMemo(() => casulLeves, [casulLeves])

    useEffect(() => {
        const { casualLeave } = casualLve;
        setCasualLeave(casualLeave);
    }, [casualLve])

    console.log(name)
    return (
        <FormControl
            fullWidth={true}
            margin="dense"
            size='small'
            sx={{ display: "flex", flex: 1 }}
        >
            <Select
                fullWidth
                variant="outlined"
                margin='dense'
                size='small'
                // defaultValue={0}
                disabled={disable}
                value={value}
                onChange={handleChange}
                name={name}
            >
                <MenuItem value={0} disabled>Select Leave Name</MenuItem>
                {
                    casualLeve?.map((val, index) => {
                        return <MenuItem value={val.hrm_cl_slno} key={index} onClick={() => setName(val.cl_lv_mnth)} >{`${val.cl_lv_mnth} - ${val.cl_bal_leave}`}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(HalfDayCasualLeaveOption)