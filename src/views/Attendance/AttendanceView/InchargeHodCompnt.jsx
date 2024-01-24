import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
                                        EG
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
                        </Paper>
                        <Box sx={{ width: "100%" }} >
                            <Paper square elevation={0} sx={{
                                display: "flex",
                                p: 1,
                                alignItems: "center",
                            }}  >
                            </Paper>
                            <Box component={Grid}
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
                            </Box>
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
                                        EG
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
                        </Paper>
                        <Box sx={{ width: "100%" }} >
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
                        </Box>
                    </>
                }




            </Box>
        </CustomLayout >
    )
}

export default memo(InchargeHodCompnt) 