import { Button, CssVarsProvider } from '@mui/joy';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Paper } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SaveIcon from '@mui/icons-material/Save';
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux';
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import EmpBasedonDept from 'src/views/MuiComponents/EmpBasedonDept';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Fragment } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';

const TrainerName = () => {
    const [trainer_name_status, setTrainer_name_status] = useState(false);
    const [desSelect, setdesSelect] = useState(0);
    const [depttype, setdepttype] = useState(0);
    const [empSelect, setempSelect] = useState(0);
    const [count, setCount] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [flag, setFlag] = useState(0);
    const [id, setId] = useState(0);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //postdata
    const PostData = useMemo(() => {
        return {
            trainer_dept: depttype,
            trainer_desig: desSelect,
            trainer_name: empSelect,
            trainer_status: trainer_name_status === true ? 1 : 0,
            create_user: em_id
        }
    }, [depttype, desSelect, empSelect, trainer_name_status, em_id])

    //patchdata
    const PatchData = useMemo(() => {
        return {
            trainer_slno: id,
            trainer_dept: depttype,
            trainer_desig: desSelect,
            trainer_name: empSelect,
            trainer_status: trainer_name_status === true ? 1 : 0,
            edit_user: em_id
        }
    }, [id, depttype, desSelect, empSelect, trainer_name_status, em_id])

    //reset
    const reset = useCallback(() => {
        setTrainer_name_status(false);
        setdesSelect(0);
        setdepttype(0);
        setempSelect(0);
    }, [])

    //views
    useEffect(() => {
        const DataTable = async () => {
            const result = await axioslogin.get('/TrainerName/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        trainer_slno: val.trainer_slno,
                        desg_slno: val.desg_slno,
                        desg_name: val.desg_name,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        em_id: val.em_id,
                        em_name: val.em_name,
                        trainer_status: val.trainer_status,
                        statusdesc: val.trainer_status === 0 ? "NO" : "YES"
                    }
                    return obj;
                })
                setTabledata(viewData);
                setCount(0)
            } else {
                setTabledata([]);
            }
        }
        DataTable()
    }, [count])

    //Delete
    const DeleteRow = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { trainer_slno } = data[0]
        const id = trainer_slno;
        const PatchData = {
            trainer_slno: trainer_slno
        }
        if (id !== 0) {
            const dataDelete = async () => {
                const result = await axioslogin.patch(`/TrainerName/delete`, PatchData)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setCount(count + 1);
                }
                else {
                    warningNofity(message)
                }
            }
            dataDelete()
        }
    }, [count])

    //ClickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { trainer_slno, em_id, desg_slno, dept_id, trainer_status } = data[0]
        setempSelect(em_id);
        setdesSelect(desg_slno);
        setdepttype(dept_id);
        setTrainer_name_status(trainer_status === 1 ? true : false);
        setId(trainer_slno);
    }, [])

    const submitTrainerName = useCallback(() => {
        //insert
        const InsertData = async (PostData) => {
            if (desSelect !== 0 && depttype !== 0 && empSelect !== 0) {
                const result = await axioslogin.post('/TrainerName/insert', PostData)
                const { message, success } = result.data
                if (success === 1) {
                    reset();
                    setCount(count + 1)
                    succesNofity(message)
                    setFlag(0);
                }
                else {
                    warningNofity(message)
                }
            }
            else {
                warningNofity("Please Fill the Fields")
            }
        }

        //Edit
        const EditData = async (PatchData) => {
            const result = await axioslogin.patch('/TrainerName/update', PatchData)
            const { message, success } = result.data
            if (success === 2) {
                reset();
                setCount(count + 1)
                succesNofity(message)
                setId(0);
                setFlag(0);
            }
            else {
                warningNofity(message)
            }
        }

        if (flag === 0) {
            InsertData(PostData)
        }
        else {
            EditData(PatchData)
        }
    }, [PostData, count, PatchData, depttype, desSelect, empSelect, flag, reset])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'trainer_slno', filter: true, width: 150 },
        { headerName: 'Trainer Name', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Trainer Department ', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Trainer Designation', field: 'desg_name', filter: true, minWidth: 250 },
        { headerName: 'Status ', field: 'statusdesc', filter: true, width: 250 },

        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => getDataTable(params)}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        },

        {
            headerName: 'Delete', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => DeleteRow(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
    ])

    return (
        <CustomSettingsLayout title="Trainer Name Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box sx={{ mt: 1 }}>
                                    <DeptSelectByRedux value={depttype} setValue={setdepttype} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <DesignationSelectRedux value={desSelect} setValue={setdesSelect} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <EmpBasedonDept depttype={depttype} value={empSelect} setValue={setempSelect} />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="status"
                                                color="primary"
                                                value={trainer_name_status}
                                                checked={trainer_name_status}
                                                className="ml-1"
                                                onChange={(e) => setTrainer_name_status(e.target.checked)}
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
                                            onClick={submitTrainerName}
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

export default memo(TrainerName)
