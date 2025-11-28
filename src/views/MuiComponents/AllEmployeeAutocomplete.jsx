import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployeeName } from 'src/redux/actions/EmpName.Action'

const AllEmployeeAutocomplete = ({ value, setValue }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatch(setEmployeeName()), [dispatch])
  const empName = useSelector((state) => state?.getEmpNameList?.empNameList)
  return (
    <Autocomplete
      size="md"
      placeholder="Select Employee"
      options={empName || []}
      getOptionLabel={(option) => `${option?.em_name} (${option?.em_no})`}
      isOptionEqualToValue={(option, value) => option?.em_id === value?.em_id}
      value={empName.find((e) => e?.em_id === value) || null}
      onChange={(e, newVal) => setValue(newVal ? newVal?.em_id : 0)}
      loading={!empName?.length}
    />
  )
}

export default memo(AllEmployeeAutocomplete)
