import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import RescheduleModal from './RescheduleModal'

const PendingList = ({ setShow, empdata, count, Setcount }) => {
    const [tabledata, SetTabledata] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const displayData = empdata?.map((val) => {
            const object = {
                em_id: val.em_id,
                em_name: val.em_name,
                posttest_permission: val.posttest_permission,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                question_count: val.question_count,
                schedule_date: val.schedule_date,
                datefmt: moment(val.schedule_date).format("YYYY-MM-DD"),
                sn: val.sn,
                slno: val.slno,
                topic: val.topic,
                topic_slno: val.topic_slno,
                training_status: val.training_status,
                training_topic_name: val.training_topic_name,
                schedule_topics: val.schedule_topics,
                schedule_remark: val.schedule_remark,
                schedule_trainers: val.schedule_trainers,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                schedule_year: val.schedule_year
            }
            return object;
        })
        SetTabledata(displayData)
    }, [empdata, SetTabledata])


    const handleClickOpen = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data);
        Setopen(true)
    }, [Setopen, SetgetData])

    const [columnDef] = useState([
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'datefmt', filter: true, width: 150 },
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
        <CustomDashboardPage title="Pending Trainings" displayClose={true} setClose={setShow} >
            {open === true ? <RescheduleModal count={count} Setcount={Setcount} open={open} Setopen={Setopen}
                getData={getData} tabledata={tabledata} />
                : <Box sx={{ width: "100%", height: 800, overflow: 'auto' }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tabledata}
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
    )
}

export default memo(PendingList)
