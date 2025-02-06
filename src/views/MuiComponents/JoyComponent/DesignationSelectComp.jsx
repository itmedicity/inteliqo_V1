import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDesignation } from 'src/redux/actions/Designation.Action';
import { Option, Select } from '@mui/joy';

const DesignationSelectComp = ({ value, setValue }) => {

    const dispatch = useDispatch()

    useEffect(() => dispatch(setDesignation()), [dispatch])
    const empDesignation = useSelector((state) => state?.getEmployeeDesignation?.designationList)

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Designation</Option>
            {
                empDesignation?.map((val, index) => {
                    return <Option key={index} value={val.desg_slno}>{val.desg_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DesignationSelectComp) 