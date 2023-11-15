import { Box, Paper } from '@mui/material'
import moment from 'moment';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import _ from 'underscore';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton as OpenIcon } from '@mui/material';
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import TrainingDetailsModalpage from './TrainingDetailsModalpage';


const ViewJoinersTable = ({ setShow, count, Setcount }) => {
    const [tableData, setTableData] = useState([]);
    const [flag, setFlag] = useState(0);
    const [userdata, setUserdata] = useState({});
    const [open, setOpen] = useState(false);

    const newJoinee = useSelector((state) => state?.gettrainingData?.newJoiners?.newJoinersList, _.isEqual)

    useEffect(() => {
        const displayData = newJoinee?.map((val) => {
            const object = {
                slno: val.slno,
                emp_id: val.emp_id,
                joining_date: moment(val.joining_date).format("DD-MM-YYYY"),
                emp_no: val.emp_no,
                em_name: val.em_name,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                sect_id: val.sect_id,
                sect_name: val.sect_name
            }
            return object;
        })
        setTableData(displayData)
    }, [newJoinee])

    //open modal
    const handleClickOpen = useCallback((params) => {
        setOpen(true);
        setUserdata(params.data);
        setFlag(1);
    }, []);


    //table
    const [columnDef] = useState([
        { headerName: 'Emp_No', field: 'emp_no', filter: true, width: 130 },
        { headerName: 'Name', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Joining Date', field: 'joining_date', filter: true, width: 150 },
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
        <CustomDashboardPage title="Training Schedule_New Joinees" displayClose={true} setClose={setShow}  >
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper variant='outlined' square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 700,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                {flag === 1 ? <TrainingDetailsModalpage count={count} Setcount={Setcount} open={open} setOpen={setOpen} setShow={setShow} userdata={userdata} /> : null}
            </Box>
        </CustomDashboardPage>
    )
}

export default memo(ViewJoinersTable)




