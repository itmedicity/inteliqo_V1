import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';

const BloodgrpSelect = ({ name, style, onChange }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBloodgrp());
    }, [])

    //for glood group list
    const empBloodgrp = useSelector((state) => {
        //console.log(state);
        return state.getEmployeeBloodgrp.empBlood
    })

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-2"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0'>
                        Blood Group
                    </MenuItem>
                    {
                        empBloodgrp && empBloodgrp.map((val, index) => {
                            return <MenuItem key={index} value={val.group_slno}>{val.group_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Fragment>
    )
}

export default BloodgrpSelect
