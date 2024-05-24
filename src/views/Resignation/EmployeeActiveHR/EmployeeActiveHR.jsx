import { Box, Button, CssVarsProvider, } from '@mui/joy'
import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import {  warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import BranchSelectRedux from 'src/views/MuiComponents/BranchSelectRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ActiveModal from './ActiveModal'

const EmployeeActiveHR = () => {

    const [count, setCount] = useState(0)
    const [branch, setBranch] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [state, setState] = useState(0)
    const [empData, setempData] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState({})

    const getemployeedetails = useCallback(async () => {
        if (dept === 0 && deptSect === 0) {
            warningNofity("Please Select All Option")
        } else {
            setState(1)
            // setTableData(empData)
        }
    }, [dept, deptSect])

    useEffect(() => {
        const getempdetl = async () => {
            const postData = {
                em_department: dept,
                em_dept_section: deptSect,
                em_branch: branch
            }
            const result = await axioslogin.post("/ActiveEmpReport/inactive/emp", postData);
            const { success, data } = result.data
            if (success === 1) {
                setempData(data)
                setCount(0)
            }
            else {
                warningNofity("There is No employees In This Department And Department Section")

            }

        }
        if (branch !== 0 && dept !== 0 && deptSect !== 0) {
            getempdetl()
        } else {
        }

    }, [count, branch, dept, deptSect])

    const [column] = useState([
        { headerName: 'Emp ID ', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', filter: true },
        { headerName: 'Designation', field: 'desg_name', filter: true },
        { headerName: 'Date of Join', field: 'em_doj', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="In Active " followCursor placement='top' arrow >
                        <IconButton sx={{ mb: 0.5 }} onClick={() => InactiveEmp(params)} >
                            <CheckCircleOutlineIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    const InactiveEmp = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        setDetails(data)
        setFlag(true)
    }, [])

    return (
        <CustomLayout title="Employee Active" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" sx={{ width: '100%', p: 0.5, display: 'flex', flexDirection: 'row' }}  >
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <BranchSelectRedux value={branch} setValue={setBranch} />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <DeptSelectByRedux value={dept} setValue={setDept} />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <DeptSecSelectByRedux dept={dept} value={deptSect} setValue={setDeptSect} />
                    </Box>
                    <Box sx={{ mt: 0.2, pr: 0.2 }} >
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    getemployeedetails()
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={column}
                        tableData={state === 1 ? empData : null}
                        sx={{
                            height: 400,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                <ActiveModal open={flag} setOpen={setFlag} data={details} setCount={setCount}/>
            </Box>
        </CustomLayout>
    )
}

export default memo(EmployeeActiveHR) 