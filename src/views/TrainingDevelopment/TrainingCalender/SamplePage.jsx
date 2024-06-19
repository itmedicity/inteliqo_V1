import React from 'react'

const SamplePage = () => {
    // const generateCalendarLayout = useCallback((dates, startDayIndex, CalenderDetails) => {
    //     const layout = [];
    //     const currentWeek = Array.from({ length: startDayIndex - 1 }, () => null);
    //     dates?.map(date => {
    //         //add date based on week index, start with 0 to 6
    //         currentWeek[currentWeek.length] = date;
    //         if (currentWeek.length === 7) {


    //             const xx = dates?.filter((item) => {
    //                 return CalenderDetails?.map((val) => {
    //                     return item === getDate(new Date(val.induction_date))
    //                 });
    //             });
    //             console.log(xx);
    //             layout[layout.length] = [...currentWeek];
    //             currentWeek.length = 0;
    //         }
    //     });

    //     if (currentWeek.length > 0) {

    //         layout[layout.length] = [...currentWeek];
    //     }
    //     return layout;
    // }, [dates]);

    // const firstDayIndex = dateAndDayFormat[0]?.dayNo;

    // const calendarLayout = generateCalendarLayout(dates, firstDayIndex, CalenderDetails);




    // NEW

    // const generateCalendarLayout = (dates, startDayIndex) => {
    //     const layout = [];

    //     const currentWeek = Array.from({ length: startDayIndex - 1 }, () => null);

    //     dates?.map((date) => {
    //         currentWeek.push(date);

    //         if (currentWeek.length === 7) {
    //             layout.push([...currentWeek]);
    //             currentWeek.length = 0;
    //         }
    //     });

    //     if (currentWeek.length > 0) {
    //         layout.push([...currentWeek]);
    //     }

    //     return layout;
    // };

    // const firstDayIndex = dateAndDayFormat[0]?.dayNo;
    // const calendarLayout = generateCalendarLayout(getDatesArray(currentMonth), firstDayIndex);

    return (
        <div>
            hai
        </div>
    )
}

export default SamplePage
// import React, { Fragment, memo, useCallback, useState } from 'react';
// import { Box, Typography, Paper } from '@mui/material';
// import { startOfMonth, endOfMonth, format, eachDayOfInterval } from 'date-fns';
// import moment from 'moment';
// import { IconButton } from '@mui/joy';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const InductionCalenderFormat = () => {

//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     const [currentMonth, setCurrentMonth] = useState(new Date());

//     const getTotalDaysInMonth = (date) => {
//         return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     };

//     const getDatesArray = (date) => {
//         const totalDays = getTotalDaysInMonth(date);
//         return Array.from({ length: totalDays }, (_, index) => index + 1);
//     };

//     const dateRange = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
//     const dateAndDayFormat = dateRange?.map((val) => {
//         return { dayNo: moment(val).format('d'), days: moment(val).format('ddd') }
//     });
//     const generateCalendarLayout = useCallback((dates, startDayIndex) => {
//         const layout = [];
//         const currentWeek = Array.from({ length: startDayIndex - 1 }, () => null);
//         console.log(currentWeek);
//         dates?.map(date => {
//             //add date based on week index, start with 0 to 6
//             currentWeek[currentWeek.length] = date;
//             if (currentWeek.length === 7) {
//                 layout[layout.length] = [...currentWeek];
//                 currentWeek.length = 0;
//             }
//         });

//         if (currentWeek.length > 0) {
//             layout[layout.length] = [...currentWeek];
//         }
//         return layout;
//     }, []);

//     const firstDayIndex = dateAndDayFormat[0]?.dayNo;

//     const calendarLayout = generateCalendarLayout(getDatesArray(currentMonth), firstDayIndex);


//     const nextMonth = () => {
//         const nextMonthDate = new Date(currentMonth);
//         nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
//         setCurrentMonth(nextMonthDate);
//     };

//     const previousMonth = () => {
//         const previousMonthDate = new Date(currentMonth);
//         previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
//         setCurrentMonth(previousMonthDate);
//     };

//     return (
//         <Fragment>
//             <Paper>
//                 <Box sx={{ width: "100%", p: 1 }}>
//                     <Box sx={{ textAlign: "center", fontFamily: "initial" }}>
//                         <h3><u>Induction Monthly Training Calendar</u></h3>
//                     </Box>
//                     <Box sx={{ p: 0.5, backgroundColor: "#CDE8E5", display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
//                         <Box>
//                             <IconButton onClick={previousMonth} >
//                                 <ArrowBackIosNewIcon />
//                             </IconButton>
//                         </Box>
//                         <Box><h4>{format(currentMonth, "MMMM yyyy")}</h4></Box>
//                         <Box>
//                             <IconButton onClick={nextMonth}>
//                                 < ArrowForwardIosIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>

//                     <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#F3D0D7", justifyContent: "space-around" }}>
//                         {daysOfWeek?.map((val, index) => (
//                             <Box sx={{ fontWeight: "bold" }} key={index}>{val}</Box>
//                         ))}
//                     </Box>
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                         {calendarLayout?.map((week, weekIndex) => (
//                             <Box key={weekIndex} sx={{ display: "flex", flexDirection: "row" }}>
//                                 {week?.map((day, dayIndex) => (
//                                     <Box
//                                         key={dayIndex}
//                                         sx={{
//                                             border: 1,
//                                             height: 147,
//                                             width: "14.28%",
//                                             p: 1,
//                                             backgroundColor: day ? "white" : "white"
//                                         }}>
//                                         <Typography sx={{}}>{day || ""}
//                                         </Typography>
//                                     </Box>
//                                 ))}
//                             </Box>
//                         ))}
//                     </Box>
//                 </Box>
//             </Paper>

//         </Fragment>
//     );
// };

// export default memo(InductionCalenderFormat);


// deptCounts = [{ dept_name: 'OPERATIONS', count: 3 },
// { dept_name: 'PAEDIATRICS', count: 1 },
// { dept_name: 'NURSING', count: 4 },
// { dept_name: 'NURSING COLLEGE', count: 1 },
// { dept_name: 'MRD', count: 1 },
// { dept_name: 'ANAESTHESIOLOGY', count: 1 },
// { dept_name: 'ACCOUNTS', count: 1 }]

// datas = [
//     {
//         induction_date: "2024-05-30 09:47:01", topic: "PULMONARY TB", topic_slno: 19, trainer_name: "DEEPAK MOHAN",
//         trainers: "[144]", training_date: 30, trainingtype_slno: 4, type_name: "PROFESSIONAL DEVELOPMENT"
//     },
//     {
//         induction_date: "2024-05-30 09:48:39", topic: "INTELIQO", topic_slno: 74, trainer_name: "DEEPAK MOHAN", trainers: "[144]",
//         training_date: 30, trainingtype_slno: 4, type_name: "PROFESSIONAL DEVELOPMENT"
//     }
// ]


// deptdata = [
//     { induct_emp_dept: 43, induct_detail_date: '2024-05-30 15:23:14', dept_name: 'OPERATIONS', schedule_topic: 1, training_topic_name: 'EMERGENCY CODES' },
//     { induct_emp_dept: 59, induct_detail_date: '2024-05-30 15:23:14', dept_name: 'PAEDIATRICS', schedule_topic: 1, training_topic_name: 'EMERGENCY CODES' },
//     { induct_emp_dept: 2, induct_detail_date: '2024-05-30 09:47:01', dept_name: 'NURSING', schedule_topic: 19, training_topic_name: 'PULMONARY TB' },
//     { induct_emp_dept: 2, induct_detail_date: '2024-05-30 09:47:01', dept_name: 'NURSING', schedule_topic: 19, training_topic_name: 'PULMONARY TB' },
//     { induct_emp_dept: 2, induct_detail_date: '2024-05-30 09:47:01', dept_name: 'NURSING', schedule_topic: 19, training_topic_name: 'PULMONARY TB' },
//     { induct_emp_dept: 38, induct_detail_date: '2024-05-30 09:47:01', dept_name: 'NURSING COLLEGE', schedule_topic: 19, training_topic_name: 'PULMONARY TB' },
//     { induct_emp_dept: 10, induct_detail_date: '2024-05-30 09:47:01', dept_name: 'MRD', schedule_topic: 19, training_topic_name: 'PULMONARY TB' },
//     { induct_emp_dept: 2, induct_detail_date: '2024-05-30 09:48:39', dept_name: 'NURSING', schedule_topic: 74, training_topic_name: 'INTELIQO' },
//     { induct_emp_dept: 23, induct_detail_date: '2024-05-30 09:48:39', dept_name: 'ANAESTHESIOLOGY', schedule_topic: 74, training_topic_name: 'INTELIQO' },
//     { induct_emp_dept: 43, induct_detail_date: '2024-05-30 09:48:39', dept_name: 'OPERATIONS', schedule_topic: 74, training_topic_name: 'INTELIQO' },
//     { induct_emp_dept: 15, induct_detail_date: '2024-05-30 09:48:39', dept_name: 'ACCOUNTS', schedule_topic: 74, training_topic_name: 'INTELIQO' },
//     { induct_emp_dept: 43, induct_detail_date: '2024-05-30 09:48:39', dept_name: 'OPERATIONS', schedule_topic: 74, training_topic_name: 'INTELIQO' }
// ]