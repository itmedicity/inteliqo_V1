import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { memo, useEffect } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCallback } from 'react';
import { useState } from 'react';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import moment from 'moment';
import { addDays, endOfMonth } from 'date-fns';
import PendingIcon from '@mui/icons-material/Pending';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TodayIcon from '@mui/icons-material/Today';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TrainingCompletedDepats from './TrainingCompletedDepats';
import UpcomingDeptTrainings from './UpcomingDeptTrainings';
import NextMonthDeptTrainings from './NextMonthDeptTrainings';
import BlowAverageDeptEmpList from './BlowAverageDeptEmpList';
import { axioslogin } from 'src/views/Axios/Axios';
import TodaysDeptTrainings from './TodaysDeptTrainings';
import DeptPendingEmpList from './DeptPendingEmpList';

const TNDProcessMainpage = () => {
    const [show, setShow] = useState(0);
    const [count, Setcount] = useState(0);
    const [upcomingData, setUpcomingData] = useState([]);
    const [NextmonthData, setNextmonthData] = useState([]);
    const [tabledata, setTableData] = useState([]);
    const [empdata, Setempdata] = useState([]);
    const [blwAvgEmp, SetblwAvgEmp] = useState([]);
    const [todaysDeptTrainings, SettodaysDeptTrainings] = useState([]);
    const [CompletedList, SetCompletedList] = useState([]);


    const Upcominglen = upcomingData?.length;
    const Nextmonthlen = NextmonthData?.length;
    //new
    const completed_list = CompletedList?.length;
    const today = todaysDeptTrainings?.length;
    const emplen = empdata?.length;
    const belowEmp = blwAvgEmp?.length;

    const itemsList = [
        { id: 1, icons: <AssignmentTurnedInIcon sx={{ color: "#81c784" }} />, itemname: "Training Completed Employee List", count: completed_list },
        { id: 2, icons: <TodayIcon sx={{ color: "#81c784" }} />, itemname: "Today Training List", count: today },
        { id: 3, icons: <UpcomingIcon sx={{ color: "#81c784" }} />, itemname: "Upcoming Training List", count: Upcominglen },
        { id: 4, icons: <NextPlanIcon sx={{ color: "#81c784" }} />, itemname: "Next Month Training List", count: Nextmonthlen },
        { id: 5, icons: <PendingIcon sx={{ color: "#81c784" }} />, itemname: "Pending Training List", count: emplen },
        { id: 7, icons: <VerifiedUserIcon sx={{ color: "#81c784" }} />, itemname: "Below Average Employee List", count: belowEmp },

    ]

    useEffect(() => {
        const upcomingfilter = tabledata?.filter((val) => moment(new Date(val.schedule_date)).format('MM') === moment(new Date()).format('MM')
            && moment(new Date(val.schedule_date)).format('DD') > moment(new Date()).format('DD'))
        setUpcomingData(upcomingfilter);

        const getEndofMonth = endOfMonth(new Date())
        const nextmonth = addDays(new Date(getEndofMonth), 1) //get next month eg.dec 1 2023
        const filterNextmonth = tabledata?.filter((val) => moment(new Date(val.schedule_date)).format('MM') === moment(new Date(nextmonth)).format('MM'))
        setNextmonthData(filterNextmonth)
    }, [tabledata, setUpcomingData, setNextmonthData])

    const ViewList = useCallback(async (e, val) => {
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
        else if (val.id === 7) {
            setShow(7)
        }
    }, [setShow])


    useEffect(() => {
        const CompletedTrainings = async () => {
            const result = await axioslogin.get(`/TrainingProcess/GetAllDeptCompletedTrainings`);
            const { success, data } = result.data;
            if (success === 2) {
                const UptoToday = data?.filter((val) => {
                    const trainingDate = new Date(val.schedule_date);
                    return trainingDate <= new Date();
                });
                SetCompletedList(UptoToday)
                setTableData(data)
            }
        }
        CompletedTrainings()

        const TodaysTrainings = async () => {
            const result = await axioslogin.get(`/TrainingProcess/getAllDeptTodaysTrainings`);
            const { success, data } = result.data;
            if (success === 2) {
                SettodaysDeptTrainings(data)
            }
        }
        TodaysTrainings()

        const DeptPendingEmpList = async () => {
            const result = await axioslogin.get(`/TrainingProcess/getAllDeptEmpPendings`);
            const { success, data } = result.data;
            if (success === 2) {
                Setempdata(data)
            }
        }
        DeptPendingEmpList()

        const DeptBlwAvgEmpList = async () => {
            const result = await axioslogin.get(`/TrainingProcess/getAllDeptBelowAvgEmpList`);
            const { success, data } = result.data;
            if (success === 2) {
                SetblwAvgEmp(data)
            }
        }
        DeptBlwAvgEmpList()
    }, [])

    return (
        <Box sx={{ width: "100%", p: 1 }}>
            {
                show === 1 ? <TrainingCompletedDepats show={show} setShow={setShow} count={count} Setcount={Setcount} trainingcompleted={CompletedList} /> :
                    show === 2 ? <TodaysDeptTrainings show={show} setShow={setShow} count={count} Setcount={Setcount} todays={todaysDeptTrainings} /> :
                        show === 3 ? <UpcomingDeptTrainings setShow={setShow} upcomingData={upcomingData} /> :
                            show === 4 ? <NextMonthDeptTrainings setShow={setShow} NextmonthData={NextmonthData} /> :
                                show === 5 ? <DeptPendingEmpList setShow={setShow} empdata={empdata} count={count} Setcount={Setcount} /> :
                                    show === 7 ? <BlowAverageDeptEmpList BelowAvgList={blwAvgEmp} setShow={setShow} count={count} Setcount={Setcount} /> :


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

export default memo(TNDProcessMainpage) 
