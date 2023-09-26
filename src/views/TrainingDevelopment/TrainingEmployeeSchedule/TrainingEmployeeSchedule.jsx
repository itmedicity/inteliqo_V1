import { Box, IconButton, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import SelectTrainingName from 'src/views/MuiComponents/SelectTrainingName'
import TrainingTopicByTrainingName from 'src/views/MuiComponents/TrainingTopicByTrainingName'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Timepicker from 'src/views/Component/Timepicker'
import SelectEmp from 'src/views/MuiComponents/SelectEmp'
import { Button, CssVarsProvider } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

const TrainingEmployeeSchedule = () => {
    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [trainingname, setTrainingname] = useState(0);
    const [topic, setTopic] = useState(0);
    const [emp_name, setEmp_name] = useState([]);
    const [ScheduleTime, setScheduleTime] = useState(new Date());
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [tes_slno, settes_slno] = useState(0);
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);
    const [tableData, setTableData] = useState([]);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //postdata
    const postdata = useMemo(() => {
        return {
            tes_dept: dept,
            tes_dept_sec: deptSec,
            tes_training_name: trainingname,
            tes_topic: topic,
            tes_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            tes_time: moment(ScheduleTime).format("YYYY-MM-DD HH:mm:ss"),
            tes_emp_name: emp_name,
            create_user: em_id
        }
    }, [dept, deptSec, trainingname, topic, scheduleDate, ScheduleTime, emp_name, em_id])

    //patchdata
    const patchdata = useMemo(() => {
        return {
            tes_slno: tes_slno,
            tes_dept: dept,
            tes_dept_sec: deptSec,
            tes_training_name: trainingname,
            tes_topic: topic,
            tes_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            tes_time: moment(ScheduleTime).format("YYYY-MM-DD HH:mm:ss"),
            tes_emp_name: emp_name,
            edit_user: em_id
        }
    }, [tes_slno, dept, deptSec, trainingname, topic, scheduleDate, ScheduleTime, emp_name, em_id])

    const reset = useCallback(() => {
        setdept(0);
        setdeptSec(0);
        setTrainingname(0);
        setTopic(0);
        setEmp_name([]);
        setScheduleTime(new Date());
        setScheduleDate(new Date());
    }, [])

    //Click edit
    const getDataTable = useCallback((params) => {
        const data = params.api.getSelectedRows();
        const { tes_slno, dept_id, sect_id, name_slno, topic_slno, tes_date, tes_time, tes_emp_name } = data[0];
        setFlag(1);
        settes_slno(tes_slno);
        setdept(dept_id);
        setdeptSec(sect_id);
        setTrainingname(name_slno);
        setTopic(topic_slno);
        const obj = JSON.parse(tes_emp_name);
        setEmp_name(obj === null ? [] : obj);
        setScheduleTime(tes_time);
        setScheduleDate(tes_date);
    }, [])

    const submitEmployeeSchedule = useCallback(() => {
        const InsertData = async (postdata) => {
            if (dept !== 0 && deptSec !== 0 && trainingname !== 0 && topic !== 0 && scheduleDate !== 0 && ScheduleTime !== 0 && emp_name !== 0) {
                const result = await axioslogin.post('/TrainingEmployeeSchedule/insert', postdata)
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
        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/TrainingEmployeeSchedule/update', patchdata)
            const { message, success } = result.data
            if (success === 2) {
                succesNofity(message)
                reset();
                setCount(count + 1)
            }
            else {
                warningNofity(message)
                reset();
            }
        }

        if (flag === 0) {
            InsertData(postdata)
        }
        else {
            EditData(patchdata)
        }

    }, [postdata, count, patchdata, flag])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingEmployeeSchedule/select`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const object = {
                        tes_emp_name: val.tes_emp_name,
                        em_no: val.em_no,
                        tes_slno: val.tes_slno,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        sect_id: val.sect_id,
                        sect_name: val.sect_name,
                        name_slno: val.name_slno,
                        training_name: val.training_name,
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
                        em_id: val.em_id,
                        em_name: val.em_name,
                        tes_date: val.tes_date,
                        tes_time: val.tes_time,
                        time: moment(val.tes_time).format("HH:mm:ss")
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
        { headerName: 'Sl.No', field: 'tes_slno', filter: true, width: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training', field: 'training_name', filter: true, width: 250 },
        { headerName: 'Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Date', field: 'tes_date', filter: true, width: 150 },
        { headerName: 'Time', field: 'time', filter: true, width: 150 },
        { headerName: 'Employees', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
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
    ])
    return (
        <CustomLayout title="Training Employee Schedule" displayClose={true}>
            <ToastContainer />
            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', p: 1 }}>
                <Box sx={{ width: "100%" }}>
                    <Paper elevation={0} sx={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: 1 }}>
                            <DeptSelectByRedux value={dept} setValue={setdept} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <DeptSecSelectByRedux dept={dept} value={deptSec} setValue={setdeptSec} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <SelectTrainingName value={trainingname} setValue={setTrainingname} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TrainingTopicByTrainingName trainingname={trainingname} value={topic}
                                setValue={setTopic} />
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ mt: 1, width: "100%", display: 'flex', flexDirection: 'row' }}>
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
                        <Box sx={{ width: '25%' }}>
                            <SelectEmp dept={dept} value={emp_name} setValue={setEmp_name} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitEmployeeSchedule}
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
        </CustomLayout>
    )
}

export default memo(TrainingEmployeeSchedule)
