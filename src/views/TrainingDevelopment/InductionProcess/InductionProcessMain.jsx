import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { memo, useEffect } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCallback } from 'react';
import { useState } from 'react';
import _ from 'underscore';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { useDispatch, useSelector } from 'react-redux';
import { BlwAvgEmpList, InductionCompleted, InductionToday, TrainingCalenderDetailsAll, inductPendingEmpDetails } from 'src/redux/actions/Training.Action';
import moment from 'moment';
import { addDays, endOfMonth, format } from 'date-fns';
import PendingIcon from '@mui/icons-material/Pending';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TodayIcon from '@mui/icons-material/Today';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TodaysInduction from './TodaysInduction';
import InductionCompletedList from './InductionCompletedList';
import InductionUpcoming from './InductionUpcoming';
import InductionNextMonth from './InductionNextMonth';
import InductionPendingList from './InductionPendingList';
import BelowAvgEmplists from './BelowAvgEmplists';

const InductionProcessMain = () => {
    const [show, setShow] = useState(0);
    const [count, Setcount] = useState(0);
    const [upcomingData, setUpcomingData] = useState([]);
    const [NextmonthData, setNextmonthData] = useState([]);
    const [tabledata, setTableData] = useState([]);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(InductionToday())
        dispatch(InductionCompleted())
        dispatch(inductPendingEmpDetails())
        dispatch(BlwAvgEmpList())
        dispatch(TrainingCalenderDetailsAll())
    }, [dispatch, count])

    const TrainingCalender = useSelector((state) => state?.gettrainingData?.InductionTrainingCalender?.InductionTrainingCalenderList, _.isEqual);
    const todays = useSelector((state) => state?.gettrainingData?.InductionToday?.InductionTodayList, _.isEqual);
    const trainingcompleted = useSelector((state) => state?.gettrainingData?.InductionCompleted?.InductionCompletedList, _.isEqual);
    const pendingEmp = useSelector((state) => state?.gettrainingData?.InductionPpendingEmp?.InductionPpendingEmpList, _.isEqual);
    const BelowAvgList = useSelector((state) => state?.gettrainingData?.BelowAvg?.BelowAvgList, _.isEqual);

    const Upcominglen = upcomingData?.length;
    const Nextmonthlen = NextmonthData?.length;
    //new
    const completed_list = trainingcompleted?.length;
    const today = todays?.length;
    const pendingEmplen = pendingEmp?.length;
    const belowEmp = BelowAvgList?.length;

    const itemsList = [
        { id: 1, icons: <AssignmentTurnedInIcon sx={{ color: "#81c784" }} />, itemname: "Training Completed Employee List", count: completed_list },
        { id: 2, icons: <TodayIcon sx={{ color: "#81c784" }} />, itemname: "Today Training List", count: today },
        { id: 3, icons: <UpcomingIcon sx={{ color: "#81c784" }} />, itemname: "Upcoming Training List", count: Upcominglen },
        { id: 4, icons: <NextPlanIcon sx={{ color: "#81c784" }} />, itemname: "Next Month Training List", count: Nextmonthlen },
        { id: 5, icons: <PendingIcon sx={{ color: "#81c784" }} />, itemname: "Pending Training List", count: pendingEmplen },
        { id: 6, icons: <VerifiedUserIcon sx={{ color: "#81c784" }} />, itemname: "Below Average Employee List", count: belowEmp },
    ]

    useEffect(() => {
        const displayData = TrainingCalender?.map((val) => {
            const object = {
                schedule_topic: val.schedule_topic,
                induction_date: val.induction_date,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                date: format(new Date(val.induction_date), "dd-MM-yyyy"),
            }
            return object;
        })
        setTableData(displayData)
    }, [TrainingCalender])

    useEffect(() => {
        const upcomingfilter = tabledata?.filter((val) => moment(new Date(val.date)).format('MM') === moment(new Date()).format('MM')
            && moment(new Date(val.date)).format('DD') > moment(new Date()).format('DD'))
        setUpcomingData(upcomingfilter);

        const getEndofMonth = endOfMonth(new Date())
        const nextmonth = addDays(new Date(getEndofMonth), 1) //get next month eg.dec 1 2023
        const filterNextmonth = tabledata?.filter((val) => moment(new Date(val.date)).format('MM') === moment(new Date(nextmonth)).format('MM'))
        setNextmonthData(filterNextmonth)

    }, [tabledata, setUpcomingData, setNextmonthData])

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
        else if (val.id === 5) {
            setShow(5)
        }
        else if (val.id === 6) {
            setShow(6)
        }
    }, [setShow])
    return (
        <Box sx={{ width: "100%", p: 1 }}>
            {
                show === 1 ? <InductionCompletedList show={show} setShow={setShow} count={count} Setcount={Setcount} trainingcompleted={trainingcompleted} /> :
                    show === 2 ? <TodaysInduction show={show} setShow={setShow} count={count} Setcount={Setcount} todays={todays} /> :
                        show === 3 ? <InductionUpcoming setShow={setShow} upcomingData={upcomingData} /> :
                            show === 4 ? <InductionNextMonth setShow={setShow} NextmonthData={NextmonthData} /> :
                                show === 5 ? <InductionPendingList setShow={setShow} pendingEmp={pendingEmp} count={count} Setcount={Setcount} /> :
                                    show === 6 ? <BelowAvgEmplists BelowAvgList={BelowAvgList} setShow={setShow} count={count} Setcount={Setcount} /> :
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

    )
}

export default memo(InductionProcessMain) 
