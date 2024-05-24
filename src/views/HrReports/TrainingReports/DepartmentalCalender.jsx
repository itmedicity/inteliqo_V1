import React, { Fragment, useState, useCallback, memo, useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ToastContainer } from 'react-toastify'
import ReportLayout from '../ReportComponent/ReportLayout';
import { Paper, Typography } from '@mui/material';
import { Box, Button, CssVarsProvider, } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action'
import { getDepartmentSection } from 'src/redux/actions/Common.Action';
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';

const DepartmentalCalender = () => {

    const dispatch = useDispatch()

    const [dept, setDept] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [fromdate, Setfromdate] = useState('')
    const [todate, Settodate] = useState('')
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        dispatch(setDepartment());

        if (dept !== 0) {
            dispatch(getDepartmentSection(dept))
        }
    }, [dispatch, dept])

    const getData = useCallback(() => {
        const postdata = {
            dept: dept,
            deptSect: deptSect,
            fromdate: (moment(fromdate).format("YYYY-MM-DD HH:SS:DD")),
            todate: (moment(todate).format("YYYY-MM-DD HH:SS:DD"))
        }
        if (dept !== 0 && deptSect !== 0 && fromdate !== '' && todate !== '') {
            const SelectDatas = async (postdata) => {
                const result = await axioslogin.post(`/TrainingMonthlyReport/trainingList`, postdata)
                const { data, success } = result.data
                if (success === 2) {
                    const viewData = data?.map((val) => {
                        const object = {
                            slno: val.slno,
                            schedule_topics: val.schedule_topics,
                            em_name: val.em_name,
                            topic_slno: val.topic_slno,
                            training_topic_name: val.training_topic_name,
                            schedule_trainers: val.schedule_trainers,
                            schedule_date: moment(val.schedule_date).format("YYYY-MM-DD")
                        }
                        return object;
                    })
                    setDatas(viewData);
                } else {
                    setDatas([]);
                    warningNofity("No Data to Show")
                }
            }
            SelectDatas(postdata)
        } else {
            warningNofity("Please Enter all the fields")
        }
    }, [dept, deptSect, fromdate, todate])


    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'slno', filter: true, width: 300 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 410 },
        { headerName: 'Trainers', field: 'em_name', filter: true, width: 450 },
        { headerName: 'Schedule Date ', field: 'schedule_date', filter: true, width: 450 },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <ReportLayout title="Departmental Training Scheduled Report" data={datas} displayClose={true} >
                <Paper sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <JoyDepartment deptValue={dept} getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <JoyDepartmentSection sectValues={deptSect} getSection={setDepartSection} dept={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <InputComponent
                                type="date"
                                size="sm"
                                placeholder="From Date"
                                name="Fromdate"
                                value={fromdate}
                                onchange={(e) => Setfromdate(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>To:</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    placeholder="ToDate"
                                    name="Todate"
                                    value={todate}
                                    onchange={(e) => Settodate(e.target.value)}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, mt: 0.5,
                            justifyContent: 'flex-start'
                        }} >
                            <CssVarsProvider>
                                <Box sx={{ p: 0.2, mt: 1 }} >
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

export default memo(DepartmentalCalender)

