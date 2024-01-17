import React, { Fragment, useState, useCallback, memo } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ToastContainer } from 'react-toastify'
import ReportLayout from '../ReportComponent/ReportLayout';
import { Paper, TextField } from '@mui/material';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import { Box, Button, CssVarsProvider, } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
// import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';

const DepartmentalTrainingCalender = () => {

    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [getdate, SetGetdate] = useState(moment(new Date()))
    const [datas, setDatas] = useState([]);
    const [topic, setTopic] = useState(0);

    const getmonth = moment(getdate).format("M")

    const getData = useCallback(() => {
        const postdata = {
            dept: dept,
            deptSect: deptSect,
            getmonth: parseInt(getmonth),
            topic: topic
        }
        if (dept !== 0 && deptSect !== 0 && getmonth !== 0) {
            const SelectDatas = async (postdata) => {
                const result = await axioslogin.post(`/TrainingMonthlyReport/getmonthlyreport`, postdata)
                const { data, success } = result.data
                if (success === 2) {
                    const viewData = data?.map((val) => {
                        const object = {
                            calender_slno: val.calender_slno,
                            em_name: val.em_name,
                            emp_dept: val.emp_dept,
                            emp_dept_sectn: val.emp_dept_sectn,
                            emp_desig: val.emp_desig,
                            offline_status: val.offline_status,
                            posttest_mark: val.posttest_mark,
                            posttest_status: val.posttest_status,
                            pretest_status: val.pretest_status,
                            retest_mark: val.retest_mark !== null ? val.retest_mark : "No Retest",
                            schedule_date: val.schedule_date,
                            slno: val.slno,
                            topic_slno: val.topic_slno,
                            training_topic_name: val.training_topic_name,
                            em_id: val.em_id,
                            online_status: val.online_status,
                            retest_status: val.retest_status,
                            retest: val.retest_status === 1 ? "Yes" : "No",
                            Pretest_mark: val.Pretest_mark,
                            online_mode: val.online_mode === 1 ? "Yes" : "No",
                            offline_mode: val.offline_mode === 1 ? "Yes" : "No",
                            dept_id: val.dept_id,
                            dept_name: val.dept_name,
                            sect_id: val.sect_id,
                            sect_name: val.sect_name,
                            eligible: val.retest_mark >= 2 || val.posttest_mark >= 2 ? "Eligible" : "Not Eligible",
                            trainingmode: val.online_mode ? "Online" : "Offline"
                        }
                        return object;
                    })
                    setDatas(viewData);
                } else {
                    setDatas([]);
                }
            }
            SelectDatas(postdata)
        } else {
            warningNofity("Please Enter all the fields")
        }
    }, [dept, deptSect, topic, getmonth])


    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'calender_slno', filter: true, width: 100 },
        { headerName: 'Emp No', field: 'em_id', filter: true, width: 200 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        // { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        // { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 200 },
        // { headerName: 'Online_mode', field: 'online_mode', filter: true, width: 200 },
        // { headerName: 'Offline_mode', field: 'offline_mode', filter: true, width: 200 },
        { headerName: 'Training Mode', field: 'trainingmode', filter: true, width: 200 },
        { headerName: 'Pree-Test Mark', field: 'Pretest_mark', filter: true, width: 200 },
        { headerName: 'Post-Mark', field: 'posttest_mark', filter: true, width: 200 },
        { headerName: 'Retest_Status', field: 'retest', filter: true, width: 200 },
        { headerName: 'Retest_mark', field: 'retest_mark', filter: true, width: 200 },
        { headerName: 'Eligible/Not', field: 'eligible', filter: true, width: 200 },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <ReportLayout title="Monthly Training Report" data={datas} displayClose={true} >
                <Paper sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['month']}
                                    inputFormat="YYYY-MM"
                                    value={getdate}
                                    onChange={SetGetdate}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <SelectTopics dept={dept} topic={topic} setTopic={setTopic} />
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, mt: 0.5,
                            justifyContent: 'flex-start'
                        }} >
                            <CssVarsProvider>
                                <Box sx={{ p: 0.2 }} >
                                    <Button aria-label="Like" variant="outlined" color="neutral"
                                        onClick={getData}
                                        sx={{
                                            color: '#90caf9'
                                        }} >
                                        <PublishedWithChangesIcon />
                                    </Button>
                                </Box>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            p: 1, mt: 0.5,
                            display: 'flex',
                            backgroundColor: '#f0f3f5',
                            flexDirection: "column",
                        }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={datas}
                            columnDefMain={columnDef}
                        />
                    </Paper>
                </Paper>
            </ReportLayout>
        </Fragment>
    )
}

export default memo(DepartmentalTrainingCalender) 
