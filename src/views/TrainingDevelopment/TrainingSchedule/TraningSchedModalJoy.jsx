import React, { useState, memo, useCallback } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { Chip, CssVarsProvider, Divider, Input, ModalDialog, Table, Textarea } from '@mui/joy';
import { Box, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import TrainingTopicsRdx from 'src/views/Component/ReduxComponent/TrainingTopicsRdx';
import TrainerNamesRxd from 'src/views/Component/ReduxComponent/TrainerNamesRxd';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrainingTopics } from 'src/redux/actions/Training.Action';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const TraningSchedModalJoy = ({ value, setValue, open, setinsetmodal, setOpen }) => {

    const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    // const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([]);
    const [Daterange, setDaterange] = useState([]);
    const [topic, setTopic] = useState(Array.from({ length: dates.length }, () => 0));
    // const [trainer, setTrainer] = useState(Array.from({ length: dates.length }, () => []));

    console.log(topic);
    console.log(trainer);
    const DisplayDate = useCallback(() => {
        setViewTable(1);
        const dateArray = [];
        let startDate = moment(fromDate).format("YYYY-MM-DD");
        const stopDate = moment(toDate).format("YYYY-MM-DD");

        while (startDate <= stopDate) {
            dateArray.push(moment(startDate).format('YYYY-MM-DD'));
            startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
        }
        const arr = dateArray.map((val) => {
            const obj = {
                "date": val,
                "inValue": false,
                "topic": 0,
                "trainres": []
            }
            return obj
        })
        setDates(arr)
        return dateArray;

    }, [fromDate, toDate]);

    const getValue = useCallback((e, val) => {
        const updatedDates = dates?.map((item) => {
            if (item.date === val.date) {
                return {
                    ...item,
                    inValue: e,
                    topic: topic,
                    trainer: trainer
                };
            }
            return item;
        });
        setDaterange(updatedDates);
        console.log(updatedDates);
    }, [dates, topic, trainer])


    // useEffect(() => {
    //     const filterdate = Daterange?.filter((val) => {
    //         return val.inValue === true
    //     })

    //     // setScheduledate(filterdate);
    // }, [Daterange])


    // const getValue = useCallback((e, val, index) => {
    //     // Create new arrays to avoid mutating state directly
    //     const newTopics = [...topic];
    //     const newTrainers = [...trainer];

    //     newTopics[index] = topic;
    //     newTrainers[index] = trainer;

    //     setTopic(newTopics);
    //     setTrainer(newTrainers);

    //     const updatedDates = dates.map((item, i) => {
    //         if (i === index) {
    //             return {
    //                 ...item,
    //                 inValue: e,
    //                 topic: newTopics[i],
    //                 trainer: newTrainers[i]
    //             };
    //         }
    //         return item;
    //     });

    //     setDaterange(updatedDates);
    // }, [dates, topic, trainer]);

    useEffect(() => {
        dispatch(TrainingTopics());

    }, [dispatch])


    const updateTopics = (index, newValue) => {
        const updatedTopics = topic;
        updatedTopics[index] = newValue;
        return updatedTopics;
    };

    const updateTrainers = (index, newValue) => {
        const updatedTrainers = trainer;
        updatedTrainers[index] = newValue;
        return updatedTrainers;
    };

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            style={{ zIndex: 1500 }}
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
                <Paper sx={{ m: 1 }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg" variant="soft" >
                                Departmental Training
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", }}>
                        <Box sx={{ px: 2 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    From Date
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 2 }}>
                            <CssVarsProvider>
                                <Input
                                    type="date"
                                    size="sm"
                                    name="fromDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ px: 2 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    To Date
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 2 }}>
                            <CssVarsProvider>
                                <Input
                                    type="date"
                                    size="sm"
                                    name="toDate"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                // onChange={setToDate}
                                />
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ px: 0.5 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={DisplayDate}
                                >
                                    Select Date
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    {
                        viewTable === 1 ?
                            <Paper elevation={0} sx={{
                                mt: 1,
                                width: "100%", height: 50, overflow: 'auto',
                                '::-webkit-scrollbar': { display: "none" }
                            }}>
                                <Table>
                                    <thead>
                                        <tr style={{ alignItems: "center" }}>
                                            <th style={{ alignItems: "center" }}>Date</th>
                                            <th style={{ alignItems: "center" }}>Choose Topics</th>
                                            <th style={{ alignItems: "center" }}>Choose Trainers</th>
                                            <th style={{ alignItems: "center" }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dates?.map((val, index) => {
                                                const topicValue = topic[index];
                                                const trainerValue = trainer[index];
                                                return <tr key={index}>
                                                    <td>{val.date}</td>
                                                    <td>
                                                        <SelectTopics value={topicValue} setValue={(value) => setTopic(updateTopics(index, value))} />
                                                    </td>

                                                    <td>
                                                        <SelectTrainer value={trainer} setValue={setTrainer} />
                                                        {/* <SelectTrainer value={trainerValue} setValue={(value) => setTrainer(updateTrainers(index, value))} /> */}
                                                        {/* <TrainerNamesRxd getTrainers={setTrainer} /> */}
                                                    </td>
                                                    {/* <td><SelectTopics value={topic} setValue={setTopic} /></td>
                                                    <td><SelectTrainer value={trainer} setValue={setTrainer} /></td> */}
                                                    <td>
                                                        <CommonCheckBox
                                                            checked={val?.inValue || false}
                                                            onChange={(e) => {
                                                                getValue(e.target.checked, val);
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>

                                </Table>
                            </Paper>
                            : null
                    }

                </Paper>

            </ModalDialog>

        </Modal>
    )
}

export default TraningSchedModalJoy
