import { Option, Select } from '@mui/joy'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import { getAllDeptList } from 'src/redux/actions/Department.action'

const DepartmentSelect = ({ value, setValue }) => {

    const { data: deptartments } = useQuery({
        queryKey: ['departmentList'],
        queryFn: getAllDeptList,
        staleTime: Infinity
    })

    return (
        <Select
            value={value === null ? 0 : value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Department</Option>
            {
                deptartments?.map((val, index) => {
                    return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DepartmentSelect) 