import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from 'src/redux/actions/Course.Action';
import _ from 'underscore';

const JoyCourse = ({ value, setValue, education, coursedisable, setSectName }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCourse());
    }, [dispatch])

    const empCourse = useSelector((state) => state.getEmployeeCourse.CourseList, _.isEqual)
    const course = useMemo(() => empCourse, [empCourse]);
    const filterarr = course?.filter(val => val.edu_slno === education)
    const handleOnChange = (event, newValue) => {
        if (newValue === null) {
            setSectName('');
        } else {
            setValue(newValue);
            setSectName(event.target.innerText);
        }
    };
    return (
        <Select
            value={value}
            disabled={coursedisable}
            onChange={handleOnChange}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Select Course </Option>
            {
                filterarr?.map((val, index) => {
                    return <Option key={index} value={val.cour_slno}>{val.cour_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyCourse)