import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import AttendanceModal from './AttendanceModal'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';

const TodayTrainings = ({ setShow, Todaydata, count, Setcount, Details }) => {
    const [todayData, SetTodayData] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const displayData = Todaydata?.map((val) => {
            const object = {
                deparment_sect: val.deparment_sect,
                department: val.department,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                schedule_topics: val.schedule_topics,
                date: val.date,
                schedule_trainers: val.schedule_trainers,
                schedule_year: val.schedule_year,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic_slno: val.topic_slno,
                traineer_name: val.traineer_name,
                training_topic_name: val.training_topic_name
            }
            return object;
        })
        SetTodayData(displayData)
    }, [Todaydata, SetTodayData])

    const handleClickOpen = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data);
        Setopen(true)
    }, [Setopen, SetgetData])


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
        <CustomDashboardPage title="Upcoming Trainings" displayClose={true} setClose={setShow} >
            {open === true ? <AttendanceModal count={count} Setcount={Setcount} open={open} Setopen={Setopen} getData={getData} Details={Details} />

                : <Box sx={{ width: "100%", height: 700, overflow: 'auto' }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={todayData}
                        sx={{
                            height: 690,
                            width: "100%",
                            mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Box>
            }
        </CustomDashboardPage>
    )
}
export default memo(TodayTrainings)
