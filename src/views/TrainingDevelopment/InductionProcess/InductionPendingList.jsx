import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import InductReschedule from './InductReschedule';
import { format } from 'date-fns';

const InductionPendingList = ({ setShow, pendingEmp, count, Setcount }) => {
    const [tabledata, SetTabledata] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const displayData = pendingEmp?.map((val) => {
            const object = {
                sn: val.sn,
                induction_slno: val.induction_slno,
                schedule_no: val.schedule_no,
                indct_emp_no: val.indct_emp_no,
                induct_emp_dept: val.induct_emp_dept,
                induct_emp_sec: val.induct_emp_sec,
                training_status: val.training_status,
                question_count: val.question_count,
                pretest_status: val.pretest_status,
                posttest_status: val.posttest_status,
                online_mode: val.online_mode,
                offline_mode: val.offline_mode,
                retest: val.retest,
                em_id: val.em_id,
                em_name: val.em_name,
                em_no: val.em_no,
                schedule_topic: val.schedule_topic,
                induct_detail_date: val.induct_detail_date,
                datefmt: format(new Date(val.induct_detail_date), "dd-MM-yyyy"),
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                trainers: val.trainers,
                schedule_type: val.schedule_type
            }
            return object;
        })
        SetTabledata(displayData)
    }, [pendingEmp, SetTabledata])


    const handleClickOpen = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data);
        Setopen(true)
    }, [Setopen, SetgetData])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Topics', field: 'training_topic_name', filter: true, width: 250 },
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
            <CustomDashboardPage title="Induction Training Pending List" displayClose={true} setClose={setShow} >
                {open === true ? <InductReschedule count={count} Setcount={Setcount} open={open} Setopen={Setopen}
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
export default memo(InductionPendingList)



