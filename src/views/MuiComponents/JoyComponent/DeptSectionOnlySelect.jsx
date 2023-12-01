import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { setEmpUnderDeptSec } from 'src/redux/actions/EmpUnderDeptSec.Action'
import _ from 'underscore'

const DeptSectionOnlySelect = ({ sectValue, getDeptSection }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setDeptWiseSection()), [dispatch])

    const departmentSec = useSelector((state) => state.getDeptSectList.deptSectionList, _.isEqual)
    const [deptSect, setDeptSect] = useState([{ sect_id: 0, sect_name: 'Select Department Section' }])
    const depatSecValues = useMemo(() => departmentSec, [departmentSec]);

    const [value, setValue] = useState(deptSect[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (sectValue !== 0) {
            const array = deptSect?.filter((e) => e.sect_id === sectValue)
            setValue(array[0]);
            dispatch(setEmpUnderDeptSec(array[0]?.sect_id))
        } else {
            setValue({})
        }
    }, [sectValue, dispatch, deptSect])

    useEffect(() => {
        depatSecValues.length > 0 && setDeptSect(depatSecValues)
    }, [depatSecValues])

    return (
        <Autocomplete
            placeholder="Select Department Section"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                // let obj = { sect_id: 0, sect_name: 'Select Department Section' }
                setValue(newValue)
                getDeptSection(newValue?.sect_id)
                dispatch(setEmpUnderDeptSec(newValue?.sect_id))
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