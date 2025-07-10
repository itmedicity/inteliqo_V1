import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRegistrationType } from 'src/redux/actions/RegistrationType.Action';
import _ from 'underscore';

const CourseSelectRedux = ({ value, setValue, education, coursedisable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setRegistrationType()), [dispatch])

    const empCourse = useSelector((state) => state.getEmployeeCourse.CourseList, _.isEqual)
    const course = useMemo(() => empCourse, [empCourse]);

    const filterarr = course?.filter(val => val.edu_slno === education)

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={coursedisable}
        >
            <Option disabled value={0}> Select Course</Option>
            {
                filterarr?.map((val, index) => {
                    return <Option key={index} value={val.cour_slno}>{val.cour_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(CourseSelectRedux)