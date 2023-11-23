import React, { Fragment, memo, useState } from 'react'
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography, Button, Input } from '@mui/joy';
import { useCallback } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DepartmentalTrainingTopics from 'src/views/MuiComponents/DepartmentalTrainingTopics';


const TrainingonMonthModal = ({ open, setOpen, dept, deptSec, year, count, Setcount, start, end }) => {

    const [selectdate, setSelectdate] = useState(moment(new Date(start)).format('YYYY-MM-DD'));
    const [viewTable, setViewTable] = useState(0)
    const [remark, setRemark] = useState('');
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const [dept_all, setDept_all] = useState(false);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const handleClose = useCallback(() => {
        setOpen(false);
        setViewTable(0);
        setDept_all(false)
    }, [setOpen, setViewTable])

    //reset 
    const reset = useCallback(() => {
        setRemark('');
        setSelectdate('');
        setDept_all(false)
        setTopic(0);
        setTrainer([]);
    }, [])

    const handleText = useCallback((event) => {
        setRemark(event.target.value);
    }, []);

    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e.target.value)).format("YYYY-MM-DD")
        setSelectdate(d)
        setViewTable(1);
    }, [setSelectdate, setViewTable])

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
            create_user: em_id
        }
    }, [dept, deptSec, year, selectdate, topic, trainer, remark, em_id])

    const HandleSubmit = useCallback(() => {
        if (dept !== 0 && deptSec !== 0 && year !== '' && trainer.length !== 0 && topic !== 0 && selectdate !== '' && remark !== '') {
            const InsertData = async (postData) => {
                const result = await axioslogin.post("TrainingAfterJoining/InsertDepartmentalSchedule", postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    reset();
                    Setcount(count + 1);
                    setOpen(false);
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



    return (
        <Fragment>
            <Dialog
                open={open}
                maxWidth="xl"
            >
                <Paper sx={{ m: 1 }} variant="outlined" >
                    <Box sx={{ flex: 1, p: 0.5 }} >
                        <CssVarsProvider>
                            <Typography fontWeight="lg"  >
                                Topic Schedule
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <DialogContent sx={{ px: 5, display: 'flex', width: 600, height: 300, flexDirection: 'column' }} >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box sx={{ px: 2 }}>
                                <CssVarsProvider>
                                    <Typography  >
                                        Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 7.8, width: "88%" }}>
                                <Input
                                    type="date"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            max: moment(new Date(end)).format('YYYY-MM-DD'),
                                        },
                                    }}
                                    value={selectdate}
                                    name="selectdate"
                                    onChange={(e) => UpdateDate(e)}
                                />
                            </Box>
                        </Box>
                        {
                            viewTable === 1 ?
                                <Box sx={{ mt: 0.3 }}>
                                    <Box sx={{ px: 2, mt: 1 }}>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <Box><Typography>Topic</Typography></Box>
                                            {
                                                dept_all === true ? <Box sx={{ minWidth: "66%", pl: 9.5 }}><SelectTopics setTopic={setTopic} /></Box>
                                                    : <Box sx={{ minWidth: "66%", pl: 9.5 }}><DepartmentalTrainingTopics setTopic={setTopic} dept={dept} /></Box>
                                            }
                                            <Box sx={{ pl: 1.5 }}>
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
                                                    label="All Topics"
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row", mt: 1, width: "100%" }}>
                                            <Box><Typography>Trainers</Typography></Box>
                                            <Box sx={{ minWidth: "92%", pl: 7.3 }}>
                                                <SelectTrainer setTrainer={setTrainer} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <textarea
                                        rows={2}
                                        value={remark}
                                        onChange={handleText}
                                        placeholder="Drop Remarks here.."
                                        style={{ width: '100%', marginTop: 5, height: 100 }}
                                    />
                                </Box>

                                : null
                        }
                    </DialogContent>
                    <DialogActions sx={{ px: 5 }}>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={HandleSubmit}
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
            </Dialog >
        </Fragment >
    )
}

export default memo(TrainingonMonthModal)
