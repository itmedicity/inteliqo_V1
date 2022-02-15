import { FormControl, MenuItem, Selec, IconButtont } from '@material-ui/core';
import { Select } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';

const ShiftHalfdayComponent = ({ style, shiftdata, onChange }) => {
    const [datachange, setdatachange] = useState(0)
    useEffect(() => {
        if (shiftdata[0].shift_id !== '') {
            setdatachange(shiftdata[0].shift_id)

        }
    }, [shiftdata])
    const updatechange = (e) => {
        setdatachange(e.target.value)
    }
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`hol`}
                    // name={holname}
                    onChange={(e) => {
                        updatechange(e)
                        onChange(e)
                    }}
                    fullWidth
                    value={datachange}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} selected disabled>Select Shift</MenuItem>
                    {shiftdata && shiftdata.map((val, index) => {

                        return <MenuItem key={index} value={val.shift_id} >{val.shft_desc}</MenuItem>

                    })}
                </Select>
            </FormControl>
        </Fragment>
    )
};

export default ShiftHalfdayComponent;
