import React, { Fragment, memo } from 'react'
import { useCallback } from 'react';
import { Paper, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography, Button, Box, Input } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import _ from 'underscore';
import TraineesBasedonDept from 'src/views/MuiComponents/TraineesBasedonDept';
import { useSelector } from 'react-redux';
// import Modal from '@mui/joy/Modal';
// import ModalClose from '@mui/joy/ModalClose';
// import JoyTraineesBasedOnDept from 'src/views/MuiComponents/JoyTraineesBasedOnDept';
// import { EmpBasedonDept } from 'src/redux/actions/Training.Action';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { endOfMonth } from 'date-fns';

const TableEditModals = ({ yr, open, setOpen, setFlag, count, Setcount, rowdata, monthdata }) => {

    // const dispatch = useDispatch();
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const [scheduleDate, setScheduleDate] = useState(moment());
    const [slno, setSlno] = useState(0);
    const [emplist, setEmplist] = useState([]);
    const [dept, setDept] = useState(0)
    const [data, setdata] = useState({
        slno: 0,
        date: '',
        month: '',
        schedule_date: '',
        em_id: '',
        traineer_name: '',
        training_topic_name: '',
        topic_slno: '',
        dept_id: 0,
        sect_id: 0
    })
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen])

    const reset = useCallback(() => {
        setEmplist([])
        setDept(0)
        setScheduleDate('')
    })
    useEffect(() => {
        if (Object.keys(rowdata).length !== 0) {
            const { date, month, schedule_date, traineer_name, training_topic_name, slno, em_id, topic_slno, dept_id, sect_id } = rowdata;
            const obj = {
                slno: slno,
                date: date,
                month: month,
                schedule_date: moment(schedule_date).format("YYYY-MM-DD"),
                traineer_name: traineer_name,
                training_topic_name: training_topic_name,
                topic_slno: topic_slno,
                em_id: em_id,
                dept_id: dept_id,
                sect_id: sect_id
            }
            setdata(obj);
            setSlno(slno);
            setDept(dept_id);
        }

    }, [rowdata])

    const patchdata = useMemo(() => {
        return {
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            slno: slno,
            edit_user: em_id
        }
    }, [scheduleDate, slno, em_id])

    const postdata = emplist?.map((val) => {
        const obj = {
            emp_name: val,
            emp_dept: data.dept_id,
            emp_dept_sectn: data.sect_id,
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            topic: data.topic_slno,
            create_user: em_id
        }
        return obj
    }, [emplist, scheduleDate, em_id, data])
    const SubmitSchedule = useCallback(async () => {
        const result = await axioslogin.patch('/TrainingAfterJoining/ScheduledateUpdate', patchdata)
        const { success, message } = result.data
        if (success === 1) {
            const results = await axioslogin.post('/TrainingAfterJoining/insertEmployees', postdata)
            const { success, message } = results.data
            if (success === 1) {
                succesNofity(message);
                setFlag(0);
                Setcount(count + 1);
                reset();
            }
            else {
                warningNofity(message)
            }
        }
        else {
            warningNofity(message)
            setFlag(0);

        }


    }, [patchdata, postdata, count, reset, Setcount, setFlag])

    // useEffect(() => {
    //     dispatch(EmpBasedonDept(dept))
    // }, [dispatch, dept])
    const date = new Date(yr, monthdata, 1);
    const end = endOfMonth(new Date(date))

    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e.target.value)).format("YYYY-MM-DD")
        setScheduleDate(d)
    }, [setScheduleDate])

    const formattedScheduleDate = moment(scheduleDate).format('YYYY-MM-DD');
    return (
        <Fragment>
            {/* <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        This is the modal title
                    </Typography>
                    <Box sx={{ mt: 2, width: "70%" }} >

                        <JoyTraineesBasedOnDept dept={dept} getDeptEmp={setEmplist} />
                    </Box>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                        optional <code>aria-describedby</code> attribute.
                    </Typography>
                </Sheet>
            </Modal> */}



            <Dialog
                open={open}
                maxWidth="xl"
            >
                <Paper sx={{ m: 1 }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg"  >
                                Training Schedule
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ display: 'flex', width: 600, height: 300, flexDirection: 'column', px: 10 }} >
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Box sx={{ width: '50%' }}>Schedule Date</Box>
                            <Box sx={{ minWidth: '50%' }}>{data?.schedule_date}</Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Box sx={{ width: '50%' }}>Training Topic</Box>
                            <Box sx={{ flex: 1, textTransform: "capitalize" }}>{data?.training_topic_name.toUpperCase()}</Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Box sx={{ width: '50%' }}>Trainer Names</Box>
                            <Box sx={{ width: '50%' }}>{data?.traineer_name}</Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Box sx={{ width: '50%' }}>Select Employees</Box>
                            <Box sx={{ width: '50%' }}>
                                <TraineesBasedonDept dept={dept} value={emplist} setValue={setEmplist} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Box sx={{ width: '50%', mt: 1 }}>Reschedule Date</Box>
                            <Box sx={{ width: '50%' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Input
                                        type="date"
                                        fullWidth
                                        slotProps={{
                                            input: {
                                                max: moment(new Date(end)).format('YYYY-MM-DD'),
                                            },
                                        }}
                                        value={formattedScheduleDate}
                                        name="scheduleDate"
                                        onChange={(e) => UpdateDate(e)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 10 }}>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={SubmitSchedule}
                                size="sm"
                                sx={{ py: 0, color: '#81c784' }}
                            >
                                <SaveIcon sx={{ fontSize: 25 }} />
                            </Button>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={handleClose}
                                size="sm"
                                sx={{ py: 0, color: '#d50000' }}
                            >
                                <ClearIcon sx={{ fontSize: 25 }} />
                            </Button>
                        </CssVarsProvider>
                    </DialogActions>
                </Paper>
            </Dialog>
        </Fragment >
    )
}

export default memo(TableEditModals)
