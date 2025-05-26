import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from 'react';


const SectionBsdEmployee = ({ getEmploy }) => {

    //EMPLOYEE INFOR BASED ON SELECTED DEPT & SECTION
    const empInform = useSelector((state) => state.getEmployeeBasedSection.emp);
    const [empInfm, setEmpInform] = useState([{ em_id: 0, em_name: 'Employee Name' }])
    //SELECTED STATE FOR EMP NAME AND CODE
    const [value, setValue] = useState(empInfm[0]);
    const [inputValue, setInputValue] = useState('');

    // useEffect(() => {
    //     empInform.length > 0 && setEmpInform(empInform)
    //     empInform.length === 0 && setEmpInform(empInform)

    //     empInform.length === 0 && setValue([{ em_id: 0, em_name: 'Employee Name' }])
    //     empInform.length === 0 && setInputValue('')
    // }, [empInform])

    useEffect(() => {
        if (empInform.length !== 0) {
            setEmpInform(empInform)
            if (value !== null) {
                getEmploy(value)
            }
            else {
                getEmploy(0)
                return
            }
        }
        else {

            setEmpInform([])
            return
        }
    }, [empInform, getEmploy, value])

    return (
        <Autocomplete
            placeholder="Select Employee"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
                // getEmploy(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_id === value.em_name}
            getOptionLabel={option => option.em_name + ' ' + '(' + option.em_no + ')' || ''}
            options={empInfm}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(SectionBsdEmployee)