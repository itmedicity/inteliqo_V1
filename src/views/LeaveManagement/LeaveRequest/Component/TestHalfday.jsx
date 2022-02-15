import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useState } from 'react'

const TestHalfday = ({ name, select, style, onChange, NL, gethldleave, setnameselect }) => {
    const { hldname, gethldvalvalue } = gethldleave
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`hol${name}`}
                    // name={holname}
                    onChange={onChange}
                    fullWidth
                    value={gethldvalvalue}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    {/* <MenuItem value='1'>AUG-15</MenuItem>
                    <MenuItem value='2'>OCT-02</MenuItem>
                    <MenuItem value='3'>SEP-26</MenuItem>
                    <MenuItem value='4'>MAY-01</MenuItem> */}
                    {NL && NL.map((val, index) => {
                        return <MenuItem key={index} value={val.hrm_hl_slno} disabled={val.hl_lv_taken === 1 ? true : null} >{val.hld_desc}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestHalfday
