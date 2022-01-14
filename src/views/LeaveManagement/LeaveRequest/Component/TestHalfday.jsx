import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const TestHalfday = ({ name, select, style, onChange }) => {
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`hol${name}`}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    <MenuItem value='1'>AUG-15</MenuItem>
                    <MenuItem value='2'>OCT-02</MenuItem>
                    <MenuItem value='3'>SEP-26</MenuItem>
                    <MenuItem value='4'>MAY-01</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestHalfday
