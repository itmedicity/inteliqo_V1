import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getEmployeetype } from 'src/redux/actions/Common.Action'
import _ from 'underscore'

const JoyEmployeeTypeSelect = ({ value, setValue }) => {
    const [list, setList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => dispatch(getEmployeetype()), [dispatch])

    const empType = useSelector((state) => state?.setEmployeeType?.empypeList, _.isEqual)

    useEffect(() => {
        if (Object.keys(empType).length !== 0) {
            setList(empType)
        } else {
            setList([])
        }
    }, [empType])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Employee Type </Option>
            {
                list?.map((val, index) => {
                    return <Option key={val.emptype_slno} value={val.emptype_slno}>{val.emptype_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyEmployeeTypeSelect) 