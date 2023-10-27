import { Autocomplete } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentSection } from 'src/redux/actions/Common.Action';
import { setDepartment } from 'src/redux/actions/Department.action';
import _ from 'underscore';

const JoyDepartment = ({ deptValue, getDept }) => {
    const dispatch = useDispatch()
    const departments = useSelector((state) => state?.getDepartmentList?.empDepartmentList, _.isEqual)
    const [dept, setDept] = useState([{ dept_id: 0, dept_name: 'Select Department' }])
    const [value, setValue] = useState(dept[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((deptValue !== 0) && (flag === 0)) {
            const array = dept?.filter((e) => e.dept_id === deptValue)
            setValue(array[0]);
            dispatch(getDepartmentSection(deptValue))
        } else {
            dispatch(getDepartmentSection(0))
        }

    }, [deptValue, flag, dept, dispatch])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            dispatch(getDepartmentSection(value.dept_id))
            getDept(value.dept_id)
        } else {
            dispatch(getDepartmentSection(0))
            getDept(0)
            setFlag(0)
            setValue({})
        }
    }, [value, getDept])

    useEffect(() => {
        departments.length > 0 && setDept(departments)
    }, [departments])


    return (
        <Autocomplete
            placeholder="Select Department"
            value={deptValue === 0 ? dept : value}
            //value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                Onclick(newValue);
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

export default memo(JoyDepartment) 