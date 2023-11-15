import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { getEmployeeBasedSection } from 'src/redux/actions/Common.Action';

const DepartmentSectionRedx = ({ getSection }) => {

    const dispatch = useDispatch();

    //SELECTED DEPARTMENT ID
    const deptCode = useSelector((state) => state.selectedDeptCode.dept);
    //DEPARTMENT SECTION ARRAY BASED ON SELECTED DEPARTMENT
    const deptSection = useSelector((state) => state.getDepartmentSection.section);
    const [dept, setDeptSec] = useState([{ sect_id: 0, sect_name: 'Select Section Name' }])
    //SELECTED STATE FOR EPAT SECTION AND NAME
    const [value, setValue] = useState(dept[0]);
    const [inputValue, setInputValue] = useState('');

    //DISPATCH EMPLOYEE NAME BASED ON SELECTED DEPT & SECTION
    const deptSectionValue = useMemo(() => value, [value])
    useEffect(() => {
        if (deptCode !== 0 && deptSectionValue !== null) {
            getSection(deptSectionValue.sect_id)
            const postData = {
                em_dept_section: deptSectionValue.sect_id,
                em_department: deptCode
            }
            dispatch(getEmployeeBasedSection(postData))
        } else {
            getSection(0)
            const postData = {
                em_dept_section: 0,
                em_department: 0
            }
            dispatch(getEmployeeBasedSection(postData))
        }
    }, [deptCode, dispatch, getSection, deptSectionValue])


    useEffect(() => {
        deptSection.length > 0 && setDeptSec(deptSection)
        deptSection.length === 0 && setDeptSec(deptSection)

        deptSection.length === 0 && setValue([{ sect_id: 0, sect_name: 'Select Section Name' }])
        deptSection.length === 0 && setInputValue('')
    }, [deptSection])

    return (
        <Autocomplete
            placeholder="Select Department Section"
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
            isOptionEqualToValue={(option, value) => option.sect_name === value.sect_name}
            getOptionLabel={option => option.sect_name || ''}
            options={dept}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(DepartmentSectionRedx)