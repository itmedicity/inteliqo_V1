
import { Option, Select } from '@mui/joy'
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

        <Select
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Select Department Section </Option>
            {
                depatSecValues?.map((val, index) => {
                    return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DeptSecSelectByRedux) 