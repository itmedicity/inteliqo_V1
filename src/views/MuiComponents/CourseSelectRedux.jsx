import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from 'src/redux/actions/Course.Action';
import { setRegistrationType } from 'src/redux/actions/RegistrationType.Action';
import _ from 'underscore';

const CourseSelectRedux = ({ value, setValue, education, coursedisable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setRegistrationType()), [dispatch])

    const empCourse = useSelector((state) => state.getEmployeeCourse.CourseList, _.isEqual)
    const course = useMemo(() => empCourse, [empCourse]);

    const filterarr = course?.filter(val => val.edu_slno === education)

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                disabled={coursedisable}
            >
                <MenuItem value={0} >
                    Select Course
                </MenuItem>
                {
                    filterarr && filterarr.map((val, index) => {
                        return <MenuItem key={index} value={val.cour_slno}>{val.cour_desc}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(CourseSelectRedux)