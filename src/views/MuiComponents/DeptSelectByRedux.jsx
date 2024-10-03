import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDept } from 'src/redux/actions/Dept.Action';
import { useMemo } from 'react';
import { Option, Select } from '@mui/joy';

const DeptSelectByRedux = ({ value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setDept()), [dispatch])

    const dept = useSelector((state) => state?.getdept?.departmentlist);
    const deptValues = useMemo(() => dept, [dept])

    return (
        <Select
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            size='md'
            sx={{ width: '100%' }}
            variant='outlined'
        >
            <Option disabled value={0}>  Select Department </Option>
            {
                deptValues?.map((val, index) => {
                    return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DeptSelectByRedux)