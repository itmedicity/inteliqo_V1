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
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import DepartmentalCalender from './DepartmentalCalender';

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

    const newjoinerslen = newjoiners?.length;
    const schedulelen = schedule?.length;

    const itemsList = [
        { id: 1, icons: <PeopleAltIcon sx={{ color: "#81c784" }} />, itemname: "New Joinees", count: newjoinerslen },
        { id: 2, icons: <PendingActionsSharpIcon sx={{ color: "#81c784" }} />, itemname: "Scheduled Employees", count: schedulelen },
        { id: 3, icons: <ModelTrainingIcon sx={{ color: "#81c784" }} />, itemname: "Departmental Training", count: 0 },

    ]

    const ViewList = useCallback((e, val) => {
        if (val.id === 1) {
            setShow(1)
        } else if (val.id === 2) {
            setShow(2)
        } else if (val.id === 3) {
            setShow(3)
        }
    }, [])

    return (

        <Paper variant="outlined" sx={{ height: screenInnerHeight - 85 }}>
            <Box sx={{ width: "100%", p: 1 }}>
                {show === 1 ? <ViewJoinersTable show={show} setShow={setShow} count={count} Setcount={Setcount} /> :
                    show === 2 ? <TrainingScheduleEmployees show={show} setShow={setShow} count={count} Setcount={Setcount} /> :
                        show === 3 ? <DepartmentalCalender setShow={setShow} count={count} Setcount={Setcount} /> :

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

export default memo(TrainingAfterJoining)




