import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { setCourse } from 'src/redux/actions/Course.Action';

const CourseSelect = ({ courseValue, getCourse }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setCourse()), [dispatch])

    const empCourse = useSelector((state) => state?.getEmployeeCourse?.CourseList, _.isEqual)
    const [course, setCourseList] = useState([{ cour_slno: 0, cour_desc: 'Select Course' }])
    const [value, setValue] = useState(course[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (courseValue !== 0) {
            const array = course?.filter((e) => e.cour_slno === courseValue)
            setValue(array[0]);
        } else {
            setValue({})
        }
    }, [courseValue, course])

    useEffect(() => {
        empCourse.length > 0 && setCourseList(empCourse)
    }, [empCourse])


    return (
        <Autocomplete
            placeholder="Select Course"
            value={courseValue === 0 ? course : value}
            //value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
                getCourse(newValue.cour_slno)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.cour_desc === value.cour_desc}
            getOptionLabel={option => option.cour_desc || ''}
            options={course}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(CourseSelect) 