import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { memo, useEffect, useMemo } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCallback } from 'react';
import { useState } from 'react';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { OnlineInductionTrainingTopicListOfEmp, OnlineTrainingTopicListOfEmp } from 'src/redux/actions/Training.Action';
import InductionTraining from './InductionTraining';
import OnlineTraining from '../OnlineTraining/OnlineTraining';

const OnlineMainPage = () => {
    const [show, setShow] = useState(0);
    const [count, Setcount] = useState(0);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(OnlineTrainingTopicListOfEmp(em_id))
        dispatch(OnlineInductionTrainingTopicListOfEmp(em_id))
        Setcount(0);
    }, [dispatch, em_id, count])

    //login employee topics
    const DeptEmpOnlineTopics = useSelector((state) => state?.gettrainingData?.OnlineTraining?.OnlineTrainingList, _.isEqual)
    const InductEmpOnlineTopics = useSelector((state) => state?.gettrainingData?.InductionOnlineTraining?.InductionOnlineTrainingList, _.isEqual)

    const DeptTrainings = DeptEmpOnlineTopics?.length;
    const InductOnlinetopic = InductEmpOnlineTopics?.length;

    const itemsList = [
        { id: 1, icons: <AssignmentTurnedInIcon sx={{ color: "#81c784" }} />, itemname: "Departmental Trainings", count: DeptTrainings },
        { id: 2, icons: <AssignmentTurnedInIcon sx={{ color: "#81c784" }} />, itemname: "Induction Trainings", count: InductOnlinetopic },
    ]

    const ViewList = useCallback((e, val) => {
        if (val.id === 1) {
            setShow(1)
        }
        else if (val.id === 2) {
            setShow(2)
        }
    }, [setShow])

    return (
        <Box sx={{ width: "100%", p: 1 }}>
            {
                show === 1 ? <OnlineTraining count={count} Setcount={Setcount} DeptEmpOnlineTopics={DeptEmpOnlineTopics} setShow={setShow} /> :
                    show === 2 ? <InductionTraining count={count} Setcount={Setcount} InductEmpOnlineTopics={InductEmpOnlineTopics} setShow={setShow} /> :
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

export default memo(OnlineMainPage)
