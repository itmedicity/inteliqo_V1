import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { setDept } from 'src/redux/actions/Dept.Action';
import _ from 'underscore';
import { useMemo } from 'react';

const DeptSelectByRedux = ({ style, value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setDept()), [dispatch])

    const dept = useSelector((state) => state.getdept.departmentlist, _.isEqual);
    const deptValues = useMemo(() => dept, [dept])

    return (
        <FormControl fullWidth size="small"  >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                // sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                sx={{ ...style, minWidth: 100 }}
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