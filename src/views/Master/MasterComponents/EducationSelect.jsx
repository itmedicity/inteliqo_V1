import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEducation } from 'src/redux/actions/Education.Action'
import _ from 'underscore'

const EducationSelect = ({ value, setValue }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setEducation()), [dispatch])

    const empEducation = useSelector((state) => state.getEmployeeEducation.EducationList, _.isEqual)
    const educationList = useMemo(() => empEducation, [empEducation]);
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Education </Option>
            {
                educationList?.map((val, index) => {
                    return <Option key={index} value={val.edu_slno}>{val.edu_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(EducationSelect) 