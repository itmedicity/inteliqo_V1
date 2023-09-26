import { Button, CssVarsProvider } from '@mui/joy';
import { Box, Grid, IconButton, Paper } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
import SaveIcon from '@mui/icons-material/Save';
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux';
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Fragment } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import TrainingCategorySelect from 'src/views/MuiComponents/TrainingCategorySelect';
import SelectTrainingName from 'src/views/MuiComponents/SelectTrainingName';

const TrainingSchedule = () => {
    const [desSelect, setdesSelect] = useState(0);
    const [depttype, setdepttype] = useState(0);
    const [trainingcategory, settrainingcategory] = useState(0);
    const [trainingname, setTrainingname] = useState(0);
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
            schedule_department: depttype,
            schedule_designation: desSelect,
            schedule_category: trainingcategory,
            training_name: trainingname,
            create_user: em_id
        }
    }, [depttype, desSelect, trainingcategory, trainingname, em_id])

    //patchdata
    const PatchData = useMemo(() => {
        return {
            slno: id,
            schedule_department: depttype,
            schedule_designation: desSelect,
            schedule_category: trainingcategory,
            training_name: trainingname,
            edit_user: em_id
        }
    }, [id, depttype, desSelect, trainingcategory, trainingname, em_id])

    //reset
    const reset = useCallback(() => {
        setdepttype(0);
        setdesSelect(0);
        settrainingcategory(0);
        setTrainingname(0);
    })

    //views
    useEffect(() => {
        const DataTable = async () => {
            const result = await axioslogin.get('/TrainingSchedule/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        slno: val.slno,
                        desg_slno: val.desg_slno,
                        desg_name: val.desg_name,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        cat_slno: val.cat_slno,
                        trin_cat_name: val.trin_cat_name,
                        name_slno: val.name_slno,
                        training_name: val.training_name
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

    // ClickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { slno, dept_id, desg_slno, cat_slno, name_slno } = data[0]
        setdepttype(dept_id);
        setdesSelect(desg_slno);
        settrainingcategory(cat_slno);
        setTrainingname(name_slno);
        setId(slno);
    }, [])

    const submitTrainingSchedule = useCallback(() => {
        //insert
        const InsertData = async (PostData) => {

            const result = await axioslogin.post('/TrainingSchedule/insert', PostData)
            const { message, success } = result.data
            if (success === 1) {
                reset();
                setCount(count + 1)
                succesNofity(message)
                setFlag(0);
            }
            else {
                warningNofity(message)
                reset();
            }
        }

        //Edit
        const EditData = async (PatchData) => {
            const result = await axioslogin.patch('/TrainingSchedule/update', PatchData)
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
                reset();
            }
        }

        if (flag === 0) {
            InsertData(PostData)
        }
        else {
            EditData(PatchData)
        }
    }, [PostData, count, PatchData])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'slno', filter: true, width: 150 },
        { headerName: 'Department ', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Designation', field: 'desg_name', filter: true, width: 250 },
        { headerName: 'Category', field: 'trin_cat_name', filter: true, width: 250 },
        { headerName: 'Training Name', field: 'training_name', filter: true, width: 250 },

        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => getDataTable(params)}
                    >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        }
    ])

    return (
        <CustomSettingsLayout title="Training Schedule Master" displayClose={true} >
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
                                    <TrainingCategorySelect value={trainingcategory} setValue={settrainingcategory} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <SelectTrainingName value={trainingname} setValue={setTrainingname} />
                                </Box>

                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitTrainingSchedule}
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

export default memo(TrainingSchedule)