import { Box, Button, Card, CardActions, CardContent, } from '@mui/joy'
import { differenceInDays, endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

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
    const { No_of_days = 0, total_lop = 0, totalLeave = 0, total_days_worked = 0 } = attendanceData;

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
                sx={{ width: '100%', resize: 'horizontal', ml: 0.5 }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography startDecorator={<AccountTreeOutlinedIcon />} level="title-md">Attendance Process</Typography>
                </Box>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }} >
                        <Typography level="title-md"  >Total Days :</Typography>
                        <Typography level="title-md" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{No_of_days === 0 ? 0 : No_of_days}</Typography>
                        <Typography level="title-md"  >Total Lop :</Typography>
                        <Typography level="title-md" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{total_lop === 0 ? 0 : total_lop}</Typography>

                        <Typography level="title-md"  >Total Leave :</Typography>
                        <Typography level="title-md" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{totalLeave === 0 ? 0 : totalLeave}</Typography>
                        <Typography level="title-md"  >No of days Worked :</Typography>
                        <Typography level="title-md" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{total_days_worked === 0 ? 0 : total_days_worked}</Typography>
                    </Box>

                </CardContent>
                <CardActions >

                    {
                        attandFlag === 1 ?
                            <Button variant="outlined" color="neutral">
                                Attendance Processed
                            </Button> :
                            <Button variant="solid" fullWidth color="primary" onClick={ProcessAttendance} >
                                Process The Attendance
                            </Button>
                    }
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default memo(AttendanceDetails) 