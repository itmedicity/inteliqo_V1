import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useState } from 'react'

const EsiLeaveComponent = ({ name, select, style, onChange, eL, getEarnleave }) => {
    const { earnname, getEarnvalue } = getEarnleave
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`el${name}`}
                    onChange={onChange}
                    fullWidth
                    value={getEarnvalue}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    {eL && eL.map((val, index) => {
                        return <MenuItem key={index} value={val.hrm_ernlv_slno} disabled={val.ernlv_taken === 1 ? true : null} >{val.ernlv_mnth}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Fragment>
    );
};

export default EsiLeaveComponent;
