import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const DepartmentSelect = ({ deptValue, getDept }) => {

    const departments = useSelector((state) => state?.getDepartmentList?.empDepartmentList, _.isEqual)
    const [dept, setDept] = useState([{ dept_id: 0, dept_name: 'Select Department' }])
    const [value, setValue] = useState(dept[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (deptValue !== 0) {
            const array = dept?.filter((e) => e.dept_id === deptValue)
            setValue(array[0]);
        } else {
            setValue({})
        }
    }, [deptValue, dept])

    useEffect(() => {
        departments.length > 0 && setDept(departments)
    }, [departments])

    return (
        <Autocomplete
            placeholder="Select Department"
            value={value}
            //value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
                getDept(newValue.dept_id)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
            getOptionLabel={option => option.dept_name || ''}
            options={dept}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(DepartmentSelect) 