import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDesignation } from 'src/redux/actions/Designation.Action';
import _ from 'underscore';

const DesignationSelectRedux = ({ value, setValue, }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setDesignation()), [dispatch])

    const empDesignation = useSelector((state) => state.getEmployeeDesignation.designationList, _.isEqual)
    const desgData = useMemo(() => empDesignation, [empDesignation]);

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
                    Select Designation
                </MenuItem>
                {
                    desgData && desgData.map((val, index) => {
                        return <MenuItem key={index} value={val.desg_slno}>{val.desg_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(DesignationSelectRedux) 