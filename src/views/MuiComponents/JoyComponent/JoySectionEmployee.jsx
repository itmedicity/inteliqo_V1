import { Option, Select } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const JoySectionEmployee = ({ value, setValue }) => {
  const EmpUnderDeptSec = useSelector(
    (state) => state?.getEmpUnderDeptsecList?.empNamesList,
    _.isEqual,
  )
  const employeeLIst = useMemo(() => EmpUnderDeptSec, [EmpUnderDeptSec])

  return (
    <Select
      value={value === null ? 0 : value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      size="md"
      variant="outlined"
    >
      <Option disabled value={0}>
        {' '}
        Select Employees
      </Option>
      {employeeLIst?.map((val, index) => {
        return (
          <Option key={index} value={val?.em_id}>
            {val?.em_name}
          </Option>
        )
      })}
    </Select>
  )
}

export default memo(JoySectionEmployee)
