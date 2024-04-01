import React, { memo, useMemo, useState } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { ToastContainer } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios';
import { AttendanceViewFun } from './Functions';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const EmployeeCompnt = ({ em_no }) => {

    const empNo = useMemo(() => em_no, [em_no]);
    const [value, setValue] = useState(moment(new Date()));
    const [mainArray, setMainArray] = useState([])

    // get holiday 
    const holiday = useSelector((state) => state.getHolidayList, _.isEqual);
    const holidayList = useMemo(() => holiday, [holiday]);

    const getData = async () => {

        const postdata = {
            em_no: empNo,
            from: moment(startOfMonth(new Date(value))).format('YYYY-MM-DD'),
            to: moment(endOfMonth(new Date(value))).format('YYYY-MM-DD')
        }
        const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
        const { success, data } = result.data
        if (success === 1) {
            let punchData = data;
            AttendanceViewFun(value, punchData, holidayList).then((values) => {
                const array = values.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
                setMainArray(array)
            })
        } else {
            setMainArray([])
            infoNofity("No Punch Details")
        }
    }

    return (
        <CustomLayout title="Attendance View" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
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
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Tooltip title="Process" followCursor placement='top' arrow >
                                <Box sx={{ p: 0.2 }} >
                                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
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
                </Box>
            </Box >
        </CustomLayout >
    )
}

export default memo(EmployeeCompnt) 