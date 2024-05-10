import React, { Fragment, memo, useState } from 'react'
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Tooltip, } from '@mui/material';
import { CssVarsProvider, Typography, Button, Input, IconButton, Textarea, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import DepartmentalTrainingTopics from 'src/views/MuiComponents/DepartmentalTrainingTopics';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const TrainingonMonthModal = ({ open, setOpen, dept, deptSec, year, count, Setcount, start, end }) => {

    const [selectdate, setSelectdate] = useState(moment(new Date(start)).format('YYYY-MM-DD'));
    const [remark, setRemark] = useState('');
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [dept_all, setDept_all] = useState(false);
    const [showTrainers, setshowTrainers] = useState(0);
    const [view, setview] = useState(0);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const handleClose = useCallback(() => {
        setOpen(false);
        setDept_all(false)
        setSelectdate('')
        setTopic(0);
        setRemark('');
        setTrainer([]);
        setshowTrainers(0)
        setview(0)
    }, [setOpen, setTopic])

    //reset 
    const reset = useCallback(() => {
        setRemark('');
        setSelectdate('');
        setDept_all(false)
        setTopic(0);
        setTrainer([]);
        setshowTrainers(0)
        setview(0)
    }, [setTopic])

    const handleText = useCallback((event) => {
        setRemark(event.target.value);
    }, []);

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
            create_user: em_id,
            edit_user: em_id
        }
    }, [dept, deptSec, year, selectdate, topic, trainer, remark, em_id])

    const HandleSubmit = useCallback(() => {
        if (dept !== 0 && deptSec !== 0 && year !== '' && trainer.length !== 0 && topic !== 0 && selectdate !== '' && remark !== '') {
            const InsertData = async (postData) => {
                const result = await axioslogin.post("TrainingAfterJoining/InsertDepartmentalSchedule", postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    Setcount(count + 1);
                    setOpen(false);
                    reset();

                }
                else {
                    warningNofity(message);
                    setOpen(false);
                    reset();

                }
            }
            InsertData(postData)
        }
        else {
            warningNofity("Please Enter the given fields ")
        }

    }, [postData, Setcount, count, dept, deptSec, year, trainer, topic, selectdate, remark, reset, setOpen])

    const ShowallDept = useCallback((e) => {
        if (e.target.checked === true) {
            setDept_all(true)
        }
        else {
            setDept_all(false)
        }
    }, [setDept_all])

    const GetTrainers = useCallback(() => {
        setview(1)
        setshowTrainers(1)
        if (topic !== 0) {
            const GetTrainerNames = async (topic) => {
                const result = await axioslogin.get(`TrainingAfterJoining/getTrainerByTopic/${topic}`)
                const { data, success } = result.data;
                if (success === 1) {
                    const { trainers, trainer_name } = data[0];
                    setTrainer(trainers)
                    setTrainerName(trainer_name)
                }
                else {
                    setTrainer([])
                    setTrainerName([])
                }
            }
            GetTrainerNames(topic)
        }
        else {
            setTrainer([])
            setTrainerName([])
        }

    }, [topic])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}
            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography
                        fontSize="xl2"
                        lineHeight={1}
                        sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                    >
                        Topic Schedule
                    </Typography>


                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%' }}>
                        <Box sx={{ px: 2 }}>
                            <CssVarsProvider>
                                <Typography  >
                                    Date
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    views={['day']}
                                    minDate={moment(new Date(start)).format('YYYY-MM-DD')}
                                    maxDate={moment(new Date(end)).format('YYYY-MM-DD')}
                                    value={selectdate}
                                    size="small"
                                    onChange={(e) => {
                                        setSelectdate(moment(e).format("YYYY-MM-DD"));
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 500 }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 0.3 }}>
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Box sx={{ px: 2 }}><Typography>Topic</Typography></Box>
                                <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                                    <Box>
                                        {
                                            dept_all === true ?
                                                <Box style={{ width: 500 }} >
                                                    <SelectTopics topic={topic} setTopic={setTopic} />
                                                </Box>
                                                : <Box style={{ width: 500 }}><DepartmentalTrainingTopics topic={topic} setTopic={setTopic} dept={dept} /></Box>
                                        }

                                    </Box>

                                </Box>
                                <Box sx={{ pl: 4 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="dept_status"
                                                color="primary"
                                                value={dept_all}
                                                checked={dept_all}
                                                className="ml-1"
                                                onChange={(e) => ShowallDept(e)}
                                            />
                                        }
                                        label="All "
                                    />
                                </Box>
                                <Tooltip title="View to more">
                                    <Box sx={{ mt: 0.5, pl: 2 }}>
                                        <IconButton variant="outlined" size='sm' color="primary" onClick={GetTrainers}>
                                            <PublishedWithChangesIcon />
                                        </IconButton>
                                    </Box>
                                </Tooltip>

                            </Box>
                            {showTrainers === 1 ?
                                <Box sx={{ display: "flex", flexDirection: "row", mt: 0.5, width: "100%" }}>
                                    <Box sx={{ px: 1 }}><Typography>Trainers</Typography></Box>
                                    <Box sx={{ width: "100%" }}>
                                        <JoyInput
                                            size="sm"
                                            value={trainerName}
                                            name="trainers"
                                            placeholder="Trainers"
                                            disabled={true}
                                        />

                                    </Box>
                                </Box> : null}
                        </Box>
                        {showTrainers === 1 ?
                            <Textarea name="Solid" placeholder="Drop Remarks here.."
                                rows={2} value={remark} onChange={handleText} style={{ width: '100%', marginTop: 5, height: 100 }} /> : null}
                    </Box>
                    {
                        view === 1 ?

                            <CssVarsProvider>
                                <Button
                                    color="success"
                                    onClick={HandleSubmit}
                                    size="sm"
                                    sx={{ py: 0, color: 'white' }}
                                >
                                    SAVE
                                </Button>

                            </CssVarsProvider>
                            : null}
                </ModalDialog>
            </Modal >
        </Fragment >
    )
}

export default memo(TrainingonMonthModal)
