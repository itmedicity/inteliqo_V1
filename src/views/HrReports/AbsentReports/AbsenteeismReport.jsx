import { Box, Button, Input, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { memo, useCallback, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { getAllDeptList } from 'src/redux/actions/Department.action'
import { getAllDeptSectList } from 'src/redux/actions/DepartmentSection.Action'
import { useQuery } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import ReportLayout from '../ReportComponent/ReportLayout'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const AbsenteeismReport = () => {

    const [value, setValue] = useState(new Date());
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const { data: deptartments, isError: isDepartmentError, isLoading: isDepartmentLoading } = useQuery({
        queryKey: ['departmentList'],
        queryFn: getAllDeptList,
        staleTime: Infinity
    })

    const { data: deptartmentSection, isError: isSectionError, isLoading: isSectionLoading } = useQuery({
        queryKey: ['departmentSectionList'],
        queryFn: getAllDeptSectList,
        staleTime: Infinity
    })


    const getEmpdata = useCallback(async () => {
        setOpenBkDrop(true)

        const deptArray = deptartments?.map(val => val.dept_id)
        const sectArray = deptartmentSection?.map(val => val.sect_id)
        const getEmpData = {
            em_department: deptArray,
            em_dept_section: sectArray,
        }
        const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
        const { succes, dataa: employeeData } = result1.data
        if (succes === 1 && employeeData.length !== 0) {
            const arr = employeeData?.map((val) => val.em_no)
            const getData = {
                fromDate_punchMaster: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                toDate_punchMaster: format(endOfMonth(new Date(value)), 'yyyy-MM-dd '),
                empList: arr
            }
            const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", getData); //GET PUNCH MASTER DATA
            const { success, planData: punchMasterData } = punch_master_data.data;

            if (success === 1) {
                const arr = deptartmentSection?.map((val) => {
                    const sl = punchMasterData?.filter((i) => (i.sect_id === val.sect_id) && i.duty_desc === 'SL')
                    const cl = punchMasterData?.filter((i) => (i.sect_id === val.sect_id) && i.duty_desc === 'CL')
                    const el = punchMasterData?.filter((i) => (i.sect_id === val.sect_id) && i.duty_desc === 'EL')
                    const total = punchMasterData?.filter((i) => (i.sect_id === val.sect_id)
                        && (i.duty_desc === 'EL' || i.duty_desc === 'SL' || i.duty_desc === 'CL'))

                    return {
                        ...val,
                        headCount: employeeData?.filter((k) => k.sect_id === val.sect_id),
                        countSL: sl.length,
                        countCL: cl.length,
                        countEL: el.length,
                        totalLV: total.length,
                    }
                })
                setTableData(arr)
                setOpenBkDrop(false)
            } else {
                warningNofity("Error While Getting Punch Master Data")
                setOpenBkDrop(false)
            }
        } else {
            warningNofity("Error While Getting Employee Data")
            setOpenBkDrop(false)
        }
    }, [value, deptartments, deptartmentSection])

    const [column] = useState([
        { headerName: 'Section', field: 'sect_name', minWidth: 300 },
        { headerName: 'Department ', field: 'dept_name', minWidth: 300 },
        { headerName: 'SL', field: 'countSL' },
        { headerName: 'CL', field: 'countCL' },
        { headerName: 'EL', field: 'countEL' },
        { headerName: 'Total', field: 'totalLV' },
        { headerName: 'Absenteeism', field: 'totalLV' },

    ])

    if (isDepartmentLoading || isSectionLoading) return <p>Loading...</p>;
    if (isDepartmentError || isSectionError) return <p>Error occurred.</p>;

    return (
        // <ReportWithFunction title="Absenteeism Report" displayClose={true} download={toDownload} >
        <ReportLayout title="Absenteeism Report" data={tableData} displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !. " />
            <Box sx={{
                display: 'flex', flexDirection: 'column', flex: 1,
                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                    <Box sx={{
                        mt: 1, ml: 0.5, display: 'flex',
                        //flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                        flexDirection: 'row',
                        // bgcolor: 'yellow'
                    }} >

                        <Typography sx={{ p: 1 }}>Select Month</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                // minDate={subMonths(new Date(), 1)}
                                //maxDate={addMonths(new Date(), 1)}
                                value={value}
                                size="small"
                                onChange={(newValue) => { setValue(newValue) }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5, mt: 1,
                        //bgcolor: 'lightblue'
                    }} >
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={getEmpdata}
                                fullWidth
                                startDecorator={<SearchIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Search
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        p: 1, mt: 0.5,
                        display: 'flex',
                        backgroundColor: '#f0f3f5',
                        flexDirection: "column",
                    }} >
                    <CustomAgGridRptFormatOne
                        tableDataMain={tableData}
                        columnDefMain={column}
                    />
                </Paper>
            </Box>
        </ReportLayout>
    )
}

export default memo(AbsenteeismReport) 