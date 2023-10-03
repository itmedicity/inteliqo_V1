import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import _ from 'underscore'

const DeptSectionOnlySelect = ({ getDeptSection }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setDeptWiseSection()), [dispatch])

    const departmentSec = useSelector((state) => state.getDeptSectList.deptSectionList, _.isEqual)
    const [deptSect, setDeptSect] = useState([{ sect_id: 0, sect_name: 'Select Department' }])
    const depatSecValues = useMemo(() => departmentSec, [departmentSec]);

    const [value, setValue] = useState(deptSect[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            getDeptSection(value.sect_id)
        } else {
            getDeptSection(0)
        }
        return
    }, [value])

    useEffect(() => {
        depatSecValues.length > 0 && setDeptSect(depatSecValues)
    }, [depatSecValues])

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
            isOptionEqualToValue={(option, value) => option.sect_name === value.sect_name}
            getOptionLabel={option => option.sect_name || ''}
            options={deptSect}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(DeptSectionOnlySelect) 