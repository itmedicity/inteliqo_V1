import { Button, Input, Sheet } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, lastDayOfMonth, eachDayOfInterval } from 'date-fns'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import { ToastContainer } from 'react-toastify';
import Table from '@mui/joy/Table';

const DutyPlanReport = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting());
    }, [dispatch])

    const [value, setValue] = useState(new Date());
    const [toDate, setToDate] = useState(new Date())
    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])

    const [tableArray, settableArray] = useState([])

    const getDutyplanData = useCallback(async () => {

        const dateRange = eachDayOfInterval({ start: new Date(value), end: new Date(toDate) })
            ?.map(e => format(new Date(e), 'yyyy-MM-dd'));
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
            const result1 = await axioslogin.post("/plan/employeeplan", getData);
            const { success, data } = result1.data
            if (success === 1) {
                const mainArray = employeeData?.map((val) => {
                    const empwise = data.filter((value) => value.emp_id === val.em_id)
                    return {
                        dateAray: dateRange?.map(e => format(new Date(e), 'dd')),
                        daysAry: dateRange?.map(e => format(new Date(e), 'eee')),
                        em_no: val.em_no,
                        em_name: val.em_name,
                        dept_name: val.dept_name,
                        sect_name: val.sect_name,
                        arr: empwise
                    }
                })
                settableArray(mainArray);
                setdaysStr(mainArray?.filter(e => e.dateAray)?.find(e => e.dateAray)?.daysAry)
                setdaysNum(mainArray?.filter(e => e.dateAray)?.find(e => e.dateAray)?.dateAray)

            } else {
                warningNofity("No Dutyplan Updated")
            }

        } else {
            warningNofity("No Employee Under this Department || Department Section")
        }

    }, [deptartment, section, value, toDate])

    return (
        <CustomLayout title="Dutyplan Report" displayClose={true} >
            <ToastContainer />
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
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentDropRedx getDept={setDepart} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentSectionRedx getSection={setDepartSection} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                        <Button aria-label="Like" variant="outlined" color="primary" onClick={getDutyplanData} sx={{
                            color: '#90caf9'
                        }} >
                            <PublishedWithChangesIcon />
                        </Button>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                    </Box>
                </Paper>
                <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column', p: 0.5,
                    // height: screenInnerHeight * 75 / 100,
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
                                // '& tr > *:last-child': {
                                //     position: 'sticky',
                                //     right: 0,
                                //     bgcolor: 'var(--TableCell-headBackground)',
                                // },
                            }}
                        >
                            <thead>
                                <tr style={{ backgroundColor: '#f9fafb' }} >
                                    <th style={{ width: 200, zIndex: 5, backgroundColor: '#f9fafb' }}>Name</th>
                                    <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >ID#</th>
                                    {
                                        daysNum?.map((e, idx) => (
                                            <th key={idx} style={{ zIndex: 1, width: 150, textAlign: 'center', backgroundColor: '#f9fafb', color: '#344767', fontWeight: 800 }} >
                                                {e}
                                            </th>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <th style={{ zIndex: 5, backgroundColor: '#b1b9c0' }}> Days </th>
                                    <th style={{ textAlign: "center", zIndex: 1, backgroundColor: '#b1b9c0' }}>  </th>
                                    {
                                        daysStr?.map((e, idx) => (
                                            <th key={idx} style={{ zIndex: 1, textAlign: 'center', width: 150, backgroundColor: '#b1b9c0' }}>
                                                {e}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {tableArray && tableArray.map((row, index) => (
                                    <Fragment key={index}>
                                        <tr >
                                            <td rowSpan={2} style={{ zIndex: 4, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ width: 200 }}> {row.em_name}</Box>
                                            </td>
                                            <td rowSpan={2} style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                <Box sx={{ width: 60 }}> {row.em_no}</Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            {row.arr.map((val, ind) => (
                                                <td key={ind}
                                                    style={{
                                                        zIndex: 0,
                                                        width: 500,
                                                        borderLeft: '0.1px solid #dddfe2',
                                                        height: 10,
                                                        //backgroundColor: 'yellow'
                                                    }}
                                                >
                                                    <Box sx={{
                                                    }}>
                                                        {val.shft_desc}
                                                    </Box>
                                                </td>
                                            ))}
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

export default memo(DutyPlanReport)