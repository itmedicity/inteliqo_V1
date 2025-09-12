import { Option, Select } from '@mui/joy'
import React from 'react'
import { useQuery } from 'react-query'
import { getDoctorDepartment } from 'src/redux/reduxFun/useQueryFunctions'

const DoctorDepartment = ({ value, setValue }) => {


    const { data: doctorDeptList, isLoading: isdoctorDeptLoading,
        error: doctorDeptError } = useQuery({
            queryKey: ['doctordeptList'],
            queryFn: getDoctorDepartment
        })

    if (isdoctorDeptLoading) return <p>Loading...</p>
    if (doctorDeptError) return <p>Error occurred.</p>

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
        >
            <Option disabled value={0}> Select Department</Option>
            {
                doctorDeptList?.map((val, index) => {
                    return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                })
            }
        </Select>
    )
}

export default DoctorDepartment