import { Box } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { endOfYear, format, startOfYear } from 'date-fns';
// import DashboardMonthField from 'src/views/CommonCode/DashboardMonthField';
import DashboardYearSelect from 'src/views/CommonCode/DashboardYearSelect';
import { arrayFunc } from '../../DashboardFunction';

const HodInchargeTrainingGraph = ({ em_department }) => {
    const [Bardata, SetBardata] = useState([])
    const [flag, setFlag] = useState(0)
    const [ShowBardata, SetShowBardata] = useState([])
    // const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [selectedYear, setSelectedYear] = useState(moment(new Date()).format("YYYY"));

    const chartSetting = {
        yAxis: [
            {
                label: 'Employee Count',
            },
        ],
        width: 1450,
        height: 300,
        sx: {
            [`.${axisClasses.right} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    useEffect(() => {
        const obj = {
            fromDate: format(startOfYear(new Date(selectedYear)), 'yyyy-MM-dd'),
            toDate: format(endOfYear(new Date(selectedYear)), 'yyyy-MM-dd'),
            em_department: em_department
        };
        const getData = (async () => {
            const results = await axioslogin.post('/TrainingDashboard/HodInchargeDeptTrainings', obj)
            const { success, data } = results.data
            if (success === 1) {
                SetBardata(data)
            }
            else {
                SetBardata([])
            }
        })
        getData()
    }, [selectedYear, em_department])

    useEffect(() => {
        arrayFunc(Bardata).then((val) => {
            const { status, data } = val;
            if (status === 1) {
                SetShowBardata(data)
                setFlag(1)
            }
            else {
                setFlag(0)
            }
        })
    }, [Bardata])

    const valueFormatter = (value) => `${value}`;

    const dataset = [
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Jan' },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Feb', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Mar', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Apr', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'May', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Jun', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'jul' },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Aug', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Sep', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Oct', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Nov', },
        { Schedule: 0, Attented: 0, NotAttend: 0, Completed: 0, Retest: 0, NotCompleted: 0, month: 'Dec', },

    ];

    return (
        <Paper elevation={0} sx={{ p: 1, width: '100%', flex: 1, boxShadow: 4, backgroundColor: "#FFFFFF" }}>
            <Box sx={{
                width: '100%',
            }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Box>
                        <h5>Departmental Training Graph</h5>
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
                        height: 5
                    }, gap: 2,
                    cursor: "pointer"
                }}>
                    {flag === 1 ?
                        <BarChart

                            dataset={ShowBardata}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[
                                { dataKey: "Scheule", label: 'Schedule', valueFormatter },
                                { dataKey: "Attented", label: 'Attented', valueFormatter },
                                { dataKey: "NotAttend", label: 'NotAttend', valueFormatter },
                                { dataKey: "Completed", label: 'Completed', valueFormatter },
                                { dataKey: "Retest", label: 'Retest', valueFormatter },
                                { dataKey: "NotCompleted", label: 'NotCompleted', valueFormatter },
                            ]}
                            tooltip={{ trigger: 'item' }}
                            axisHighlight={{
                                x: 'none',
                                y: 'none',
                            }}
                            {...chartSetting}
                        />
                        :
                        <BarChart

                            dataset={dataset}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[
                                { dataKey: "Schedule", label: 'Schedule', valueFormatter },
                                { dataKey: "Attented", label: 'Attented', valueFormatter },
                                { dataKey: "NotAttend", label: 'NotAttend', valueFormatter },
                                { dataKey: "Completed", label: 'Completed', valueFormatter },
                                { dataKey: "Retest", label: 'Retest', valueFormatter },
                                { dataKey: "NotCompleted", label: 'NotCompleted', valueFormatter },
                            ]}
                            tooltip={{ trigger: 'item' }}
                            axisHighlight={{
                                x: 'none',
                                y: 'none',
                            }}
                            {...chartSetting}
                        />

                    }
                </Box>
            </Box>
        </Paper>
    )
}
export default memo(HodInchargeTrainingGraph) 
