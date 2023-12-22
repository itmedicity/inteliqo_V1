import { Option, Select } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from 'src/redux/actions/Course.Action'
import _ from 'underscore'

const JoyCourseSelect = ({ courseValue, setCourseValue, setCourseName }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setCourse()), [dispatch])

    const empCourse = useSelector((state) => state?.getEmployeeCourse?.CourseList, _.isEqual)

    return (
        <Select
            value={courseValue}
            onChange={(event, newValue) => {
                setCourseValue(newValue);
                setCourseName(event.target.innerText)
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Course</Option>
            {
                empCourse?.map((val, index) => {
                    return <Option key={index} value={val.cour_slno}>{val.cour_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyCourseSelect) 