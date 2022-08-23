import { CssVarsProvider } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { addDays, differenceInDays, getDaysInMonth } from 'date-fns';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'

const AttendanceDetails = ({ id, no, em_cont_end, grace_period, attendanceDays }) => {
    const [arrearSalary, setArrearSalary] = useState(0)
    //useEffect for getting leave Details
    var date = new Date(em_cont_end);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const data = {
        emp_id: no,
        em_no: id,
        start: moment(firstDay).format('YYYY-MM-DD'),
        end: moment(new Date(em_cont_end)).format('YYYY-MM-DD'),
    }
    const [attendanceData, setattendanceData] = useState({
        duty_worked: 0,
        total_lop: 0,
        totalLeave: 0,
        total_days: 0
    })
    const { duty_worked, total_lop, totalLeave, total_days } = attendanceData
    useEffect(() => {
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', data)
            const { success, message } = result.data
            if (success === 1) {
                const { duty_statuslop, duty_worked, leave_type } = message[0]
                const frmData = {
                    duty_worked: differenceInDays(new Date(em_cont_end), new Date(firstDay)) + 1,
                    total_lop: duty_statuslop,
                    totalLeave: leave_type,
                    total_days: parseFloat(duty_worked) + parseFloat(leave_type) - parseFloat(duty_statuslop)
                }
                setattendanceData(frmData)
            }
            else if (success === 0) {

            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getattnsdata()
    }, [em_cont_end])
    //getting attendance of the grace period
    useEffect(() => {
        const dataarrear = {
            emp_id: no,
            em_no: id,
            start: moment(em_cont_end).format('YYYY-MM-DD'),
            end: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD'),
        }
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', dataarrear)
            const { success, message } = result.data
            if (success === 1) {
                const { duty_worked, leave_type, gross_salary, duty_statuslop } = message[0]
                const totaldays = parseFloat(duty_worked) + parseFloat(leave_type) - parseFloat(duty_statuslop)
                const daysinamonth = getDaysInMonth(new Date(em_cont_end))
                const arrearsalary = parseFloat(gross_salary) * parseFloat(totaldays) / daysinamonth
                setArrearSalary(arrearsalary)
            }
            else if (success === 0) {
                setArrearSalary(0)
            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getattnsdata()
    }, [em_cont_end, grace_period])
    //function for process attendance
    const dispatch = useDispatch()
    const ProcessAttendance = async () => {
        const date = new Date()
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        dispatch({
            type: Actiontypes.FETCH_CONT_CLOSE_ATTENDANCE, payload: {
                em_id: no,
                em_no: id,
                attendance_marking_month: moment(new Date(em_cont_end)).format('MMM-YYYY'),
                total_working_days: attendanceDays,
                tot_days_present: duty_worked,
                total_leave: totalLeave,
                total_lop: total_lop,
                total_days: (parseFloat(duty_worked) + parseFloat(totalLeave)),
                attnd_mark_startdate: moment(firstDay).format('YYYY-MM-DD'),
                attnd_mark_enddate: moment(new Date(em_cont_end)).format('YYYY-MM-DD'),
                contract_renew_date: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD')
            }
        })
        //dispatching arrear data
        dispatch({
            type: Actiontypes.FETCH_CONTRACT_ARREAR, payload: {
                em_id: no,
                em_no: id,
                arrear_amount: arrearSalary,
                arrear_month: moment(new Date(em_cont_end)).format('MMM-YYYY')
            }
        })
    }

    return (
        <Fragment>
            <Box sx={{ flex: 1 }}>
                <Paper square elevation={0} sx={{
                    display: "flex",
                    p: 1,

                }}  >
                    <Box sx={{ flex: 1 }}>
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                Attendance Details
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 0 }} >
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
                </Paper>

                <Paper square elevation={3} sx={{
                    display: "flex",
                    p: 1,
                    alignItems: "center",
                    flexDirection: 'column'
                }}>


                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Days Worked</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{duty_worked}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Lop</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{total_lop}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Leave</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{totalLeave}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Days</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">{total_days}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                </Paper>
            </Box>

        </Fragment>
    )
}

export default AttendanceDetails