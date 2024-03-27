import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { Paper } from '@material-ui/core'
import { InductionEmpAttendance } from 'src/redux/actions/Training.Action';
import InductionAttendance from './InductionAttendance';

const TodaysInduction = ({ setShow, count, Setcount, todays }) => {
    const [todayData, SetTodayData] = useState([])
    const [open, Setopen] = useState(false);
    const [topic, setTopic] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        if (topic !== 0) {
            dispatch(InductionEmpAttendance(topic))
        }
    }, [dispatch, topic, count])

    const attendance = useSelector((state) => state?.gettrainingData?.InductionAttendanceDetails?.InductionAttendanceDetailsList, _.isEqual);

    useEffect(() => {
        const displayData = todays?.map((val) => {
            const object = {
                induction_date: val.induction_date,
                date: moment(val.induction_date).format("YYYY-MM-DD"),
                schedule_slno: val.schedule_slno,
                schedule_topic: val.schedule_topic,
                schedule_type: val.schedule_type,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                trainers: val.trainers,
                training: val.training,
                pretest_status: val.pretest_status,
                post_test_status: val.post_test_status,
                online_status: val.online_status,
                offline_status: val.offline_status,
                both_status: val.both_status
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
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'date', filter: true, width: 150 },
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
            <CustomDashboardPage title="Today Training List" displayClose={true} setClose={setShow} >
                {open === true ? <InductionAttendance count={count} Setcount={Setcount} open={open} Setopen={Setopen} attendance={attendance} />

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
export default memo(TodaysInduction)
