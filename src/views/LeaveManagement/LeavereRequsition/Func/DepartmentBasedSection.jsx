import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { getDepartmentSectionAll, getDepartmentAll, getDepartmentSectBasedDeptID, getEmployeeInformationLimited, getCommonSettings } from 'src/redux/reduxFun/reduxHelperFun';
import { Box, Button, Chip, CssVarsProvider, Input, ListItem, ListItemDecorator, Tooltip, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style.css';
import { getDepartmentSectionBasedHod, getEmployeeArraySectionArray } from './LeaveFunction';
import LeaveRequestType from './LeaveRequestType';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
    const [mapEmpList, setMapEmpList] = useState([]);
    const [hodBasedSection, setHodBasedSection] = useState([]);

    const [deptSectionList, setDeptSectionList] = useState([]);
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const [hodEmpFilter, setHodEmpFilter] = useState(false);
    const [empDisableStat, setEmpDisableStat] = useState(false)

    const [levReq, setLevReq] = useState(0);


    const department = useSelector((state) => getDepartmentAll(state))
    const departmentNameList = useMemo(() => department, [department])
    const filterDeptSection = useSelector((state) => getDepartmentSectionAll(state))
    const departmentSectionListFilterd = useMemo(() => filterDeptSection, [filterDeptSection])

    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section } = employeeInform;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        console.log('runnlfdkgkldjfglkdjfgkl', groupStatus)
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    console.log(groupStatus)

    //GET THE DEPARTMENT SECTION DETAILS BASED ON LOGED USER EM_ID
    useEffect(() => {
        // IF THE LOGGED EMPLOYEE IS HOD OR INCHARGE
        if (hod === 1 || incharge === 1 && masterGroupStatus === true) {
            setDisables(false)
            setHodBasedSection([])

        } else if (hod === 1 || incharge === 1 && masterGroupStatus === false) {
            setDisables(true)
            setDeptID(0)
            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)
                // if the employee is hhod or incharge in another department but they can access thery information but this function hel to view ther datas
                section?.find((e) => e === em_dept_section) === undefined ? setHodEmpFilter(true) : setHodEmpFilter(false)
                setHodBasedSection([...section, em_dept_section]) // INCLUDING HOD OR INCHARGE DEPARTMENT SECTION IF IT NOT IN THE AUTHORISED SECTION
            }
            fetchData(em_id)
        } else {
            setDisables(false)
        }

        //CLEAN UP FUNCTION
        return () => {
            setHodBasedSection([])
        }
    }, [hod, incharge, em_id, em_dept_section])

    // FILTERING AND SORTING DEPARTMENT SECTION AND EMPLOYEE
    useEffect(() => {

        if (departmentSectionListFilterd?.length > 0 && hodBasedSection?.length === 0) {
            // NO FILTER FOR DEPARTMENT AND DEPARTMENT SECTION
            const departmentSection = departmentSectionListFilterd?.filter((e) => e.dept_id === deptID)
            setDeptSectionList(departmentSection)
            const filterSectionId = departmentSection?.map((e) => e.sect_id)
            getEmployeeArraySectionArray(filterSectionId).then((e) => e?.length > setEmpList(e))
        } else if (departmentSectionListFilterd?.length > 0 && hodBasedSection?.length > 0) {
            //HOD BASED DEPRTMENT SECTION SHOWING
            const hodBasedSecion = departmentSectionListFilterd?.filter((e) => hodBasedSection?.includes(e.sect_id))
            setDeptSectionList(hodBasedSecion)

            //GET EMPLOYEE -> HOD AND INCHARGE BASED DEPARTMENT SECTION WISE EMPLYEE 
            getEmployeeArraySectionArray(hodBasedSection).then((e) => e?.length > setEmpList(e))
        } else {
            setDeptSectionList([])
            setEmpList([])
        }

        return () => { //Clean up function
            setDeptSectionList([])
            setEmpList([])
        }

    }, [departmentSectionListFilterd, deptID, hodBasedSection])


    //HANDELE CHANGE DEPARTMENT
    const handleChangeDepartmentID = useCallback((e, value) => {
        setDeptID(value)
        setDeptSection(0)
        setEmployeeID(0)
        setMapEmpList([]) // EMPLOYEE ARRAY SET TO BLANK
    }, [])


    //HANDLE CHANGE DEPARTMENT SECTION
    const handleChangeDepetSection = useCallback(async (e, value) => {
        setMapEmpList([...emplist?.filter((e) => e.em_dept_section === value)])
        setDeptSection(value)
        setEmployeeID(0)
        // if the employee is hhod or incharge in another department but they can access thery information but this function hel to view ther datas
        if (hodEmpFilter === true && value === em_dept_section) {
            setEmployeeID(em_no)
            setEmpDisableStat(true)
        } else {
            setEmpDisableStat(false)
        }
        // console.log(getEmpBySection)
    }, [emplist, hodEmpFilter])
    //HANDLE CHANGE EMPLOYEE NAME 
    const handleChangeEmployeeName = useCallback((e, value) => {
        setEmployeeID(value)
    }, [])


    return (
        <Box sx={{ display: 'flex', flex: 1, p: 0.5 }} >
            <Box sx={{ flex: 1, px: 0.3 }} >
                <Select
                    defaultValue={0}
                    onChange={handleChangeDepartmentID}
                    sx={{ width: '100%' }}
                    value={deptID}
                    size='sm'
                    disabled={disabled}
                    placeholder="Select Department"
                    slotProps={{
                        listbox: {
                            placement: 'bottom-start',
                        },
                    }}
                >
                    <Option value={0}>Select Department</Option>
                    {
                        departmentNameList && departmentNameList?.map((val, index) => {
                            return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ width: '20%', px: 0.3 }}>
                <Select
                    defaultValue={0}
                    value={deptSection}
                    onChange={handleChangeDepetSection}
                    sx={{ width: '100%' }}
                    size='sm'
                    placeholder="Select Department Section"
                    endDecorator={deptSectionList?.length === 0 && <div className='loading-spinner' ></div>}

                >
                    <Option value={0}>Select Department Section</Option>
                    {
                        deptSectionList && deptSectionList?.map((val, index) => {
                            return <Option key={index} value={val.sect_id}>{val.sect_name}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ width: '20%', px: 0.3 }}>
                <Select
                    onChange={handleChangeEmployeeName}
                    sx={{ width: '100%' }}
                    value={employeeID}
                    size='sm'
                    disabled={empDisableStat}
                    placeholder="Employee Name"
                    endDecorator={mapEmpList?.length === 0 && <div className='loading-spinner' ></div>}
                >
                    <Option value={0}  >Employee Name</Option>
                    {
                        mapEmpList && mapEmpList?.map((val, index) => {
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
            <Box sx={{ width: '10%', px: 0.3 }}>
                <Input
                    size="sm"
                    fullWidth
                    value={employeeID}
                    disabled
                />
            </Box>

            {/* <Box sx={{ display: "flex", px: 0.3 }} >
                <CssVarsProvider>
                    <Tooltip title="Process" followCursor placement='top' arrow >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="danger"
                            // onClick={onSubmitLeaveRequestEntry}
                            size='sm'
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", px: 0.3 }} >
                <CssVarsProvider>
                    <Button
                        aria-label="Like"
                        variant="outlined"
                        color="success"
                        // onClick={() => changeForm()}
                        size='sm'
                        className='refreshButton'
                    >
                        <RefreshIcon className='rotating-icon' />
                    </Button>
                </CssVarsProvider>
            </Box> */}
        </Box>
    )
}

export default memo(DepartmentBasedSection) 