import React, { Fragment, memo, useState } from 'react'
import Box from '@mui/material/Box';
import { Paper, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography, Button, Table, IconButton } from '@mui/joy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useCallback } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import TopicTrainersSelect from './TopicTrainersSelect';

const DetailsInsertModal = ({ open, setinsetmodal, setOpen }) => {
    const [fromDate, setFromDate] = useState(moment(new Date()));
    const [toDate, setToDate] = useState(moment(new Date()));
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [])

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
                "date": val
            }
            return obj
        })
        setDates(arr)
        return dateArray;

    }, [fromDate, toDate]);

    // const HandleCheck = useCallback(() => {
    //     const updatedDates = dates?.map((items) => {
    //         return {
    //             ...items,
    //             ...topic,
    //             ...trainer
    //         }
    //     })
    //     console.log(updatedDates);
    // }, [topic, trainer])

    // const getValue = useCallback((e, val) => {
    //     const updatedDates = dates?.map((item) => {
    //         if (item.date === val.date) {
    //             return {
    //                 ...item,
    //                 inValue: e,
    //                 topic: topic,
    //                 trainer: trainer
    //             };
    //         }
    //         return item;
    //     });
    //     setDaterange(updatedDates);
    // }, [dates, topic, trainer])

    // useEffect(() => {
    //     const filterdate = Daterange?.filter((val) => {

    //         return val.inValue === true
    //     })
    // }, [Daterange])

    const HandleSubmit = useCallback(() => {

    }, [])

    return (
        <Fragment>
            <Dialog
                open={open}
                maxWidth="xl"
            >
                <Paper sx={{ m: 1 }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg" variant="soft" >
                                Departmental Training
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ px: 5, display: 'flex', width: 900, height: 400, flexDirection: 'column' }} >

                        <Box sx={{ display: "flex", flexDirection: "row", }}>
                            <Box sx={{ px: 2 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        From Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat="DD-MM-YYYY"
                                        value={fromDate}
                                        onChange={setFromDate}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>

                            <Box sx={{ px: 2 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        To Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat="DD-MM-YYYY"
                                        value={toDate}
                                        onChange={setToDate}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ px: 0.5 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="md"
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
                                    width: "100%", height: 500, overflow: 'auto',
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

                                                    return <tr key={index}>
                                                        <TopicTrainersSelect
                                                            val={val}
                                                        />

                                                    </tr>
                                                })
                                            }

                                        </tbody>

                                    </Table>
                                </Paper>
                                : null
                        }
                    </DialogContent>
                    <DialogActions>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={HandleSubmit}
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
            </Dialog >
        </Fragment >
    )
}

export default memo(DetailsInsertModal)
