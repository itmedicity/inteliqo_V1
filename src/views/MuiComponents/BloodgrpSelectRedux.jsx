import React, { useEffect, memo, useMemo } from 'react'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import _ from 'underscore';
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';

const BloodgrpSelectRedux = ({ value, setValue }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setBloodgrp()), [dispatch])

    const data = useSelector((state) => state.getEmployeeBloodgrp.empBlood, _.isEqual)
    const bloodgrp = useMemo(() => data, [data])

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Blood Group
                </MenuItem>
                {
                    bloodgrp && bloodgrp.map((val, index) => {
                        return <MenuItem key={index} value={val.group_slno}>{val.group_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(BloodgrpSelectRedux)