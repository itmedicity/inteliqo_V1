import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action'

const CategoryMultipleSelect = ({ value, setValue }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setCategory()), [dispatch])

    const empCategory = useSelector((state) => state.getEmployeeCategory.empCategory)
    const cateData = useMemo(() => empCategory, [empCategory]);
    return (
        <Select
            defaultValue={[]}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            multiple
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

export default memo(CategoryMultipleSelect) 