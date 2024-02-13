import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect, useState,useMemo } from 'react'
import { axioslogin } from '../Axios/Axios'
import { useDispatch, useSelector } from 'react-redux';
import { setDesignation } from 'src/redux/actions/Designation.Action';
import _ from 'underscore';

const DesignationSelect = ({ value, setValue, style, disable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setDesignation()), [dispatch])

    const empDesignation = useSelector((state) => state.getEmployeeDesignation.designationList, _.isEqual)
    const desgData = useMemo(() => empDesignation, [empDesignation]);

  return (
    <Fragment>
    <FormControl fullWidth size="small"  >
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="selectCategory"
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            fullWidth
            variant="outlined"
            className="ml-1"
            defaultValue={0}
            style={style}
            disabled={disable}
        >
            <MenuItem value='0' disabled>
                Employee Designation
            </MenuItem>
            {
                desgData && desgData.map((val, index) => {
                    return <MenuItem key={index} value={val.desg_slno}>{val.desg_name}</MenuItem>
                })
            }

        </Select>
    </FormControl>
</Fragment>
  )
}

export default DesignationSelect