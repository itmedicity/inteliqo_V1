import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const JoyDeptSectWithName = ({ sectValues, getSection, setSectName }) => {
    //DEPARTMENT SECTION ARRAY BASED ON SELECTED DEPARTMENT
    const deptSection = useSelector((state) => state?.getDepartmentSection?.section);
    const [deptSec, setDeptSec] = useState([{ sect_id: 0, sect_name: 'Select Section Name' }])

    //SELECTED STATE FOR EPAT SECTION AND NAME
    const [value, setValue] = useState(deptSec[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (sectValues !== 0) {
            const array = deptSec?.filter((e) => e.sect_id === sectValues)
            setValue(array[0]);
        } else {
            setValue({})
        }

    }, [sectValues, deptSec])

    useEffect(() => {
        deptSection.length > 0 && setDeptSec(deptSection)
    }, [deptSection])
    return (
        <Autocomplete
            placeholder="Select Department Section"
            value={value}
            // value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setSectName(event.target.innerText)
                setValue(newValue);
                getSection(newValue?.sect_id)
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
            options={deptSec}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyDeptSectWithName) 