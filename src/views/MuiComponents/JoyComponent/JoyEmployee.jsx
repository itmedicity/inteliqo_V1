import React from 'react'
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/joy'
import { useState, memo, useCallback, useEffect } from 'react';
import _ from 'underscore';
const JoyEmployee = ({ selectEmpno, setSelectEmpno }) => {

    const empname = useSelector((state) => state?.getemp?.Employelist)

    const [Empname, setEmpname] = useState([{ em_no: 0, em_name: 'Select Employee Name' }])
    const [value, setValue] = useState(Empname[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if (empname.length > 0) {
            setEmpname(empname)
        } else {
            setEmpname([])
        }

    }, [empname])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value);
            setSelectEmpno(value.em_no)
        } else {
            setSelectEmpno(0)
            setValue({})
        }
    }, [])
    return (
        <Autocomplete
            placeholder="Select Employee Name"
            value={value}
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
            isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
            getOptionLabel={option => option.em_name || ''}
            options={Empname}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyEmployee) 