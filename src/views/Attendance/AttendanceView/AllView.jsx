import { Button, CssVarsProvider, IconButton, Input, Sheet, Tooltip, Typography } from '@mui/joy';
import Table from '@mui/joy/Table';
import { Box, Paper, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useMemo } from 'react';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { DeptWiseAttendanceViewFun } from './Functions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { useHistory } from 'react-router-dom';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import LeaveDescription from './LeaveDescription';

const AllView = ({ em_id }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const toRedirectToHome = () => {
        history.push(`/Home`)
    }
    const [value, setValue] = useState(moment(new Date()));
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [dateArray, setDateArray] = useState([])
    const [empArray, setEmpArray] = useState([])

    // get holiday 
    const holiday = useSelector((state) => state.getHolidayList, _.isEqual);

    const holidayList = useMemo(() => holiday, [holiday]);

    const getData = async () => {
        if (deptSection === 0) {
            warningNofity("Please Select Any Department Section")
        } else {
            const getEmpData = {
                dept_id: dept,
                sect_id: deptSection,
            }
            const result = await axioslogin.post('/empmast/getEmpDet', getEmpData)
            const { success, data, } = result.data
            if (success === 1) {
                const arr = data && data.map((val, index) => {
                    return val.em_no
                })
                const postdata = {
                    em_no: arr,
                    from: moment(startOfMonth(new Date(value))).format('YYYY-MM-DD'),
                    to: moment(endOfMonth(new Date(value))).format('YYYY-MM-DD')
                }
                let empData = data;
                const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
                const { success } = result.data
                if (success === 1) {
                    let punchData = result.data.data;
                    DeptWiseAttendanceViewFun(value, holidayList).then((values) => {
                        console.log(values)
                        setDateArray(values);
                        const newFun = (val) => {
                            const arr = punchData?.filter(item => val.em_no === item.em_no)
                            const array = arr.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
                            return {
                                ...val,
                                "arr": array
                            }
                        }
                        const newEmp = empData?.map(newFun)
                        setEmpArray(newEmp);
                    })
                } else {
                    infoNofity("No Punch Details")
                }
            } else {
                infoNofity("No employee Under given Condition")
            }
        }
    }
    return (
        <CustomLayout title="Attendance View" displayClose={true} >
            <ToastContainer />
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight, flexDirection: 'column' }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5 }}  >
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentDropRedx getDept={setDept} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, px: 0.5 }, flexDirection: 'row' }} >
                        <DepartmentSectionRedx getSection={setDeptSection} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                        <CssVarsProvider>
                            <Tooltip title="Process" followCursor placement='top' arrow >
                                <Button aria-label="Like" variant="outlined" color='success' onClick={getData} >
                                    <PublishedWithChangesIcon />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                    </Box>
                </Paper>
                <Paper square variant='elevation' sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start', flexWrap: 'wrap', m: 0.5, p: 0.5, }}  >
                    <LeaveDescription lvename='P' desc="Present" />
                    <LeaveDescription lvename='WOFF' desc="Work OFF" />
                    <LeaveDescription lvename='LC' desc="Late Coming" />
                    <LeaveDescription lvename='HD' desc="Half Day" />
                    <LeaveDescription lvename='A' desc="Absent" />
                    <LeaveDescription lvename='H' desc="Holiday" />
                    <LeaveDescription lvename='HDL' desc="Halfday Leave" />
                    <LeaveDescription lvename='LV' desc="Leave" />
                    <LeaveDescription lvename='HP' desc="Holiday Present" />
                </Paper>
                <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column', mt: 1,
                    height: 500,
                    overflow: 'auto', '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                }}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            // '--TableCell-height': '40px',
                            // // the number is the amount of the header rows.
                            // '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                            // '--Table-firstColumnWidth': '150px',
                            // '--Table-lastColumnWidth': '144px',
                            // // background needs to have transparency to show the scrolling shadows
                            // '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                            // '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                            overflow: 'auto',
                            // background: (
                            //     theme,
                            // ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                            //         linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                            //         radial-gradient(
                            //         farthest-side at 0 50%,
                            //         rgba(0, 0, 0, 0.12),
                            //         rgba(0, 0, 0, 0)
                            //         ),
                            //         radial-gradient(
                            //             farthest-side at 100% 50%,
                            //             rgba(0, 0, 0, 0.12),
                            //             rgba(0, 0, 0, 0)
                            //         )
                            //         0 100%`,
                            // backgroundSize:
                            //     '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                            // backgroundRepeat: 'no-repeat',
                            // backgroundAttachment: 'local, local, scroll, scroll',
                            // backgroundPosition:
                            //     'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                            // backgroundColor: 'background.surface',
                        }}
                    >
                        <Table
                            borderAxis="bothBetween"
                            stripe="odd"
                            hoverRow
                            stickyHeader
                            sx={{
                                '& tr > *:first-of-type': {
                                    position: 'sticky',
                                    left: 0,
                                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                                    bgcolor: 'background.surface',
                                }
                            }}
                        >
                            <Box >
                                <thead>
                                    <tr>
                                        <th style={{ width: 400, zIndex: 1 }}>Name</th>
                                        <th style={{ zIndex: 0 }} >ID#</th>
                                        {dateArray && dateArray.map((val, index) => (
                                            <th key={index} style={{ zIndex: 0 }} >
                                                {val.date}
                                            </th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th style={{ zIndex: 1 }}> Days </th>
                                        <th style={{ textAlign: "center", zIndex: 0 }}>  </th>
                                        {dateArray && dateArray.map((val, index) => (
                                            <th key={index} style={{ zIndex: 0 }}>
                                                {/* <Box sx={{
                                                textTransform: 'capitalize',
                                                color: val.holiday === 1 || val.sunday === '0' ? '#880e4f' : '#212121'
                                            }} > */}
                                                {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}
                                                {/* </Box> */}
                                            </th>
                                        ))}
                                        <th aria-label="last"
                                            style={{ width: 'var(--Table-lastColumnWidth)' }}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empArray && empArray.map((row, index) => (
                                        <tr key={index} >
                                            <td>
                                                <Box> {row.emp_name}</Box>
                                            </td>
                                            <td >
                                                <Box> {row.em_no}</Box>
                                            </td>
                                            {row.arr.map((val, index) => (
                                                <td key={index}>
                                                    <Box >
                                                        {val.duty_desc}
                                                    </Box>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Box>
                        </Table>
                    </Sheet>
                </Box>
            </Paper >
        </CustomLayout>
    )
}

export default memo(AllView)