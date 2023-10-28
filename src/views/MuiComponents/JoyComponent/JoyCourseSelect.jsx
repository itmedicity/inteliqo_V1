import { Autocomplete, Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from 'src/redux/actions/Course.Action'
import _ from 'underscore'

const JoyCourseSelect = ({ courseValue, setCourseValue, education, coursedisable }) => {
    console.log(education);
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setCourse()), [dispatch])

    const empCourse = useSelector((state) => state?.getEmployeeCourse?.CourseList, _.isEqual)
    const [course, setcourse] = useState([{ cour_slno: 0, cour_desc: 'Select Course' }])
    const filterarr = empCourse?.filter(val => val.edu_slno === education)
    const [value, setValue] = useState(course[0]);
    const [inputValue, setInputValue] = useState('');


    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setCourseValue(value.cour_slno)
        }
        else {
            setValue(0)
        }
        return
    }, [setValue])

    useEffect(() => {
        filterarr.length > 0 && setcourse(filterarr)
    }, [filterarr])
    return (
        <>asdfgh</>
        // <Autocomplete
        //     disabled={coursedisable}
        //     placeholder="Select Course"
        //     value={value}
        //     clearOnBlur
        //     onChange={(event, newValue) => {
        //         Onclick(newValue);
        //     }}
        //     inputValue={inputValue}
        //     onInputChange={(event, newInputValue) => {
        //         setInputValue(newInputValue);
        //     }}
        //     loading={true}
        //     loadingText="Loading..."
        //     freeSolo
        //     isOptionEqualToValue={(option, value) => option.cour_desc === value.cour_desc}
        //     getOptionLabel={option => option.cour_desc || ''}
        //     options={course}
        //     sx={{ width: '100%' }}
        // />
    )
}

export default memo(JoyCourseSelect) 