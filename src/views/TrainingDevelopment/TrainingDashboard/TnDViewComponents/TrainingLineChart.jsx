import { Box } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
//import { endOfMonth, startOfMonth } from 'date-fns';
// import DashboardMonthField from 'src/views/CommonCode/DashboardMonthField';
import DashboardYearSelect from 'src/views/CommonCode/DashboardYearSelect';
import { endOfYear, format, startOfYear, subYears } from 'date-fns';
import { LineChart } from '@mui/x-charts';
import { arrLineGraphFunc } from '../DashboardLineGraph';

const TrainingLineChart = () => {
    const [data, SetData] = useState([]);
    const [NAdata, SetNAdata] = useState([]);
    const [schedule, setschedule] = useState(0)
    const [flag, setFlag] = useState(0)
    const [retest, setRetest] = useState(0)
    const [notattended, setNotattended] = useState(0)
    // const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [selectedYear, setSelectedYear] = useState(format(subYears(new Date(), 0), 'yyyy'));

    const monthArr = [
        { id: 1, name: "Jan" }, { id: 2, name: "Feb" }, { id: 3, name: "Mar" }, { id: 4, name: "Apr" },
        { id: 5, name: "May" }, { id: 6, name: "Jun" }, { id: 7, name: "Jul" }, { id: 8, name: "Aug" },
        { id: 9, name: "Sep" }, { id: 10, name: "Oct" }, { id: 11, name: "Nov" }, { id: 12, name: "Dec" }
    ];

    useEffect(() => {
        const obj = {
            fromDate: format(startOfYear(new Date(selectedYear)), 'yyyy-MM-dd'),
            toDate: format(endOfYear(new Date(selectedYear)), 'yyyy-MM-dd')
        };
        const getData = (async (obj) => {
            const results = await axioslogin.post('/TrainingDashboard/linechart', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetData(data)
            }
            else {
                SetData([])
            }
        })
        getData(obj)

        const NotAttended = (async (obj) => {
            const results = await axioslogin.post('/TrainingDashboard/notAttend', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetNAdata(data)
            }
            else {
                SetNAdata([])
            }
        })
        NotAttended(obj)
    }, [selectedYear])

    useEffect(() => {
        arrLineGraphFunc(data, NAdata).then((val) => {
            const { status, schedule, retest, notattnd } = val;
            if (status === 1) {
                setschedule(schedule)
                setRetest(retest)
                setNotattended(notattnd)
                setFlag(1)
            }
            else {
                setFlag(0)
            }
        })
    }, [data, NAdata])

    return (
        <Paper elevation={0} sx={{ width: '100%', flex: 1, p: 1, boxShadow: 4, }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                    <Box>
                        <h5>Induction Training Graph</h5>
                    </Box>
                    <Box>
                        <DashboardYearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                    </Box>
                    {/* <Box>
                        <DashboardMonthField month={month} setMonth={setMonth} />
                    </Box> */}
                </Box>

                <Box sx={{
                    overflow: "auto", '&::-webkit-scrollbar': {
                        height: 5,
                        cursor: "pointer"
                    }, gap: 2,
                }}>
                    {flag === 1 ?
                        <LineChart
                            sx={{ pt: .5 }}
                            width={750}
                            height={300}
                            series={[
                                { data: schedule, label: 'Schedule' },
                                { data: retest, label: 'Retest' },
                                { data: notattended, label: 'Not Attended' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: monthArr?.map((val) => val.name) }]}
                        />
                        : null}
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(TrainingLineChart)

