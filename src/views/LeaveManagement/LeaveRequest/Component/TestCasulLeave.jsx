import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'


const TestCasulLeave = ({ name, select, style, onChange, CL, getcasleave }) => {
    const { getvalvalue } = getcasleave

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`cl${name}`}
                    onChange={onChange}
                    fullWidth
                    value={getvalvalue}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    {
                        CL && CL.map((val, index) => {
                            return <MenuItem key={index} value={val.hrm_cl_slno} >{val.cl_lv_mnth}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default TestCasulLeave
