import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { getDepartmentSectionAll, getDepartmentAll, getDepartmentSectBasedDeptID, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { Box, Chip, Input, ListItem, ListItemDecorator, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const DepartmentBasedSection = ({ }) => {
    const dispatch = useDispatch();

    //dispatch for getting department and department section
    useEffect(() => {
        dispatch(setDept())
        dispatch(setdeptSection())
    }, [dispatch])

    const [deptID, setDeptID] = useState(0);
    const [deptSection, setDeptSection] = useState(0);
    const [employeeID, setEmployeeID] = useState(0);
    const [disabled, setDisables] = useState(false);
    const [emplist, setEmpList] = useState([]);


    const department = useSelector((state) => getDepartmentAll(state))
    const departmentNameList = useMemo(() => department, [department])
    const filterDeptSection = useSelector((state) => getDepartmentSectBasedDeptID(state, deptID))
    const departmentSectionListFilterd = useMemo(() => filterDeptSection, [filterDeptSection])

    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section } = employeeInform;
    console.log(hod, incharge)

    //IF HOD OR INCHARGE CONDITION
    useEffect(() => {
        console.log('running')
        if (hod === 1 || incharge === 1) {
            setDeptID(0)
            setDisables(true)
            setDeptSection(em_dept_section)
        }
    }, [hod, incharge, em_department, em_dept_section])

    console.log(filterDeptSection)




    //Handle change department
    const handleChangeDepartmentID = useCallback((e, value) => {
        console.log(value)
        setDeptID(value)
        setDeptSection(0)
    }, [])
    //HANDLE CHANGE DEPARTMENT SECTION
    const handleChangeDepetSection = useCallback(async (e, value) => {
        setDeptSection(value)
        // get Section  based employee need to get from the database
        const getEmpBySection = await axioslogin.get(`/common/getEmpName/${value}`);
        const { success, data } = getEmpBySection.data;
        if (success === 1) {
            setEmpList(data)
        } else {
            setEmpList([])
        }
        // console.log(getEmpBySection)
    }, [])
    //HANDLE CHANGE EMPLOYEE NAME 
    const handleChangeEmployeeName = useCallback((e, value) => {
        setEmployeeID(value)
    }, [])

    console.log(emplist)

    return (
        <Box sx={{ display: 'flex', flex: 3 }} >
            <Box sx={{ flex: 1 }} >
                <Select
                    defaultValue={0}
                    onChange={handleChangeDepartmentID}
                    sx={{ width: '100%' }}
                    value={deptID}
                    size='sm'
                    disabled={disabled}
                >
                    <Option value={0}>Select Department</Option>
                    {
                        departmentNameList && departmentNameList?.map((val, index) => {
                            return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Select
                    defaultValue={0}
                    value={deptSection}
                    onChange={handleChangeDepetSection}
                    sx={{ width: '100%' }}
                    size='sm'
                >
                    <Option value={0}>Select Department Section</Option>
                    {
                        departmentSectionListFilterd && departmentSectionListFilterd?.map((val, index) => {
                            return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Select
                    defaultValue={0}
                    onChange={handleChangeEmployeeName}
                    sx={{ width: '100%' }}
                    size='sm'
                >
                    <Option value={0}  >Employee Name</Option>
                    {
                        emplist && emplist?.map((val, index) => {
                            return <Option key={index} value={val.em_no} label={val.em_name} >
                                <Box gap={-1}
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        // backgroundColor: 'lightgreen',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingX: 1,
                                        mx: -1,
                                        gap: 0
                                    }}>
                                    <Typography level='body-sm'>{val.em_name}</Typography>
                                    <Typography endDecorator={val.em_no} color='success' level='body-md'></Typography>
                                </Box>
                            </Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Input
                    size="sm"
                    fullWidth
                    value={employeeID}
                    disabled
                />
            </Box>
        </Box>
    )
}

export default memo(DepartmentBasedSection) 