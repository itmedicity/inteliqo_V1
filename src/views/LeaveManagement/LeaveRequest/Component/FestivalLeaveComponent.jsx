import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const FestivalLeaveComponent = ({ name, select, style, onChange, FL, gethldleave }) => {
    const { getfestivalvalue } = gethldleave
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
                    value={getfestivalvalue}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    {FL && FL.map((val, index) => {
                        return <MenuItem key={index} value={val.hrm_hl_slno} disabled={val.hl_lv_taken === 1 ? true : null} >{val.hld_desc}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default FestivalLeaveComponent
