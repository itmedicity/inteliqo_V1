import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { TrainingAttendance } from 'src/redux/actions/Training.Action'
import _ from 'underscore'
import { format } from 'date-fns'
import AttendanceModal from '../AttendanceModal';

const TodaysDeptTrainings = ({ setShow, count, Setcount, todays }) => {
    const [todayData, SetTodayData] = useState([])
    const [open, Setopen] = useState(false);
    const [topic, setTopic] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        if (topic !== 0) {
            dispatch(TrainingAttendance(topic))
        }
    }, [dispatch, topic, count])

    const attendance = useSelector((state) => state?.gettrainingData?.Attendance?.AttendanceList, _.isEqual);

    useEffect(() => {
        const displayData = todays?.map((val) => {
            const object = {
                deparment_sect: val.deparment_sect,
                department: val.department,
                schedule_year: val.schedule_year,
                schedule_date: val.schedule_date,
                date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                slno: val.slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                dept_name: val.dept_name,
                sect_name: val.sect_name,
                serialNo: val.serialNo
            }
            return object;
        })
        SetTodayData(displayData)
    }, [todays, SetTodayData])

    const handleClickOpen = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { topic_slno } = data[0]
        setTopic(topic_slno);
        Setopen(true)
    }, [Setopen, setTopic])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'serialNo', filter: true, width: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        {
            headerName: 'Action', cellRenderer: params =>
                <OpenIcon sx={{ paddingY: 0.5 }}
                    onClick={(e) => handleClickOpen(params)}
                >
                    <LaunchIcon color='primary' />
                </OpenIcon>
        }
    ])
    return (
        <Paper elevation={0}>
            <CustomDashboardPage title="Today Departmental Trainings" displayClose={true} setClose={setShow} >
                {open === true ? <AttendanceModal count={count} Setcount={Setcount} open={open} Setopen={Setopen} attendance={attendance} />
                    :
                    <Box sx={{ width: "100%", height: 500, overflow: 'auto' }}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={todayData}
                            sx={{
                                height: 400,
                                width: "100%",
                                mt: 1
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Box>
                }
            </CustomDashboardPage>
        </Paper>
    )
}
export default memo(TodaysDeptTrainings) 
