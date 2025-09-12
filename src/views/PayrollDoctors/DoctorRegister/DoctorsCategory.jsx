import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action'

const DoctorsCategory = ({ value, setValue }) => {

    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setCategory()), [dispatch])

    const empCategory = useSelector((state) => state?.getEmployeeCategory?.empCategory)

    const cateData = useMemo(() => empCategory?.filter((k) => k?.ecat_doctor === 1), [empCategory]);

    return (
        <Select
            value={value}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <Option disabled value={0}> Select Doctor Category</Option>
            {
                cateData?.map((val, index) => {
                    return <Option key={index} value={val?.category_slno}>{val?.ecat_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DoctorsCategory) 