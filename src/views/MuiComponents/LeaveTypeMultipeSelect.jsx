import React, { useEffect, memo, useMemo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { setLeaveType } from 'src/redux/actions/LeaveType.Action';
import _ from 'underscore';

const LeaveTypeMultipeSelect = ({ value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setLeaveType()), [dispatch])

    const data = useSelector((state) => state.getLeaveType.LeaveTypeList, _.isEqual)

    const LeaveType = useMemo(() => data, [data])

    return (

        <Box sx={{ width: '100%', }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    multiple
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={value.length === 0} disabled >Select Leave Type</MenuItem>
                    {
                        LeaveType && LeaveType.map((val, index) => {
                            return <MenuItem key={index} value={val.lvetype_slno}>{val.lvetype_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(LeaveTypeMultipeSelect)