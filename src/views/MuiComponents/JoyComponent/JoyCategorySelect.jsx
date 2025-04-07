import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action'
import _ from 'underscore'

const JoyCategorySelect = ({ value, setValue }) => {
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setCategory()), [dispatch])

    const empCategory = useSelector((state) => state?.getEmployeeCategory?.empCategory, _.isEqual)
    const cateData = useMemo(() => empCategory, [empCategory]);

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = cateData?.find((e) => e?.category_slno === value)
            setValue(array?.category_slno)
        }
    }, [value, setValue, flag, cateData])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setFlag(0)
            setValue(0)
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
            sx={{ width: '100%' }}
        >
            <Option disabled value={0}> Select Category</Option>
            {
                cateData?.map((val, index) => {
                    return <Option key={index} value={val.category_slno}>{val.ecat_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyCategorySelect) 