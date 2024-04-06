import React, { memo, useEffect } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { getDepartmentSectionAll, getDepartmentAll } from 'src/redux/reduxFun/reduxHelperFun';
import { Box } from '@mui/joy';

const DepartmentBasedSection = ({ }) => {
    const dispatch = useDispatch();
    console.log('running')
    useEffect(() => {
        dispatch(setDept())
        dispatch(setdeptSection())
    }, [dispatch])

    const department = useSelector((state) => getDepartmentAll(state))
    const departmentSection = useSelector((state) => getDepartmentSectionAll(state))

    console.log(department)
    console.log(departmentSection)

    return (
        <Box display={'flex'} >
            <Box>
                <Select
                    defaultValue={0}
                    // onChange={handleChange}
                    sx={{ width: '100%' }}
                    size='sm'
                >
                    <Option value={0}>Select Department</Option>
                    {
                        department && department?.map((val, index) => {
                            return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box>
                <Select
                    defaultValue={0}
                    // onChange={handleChange}
                    sx={{ width: '100%' }}
                    size='sm'
                >
                    <Option value={0}  >Select Department Section</Option>
                    {
                        departmentSection && departmentSection?.map((val, index) => {
                            return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                        })
                    }
                </Select>
            </Box>
        </Box>
    )
}

export default memo(DepartmentBasedSection) 