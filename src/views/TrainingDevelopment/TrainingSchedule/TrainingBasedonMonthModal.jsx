import React, { Fragment, memo, useState } from 'react'
import Box from '@mui/material/Box';
import { Paper, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography, Button } from '@mui/joy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useCallback } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';

const TrainingBasedonMonthModal = ({ open, setOpen, dept,
    deptSec, year, count, Setcount, setTable,
    start, end }) => {
    const [selectdate, setSelectdate] = useState(moment(new Date()));
    const [viewTable, setViewTable] = useState(0)
    const [remark, setRemark] = useState('');
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);


    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const handleClose = useCallback(() => {
        setOpen(false);
        setViewTable(0);
    }, [setOpen, setViewTable])

    //reset 
    const reset = useCallback(() => {
        setRemark('');
        setSelectdate('');
    }, [])


    const handleText = useCallback((event) => {
        setRemark(event.target.value);
    }, []);


    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e)).format("YYYY-MM-DD")
        setSelectdate(d)
        setViewTable(1);
    }, [])

    //postData
    const postData = useMemo(() => {
        return {
            department: dept,
            deparment_sect: deptSec,
            schedule_year: moment(year).format("YYYY-MM-DD"),
            schedule_date: selectdate,
            schedule_topics: topic,
            schedule_trainers: trainer,
            schedule_remark: remark,
            create_user: em_id
        }
    }, [dept, deptSec, year, selectdate, topic, trainer, remark, em_id])

    const HandleSubmit = useCallback(() => {
        if (dept !== 0 && deptSec !== 0 && year !== '' && trainer.length !== 0 && topic !== 0 && selectdate !== '' && remark !== '') {
            const InsertData = async (postData) => {
                const result = await axioslogin.post("TrainingAfterJoining/InsertDepartmentalSchedule", postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    reset();
                    Setcount(count + 1);
                    setOpen(false);
                    setTable(0);
                }
                else {
                    warningNofity(message);
                    setOpen(false);
                    reset();
                    setTable(0);
                }
            }
            InsertData(postData)
        }
        else {
            warningNofity("Please Enter the given fields ")
        }

    }, [postData, Setcount, count, dept, deptSec, year, trainer, topic, selectdate, remark, reset, setOpen, setTable])

    return (
        <Fragment>
            <Dialog
                open={open}
                maxWidth="xl"
            >
                <Paper sx={{ m: 1 }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg" variant="soft" >
                                Departmental Training
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ px: 5, display: 'flex', width: 500, height: 245, flexDirection: 'column' }} >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box sx={{ px: 2, mt: 0.8 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        From Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 3 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        views={['day']}
                                        showYearDropdown
                                        minDate={start}
                                        maxDate={end}
                                        value={selectdate}
                                        name="selectdate"
                                        onChange={(newValue) => {
                                            UpdateDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        {
                            viewTable === 1 ?
                                <Box sx={{
                                }}>
                                    <Box sx={{ px: 2 }}>
                                        <Box sx={{ display: "flex", flexDirection: "row", mt: 1, width: "100%" }}>
                                            <Box><Typography>Select Topic</Typography></Box>
                                            <Box sx={{ width: "75%", pl: 4 }}><SelectTopics setTopic={setTopic} /></Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row", mt: 1, width: "100%" }}>
                                            <Box><Typography>Select Trainers</Typography></Box>
                                            <Box sx={{ width: "71%", pl: 2 }}><SelectTrainer setTrainer={setTrainer} /></Box>
                                        </Box>
                                    </Box>

                                    <textarea
                                        rows={2}
                                        value={remark}
                                        onChange={handleText}
                                        placeholder="Drop Remarks here.."
                                        style={{ width: '100%', marginTop: 3 }}
                                    />
                                </Box>
                                : null
                        }

                    </DialogContent>
                    <DialogActions sx={{ px: 5 }}>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={HandleSubmit}
                                size="sm"
                                sx={{ py: 0, color: '#81c784' }}
                            >
                                <LibraryAddCheckIcon sx={{ fontSize: 25 }} />
                            </Button>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={handleClose}
                                size="sm"
                                sx={{ py: 0, color: '#d50000' }}
                            >
                                <CancelOutlinedIcon sx={{ fontSize: 25 }} />
                            </Button>
                        </CssVarsProvider>
                    </DialogActions>
                </Paper>
            </Dialog >
        </Fragment >
    )
}

export default memo(TrainingBasedonMonthModal)
