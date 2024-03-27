import React, { Fragment, memo } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { InductionCalenderDetails } from 'src/redux/actions/Training.Action';
import { getMonth, getYear } from 'date-fns';
import _ from 'underscore';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import InductionTableRows from './InductionTableRows';
import { screenInnerHeight } from 'src/views/Constant/Constant';

const InductionCalender = () => {

    const dispatch = useDispatch();

    const [year, setYear] = useState(moment(new Date()).format("YYYY"));
    const [datas, Setdatas] = useState([])
    const yr = getYear(new Date(year))
    const [count, Setcount] = useState(0)

    useEffect(() => {
        dispatch(InductionCalenderDetails());
    }, [dispatch, count])

    const InductionCalender = useSelector((state) => state?.gettrainingData?.InductionTrainingDetails?.InductionTrainingDetailsList, _.isEqual);

    useEffect(() => {
        const displayData = InductionCalender?.map((val) => {
            const object = {
                schedule_topic: val.schedule_topic,
                schedule_type: val.schedule_type,
                topic_slno: val.topic_slno,
                trainers: val.trainers,
                training_topic_name: val.training_topic_name,
                year: moment(new Date()).format("YYYY"),
                induction_date: val.induction_date,
                months: getMonth(new Date(val.induction_date)),
                date: moment(val.induction_date).format("DD/MM/YYYY"),
                trainingtype_slno: val.trainingtype_slno,
                type_name: val.type_name,
                trainer_name: val.trainer_name
            }
            return object;
        })
        Setdatas(displayData)
    }, [InductionCalender, count])

    const months = [
        { id: 0, name: "Jan" }, { id: 1, name: "Feb" }, { id: 2, name: "Mar" }, { id: 3, name: "Apr" },
        { id: 4, name: "May" }, { id: 5, name: "Jun" }, { id: 6, name: "Jul" }, { id: 7, name: "Aug" },
        { id: 8, name: "Sep" }, { id: 9, name: "Oct" }, { id: 10, name: "Nov" }, { id: 11, name: "Dec" }
    ];

    return (
        < Fragment >
            <ToastContainer />
            <CustomLayout title="Induction Training Calender" displayClose={true}>
                <Box sx={{ width: "100%", p: 1, height: screenInnerHeight - 115 }}>
                    <Paper variant='outlined' sx={{ p: 1, width: "100%", display: "flex", flexDirection: "row", gap: 0.5 }}>
                        <Box sx={{ mt: 2, width: "100%", height: 750 }}>
                            <Box sx={{ width: "100%", textAlign: "center", px: 10 }}>
                                <Typography sx={{ fontSize: "large", fontWeight: "bold", p: 1 }}>
                                    TRAINING CALENDAR {yr}
                                </Typography>
                                <Box sx={{ border: 1, borderColor: "#D8D9DA", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                                    <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA" }}><Typography>Month</Typography></Box>
                                    <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA", pr: 20 }}> <Typography>Training</Typography></Box>
                                    <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA", pr: 20 }}><Typography>Date</Typography></Box>
                                </Box>
                                <Box sx={{
                                    overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }, height: 650
                                }}>
                                    {
                                        months?.map((month, index) => (
                                            <Box key={index}>
                                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                    <Box sx={{
                                                        width: "20%", borderBottom: 1, borderLeft: 1, textAlign: "center",
                                                        borderColor: "#D8D9DA", display: "flex", flexDirection: "row", justifyContent: "center", gap: 4
                                                    }}>
                                                        <Typography
                                                            sx={{ color: "#3468C0" }}>
                                                            {month.name}     {yr}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ width: "80%" }}>
                                                        <InductionTableRows
                                                            id={month.id} year={year}
                                                            months={months} count={count} Setcount={Setcount}
                                                            datas={datas} yr={yr} setYear={setYear}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </CustomLayout>
        </Fragment >
    )
}
export default memo(InductionCalender)
