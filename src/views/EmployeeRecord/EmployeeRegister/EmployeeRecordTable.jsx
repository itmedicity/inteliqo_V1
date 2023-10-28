import React, { memo, useEffect, useState } from 'react'
import { Box, Paper, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider, IconButton, Typography } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action'
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer } from 'react-toastify'
import { useMemo } from 'react'
import { IconButton as OpenIcon } from '@mui/material';

const EmployeeRecordTable = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [columnDef] = useState([
        { headerName: 'Emp No', field: 'em_no', minWidth: 90, filter: true },
        { headerName: 'Name', field: 'emp_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Branch', field: 'branch_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 90 },
        {
            headerName: 'Action', minWidth: 100, wrapText: true,
            cellRenderer: params =>
                <Tooltip title="Edit Employee" followCursor placement='top' arrow >
                    <OpenIcon sx={{ pb: 2, boxShadow: 0 }} size='sm' color='primary' onClick={() => ToProfile(params)}>
                        <ModeEditOutlineIcon />
                    </OpenIcon>
                </Tooltip>
        },
    ])

    const ToProfile = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id } = data[0]
        history.push(`/Home/EmployeeRecordEdit/${em_no}/${em_id}`)
    }

    const postData = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: deptSect,
        }
    }, [dept, deptSect])

    // Employee Record List
    const getEmployeeList = async (e) => {
        e.preventDefault()

        if (dept !== 0 && deptSect !== 0) {
            const result = await axioslogin.post('/empmast/getEmpDet', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
            }
        } else {
            warningNofity("Choose All Option")
        }
    }

    const backtoEmployeeRegister = () => {
        history.push('/Home/EmployeeRecord')
    }

    return (
        <>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                <Paper sx={{ flex: 1, }} >
                    <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                            <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                                <Box sx={{ display: "flex" }}>
                                    <DragIndicatorOutlinedIcon />
                                    <CssVarsProvider>
                                        <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                            Employee Record Edit
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color="danger"
                                            onClick={backtoEmployeeRegister}
                                            sx={{ color: '#ef5350' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                    <Paper square variant="outlined" elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                        <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                            {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <JoyBranchSelect value={branch} setValue={setBranch} />
                            </Box> */}
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <DepartmentDropRedx getDept={setDept} />
                            </Box>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <DepartmentSectionRedx getSection={setDeptSect} />
                            </Box>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={getEmployeeList}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={{ display: 'flex', flex: 1, p: 1, flexDirection: 'column' }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 400,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default memo(EmployeeRecordTable) 