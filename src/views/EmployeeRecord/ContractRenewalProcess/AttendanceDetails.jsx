import { Box, Card, CardContent, Chip, CssVarsProvider, IconButton } from '@mui/joy'
import { differenceInDays, endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import AttributionIcon from '@mui/icons-material/Attribution';

const AttendanceDetails = ({ id, no, em_cont_end }) => {

    const dispatch = useDispatch()
    const [arrearSalary, setArrearSalary] = useState(0)
    const [attandFlag, setAttancFlag] = useState(0)

    const [attendanceData, setattendanceData] = useState({
        No_of_days: 0,
        total_lop: 0,
        totalLeave: 0,
        total_days_worked: 0
    })
    const { No_of_days, total_lop, totalLeave, total_days_worked } = attendanceData;

    const getdata = useMemo(() => {
        return {
            emp_id: no,
            em_no: id,
            start: moment(startOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
            end: moment(endOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
        }
    }, [em_cont_end, no, id])

    useEffect(() => {
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', getdata)
            const { success, message } = result.data
            if (success === 1) {
                const { duty_statuslop, duty_status, noofleaves, gross_salary } = message[0]
                const frmData = {
                    No_of_days: differenceInDays(new Date(endOfMonth(new Date(em_cont_end))), new Date(startOfMonth(new Date(em_cont_end)))) + 1,
                    total_lop: duty_statuslop,
                    totalLeave: noofleaves,
                    total_days_worked: duty_status
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
        getattnsdata(getdata)
    }, [em_cont_end, getdata])

    const ProcessAttendance = useCallback(() => {
        setAttancFlag(1)
        dispatch({
            type: Actiontypes.FETCH_CONT_CLOSE_ATTENDANCE, payload: {
                em_id: no,
                em_no: id,
                attendance_marking_month: moment(startOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
                total_working_days: No_of_days,
                tot_days_present: total_days_worked,
                total_leave: totalLeave,
                total_lop: total_lop,
                total_days: No_of_days,
                attnd_mark_startdate: moment(startOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
                attnd_mark_enddate: moment(endOfMonth(new Date(em_cont_end))).format('YYYY-MM-DD'),
                contract_renew_date: moment(new Date(em_cont_end)).format('YYYY-MM-DD'),
            }
        })
        succesNofity("Attandance Data Processed Successfully!!")
        dispatch({
            type: Actiontypes.FETCH_CONTRACT_ARREAR, payload: {
                em_id: no,
                em_no: id,
                arrear_amount: arrearSalary,
                arrear_month: moment(new Date(em_cont_end)).format('YYYY-MM-DD')
            }
        })

    }, [dispatch, No_of_days, total_days_worked, totalLeave, total_lop, em_cont_end, arrearSalary,
        no, id])

    return (
        <Fragment>
            <Card
                variant="outlined"
                color="neutral"
                orientation="vertical"
                size="sm"
                sx={{ m: 0.5 }}
            >

                {/* 
                <Card
                    variant="outlined"
                    sx={{
                        width: '100%',
                        // overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar src="" size="lg" />
                        <Typography level="body1">{em_no}</Typography>
                    </Box>
                    <CardContent>
                        <Typography level="title-lg">{em_name}</Typography>
                        <Typography level="body-sm">
                            We are a community of developers prepping for coding interviews,
                            participate, chat with others and get better at interviewing.
                        </Typography>
                    </CardContent>
                    <CardActions buttonFlex="0 1 120px">
                        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                            <FavoriteBorder />
                        </IconButton>
                        <Button variant="outlined" color="neutral">
                            View
                        </Button>
                        <Button variant="solid" color="primary">
                            Join
                        </Button>
                    </CardActions>
                </Card> */}

                {/* <Box sx={{ display: "flex", width: "100%" }} >
                    <Chip
                        color="danger"
                        size="md"
                        variant="outlined"
                        startDecorator={<AttributionIcon fontSize='small' color='success' />}
                    >
                        <Typography color="neutral" level="title-md" >Attendance Details</Typography>
                    </Chip>
                </Box> */}

                {/* <Box sx={{ display: "flex", width: "100%" }} >
                    <IconButton
                        // aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'initial', top: '0.875rem', right: '0.5rem' }}
                    >
                        <AttributionIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", width: "100%", mt: 0.5 }} >
                        <Typography level="title-lg">Attendance Details</Typography>
                    </Box>
                </Box> */}
                <CardContent orientation="horizontal">

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Days</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">: {No_of_days === 0 ? 0 : No_of_days}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Lop</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">: {total_lop === 0 ? 0 : total_lop}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">Total Leave</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">: {totalLeave === 0 ? 0 : totalLeave}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                            <CssVarsProvider>
                                <Typography level="body1">No of days Worked</Typography>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Typography level="body1">:{total_days_worked === 0 ? 0 : total_days_worked}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    {
                        attandFlag === 1 ?
                            <Chip
                                color="danger"
                                // onClick={ProcessAttendance}
                                size="md"
                                variant="outlined"

                            >Attendance Processed
                            </Chip>
                            : <Chip
                                color="success"
                                onClick={ProcessAttendance}
                                size="md"
                                variant="outlined"

                            >Process Attendance
                            </Chip>
                    }
                </Box>
            </Card>
        </Fragment>
    )
}

export default memo(AttendanceDetails) 