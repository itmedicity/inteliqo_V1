import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmpUnderDeptSec } from 'src/redux/actions/EmpUnderDeptSec.Action';
import _ from 'underscore';

const DeptWiseEmployeeSelect = ({ value, setValue, deptSect, setSelectedEmp }) => {
    const dispatch = useDispatch()
    const EmpUnderDeptSec = useSelector((state) => state.getEmpUnderDeptsecList.empNamesList, _.isEqual)
    const employeeLIst = useMemo(() => EmpUnderDeptSec, [EmpUnderDeptSec]);

    useEffect(() => {
        dispatch(setEmpUnderDeptSec(deptSect))
    }, [deptSect, dispatch])

    const getEmployeeId = useCallback((em_id) => {
        setSelectedEmp(em_id);
    }, [setSelectedEmp])

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
                <MenuItem disabled value={0} >
                    Select Employee
                </MenuItem>
                {
                    employeeLIst && employeeLIst.map((val, index) => {
                        return <MenuItem key={index} value={val.em_no} onClick={() => getEmployeeId(val.em_id)}>{val.em_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(DeptWiseEmployeeSelect) 