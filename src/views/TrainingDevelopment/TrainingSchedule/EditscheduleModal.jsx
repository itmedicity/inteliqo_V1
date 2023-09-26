import React, { Fragment, memo, useMemo } from 'react'
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
import { ToastContainer } from 'react-toastify';


const EditscheduleModal = ({ open, setOpen, setmodalFlag, scheduledata, count, Setcount }) => {

    const [scheduleDate, setScheduleDate] = useState(moment());

    const [slno, setSlno] = useState(0)

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [])

    useEffect(() => {
        if (Object.keys(scheduledata).length !== 0) {
            const { tnd_slno, cat_slno, dept_id, dept_name, em_id, em_name, name_slno, sect_id, sect_name, tns_date, tns_emp_id, training_name, trainingtype_slno, trin_cat_name, type_name } = scheduledata;
            setSlno(tnd_slno)

        } else {

        }
    }, [scheduledata])

    const patchdata = useMemo(() => {
        return {
            tnd_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            tnd_slno: slno
        }
    }, [scheduleDate, slno])


    const SubmitSchedule = useCallback(() => {

        const patchinsert = async (patchdata) => {
            const result = await axioslogin.patch('/TrainingAfterJoining/ScheduleUpdate', patchdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Update successfully")
                setmodalFlag(0);
                Setcount(count + 1);
            }
            else {
                warningNofity(message)
            }
        }
        patchinsert(patchdata);
    }, [patchdata, count])


    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
            >
                <Paper sx={{ m: 1, }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg" variant="soft" >
                                Training Schedule Update
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ display: 'flex', minWidth: 500, height: 250, flexDirection: 'column' }} >
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box><Typography>Emp No</Typography></Box>
                                <Box><Typography>Name</Typography></Box>
                                <Box><Typography>Dept</Typography></Box>
                                <Box><Typography>Dep.Sec</Typography></Box>
                                <Box><Typography>Training Type</Typography></Box>
                                <Box><Typography>Training Category</Typography></Box>
                                <Box><Typography>Training Name</Typography></Box>
                                <Box sx={{ mt: 1 }}><Typography>Schedule Date</Typography></Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", textTransform: "capitalize" }}>
                                <Box><Typography>: {scheduledata.tns_emp_id}</Typography></Box>
                                <Box><Typography>: {scheduledata.em_name.toLowerCase()}</Typography></Box>
                                <Box><Typography>: {scheduledata.dept_name.toLowerCase()}</Typography></Box>
                                <Box><Typography>: {scheduledata.sect_name.toLowerCase()}</Typography></Box>
                                <Box><Typography>: {scheduledata.type_name.toLowerCase()}</Typography></Box>
                                <Box><Typography>: {scheduledata.trin_cat_name.toLowerCase()}</Typography></Box>
                                <Box><Typography>: {scheduledata.training_name.toLowerCase()}</Typography></Box>
                                <Box sx={{ mt: 1 }}>

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

export default memo(EditscheduleModal)
