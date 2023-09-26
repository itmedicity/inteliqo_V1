import { Box, Button, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { memo } from 'react'
import moment from 'moment/moment'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux'
import SelectTopics from 'src/views/MuiComponents/SelectTopics'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, TextareaAutosize } from '@mui/material'
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContainer } from 'react-toastify';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'


const DepartmentalTraining = ({ setShow, count, Setcount }) => {

    const employeeState = useSelector((state) => state.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const [depttype, setDepttype] = useState(0);
    const [deptSec, setDeptsec] = useState(0);
    const [topic, setTopic] = useState(0);
    const [trainers, setTrainers] = useState([]);
    const [tdate, setTdate] = useState(moment(new Date()));
    const [remark, setRemark] = useState('');
    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [toDate, setToDate] = useState(moment(new Date()))
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([]);
    const [open, setopen] = useState(0);
    const [tableData, setTableData] = useState([]);


    const handleChange = (event) => {
        setRemark(event.target.value);
    };

    const reset = useCallback(() => {
        setDepttype(0);
        setDeptsec(0);
        setTopic(0);
        setTrainers([]);
        setTdate('');
        setRemark('');
    })

    const Displaydata = async () => {
        var dateArray = [];
        var currentDate = moment(fromDate);
        var stopDate = moment(toDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        const arr = dateArray.map((val) => {
            const obj = {
                "date": val,
                "inValue": false,
            }
            return obj
        })
        setDates(arr)
        setViewTable(1)
    }
    const getValue = async (e, val) => {
        let arr = dates.map((item) => item.date === val.date ? { ...item, inValue: e } : item)
        setDates(arr)
    }
    const openField = useCallback(() => {
        setopen(1);
    })

    const filterdate = dates.filter((val) => {
        return val.inValue === true;
    })

    const postArray = filterdate.map((filterdate) => ({
        ...filterdate,
        tes_dept: depttype,
        tes_dept_sec: deptSec,
        tes_topic: topic,
        tes_emp_name: trainers,
        tes_remark: remark,
        create_user: em_id
    }));


    const SubmitBtn = useCallback(() => {
        const InsertData = async (postArray) => {
            const result = await axioslogin.post('/TrainingAfterJoining/scheduleInsert', postArray)
            const { success } = result.data;
            if (success === 1) {
                succesNofity("TRAINING SCHEDULED")
                reset();
                setopen(0);
                setViewTable(0);
                Setcount(count + 1)
            }
            else {
                warningNofity("CAN'T INSERT DATA")
                reset();
                setopen(0);
                setViewTable(0);
            }
        }
        InsertData(postArray)
    }, [postArray, count])



    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/TrainingAfterJoining/selectScheduleDetails')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const object = {
                        dept_name: val.dept_name,
                        desg_name: val.desg_name,
                        tes_date: val.tes_date,
                        Schedule_date: moment(val.tes_date).format("DD-MM-YYYY"),
                        tes_remark: val.tes_remark,
                        tes_slno: val.tes_slno,
                        topic_slno: val.topic_slno,
                        traineer_name: val.traineer_name,
                        training_topic_name: val.training_topic_name
                    }
                    return object;
                })
                setTableData(viewData)
                Setcount(0);
            }
            else {
                setTableData([]);
            }
        }
        getData()
    }, [count])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'tes_slno', filter: true, minWidth: 100 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Designation', field: 'desg_name', filter: true, minWidth: 250 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, minWidth: 250 },
        { headerName: 'Trainers Name', field: 'traineer_name', filter: true, minWidth: 250 },
        { headerName: 'Date', field: 'Schedule_date', filter: true, minWidth: 250 },
        { headerName: 'Remark', field: 'tes_remark', filter: true, minWidth: 250 },
    ])
    return (
        <CustomDashboardPage title="Departmental Training Schedule" displayClose={true} setClose={setShow}  >
            <ToastContainer />
            <Paper sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Paper variant='outlined' elevation={0} sx={{ display: "flex", flexDirection: "row", p: 1 }}>
                    <Box sx={{ flex: 1, p: 0.5 }}>
                        <DeptSelectByRedux value={depttype} setValue={setDepttype} />
                    </Box>
                    <Box sx={{ flex: 1, p: 0.5 }}>
                        <DesignationSelectRedux value={deptSec} setValue={setDeptsec} />
                    </Box>
                    <Box sx={{ flex: 1, p: 0.5 }}>
                        <SelectTopics value={topic} setValue={setTopic} />
                    </Box>
                    <Box sx={{ flex: 1, p: 0.5, maxWidth: "20%" }}>
                        <SelectTrainer value={trainers} setValue={setTrainers} />
                    </Box>

                    <Box sx={{ p: 0.5 }}>
                        <IconButton size="md" onClick={openField}>
                            <AddCircleIcon />
                        </IconButton>
                    </Box>
                </Paper>

                {
                    open === 1 ?

                        <Paper variant='outlined' elevation={0} sx={{ display: "flex", flexDirection: "row", width: "100%", mt: 1, pl: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 0.5 }}>
                                    <Box >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                From Date
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box >
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={fromDate}
                                                onChange={setFromDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, p: 0.5, flexDirection: "column" }}>
                                    <Box  >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                To Date
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box >
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={toDate}
                                                onChange={setToDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ px: 0.5, mt: 4 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={Displaydata}

                                        >
                                            Select Date
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            {viewTable === 1 ? (
                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <Box sx={{ p: 1, mt: 2 }}>
                                        <TextareaAutosize
                                            minRows={2}
                                            maxRows={10}
                                            variant="outlined"
                                            value={remark}
                                            placeholder="Remark"
                                            size='lg'
                                            onChange={handleChange}
                                            style={{ width: 200 }}

                                        />
                                    </Box>
                                    <Box sx={{ px: 0.5, mt: 2, mt: 4 }}>
                                        <CssVarsProvider>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                size="md"
                                                color="primary"
                                                onClick={SubmitBtn}
                                            // sx={{ width: 100 }}
                                            >
                                                SAVE
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            ) : null}

                        </Paper>
                        : null}

                {/* {
                viewTable === 1 ?
                    <Paper elevation={0} sx={{
                        mt: 1, backgroundColor: "#FAF1E4",
                        width: "20%", height: 100, overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }
                    }}>
                        <TableContainer sx={{}}>
                            <Table size="small" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center"> Choose Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        dates?.map((val, ind) => {
                                            return <TableRow key={ind}>
                                                <TableCell align="center">{val.date}</TableCell>
                                                <TableCell align="center"><CommonCheckBox
                                                    checked={val?.inValue || false}
                                                    onChange={(e) => {
                                                        getValue(e.target.checked, val)
                                                    }}
                                                /></TableCell>
                                            </TableRow>
                                        })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    : null
            } */}



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
            </Paper>
        </CustomDashboardPage >
    )
}

export default memo(DepartmentalTraining)
