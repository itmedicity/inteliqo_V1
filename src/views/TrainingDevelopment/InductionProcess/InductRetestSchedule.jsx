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


const InductRetestSchedule = ({ count, Setcount, open, Setopen, getData }) => {

    const [Reschedule, setReschedule] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [data, SetData] = useState({
        induction_slno: 0,
        schedule_no: 0,
        indct_emp_no: 0,
        induct_emp_dept: 0,
        induct_emp_sec: 0,
        datefmt: '',
        question_count: 0,
        training_status: 0,
        em_name: '',
        topic_slno: 0,
        training_topic_name: '',
        induction_date: ''
    })

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const { induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec, datefmt, question_count, training_status, em_name, topic_slno, training_topic_name } = data

    useEffect(() => {
        if (getData.length !== 0) {
            const viewData = getData?.find((val) => val.candid_id !== 0)
            const { induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec, datefmt, question_count, training_status, em_name, topic_slno, training_topic_name, induction_date } = viewData;
            const obj = {
                induction_slno: induction_slno,
                schedule_no: schedule_no,
                indct_emp_no: indct_emp_no,
                induct_emp_dept: induct_emp_dept,
                induct_emp_sec: induct_emp_sec,
                datefmt: datefmt,
                question_count: question_count,
                training_status: training_status,
                em_name: em_name,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                induction_date: induction_date
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

    const start = startOfMonth(new Date(Reschedule))

    const postData = useMemo(() => {
        return {
            induction_slno: induction_slno,
            schedule_no: schedule_no,
            indct_emp_no: indct_emp_no,
            induct_emp_dept: induct_emp_dept,
            induct_emp_sec: induct_emp_sec,
            date: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            question_count: question_count,
            training_status: training_status,
            topic_slno: topic_slno,
            create_user: em_id
        }
    }, [induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec, Reschedule, question_count, training_status, topic_slno, em_id])

    const handleSubmit = useCallback(async () => {
        const result = await axioslogin.post('/InductionProcess/retestEmps', postData)
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
                        <Box>{training_topic_name.toLowerCase()}</Box>
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

export default memo(InductRetestSchedule)
