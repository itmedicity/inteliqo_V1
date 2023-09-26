import { FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptartmentSect } from 'src/redux/actions/DeptSectionByDept.Action'
import _ from 'underscore'

const DeptSecSelectByRedux = ({ value, setValue, dept }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setDeptartmentSect(dept)), [dispatch, dept])

    const departmentSec = useSelector((state) => state.getDeptSecList.deptSecList, _.isEqual)
    const depatSecValues = useMemo(() => departmentSec, [departmentSec]);

    return (
        <FormControl fullWidth size="small"  >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} disabled >Select Department Section</MenuItem>
                {
                    depatSecValues && depatSecValues.map((val, index) => {
                        return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(DeptSecSelectByRedux) 