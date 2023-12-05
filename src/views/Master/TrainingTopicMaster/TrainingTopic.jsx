import { Button, CssVarsProvider, Input } from '@mui/joy'
import { Box, Paper, Grid, TextField, FormControlLabel, Checkbox, IconButton, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SelectTrainingName from 'src/views/MuiComponents/SelectTrainingName'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';

const TrainingTopic = () => {
    const [dept_status, set_dept_status] = useState(false);
    const [depttype, setdepttype] = useState(0);
    const [training_topic_name, setTraining_topic_name] = useState('');
    const [training_status, setTraining_status] = useState(false);
    const [tutorial_status, setTutorial_status] = useState(false);
    const [medical_status, setMedical_status] = useState(false);
    const [non_medical_status, set_Non_medical_status] = useState(false);
    const [pretest_status, setPretest_status] = useState(false);
    const [post_test_status, setPost_test_status] = useState(false);
    const [online_status, set_Online_status] = useState(false);
    const [offline_status, setOffline_status] = useState(false);
    const [both_status, setBoth_status] = useState(false);
    const [count, setCount] = useState(0);
    const [tableData, setTabledata] = useState(0);
    const [topic_slno, setTopic_slno] = useState(0);
    const [flag, setFlag] = useState(0);
    const [dept_flag, setdept_Flag] = useState(0);
    const [trainingname, setTrainingname] = useState(0);
    const [hours, setHours] = useState('');
    const [videos, SetVideos] = useState('');

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //reset
    const reset = useCallback(() => {
        setTraining_topic_name('');
        setTraining_status(false);
        setTutorial_status(false);
        setMedical_status(false);
        set_Non_medical_status(false);
        setPretest_status(false);
        setPost_test_status(false);
        setTrainingname(0);
        setHours(0);
        set_dept_status(false);
        setdepttype(0);
        setdept_Flag(false)
        set_Online_status(false)
        setOffline_status(false)
        setBoth_status(false)
        SetVideos('');
    }, [])
    //check dept
    const checkDepartment = useCallback((e) => {
        if (e.target.checked === true) {
            set_dept_status(e.target.checked)
            setdept_Flag(1);
        }
        else {
            set_dept_status(false)
            setdept_Flag(0);
            setdepttype(0);
        }
    }, [setdept_Flag, set_dept_status])

    //postdata
    const postdata = useMemo(() => {
        return {
            dept_status: dept_status === true ? 1 : 0,
            training_dept: depttype,
            training_topic_name: training_topic_name,
            training_name: trainingname,
            training_status: training_status === true ? 1 : 0,
            tutorial_status: tutorial_status === true ? 1 : 0,
            medical_status: medical_status === true ? 1 : 0,
            non_medical_status: non_medical_status === true ? 1 : 0,
            pretest_status: pretest_status === true ? 1 : 0,
            post_test_status: post_test_status === true ? 1 : 0,
            online_status: online_status === true ? 1 : 0,
            offline_status: offline_status === true ? 1 : 0,
            both_status: both_status === true ? 1 : 0,
            create_user: em_id,
            hours: hours,
            video_link: videos
        }
    }, [depttype, videos, dept_status, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status, em_id])

    //patchdata
    const patchdata = useMemo(() => {
        return {
            dept_status: dept_status === true ? 1 : 0,
            training_dept: depttype,
            training_topic_name: training_topic_name,
            training_name: trainingname,
            training_status: training_status === true ? 1 : 0,
            tutorial_status: tutorial_status === true ? 1 : 0,
            medical_status: medical_status === true ? 1 : 0,
            non_medical_status: non_medical_status === true ? 1 : 0,
            pretest_status: pretest_status === true ? 1 : 0,
            post_test_status: post_test_status === true ? 1 : 0,
            online_status: online_status === true ? 1 : 0,
            offline_status: offline_status === true ? 1 : 0,
            both_status: both_status === true ? 1 : 0,
            edit_user: em_id,
            topic_slno: topic_slno,
            hours: hours,
            video_link: videos
        }
    }, [dept_status, videos, depttype, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, em_id, topic_slno, online_status, offline_status, both_status])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('TrainingTopic/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val) => {
                    const obj = {
                        topic_slno: val.topic_slno,
                        dept_status: val.dept_status,
                        deptstatus: val.dept_status === 0 ? "NO" : "YES",
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        dept: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        name_slno: val.name_slno,
                        hours: val.hours,
                        training_name: val.training_name,
                        training_status: val.training_status,
                        training: val.training_status === 0 ? "NO" : "YES",
                        tutorial_status: val.tutorial_status,
                        tutorial: val.tutorial_status === 0 ? "NO" : "YES",
                        medical_status: val.medical_status,
                        medical: val.medical_status === 0 ? "NO" : "YES",
                        non_medical_status: val.non_medical_status,
                        non_medical: val.non_medical_status === 0 ? "NO" : "YES",
                        pretest_status: val.pretest_status,
                        pretest: val.pretest_status === 0 ? "NO" : "YES",
                        post_test_status: val.post_test_status,
                        post_test: val.post_test_status === 0 ? "NO" : "YES",
                        online_status: val.online_status,
                        online: val.online_status === 0 ? "NO" : "YES",
                        offline_status: val.offline_status,
                        offline: val.offline_status === 0 ? "NO" : "YES",
                        both_status: val.both_status,
                        both: val.both_status === 0 ? "NO" : "YES",
                        video_link: val.video_link === null ? "NILL" : val.video_link
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
        const { topic_slno, video_link, dept_status, dept_id, hours, training_topic_name, name_slno, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status } = data[0]
        setFlag(1);
        setdepttype(dept_id)
        set_dept_status(dept_status === 0 ? false : true)
        setdept_Flag(dept_status === 0 ? 0 : 1)
        setTraining_topic_name(training_topic_name);
        setTraining_status(training_status === 1 ? true : false);
        setTutorial_status(tutorial_status === 1 ? true : false);
        setMedical_status(medical_status === 1 ? true : false);
        set_Non_medical_status(non_medical_status === 1 ? true : false);
        setPretest_status(pretest_status === 1 ? true : false);
        setPost_test_status(post_test_status === 1 ? true : false);
        setTopic_slno(topic_slno)
        setTrainingname(name_slno)
        setHours(hours)
        set_Online_status(online_status === 1 ? true : false)
        setOffline_status(offline_status === 1 ? true : false)
        setBoth_status(both_status === 1 ? true : false)
        SetVideos(video_link);
    }, [])

    //submit
    const submitTrainingTopic = useCallback(() => {
        //insert
        const InsertData = async (postdata) => {
            const result = await axioslogin.post('/TrainingTopic/insert', postdata)
            const { message, success } = result.data;
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

        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/TrainingTopic/update', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                reset();
                setCount(count + 1);
                setTopic_slno(0);
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
            InsertData(postdata)
        }
        else {
            EditData(patchdata)
        }
    }, [count, flag, reset, postdata, patchdata])

    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'topic_slno', filter: true, minWidth: 90 },
        { headerName: 'Department', field: 'deptstatus', filter: true, minWidth: 150 },
        { headerName: 'Topic Name', field: 'training_topic_name', filter: true, minWidth: 250 },
        { headerName: 'Training Name', field: 'training_name', filter: true, minWidth: 150 },
        { headerName: 'Training ', field: 'training', filter: true, minWidth: 150 },
        { headerName: 'Tutorial ', field: 'tutorial', filter: true, minWidth: 150 },
        { headerName: 'Medical', field: 'medical', filter: true, minWidth: 150 },
        { headerName: 'Non-Med', field: 'non_medical', filter: true, minWidth: 150 },
        { headerName: 'Pre-Test ', field: 'pretest', filter: true, minWidth: 150 },
        { headerName: 'Post-Test ', field: 'post_test', filter: true, minWidth: 150 },
        { headerName: 'Online', field: 'online', filter: true, minWidth: 150 },
        { headerName: 'Offline ', field: 'offline', filter: true, minWidth: 150 },
        { headerName: 'Both ', field: 'both', filter: true, minWidth: 150 },
        { headerName: 'Link ', field: 'video_link', filter: true, minWidth: 300 },
        { headerName: 'Hours ', field: 'hours', filter: true, minWidth: 150 },
        {
            headerName: 'Edit', minWidth: 150, cellRenderer: params =>
                < Fragment >
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment >
        }
    ])

    const HandleOnline = useCallback((e) => {
        if (e.target.checked === true) {
            set_Online_status(e.target.checked)
            setOffline_status(false);
            setBoth_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])


    const HandleOffline = useCallback((e) => {
        if (e.target.checked === true) {
            setOffline_status(e.target.checked)
            set_Online_status(false);
            setBoth_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])

    const HandleBoth = useCallback((e) => {
        if (e.target.checked === true) {
            setBoth_status(e.target.checked)
            setOffline_status(false);
            set_Online_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])

    console.log(videos);

    return (
        <CustomSettingsLayout title="Training Topic Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="dept_status"
                                                color="primary"
                                                value={dept_status}
                                                checked={dept_status}
                                                className="ml-1"
                                                onChange={(e) => checkDepartment(e)}
                                            />
                                        }
                                        label="Departmental"
                                    />
                                </Box>
                                {
                                    dept_flag === 1 ?
                                        <Box>
                                            <DeptSelectByRedux value={depttype} setValue={setdepttype} />
                                        </Box>
                                        : null
                                }
                                <Box sx={{ mt: 1 }}>
                                    <SelectTrainingName value={trainingname} setValue={setTrainingname} />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Training Subject Name'
                                        id='training_topic_name'
                                        size="small"
                                        value={training_topic_name}
                                        name="training_topic_name"
                                        onChange={(e) => setTraining_topic_name(e.target.value)}
                                    />
                                </Box>

                                <Box sx={{ mt: 0.5, display: "flex", flexDirection: "row", gap: 3 }}>
                                    <Typography sx={{ mt: 1 }}>Training Hours :</Typography>
                                    <Input
                                        type="number"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        slotProps={{
                                            input: {
                                                min: 1,
                                                max: 5
                                            },
                                        }}
                                    />
                                </Box>
                                <Grid container spacing={1}>
                                    <Grid item xl={4} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={training_status}
                                                        checked={training_status}
                                                        className="ml-1"
                                                        onChange={(e) => setTraining_status(e.target.checked)}
                                                    />
                                                }
                                                label="Training"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={tutorial_status}
                                                        checked={tutorial_status}
                                                        className="ml-1"
                                                        onChange={(e) => setTutorial_status(e.target.checked)}
                                                    />
                                                }
                                                label="Tutorial"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xl={4} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={medical_status}
                                                        checked={medical_status}
                                                        className="ml-1"
                                                        onChange={(e) => setMedical_status(e.target.checked)}
                                                    />
                                                }
                                                label="Medical"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xl={5} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={non_medical_status}
                                                        checked={non_medical_status}
                                                        className="ml-1"
                                                        onChange={(e) => set_Non_medical_status(e.target.checked)}
                                                    />
                                                }
                                                label="Non medical"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xl={4} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={pretest_status}
                                                        checked={pretest_status}
                                                        className="ml-1"
                                                        onChange={(e) => setPretest_status(e.target.checked)}
                                                    />
                                                }
                                                label="Pre Test"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xl={5} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={post_test_status}
                                                        checked={post_test_status}
                                                        className="ml-1"
                                                        onChange={(e) => setPost_test_status(e.target.checked)}
                                                    />
                                                }
                                                label="Post Test"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                {/* Section status */}
                                <Grid container spacing={1}>
                                    <Grid item xl={4} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={online_status}
                                                        checked={online_status}
                                                        className="ml-1"
                                                        //onChange={(e) => set_Online_status(e.target.checked)}
                                                        onChange={(e) => HandleOnline(e)}
                                                    />
                                                }
                                                label="Online"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={offline_status}
                                                        checked={offline_status}
                                                        className="ml-1"
                                                        onChange={(e) => HandleOffline(e)}
                                                    />
                                                }
                                                label="Offline"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="status"
                                                        color="primary"
                                                        value={both_status}
                                                        checked={both_status}
                                                        className="ml-1"
                                                        onChange={(e) => HandleBoth(e)}
                                                    />
                                                }
                                                label="Both"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                {
                                    both_status === true || online_status === true ?
                                        <JoyInput
                                            type='text'
                                            name='video link'
                                            id='videos'
                                            placeholder="Enter Video Link"
                                            value={videos}
                                            onchange={(e) => SetVideos(e)}
                                        />
                                        : null
                                }

                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitTrainingTopic}
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

export default memo(TrainingTopic)
