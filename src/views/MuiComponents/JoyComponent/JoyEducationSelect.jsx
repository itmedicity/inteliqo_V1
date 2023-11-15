import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEducation } from 'src/redux/actions/Education.Action';
import _ from 'underscore';
import { Autocomplete } from '@mui/joy';


const JoyEducationSelect = ({ value, setValue, variant }) => {

    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => dispatch(setEducation()), [dispatch]);

    const empEducation = useSelector((state) => state?.getEmployeeEducation?.EducationList, _.isEqual);
    const [edu, setedu] = useState([{ edu_slno: 0, edu_desc: 'Select Education' }]);
    const [selectedValues, setSelectedValues] = useState([]);


    const Onclick = useCallback((values) => {
        if (values !== null) {
            const eduSlnoArray = values.map((value) => value.edu_slno);
            setSelectedValues(values);
            setFlag(1);
            setValue(eduSlnoArray);
        } else {
            setSelectedValues([]);
        }
    }, [setSelectedValues]);

    useEffect(() => {
        if (empEducation.length > 0) {
            setedu(empEducation);
        }
    }, [empEducation]);

    return (
        <Autocomplete
            placeholder="Select Education"
            multiple
            size="sm"
            // value={value.length === 0 ? selectedValues : edu}
            value={selectedValues}
            // value={value === 0 ? edu : selectedValues}
            clearOnBlur
            onChange={(_, newValue) => {
                Onclick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.edu_slno === value.edu_slno}
            getOptionLabel={(option) => option.edu_desc || ''}
            options={edu}
            sx={{ width: '100%' }}
            variant={variant}
        />
    );
};

export default memo(JoyEducationSelect);
