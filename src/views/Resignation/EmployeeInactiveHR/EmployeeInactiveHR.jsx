
import React, { Fragment, useState, useEffect, memo, useCallback } from 'react'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { ToastContainer } from 'react-toastify'
import BranchSelectRedux from 'src/views/MuiComponents/BranchSelectRedux'
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { Button, } from '@mui/joy'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import RemarkModal from './RemarkModal';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const EmployeeInactiveHR = () => {

    const [count, setCount] = useState(0)
    const [branch, setBranch] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [state, setState] = useState(0)
    const [empData, setempData] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState(0)
    const [dueDepartment, setDueDepartment] = useState([])

    useEffect(() => {
        const getempdetl = async () => {
            const postData = {
                em_department: dept,
                em_dept_section: deptSect,
                em_branch: branch
            }
            const result = await axioslogin.post("/empmast/emplist/show", postData);
            const { success, data } = result.data
            if (success === 1) {
                setempData(data)
                setCount(0)
                setState(0)
            } else {
                warningNofity("There is No employees In This Department And Department Section")
            }
        }
        if (state === 1) {
            getempdetl()
        } else {
        }

    }, [count, state, branch, dept, deptSect])

    const getemployeedetails = useCallback(async () => {
        if (dept === 0 && deptSect === 0) {
            warningNofity("Please Select All Option")
        } else {
            setState(1)
            const postDeptData = {
                dept_id: dept,
                sect_id: deptSect,
            }
            const results = await axioslogin.post('/Duedepartment/duedept', postDeptData)
            const { success1, data1 } = results.data
            if (success1 === 1) {
                const { due_dept_code } = data1[0]
                const duedepartment = JSON.parse(due_dept_code)
                setDueDepartment(duedepartment)
            } else {
                setDueDepartment([])
            }
        }
    }, [dept, deptSect])

    const [column] = useState([
        { headerName: 'Emp ID ', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', filter: true },
        { headerName: 'Designation', field: 'desg_name', filter: true },
        { headerName: 'Date of Join', field: 'em_doj', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip
                            title="Click Here to Inactive the Selected Employee"
                            followCursor
                            placement='top'
                            arrow
                            sx={{}}
                        >
                            <IconButton onClick={() => InactiveEmp(params)} sx={{ p: 0, fontSize: 30 }} >
                                <ToggleOffOutlinedIcon color='error' fontSize='inherit' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Fragment>
        },
    ])

    const InactiveEmp = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        setDetails(data)
        setFlag(true)
    }, [])

    return (
        <CustomLayout title="Employee Inactive" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', m: 1 }}>
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
                    <Box sx={{ mt: 0.5, px: 0.3 }} >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                getemployeedetails()
                            }}
                            endDecorator={<Box>Search</Box>}
                        >
                            <PersonSearchIcon />
                        </Button>
                    </Box>
                </Paper>
                <Paper square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={column}
                        tableData={empData}
                        sx={{
                            height: screenInnerHeight - 200,
                            width: "100%",
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                <RemarkModal open={flag} setOpen={setFlag} data={details} setCount={setCount} dueDepartment={dueDepartment} />
            </Box>
        </CustomLayout>
    )
}

export default memo(EmployeeInactiveHR)
