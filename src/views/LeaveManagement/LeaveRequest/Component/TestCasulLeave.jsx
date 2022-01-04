import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'


const TestCasulLeave = ({ name, select, style, onChange }) => {
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`cas${name}`}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    <MenuItem value='1'>JAN - 01</MenuItem>
                    <MenuItem value='2'>FEB - 02</MenuItem>
                    <MenuItem value='3'>MAR - 03</MenuItem>
                    <MenuItem value='4'>APR - 04</MenuItem>
                    <MenuItem value='5'>MAY - 05</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestCasulLeave
