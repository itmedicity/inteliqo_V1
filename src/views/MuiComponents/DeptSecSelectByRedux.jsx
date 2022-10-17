import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptartmentSect } from 'src/redux/actions/DeptSectionByDept.Action'

const DeptSecSelectByRedux = ({ value, setValue, style, dept }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDeptartmentSect(dept))
    }, [dispatch, dept])

    const departmentSec = useSelector((state) => {
        return state.getDeptSecList.deptSecList
    })

    return (
        <Box>
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
                    <MenuItem value={0} disabled >Select Department Section</MenuItem>
                    {
                        departmentSec && departmentSec.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default DeptSecSelectByRedux