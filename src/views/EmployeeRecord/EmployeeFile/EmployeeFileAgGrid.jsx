import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider } from '@mui/joy'
import { Box, Checkbox, FormControlLabel, Paper, TextField, Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo } from 'react'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { ToastContainer } from 'react-toastify';

const EmployeeFileAgGrid = () => {

    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()

    const [deptName, setDepartment] = useState(0)
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
    }, [employeeRecordList])

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
                    <IconButton sx={{ pb: 1, boxShadow: 0 }} size='sm' color='primary' onClick={() => getEmployeeEmpNumber(params)}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
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
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper square elevation={1}  >
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1, justifyItems: 'flex-start' }}>
                        <Box sx={{ p: 1, width: '25%' }} >
                            <DeptSelectByRedux setValue={setDepartment} value={deptName} />
                        </Box>
                        <Box sx={{ p: 1, width: '25%' }}>
                            <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} />
                        </Box>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ p: 1, width: '25%' }}>
                                <TextField fullWidth
                                    id="fullWidth" size="small"
                                    onChange={(e) => setEmpNo(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ p: 1 }} >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        name="activestatus"
                                        value={activestatus}
                                        checked={activestatus}
                                        className="ml-2"
                                        onChange={(e) => { updateFormData(e) }}
                                    />
                                }
                                label="Active"
                            />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={getEmployeeList}>
                                    <SearchIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {/* First Row end */}

                </Paper>
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