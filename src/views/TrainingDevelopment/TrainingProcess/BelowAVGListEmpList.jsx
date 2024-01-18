import { Box, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import RetestScheduleModal from './RetestScheduleModal';
import DoneIcon from '@mui/icons-material/Done';

const BelowAVGListEmpList = ({ BelowAvgList, setShow, count, Setcount }) => {

    const [tabledata, SetTabledata] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const ShowData = BelowAvgList?.map((val) => {
            const object = {
                candid_id: val.candid_id,
                em_name: val.em_name,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                posttest_permission: val.posttest_permission,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                question_count: val.question_count,
                training_status: val.training_status,
                schedule_date: val.schedule_date,
                datefmt: moment(val.schedule_date).format("YYYY-MM-DD"),
                slno: val.slno,
                sn: val.sn,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                retest_status: val.retest_status
            }
            return object
        })
        SetTabledata(ShowData)
    }, [BelowAvgList, SetTabledata])


    const handleReschedule = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data)
        Setopen(true)
    }, [SetgetData, Setopen])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Topic', field: 'training_topic_name', filter: true, width: 200 },
        { headerName: 'Schedule Date', field: 'datefmt', filter: true, width: 150 },
        // {
        //     headerName: 'Action', cellRenderer: params =>
        //         <OpenIcon sx={{ paddingY: 0.5 }}
        //             onClick={(e) => handleReschedule(params)}
        //         >
        //             <Tooltip title="Test Reschedule">
        //                 <DateRangeIcon color='primary' />
        //             </Tooltip>
        //         </OpenIcon>
        // }


        {
            headerName: 'Reschedule ',
            cellRenderer: params => {
                if (params.data.retest_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Done">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else if (params.data.retest_status === 0) {
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
        <CustomDashboardPage title="Pending Trainings" displayClose={true} setClose={setShow} >
            {open === true ? <RetestScheduleModal Setopen={Setopen} open={open} getData={getData} tabledata={tabledata} count={count} Setcount={Setcount} />
                :
                <Box sx={{ width: "100%", height: 800, overflow: 'auto' }}>
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
                </Box>
            }
        </CustomDashboardPage>
    )
}

export default BelowAVGListEmpList
