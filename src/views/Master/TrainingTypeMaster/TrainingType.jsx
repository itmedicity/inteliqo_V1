import { Button, CssVarsProvider } from '@mui/joy';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
import SaveIcon from '@mui/icons-material/Save';
import { axioslogin } from 'src/views/Axios/Axios';
import { useCallback } from 'react';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import _ from 'underscore';


const TrainingType = () => {

    const [type, setType] = useState('');
    const [status, SetStatus] = useState(false);
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [slno, setSlno] = useState(0);
    const [flag, setFlag] = useState(0);
    const [countDay, setcountDay] = useState('')

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const reset = () => {
        setType('');
        setcountDay('');
        SetStatus(false);
    }
    //postData
    const postData = useMemo(() => {
        return {
            type_name: type,
            count_day: countDay,
            type_status: status === true ? 1 : 0,
            create_user: em_id
        }
    }, [type, countDay, status, em_id])

    //patchData
    const patchData = useMemo(() => {
        return {
            trainingtype_slno: slno,
            type_name: type,
            count_day: countDay,
            type_status: status,
            edit_user: em_id
        }
    }, [slno, type, countDay, status, em_id])

    // view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/TrainingType/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        trainingtype_slno: val.trainingtype_slno,
                        type_name: val.type_name,
                        type_date: val.type_date,
                        count_day: val.count_day,
                        type_status: val.type_status,
                        statusChecked: val.type_status === 0 ? "NO" : "YES"
                    }
                    return obj;
                })
                setTableData(viewData);
                setCount(0)
            } else {
                setTableData([]);
            }
        }
        getData()
    }, [count])

    //clickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { trainingtype_slno, count_day, type_name, type_status } = data[0]
        setSlno(trainingtype_slno);
        setType(type_name);
        setcountDay(count_day);
        SetStatus(type_status === 1 ? true : false);
    }, [])

    //submit
    const submitTrainingType = useCallback(() => {
        //insert
        const insertData = async (postData) => {
            const result = await axioslogin.post('/TrainingType/insert', postData)
            const { success, message } = result.data
            if (success === 1) {
                setCount(count + 1)
                reset();
                succesNofity(message)
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
                reset();
            } else {
                infoNofity(message)
                reset();
            }
        }

        //update
        const EditData = async (patchData) => {
            const result = await axioslogin.patch('/TrainingType/update', patchData)
            const { message, success } = result.data
            if (success === 2) {
                succesNofity(message);
                reset()
                setCount(count + 1)
                setSlno(0)
                setFlag(0)
            }
            else {
                warningNofity(message)
                reset();
            }
        }
        if (flag === 0) {
            insertData(postData)
        }
        else {
            EditData(patchData)
        }
    }, [patchData, postData, count, flag])

    //delete
    const deleteValue = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { trainingtype_slno } = data[0]
        if (trainingtype_slno !== 0) {
            const patchdata = {
                trainingtype_slno: trainingtype_slno
            }
            const dataDelete = async (patchdata) => {
                const result = await axioslogin.patch(`/TrainingType/delete/data`, patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setCount(count + 1);
                }
            }
            dataDelete(patchdata)
        }
    }, [count])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'trainingtype_slno', filter: true, width: 150 },
        { headerName: 'Training Name ', field: 'type_name', filter: true, width: 300 },
        { headerName: 'Due Days ', field: 'count_day', filter: true, width: 250 },
        { headerName: 'Status ', field: 'statusChecked', filter: true, width: 150 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
        {
            headerName: 'Delete', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => deleteValue(params)} >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
    ])

    return (
        <CustomSettingsLayout title="Training Type Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        placeholder='Training Type Name'
                                        id='training_type'
                                        size="small"
                                        value={type}
                                        name="training_type"
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: 1, display: "flex", flexDirection: "row", gap: 2 }}>
                                    <Box sx={{ width: "50%" }}>
                                        <TextField
                                            fullWidth
                                            // placeholder='Training Type Name'
                                            id='count_day'
                                            size="small"
                                            value={countDay}
                                            name="count_day"
                                            onChange={(e) => setcountDay(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ mt: 1, width: "50%" }}>
                                        <Typography>Days</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="status"
                                                color="primary"
                                                value={status}
                                                checked={status}
                                                className="ml-1"
                                                onChange={(e) => SetStatus(e.target.checked)}
                                            />
                                        }
                                        label="Status"
                                    />
                                </Box>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitTrainingType}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={9} lg={9} xl={9} md={9}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 500,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </CustomSettingsLayout >
    )
}

export default memo(TrainingType) 
