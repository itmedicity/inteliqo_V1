import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import { axioslogin } from 'src/views/Axios/Axios'

const EmployeeRightsDepartment = ({ value, setValue }) => {
  // Access the employee information from the Redux store using useSelector
  const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
  // Memoize the employee information to avoid unnecessary recalculations/re-renders
  const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
  // Destructure specific properties (hod, incharge, and groupmenu) from the memoized employee information
  const { em_id } = empInformationFromRedux;

  const [loginedDept, setLoginedDept] = useState([])

  useEffect(() => {
    const getEmployeeRightsbasedDepartments = async () => {
      const getData = {
        em_id: em_id,
      }
      const result = await axioslogin.post('/DoctorsProcess/list/departments', getData)
      const { success, data } = result.data
      if (success === 1) {
        setLoginedDept(data)
      } else {
        setLoginedDept([])
      }
    }
    getEmployeeRightsbasedDepartments()
  }, [em_id])

  return (
    <Select
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      size="md"
      variant="outlined"
      sx={{ width: '100%' }}
    >
      <Option disabled value={0}>
        Select Department
      </Option>
      {loginedDept?.map((val, index) => {
        return (
          <Option key={index} value={val?.dept_id}>
            {val?.dept_name}
          </Option>
        )
      })}
    </Select>
  )
}

export default memo(EmployeeRightsDepartment)
