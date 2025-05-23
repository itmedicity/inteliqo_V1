import moment from 'moment/moment';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeptEmployeeNameDesList, MonthWiseDeptSchedules, TrainerNames, TrainingTopics } from 'src/redux/actions/Training.Action';
import { setDepartment } from 'src/redux/actions/Department.action';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { DeptRedux } from '../InductRedux';
import ViewScheduledModal from '../DeptTrainingCalendar/ViewScheduledModal';
import { Box } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/joy/Typography';
import { axioslogin } from 'src/views/Axios/Axios';
import ScheduleEmployees from './ScheduleEmployees';

const HodInchargCalendarView = () => {

    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department, em_dept_section } = employeeProfileDetl;

    const dispatch = useDispatch()

    const [count, SetCount] = useState(0)
    const [year, setYear] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [open, SetOpen] = useState(false)
    const [datefrmt, SetDatefrmt] = useState(new Date());
    const [View, SetView] = useState(false)
    const [modalData, SetmodalData] = useState([])
    const [Scheduledata, setScheduledata] = useState([]);
    const [topic, setTopic] = useState(0);

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(TrainingTopics());
        dispatch(TrainerNames());
        dispatch(DeptEmployeeNameDesList(em_department))
    }, [dispatch, count, em_department])

    const EmpDetails = useSelector((state) => state?.gettrainingData?.deptEmpNameDesDetails?.deptEmpNameDesDetailsList,);

    useEffect(() => {
        const obj = {
            month: format(currentMonth, "MM"),
            year: format(currentMonth, 'yyyy'),
            dept: em_department,
            deptSec: em_dept_section
        }
        dispatch(MonthWiseDeptSchedules(obj))
        SetCount(0)
    }, [dispatch, currentMonth, count, em_department, em_dept_section])

    const DepDatas = useSelector((state) => DeptRedux(state));
    const CalenderData = useMemo(() => DepDatas, [DepDatas]);
    const { TrainingData } = CalenderData;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const getTotalDaysInMonth = useCallback((date) => {
        //to get yeat and month, and current month +1
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }, [])

    const getDatesArray = useCallback((date) => {
        //get full dates in a month eg:31
        const totalDays = getTotalDaysInMonth(date);
        const datesArray = Array(totalDays).fill();
        //create dates array eg:A[1,2,3...end]
        const datesOfMonth = datesArray.map((_, index) => index + 1);
        return datesOfMonth;
    }, [getTotalDaysInMonth])

    //To get day details eg:Wed May 01 2024 00:00:00 GMT+0530
    const dateRange = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
    //get day index and day name from the month(index starts with 0 to 6)
    const dateAndDayFormat = dateRange?.map((val) => {

        return { dayNo: moment(val).format('d'), days: moment(val).format('ddd') }
    });
    const generateCalendarLayout = useCallback((dates, startDayIndex, TrainingData) => {
        // dates -> Day count array in a month [1,2,3,...,29,30,31]
        // startDayIndex -> Month starting day count based on days 
        // TrainingData -> Assigned Training Datas from database

        const layout = [];
        const currentWeek = Array.from({ length: startDayIndex - 1 }, () => null);
        dates?.map(date => {
            /***+
             * push date in the `currentWeek` array ie :- currentWeek => [null,null]
             * date -> 1,2,3,4,...,30,31
             * currentWeek[currentWeek.length] = date
             * result -> [null,null,1,2,3,...]
             */

            currentWeek[currentWeek.length] = date;
            if (currentWeek.length === 7) {
                const mappArr = currentWeek?.map((item) => {

                    return {
                        calenderDate: item,
                        trainingInfo: TrainingData?.filter(val => parseInt(moment(val.training_date).format('DD')) === item) ?? item
                    }
                });
                layout[layout.length] = [...mappArr];
                currentWeek.length = [];
            }
        });
        if (currentWeek.length > 0) {
            const mappArr = currentWeek?.map((item) => {
                return {
                    calenderDate: item,
                    trainingInfo: TrainingData?.filter(val => parseInt(moment(val.training_date).format('DD')) === item) ?? item
                }
            });

            layout[layout.length] = [...mappArr];
        }
        return layout;
    }, []);

    //to find a month starts with day number. starts with 1 to 6.
    const firstDayIndex = dateAndDayFormat[0]?.dayNo;

    //map the details
    const calendarLayout = generateCalendarLayout(getDatesArray(currentMonth), firstDayIndex, TrainingData);

    const nextMonth = useCallback(async () => {
        const nextMonthDate = new Date(currentMonth);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        setCurrentMonth(nextMonthDate);
    }, [currentMonth]);

    const previousMonth = useCallback(async () => {
        const previousMonthDate = new Date(currentMonth);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
        setCurrentMonth(previousMonthDate);
    }, [currentMonth]);

    const handleRightClick = useCallback((event, day) => {
        const { calenderDate } = day;
        const formattedCalendarDate = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), calenderDate), 'yyyy-MM-dd:HH:mm:ss'); // Format the calendar date
        SetDatefrmt(formattedCalendarDate);
        event.preventDefault(); // Prevent the default context menu from appearing
        SetView(true)
    }, [currentMonth])

    const handleModal = useCallback((val) => {
        SetmodalData(val)
        SetOpen(true)
        const { topic_slno, training_date, dept_id, schedule_slno
        } = val
        const obj = {
            dept: dept_id,
            topic: topic_slno,
            date: training_date,
            scheduled_slno: schedule_slno
        }
        const getScheduleDetails = async (obj) => {
            const result = await axioslogin.post('/TrainingAfterJoining/scheduledatas', obj)
            const { success, data } = result.data;
            if (success === 2) {
                setScheduledata(data)
            } else {
                setScheduledata([])
            }
        }
        getScheduleDetails(obj)
    }, [])

    return (
        <Fragment>

            {View === true ? <ScheduleEmployees Scheduledata={Scheduledata} EmpDetails={EmpDetails} SetView={SetView} View={View} datefrmt={datefrmt} SetDatefrmt={SetDatefrmt} count={count} SetCount={SetCount} dept={em_department} deptSec={em_dept_section} year={year} setYear={setYear} topic={topic} setTopic={setTopic} /> : null}
            {open === true ? <ViewScheduledModal SetOpen={SetOpen} open={open} modalData={modalData} EmpDetails={EmpDetails} Scheduledata={Scheduledata} count={count} SetCount={SetCount} /> : null}
            <Box sx={{ width: "100%", p: 0.5 }}>
                <Box sx={{
                    borderTopRightRadius: 10, borderTopLeftRadius: 10, color: "white", p: 0.2,
                    backgroundColor: "#526D82", display: "flex", flexDirection: "row", justifyContent: 'space-between'
                }}>
                    <Box sx={{ p: 0.5 }}>
                        <ArrowBackIosNewIcon onClick={previousMonth} fontSize='small' style={{ color: "white", cursor: "pointer" }} />
                    </Box>
                    <Box><Typography level='h4' sx={{ color: 'whitesmoke' }} >{format(currentMonth, "MMMM yyyy")}</Typography></Box>
                    <Box sx={{ p: 0.5 }}>
                        <ArrowForwardIosIcon onClick={nextMonth} fontSize='small' style={{ color: "white", cursor: "pointer" }} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 0.4,
                        mt: 0,
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#e3eefc",
                        justifyContent: "space-around",
                        border: 1, borderColor: '#dadce0'
                    }}>
                    {daysOfWeek?.map((val, index) => (
                        <Box key={index}><Typography level='body-md' >{val}</Typography> </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {calendarLayout?.map((week, weekIndex) => (
                        <Box key={weekIndex} sx={{ display: "flex", flexDirection: "row" }}>
                            {week?.map((day, dayIndex) => (
                                <Box
                                    key={dayIndex}
                                    sx={{
                                        border: 0.4,
                                        height: 133,
                                        width: "14.28%",
                                        p: 1,
                                        borderColor: '#dadce0',
                                        backgroundColor: day ? "white" : "white",
                                        cursor: "pointer",
                                        ":hover": {
                                            backgroundColor: '#EEF5FF' // Change color on hover
                                        }
                                    }}
                                    onContextMenu={(event) => handleRightClick(event, day)}
                                >
                                    {day.calenderDate && (
                                        <Box>
                                            <Typography level='body-md'>
                                                {day.calenderDate}
                                            </Typography>
                                        </Box>
                                    )}
                                    {day.trainingInfo && day.trainingInfo.length > 0 && (
                                        <Box sx={{ cursor: "pointer", }}>
                                            {day.trainingInfo?.filter((e, i) => i <= 2)?.map((training, index) => (
                                                <Box
                                                    sx={{
                                                        borderRadius: 1,
                                                        p: 0.2,
                                                        pl: 0.5,
                                                        backgroundColor: "#039be5",
                                                        textTransform: "capitalize",
                                                        marginBottom: 0.3
                                                    }}
                                                    key={index}
                                                    onClick={() => handleModal(training)}
                                                >
                                                    <Typography level='body-xs' noWrap style={{ color: "white" }}>
                                                        {training?.training_topic_name?.toLowerCase()}
                                                    </Typography>
                                                </Box>
                                            ))}
                                            {day.trainingInfo.length > 1 && (
                                                <Box sx={{ textAlign: "right" }} onClick={() => handleModal(day)}>
                                                    <Typography level='title-sm' >show more ...</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(HodInchargCalendarView) 
