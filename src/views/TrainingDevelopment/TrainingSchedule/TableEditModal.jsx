import React, { Fragment, memo } from 'react'
import Box from '@mui/material/Box';
import { useCallback } from 'react';
import { Paper, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography, Button } from '@mui/joy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const TableEditModal = ({ open, setOpen, setFlag, count, Setcount, rowdata }) => {

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const [scheduleDate, setScheduleDate] = useState(moment());
    const [slno, setSlno] = useState(0);
    const [data, setdata] = useState({
        slno: 0,
        date: '',
        month: '',
        schedule_date: '',
        em_id: '',
        traineer_name: '',
        training_topic_name: '',
        topic_slno: '',
    })

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen])

    useEffect(() => {
        if (Object.keys(rowdata).length !== 0) {
            const { date, month, schedule_date, traineer_name, training_topic_name, slno, em_id, topic_slno } = rowdata;
            const obj = {
                slno: slno,
                date: date,
                month: month,
                schedule_date: moment(schedule_date).format("YYYY-MM-DD"),
                traineer_name: traineer_name,
                training_topic_name: training_topic_name,
                topic_slno: topic_slno,
                em_id: em_id
            }
            setdata(obj);
            setSlno(slno);
        }

    }, [rowdata])

    const patchdata = useMemo(() => {
        return {
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            slno: slno,
            edit_user: em_id
        }
    }, [scheduleDate, slno, em_id])

    const SubmitSchedule = useCallback(() => {

        const patchinsert = async (patchdata) => {

            const result = await axioslogin.patch('/TrainingAfterJoining/ScheduledateUpdate', patchdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Update successfully")
                setFlag(0);
                Setcount(count + 1);
            }
            else {
                warningNofity(message)
            }
        }
        patchinsert(patchdata);
    }, [patchdata, count, Setcount, setFlag])
    return (
        <Fragment>
            <Dialog
                open={open}
            >
                <Paper sx={{ m: 1, }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg" variant="soft" >
                                Departmental Training
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ display: 'flex', minWidth: 500, height: 180, flexDirection: 'column' }} >

                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box><Typography>Schedule Date</Typography></Box>
                                <Box sx={{ mt: 2 }}><Typography>Trainer Names</Typography></Box>
                                <Box sx={{ mt: 2 }}><Typography>Reschedule Date</Typography></Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box>{data?.schedule_date}</Box>
                                <Box sx={{ mt: 2 }} >{data?.traineer_name}</Box>
                                <Box sx={{ mt: 2 }}>
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
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={SubmitSchedule}
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
            </Dialog>
        </Fragment>
    )
}

export default memo(TableEditModal)
