import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo } from 'react'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { ToastContainer } from 'react-toastify';
import { setDepartment } from 'src/redux/actions/Department.action';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { IconButton as OpenIcon } from '@mui/material';

const EmployeeFileAgGrid = () => {

    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()

    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)
    const [Empno, setEmpNo] = useState(0)

    const employeeRecordList = useSelector((state) => {
        return state.getEmployeeRecordList.empRecordData;
    })

    useEffect(() => {
        // set the table data from reducx store to material table data
        if (Object.keys(employeeRecordList).length > 0) {
            setTableData(employeeRecordList)
        }
        dispatch(setDepartment());
    }, [dispatch, employeeRecordList])

    const postData = useMemo(() => {
        return {
            dept_id: deptName,
            sect_id: deptSecName
        }
    }, [deptName, deptSecName])

    const postDataDept = useMemo(() => {
        return { dept_id: deptName }
    }, [deptName])

    const [active, updateactive] = useState({
        activestatus: true
    })
    const { activestatus } = active
    const updateFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateactive({ ...active, [e.target.name]: value })
    }

    // Employee Record List
    const getEmployeeList = useCallback((e) => {
        e.preventDefault()
        const submitfunc = async () => {
            if (deptName !== 0 && deptSecName !== 0 && activestatus === true) {
                const result = await axioslogin.post('/empmast/getEmpDet', postData)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            }
            else if (deptName !== 0 && deptSecName === 0 && activestatus === true) {
                const result = await axioslogin.post('/empmast/empmaster/getdeptByDept', postDataDept)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            }
            else if (deptName !== 0 && deptSecName !== 0 && activestatus === false) {
                const result = await axioslogin.post('/empmast/getEmpDetInactive', postData)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            } else if (deptName === 0 && deptSecName === 0 && activestatus === true && Empno !== 0) {
                const result = await axioslogin.get(`/empearndeduction/getAll/${Empno}`)
                const { data, success } = result.data;
                if (success === 1) {
                    setTableData(data);
                } else {
                    infoNofity("No employee exist with this employee number!!")
                    setTableData([]);
                }
            }
            else {
                warningNofity("Choose All Option")
            }
        }
        submitfunc()
    }, [postDataDept, postData, deptName, deptSecName, activestatus, dispatch, Empno])

    // Route to Empl Record
    const getEmployeeEmpNumber = (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id } = data[0]
        //history.push(`/Home/Profile/${em_no}/${em_id}`)
        history.push(`/Home/Prfle/${em_no}/${em_id}/${0}`)
    }

    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <OpenIcon sx={{ pb: 1, boxShadow: 0 }} size='sm' color='primary' onClick={() => getEmployeeEmpNumber(params)}>
                        <AccountCircleOutlinedIcon />
                    </OpenIcon>
                </Tooltip>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 150, filter: true },
        { headerName: 'Name', field: 'emp_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Gender', field: 'gender', minWidth: 90 },
        { headerName: 'Age', field: 'em_age_year', minWidth: 90 },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 90 },
        { headerName: 'Mobile', field: 'em_mobile', minWidth: 90 },
        { headerName: 'Branch', field: 'branch_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        { headerName: 'Designation', field: 'desg_name', minWidth: 250 },
        { headerName: 'Status', field: 'emp_status', minWidth: 90 },

    ])

    return (
        <CustomLayout title="Employee Record File" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                {/* <Paper square elevation={1}  > */}
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <DepartmentDropRedx getDept={setDepartmentName} />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <DepartmentSectionRedx getSection={setDepartSecName} />
                    </Box>

                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Employee Number"
                                name="Empno"
                                value={Empno}
                                onchange={(e) => setEmpNo(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                    <Box sx={{ mt: 1.5, px: 0.3, }} >
                        <JoyCheckbox
                            label='Active'
                            name="activestatus"
                            checked={activestatus}
                            onchange={(e) => { updateFormData(e) }}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' color="primary" onClick={getEmployeeList}>
                                <SearchIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                    </Box>
                </Box>
                {/* First Row end */}

                {/* </Paper> */}
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid columnDefs={columnDef} tableData={tableData} sx={{
                        height: 600,
                        width: "100%"
                    }} rowHeight={40} headerHeight={40} />
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(EmployeeFileAgGrid)