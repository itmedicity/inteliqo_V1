import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGradeList } from 'src/redux/actions/Grade.Action';
import _ from 'underscore';

const JoyGradeSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        dispatch(setGradeList());
    }, [dispatch])

    const grade = useSelector((state) => state?.getGradeList?.gradeList, _.isEqual)
    const gradeList = useMemo(() => grade, [grade])

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = gradeList?.find((e) => e.grade_slno === value)
            setValue(array.grade_slno)
        }
    }, [value, setValue, flag, gradeList])

    const onClick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        } else {
            setFlag(0)
        }

    }, [setValue])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                onClick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Select Grade </Option>
            {
                gradeList?.map((val, index) => {
                    return <Option key={index} value={val.grade_slno}>{val.grade_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyGradeSelect) 