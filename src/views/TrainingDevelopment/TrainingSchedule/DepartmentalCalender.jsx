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
import { isSameYear } from 'date-fns';
import PageviewIcon from '@mui/icons-material/Pageview';
import DetailsInsertModal from './DetailsInsertModal';
import TraningSchedModalJoy from './TraningSchedModalJoy';


const DepartmentalCalender = ({ setShow, count, Setcount }) => {

    const dispatch = useDispatch();

    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [year, setYear] = useState(moment(new Date()));
    const [month, setMonth] = useState(moment(new Date()));
    const [remarks, setRemarks] = useState('');
    const [table, setTable] = useState(0);
    // const [open, setopen] = useState(0);
    const [fromDate, setFromDate] = useState(moment(new Date()));
    const [toDate, setToDate] = useState(moment(new Date()));
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([]);
    const [scheduledate, setScheduledate] = useState([]);
    const [insertModal, setinsetmodal] = useState(0);
    const [open, setOpen] = useState(false);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(TrainingTopics());
        dispatch(TrainerNames());
    }, [dispatch, count])

    //setopen
    // const openField = useCallback(() => {
    //     setopen(1);
    // })

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
                // setopen(0);
                setViewTable(0);
            }
            else {
                warningNofity(message);
                // setopen(0);
                setViewTable(0);
                reset();
            }
        }
        InsertData(postArray)
    }, [postArray, count])

    const DisplayTable = useCallback(() => {
        const yr = moment(year).format("YYYY");
        const result = isSameYear(new Date(yr), new Date());
        if (result === true) {
            setTable(1);
        }
        else {
            setTable(1);
        }
    }, [year])

    const OpenInsertModal = useCallback(() => {
        setinsetmodal(1);
        setOpen(true);
    }, [])
    return (
        <CustomDashboardPage title="Departmental Training Calender" displayClose={true} setClose={setShow}  >
            <ToastContainer />
            <Paper elevation={0} sx={{ width: "100%", p: 1 }}>

                <Paper elevation={0} variant='outlined' sx={{ width: "100%", p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DepartmentDropRedx getDept={setdept} />
                    </Box>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DepartmentSectionRedx getSection={setdeptSec} />
                    </Box>
                    <Tooltip title="Select Year">
                        <Box sx={{ mt: 0.5 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year']}
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

                    <Box sx={{ pt: 1 }}>
                        <CssVarsProvider>
                            <IconButton
                                variant="outlined"
                                size='sm'
                                color='primary'
                                onClick={DisplayTable}
                                sx={{ color: '#347aeb' }}
                            >
                                <PageviewIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CssVarsProvider>
                            <IconButton
                                variant="outlined"
                                size='sm'
                                color='primary'
                                onClick={OpenInsertModal}
                                sx={{ color: '#347aeb' }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>



                {
                    table === 1 ? <ScheduleCalender year={year} setYear={setYear} currentYear={currentYear} count={count} Setcount={Setcount} /> : null
                }

                {/* {
                    insertModal === 1 ? <TraningSchedModalJoy open={open} setinsetmodal={setinsetmodal} setOpen={setOpen} /> : null
                } */}
                {
                    insertModal === 1 ? <DetailsInsertModal open={open} setinsetmodal={setinsetmodal} setOpen={setOpen} /> : null
                }
            </Paper>
        </CustomDashboardPage >
    )
}

export default memo(DepartmentalCalender)
