import React, { Fragment, memo } from 'react'
import { Box, Paper } from '@mui/material'
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { InductionCalenderDetails } from 'src/redux/actions/Training.Action';
import { getMonth, getYear } from 'date-fns';
import _ from 'underscore';
import InductionTableRows from './InductionTableRows';
import { Chip } from '@mui/joy';


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
            <Paper sx={{ width: "100%", p: 1, height: 750, }}>

                <Box sx={{ mt: 2, width: "100%", height: 700, display: "flex", justifyContent: "center" }}>

                    <Box sx={{ width: "100%", textAlign: "center", px: 10 }}>

                        <h4><u>INDUCTION TRAINING CALENDAR </u></h4>
                        <Box sx={{ mt: 2, border: 1, backgroundColor: "#176B87", borderColor: "#D8D9DA", textAlign: "center", display: "flex", flexDirection: "row", }}>
                            <Box sx={{ color: "white", width: "20%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}><h6>MONTH</h6></Box>
                            <Box sx={{ color: "white", width: "40%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}> <h6>TRAINING</h6></Box>
                            <Box sx={{ color: "white", width: "40%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}><h6>SCHEDULE DATE</h6></Box>
                        </Box>
                        <Box sx={{
                            overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }, height: 600
                        }}>
                            {
                                months?.map((month, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <Box sx={{
                                                width: "20%", borderBottom: 1, borderLeft: 1,
                                                borderColor: "#D8D9DA", display: "flex", flexDirection: "row", justifyContent: "center",
                                                bgcolor: "#EEF5FF"
                                            }}>
                                                <Box sx={{ margin: "auto", }}>
                                                    <Chip
                                                        sx={{ color: "#265073", bgcolor: '#C2D9FF', my: 1, }}>
                                                        {month.name}     {yr}
                                                    </Chip>
                                                </Box>
                                            </Box>
                                            <Box sx={{ width: "80%", backgroundColor: "#EEF5FF" }}>
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
        </Fragment >
    )
}

export default memo(InductionCalender)
