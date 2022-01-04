import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const TestLeaveType = ({ name, select, style, onChange }) => {
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    <MenuItem value='1'>Leave Request</MenuItem>
                    <MenuItem value='2'>Half Day Leave </MenuItem>
                    <MenuItem value='3'>No Puch request</MenuItem>
                    <MenuItem value='4'>Late Coming Request</MenuItem>
                    <MenuItem value='5'>Early Going Request</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestLeaveType
