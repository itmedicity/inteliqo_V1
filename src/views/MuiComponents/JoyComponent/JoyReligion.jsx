import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setReligion } from 'src/redux/actions/Religion.Action';
import _ from 'underscore';

const JoyReligion = ({ value, setValue }) => {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        dispatch(setReligion());
    }, [dispatch])

    const empReligions = useSelector((state) => state?.getEmployeeReligion?.empRel, _.isEqual)
    const regionList = useMemo(() => empReligions, [empReligions])

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = regionList?.find((e) => e.relg_slno === parseInt(value))
            setValue(array.relg_slno)
        }
    }, [value, setValue, flag, regionList])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
            setFlag(0)
        }
        return
    }, [setValue])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Select Religion </Option>
            {
                regionList?.map((val, index) => {
                    return <Option key={index} value={val.relg_slno}>{val.relg_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyReligion) 