import { CssVarsProvider } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { addDays, differenceInDays, getDaysInMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'

const AttendanceDetails = ({ id, no, em_cont_end, grace_period, attendanceDays }) => {

    const dispatch = useDispatch()
    const [arrearSalary, setArrearSalary] = useState(0)
    const [attandFlag, setAttancFlag] = useState(0)

    var date = new Date(em_cont_end);
    var initialDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const firstDay = useMemo(() => initialDay, [initialDay])

    const [attendanceData, setattendanceData] = useState({
        duty_worked: 0,
        total_lop: 0,
        totalLeave: 0,
        total_days: 0
    })
    const { duty_worked, total_lop, totalLeave, total_days } = attendanceData;

    const getdata = useMemo(() => {
        return {
            emp_id: no,
            em_no: id,
            start: moment(firstDay).format('YYYY-MM-DD'),
            end: moment(new Date(em_cont_end)).format('YYYY-MM-DD'),
        }
    }, [firstDay, em_cont_end, no, id])

    useEffect(() => {
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', getdata)
            const { success, message } = result.data
            if (success === 1) {
                const { duty_statuslop, duty_status, noofleaves, gross_salary } = message[0]
                const frmData = {
                    duty_worked: differenceInDays(new Date(em_cont_end), new Date(firstDay)) + 1,
                    total_lop: duty_statuslop,
                    totalLeave: noofleaves,
                    total_days: duty_status
                    //total_days: parseFloat(duty_worked) + parseFloat(duty_statuslop) - parseFloat(duty_statuslop)
                }
                setattendanceData(frmData)
                const daysInMonth = getDaysInMonth(new Date(em_cont_end))
                const arrearsalary = gross_salary * duty_status / daysInMonth
                const salary = Math.round(arrearsalary / 10) * 10
                setArrearSalary(salary)
            }
            else {
                setattendanceData({})
            }

        }
        getattnsdata()
    }, [em_cont_end])

    const ProcessAttendance = async () => {
        const date = new Date()
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        dispatch({
            type: Actiontypes.FETCH_CONT_CLOSE_ATTENDANCE, payload: {
                em_id: no,
                em_no: id,
                attendance_marking_month: moment(startOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
                total_working_days: attendanceDays,
                tot_days_present: duty_worked,
                total_leave: totalLeave,
                total_lop: total_lop,
                total_days: (parseFloat(duty_worked) + parseFloat(totalLeave)),
                attnd_mark_startdate: moment(startOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
                attnd_mark_enddate: moment(new Date(em_cont_end)).format('YYYY-MM-DD'),
                contract_renew_date: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD'),
                // attendance_status: 'C'
            }
        })
        succesNofity("Attandance Data Processed Successfully!!")
        //dispatching arrear data
        dispatch({
            type: Actiontypes.FETCH_CONTRACT_ARREAR, payload: {
                em_id: no,
                em_no: id,
                arrear_amount: arrearSalary,
                arrear_month: moment(new Date(em_cont_end)).format('YYYY-MM-DD')
            }
        })
        setAttancFlag(1)
    }

    return (
        <Fragment>
            <Box sx={{ flex: 1 }}>
                <Paper square variant='outlined' sx={{ display: "flex" }}  >
                    <Box sx={{ flex: 1 }}>
                        <CssVarsProvider>
                            <Typography textColor="neutral.400" startDecorator={<DragIndicatorOutlinedIcon />} level="h6" >
                                Attendance Details
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    {
                        attandFlag === 1 ? <Box sx={{ flex: 0, pt: 0.5, pr: 1.5 }}>
                            <CssVarsProvider>
                                <Typography sx={{ color: 'green' }}>
                                    Done!
                                </Typography>
                            </CssVarsProvider>
                        </Box> : null
                    }
                    {
                        attandFlag === 1 ? <Box sx={{ flex: 0 }} >
                            <Chip
                                icon={
                                    <IconButton className="p-1" >
                                        <LibraryAddCheckOutlinedIcon size={22} />
                                    </IconButton>
                                }
                                label="Process Attendance"
                                clickable={false}
                            />
                        </Box> : <Box sx={{ flex: 0 }} >
                            <Chip
                                icon={
                                    <IconButton className="p-1" >
                                        <LibraryAddCheckOutlinedIcon className="text-info" size={22} />
                                    </IconButton>
                                }
                                label="Process Attendance"
                                onClick={ProcessAttendance}
                                clickable={true}
                            />
                        </Box>
                    }
                </Paper>
                <Paper square elevation={0}
                    sx={{ display: "flex", p: 1, alignItems: "center", flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Days Worked</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{duty_worked === 0 ? duty_worked : 'NOT UPDATED'}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Lop</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{total_lop === 0 ? total_lop : 'NOT UPDATED'}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Leave</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{totalLeave === 0 ? totalLeave : 'NOT UPDATED'}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Days</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{total_days === 0 ? total_days : 'NOT UPDATED'}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(AttendanceDetails) 