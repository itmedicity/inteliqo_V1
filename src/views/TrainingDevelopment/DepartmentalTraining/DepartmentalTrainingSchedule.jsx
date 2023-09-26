import { Button, CssVarsProvider } from '@mui/joy'
import { Box, IconButton, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux'
import SelectSchedulingTime from 'src/views/MuiComponents/SelectSchedulingTime'
import SelectTrainingName from 'src/views/MuiComponents/SelectTrainingName'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useMemo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import TopicBasedonTName from 'src/views/MuiComponents/TopicBasedonTName'
import Timepicker from 'src/views/Component/Timepicker'

const DepartmentalTrainingSchedule = () => {
    const [depttype, setdepttype] = useState(0);
    const [desSelect, setdesSelect] = useState(0);
    const [trainingname, setTrainingname] = useState(0);
    const [trainingTopic, setTrainingtopic] = useState(0);
    const [schedulingtime, setSchedulingtime] = useState(0);
    const [TrainingCount, setTrainingCount] = useState('');
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0);
    const [id, setID] = useState(0);
    const [flag, setFlag] = useState(0);
    const [ScheduleTime, setScheduleTime] = useState(new Date());
    const [scheduleDate, setScheduleDate] = useState(new Date());

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //reset
    const reset = useCallback(() => {
        setdepttype(0);
        setdesSelect(0);
        setTrainingname(0);
        setTrainingtopic(0);
        setSchedulingtime(0);
        setTrainingCount(0);
        setScheduleTime(new Date());
        setScheduleDate(new Date());
    })

    //postData
    const postData = useMemo(() => {
        return {
            department: depttype,
            designation: desSelect,
            training_name: trainingname,
            topic_name: trainingTopic,
            schedule_time: schedulingtime,
            training_time: moment(ScheduleTime).format("YYYY-MM-DD HH:mm:ss"),
            training_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            training_count: TrainingCount,
            create_user: em_id
        }
    }, [depttype, desSelect, trainingname, trainingTopic, schedulingtime, ScheduleTime, scheduleDate, TrainingCount, em_id])

    //patchdata
    const patchData = useMemo(() => {
        return {
            SlNo: id,
            department: depttype,
            designation: desSelect,
            training_name: trainingname,
            topic_name: trainingTopic,
            schedule_time: schedulingtime,
            training_time: moment(ScheduleTime).format("YYYY-MM-DD HH:mm:ss"),
            training_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            training_count: TrainingCount,
            edit_user: em_id
        }
    }, [depttype, desSelect, trainingname, trainingTopic, schedulingtime, ScheduleTime, scheduleDate, TrainingCount, em_id])

    const submitDepartmentalTrainingSchedule = useCallback(() => {
        //insert
        const InsertData = async (postData) => {
            if (depttype !== 0 && desSelect !== 0 && trainingname !== 0 && trainingTopic !== 0 && schedulingtime !== 0 && ScheduleTime !== 0 && scheduleDate !== 0 && TrainingCount !== 0) {
                const result = await axioslogin.post('/DepartmentalTrainingSchedule/insert', postData)
                const { success, message } = result.data
                if (success === 1) {
                    setCount(count + 1)
                    reset();
                    succesNofity(message)
                } else {
                    warningNofity(message)
                    reset();
                }
            }
            else {
                warningNofity("Please Enter the Missing Filed")
            }
        }
        //edit
        const EditData = async (patchData) => {
            const result = await axioslogin.patch('/DepartmentalTrainingSchedule/update', patchData)
            const { message, success } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1);
                reset();
                setID(0);
                setFlag(0);
            }
            else {
                warningNofity(message)
                reset();
            }
        }
        if (flag === 0) {
            InsertData(postData)
        }
        else {
            EditData(patchData)
        }
    }, [postData, count, patchData, flag])

    //click_edit
    const getDataTable = useCallback((params) => {
        const data = params.api.getSelectedRows();
        const { SlNo, dept_id, desg_slno, name_slno, topic_slno, training_count, training_time, training_date, slno } = data[0];
        setFlag(1);
        setID(SlNo);
        setdepttype(dept_id);
        setdesSelect(desg_slno);
        setTrainingname(name_slno);
        setTrainingtopic(topic_slno);
        setSchedulingtime(slno);
        setTrainingCount(training_count);
        setScheduleTime(training_time);
        setScheduleDate(training_date);
    }, [])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/DepartmentalTrainingSchedule/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const object = {
                        SlNo: val.SlNo,
                        dept_id: val.dept_id,
                        training_time: val.training_time,
                        time: moment(val.training_time).format("HH:mm:ss"),
                        training_date: val.training_date,
                        dept_name: val.dept_name,
                        desg_slno: val.desg_slno,
                        desg_name: val.desg_name,
                        name_slno: val.name_slno,
                        training_name: val.training_name,
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
                        name_slno: val.name_slno,
                        slno: val.slno,
                        schedule_name: val.schedule_name,
                        training_count: val.training_count
                    }
                    return object;
                })
                setTableData(viewData)
                setCount(0);
            }
            else {
                setTableData([]);
            }
        }
        getData()
    }, [count])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'SlNo', filter: true, minWidth: 100 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Designation', field: 'desg_name', filter: true, minWidth: 250 },
        { headerName: 'Training Name', field: 'training_name', filter: true, width: 250 },
        { headerName: 'Topic Name', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Duration', field: 'schedule_name', filter: true, width: 250 },
        { headerName: 'Time', field: 'time', filter: true, width: 250 },
        { headerName: 'Date', field: 'training_date', filter: true, width: 250 },
        { headerName: 'Count', field: 'training_count', filter: true, width: 250 },
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
        <CustomLayout title="Department Wise Training" displayClose={true}>
            <ToastContainer />
            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', p: 1 }}>
                <Box sx={{ width: "100%", backgroundColor: 'yellow' }}>
                    <Paper elevation={0} variant='outlined' sx={{ p: 1, width: "100%", display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box sx={{ flex: 1 }}>
                                <DeptSelectByRedux value={depttype} setValue={setdepttype} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <DesignationSelectRedux value={desSelect} setValue={setdesSelect} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <SelectTrainingName value={trainingname} setValue={setTrainingname} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <TopicBasedonTName trainingname={trainingname} value={trainingTopic} setValue={setTrainingtopic} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <SelectSchedulingTime value={schedulingtime} setValue={setSchedulingtime} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Timepicker label="Time picker"
                                    value={ScheduleTime}
                                    changetextvalue={(e) => setScheduleTime(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat="DD-MM-YYYY"
                                        value={scheduleDate}
                                        onChange={setScheduleDate}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <TextField
                                    fullWidth
                                    placeholder='TrainingCount'
                                    id='TrainingCount'
                                    size="small"
                                    value={TrainingCount}
                                    name="TrainingCount"
                                    onChange={(e) => setTrainingCount(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitDepartmentalTrainingSchedule}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                </Box>
                <Paper elevation={0} variant='outlined' sx={{ width: "100%", mt: 1 }}>
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
                </Paper>
            </Box>
        </CustomLayout >
    )
}

export default memo(DepartmentalTrainingSchedule)
