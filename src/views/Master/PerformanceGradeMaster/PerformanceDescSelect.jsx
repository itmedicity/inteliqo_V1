import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const PerformanceDescSelect = ({ value, setValue, style, label }) => {

    /** setting selected performance grade description */
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    //name={name}
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{label}</MenuItem>
                    <MenuItem value='1'>Key Performer</MenuItem>
                    <MenuItem value='2'>Star Performer </MenuItem>
                    <MenuItem value='3'>Good Performer </MenuItem>
                    <MenuItem value='4'>Potential Performer</MenuItem>
                    <MenuItem value='5'>General Performaer</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default PerformanceDescSelect