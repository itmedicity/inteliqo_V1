import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Checkbox, FormControlLabel, Grid, Paper, TextField, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import TrainingTypeSelect from 'src/views/MuiComponents/TrainingTypeSelect';
import { useMemo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const TrainingCategory = () => {
    const [cat_name, setCat_name] = useState('');
    const [cat_status, setCat_status] = useState(false);
    const [trainingtype, settrainingtype] = useState(0)
    const [tableData, setTabledata] = useState([]);
    const [count, setCount] = useState(0);
    const [cat_Id, setCat_Id] = useState(0);
    const [flag, setFlag] = useState(0);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //PostData
    const PostData = useMemo(() => {
        return {
            trning_typeslno: trainingtype,
            trin_cat_name: cat_name,
            cat_status: cat_status === true ? 1 : 0,
            create_user: em_id
        }
    }, [trainingtype, cat_name, cat_status, em_id])

    //PatchData
    const PatchData = useMemo(() => {
        return {
            cat_slno: cat_Id,
            trning_typeslno: trainingtype,
            trin_cat_name: cat_name,
            cat_status: cat_status === true ? 1 : 0,
            edit_user: em_id
        }
    }, [cat_Id, trainingtype, cat_name, cat_status, em_id])

    //reset
    const reset = useCallback(() => {
        settrainingtype(0);
        setCat_name('');
        setCat_status(false);
    }, [])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('TrainingCategory/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        cat_slno: val.cat_slno,
                        trainingtype_slno: val.trainingtype_slno,
                        type_name: val.type_name,
                        trin_cat_name: val.trin_cat_name,
                        cat_status: val.cat_status,
                        statusdesc: val.cat_status === 0 ? "NO" : "YES"
                    }
                    return obj;
                })
                setTabledata(viewData);
                setCount(0)
            } else {
                setTabledata([]);
            }
        }
        getData()
    }, [count])

    //ClickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { trainingtype_slno, trin_cat_name, cat_status, cat_slno } = data[0]
        settrainingtype(trainingtype_slno);
        setCat_name(trin_cat_name);
        setCat_status(cat_status === 1 ? true : false);
        setCat_Id(cat_slno);
    }, [])

    //Delete
    const DeleteRow = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { cat_slno } = data[0]
        const id = cat_slno;
        const patchdata = {
            cat_slno: cat_slno
        }
        if (id !== 0) {
            const dataDelete = async (patchdata) => {
                const result = await axioslogin.patch(`/TrainingCategory/delete`, patchdata)
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

    //Submit
    const submitTrainingCategory = useCallback(() => {
        //Insert
        const InsertData = async (PostData) => {
            const response = await axioslogin.post('/TrainingCategory/insert', PostData)
            const { message, success } = response.data
            if (success === 1) {
                setCount(count + 1)
                reset();
                succesNofity(message)
                setFlag(0)
            }
            else if (success === 0) {
                infoNofity(message);
                reset();
            }
            else {
                warningNofity(message)
                reset();
            }
        }

        //Edit
        const EditData = async (PatchData) => {
            const result = await axioslogin.patch('/TrainingCategory/update', PatchData)
            const { message, data, success } = result.data
            if (success === 2) {
                reset();
                setCount(count + 1);
                setCat_Id(0);
                succesNofity(message)
                setFlag(0)
            }
            else {
                warningNofity(message)
                reset();
            }
        }
        //flag checking
        if (flag === 0) {
            InsertData(PostData)
        }
        else {
            EditData(PatchData)

        }
    }, [PostData, PatchData, count, flag])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'cat_slno', filter: true, width: 150 },
        { headerName: 'Training Type', field: 'type_name', filter: true, width: 250 },
        { headerName: 'Training Category Name ', field: 'trin_cat_name', filter: true, width: 250 },
        { headerName: 'Status ', field: 'statusdesc', filter: true, width: 250 },

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
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => DeleteRow(params)} >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>

        },
    ])

    return (
        <CustomLayout title="Training Category Master" displayClose={true}>
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
                                    <TextField
                                        fullWidth
                                        placeholder='Category Name'
                                        id='cat_name'
                                        size="small"
                                        value={cat_name}
                                        name="cat_name"
                                        onChange={(e) => setCat_name(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="status"
                                                color="primary"
                                                value={cat_status}
                                                checked={cat_status}
                                                className="ml-1"
                                                onChange={(e) => setCat_status(e.target.checked)}
                                            />
                                        }
                                        label="Category Status"
                                    />
                                </Box>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitTrainingCategory}
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

export default memo(TrainingCategory)
