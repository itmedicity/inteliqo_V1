import { Autocomplete } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const JoyDepartmentSection = ({ sectValues, getSection }) => {

    //DEPARTMENT SECTION ARRAY BASED ON SELECTED DEPARTMENT
    const deptSection = useSelector((state) => state?.getDepartmentSection?.section);
    const [deptSec, setDeptSec] = useState([{ sect_id: 0, sect_name: 'Select Section Name' }])

    //SELECTED STATE FOR EPAT SECTION AND NAME
    const [value, setValue] = useState(deptSec[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((sectValues !== 0) && (flag === 0)) {
            const array = deptSec?.filter((e) => e.sect_id === sectValues)
            setValue(array[0]);
        } else {
            setValue({})
        }

    }, [sectValues, flag, deptSec])

    useEffect(() => {
        deptSection.length > 0 && setDeptSec(deptSection)
        // deptSection.length === 0 && setDeptSec(deptSection)

        // deptSection.length === 0 && setValue([{ sect_id: 0, sect_name: 'Select Department Section"' }])
        // deptSection.length === 0 && setInputValue('')
    }, [deptSection])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value);
            getSection(value.sect_id)
        } else {
            getSection(0)
            setValue({})
            setFlag(0)
        }
    }, [])

    return (
        <Autocomplete
            placeholder="Select Department Section"
            value={sectValues === 0 ? deptSec : value}
            // value={value}
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
            isOptionEqualToValue={(option, value) => option.sect_name === value.sect_name}
            getOptionLabel={option => option.sect_name || ''}
            options={deptSec}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyDepartmentSection) 