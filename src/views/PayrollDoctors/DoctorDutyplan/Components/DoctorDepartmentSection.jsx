import { Option, Select } from '@mui/joy'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import { getDepartmentSection } from 'src/redux/reduxFun/useQueryFunctions'

const DoctorDepartmentSection = ({ value, setValue, dept }) => {
  const { data: sectionList } = useQuery({
    queryKey: ['getDepartmentSectionList', dept],
    queryFn: () => getDepartmentSection(dept),
    enabled: !!getDepartmentSection,
    staleTime: Infinity,
  })

  return (
    <Select
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      size="md"
      variant="outlined"
      sx={{ width: '100%' }}
      color='primary'
    >
      <Option disabled value={0}>
        {' '}
        Select Department Section
      </Option>
      {sectionList?.map((val, index) => {
        return (
          <Option key={index} value={val.sect_id}>
            {val.sect_name}
          </Option>
        )
      })}
    </Select>
  )
}

export default memo(DoctorDepartmentSection)
