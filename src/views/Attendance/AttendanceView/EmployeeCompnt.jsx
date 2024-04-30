import React, { Fragment, memo, useMemo, useState } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { ToastContainer } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios';
import { AttendanceViewFun } from './Functions';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveDescription from './LeaveDescription';

const EmployeeCompnt = ({ em_no }) => {

    const empNo = useMemo(() => em_no, [em_no]);
    const [value, setValue] = useState(moment(new Date()));
    const [mainArray, setMainArray] = useState([])

    const [tableArray, settableArray] = useState([])
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])

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
        // const { success, data } = result.data
        // if (success === 1) {
        //     let punchData = data;
        //     AttendanceViewFun(value, punchData, holidayList).then((values) => {
        //         const array = values.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
        //         setMainArray(array)
        //     })
        // } else {
        //     setMainArray([])
        //     infoNofity("No Punch Details")
        // }
        const { success, data: punchMasteData } = result.data
        if (success === 1) {

            const dateRange = eachDayOfInterval({ start: new Date(startOfMonth(new Date(value))), end: new Date(endOfMonth(new Date(value))) })
                ?.map(e => format(new Date(e), 'yyyy-MM-dd'));

            // console.log(dateRange)
            // console.log(punchMasteData)

            const resultss = [...new Set(punchMasteData?.map(e => e.em_no))]?.map((el) => {
                const empArray = punchMasteData?.filter(e => e.em_no === el)
                let emName = empArray?.find(e => e.em_no === el).em_name;
                let emNo = empArray?.find(e => e.em_no === el).em_no;
                let emId = empArray?.find(e => e.em_no === el).emp_id;

                // console.log(dateRange)
                // console.log(empArray)
                return {
                    em_no: el,
                    emName: emName,
                    dateAray: dateRange?.map(e => format(new Date(e), 'dd')),
                    daysAry: dateRange?.map(e => format(new Date(e), 'eee')),
                    punchMaster: dateRange?.map((e) => {
                        // console.log(e)
                        return {
                            attDate: e,
                            duty_date: empArray?.find(em => em.duty_day === e)?.duty_date ?? e,
                            duty_status: empArray?.find(em => em.duty_day === e)?.duty_status ?? 0,
                            em_name: empArray?.find(em => em.duty_day === e)?.em_name ?? emName,
                            em_no: empArray?.find(em => em.duty_day === e)?.em_no ?? emNo,
                            emp_id: empArray?.find(em => em.duty_day === e)?.emp_id ?? emId,
                            hld_desc: empArray?.find(em => em.duty_day === e)?.hld_desc ?? null,
                            holiday_slno: empArray?.find(em => em.duty_day === e)?.holiday_slno ?? 0,
                            holiday_status: empArray?.find(em => em.duty_day === e)?.holiday_status ?? 0,
                            leave_status: empArray?.find(em => em.duty_day === e)?.leave_status ?? 0,
                            duty_desc: empArray?.find(em => em.duty_day === e)?.duty_desc ?? 'A',
                            lvereq_desc: empArray?.find(em => em.duty_day === e)?.lvereq_desc ?? 'A',
                        }
                    }),
                    totalDays: dateRange?.length,
                    totalP: empArray?.filter(el => el.lvereq_desc === "P").length ?? 0,
                    totalWOFF: empArray?.filter(el => el.lvereq_desc === "WOFF").length ?? 0,
                    totalNOFF: empArray?.filter(el => el.lvereq_desc === "NOFF").length ?? 0,
                    totalLC: empArray?.filter(el => el.duty_desc === "LC").length ?? 0,
                    totalHD: empArray?.filter(el => el.lvereq_desc === "HD").length ?? 0,
                    totalA: empArray?.filter(el => el.lvereq_desc === "A").length ?? 0,
                    totalLV: empArray?.filter(el => el.lvereq_desc === "LV").length ?? 0,
                    totalHDL: (empArray?.filter(el => el.lvereq_desc === "HDL").length ?? 0) * 1,
                    totaESI: empArray?.filter(el => el.lvereq_desc === "ESI").length ?? 0,
                    totaLWP: empArray?.filter(el => el.lvereq_desc === "LWP").length ?? 0,
                    totaH: empArray?.filter(el => el.lvereq_desc === "H").length ?? 0,
                    totaHP: (empArray?.filter(el => el.lvereq_desc === "HP").length ?? 0) * 2,
                }
            })
            settableArray(resultss[0].punchMaster)
            setdaysStr(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.daysAry)
            setdaysNum(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.dateAray)
        } else {
            infoNofity("No Punch Details")
        }
    }


    console.log(tableArray)
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

                <Paper square variant='elevation' sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start', flexWrap: 'wrap', m: 0.5, p: 0.5, }}   >
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
                                        {daysNum && daysNum.map((val, index) => (
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
                                                    {val}
                                                </Box>
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{
                                            p: 0,
                                            width: 100,
                                            border: 0.1,
                                            borderColor: '#E1E6E1',
                                            position: 'sticky'
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                rtrt
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{
                                            p: 0,
                                            width: 100,
                                            border: 0.1,
                                            borderColor: '#E1E6E1',
                                            position: 'sticky'
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                rtrt
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {daysStr && daysStr.map((val, index) => (
                                            <TableCell key={index} sx={{
                                                p: 0,
                                                width: 100,
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
                                                    }}
                                                >
                                                    {val}
                                                </Box>
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{
                                            p: 0,
                                            width: 100,
                                            border: 0.1,
                                            borderColor: '#E1E6E1',
                                            position: 'sticky'
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                rtrt
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{
                                            p: 0,
                                            width: 100,
                                            border: 0.1,
                                            borderColor: '#E1E6E1',
                                            position: 'sticky'
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                rtrt
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        selected={true}
                                        hover={true}
                                    >
                                        {tableArray?.map((row, index) => (
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
                                        <TableCell sx={{ position: 'sticky' }} ></TableCell>
                                        <TableCell sx={{ position: 'sticky' }}></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        selected={true}
                                        hover={true}
                                    >
                                        {tableArray?.map((row, index) => (
                                            <TableCell key={index} sx={{ p: 0, width: 100, }}>
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{
                                                        minHeight: 25, maxHeight: 25,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {row.lvereq_desc}
                                                </Box>
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{ position: 'sticky' }} ></TableCell>
                                        <TableCell sx={{ position: 'sticky' }} ></TableCell>
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