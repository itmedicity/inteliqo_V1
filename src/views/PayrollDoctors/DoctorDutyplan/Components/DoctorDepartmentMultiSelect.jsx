import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const DoctorDepartmentMultiSelect = ({ value, setValue }) => {

  const [inputValue, setInputValue] = useState('')
  const [selectedValues, setSelectedValues] = useState(value||[])
  const [deptartments,setDepartments]=useState([])

  useEffect(() => {
  const selectData = async () => {
    const result = await axioslogin.get('/DoctorsProcess/dept')
    const { success, data } = result.data;

    if (success === 1) {
      setDepartments(data);

      // ?? Convert incoming value (IDs) to option objects
      if (value && Array.isArray(value)) {
        const matched = data?.filter(d => value?.includes(d?.dept_id));
        setSelectedValues(matched);
      }
    } else {
      setDepartments([]);
      setSelectedValues([]);
    }
  };

  selectData();
}, [value]);


  const onChangeHandler = (newValues) => {
    if (Array.isArray(newValues)) {
      setSelectedValues(newValues)
      setValue(newValues?.map((v) => v?.dept_id))
    } else {
      setSelectedValues([])
      setValue([])
    }
  }
  return (
    <Autocomplete
      multiple
      size="md"
      value={selectedValues}
      clearOnBlur
      placeholder="Select Departments"
      onChange={(_, newValues) => onChangeHandler(newValues)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      loading={deptartments.length === 0}
      loadingText="Loading..."
      isOptionEqualToValue={(option, value) => option?.dept_id === value?.dept_id}
      getOptionLabel={(option) => option?.dept_name || ''}
      options={deptartments}
    />
  )
}

export default memo(DoctorDepartmentMultiSelect) 
