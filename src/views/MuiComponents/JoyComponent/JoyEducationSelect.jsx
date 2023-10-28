import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEducation } from 'src/redux/actions/Education.Action'
import _ from 'underscore'

const JoyEducationSelect = ({ value, setValue, }) => {
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setEducation()), [dispatch])

    const empEducation = useSelector((state) => state?.getEmployeeEducation?.EducationList, _.isEqual)
    const educationList = useMemo(() => empEducation, [empEducation]);


    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [value, setValue])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Education</Option>
            {
                educationList?.map((val, index) => {
                    return <Option key={index} value={val.edu_slno}>{val.edu_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyEducationSelect) 