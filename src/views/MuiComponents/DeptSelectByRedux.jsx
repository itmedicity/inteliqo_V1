import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { setDept } from 'src/redux/actions/Dept.Action';

const DeptSelectByRedux = ({ style, value, setValue }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDept())
    }, [dispatch])

    const dept = useSelector((state) => {
        return state.getdept.departmentlist
    })

    return (
        <Box >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={style}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select Department</MenuItem>
                    {
                        dept && dept.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(DeptSelectByRedux)