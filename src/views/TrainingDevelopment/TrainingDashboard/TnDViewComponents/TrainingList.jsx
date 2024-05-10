import { Box, List, ListItem, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import DashboardMonthField from 'src/views/CommonCode/DashboardMonthField';

const TrainingList = () => {
    const [Inductdata, SetInductData] = useState([])
    const [InductAll, SetInductAll] = useState([])
    const [DeptAll, SetDeptAll] = useState([])
    const [Deptdata, SetDeptdata] = useState([])
    const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM-DD"));


    useEffect(() => {
        const obj = {
            month: month
        }
        const getInductData = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/Inductmonthlytraining', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetInductData(data)

            }
            else {
                SetInductData([])
            }

        })
        getInductData()


        const getInductAllDetails = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/Inductmonthlyall', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetInductAll(data)
            }
            else {
                SetInductAll([])
            }
        })
        getInductAllDetails()


        //DEPARTMENTAL
        const getDeptData = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/deptmonthlytraining', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetDeptdata(data)

            }
            else {
                SetDeptdata([])
            }
        })
        getDeptData()

        const getDeptAllDetails = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/deptmonthlyall', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetDeptAll(data)
            }
            else {
                SetDeptAll([])
            }
        })
        getDeptAllDetails()

    }, [month])


    const mapFunc = (val) => {
        InductAll?.filter(item => val.cate_slno === item.cate_slno)
        return {

            "Induct_topic": val.training_topic_name,
            "Induct_date": val.induction_date,
        }
    }
    const mapdata = Inductdata?.map(mapFunc)

    const mapdeptFunc = (val) => {
        DeptAll?.filter(item => val.cate_slno === item.cate_slno)
        return {

            "dept_topic": val.training_topic_name,
            "dept_date": val.schedule_date,
        }
    }
    const mapdeptdata = Deptdata?.map(mapdeptFunc)


    return (

        <Paper elevation={0} sx={{ flex: 1, boxShadow: 4, backgroundColor: "#FFFFFF", }}>
            <Box sx={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", }}>
                <Box>
                    <h5>Training List</h5>
                </Box>
                <Box>
                    <DashboardMonthField month={month} setMonth={setMonth} />
                </Box>
            </Box>
            <Box sx={{ width: "100%", }}>
                <Box sx={{ height: 220, overflowX: "auto", mt: 1 }}>

                    {mapdata?.length !== 0 ?
                        <List marker="disc" size="md" >
                            <ListItem sx={{ color: '#10439F' }}><h6><u>Induction Trainings</u></h6></ListItem>
                            <List marker="circle" >
                                {mapdata?.map((val, ndx) => (
                                    <ListItem key={ndx} >
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                            <Box sx={{ textTransform: "capitalize", }}>
                                                <Typography>{val?.Induct_topic?.toLowerCase()}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>{moment(val?.Induct_date).format("DD/MM/YYYY")}</Typography></Box>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </List>
                        :
                        null
                    }
                    {mapdeptdata?.length !== 0 ?
                        <List marker="disc" size="md">
                            <ListItem sx={{ color: "#6420AA" }}><h6><u>Departmental Trainings</u></h6></ListItem>
                            <List marker="circle">
                                {mapdeptdata?.map((val, ndx) => (
                                    <ListItem key={ndx} >
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                            <Box sx={{ textTransform: "capitalize" }}>{val?.dept_topic?.toLowerCase()}</Box>
                                            <Box>{moment(val?.dept_date).format("DD/MM/YYYY")}</Box>
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

export default memo(TrainingList) 
