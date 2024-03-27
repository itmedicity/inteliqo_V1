import { Input, Modal, ModalClose, ModalDialog, Typography, IconButton, CssVarsProvider, Button } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment';
import { endOfMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import JoyTrainerMultipleSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainerMultipleSelect';
import { Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import { TrainerNames } from 'src/redux/actions/Training.Action';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const EditTable = ({ count, setcount, editbtn, seteditbtn, setviewModal, getdata }) => {

    const dispatch = useDispatch()

    const [Reschedule, setReschedule] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [NewTrainers, setNewTrainers] = useState([]);
    const [editTrainer, seteditTrainer] = useState(0)
    const [getTrainers, setgetTrainers] = useState([]);

    useEffect(() => {
        dispatch(TrainerNames())
    }, [dispatch, count])

    const [data, SetData] = useState({
        schedule_slno: '',
        date: '',
        training_topic_name: '',
        schedule_topic: 0,
        schedule_type: 0,
        trainers: [],
        topic_slno: 0,
        trainingtype_slno: 0,
        type_name: ''
    })


    const [state, SetState] = useState({
        trainer: [],
        topic: 0,
        trainer_name: ''
    })
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const { schedule_slno, topic_slno, trainingtype_slno } = data

    useEffect(() => {
        if (getdata.length !== 0) {
            const viewData = getdata?.find((val) => val.schedule_slno !== 0)
            const { schedule_slno, date, schedule_topic, schedule_type, topic_slno, trainers, trainers_name, training_topic_name, trainingtype_slno, type_name } = viewData;
            const obj = {
                schedule_slno: schedule_slno,
                date: date,
                schedule_topic: schedule_topic,
                schedule_type: schedule_type,
                topic_slno: topic_slno,
                trainers: trainers,
                trainers_name: trainers_name,
                training_topic_name: training_topic_name,
                trainingtype_slno: trainingtype_slno,
                type_name: type_name
            }
            SetData(obj);
        }
    }, [getdata, SetData])

    const Handleclose = useCallback((e) => {
        seteditbtn(false)
    }, [seteditbtn])

    const end = endOfMonth(new Date(Reschedule))

    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e.target.value)).format("YYYY-MM-DD")
        setReschedule(d)
    }, [setReschedule])

    useEffect(() => {
        if (schedule_slno !== 0 && trainingtype_slno !== 0 && topic_slno !== 0) {
            const obj = {
                schedule_slno: schedule_slno,
                trainingtype_slno: trainingtype_slno,
                topic_slno: topic_slno
            }
            const setData = (async () => {
                const result = await axioslogin.post('/InductionTraining/getTraineers', obj)
                const { data, success } = result.data
                if (success === 2) {
                    setgetTrainers(data)
                }
                else {
                    setgetTrainers([])
                }
            })
            setData()
        }
        else {
            setgetTrainers([])
        }

    }, [schedule_slno, topic_slno, trainingtype_slno, setgetTrainers])

    useEffect(() => {
        if (getTrainers.length !== 0) {
            const viewData = getTrainers?.find((val) => val.topic !== 0)
            const { trainer, topic, trainer_name } = viewData;
            const obj = {
                trainer: trainer,
                topic: topic,
                trainer_name: trainer_name
            }
            SetState(obj);
        }
    }, [getTrainers, SetState])

    const patchdata = useMemo(() => {
        return {
            schedule_slno: schedule_slno,
            NewTrainers: NewTrainers,
            Reschedule: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            edit_user: em_id,
        }
    }, [schedule_slno, NewTrainers, Reschedule, em_id])

    const editDate = useCallback(async () => {
        const result = await axioslogin.patch('/InductionTraining/UpdateDate', patchdata)
        const { success, message } = result.data
        if (success === 1) {
            setviewModal(false)
            seteditbtn(false)
            succesNofity(message)
            setcount(count + 1);
        }
        else {
            warningNofity("Date Not Changed")
        }

    }, [patchdata, setviewModal, seteditbtn, setcount, count])

    const EditTrainers = useCallback(() => {
        seteditTrainer(1)
    }, [seteditTrainer])

    const patchdatas = useMemo(() => {
        return {
            schedule_slno: schedule_slno,
            NewTrainers: NewTrainers,
            edit_user: em_id,
        }
    }, [schedule_slno, NewTrainers, em_id])

    const submitTrainers = useCallback(async () => {
        if (editTrainer === 1) {
            const result = await axioslogin.patch('/InductionTraining/UpdateTrainers', patchdatas)
            const { success, message } = result.data
            if (success === 1) {
                setviewModal(false)
                seteditbtn(false)
                succesNofity(message)
                setcount(count + 1);
            }
            else {
                warningNofity("Not Changed")
            }
        }
    }, [editTrainer, setviewModal, seteditbtn, setcount, count, patchdatas])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={editbtn}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "30%", height: 350 }}>
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
                        <EditIcon sx={{ color: 'green' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                >
                    Change Date & Trainers
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: "row", p: 1, gap: 5 }}>
                    <Box >
                        <Box sx={{ mt: 2 }}>Schedule Date</Box>
                        <Box sx={{ mt: 2 }}>Training Topic</Box>
                        <Box sx={{ mt: 2 }}>Trainer Names</Box>
                        <Box sx={{ mt: 4 }}>Reschedule Date</Box>
                    </Box>
                    <Box >
                        <Box sx={{ mt: 2 }}>{data?.date}</Box>
                        <Box sx={{ mt: 2, textTransform: "capitalize" }}>{data?.training_topic_name.toLowerCase()}</Box>
                        <Box sx={{ mt: 2 }}>
                            {
                                editTrainer === 1 ?
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                        <Box sx={{ width: "100%" }}>
                                            <JoyTrainerMultipleSelect value={NewTrainers} setValue={setNewTrainers} />
                                        </Box>
                                        <Tooltip title="Change Trainer">
                                            <Box>
                                                <IconButton onClick={(e) => { submitTrainers(e) }}>
                                                    <CheckIcon />
                                                </IconButton>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                    : <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                        <Box sx={{ textTransform: "capitalize" }}>{state?.trainer_name.toLowerCase()}</Box>
                                        <Tooltip title="Change Trainer">
                                            <Box>
                                                <IconButton onClick={(e) => { EditTrainers(e) }}>
                                                    <CachedIcon />
                                                </IconButton>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                            }
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="date"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            max: moment(new Date(end)).format('YYYY-MM-DD'),
                                        },
                                    }}
                                    value={Reschedule}
                                    name="RescheduleDate"
                                    onChange={(e) => UpdateDate(e)}
                                />
                            </Box>
                            <Tooltip title="Save New Date">
                                <Box>
                                    <IconButton onClick={(e) => { editDate(e) }}>
                                        <CheckIcon />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
                <Tooltip title="Save">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "flex-end",
                    }} >
                        <CssVarsProvider>
                            <Box  >
                                <Button aria-label="submit" variant="outlined"
                                >
                                    <SaveIcon sx={{ width: 100 }} />
                                </Button>
                            </Box>
                        </CssVarsProvider>
                    </Box>
                </Tooltip>
            </ModalDialog>
        </Modal >
    )
}

export default memo(EditTable)











