import React, { memo, useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { Suspense } from 'react';
import { lazy } from 'react';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
const TableRows = lazy(() => import('./TableRows'))

const EmployeePunchReport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setDepartment());
        dispatch(setCommonSetting())
    }, [dispatch])
  const [value, setValue] = useState(moment(new Date()));
  const [tableArray, setTableArray] = useState([]);
  const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
  const { hod, incharge, em_id, em_no, em_department } = empData;
  const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
  const commonSetting = useMemo(() => state, [state])

  const { group_slno, cmmn_early_out, cmmn_grace_period, cmmn_late_in, salary_above,
      week_off_day, notapplicable_shift, default_shift, noff } = commonSetting;
  console.log(em_id);

const getData=async()=>{
  const postdata = {
    em_no: em_no,
    from: moment(startOfMonth(new Date(value))).format('YYYY-MM-DD'),
    to: moment(endOfMonth(new Date(value))).format('YYYY-MM-DD')
}
const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
const { success ,data} = result.data
if (success === 1) {
    setTableArray(data);
} else {
    setTableArray([])
  infoNofity("No Punch Details")
}
}
  return (
    <CustomLayout title="Attendance Report" displayClose={true} >
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
                                   // maxDate={addMonths(new Date(), 1)}
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
                <Box sx={{ flex: 1, pt: 0.5 }} >
                        <TableContainer component={Paper}>
                            <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                                <TableHead>
                                    <TableRow sx={{ color: '#003A75' }} hover >
                                        {/* <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }} >#</TableCell> */}
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }} >Date</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Emp No</TableCell>
                                        <TableCell size='small' padding='none' align="center" colSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Shift Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" colSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Punch Data</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>Hrs Worked</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>L-IN(min)</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}>E-GO(min)</TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                        <TableCell size='small' padding='none' align="center" rowSpan={2} sx={{ color: '#003A75', fontWeight: 550 }}></TableCell>
                                    </TableRow>
                                    <TableRow hover >
                                        {/* <TableCell>Date</TableCell> */}
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>In Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>Out Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>In Time</TableCell>
                                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }}>Out Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Suspense>
                                        {
                                            tableArray?.map((val, ind) => {
                                                return <TableRows key={ind} data={val} />
                                            })
                                        }
                                    </Suspense>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
        </Box>
      </CustomLayout>
  )
}

export default memo( EmployeePunchReport)