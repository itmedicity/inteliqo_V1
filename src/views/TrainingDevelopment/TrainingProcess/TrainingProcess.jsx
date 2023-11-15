import { Box, IconButton, Paper, Typography } from '@mui/material'
import React, { memo, useEffect } from 'react';
import { Grid } from '@mui/joy';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCallback } from 'react';
import { useState } from 'react';
import _ from 'underscore';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UpcomingTrainings from './UpcomingTrainings';
import NextMonthTrainings from './NextMonthTrainings';
import { useDispatch, useSelector } from 'react-redux';
import { DepartmentalTrainingDetails, TrainingProcessdetails } from 'src/redux/actions/Training.Action';
import moment from 'moment';
import { addDays, endOfMonth, isBefore, isSameMonth } from 'date-fns';
import TodayTrainings from './TodayTrainings';
import DueTrainings from './DueTrainings';

const TrainingProcess = () => {
    const [show, setShow] = useState(0);
    const [count, Setcount] = useState(0);
    const [upcomingData, setUpcomingData] = useState([]);
    const [NextmonthData, setNextmonthData] = useState([]);
    const [Todaydata, setTodaydata] = useState([]);
    const [tabledata, setTableData] = useState([]);
    const [data, setData] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TrainingProcessdetails())
        dispatch(DepartmentalTrainingDetails())
    }, [dispatch, count])

    const Details = useSelector((state) => state?.gettrainingData?.trainingProcess?.trainingProcessList, _.isEqual);
    const dept_training_details = useSelector((state) => state?.gettrainingData?.departmentalTrainingDetails?.departmentalTrainingDetailsList, _.isEqual);

    const duelen = data?.length;
    const Upcominglen = upcomingData?.length;
    const Nextmonthlen = NextmonthData?.length;
    const todaylen = Todaydata?.length;
    const itemsList = [
        { id: 1, icons: <PlaylistAddCheckIcon sx={{ color: "#81c784" }} />, itemname: "Due", count: duelen },
        { id: 2, icons: <PlaylistAddCheckIcon sx={{ color: "#81c784" }} />, itemname: "Today", count: todaylen },
        { id: 3, icons: <UpcomingIcon sx={{ color: "#81c784" }} />, itemname: "Upcoming Trainings", count: Upcominglen },
        { id: 4, icons: <NextPlanIcon sx={{ color: "#81c784" }} />, itemname: "Next Month", count: Nextmonthlen },
    ]

    useEffect(() => {
        const displayData = dept_training_details?.map((val) => {
            const object = {
                deparment_sect: val.deparment_sect,
                department: val.department,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                schedule_topics: val.schedule_topics,
                date: moment(val.schedule_date).format('YYYY-MM-DD'),
                schedule_trainers: val.schedule_trainers,
                schedule_year: val.schedule_year,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic_slno: val.topic_slno,
                traineer_name: val.traineer_name,
                training_topic_name: val.training_topic_name,
            }
            return object;
        })
        setTableData(displayData)
    }, [dept_training_details])

    useEffect(() => {
        const dates = tabledata?.map((val) => val.date);
        const upcomingfilter = tabledata?.filter((val, index) => isSameMonth(new Date(dates[index]), new Date()));
        setUpcomingData(upcomingfilter);

        const getEndofMonth = endOfMonth(new Date())
        const nextmonth = addDays(new Date(getEndofMonth), 1) //get next month eg.dec 1 2023
        const filterNextmonth = tabledata?.filter((val) => moment(new Date(val.date)).format('MM') === moment(new Date(nextmonth)).format('MM'))
        setNextmonthData(filterNextmonth)

        const filterToday = tabledata?.filter((val) => val.date === moment(new Date()).format('YYYY-MM-DD'))
        setTodaydata(filterToday);

        const DueTarinings = tabledata?.filter((val) => isBefore(new Date(val.date), new Date()));
        setData(DueTarinings);
    }, [tabledata, setUpcomingData, setData, setNextmonthData, setTodaydata])

    const ViewList = useCallback((e, val) => {
        if (val.id === 1) {
            setShow(1)
        } else if (val.id === 2) {
            setShow(2)
        } else if (val.id === 3) {
            setShow(3)
        } else if (val.id === 4) {
            setShow(4)
        }
    }, [setShow])
    return (
        <Paper variant="outlined" sx={{ height: screenInnerHeight - 85 }}>
            <Box sx={{ width: "100%", p: 1 }}>
                {
                    show === 1 ? <DueTrainings show={show} setShow={setShow} count={count} Setcount={Setcount} data={data} /> :
                        show === 2 ? <TodayTrainings show={show} setShow={setShow} count={count} Setcount={Setcount} Details={Details} Todaydata={Todaydata} /> :
                            show === 3 ? <UpcomingTrainings setShow={setShow} upcomingData={upcomingData} /> :
                                show === 4 ? <NextMonthTrainings setShow={setShow} NextmonthData={NextmonthData} /> :
                                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1, gap: 3 }}
                                    >
                                        <Grid sx={{ p: 1 }} container spacing={2}>
                                            {itemsList?.map((item, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Paper
                                                        key={index}
                                                        variant="outlined"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            p: 1,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Box
                                                                sx={{
                                                                    width: 40,
                                                                    height: 40,
                                                                    backgroundColor: '#E2F6CA',
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    opacity: 0.7,
                                                                }}
                                                            >
                                                                {item.icons}
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    flex: 1,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        padding: '4px',
                                                                        borderRadius: '8px',
                                                                        marginRight: 'auto',
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: 18 }}>{item.itemname}</Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    border: '2px solid #E2F6CA',
                                                                    padding: '4px',
                                                                    borderRadius: '8px',
                                                                    width: '15%',
                                                                }}
                                                            >
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                                                                    {item.count}
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                borderTop: 2,
                                                                borderColor: '#D6E6F2',
                                                                marginTop: 3,
                                                                alignItems: 'center',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={(e) => {
                                                                ViewList(e, item)
                                                            }}
                                                        >
                                                            <Box sx={{ p: 1, mt: 1 }}>
                                                                <Typography>View</Typography>
                                                            </Box>
                                                            <Box sx={{ ml: 1, mt: 1 }}>
                                                                <IconButton size="small" color="success">
                                                                    <ArrowRightAltIcon />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                }
            </Box>

        </Paper >
    )
}

export default memo(TrainingProcess)
