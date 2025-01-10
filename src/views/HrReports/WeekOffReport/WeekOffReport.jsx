import { Box, Button, Input, Sheet, Table, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import ReportWithFunction from '../ReportComponent/ReportWithFunction'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { endOfMonth, format } from 'date-fns';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { getAllDeptList, setDepartment } from 'src/redux/actions/Department.action';
import { getAllDeptSectList } from 'src/redux/actions/DepartmentSection.Action';
import { useDispatch } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getCommonsettingData } from 'src/views/CommonCode/CommonReactQueries';
import { Paper } from '@mui/material';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { ToastContainer } from 'react-toastify';
import { exportToWOFFExcel } from '../DayWiseAttendence/ExportToExcel';

const WeekOffReport = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [fromdate, Setfromdate] = useState(new Date());
    const [todate, Settodate] = useState(new Date());
    const [all, setAll] = useState(false)
    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [tableData, setTableData] = useState([])
    const [click, setClick] = useState(0)

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


    const { data: commonSettings, isError: isCommonError, isLoading: isCommonDataLoading } = useQuery({
        queryKey: ['commonSettingdata'],
        queryFn: getCommonsettingData
    })

    const getEmpdata = useCallback(async () => {
        setClick(1)
        const { week_off_day } = commonSettings

        if (all === true && deptartment === 0 && section === 0) {
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
                const arr = employeeData?.map((val) => val.em_id)
                const getData = {
                    start_date: format(new Date(fromdate), 'yyyy-MM-dd'),
                    end_date: format(new Date(todate), 'yyyy-MM-dd'),
                    empData: arr
                }
                const result1 = await axioslogin.post("/plan/employeeplan", getData);
                const { success, data } = result1.data
                if (success === 1) {
                    const mainArray = employeeData?.map((val) => {
                        const weekoffarray = data.filter((value) => (value.emp_id === val.em_id) && value.shift_id === week_off_day)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: weekoffarray
                        }
                    })
                    setTableData(mainArray);
                    setOpenBkDrop(false)
                } else {
                    warningNofity("No Dutyplan Updated")
                    setOpenBkDrop(false)
                }
            } else {
                warningNofity("Employee Doesn't Exist!")
                setOpenBkDrop(false)
            }
        } else {
            setOpenBkDrop(true)
            const getEmpData = {
                em_department: deptartment,
                em_dept_section: section,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1) {
                const arr = employeeData?.map((val) => val.em_id)
                const getData = {
                    start_date: format(new Date(fromdate), 'yyyy-MM-dd'),
                    end_date: format(new Date(todate), 'yyyy-MM-dd'),
                    empData: arr
                }
                const result1 = await axioslogin.post("/plan/employeeplan", getData);
                const { success, data } = result1.data
                if (success === 1) {
                    const mainArray = employeeData?.map((val) => {
                        const weekoffarray = data.filter((value) => (value.emp_id === val.em_id) && value.shift_id === week_off_day)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: weekoffarray
                        }
                    })
                    setTableData(mainArray);
                    setOpenBkDrop(false)
                } else {
                    warningNofity("No Dutyplan Updated")
                    setOpenBkDrop(false)
                }
            } else {
                warningNofity("No Employee Under this Department || Department Section")
                setOpenBkDrop(false)
            }
        }
    }, [deptartment, section, fromdate, todate, commonSettings, deptartments, deptartmentSection,
        all])


    if (isDepartmentLoading || isSectionLoading || isCommonDataLoading) return <p>Loading...</p>;
    if (isDepartmentError || isSectionError || isCommonError) return <p>Error occurred.</p>;

    const toDownload = async () => {
        if (click === 0) {
            warningNofity("Please Click Search Button")
        } else {
            const fileName = "Weekoff_Report";
            const headers = ["Name", "Emp Id", "Department", " Section", "No of Week Off", "Dates"];

            // Rows for Excel file
            const rows = tableData?.map(row => {
                const length = row?.arr?.length
                const rowData = [
                    row.em_name,
                    row.em_no,
                    row.dept_name,
                    row.sect_name,
                    length,
                    ...row.arr.map(val => format(new Date(val.duty_day), 'dd-MM-yyyy'))
                ];
                return rowData;
            });

            // Prepare data for Excel export
            const excelData = [headers, ...rows];

            // Call ExporttoExcel function
            exportToWOFFExcel(excelData, fileName);
        }
    }

    return (
        <>
            <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
            <ToastContainer />
            <ReportWithFunction title="Excess Week Off Report" displayClose={true} download={toDownload} >
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                }}>
                    <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                        <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', flexWrap: "wrap", gap: 0.5 }} >
                            <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                                <Typography sx={{ p: 1 }}>From:</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        // disableFuture={true}
                                        views={['day']}
                                        value={fromdate}
                                        maxDate={new Date()}
                                        inputFormat='dd-MM-yyyy'
                                        size="small"
                                        onChange={(newValue) => Setfromdate(newValue)}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                                <Typography sx={{ p: 1 }}>To:</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    < DatePicker
                                        // disableFuture={true}
                                        views={['day']}
                                        value={todate}
                                        inputFormat='dd-MM-yyyy'
                                        maxDate={endOfMonth(new Date(fromdate))}
                                        size="small"
                                        onChange={(newValue) => Settodate(newValue)}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ px: 0.3, mt: 1 }} >
                                <JoyCheckbox
                                    label='All'
                                    name="all"
                                    checked={all}
                                    onchange={(e) => setAll(e.target.checked)}
                                />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5, width: '20%', }}>
                                <DepartmentDropRedx getDept={setDepart} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5, width: '50%' }}>
                                <DepartmentSectionRedx getSection={setDepartSection} />
                            </Box>
                            <Box sx={{
                                display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                                justifyContent: 'flex-start', pl: 0.5,
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
                        </Box>
                    </Paper>
                    <Box sx={{
                        display: 'flex', width: '100%', flexDirection: 'column', p: 0.5,
                        height: screenInnerHeight * 75 / 100,
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                    }}>
                        <Sheet
                            variant="outlined"
                            invertedColors
                            sx={{
                                '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                                '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                                overflow: 'auto',
                                borderRadius: 5,
                                width: '100%'
                            }}
                        >
                            <Table
                                borderAxis="bothBetween"
                                stripe="odd"
                                hoverRow
                                stickyHeader
                                size='sm'
                                sx={{
                                    '& tr > *:first-of-type': {
                                        position: 'sticky',
                                        left: 0,
                                        boxShadow: '1px 0 var(--TableCell-borderColor)',
                                        bgcolor: 'background.surface',
                                        zIndex: 4,
                                        width: '100%'
                                    },
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }} >
                                        <th style={{ width: 200, zIndex: 5, backgroundColor: '#f9fafb' }}>Name</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >ID#</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >Department</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >Section</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >No of week Off</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >Dates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData && tableData.map((row, index) => (
                                        <Fragment key={index}>
                                            <tr >
                                                <td style={{ zIndex: 4, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 200 }}> {row.em_name}</Box>
                                                </td>
                                                <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 60 }}> {row.em_no}</Box>
                                                </td>
                                                <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 60 }}> {row.dept_name}</Box>
                                                </td>
                                                <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 60 }}> {row.sect_name}</Box>
                                                </td>
                                                <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 60 }}> {row.arr.length}</Box>
                                                </td>
                                                <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    {row.arr.map((val, ind) => (
                                                        <Box key={ind}>
                                                            {format(new Date(val.duty_day), 'dd-MM-yyyy')}
                                                        </Box>
                                                    ))}
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Box>
                </Box>
            </ReportWithFunction>
        </>
    )
}

export default memo(WeekOffReport) 