import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import EmpVerification from './EmpVerification';

const AllowPostTest = ({ setShow, allot, count, Setcount }) => {

    const [data, SetData] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);

    useEffect(() => {
        const displayData = allot?.map((val) => {
            const object = {
                em_id: val.em_id,
                em_name: val.em_name,
                posttest_permission: val.posttest_permission,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                question_count: val.question_count,
                schedule_date: val.schedule_date,
                sn: val.sn,
                slno: val.slno,
                topic: val.topic,
                topic_slno: val.topic_slno,
                training_status: val.training_status,
                training_topic_name: val.training_topic_name,
                video_time: val.video_time,
                pdf_time: val.pdf_time
            }
            return object;
        })
        SetData(displayData)
    }, [allot, SetData])

    const AllowtoPostTest = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data);
        Setopen(true)
    }, [Setopen])

    const [columnDef] = useState([
        { headerName: 'Employee Names', field: "training_topic_name", filter: true, width: 250 },
        {
            headerName: 'Action', cellRenderer: params =>
                <OpenIcon sx={{ paddingY: 0.5 }}
                    onClick={(e) => AllowtoPostTest(params)}
                >
                    <LaunchIcon color='primary' />
                </OpenIcon>
        }
    ])
    return (
        <CustomDashboardPage title="Verification" displayClose={true} setClose={setShow} >
            {open === true ? <EmpVerification count={count} Setcount={Setcount} open={open} Setopen={Setopen} getData={getData} allot={allot} />
                :
                <Box sx={{ width: "100%", height: 800, overflow: 'auto' }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={data}
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

export default memo(AllowPostTest) 
