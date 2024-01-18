import { Button, CssVarsProvider } from '@mui/joy';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
import SaveIcon from '@mui/icons-material/Save';
import TrainingTypeSelect from 'src/views/MuiComponents/TrainingTypeSelect';
import TrainingCategorySelect from 'src/views/MuiComponents/TrainingCategorySelect';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const TrainingName = () => {
    const [trainingtype, settrainingtype] = useState(0);
    const [trainingcategory, settrainingcategory] = useState(0);
    const [training_name, setTraining_name] = useState('');
    const [training_name_status, setTraining_name_status] = useState(false);
    const [count, setCount] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [name_slno, setName_slno] = useState(0);
    const [flag, setFlag] = useState(0);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //postdata
    const PostData = useMemo(() => {
        return {
            training_name: training_name,
            type_slno: trainingtype,
            cate_slno: trainingcategory,
            name_status: training_name_status === true ? 1 : 0,
            create_user: em_id
        }
    }, [training_name, trainingtype, trainingcategory, training_name_status, em_id])

    //patchdata
    const PatchData = useMemo(() => {
        return {
            name_slno: name_slno,
            training_name: training_name,
            type_slno: trainingtype,
            cate_slno: trainingcategory,
            name_status: training_name_status === true ? 1 : 0,
            edit_user: em_id
        }
    }, [training_name, trainingtype, trainingcategory, training_name_status, em_id, name_slno])

    //reset
    const reset = useCallback(() => {
        settrainingtype(0);
        settrainingcategory(0);
        setTraining_name('');
        setTraining_name_status(false)
    }, [])

    //table view
    useEffect(() => {
        const DataTable = async () => {
            const result = await axioslogin.get('/TrainingName/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        name_slno: val.name_slno,
                        trainingtype_slno: val.trainingtype_slno,
                        type_name: val.type_name,
                        cat_slno: val.cat_slno,
                        trin_cat_name: val.trin_cat_name,
                        training_name: val.training_name,
                        name_status: val.name_status,
                        statusdesc: val.name_status === 0 ? "NO" : "YES"
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

    //ClickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { name_slno, trainingtype_slno, cat_slno, training_name, name_status } = data[0]
        settrainingtype(trainingtype_slno);
        settrainingcategory(cat_slno);
        setTraining_name(training_name);
        setTraining_name_status(name_status === 1 ? true : false)
        setName_slno(name_slno);
    }, [])

    //ClickDelete
    const DeleteRow = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { name_slno } = data[0]
        const id = name_slno;
        const patchdata = {
            name_slno: name_slno
        }
        if (id !== 0) {
            const dataDelete = async (patchdata) => {
                const result = await axioslogin.patch(`/TrainingName/delete`, patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setCount(count + 1);
                }
                else {
                    warningNofity(message)
                }
            }
            dataDelete(patchdata)
        }
    }, [count])

    const submitTrainingName = useCallback(() => {
        //insert
        const InsertData = async (PostData) => {
            const result = await axioslogin.post('/TrainingName/insert', PostData)
            const { message, success } = result.data
            if (success === 1) {
                setCount(count + 1);
                reset();
                succesNofity(message)
                setFlag(0)
            }
            else {
                warningNofity(message)
                reset();
                setFlag(0)
            }
        }
        //Edit
        const EdiData = async (PatchData) => {
            const result = await axioslogin.patch('/TrainingName/update', PatchData)
            const { message, success } = result.data
            if (success === 2) {
                reset();
                setCount(count + 1)
                succesNofity(message)
                setName_slno(0);
                setFlag(0);
            }
            else {
                warningNofity(message)
                reset();
                setName_slno(0);
            }
        }

        if (flag === 0) {
            InsertData(PostData)
        }
        else {
            EdiData(PatchData)
        }

    }, [PostData, PatchData, count, flag, reset])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'name_slno', filter: true, width: 150 },
        { headerName: 'Training Type', field: 'type_name', filter: true, width: 250 },
        { headerName: 'Training Category Name ', field: 'trin_cat_name', filter: true, width: 280 },
        { headerName: 'Training Name ', field: 'training_name', filter: true, width: 250 },
        { headerName: 'Status ', field: 'statusdesc', filter: true, width: 250 },

        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        },

        {
            headerName: 'Delete', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => DeleteRow(params)}>
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
    ])

    return (
        <CustomSettingsLayout title="Training Name Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box>
                                    <TrainingTypeSelect value={trainingtype} setValue={settrainingtype} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TrainingCategorySelect value={trainingcategory} setValue={settrainingcategory} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Training Name'
                                        id='training_name'
                                        size="small"
                                        value={training_name}
                                        name="training_name"
                                        onChange={(e) => setTraining_name(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="status"
                                                color="primary"
                                                value={training_name_status}
                                                checked={training_name_status}
                                                className="ml-1"
                                                onChange={(e) => setTraining_name_status(e.target.checked)}
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
                                            onClick={submitTrainingName}
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

export default memo(TrainingName)
