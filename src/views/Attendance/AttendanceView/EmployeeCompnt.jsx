import React, { Fragment, memo, useMemo, useState } from 'react'
import { Box, Paper, } from '@mui/material'
import { Button, CssVarsProvider, Input, Sheet, Tooltip, } from '@mui/joy';
import Table from '@mui/joy/Table'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { ToastContainer } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios';
// import { AttendanceViewFun } from './Functions';
//import { useSelector } from 'react-redux';
// import _ from 'underscore';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveDescription from './LeaveDescription';
import { useSelector } from 'react-redux';

const isOdd = (number) => number % 2 !== 0

const EmployeeCompnt = ({ em_no }) => {

    const empNo = useMemo(() => em_no, [em_no]);
    const [value, setValue] = useState(moment(new Date()));
    // const [mainArray, setMainArray] = useState([])

    const [tableArray, settableArray] = useState([])
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])

    // get holiday 
    //const holiday = useSelector((state) => state.getHolidayList, _.isEqual);
    // const holidayList = useMemo(() => holiday, [holiday]);

    const state = useSelector((state) => state?.getCommonSettings)
    const { salary_above } = state;

    const getData = async () => {

        const postdata = {
            em_no: empNo,
            from: moment(startOfMonth(new Date(value))).format('YYYY-MM-DD'),
            to: moment(endOfMonth(new Date(value))).format('YYYY-MM-DD')
        }
        const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
        const { success, data: punchMasteData } = result.data
        if (success === 1) {

            const dateRange = eachDayOfInterval({ start: new Date(startOfMonth(new Date(value))), end: new Date(endOfMonth(new Date(value))) })
                ?.map(e => format(new Date(e), 'yyyy-MM-dd'));

            const resultss = [...new Set(punchMasteData?.map(e => e.em_no))]?.map((el) => {
                const empArray = punchMasteData?.filter(e => e.em_no === el)
                let emName = empArray?.find(e => e.em_no === el).em_name;
                let emNo = empArray?.find(e => e.em_no === el).em_no;
                let emId = empArray?.find(e => e.em_no === el).emp_id;
                let grossSalary = empArray?.find(e => e.em_no === el).gross_salary;
                let unauthorized = empArray?.find(e => e.em_no === el).unauthorized_absent_status;

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
                            manual_request_flag: empArray?.find(em => em.duty_day === e)?.manual_request_flag ?? 0,
                        }
                    }),
                    totalDays: dateRange?.length,
                    totalP: empArray?.filter(el => el.lvereq_desc === "P" || el.lvereq_desc === "OHP" || el.lvereq_desc === "ODP" || el.lvereq_desc === "LC" || el.lvereq_desc === "OBS").length ?? 0,
                    totalWOFF: empArray?.filter(el => el.lvereq_desc === "WOFF").length ?? 0,
                    totalNOFF: empArray?.filter(el => el.lvereq_desc === "NOFF" || el.lvereq_desc === "DOFF").length ?? 0,
                    totalLC: empArray?.filter(el => el.lvereq_desc === "LC").length ?? 0,
                    totalHD: empArray?.filter(el => el.lvereq_desc === "CHD" || el.lvereq_desc === "HD" || el.lvereq_desc === "EGHD"
                        || el.lvereq_desc === 'HDSL' || el.lvereq_desc === 'HDCL').length ?? 0,
                    totalA: empArray?.filter(el => el.lvereq_desc === "A").length ?? 0,
                    totalLV: empArray?.filter(el => el.lvereq_desc === "COFF" || el.lvereq_desc === "CL" || el.lvereq_desc === "EL" || el.lvereq_desc === "SL").length ?? 0,
                    totalHDL: (empArray?.filter(el => el.lvereq_desc === "HCL").length ?? 0) * 1,
                    totaESI: empArray?.filter(el => el.lvereq_desc === "ESI").length ?? 0,
                    totaLWP: empArray?.filter(el => el.lvereq_desc === "LWP").length ?? 0,
                    totaH: empArray?.filter(el => el.lvereq_desc === "H").length ?? 0,
                    totaHP: grossSalary <= salary_above ? (empArray?.filter(el => el.lvereq_desc === "HP").length ?? 0) * 2 : (empArray?.filter(el => el.duty_desc === "HP").length ?? 0),
                    unauthorized: unauthorized
                    // totalCalcDay:
                }
            })
            settableArray(resultss)
            setdaysStr(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.daysAry)
            setdaysNum(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.dateAray)
        } else {
            infoNofity("No Punch Details")
        }
    }


    const getColor = (val) => val === 'A' ? '#ff5630' : val === 'ESI' ? '#ff5630' : val === 'LWP' ? '#ff5630' : val === 'LC' ? '#00b8d9' : val === 'EG' ? '#00b8d9' : val === 'HD' ? '#bf7d19' : '#344767'
    const getFontWeight = (val) => val === 'A' ? 900 : val === 'ESI' ? 900 : val === 'LWP' ? 900 : val === 'EG' ? 800 : val === 'LC' ? 800 : val === 'HD' ? 800 : 700

    const levaeDescription = [
        { lvename: 'A', color: 'danger', desc: "Absent without Permission" },
        { lvename: 'P', color: 'success', desc: "Present" },
        { lvename: 'LWP', color: 'danger', desc: "Approved Leave Without pay" },
        { lvename: 'NJ', color: 'warning', desc: "Not Joined" },
        { lvename: 'RD', color: 'neutral', desc: "Resigned" },
        { lvename: 'ESI', color: 'danger', desc: "ESI Leave" },
        { lvename: 'HD', color: 'danger', desc: "Half day lop" },
        { lvename: 'CHD', color: 'danger', desc: "Calculated Half Day" },
        { lvename: 'EGHD', color: 'danger', desc: "Early Going Half Day" },
        { lvename: 'WOFF', color: 'primary', desc: "Weekly off" },
        { lvename: 'COFF', color: 'primary', desc: "Componsatory off" },
        { lvename: 'NOFF', color: 'primary', desc: "Night Off" },
        { lvename: 'SL', color: 'warning', desc: "Sick Leave" },
        { lvename: 'HSL', color: 'warning', desc: "Half Day Sick Leave" },
        { lvename: 'CL', color: 'warning', desc: "Casual Leave" },
        { lvename: 'HCL', color: 'warning', desc: "Half Day Casual Leave" },
        { lvename: 'EL', color: 'warning', desc: "Earn Leave" },
        { lvename: 'H', color: 'primary', desc: "Holiday" },
        { lvename: 'OHP', color: 'success', desc: "One Hour Request Present" },
        { lvename: 'ODP', color: 'success', desc: "On Duty Present" },
        { lvename: 'MPP', color: 'success', desc: "Miss Punch Request Present" },
        { lvename: 'HP', color: 'success', desc: "Holiday Present" },
        { lvename: 'ML', color: 'danger', desc: "Maternity Leave" },
        { lvename: 'LC', color: 'danger', desc: "Late Coming" },
        { lvename: 'OBS', color: 'neutral', desc: "On Observation" },
        { lvename: 'HDCL', color: 'warning', desc: "Halfday CL Without Punch" },
        { lvename: 'HDSL', color: 'warning', desc: "Halfday SL Without Punch" },
        { lvename: 'DOFF', color: 'primary', desc: "Duty Off" },
    ]

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

                <Paper square variant='elevation' sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start', flexWrap: 'wrap', m: 0.5, p: 0.5, }}  >
                    {
                        levaeDescription?.map((e, idx) => <LeaveDescription lvename={e.lvename} desc={e.desc} key={idx} color={e.color} />)
                    }
                </Paper>
                <Box sx={{ width: "100%" }} >

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
                                    '& tr > *:last-child': {
                                        position: 'sticky',
                                        right: 0,
                                        bgcolor: 'var(--TableCell-headBackground)',
                                    },
                                }}
                            >
                                {/* <Box > */}
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }} >
                                        <th style={{ width: 200, zIndex: 5, backgroundColor: '#f9fafb' }}>Name</th>
                                        <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >ID#</th>
                                        {
                                            daysNum?.map((e, idx) => (
                                                <th key={idx} style={{ zIndex: 1, width: 60, textAlign: 'center', backgroundColor: '#f9fafb', color: '#344767', fontWeight: 800 }} >
                                                    {e}
                                                </th>
                                            ))
                                        }
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                        <th style={{ width: 60, backgroundColor: '#f4f6f8' }} ></th>
                                    </tr>
                                    <tr>
                                        <th style={{ zIndex: 5, backgroundColor: '#b1b9c0' }}> Days </th>
                                        <th style={{ textAlign: "center", zIndex: 1, backgroundColor: '#b1b9c0' }}>  </th>
                                        {
                                            daysStr?.map((e, idx) => (
                                                <th key={idx} style={{ zIndex: 1, textAlign: 'center', width: 60, backgroundColor: '#b1b9c0' }}>
                                                    {e}
                                                </th>
                                            ))
                                        }
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > P</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > HD</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > OFF</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > H</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > HP</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > LV</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > A</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > ESI</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > Calc. Days</th>
                                        <th style={{ textAlign: 'center', backgroundColor: '#f4f6f8', color: '#635bff' }} > Days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableArray && tableArray.map((row, index) => (
                                        <Fragment key={index}>
                                            <tr >
                                                <td rowSpan={3} style={{ zIndex: 4, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 200 }}> {row.emName}</Box>
                                                </td>
                                                <td rowSpan={3} style={{ textAlign: 'center', zIndex: 0, backgroundColor: '#f4f6f8' }} >
                                                    <Box sx={{ width: 60 }}> {row.em_no}</Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                {row.punchMaster.map((val, ind) => (
                                                    <td key={ind}
                                                        style={{
                                                            zIndex: 0,
                                                            textAlign: 'center',
                                                            width: 60,
                                                            borderLeft: '0.1px solid #dddfe2',
                                                            height: 10,
                                                            backgroundColor: val.manual_request_flag === 1 ? '#E5D9F2' : row.unauthorized === 1 ? '#FF8B8B' : '#f4f6f8'
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            color: getColor(val.duty_desc),
                                                            fontWeight: getFontWeight(val.duty_desc)
                                                        }}>
                                                            {val.duty_desc}
                                                        </Box>
                                                    </td>
                                                ))}
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: 'lightgray' }}></td>
                                            </tr>
                                            <tr>
                                                {row.punchMaster.map((val, ind) => (

                                                    <td key={ind}
                                                        style={{
                                                            zIndex: 0,
                                                            textAlign: 'center',
                                                            width: 60,
                                                            borderLeft: '0.1px solid #dddfe2',
                                                            height: 10,
                                                            backgroundColor: val.manual_request_flag === 1 ? '#E5D9F2' : row.unauthorized === 1 ? '#FF8B8B' : '#CDF8DF'

                                                        }}
                                                    >
                                                        <Box sx={{
                                                            color: getColor(val.duty_desc),
                                                            fontWeight: getFontWeight(val.duty_desc),
                                                        }}>

                                                            {val.lvereq_desc}
                                                        </Box>
                                                    </td>
                                                ))}
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalP}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalHD}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalWOFF + row.totalNOFF}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totaH}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totaHP}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalLV}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totaLWP + row.totalA}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totaESI}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalP + row.totalWOFF + row.totalNOFF + row.totalLV + (row.totalHD * 0.5) + row.totaHP + row.totaH}</td>
                                                <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 900, backgroundColor: isOdd(index) ? '#f4f6f8' : '#f4f6f8' }}>{row.totalDays}</td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                                {/* </Box> */}
                            </Table>
                        </Sheet>
                    </Box>

                </Box>
            </Box >
        </CustomLayout >
    )
}

export default memo(EmployeeCompnt) 