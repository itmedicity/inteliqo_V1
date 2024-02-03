import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import React, { useEffect, useMemo, useState, memo, useCallback } from 'react'
import _ from 'underscore'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import AttendanceMainCard from './AttendanceMainCard'
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from "src/views/Axios/Axios";
import { useDispatch, useSelector } from 'react-redux'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import CustomInnerHeigtComponent from 'src/views/Component/MuiCustomComponent/CustomInnerHeigtComponent'
import { useHistory } from 'react-router-dom'
import { Exportfile } from '../AttendanceUpdation/ExportToExcel';

const AttendanceGenerateAuto = () => {

    const history = useHistory();

    const toRedirectToHome = () => {
        history.push(`/Home`)
    }

    const [fromdate, setfromdate] = useState('')
    const [todate, setTodate] = useState('')
    const [dept, setdept] = useState(0)
    const [deptSec, setDeptsec] = useState(0)
    const [empData, setEmpdata] = useState([])
    const [final, setFinal] = useState([])

    const reduxDispatch = useDispatch()
    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
    }, [reduxDispatch])

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);
    const commonSettings = useMemo(() => commonState, [commonState]);

    const getData = async () => {
        if (dept !== 0 && deptSec !== 0) {
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSec,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa } = result1.data
            if (succes === 1) {
                const arr = dataa && dataa.map((val, index) => {
                    return val.em_id
                })
                // setEmpdata(dataa);
                const postdata = {
                    emp_id: arr,
                    from: fromdate,
                    to: todate
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = dataa?.map((val) => {
                        const empwise = data.filter((value) => {
                            return value.emp_id === val.em_id ? 1 : 0
                        })
                        const total = empwise.length
                        const actual = (empwise.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HFD' || val.duty_desc === 'EHFD' || val.duty_desc === 'LC')).length
                        const calculated = (empwise.filter(val => val.duty_desc === 'P')).length
                        const offdays = (empwise.filter(val => val.duty_desc === 'OFF' || val.duty_desc === 'NOFF')).length
                        const leaves = (empwise.filter(val => val.leave_status === 1 || val.duty_desc === 'LV' || val.duty_desc === 'HDL' || val.duty_desc === 'ESI')).length
                        const holidayworked = (empwise.filter(val => val.duty_desc === 'HP')).length
                        const lossofpay = (empwise.filter(val => val.leave_status === null && val.duty_status === 0)).length
                        const holiday = (empwise.filter(val => val.holiday_status === 1)).length
                        const calculatedlop = (empwise.filter(val => val.duty_desc === 'A' && val.leave_status === null)).length
                        const lwp = (empwise.filter(val => val.leave_status === 1 && val.duty_desc === 'LWP')).length
                        const nofhfd = (empwise.filter(val => val.duty_desc === 'HFD' || val.duty_desc === 'EHFD')).length
                        const LCcount = (empwise.filter(val => val.duty_desc === 'LC')).length

                        const total_pay_day = val.gross_salary < commonSettings.salary_above ? calculated + offdays + holiday + holidayworked + leaves + (nofhfd / 2) - lwp - lossofpay :
                            calculated + offdays + holiday + leaves + (nofhfd / 2) - lwp - lossofpay

                        const totalday = commonSettings?.max_late_day_count > 3 ? total_pay_day + 3 + ((LCcount - commonSettings?.max_late_day_count) / 2) : total_pay_day + LCcount

                        const obj = {
                            em_id: val.em_id,
                            em_no: val.em_no,
                            em_name: val.em_name,
                            total: total,
                            actual: actual,
                            lossofpay: lossofpay,
                            lwp: lwp,
                            leaves: leaves,
                            holidayworked: holidayworked,
                            holiday: holiday,
                            offdays: offdays,
                            calculated: calculated,
                            calculatedlop: calculatedlop,
                            paydays: totalday,
                            nofhfd: nofhfd
                        }
                        return obj
                    })

                    setFinal(finalDataArry)
                }
                else {
                    infoNofity("No Punch Details")
                }
            }
            else {
                infoNofity("No employee Under given Condition")
            }
        } else {
            infoNofity("Please Select All the options")
        }
    }

    const saveData = async () => {
        const array1 = final && final.map((val, index) => {
            const obje = {
                em_no: val.em_no,
                em_id: val.em_id,
                dept_id: dept,
                sect_id: deptSec,
                attendance_marking_month: fromdate,
                attnd_mark_startdate: fromdate,
                attnd_mark_enddate: todate,
                total_working_days: val.total,
                tot_days_present: val.actual,
                calculated_worked: val.calculated,
                off_days: val.offdays,
                total_leave: val.leaves,
                total_lwp: val.lwp,
                total_lop: val.lossofpay,
                calculated_lop: val.calculatedlop,
                total_days: val.paydays,
                total_holidays: val.holiday,
                holiday_worked: val.holidayworked,
                process_status: 1
            }
            return obje
        })
        const checkData = {
            dept_id: dept,
            sect_id: deptSec,
            attendance_marking_month: fromdate
        }
        const dutyLock = final && final.map((val, index) => {
            const obje = {
                em_no: val.em_no,
                from: fromdate,
                to: todate
            }
            return obje
        })
        if (dept === 0 || deptSec === 0) {
            warningNofity("Please Select Department || Department Section")
        } else {
            const result = await axioslogin.post("/payrollprocess/check/dateexist", checkData)
            const { success } = result.data
            if (success === 1) {
                infoNofity("Attendance is already processed for this month!")
            } else {
                const result = await axioslogin.post("/payrollprocess/create/manual", array1)
                const { success, message } = result.data
                if (success === 1) {
                    const result1 = await axioslogin.patch("/payrollprocess/dutyPlanLock", dutyLock)
                    const { success } = result1.data
                    if (success === 1) {
                        succesNofity("Attendance Marking Done")
                    }
                    else {
                        errorNofity("Error occure in duty plan lock")
                    }

                } else {
                    errorNofity(message)
                }
            }
        }
    }


    const downloadFormat = useCallback(() => {
        const fileName = "attendance"
        if (final.length === 0) {
            warningNofity("please Select Department Department Section");
        } else {
            const array = final.map((val) => {
                return {
                    "EmpID": val.em_no,
                    "Name": val.em_name,
                    "Total Days": val.total,
                    "Actual Worked": val.actual,
                    "Calculated Worked": val.calculated,
                    "OFF Days": val.offdays,
                    "Leaves": val.leaves,
                    "Leave Without Pay": val.lwp,
                    "Loss Of Pay": val.lossofpay,
                    "Calculated LOP ": val.calculatedlop,
                    "Holiday": val.holiday,
                    "Holiday Worked": val.holidayworked,
                    "Total Pay Day": val.paydays
                }
            })
            Exportfile(array, fileName)
        }

    }, [final])

    return (

        <CustomInnerHeigtComponent title="Attendance Marking - Automatic" toClose={toRedirectToHome}>
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', width: '100%' }}>
                <AttendanceMainCard setfromdate={setfromdate} setTodate={setTodate}
                    setdept={setdept}
                    setDeptsec={setDeptsec}
                    getData={getData}
                    saveData={saveData}
                    setEmpdata={setEmpdata} empData={empData}
                    downloadFormat={downloadFormat}
                />
                <Paper square variant='outlined' elevation={0} sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Attendance Details
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                    {/* employee Name Section */}
                    <Box sx={{ width: '100%' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Name
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                ID #
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Total Days
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Actual Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Calculated Worked (P)
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                OFF Days (WOFF/NOFF)
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Leaves
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Leave Without Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Loss Of Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Calculated LOP
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Holiday
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Holiday Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                No of Half day
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 50, maxHeight: 50, p: 0.2 }}>
                                                Total Pay Day
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {final.map((val, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 200, border: 0.1, borderColor: '#E1E6E1' }} >
                                                {/* component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 100, border: 0.1, borderColor: '#E1E6E1' }} */}
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 200, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.em_name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.em_no}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.total}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.actual}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.calculated}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.offdays}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.leaves}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.lwp}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.lossofpay}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.calculatedlop}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.holiday}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.holidayworked}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.nofhfd}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" align="center" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1', }}>
                                                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {val.paydays < 0 ? 0 : val.paydays}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Box>
        </CustomInnerHeigtComponent>
    )
}

export default memo(AttendanceGenerateAuto)