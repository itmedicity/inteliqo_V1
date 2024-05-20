import { Button, CssVarsProvider, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SaveIcon from '@mui/icons-material/Save';
import { startOfMonth } from 'date-fns';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const RescheduleModal = ({ count, Setcount, open, Setopen, getData }) => {

    const [data, SetData] = useState({
        em_name: '',
        datefmt: '',
        training_topic_name: '',
        slno: 0,
        topic_slno: 0,
        schedule_date: '',
        schedule_remark: '',
        schedule_trainers: [],
        emp_dept: 0,
        emp_dept_sectn: 0,
        schedule_year: '',
        employeeno: 0
    })

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const { em_name, datefmt, training_topic_name, slno, topic_slno, schedule_trainers, emp_dept, emp_dept_sectn, schedule_year, employeeno } = data

    const [Reschedule, setReschedule] = useState(moment(new Date(datefmt)).format("YYYY-MM-DD"));

    useEffect(() => {
        if (getData.length !== 0) {
            const viewData = getData?.find((val) => val.pretest_status === 0)
            const { em_name, datefmt, em_id, training_topic_name, slno, topic_slno, schedule_date, schedule_remark, schedule_trainers, emp_dept, emp_dept_sectn, schedule_year } = viewData;
            const obj = {
                em_name: em_name,
                datefmt: datefmt,
                training_topic_name: training_topic_name,
                slno: slno,
                topic_slno: topic_slno,
                schedule_date: schedule_date,
                schedule_remark: schedule_remark,
                schedule_trainers: schedule_trainers,
                emp_dept: emp_dept,
                emp_dept_sectn: emp_dept_sectn,
                schedule_year: schedule_year,
                employeeno: em_id
            }
            SetData(obj);
        }
    }, [getData, SetData])
    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    const reset = useCallback(() => {
        setReschedule('')
        Setopen(false)
    }, [Setopen])

    const start = startOfMonth(new Date(datefmt))

    const patchdata = useMemo(() => {
        return {
            slno: slno,
            schedule_date: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            topic_slno: topic_slno,
            schedule_remark: 'Rescheduled',
            schedule_trainers: schedule_trainers,
            emp_dept: emp_dept,
            emp_dept_sectn: emp_dept_sectn,
            schedule_year: moment(schedule_year).format("YYYY-MM-DD"),
            edit_user: em_id,
            create_user: em_id,
            employeeno: employeeno,
            status: 1
        }
    }, [slno, Reschedule, topic_slno, employeeno, schedule_year, schedule_trainers, emp_dept, emp_dept_sectn, em_id])


    const handleSubmit = useCallback(async () => {
        const result = await axioslogin.patch('/TrainingProcess/resheduledate', patchdata)
        const { success, message } = result.data
        if (success === 1) {
            reset();
            succesNofity(message);
            Setcount(count + 1);
        }
        else {
            warningNofity(message)
        }
    }, [patchdata, count, reset, Setcount])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "30%", height: 300 }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body'
                    }}
                />
                <Typography
                    fontSize="xl2"
                    lineHeight={1}
                    startDecorator={
                        <PendingActionsIcon sx={{ color: 'green' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                >
                    Training Reschedule
                </Typography>

                <Box sx={{ px: 4 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 0.5, gap: 15, textTransform: "capitalize" }}>
                        <Box>Name</Box>
                        <Box>{em_name.toLowerCase()}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 0.5, gap: 7.5, textTransform: "capitalize" }}>
                        <Box>Training Topic</Box>
                        <Box>{training_topic_name.toLowerCase()}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 0.5, gap: 7 }}>
                        <Box>Schedule Date</Box>
                        <Box>{datefmt}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 1.4, gap: 5 }}>
                        <Box>Reschedule Date</Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    views={['day']}
                                    minDate={moment(new Date(start)).format('YYYY-MM-DD')}
                                    value={Reschedule}
                                    size="small"
                                    onChange={(e) => {
                                        setReschedule(moment(e).format("YYYY-MM-DD"));
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 3 }}>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleSubmit}
                            size="sm"
                            sx={{ px: 3, color: '#81c784' }}
                        >
                            <SaveIcon sx={{ fontSize: 20 }} />
                        </Button>
                    </CssVarsProvider>
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(RescheduleModal)
