import React, { memo, useCallback, useMemo } from 'react'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import { Button, CssVarsProvider, Input, Textarea, IconButton, Typography } from '@mui/joy'
import { Box, Paper, Tooltip, TextField } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import ScheduleCalender from './ScheduleCalender';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { useEffect } from 'react';
import { setDepartment } from 'src/redux/actions/Department.action';
import { TrainerNames, TrainingTopics } from 'src/redux/actions/Training.Action';
import TrainingTopicsRdx from 'src/views/Component/ReduxComponent/TrainingTopicsRdx';
import TrainerNamesRxd from 'src/views/Component/ReduxComponent/TrainerNamesRxd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import { screenInnerHeight } from 'src/views/Constant/Constant';


const DepartmentalTrainingCalender = ({ setShow, count, Setcount }) => {

    const dispatch = useDispatch();

    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [year, setYear] = useState(moment(new Date()));
    const [month, setMonth] = useState(moment(new Date()));
    const [remarks, setRemarks] = useState('');
    const [table, setTable] = useState(0);
    const [open, setopen] = useState(0);
    const [fromDate, setFromDate] = useState(moment(new Date()));
    const [toDate, setToDate] = useState(moment(new Date()));
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([]);
    const [scheduledate, setScheduledate] = useState([]);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(TrainingTopics());
        dispatch(TrainerNames());
    }, [dispatch, count])

    //setopen
    const openField = useCallback(() => {
        setopen(1);
    })

    //reset
    const reset = useCallback(() => {
        setRemarks('');
        setdept(0);
        setdeptSec(0);
        setTopic(0);
        setTrainer([]);
        setYear('');
        setMonth('');
        setDates();
        setFromDate('');
        setToDate('');

    }, [])

    const Displaydata = async () => {
        setViewTable(1)
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
    }

    const filterTrainers = trainer?.map((val) => {
        return val.em_id
    })

    const getValue = useCallback((e, val) => {
        const updatedDates = dates?.map((item) => {
            if (item.date === val.date) {
                return {
                    ...item,
                    inValue: e,
                    topic: topic?.topic_slno,
                    trainer: filterTrainers
                };
            }
            return item;
        });

        setDates(updatedDates);
    }, [dates, filterTrainers])
    useEffect(() => {
        const filterdate = dates?.filter((val) => {

            return val.inValue === true
        })
        setScheduledate(filterdate);
    }, [dates])

    const postArray = scheduledate?.map((scheduledate) => ({
        ...scheduledate,
        department: dept,
        deparment_sect: deptSec,
        schedule_month: moment(month).format("YYYY-MM-DD"),
        schedule_year: moment(year).format("YYYY-MM-DD"),
        schedule_remark: remarks,
        create_user: em_id
    }));
    console.log(postArray);

    const handleText = useCallback((event) => {
        setRemarks(event.target.value);
    }, []);

    const SubmitBtn = useCallback(() => {
        const InsertData = async (postArray) => {
            const result = await axioslogin.post("TrainingAfterJoining/InsertDepartmentalSchedule", postArray)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                reset();
                setTable(1);
                Setcount(count + 1);
                setopen(0);
                setViewTable(0);
            }
            else {
                warningNofity(message);
                setopen(0);
                setViewTable(0);
                reset();
            }
        }
        InsertData(postArray)
    }, [postArray, count])



    return (
        <CustomDashboardPage title="Departmental Training Calender" displayClose={true} setClose={setShow}  >
            <ToastContainer />
            <Paper elevation={0} sx={{ width: "100%", p: 1, height: screenInnerHeight - 135 }}>

                <Paper elevation={0} variant='outlined' sx={{ width: "100%", p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DepartmentDropRedx getDept={setdept} />
                    </Box>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DepartmentSectionRedx getSection={setdeptSec} />
                    </Box>
                    <Tooltip title="Select Year">
                        <Box sx={{ mt: 0.5, }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year']}
                                    // maxDate={addMonths(new Date(), 1)}
                                    value={year}
                                    onChange={(newValue) => {
                                        setYear(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={false} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Select Month">
                        <Box sx={{ mt: 0.5, }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['month']}
                                    // maxDate={addMonths(new Date(), 1)}
                                    value={month}
                                    onChange={(newValue) => {
                                        setMonth(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: "center" }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={false} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Tooltip>
                    {/* <Box sx={{ p: 0.5 }}>
                        <IconButton size="md" onClick={openField}>
                            <AddCircleIcon />
                        </IconButton>
                    </Box> */}
                    <Box sx={{ px: 0.5 }}>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={SubmitBtn}
                            >
                                SAVE
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                {/* 
                {
                    open === 1 ?
                        <Paper elevation={0} variant='outlined'>
                            <Box sx={{
                                display: "flex", flexDirection: "row", p: 1
                            }}>
                                <Box sx={{ px: 2 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            From Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 2 }}>
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
                                <Box sx={{ px: 2 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            To Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 2 }}>
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
                                <Box sx={{ px: 0.5 }}>
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
                                <Box sx={{ display: 'flex', flex: 2 }} >
                                    <CssVarsProvider>
                                        <Textarea
                                            label="Outlined"
                                            placeholder="Remarks"
                                            variant="outlined"
                                            minRows={1}
                                            maxRows={2}
                                            name="remarks"
                                            value={remarks}
                                            onChange={(e) => handleText(e)}
                                            sx={{ flex: 1 }}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ px: 0.5 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={SubmitBtn}
                                        >
                                            SAVE
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>

                        : null} */}

                {/* {
                    viewTable === 1 ?
                        <Paper elevation={0} sx={{
                            mt: 1,
                            width: "100%", height: 200, overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }
                        }}>
                            <TableContainer sx={{}}>
                                <Table size="small" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center"> Choose Topics</TableCell>
                                            <TableCell align="center"> Choose Trainers</TableCell>
                                            <TableCell align="center"> Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dates?.map((val, ind) => {
                                                return (
                                                    <TableRow key={ind}>
                                                        <TableCell align="center">{val.date}</TableCell>
                                                        <TableCell>
                                                            <TrainingTopicsRdx getTopic={setTopic} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TrainerNamesRxd getTrainers={setTrainer} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <CommonCheckBox
                                                                checked={val?.inValue || false}
                                                                onChange={(e) => {
                                                                    getValue(e.target.checked, val);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        : null
                } */}
                {/* {
                    table === 1 ? <ScheduleCalender count={count} Setcount={Setcount} /> : null
                } */}
                <ScheduleCalender count={count} Setcount={Setcount} />

            </Paper>
        </CustomDashboardPage >
    )
}

export default memo(DepartmentalTrainingCalender)
