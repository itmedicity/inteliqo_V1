import { Autocomplete } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDesignation } from 'src/redux/actions/Designation.Action';
import _ from 'underscore';

const JoyDesgSelect = ({ desgValue, getDesg, disable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setDesignation()), [dispatch])
    const empDesignation = useSelector((state) => state?.getEmployeeDesignation?.designationList, _.isEqual)
    const [designation, setDesignationList] = useState([{ desg_slno: 0, desg_name: 'Select Designation' }])
    const [value, setValue] = useState(designation[0]);
    const [inputValue, setInputValue] = useState('');

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            getDesg(value?.desg_slno)
        } else {
            getDesg(0)
            setValue({})
        }
    }, [getDesg])

    useEffect(() => {
        empDesignation.length > 0 && setDesignationList(empDesignation)
    }, [empDesignation])

    return (
        <Autocomplete
            placeholder="Select Designation"
            value={value}
            disabled={disable}
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
            isOptionEqualToValue={(option, value) => option.desg_name === value.desg_name}
            getOptionLabel={option => option.desg_name || ''}
            options={designation}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyDesgSelect) 