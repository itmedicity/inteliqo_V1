import React, { useEffect, memo } from 'react'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { setDept } from 'src/redux/actions/Dept.Action';
import { useMemo } from 'react';

const DeptSelectByRedux = ({ value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setDept()), [dispatch])

    const dept = useSelector((state) => state?.getdept?.departmentlist);
    const deptValues = useMemo(() => dept, [dept])

    return (
        <FormControl fullWidth size="small"  >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} disabled >Select Department</MenuItem>
                {
                    deptValues && deptValues.map((val, index) => {
                        return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(DeptSelectByRedux)