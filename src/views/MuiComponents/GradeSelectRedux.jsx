import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGradeList } from 'src/redux/actions/Grade.Action';
import _ from 'underscore';

const GradeSelectRedux = ({ value, setValue, }) => {

    const dispatch = useDispatch()

    useEffect(() => dispatch(setGradeList()), [dispatch])

    const grade = useSelector((state) => state.getGradeList.gradeList, _.isEqual)
    const gradeData = useMemo(() => grade, [grade]);

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
                    Select Grade
                </MenuItem>
                {
                    gradeData && gradeData.map((val, index) => {
                        return <MenuItem key={index} value={val.grade_slno}>{val.grade_desc}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(GradeSelectRedux)