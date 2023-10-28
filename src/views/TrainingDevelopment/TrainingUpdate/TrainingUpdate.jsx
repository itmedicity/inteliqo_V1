import { Box, Grid, Paper } from '@mui/material'
import { isBefore } from 'date-fns';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore';
const TrainingUpdate = () => {
    const [tableData, setTableData] = useState([]);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department } = employeeProfileDetl;

    //view
    useEffect(() => {
        const getData = async (em_department) => {
            const result = await axioslogin.get(`/TrainingUpdate/select/${em_department}`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const object = {
                        SlNo: val.SlNo,
                        training_time: val.training_time,
                        time: moment(val.training_time).format("HH:mm:ss"),
                        training_date: val.training_date,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        desg_slno: val.desg_slno,
                        desg_name: val.desg_name,
                        name_slno: val.name_slno,
                        training_name: val.training_name,
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
                        slno: val.slno,
                        schedule_name: val.schedule_name,
                        training_count: val.training_count
                    }
                    return object;
                })
                setTableData(viewData)
            }
            else {
                setTableData([]);
            }
        }
        getData(em_department)
    }, [em_department])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'SlNo', filter: true, width: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Designation', field: 'desg_name', filter: true, width: 250 },
        { headerName: 'Training Name', field: 'training_name', filter: true, width: 250 },
        { headerName: 'Topic Name', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Duration', field: 'schedule_name', filter: true, width: 250 },
        { headerName: 'Time', field: 'time', filter: true, width: 250 },
        { headerName: 'Date', field: 'training_date', filter: true, width: 250 },
        { headerName: 'Count', field: 'training_count', filter: true, width: 250 }
    ])

    //Highlight
    const rowStyle = { background: '#CE7D78' };
    const getRowStyle = params => {
        if (isBefore(new Date(params.data.training_date), new Date())) {
            return { background: '#CE7D78' };
        }
    };

    return (
        <CustomLayout title="Training Update" displayClose={true}>
            <Box sx={{ width: "100%" }}>
                <Paper elevation={0} variant='outlined'>
                    <Grid sx={{ mt: 1, p: 1 }} item xs={9} lg={9} xl={9} md={9}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 500,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                            rowStyle={rowStyle}
                            getRowStyle={getRowStyle}
                        />
                    </Grid>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(TrainingUpdate)
