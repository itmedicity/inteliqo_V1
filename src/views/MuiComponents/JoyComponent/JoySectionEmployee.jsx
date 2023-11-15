import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmpUnderDeptSec } from 'src/redux/actions/EmpUnderDeptSec.Action'
import _ from 'underscore'

const JoySectionEmployee = ({ value, setValue, deptSect }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setEmpUnderDeptSec(deptSect))
    }, [deptSect, dispatch])

    const EmpUnderDeptSec = useSelector((state) => state?.getEmpUnderDeptsecList?.empNamesList, _.isEqual)
    const employeeLIst = useMemo(() => EmpUnderDeptSec, [EmpUnderDeptSec]);


    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Employees</Option>
            {
                employeeLIst?.map((val, index) => {
                    return <Option key={index} value={val.em_id}>{val.em_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySectionEmployee) 