import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { Paper, TextField, Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { IconButton as OpenIcon } from '@mui/material';
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import ArearModal from './ArearModal'
// import EarnDeductionSelection from 'src/views/MuiComponents/EarnDeductionSelection'

const ArearUpdation = () => {

    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [open, setOpen] = useState(false)
    const [Empno, setEmpNo] = useState(0)
    const [tableData, setTableData] = useState([])
    const [details, setDetails] = useState({})
    //const [earn, setEarn] = useState(0)

    const getEmpNO = async (e) => {
        setEmpNo(e.target.value)
    }

    const getData = useCallback(async () => {
        if (dept !== 0 && deptSect !== 0 && Empno === 0) {
            const postData = {
                em_department: dept,
                em_dept_section: deptSect
            }
            const result = await axioslogin.post("/plan/create", postData);
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData([]);
            }

        } else if (dept !== 0 && deptSect !== 0 && Empno !== 0) {
            const checkid = {
                em_no: Empno,
                em_department: dept,
                em_dept_section: deptSect
            }
            const result = await axioslogin.post('/empearndeduction/all/data', checkid)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                infoNofity("No employee exist with this employee number!!")
                setTableData([]);
            }
        } else if (dept === 0 && deptSect === 0 && Empno !== 0) {
            const result = await axioslogin.get(`/empearndeduction/getAll/${Empno}`)
            const { data, success } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                infoNofity("No employee exist with this employee number!!")
                setTableData([]);
            }
        } else {
            infoNofity('Check The Department || Department Section Feild');
        }
    }, [dept, deptSect, Empno])

    const [column] = useState([
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Tooltip title="View Details" followCursor placement='top' arrow >
                    <OpenIcon onClick={() => handleClickIcon(params)}>
                        <NextPlanOutlinedIcon color='primary' />
                    </OpenIcon>
                </Tooltip>
        }
    ])

    const handleClickIcon = useCallback((params) => {
        setDetails(params.data);
        setOpen(true)
    }, [])

    return (
        <>
            <ArearModal open={open} setOpen={setOpen} data={details} />
            <CustomLayout title="Arear Updation" displayClose={true} >
                <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                        {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <EarnDeductionSelection setValue={setEarn} value={earn} />
                        </Box> */}
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                                <TextField fullWidth
                                    id="fullWidth" size="small"
                                    onChange={getEmpNO}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                            <CssVarsProvider>
                                <Box sx={{ p: 0.2 }} >
                                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                        color: '#90caf9'
                                    }} >
                                        <PublishedWithChangesIcon />
                                    </Button>
                                </Box>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={column}
                            tableData={tableData}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
                </Box>
            </CustomLayout>
        </>
    )
}

export default memo(ArearUpdation)