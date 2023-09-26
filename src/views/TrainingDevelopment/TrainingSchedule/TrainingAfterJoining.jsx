import { Box, IconButton, Paper, Typography } from '@mui/material'
import React, { memo } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Grid } from '@mui/joy';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCallback } from 'react';
import { useState } from 'react';
import ViewJoinersTable from './viewJoinersTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewJoiners, TrainingCategory, TrainingNames, TrainingType, TrainingSchedule, DepartmentalTrainingSchedule } from 'src/redux/actions/Training.Action';
import TrainingScheduleEmployees from './TrainingScheduleEmployees';
import _ from 'underscore';
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import DepartmentalTraining from './DepartmentalTraining';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import DepartmentalTrainingCalender from './DepartmentalTrainingCalender';

const TrainingAfterJoining = () => {
    const [show, setShow] = useState(0);
    const [count, Setcount] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TrainingType())
        dispatch(NewJoiners())
        dispatch(TrainingCategory())
        dispatch(TrainingNames())
        dispatch(TrainingSchedule())
        dispatch(DepartmentalTrainingSchedule())
    }, [dispatch, count])

    const newjoiners = useSelector((state) => state?.gettrainingData?.newJoiners?.newJoinersList, _.isEqual);
    const schedule = useSelector((state) => state?.gettrainingData?.trainingSchedule?.trainingScheduleList, _.isEqual);
    const department = useSelector((state) => state?.gettrainingData?.departmentalTrainingSchedule?.departmentalTrainingScheduleList, _.isEqual);

    const newjoinerslen = newjoiners?.length;
    const schedulelen = schedule?.length;
    const departmentlen = department?.length;

    const itemsList = [
        { id: 1, icons: <PeopleAltIcon sx={{ color: "#81c784" }} />, itemname: "New Joinees", count: newjoinerslen },
        { id: 2, icons: <PendingActionsSharpIcon sx={{ color: "#81c784" }} />, itemname: "Scheduled Employees", count: schedulelen },
        { id: 3, icons: <ModelTrainingIcon sx={{ color: "#81c784" }} />, itemname: "Departmental Training", count: departmentlen },
        { id: 3, icons: <EmojiEmotionsSharpIcon sx={{ color: "#81c784" }} />, itemname: "Remaining for training", count: newjoinerslen }

    ]

    const ViewList = useCallback((e, val) => {
        if (val.id === 1) {
            setShow(1)
        } else if (val.id === 2) {
            setShow(2)
        } else if (val.id === 3) {
            setShow(3)
        }
    })

    return (
        <Box>
            <Paper elevation={0} sx={{ height: screenInnerHeight - 85 }}>
                <Box sx={{ width: "100%", p: 1 }}>
                    {show === 1 ? <ViewJoinersTable show={show} setShow={setShow} count={count} Setcount={Setcount} /> :
                        show === 2 ? <TrainingScheduleEmployees show={show} setShow={setShow} count={count} Setcount={Setcount} /> :
                            // show === 3 ? <DepartmentalTraining setShow={setShow} count={count} Setcount={Setcount} /> :
                            show === 3 ? <DepartmentalTrainingCalender setShow={setShow} count={count} Setcount={Setcount} /> :

                                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1, gap: 3 }}
                                >
                                    {/* <Grid
                                        container
                                        spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                        sx={{ width: '100%' }} > */}

                                    {/* {itemsList.map((val, index) => (
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                                <Paper sx={{ width: "100%", height: 150, flex: 2, p: 2, display: "flex", flexDirection: "column", gap: 5, flexWrap: "wrap" }}
                                                    key={index}>
                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                                            <Box sx={{
                                                                width: 40,
                                                                p: 1,
                                                                height: 40,
                                                                backgroundColor: '#E2F6CA',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                opacity: 0.7
                                                            }}>
                                                                {val.icons}
                                                            </Box>

                                                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "80%", fontFamily: "sans-serif", fontSize: "large" }}>
                                                                <Box sx={{ color: "#61677A" }}>
                                                                    {val.itemname}
                                                                </Box>
                                                                <Box sx={{ fontSize: "x-large", fontWeight: "bold" }}>
                                                                    {val.count}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 3, borderTop: 1, borderColor: "#E4F1FF", mt: 2, cursor: "pointer" }} onClick={(e) => {
                                                            ViewList(e, val)
                                                        }}>
                                                            <Box sx={{ mt: 1, fontWeight: "bold", color: "#5C5470" }}>View more</Box>
                                                            <Box sx={{ mt: 1 }}><ArrowRightAltIcon /></Box>
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))} */}
                                    {/* </Grid> */}





                                    <Grid sx={{ p: 1 }} container spacing={2}>
                                        {itemsList.map((item, index) => (
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
        </Box >

    )
}

export default memo(TrainingAfterJoining)




