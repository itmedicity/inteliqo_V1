import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'src/redux/actions/Category.Action';
import _ from 'underscore';

const CategorySelectRedux = ({ value, setValue, }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setCategory()), [dispatch])

    const empCategory = useSelector((state) => state.getEmployeeCategory.empCategory, _.isEqual)
    const cateData = useMemo(() => empCategory, [empCategory]);
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
                    Select Category
                </MenuItem>
                {
                    cateData && cateData.map((val, index) => {
                        return <MenuItem key={index} value={val.category_slno}>{val.ecat_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(CategorySelectRedux) 