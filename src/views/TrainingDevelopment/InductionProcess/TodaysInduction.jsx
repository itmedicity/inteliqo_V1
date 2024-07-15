import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { Paper } from '@material-ui/core'
import { InductionEmpAttendance } from 'src/redux/actions/Training.Action';
import InductionAttendance from './InductionAttendance';
import { format } from 'date-fns';

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
                induct_detail_date: val.induct_detail_date,
                date: format(new Date(val.induct_detail_date), "dd-MM-yyyy"),
                schedule_slno: val.schedule_slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name
            }
            return object;
        })
        //const filarray = displayData?.find((val) => val.topic_slno !== 0)
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
            <CustomDashboardPage title="Induction Today Training List" displayClose={true} setClose={setShow} >
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
