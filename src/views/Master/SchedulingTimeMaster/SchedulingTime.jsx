import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, CssVarsProvider } from '@mui/joy';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import SaveIcon from '@mui/icons-material/Save';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';

const SchedulingTime = () => {
    const [schedule_name, setSchedule_name] = useState('');
    const [schedule_status, setSchedule_status] = useState(false);
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [flag, setFlag] = useState(0);
    const [slno, setSlno] = useState(0);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //postdata
    const postdata = useMemo(() => {
        return {
            schedule_name: schedule_name,
            schedule_status: schedule_status === true ? 1 : 0,
            create_user: em_id
        }
    }, [schedule_name, schedule_status, em_id])

    //reset
    const reset = useCallback(() => {
        setSchedule_name('');
        setSchedule_status(false);
    }, [])

    //patchdata
    const patchdata = useMemo(() => {
        return {
            schedule_name: schedule_name,
            schedule_status: schedule_status === true ? 1 : 0,
            edit_user: em_id,
            slno: slno
        }
    }, [schedule_name, schedule_status, em_id, slno])
    // view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/SchedulingTime/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        slno: val.slno,
                        schedule_name: val.schedule_name,
                        schedule_status: val.schedule_status,
                        statusChecked: val.schedule_status === 0 ? "NO" : "YES"
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
        const { slno, schedule_name, schedule_status
        } = data[0]
        setSlno(slno);
        setSchedule_name(schedule_name);
        setSchedule_status(schedule_status === 1 ? true : false);
    }, [])

    //delete
    const deleteValue = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { slno } = data[0]
        if (slno !== 0) {
            const patchdata = {
                slno: slno
            }
            const dataDelete = async (patchdata) => {
                const result = await axioslogin.patch(`/SchedulingTime/delete`, patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setCount(count + 1);
                }
            }
            dataDelete(patchdata)
        }
    }, [count])

    const submitSchedulingTime = useCallback(() => {
        const insertData = async (postdata) => {
            const result = await axioslogin.post('/SchedulingTime/insert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                reset();
            }
            else if (success === 0) {
                warningNofity(message)
                reset();
            }
            else {
                warningNofity(message)
                reset();
            }
        }

        //update
        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/SchedulingTime/update', patchdata)
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
            insertData(postdata)
        }
        else {
            EditData(patchdata)
        }
    }, [postdata, patchdata, reset, count, flag])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'slno', filter: true, width: 150 },
        { headerName: 'Schedule ', field: 'schedule_name', filter: true, width: 250 },
        { headerName: 'Status ', field: 'statusChecked', filter: true, width: 250 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => getDataTable(params)}
                    >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
        {
            headerName: 'Delete', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => deleteValue(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
    ])
    return (
        <CustomLayout title="Time Scheduling Master" displayClose={true}>
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        placeholder='Schedule'
                                        id='schedule_name'
                                        size="small"
                                        value={schedule_name}
                                        name="schedule_name"
                                        onChange={(e) => setSchedule_name(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="schedule_status"
                                                color="primary"
                                                value={schedule_status}
                                                checked={schedule_status}
                                                className="ml-1"
                                                onChange={(e) => setSchedule_status(e.target.checked)}
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
                                            onClick={submitSchedulingTime}
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
        </CustomLayout >
    )
}

export default memo(SchedulingTime)
