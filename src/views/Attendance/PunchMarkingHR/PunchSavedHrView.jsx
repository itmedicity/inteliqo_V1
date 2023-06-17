import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { infoNofity, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from "src/views/Axios/Axios";
import { useDispatch, useSelector } from 'react-redux'
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import _ from 'underscore'

const PunchSavedHrView = ({ dept, value, section }) => {

    const [final, setFinal] = useState([])
    const fromdate = format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
    const todate = format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd')
    const reduxDispatch = useDispatch()
    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
    }, [reduxDispatch])

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);
    const commonSettings = useMemo(() => commonState, [commonState]);

    useEffect(() => {
        const getDetail = async () => {
            const getEmpData = {
                em_department: dept,
                em_dept_section: section,
            }

            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa } = result1.data
            if (succes === 1) {
                const arr = dataa && dataa.map((val, index) => {
                    return val.em_no
                })
                // setEmpdata(dataa);
                const postdata = {
                    em_no: arr,
                    from: fromdate,
                    to: todate
                }
                const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = dataa?.map((val) => {
                        const empwise = data.filter((value) => {
                            return value.em_no === val.em_no ? 1 : 0
                        })
                        const total = empwise.length
                        const actual = (empwise.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP' || val.duty_desc === 'HFD' || val.duty_desc === 'EG' || val.duty_desc === 'LC')).length
                        const calculated = (empwise.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP')).length
                        const offdays = (empwise.filter(val => val.duty_desc === 'OFF')).length
                        const leaves = (empwise.filter(val => val.leave_status === 1)).length
                        const holidayworked = (empwise.filter(val => val.duty_desc === 'HP')).length
                        const lossofpay = (empwise.filter(val => val.leave_status === 0 && val.duty_status === 0)).length
                        const holiday = (empwise.filter(val => val.holiday_status === 1)).length
                        const calculatedlop = (empwise.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length
                        const lwp = (empwise.filter(val => val.duty_desc === 'A' && val.leave_status === 1)).length
                        const total_pay_day = val.gross_salary < commonSettings.salary_above ? calculated + offdays + holiday + holidayworked + leaves - lwp - lossofpay :
                            calculated + offdays + holiday + leaves - lwp - lossofpay

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
                            paydays: total_pay_day
                        }
                        return obj
                    })
                    setFinal(finalDataArry)
                }
                else {
                    infoNofity("No Punch Details")
                }
            }
        }
        getDetail()
    }, [])

    return (
        <Fragment>
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', width: '100%' }}>
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
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Name
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                ID #
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Total Days
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Actual Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Calculated
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                OFF Days
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Leaves
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Leave W/O Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Loss Of Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Calculated LOP
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 30, maxHeight: 30, p: 0.2 }}>
                                                Holiday
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Holiday Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
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
        </Fragment>
    )
}

export default memo(PunchSavedHrView)