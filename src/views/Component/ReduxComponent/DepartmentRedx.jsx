import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from 'react';
import { Actiontypes } from 'src/redux/constants/action.type';
import { getDepartmentSection } from 'src/redux/actions/Common.Action';

const DepartmentRedx = ({ getDept }) => {
    const dispatch = useDispatch();
    const { SELECTED_DEPT_VAL } = Actiontypes;
    const departments = useSelector((state) => state.getDepartmentList.empDepartmentList)
    const [dept, setDept] = useState([{ dept_id: 0, dept_name: 'Select Department' }])

    const [value, setValue] = useState(dept[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            dispatch({ type: SELECTED_DEPT_VAL, payload: value.dept_id })
            dispatch(getDepartmentSection(value.dept_id))
            getDept(value.dept_id)
        } else {
            dispatch({ type: SELECTED_DEPT_VAL, payload: 0 })
            dispatch(getDepartmentSection(0))
            getDept(0)
        }
        return
    }, [value, SELECTED_DEPT_VAL, getDept, dispatch])

    useEffect(() => {
        departments.length > 0 && setDept(departments)
    }, [departments])

    return (
        <Autocomplete
            placeholder="Select Department"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
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

export default memo(DepartmentRedx) 