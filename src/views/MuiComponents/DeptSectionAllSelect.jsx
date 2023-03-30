import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import _ from 'underscore'

const DeptSectionAllSelect = ({ value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setDeptWiseSection()), [dispatch])

    const departmentSec = useSelector((state) => state.getDeptSectList.deptSectionList, _.isEqual)
    const depatSecValues = useMemo(() => departmentSec, [departmentSec]);
    return (
        <FormControl fullWidth size="small"   >
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

export default DeptSectionAllSelect