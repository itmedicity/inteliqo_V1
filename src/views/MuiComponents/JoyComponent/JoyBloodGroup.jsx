import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';
import _ from 'underscore';

const JoyBloodGroup = ({ value, setValue }) => {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        dispatch(setBloodgrp());
    }, [dispatch])

    const empBloodgrp = useSelector((state) => state.getEmployeeBloodgrp.empBlood, _.isEqual)

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = empBloodgrp?.find((e) => e.group_slno === parseInt(value))
            setValue(array.group_slno)
        }
    }, [value, setValue, flag, empBloodgrp])

    const onClick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
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
            <Option disabled value={0}>Select Blood Group</Option>
            {
                empBloodgrp?.map((val, index) => {
                    return <Option key={val.group_slno} value={val.group_slno}>{val.group_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyBloodGroup) 