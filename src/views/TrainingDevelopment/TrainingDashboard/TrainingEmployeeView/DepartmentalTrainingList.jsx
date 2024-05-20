import { Box, List, ListItem, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import DashboardMonthField from 'src/views/CommonCode/DashboardMonthField';

const DepartmentalTrainingList = ({ em_id }) => {
    const [Inductdata, SetInductData] = useState([])
    const [Deptdata, SetDeptdata] = useState([])
    const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM-DD"));

    useEffect(() => {
        const obj = {
            month: month,
            em_id: em_id
        }
        const getInductData = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/EmpInductTraining', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetInductData(data)

            }
            else {
                SetInductData([])
            }

        })
        getInductData()

        //DEPARTMENTAL
        const getDeptData = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/EmpDeptTrainings', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetDeptdata(data)
            }
            else {
                SetDeptdata([])
            }
        })
        getDeptData()

    }, [month, em_id])

    return (
        <Paper elevation={0} sx={{ flex: 1, width: "100%", boxShadow: 4, p: 1, backgroundColor: "#FFFFFF" }}>
            <Box sx={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <Box>
                    <h5>Training List</h5>
                </Box>

                <Box  >
                    <DashboardMonthField month={month} setMonth={setMonth} />
                </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", height: 100, overflowY: "auto", mt: 1 }}>
                    {Inductdata?.length !== 0 ?
                        <List marker="disc" size="md" >
                            <ListItem sx={{ color: '#10439F' }}><h6><u>Induction Trainings</u></h6></ListItem>
                            <List marker="circle" >
                                {Inductdata?.map((val, ndx) => (
                                    <ListItem key={ndx} >
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                            <Box sx={{ textTransform: "capitalize", }}>
                                                <Typography>{val?.training_topic_name?.toLowerCase()}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>{moment(val?.induction_date).format("DD/MM/YYYY")}</Typography></Box>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </List>
                        :
                        null
                    }
                    {Deptdata?.length !== 0 ?
                        <List marker="disc" size="md">
                            <ListItem sx={{ color: "#6420AA" }}><h6><u>Departmental Trainings</u></h6></ListItem>
                            <List marker="circle">
                                {Deptdata?.map((val, ndx) => (
                                    <ListItem key={ndx} >
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                            <Box sx={{ textTransform: "capitalize" }}>{val?.training_topic_name?.toLowerCase()}</Box>
                                            <Box>{moment(val?.schedule_date).format("DD/MM/YYYY")}</Box>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </List>
                        :
                        null
                    }
                </Box>
            </Box>
        </Paper >
    )
}

export default memo(DepartmentalTrainingList) 
