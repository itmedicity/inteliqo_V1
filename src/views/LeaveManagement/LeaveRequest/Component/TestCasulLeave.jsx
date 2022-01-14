import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useState } from 'react'


const TestCasulLeave = ({ name, select, style, onChange, CL }) => {
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
                    {
                        CL && CL.map((val, index) => {
                            return <MenuItem key={index} value={val.hrm_cl_slno}>{val.cl_lv_mnth}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestCasulLeave
