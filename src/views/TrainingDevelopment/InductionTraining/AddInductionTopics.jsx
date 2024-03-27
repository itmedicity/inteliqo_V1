import React, { Fragment, memo, useEffect, useState } from 'react'
import { useCallback } from 'react';
import { CssVarsProvider, Typography, Box, Button, Modal, ModalDialog, Table, Sheet } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import ModalClose from '@mui/joy/ModalClose';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Paper } from '@material-ui/core';
import JoyTrainingTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainingTypeSelect'
import { Tooltip } from '@mui/material';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { TrainingTypeWiseTopics } from 'src/redux/actions/Training.Action';
import InductionTopicTable from './InductionTopicTable';
import moment from 'moment';

const AddInductionTopics = ({ open, setOpen, empselect, type, setType, reset, count, setcount, msg, setmsg }) => {

    const dispatch = useDispatch()

    const [showtable, setShowtable] = useState(0)
    const [selected, setselected] = useState([])
    const [maparr, setMaparr] = useState([])
    const [ScheduleDate, SetScheduleDate] = useState('')

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const ToshowTopics = useCallback(() => {
        if (type !== 0) {
            dispatch(TrainingTypeWiseTopics(type))
            setShowtable(1)
        }
        else {
            alert("Please Select Training Topic")
        }
    }, [setShowtable, dispatch, type])

    const topicData = useSelector((state) => state?.gettrainingData?.TrainingTypeTopic?.TrainingTypeTopicList, _.isEqual)

    const Handleclose = useCallback((e) => {
        setOpen(false)
        setType(0)
        SetScheduleDate('')
    }, [setOpen, setType, SetScheduleDate])

    useEffect(() => {
        if (empselect.length !== 0 && topicData.length !== 0) {
            const mapArry = topicData?.map((item) => {
                const obj = {
                    "topic": item.training_topic_name,
                    trainers_name: item.trainers_name,
                    "date": moment(new Date()).format('YYYY-MM-DD HH:ss:mm'),
                    trainers: item.trainers,
                    topic_slno: item.topic_slno,
                    type_slno: item.type_slno,
                    status: 0,
                    create_user: em_id
                }
                return {
                    ...item,
                    ...obj
                }
            })
            setselected(mapArry)
        }
        else {
            setselected([])
        }
    }, [empselect, em_id, setselected, topicData])

    const handleChange = useCallback(async (obj) => {
        let ar = selected?.map((e) => e.topic_slno === obj.topic_slno ? { ...e, topic_slno: obj.topic_slno, trainers: obj.trainers, date: obj.newDate, status: 1, create_user: e.create_user } : { ...e })
        setselected([...ar])
    }, [selected])

    useEffect(() => {
        const filterarray = selected?.filter((val) => {
            return val.status === 1
        })
        setMaparr(filterarray);
    }, [setMaparr, selected])

    const DataSubmit = useCallback(async () => {
        maparr && maparr.map(async (item) => {
            const result = await axioslogin.post('/InductionTraining/ScheduleInduction', item)
            const { success, insertId } = result.data
            if (success === 1 && type !== 0) {
                const arr = empselect?.map((val) => {
                    const obj = {
                        insertId: insertId,
                        emp_id: val.em_id,
                        date: item.date,
                        dept_id: val.dept_id,
                        sect_id: val.sect_id,
                        create_user: em_id
                    }
                    return obj
                })
                const result = await axioslogin.post('/InductionTraining/addInductnEmps', arr)
                const { succes } = result.data
                if (succes === 1) {
                    setmsg(1)
                    setcount(count + 1)
                    reset();
                    setOpen(false)

                }
                else {
                    warningNofity("Can't schedule Training")
                }
            }
            else {
                alert("Please Enter all the fields")
            }
        })
    }, [maparr, empselect, em_id, setcount, type, count, reset, setOpen, setmsg])

    useEffect(() => {
        if (msg === 1) {
            succesNofity("Training Scheduled Successfully")
        }
    }, [msg])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={Handleclose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg">
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '100%',
                            bgcolor: 'background.body',
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
                        Training Schedule
                    </Typography>
                    {/* body starts */}
                    <Paper>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: "row", width: 500, gap: 2 }}>
                                <Box sx={{ p: 0.2, flex: 1 }} >
                                    <JoyTrainingTypeSelect type={type} setType={setType} />
                                </Box>

                                <Tooltip title="Search">
                                    <Button variant='outlined'>
                                        <FindReplaceIcon
                                            onClick={ToshowTopics}
                                        />
                                    </Button>
                                </Tooltip>
                            </Box>
                            {
                                showtable === 1 ?
                                    <Box>
                                        <Sheet variant="outlined" sx={{ mt: 2 }}>
                                            <Table variant="soft" borderAxis="bothBetween">
                                                <thead>
                                                    <tr>
                                                        <th>Training Topics</th>
                                                        <th>Trainers</th>
                                                        <th>Schedule Date</th>
                                                        <th style={{ width: "10%" }}>Add</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textTransform: "capitalize" }}>
                                                    {
                                                        selected?.map((val, index) => {
                                                            return <InductionTopicTable
                                                                value={val}
                                                                key={index}
                                                                ScheduleDate={ScheduleDate}
                                                                handleChange={handleChange}
                                                            />
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </Sheet>

                                        <Tooltip title="Save">
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: "flex-end",
                                            }} >
                                                <CssVarsProvider>
                                                    <Box sx={{ mt: 1 }} >
                                                        <Button aria-label="submit" variant="outlined"
                                                            onClick={DataSubmit}
                                                        >
                                                            <SaveIcon sx={{ width: 100 }} />
                                                        </Button>
                                                    </Box>
                                                </CssVarsProvider>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                    : null}
                        </Box>
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(AddInductionTopics)
