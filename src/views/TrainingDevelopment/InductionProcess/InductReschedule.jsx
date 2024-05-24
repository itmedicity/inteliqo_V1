import { Button, CssVarsProvider, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { startOfMonth } from 'date-fns';

const InductReschedule = ({ count, Setcount, open, Setopen, getData }) => {

    const [Reschedule, setReschedule] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [data, SetData] = useState({
        indct_emp_no: 0,
        em_name: '',
        training_topic_name: '',
        schedule_no: 0,
        topic_slno: 0,
        induction_date: '',
        induct_emp_dept: 0,
        induct_emp_sec: 0,
        question_count: 0,
        training_status: 0,
        datefmt: '',
        induction_slno: 0,
        trainers: [],
        schedule_type: 0,
        employeeId: 0
    })

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const { indct_emp_no, employeeId, datefmt, em_name, trainers, schedule_type, induction_slno, training_topic_name, schedule_no, topic_slno, induct_emp_dept, induct_emp_sec, question_count, training_status } = data

    const start = startOfMonth(new Date(datefmt))

    useEffect(() => {
        if (getData.length !== 0) {
            const viewData = getData?.find((val) => val.indct_emp_no !== 0)
            const { indct_emp_no, trainers, em_id, schedule_type, datefmt, em_name, induction_slno, training_topic_name, schedule_no, topic_slno, induction_date, induct_emp_dept, induct_emp_sec, question_count, training_status } = viewData;
            const obj = {
                indct_emp_no: indct_emp_no,
                datefmt: datefmt,
                em_name: em_name,
                training_topic_name: training_topic_name,
                schedule_no: schedule_no,
                topic_slno: topic_slno,
                induction_date: induction_date,
                induct_emp_dept: induct_emp_dept,
                induct_emp_sec: induct_emp_sec,
                question_count: question_count,
                training_status: training_status,
                induction_slno: induction_slno,
                trainers: trainers,
                schedule_type: schedule_type,
                employeeId: em_id
            }
            SetData(obj);
        }
    }, [getData, SetData])

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    const reset = useCallback(() => {
        Setopen(false)
    }, [Setopen])



    const postData = useMemo(() => {
        return {
            slno: schedule_no,
            indct_emp_no: indct_emp_no,
            induct_emp_dept: induct_emp_dept,
            induct_emp_sec: induct_emp_sec,
            retest_date: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            retest_topic: topic_slno,
            attendance_status: training_status,
            retest_quest_count: question_count,
            create_user: em_id,
            edit_user: em_id,
            induction_slno: induction_slno,
            trainers: trainers,
            schedule_type: schedule_type,
            employeeId: employeeId,
            status: 1
        }
    }, [schedule_type, trainers, employeeId, schedule_no, indct_emp_no, induction_slno, induct_emp_dept, induct_emp_sec, topic_slno, Reschedule, training_status, question_count, em_id])

    const handleSubmit = useCallback(async () => {
        const result = await axioslogin.patch('/InductionProcess/EmpReschedule', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message);
            Setcount(count + 1);
            reset();
        }
        else {
            warningNofity(message)
            Setcount(0)
        }
    }, [postData, count, reset, Setcount])

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
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 15, textTransform: "capitalize" }}>
                        <Box>Name</Box>
                        <Box>{em_name.toLowerCase()}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 7.5, textTransform: "capitalize" }}>
                        <Box>Training Topic</Box>
                        <Box>{training_topic_name !== null ? training_topic_name.toLowerCase() : ''}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 7 }}>
                        <Box>Schedule Date</Box>
                        <Box>{datefmt}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 2, gap: 5 }}>
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
                            <SaveIcon sx={{ fontSize: 25 }} />
                        </Button>
                    </CssVarsProvider>
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(InductReschedule)


