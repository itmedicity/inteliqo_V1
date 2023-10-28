
import { Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Box } from '@mui/joy';
import { endOfMonth, getYear, startOfMonth } from 'date-fns';
import DeptTrainingRow from './DeptTrainingRow';
import TrainingonMonthModal from './TrainingonMonthModal';


const ScheduleCalenders = ({ checkdata, year, setYear, count, Setcount, dept, setdept, deptSec,
    setTable, setdeptSec }) => {

    const [insertModal, setinsetmodal] = useState(0);
    const [open, setOpen] = useState(false);
    const [monthdata, setmonthData] = useState(0);
    const yr = getYear(new Date(year))

    const months = [
        { id: 0, name: "Jan" }, { id: 1, name: "Feb" }, { id: 2, name: "Mar" }, { id: 3, name: "Apr" },
        { id: 4, name: "May" }, { id: 5, name: "Jun" }, { id: 6, name: "Jul" }, { id: 7, name: "Aug" },
        { id: 8, name: "Sep" }, { id: 9, name: "Oct" }, { id: 10, name: "Nov" }, { id: 11, name: "Dec" }
    ];

    const OpenInsertModal = useCallback((e, month) => {

        setinsetmodal(1);
        setOpen(true);
        const monthId = month.id
        setmonthData(monthId);

    }, [setinsetmodal, setOpen])

    const date = new Date(yr, monthdata, 1);
    const start = startOfMonth(new Date(date))
    const end = endOfMonth(new Date(date))

    return (
        < Fragment >
            <Box sx={{ mt: 2, height: 600, width: "100%" }}>
                <Box sx={{ width: "100%", textAlign: "center", px: 10 }}>
                    <Typography sx={{ fontSize: "large", fontWeight: "bold", p: 1 }}>
                        TRAINING CALENDAR {yr}
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "#D8D9DA", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                        <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA" }}><Typography>Month</Typography></Box>
                        <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA" }}> <Typography>Topics</Typography></Box>
                        <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA" }}><Typography>Trainers</Typography></Box>
                        <Box sx={{ width: "20%", p: 2, borderRight: 1, borderColor: "#D8D9DA" }}><Typography>Scheduled Date</Typography></Box>
                    </Box>
                    <Box sx={{
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }, height: 600
                    }}>
                        {
                            months?.map((month, index) => (
                                <Box key={index} sx={{ display: "flex", flexDirection: "row" }}>
                                    <Box sx={{ width: "20%", borderBottom: 1, borderLeft: 1, borderColor: "#D8D9DA" }}>
                                        <Typography
                                            onClick={(e) => OpenInsertModal(e, month)}
                                            sx={{
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                color: "blue"
                                            }}
                                        >
                                            {month.name}     {yr}

                                        </Typography>

                                    </Box>
                                    <Box sx={{ width: "80%" }}>
                                        <DeptTrainingRow
                                            id={month.id} yr={yr}
                                            months={months} count={count} Setcount={Setcount}
                                            checkdata={checkdata}
                                        />
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>

            {
                insertModal === 1 ? <TrainingonMonthModal checkdata={checkdata} setTable={setTable} dept={dept}
                    monthdata={monthdata} setdept={setdept} deptSec={deptSec} setdeptSec={setdeptSec} year={year} setYear={setYear}
                    open={open} setinsetmodal={setinsetmodal} setOpen={setOpen} count={count} Setcount={Setcount}
                    start={start} end={end}
                /> : null


            }
        </Fragment >
    )
}

export default memo(ScheduleCalenders)
