
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, ModalDialog, ModalClose, Box, Typography, Input, Button, Select, Option } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const AddTrainingDatas = ({ empTdata, addBtn, setAddBtn }) => {
    const [entryCount, setEntryCount] = useState('');
    const [trainingData, setTrainingData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [trainer, setTrainer] = useState([]);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;
    const logUser = em_id;

    useEffect(() => {
        const count = parseInt(entryCount, 10);
        if (!isNaN(count) && count > 0) {
            setTrainingData(prev =>
                Array.from({ length: count }, (_, i) => prev[i] || {
                    date: new Date(),
                    topic: 0,
                    trainer: 0,
                    preMark: '',
                    postMark: ''
                })
            );
        } else {
            setTrainingData([]);
        }
    }, [entryCount]);

    const handleChange = (index, field, value) => {
        setTrainingData(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddTraining = useCallback(async () => {

        if (trainingData?.length !== 0) {
            const { em_id, em_name, dept_id, sect_id, desg_slno } = empTdata[0];
            const merged = trainingData.map(td => ({
                date: format(new Date(td.date), "yyyy-MM-dd HH:ss:mm"),
                createDate: format(new Date(), "yyyy-MM-dd HH:ss:mm"),
                premark: parseInt(td.preMark),
                postmark: parseInt(td.postMark),
                em_id,
                em_name,
                sect_id,
                logUser,
                dept_id,
                desg_slno,
                training_status: 1,
                offline: 1,
                online: 0,
                topic: parseInt(td.topic),
                trainer: [parseInt(td.trainer)],
                question_count: 10,
                pretest_status: 1,
                posttest_status: 1,
                posttest_permission: 1,
                schedule_year: format(new Date(), "yyyy-MM-dd"),
                remark: "ADDITIONAL TRAININGS ENTERED BY T&D"
            }));
            const result = await axioslogin.post(`/Training_additional_entry/insertTrainings`, merged)
            const { message, success } = result.data
            if (success === 1) {
                succesNofity(message)
                setTrainingData([]);
                setEntryCount('')
                setAddBtn(false)
            } else {
                warningNofity("Training Not Added")
            }
        }
        else {
            setEntryCount('')
            setTrainingData([]);
            warningNofity("Enter Training Count And Enter Training Details Before Submission!")
        }
    }, [trainingData, empTdata, logUser]);

    useEffect(() => {
        const getTopicData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/selecttopic`)
            const { data, success } = result.data
            if (success === 2) {
                setTopics(data);
            } else {
                setTopics([]);
            }
        }
        getTopicData()
        const getTrainerData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/SelectTrainer`)
            const { data, success } = result.data;
            if (success === 2) {
                setTrainer(data);
            } else {
                setTrainer([]);
            }
        }
        getTrainerData();
    }, [])

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={addBtn}
                    onClose={() => setAddBtn(0)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ModalDialog size="lg" sx={{ p: 2, width: "30%" }}>
                        <ModalClose
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                            }}
                        />
                        <Box>
                            <Typography level="h5" sx={{ textAlign: "center", mb: 2, color: "#2973B2" }}>
                                Additional Trainings
                            </Typography>
                            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: 2, p: 1.5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Input
                                        type="text"
                                        value={entryCount}
                                        onChange={(e) => setEntryCount(e.target.value)}
                                        placeholder="Enter Count"
                                        style={{ padding: '8px', width: '100%', fontSize: '14px' }}
                                    />
                                </Box>
                                <Box sx={{ maxHeight: '400px', overflow: 'auto', pr: 1 }}>
                                    {trainingData?.map((entry, index) => (
                                        <Box key={index} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1, mt: 2 }}>
                                            <Box sx={{ textAlign: "center", }}>
                                                <Typography sx={{ color: "#A94A4A" }}>Training {index + 1}</Typography>
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <DatePicker
                                                    value={entry.date}
                                                    onChange={(newValue) => handleChange(index, 'date', newValue)}
                                                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                                />
                                            </Box>
                                            <Box sx={{ mt: 2 }}>
                                                <Select
                                                    value={entry.topic || 0}
                                                    onChange={(_, newValue) => {
                                                        if (newValue !== undefined) {
                                                            handleChange(index, 'topic', Number(newValue));
                                                        }
                                                    }}
                                                    defaultValue={0}
                                                    placeholder="Select Topic"
                                                    sx={{ width: '100%' }}
                                                >
                                                    <Option value={0} disabled>
                                                        Select Topic
                                                    </Option>
                                                    {topics?.map((t) => (
                                                        <Option key={t.topic_slno} value={t.topic_slno}>
                                                            {t.training_topic_name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Box>
                                            <Box sx={{ mt: 2 }}>
                                                <Select
                                                    value={entry.trainer || 0}
                                                    onChange={(_, newValue) => {
                                                        if (newValue !== undefined) {
                                                            handleChange(index, 'trainer', Number(newValue));
                                                        }
                                                    }}
                                                    defaultValue={0}
                                                    placeholder="Select Trainer"
                                                    sx={{ width: '100%' }}
                                                >
                                                    <Option value={0} disabled>
                                                        Select Trainer
                                                    </Option>
                                                    {trainer?.map((t) => (
                                                        <Option key={t.em_id} value={t.em_id}>
                                                            {t.em_name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <Input
                                                    type="text"
                                                    value={entry.preMark}
                                                    onChange={(e) => handleChange(index, 'preMark', e.target.value)}
                                                    placeholder="Enter Pre Mark"
                                                    style={{ padding: '8px', width: '100%', fontSize: '14px' }}
                                                />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <Input
                                                    type="text"
                                                    value={entry.postMark}
                                                    onChange={(e) => handleChange(index, 'postMark', e.target.value)}
                                                    placeholder="Enter Post Mark"
                                                    style={{ padding: '8px', width: '100%', fontSize: '14px' }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                    <Box sx={{ textAlign: "center", mt: 1 }}>
                                        <Button
                                            variant="contained"
                                            startDecorator={<AddCircleIcon />}
                                            sx={{ backgroundColor: "#27548A", color: "white" }}
                                            onClick={handleAddTraining}
                                        >
                                            Add Trainings
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </LocalizationProvider>
        </Fragment >
    );
}
export default memo(AddTrainingDatas);
