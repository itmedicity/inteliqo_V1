import { Box, Paper } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, lastDayOfMonth, isValid } from 'date-fns'
import { screenInnerHeight } from 'src/views/Constant/Constant';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Button, Input, Sheet, Tooltip, Table, } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { getAllDeptList, setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getAllDeptSectList } from 'src/redux/actions/DepartmentSection.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { exportToWOFFExcel } from '../DayWiseAttendence/ExportToExcel';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const DutyplanChangeReport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting());
    }, [dispatch])

    const [value, setValue] = useState(new Date());
    const [toDate, setToDate] = useState(new Date())
    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [all, setAll] = useState(false)
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [click, setClick] = useState(0)
    const [tableArray, settableArray] = useState([])

    const { data: deptartments } = useQuery({
        queryKey: ['departmentList'],
        queryFn: getAllDeptList,
        staleTime: Infinity
    })

    const { data: deptartmentSection } = useQuery({
        queryKey: ['departmentSectionList'],
        queryFn: getAllDeptSectList,
        staleTime: Infinity
    })

    const getDutyplanData = useCallback(async () => {
        setClick(1)
        if (all === true && deptartment === 0 && section === 0) {
            //setOpenBkDrop(true)
            const deptArray = deptartments?.map(val => val.dept_id)
            const sectArray = deptartmentSection?.map(val => val.sect_id)
            const getEmpData = {
                em_department: deptArray,
                em_dept_section: sectArray,
            }
            const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1 && isValid(value) && value !== null) {
                const arr = employeeData?.map((val) => val.em_id)
                const getData = {
                    start_date: format(new Date(value), 'yyyy-MM-dd'),
                    end_date: format(new Date(toDate), 'yyyy-MM-dd'),
                    empData: arr
                }
                const result1 = await axioslogin.post("/plan/dutyplan/employeelog", getData);
                const { success, data } = result1.data
                if (success === 1) {
                    const mainArray = employeeData?.map((val) => {
                        const empwise = data?.filter((value) => value?.emp_id === val?.em_id)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: empwise
                        }
                    })
                    settableArray(mainArray);
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
                    start_date: format(new Date(value), 'yyyy-MM-dd'),
                    end_date: format(new Date(toDate), 'yyyy-MM-dd'),
                    empData: arr
                }
                const result1 = await axioslogin.post("/plan/dutyplan/employeelog", getData);
                const { success, data } = result1.data
                if (success === 1) {
                    const mainArray = employeeData?.map((val) => {
                        const empwise = data?.filter((value) => value?.emp_id === val?.em_id)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: empwise
                        }
                    })
                    settableArray(mainArray);
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
    }, [deptartment, section, value, toDate, all, deptartments, deptartmentSection])

    const toDownload = useCallback(async () => {
        if (click === 0) {
            warningNofity("Please Click Search Button")
        } else {
            const fileName = "Weekoff_Report";
            const headers = ["Name", "Emp Id", "Department", " Section", "No of Week Off", "Dates"];
            const sheetName = "Duty Plan Change Report"

            // Rows for Excel file
            const rows = tableArray?.map(row => {
                //const length = row?.arr?.length
                const rowData = [
                    row.em_name,
                    row.em_no,
                    row.dept_name,
                    row.sect_name,
                    //length,
                    ...row.arr.map(val => format(new Date(val.duty_day), 'dd-MM-yyyy'))
                ];
                return rowData;
            });

            // Prepare data for Excel export
            const excelData = [headers, ...rows];

            // Call ExporttoExcel function
            exportToWOFFExcel(excelData, fileName, sheetName);
            setClick(0)
        }
    }, [click, tableArray])

    return (
        <CustomLayout title="Dutyplan Change Report" displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
            <Paper sx={{ display: 'flex', height: screenInnerHeight * 83 / 100, flexDirection: 'column', width: '100%' }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5 }}  >
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    value={value}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    minDate={new Date(value)}
                                    maxDate={lastDayOfMonth(new Date(value))}
                                    value={toDate}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(newValue) => {
                                        setToDate(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{ px: 0.3, mt: 1 }} >
                        <JoyCheckbox
                            label='All'
                            name="all"
                            checked={all}
                            onchange={(e) => setAll(e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentDropRedx getDept={setDepart} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentSectionRedx getSection={setDepartSection} />
                    </Box>
                    <Tooltip title="Search" followCursor placement='top' arrow variant='outlined' color='primary'>
                        <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                            <Button aria-label="Like" variant="outlined" color="primary" onClick={getDutyplanData} sx={{
                                color: '#90caf9'
                            }} >
                                <PublishedWithChangesIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                        <Button aria-label="Like" variant="outlined" color="primary" onClick={toDownload} sx={{
                            color: '#90caf9'
                        }} >
                            <SaveAltIcon />
                        </Button>
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
                                    <th style={{ width: 150, zIndex: 2, backgroundColor: '#f9fafb' }} >Department</th>
                                    <th style={{ width: 150, zIndex: 2, backgroundColor: '#f9fafb' }} >Section</th>
                                    {/* <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >No of week Off</th> */}
                                    <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableArray && tableArray.map((row, index) => (
                                    <Fragment key={index}>
                                        <tr >
                                            <td style={{ zIndex: 4, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ width: 200 }}> {row?.em_name}</Box>
                                            </td>
                                            <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ width: 60 }}> {row?.em_no}</Box>
                                            </td>
                                            <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ flex: 1 }}> {row?.dept_name}</Box>
                                            </td>
                                            <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ flex: 1 }}> {row?.sect_name}</Box>
                                            </td>
                                            <td style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                {row.arr.map((val, ind) => (
                                                    <Box key={ind}>
                                                        {format(new Date(val?.duty_day), 'dd-MM-yyyy')}
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
            </Paper>
        </CustomLayout>
    )
}

export default memo(DutyplanChangeReport) 