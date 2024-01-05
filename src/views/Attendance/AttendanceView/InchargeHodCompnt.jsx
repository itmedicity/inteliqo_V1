import { Button, CssVarsProvider, Input } from '@mui/joy';
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
import { DeptWiseAttendanceViewFun } from './Functions';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const InchargeHodCompnt = ({ em_id, em_department }) => {

    const empid = useMemo(() => em_id, [em_id])
    const [value, setValue] = useState(moment(new Date()));
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
                            return {
                                ...val,
                                "arr": arr
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
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row' }} >
                        <DeptSectionSelect em_id={empid} value={deptSection} setValue={setDeptSection} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                color: '#90caf9'
                            }} >
                                <PublishedWithChangesIcon />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} ></Box>
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
                            }}>
                            <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
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
                                </TableHead>
                                <TableBody>
                                    {empArray && empArray.map((row, index) => (
                                        <TableRow key={index} >
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
            </Box>
        </CustomLayout >
    )
}

export default memo(InchargeHodCompnt) 