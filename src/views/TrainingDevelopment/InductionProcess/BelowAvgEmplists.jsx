
import { Box, Paper, Tooltip } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import DoneIcon from '@mui/icons-material/Done';
import InductRetestSchedule from './InductRetestSchedule';

const BelowAvgEmplists = ({ BelowAvgList, setShow, count, Setcount }) => {

    const [tabledata, SetTabledata] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const ShowData = BelowAvgList?.map((val) => {
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
                induction_date: val.induction_date,
                datefmt: moment(val.induction_date).format("YYYY-MM-DD"),
                retest: val.retest,
                em_id: val.em_id,
                em_name: val.em_name,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                postmark: val.postmark
            }
            return object
        })
        SetTabledata(ShowData)
    }, [BelowAvgList, count, SetTabledata])

    const handleReschedule = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data)
        Setopen(true)
    }, [SetgetData, Setopen])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Topic', field: 'training_topic_name', filter: true, width: 200 },
        { headerName: 'Due Date', field: 'datefmt', filter: true, width: 150 },

        {
            headerName: 'Reschedule',
            cellRenderer: params => {
                if (params.data.retest === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Done">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => handleReschedule(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="click to retest">
                            <DateRangeIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])

    return (
        <Paper>
            <CustomDashboardPage title="Below Average Employees" displayClose={true} setClose={setShow} >
                {open === true ? <InductRetestSchedule Setopen={Setopen} open={open} getData={getData} tabledata={tabledata} count={count} Setcount={Setcount} />
                    :
                    <Box sx={{ width: "100%", overflow: 'auto' }}>
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
            </CustomDashboardPage>
        </Paper>

    )
}

export default memo(BelowAvgEmplists) 
