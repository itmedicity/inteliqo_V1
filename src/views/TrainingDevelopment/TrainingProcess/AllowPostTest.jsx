import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import EmpVerification from './EmpVerification';

const AllowPostTest = ({ setShow, Details, datastore, count, Setcount }) => {

    const [data, SetData] = useState([])
    const [open, Setopen] = useState(false);
    const [getData, SetgetData] = useState([]);


    useEffect(() => {
        const displayData = datastore?.map((val) => {
            const object = {
                training_status: val.training_status,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                em_id: val.em_id,
                em_name: val.em_name,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                emp_name: val.emp_name,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                datefmt: val.datefmt,
                sn: val.sn,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic: val.topic,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                posttest_permission: val.posttest_permission
            }
            return object;
        })
        SetData(displayData)
    }, [datastore, SetData])


    const AllowtoPostTest = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetgetData(data);
        Setopen(true)
    }, [Setopen])

    const [columnDef] = useState([
        { headerName: 'Employee Names', field: "training_topic_name", filter: true, width: 250 },
        { headerName: 'Department', field: "datefmt", filter: true, width: 150 },
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
            {open === true ? <EmpVerification unt={count} Setcount={Setcount} open={open} Setopen={Setopen} getData={getData} Details={Details} />
                :
                <Box sx={{ width: "100%", height: 700, overflow: 'auto' }}>
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
