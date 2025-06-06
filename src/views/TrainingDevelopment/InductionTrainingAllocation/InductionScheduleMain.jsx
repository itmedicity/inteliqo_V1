import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { startOfMonth, endOfMonth, format, eachDayOfInterval } from 'date-fns';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { InductionTrainingCalender } from 'src/redux/actions/Training.Action';
import Typography from '@mui/joy/Typography';
import { InductRedux } from '../TrainingCalender/InductRedux';
import InductTopicAllocation from './InductTopicAllocation';
import InductPreviewAddPage from './InductPreviewAddPage';
import { axioslogin } from 'src/views/Axios/Axios';
import { Tooltip } from '@mui/joy';

const InductionScheduleMain = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [count, SetCount] = useState(0)
    const [open, SetOpen] = useState(false)
    const [modalData, SetmodalData] = useState({})
    const [datas, setdatas] = useState([])

    const [datefrmt, SetDatefrmt] = useState(new Date());
    const [View, SetView] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const obj = {
            month: format(currentMonth, "MM"),
            year: format(currentMonth, "yyyy")
        }
        dispatch(InductionTrainingCalender(obj))
        SetCount(0)
    }, [dispatch, currentMonth, count])

    const InductDatas = useSelector((state) => InductRedux(state));
    const CalenderData = useMemo(() => InductDatas, [InductDatas]);
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
                        trainingInfo: TrainingData?.filter(val => val.training_date === item) ?? item
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
                    trainingInfo: TrainingData?.filter(val => val.training_date === item) ?? item
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

    const handleModal = useCallback(async (val) => {
        const { induction_date, topic_slno, trainingtype_slno } = val
        const obj = {
            trainingtype_slno: parseInt(trainingtype_slno),
            topic_slno: parseInt(topic_slno),
            induction_date: induction_date
        }
        const result = await axioslogin.post('/InductionTraining/getcalEmpdetails', obj)
        const { data, success } = result.data;
        if (success === 2) {
            setdatas(data)
            SetOpen(true)
            SetmodalData(val)
            SetCount(count + 1)
        }
        else {
            setdatas([])
            SetOpen(false)
            SetmodalData({})
            SetCount(0)
        }

    }, [setdatas, SetCount, count])

    const handleRightClick = useCallback((event, day) => {
        const { calenderDate } = day;
        const formattedCalendarDate = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), calenderDate), 'yyyy-MM-dd:HH:mm:ss'); // Format the calendar date
        SetDatefrmt(formattedCalendarDate);
        event.preventDefault(); // Prevent the default context menu from appearing
        SetView(true)
    }, [currentMonth])

    return (
        <Fragment>
            <Paper>
                {/* Preview & Edit */}
                {open === true ? <InductPreviewAddPage count={count} SetCount={SetCount} datas={datas} setdatas={setdatas} SetOpen={SetOpen} open={open} modalData={modalData} /> : null}
                {/* Employee Schedule */}
                {View === true ? <InductTopicAllocation SetDatefrmt={SetDatefrmt} datefrmt={datefrmt} SetView={SetView} /> :
                    <Box sx={{ width: "100%", }}>
                        <Box sx={{
                            borderTopRightRadius: 10, borderTopLeftRadius: 10, color: "white", p: 0.3,
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
                                p: 0.5,
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
                                                width: "14.28%",
                                                p: 1,
                                                borderColor: '#dadce0',
                                                backgroundColor: day ? "white" : "white",
                                                overflowY: 'auto',
                                                '::-webkit-scrollbar': { display: "none" }, height: 140

                                            }}
                                            onContextMenu={(event) => handleRightClick(event, day)}
                                        >
                                            {day.calenderDate && (
                                                <Typography level='body-md' >{day.calenderDate}</Typography>
                                            )}
                                            {day.trainingInfo && day.trainingInfo.length > 0 && (

                                                <Box sx={{ cursor: "pointer", }} >
                                                    {day.trainingInfo?.filter((e, i) => i <= 10)?.map((training, index) => (
                                                        <Tooltip key={index} title="View & Edit Trainings">
                                                            <Box
                                                                sx={{
                                                                    borderRadius: 1,
                                                                    p: 0.2,
                                                                    pl: 0.5,
                                                                    backgroundColor: "#039be5",
                                                                    textTransform: "capitalize",
                                                                    marginBottom: 0.3,
                                                                }}

                                                                onClick={() => handleModal(training)}
                                                            >
                                                                <Typography level='body-xs' noWrap style={{ color: "white" }}>
                                                                    {training?.topic?.toLowerCase()}
                                                                </Typography>
                                                            </Box>
                                                        </Tooltip>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                }
            </Paper>
        </Fragment >
    );
};

export default memo(InductionScheduleMain);


