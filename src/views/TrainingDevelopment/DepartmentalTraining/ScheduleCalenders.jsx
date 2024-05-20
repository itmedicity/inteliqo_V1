
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Box, Chip, Tooltip } from '@mui/joy';
import { endOfMonth, getYear, startOfMonth } from 'date-fns';
import TrainingonMonthModal from './TrainingonMonthModal';
import DeptTrainingRow from './DeptTrainingRow';


const ScheduleCalenders = ({ checkdata, year, setYear, count, Setcount, dept, setdept, deptSec,
    setTable, setdeptSec, EmpDetails }) => {

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
                    <h4><u> TRAINING CALENDAR {yr}</u></h4>
                    <Box sx={{ mt: 2, border: 1, backgroundColor: "#176B87", borderColor: "#D8D9DA", textAlign: "center", display: "flex", flexDirection: "row", }}>
                        <Box sx={{ color: "white", width: "20%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}><h6>MONTH</h6></Box>
                        <Box sx={{ color: "white", width: "40%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}> <h6>TOPIC</h6></Box>
                        <Box sx={{ color: "white", width: "30%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}> <h6>TRAINERS</h6></Box>
                        <Box sx={{ color: "white", width: "30%", p: 1.5, borderRight: 1, borderColor: "#D8D9DA" }}><h6>SCHEDULE DATE</h6></Box>
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
                                            width: "16.8%", borderBottom: 1, borderLeft: 1,
                                            borderColor: "#D8D9DA", display: "flex", flexDirection: "row", justifyContent: "center",
                                            bgcolor: "#EEF5FF",
                                            '&:hover': {
                                                bgcolor: '#DFF5FF',
                                            },

                                        }}>

                                            <Box onClick={(e) => OpenInsertModal(e, month)} sx={{ margin: "auto", cursor: "pointer", }}>
                                                <Tooltip title="Schedule Trainings">
                                                    <Chip
                                                        sx={{ color: "#265073", bgcolor: '#C2D9FF', my: 1, }}>
                                                        {month.name}     {yr}
                                                    </Chip>
                                                </Tooltip>
                                            </Box>

                                        </Box>
                                        <Box sx={{ width: "83.2%", backgroundColor: "#EEF5FF", }}>
                                            <DeptTrainingRow id={month.id} yr={yr} start={start}
                                                months={months} count={count} Setcount={Setcount}
                                                checkdata={checkdata} end={end} EmpDetails={EmpDetails} monthdata={monthdata} />
                                        </Box>
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
