import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmpUnderDeptSec } from 'src/redux/actions/EmpUnderDeptSec.Action';
import _ from 'underscore';

const EmployeeUderDeptSec = ({ value, setValue, deptSect }) => {

    const dispatch = useDispatch()
    const EmpUnderDeptSec = useSelector((state) => state.getEmpUnderDeptsecList.empNamesList, _.isEqual)
    const employeeLIst = useMemo(() => EmpUnderDeptSec, [EmpUnderDeptSec]);

    useEffect(() => {
        dispatch(setEmpUnderDeptSec(deptSect))
    }, [deptSect, dispatch])


    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    All Employees
                </MenuItem>
                {
                    employeeLIst && employeeLIst.map((val, index) => {
                        return <MenuItem key={index} value={val.em_no}>{val.em_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(EmployeeUderDeptSec)