import { Button, CssVarsProvider, Input, Sheet, Tooltip, Typography } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { memo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DeptSectionSelect from 'src/views/LeaveManagement/NightOff/DeptSectionSelect';
import { useMemo } from 'react';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { AttendanceViewFun, DeptWiseAttendanceViewFun } from './Functions';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { useCallback } from 'react';
import Table from '@mui/joy/Table';

const InchargeHodCompnt = ({ em_id, em_no }) => {

    const empid = useMemo(() => em_id, [em_id])
    const [value, setValue] = useState(moment(new Date()));
    const [deptSection, setDeptSection] = useState(0)
    const [dateArray, setDateArray] = useState([])
    const [empArray, setEmpArray] = useState([])
    const [self, setSelf] = useState(false)
    const [mainArray, setMainArray] = useState([])

    // get holiday 
    const holiday = useSelector((state) => state.getHolidayList, _.isEqual);

    const holidayList = useMemo(() => holiday, [holiday]);

    const getData = async () => {
        if (deptSection === 0) {
            warningNofity("Please Select Any Department Section")
        } else {
            const getEmpData = {
                em_dept_section: deptSection,
            }
            const result1 = await axioslogin.post("/attendCal/emplist/show", getEmpData);
            const { success, data } = result1.data
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

    const selfdata = useCallback(async () => {
        const postdata = {
            em_no: em_no,
            from: moment(startOfMonth(new Date(value))).format('YYYY-MM-DD'),
            to: moment(endOfMonth(new Date(value))).format('YYYY-MM-DD')
        }
        const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
        const { success, data } = result.data
        if (success === 1) {
            let punchData = data;
            AttendanceViewFun(value, punchData, holidayList).then((values) => {
                setMainArray(values)
            })
        } else {
            setMainArray([])
            infoNofity("No Punch Details")
        }
    }, [em_no, value, holidayList])

    return (
        <CustomLayout title="Attendance View" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                {
                    self === true ? <><Paper
                        square
                        variant="outlined"
                        sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
                    >
                        <ToastContainer />
                        {/* <CustomBackDrop open={open} text="Please Wait" /> */}
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
                        <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                            <CssVarsProvider>
                                <Tooltip title="Process" followCursor placement='top' arrow >
                                    <Box sx={{ p: 0.2 }} >
                                        <Button aria-label="Like" variant="outlined" color="neutral" onClick={selfdata} sx={{
                                            color: '#90caf9'
                                        }} >
                                            <PublishedWithChangesIcon />
                                        </Button>
                                    </Box>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} ></Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} ></Box>
                    </Paper>
                        <Paper square sx={{ display: "flex", p: 1, alignItems: "center", justifyContent: 'space-between' }}  >
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        P
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: "center" }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Present
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        OFF
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Work OFF
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        EHFD
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Early Going
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        LC
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Late Coming
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HFD
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Half Day
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        A
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Absent
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        H
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Holiday
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HDL
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Halfday Leave
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        LV
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Leave
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HP
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Holiday Present
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{ width: "100%" }} >
                            <Box sx={{
                                display: 'flex', width: '100%', flexDirection: 'column', mt: 1,
                                height: 500,
                                overflow: 'auto', '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                            }}>
                                <Sheet
                                    variant="outlined"
                                    sx={{
                                        '--TableCell-height': '40px',
                                        // the number is the amount of the header rows.
                                        '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                                        '--Table-firstColumnWidth': '100px',
                                        '--Table-lastColumnWidth': '144px',
                                        // background needs to have transparency to show the scrolling shadows
                                        '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                                        '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                                        overflow: 'auto',
                                        background: (
                                            theme,
                                        ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                                        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                                        radial-gradient(
                                          farthest-side at 0 50%,
                                          rgba(0, 0, 0, 0.12),
                                          rgba(0, 0, 0, 0)
                                        ),
                                        radial-gradient(
                                            farthest-side at 100% 50%,
                                            rgba(0, 0, 0, 0.12),
                                            rgba(0, 0, 0, 0)
                                          )
                                          0 100%`,
                                        backgroundSize:
                                            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundAttachment: 'local, local, scroll, scroll',
                                        backgroundPosition:
                                            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                                        backgroundColor: 'background.surface',
                                    }}
                                >
                                    <Table
                                        borderAxis="bothBetween"
                                        stripe="odd"
                                        hoverRow
                                        stickyHeader
                                        sx={{
                                            '& tr > *:first-child': {
                                                position: 'sticky',
                                                left: 0,
                                                boxShadow: '1px 0 var(--TableCell-borderColor)',
                                                bgcolor: 'background.surface',
                                            },
                                        }}
                                    >
                                        <Box >
                                            <thead>
                                                <tr>
                                                    {mainArray && mainArray.map((val, index) => (
                                                        <th key={index}  >
                                                            {val.date}
                                                        </th>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {mainArray && mainArray.map((val, index) => (
                                                        <th key={index}   >

                                                            {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}

                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  >
                                                    {mainArray && mainArray.map((row, index) => (

                                                        <td key={index}>
                                                            {row.duty_desc}
                                                        </td>

                                                    ))}
                                                </tr>
                                            </tbody>
                                        </Box>
                                    </Table>
                                </Sheet>
                            </Box>
                            {/* <Box component={Grid}
                                container
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                sx={{
                                    display: 'flex',
                                    overflow: 'auto',
                                    '::-webkit-scrollbar': {
                                        height: 8,
                                    },
                                    '::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                                        borderRadius: '0px',
                                    },

                                    '::-webkit-scrollbar-thumb': {
                                        // background: '#077DFA',
                                        borderRadius: '0px',
                                    },

                                    '::-webkit-scrollbar-thumb:hover': {
                                        //   background: 'rgb(255, 251, 251)',
                                    },
                                    p: 1
                                }} >
                                <TableContainer component={Grid}
                                    item
                                    xs={'auto'}
                                    sm={'auto'}
                                    md={'auto'}
                                    lg={'auto'}
                                    xl={'auto'}
                                    sx={{
                                        display: 'flex',
                                    }}>
                                    <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                                        <TableHead>
                                            <TableRow>
                                                {mainArray && mainArray.map((val, index) => (
                                                    <TableCell key={index} sx={{
                                                        width: 100,
                                                        p: 0,
                                                        border: 0.1, borderColor: '#E1E6E1',
                                                        backgroundColor: val.holiday === 1 ? '#e3f2fd' : '#f1faee',
                                                    }}
                                                    >
                                                        <Box
                                                            component={Grid}
                                                            item
                                                            sx={{ minHeight: 25, maxHeight: 25, textAlign: 'center' }}
                                                        >
                                                            {val.date}
                                                        </Box>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow>
                                                {mainArray && mainArray.map((val, index) => (
                                                    <TableCell key={index} sx={{
                                                        p: 0,
                                                        width: 100,
                                                        backgroundColor: val.sunday === '0' ? '#ffebee' : '#f1faee',
                                                        border: 0.1,
                                                        borderColor: '#E1E6E1',
                                                    }}
                                                    >
                                                        <Box
                                                            component={Grid}
                                                            item
                                                            sx={{
                                                                minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                                textTransform: 'capitalize',
                                                                color: val.holiday === 1 || val.sunday === '0' ? '#880e4f' : '#212121'
                                                            }}
                                                        >
                                                            {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}
                                                        </Box>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                selected={true}
                                                hover={true}
                                            >
                                                {mainArray && mainArray.map((row, index) => (
                                                    <TableCell key={index} sx={{ p: 0, width: 100, }}>
                                                        <Box
                                                            component={Grid}
                                                            item
                                                            sx={{
                                                                minHeight: 25, maxHeight: 25,
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {row.duty_desc}
                                                        </Box>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box> */}
                        </Box></> : <>
                        <Paper
                            square
                            variant="outlined"
                            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
                        >
                            <ToastContainer />

                            {/* <CustomBackDrop open={open} text="Please Wait" /> */}
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
                            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row' }} >
                                <DeptSectionSelect em_id={empid} value={deptSection} setValue={setDeptSection} />
                            </Box>
                            <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                                <CssVarsProvider>
                                    <Tooltip title="Process" followCursor placement='top' arrow >
                                        <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                            color: '#90caf9'
                                        }} >
                                            <PublishedWithChangesIcon />
                                        </Button>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }} >
                                <JoyCheckbox
                                    label='Self'
                                    name="self"
                                    checked={self}
                                    onchange={(e) => setSelf(e.target.checked)}
                                />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }} ></Box>
                        </Paper>
                        <Paper square sx={{ display: "flex", p: 1, alignItems: "center", justifyContent: 'space-between' }}  >
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        P
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: "center" }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Present
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        OFF
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Work OFF
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        EHFD
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Early Going
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        LC
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Late Coming
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HFD
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Half Day
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        A
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Absent
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        H
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Holiday
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HDL
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Halfday Leave
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        LV
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Leave
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #E2F6CA', padding: 1, }}  >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 17, }}>
                                        HP
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1, alignItems: 'center' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ display: 'flex', }} >
                                            Holiday Present
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{
                            display: 'flex', width: '100%', flexDirection: 'column', mt: 1,
                            height: 500,
                            overflow: 'auto', '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                        }}>
                            <Sheet
                                variant="outlined"
                                sx={{
                                    '--TableCell-height': '40px',
                                    // the number is the amount of the header rows.
                                    '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                                    '--Table-firstColumnWidth': '100px',
                                    '--Table-lastColumnWidth': '144px',
                                    // background needs to have transparency to show the scrolling shadows
                                    '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                                    '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                                    overflow: 'auto',
                                    background: (
                                        theme,
                                    ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                                    linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                                    radial-gradient(
                                      farthest-side at 0 50%,
                                      rgba(0, 0, 0, 0.12),
                                      rgba(0, 0, 0, 0)
                                    ),
                                    radial-gradient(
                                        farthest-side at 100% 50%,
                                        rgba(0, 0, 0, 0.12),
                                        rgba(0, 0, 0, 0)
                                      )
                                      0 100%`,
                                    backgroundSize:
                                        '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundAttachment: 'local, local, scroll, scroll',
                                    backgroundPosition:
                                        'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                                    backgroundColor: 'background.surface',
                                }}
                            >
                                <Table
                                    borderAxis="bothBetween"
                                    stripe="odd"
                                    hoverRow
                                    stickyHeader
                                    sx={{
                                        '& tr > *:first-child': {
                                            position: 'sticky',
                                            left: 0,
                                            boxShadow: '1px 0 var(--TableCell-borderColor)',
                                            bgcolor: 'background.surface',
                                        },
                                    }}
                                >
                                    <Box >
                                        <thead>
                                            <tr>
                                                <th style={{ width: 400 }}>Name</th>
                                                <th >ID#</th>
                                                {dateArray && dateArray.map((val, index) => (
                                                    <th key={index} >
                                                        {val.date}
                                                    </th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "center" }}> Days </th>
                                                <th style={{ textAlign: "center" }}>  </th>
                                                {dateArray && dateArray.map((val, index) => (
                                                    <th key={index}>
                                                        {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}

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
                                                        <Box> {row.em_name}</Box>
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

                        {/* <Box sx={{ width: "100%" }} >
                            <Paper square elevation={0} sx={{
                                display: "flex",
                                p: 1,
                                alignItems: "center",
                            }}  >
                            </Paper>
                            <Box component={Grid}
                                container item
                                xs={12} sm={12} md={12} lg={12} xl={12}
                                sx={{
                                    display: 'flex',
                                    overflow: 'auto',
                                    '::-webkit-scrollbar': {
                                        height: 8,
                                    },
                                    '::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                                        borderRadius: '0px',
                                    },

                                    '::-webkit-scrollbar-thumb': {
                                        // background: '#077DFA',
                                        borderRadius: '0px',
                                    },

                                    '::-webkit-scrollbar-thumb:hover': {
                                        //   background: 'rgb(255, 251, 251)',
                                    },
                                    p: 1
                                }} >
                                <TableContainer component={Grid}
                                    item
                                    xs={'auto'}
                                    sm={'auto'}
                                    md={'auto'}
                                    lg={'auto'}
                                    xl={'auto'}
                                    sx={{
                                        display: 'flex',
                                        maxHeight: 500
                                    }}>
                                    <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" stickyHeader aria-label="sticky table" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell size='medium' padding='none' align="center" sx={{ fontWeight: 550, width: 200, border: 0.1 }} >
                                                    <Box>  Name</Box>
                                                </TableCell>
                                                <TableCell size='medium' padding='none' align="center" sx={{ fontWeight: 550, border: 0.1 }}>
                                                    <Box> ID#</Box>
                                                </TableCell>
                                                {dateArray && dateArray.map((val, index) => (
                                                    <TableCell key={index} size='medium' padding='none' align="center"
                                                        sx={{
                                                            width: 100, border: 0.1,
                                                            fontWeight: 550,
                                                            backgroundColor: val.holiday === 1 ? '#e3f2fd' : '#f1faee'
                                                        }} >
                                                        <Box>{val.date}</Box>
                                                    </TableCell>
                                                ))}
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell size='medium' padding='none' align="center" sx={{ fontWeight: 550, border: 0.1 }} >
                                                    <Box> Days </Box>
                                                </TableCell>
                                                <TableCell size='medium' padding='none' align="center" sx={{ fontWeight: 550, border: 0.1 }}  >
                                                    <Box ></Box>
                                                </TableCell>
                                                {dateArray && dateArray.map((val, index) => (
                                                    <TableCell key={index}
                                                        size='medium' padding='none' align="center"
                                                        sx={{
                                                            width: 100, border: 0.1,
                                                            backgroundColor: val.sunday === '0' ? '#ffebee' : '#f1faee',
                                                            fontWeight: 550
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            textTransform: 'capitalize',
                                                            color: val.holiday === 1 || val.sunday === '0' ? '#880e4f' : '#212121'
                                                        }} >
                                                            {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}
                                                        </Box>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            {empArray && empArray.map((row, index) => (
                                                <TableRow hover key={index} >
                                                    <TableCell size='medium' padding='none' align="center" sx={{ width: 200, border: 0.1 }}>
                                                        <Box> {row.em_name}</Box>
                                                    </TableCell>
                                                    <TableCell size='medium' padding='none' align="center" sx={{ width: 100, border: 0.1 }}>
                                                        <Box> {row.em_no}</Box>
                                                    </TableCell>
                                                    {row.arr.map((val, index) => (
                                                        <TableCell key={index} size='medium' padding='none' align="center" sx={{ width: 100, border: 0.1 }}>
                                                            <Box >
                                                                {val.duty_desc}
                                                            </Box>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box> */}
                    </>
                }




            </Box>
        </CustomLayout >
    )
}

export default memo(InchargeHodCompnt) 