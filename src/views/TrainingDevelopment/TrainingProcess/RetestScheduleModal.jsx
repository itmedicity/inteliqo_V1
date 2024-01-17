import { Button, CssVarsProvider, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment';
import SaveIcon from '@mui/icons-material/Save';
import { endOfMonth } from 'date-fns';
import { useSelector } from 'react-redux';
import _ from 'underscore';


const RetestScheduleModal = ({ count, Setcount, open, Setopen, getData }) => {

    const [Reschedule, setReschedule] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [data, SetData] = useState({
        candid_id: 0,
        em_name: '',
        training_topic_name: '',
        slno: 0,
        topic_slno: 0,
        schedule_date: '',
        emp_dept: 0,
        emp_dept_sectn: 0,
        question_count: 0,
        training_status: 0,
        datefmt: '',
        retest_status: 0
    })

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const { candid_id, em_name, training_topic_name, datefmt, slno, topic_slno, emp_dept, emp_dept_sectn, question_count, training_status } = data

    useEffect(() => {
        if (getData.length !== 0) {
            const viewData = getData?.find((val) => val.candid_id !== 0)
            const { candid_id, datefmt, em_name, training_topic_name, retest_status, slno, topic_slno, schedule_date, emp_dept, emp_dept_sectn, question_count, training_status } = viewData;
            const obj = {
                retest_status: retest_status,
                candid_id: candid_id,
                datefmt: datefmt,
                em_name: em_name,
                training_topic_name: training_topic_name,
                slno: slno,
                topic_slno: topic_slno,
                schedule_date: schedule_date,
                emp_dept: emp_dept,
                emp_dept_sectn: emp_dept_sectn,
                question_count: question_count,
                training_status: training_status
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

    const end = endOfMonth(new Date(Reschedule))

    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e.target.value)).format("YYYY-MM-DD")
        setReschedule(d)
    }, [setReschedule])

    const postData = useMemo(() => {
        return {
            slno: slno,
            candidate_em_no: candid_id,
            candidate_dept: emp_dept,
            candidate_dept_sec: emp_dept_sectn,
            retest_date: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            retest_topic: topic_slno,
            attendance_status: training_status,
            retest_quest_count: question_count,
            create_user: em_id,
            edit_user: em_id,

        }
    }, [candid_id, slno, emp_dept, emp_dept_sectn, topic_slno, Reschedule, training_status, question_count, em_id])

    const handleSubmit = useCallback(async () => {
        const result = await axioslogin.post('/TrainingEmployee_Dashboard/retestEmp', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message);
            Setcount(count + 1);
            reset();
        }
        else {
            warningNofity(message)
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
                            <Input
                                type="date"
                                fullWidth
                                slotProps={{
                                    input: {
                                        max: moment(new Date(end)).format('YYYY-MM-DD'),
                                    },
                                }}
                                value={Reschedule}
                                name="scheduleDate"
                                onChange={(e) => UpdateDate(e)}
                            />
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

export default memo(RetestScheduleModal)
