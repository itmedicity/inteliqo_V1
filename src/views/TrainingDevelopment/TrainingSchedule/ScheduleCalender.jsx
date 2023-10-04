import { Table, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { Fragment, memo, useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import DeptTrainingRows from './DeptTrainingRows'
import { screenInnerHeight } from 'src/views/Constant/Constant';
import { Box } from '@mui/joy';
import { isSameYear } from 'date-fns';

const ScheduleCalender = ({ year, setYear, count, Setcount, currentYear }) => {
    // console.log(year);
    const [tabledata, setTabledata] = useState([]);
    const [monthdata, setMonthdata] = useState([]);
    console.log(tabledata);

    // const yr = isSameYear(new Date(year), new Date());
    const yr = moment(year).format("YYYY");



    useEffect(() => {
        const DataTable = async () => {
            const result = await axioslogin.get('/TrainingAfterJoining/selectdepartmentalSchedule')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        slno: val.slno,
                        topic_slno: val.topic_slno,
                        em_id: val.em_id,
                        dept_name: val.dept_name,
                        schedule_year: val.schedule_year,
                        year: moment(val.schedule_year).format("YYYY"),
                        schedule_date: val.schedule_date,
                        date: moment(val.schedule_date).format("MM/DD"),
                        schedule_remark: val.schedule_remark,
                        training_topic_name: val.training_topic_name,
                        traineer_name: val.traineer_name
                    }

                    return obj;

                })
                setTabledata(viewData);
                const xx = data.map((val) => {
                    const month = {
                        schedule_month: val.schedule_month,
                        months: moment(val.schedule_month).format("MM"),
                    }
                    return month;
                })
                setMonthdata(xx);
                Setcount(0)
            } else {
                setTabledata([]);
            }
        }
        DataTable()
    }, [count])

    return (
        < Fragment >
            <Box sx={{ mt: 2, height: 700, overflow: 'auto' }}>
                <Typography sx={{ fontSize: "large", fontWeight: "bold", textAlign: "center", p: 1 }}>
                    TRAINING CALENDAR {yr}
                </Typography>
                {/* <Box>
                    {
                        tabledata?.map((val, index) => {
                            <Box key={index} sx={{ display: "flex", flexDirection: "row", px: 5 }}>

                                <Box sx={{ width: "20%", backgroundColor: "lightgreen" }}>
                                    {val.months}
                                </Box>

                                <Box sx={{ width: "80%", backgroundColor: "lightskyblue" }}>george</Box>
                            </Box>
                        })
                    }



                </Box> */}

                <Box>
                    {monthdata?.map((val, index) => (
                        <Box key={index} sx={{ display: "flex", flexDirection: "row", px: 5 }}>
                            <Box sx={{ width: "20%", backgroundColor: "lightgreen" }}>
                                {val.months}
                            </Box>
                            <Box>
                                <DeptTrainingRows tabledata={tabledata} setTabledata={setTabledata} count={count} Setcount={Setcount} />

                            </Box>
                            {/* {
                                tabledata?.map((item, ndx) => (
                                    <Box key={ndx}>
                                        <Box sx={{ width: "80%", backgroundColor: "lightskyblue" }}>
                                            {item.training_topic_name}
                                        </Box>
                                    </Box>
                                ))
                            } */}
                        </Box>
                    ))}
                </Box>

                {/* <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '20%', textAlign: "center" }}>Month</TableCell>
                                <TableCell style={{ width: '20%', textAlign: "center" }}>Training Topics</TableCell>
                                <TableCell style={{ width: '20%', textAlign: "center" }}>Trainers Name</TableCell>
                                <TableCell style={{ width: '20%', textAlign: "center" }}>Schedule Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <DeptTrainingRows currentYear={currentYear} tabledata={tabledata} setTabledata={setTabledata} count={count} Setcount={Setcount} />
                    </Table>
                </TableContainer> */}
            </Box>
        </Fragment >
    )
}

export default memo(ScheduleCalender)
