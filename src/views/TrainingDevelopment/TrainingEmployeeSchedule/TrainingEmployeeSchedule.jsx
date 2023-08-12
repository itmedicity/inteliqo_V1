import { Box, Paper, TextField } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
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


    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;


    //tes_slno, tes_dept, tes_dept_sec, tes_training_name, tes_topic, tes_date, tes_time, tes_emp_name, create_user, edit_user, create_date, update_date
    //postdata
    const postdata = useMemo(() => {
        return {
            tes_dept: dept,
            tes_dept_sec: deptSec,
            tes_training_name: trainingname,
            tes_topic: topic,
            tes_date: moment(scheduleDate).format("YYYY-MM-DD"),
            tes_time: moment(ScheduleTime).format("HH:mm:ss"),
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
            tes_date: scheduleDate,
            tes_time: ScheduleTime,
            tes_emp_name: emp_name,
            create_user: em_id
        }
    }, [tes_slno, dept, deptSec, trainingname, topic, scheduleDate, ScheduleTime, emp_name, em_id])

    const reset = useCallback(() => {
        setdept(0);
        setdeptSec(0);
        setTrainingname(0);
        setTopic(0);
        setEmp_name(0);
        setScheduleTime(new Date());
        setScheduleDate(new Date());
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
        InsertData(postdata)

    }, [postdata, count])
    return (
        <CustomLayout title="Department Wise Training" displayClose={true}>
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
                            <TrainingTopicByTrainingName trainingname={trainingname} value={topic} setValue={setTopic} />
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
                        <Box sx={{ flex: 1 }}>
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
                {/* <Paper elevation={0} variant='outlined' sx={{ width: "100%", mt: 1 }}>
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
                </Paper> */}
            </Box>
        </CustomLayout>
    )
}

export default memo(TrainingEmployeeSchedule)
