import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import { format } from 'date-fns';
import RescheduleModal from '../RescheduleModal';

const DeptPendingEmpList = ({ setShow, empdata, count, Setcount }) => {
    const [tabledata, SetTabledata] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {

        const displayData = empdata?.map((val, ndx) => {
            const object = {
                serialNo: ndx + 1,
                em_id: val.em_id,
                em_name: val.em_name,
                posttest_permission: val.posttest_permission,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                question_count: val.question_count,
                schedule_date: val.schedule_date,
                datefmt: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
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
                schedule_year: val.schedule_year,
                em_no: val.em_no,
                dept_name: val.dept_name,
                sect_name: val.sect_name
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
        { headerName: 'Sl No', field: 'serialNo', filter: true, width: 150 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
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
        <Paper>
            <CustomDashboardPage title="Pending Departmental Trainings" displayClose={true} setClose={setShow} >
                {open === true ? <RescheduleModal count={count} Setcount={Setcount} open={open} Setopen={Setopen}
                    getData={getData} tabledata={tabledata} />

                    : <Box sx={{ width: "100%", overflow: 'auto' }}>
                        <Paper sx={{ height: 800, display: 'flex', flexDirection: "column" }}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tabledata}
                                sx={{
                                    height: 700,
                                    width: "100%",
                                    mt: 1
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>

                    </Box>
                }
            </CustomDashboardPage >
        </Paper>

    )
}

export default memo(DeptPendingEmpList) 
