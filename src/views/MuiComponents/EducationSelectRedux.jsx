import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEducation } from 'src/redux/actions/Education.Action';
import _ from 'underscore';

const EducationSelectRedux = ({ value, setValue, }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setEducation()), [dispatch])

    const empEducation = useSelector((state) => state.getEmployeeEducation.EducationList, _.isEqual)
    const educationList = useMemo(() => empEducation, [empEducation]);

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Education
                </MenuItem>
                {
                    educationList && educationList.map((val, index) => {
                        return <MenuItem key={index} value={val.edu_slno}>{val.edu_desc}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(EducationSelectRedux)