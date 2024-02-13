import React, { Fragment, memo, useEffect, useState } from 'react'
import { useCallback } from 'react';
import { CssVarsProvider, Typography, Box, Button, Modal, ModalDialog, Table, Sheet } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
//import { useMemo } from 'react';
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


const AddInductionTopics = ({ open, setOpen, empselect,
    type, setType, setTrainers,
    reset, count, setcount }) => {

    const dispatch = useDispatch()

    const [showtable, setShowtable] = useState(0)
    const [selected, setselected] = useState([])
    const [maparr, setMaparr] = useState([])
    const [ScheduleDate, SetScheduleDate] = useState('')
    // const [postArr, SetPostarr] = useState([])


    // const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    // const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    // const {
    //     // em_id
    // } = employeeProfileDetl;

    const topicData = useSelector((state) => state?.gettrainingData?.TrainingTypeTopic?.TrainingTypeTopicList, _.isEqual)

    const Handleclose = useCallback((e) => {
        setOpen(false)
        setType(0)
        setTrainers([])
        SetScheduleDate([])
    }, [setOpen, setType, setTrainers, SetScheduleDate])

    const ToshowTopics = useCallback(() => {
        if (type !== 0) {
            dispatch(TrainingTypeWiseTopics(type))
            setShowtable(1)
        }
        else {
            alert("Please Select Training Topic")
        }
    }, [setShowtable, dispatch, type])

    useEffect(() => {
        if (empselect.length !== 0 && topicData.length !== 0) {

            const mapArry = topicData?.map((item) => {
                const obj = {
                    "topic": item.training_topic_name,
                    "trainers_name": item.trainers_name,
                    "date": moment(new Date()).format('YYYY-MM-DD'),
                    "trainers": item.trainers,
                    "topic_slno": item.topic_slno,
                    "type_slno": item.type_slno,
                    status: 0
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
    }, [empselect, setselected, topicData])

    const handleChange = useCallback(async (obj) => {
        let ar = selected?.map((e) => e.topic_slno === obj.topic_slno ? { ...e, topic: obj.topic, trainers_name: obj.trainers_name, date: obj.newDate, status: 1 } : { ...e })
        setselected([...ar])
    }, [selected])

    useEffect(() => {
        const filterarray = selected?.filter((val) => {
            return val.status === 1
        })
        setMaparr(filterarray);
    }, [setMaparr, selected])

    // useEffect(() => {
    //     const arr = maparr?.map((item) => {
    //         return empselect?.map((val) => {
    //             const obj = {
    //                 topic: item.training_topic_name,
    //                 trainers_name: item.trainers_name,
    //                 date: moment(new Date()).format('YYYY-MM-DD'),
    //                 trainers: item.trainers,
    //                 topic_slno: item.topic_slno,
    //                 type_slno: item.type_slno,
    //                 emp_id: val.em_id
    //             }
    //             return obj
    //         })
    //     })

    // }, [maparr, empselect])

    //console.log(maparr);

    // const postdata = useMemo(() => {
    //     return {
    //         type: type,
    //         topic: topic,
    //         trainers: trainers,
    //         scheduledDate: ScheduleDate,
    //         create_user: em_id,
    //     }
    // }, [type, trainers, ScheduleDate])

    const DataSubmit = useCallback(async () => {
        const result = await axioslogin.post('/InductionTraining/ScheduleInduction', maparr)
        const { success,
            //insertId
        } = result.data
        if (success === 1 && type !== 0 && ScheduleDate !== '') {
            const insertEmp = empselect?.map((val) => {
                const obj = {
                    //     schedule_Slno: insertId,
                    //     em_id: val.em_id,
                    //     dept_id: val.dept_id,
                    //     sect_id: val.sect_id,
                    //     type: type,
                    //     topic: topic,
                    //     scheduledDate: ScheduleDate,
                    //     create_user: em_id,
                    //     edit_user: em_id
                }
                return obj
            })
            const result = await axioslogin.post('/InductionTraining/addInductnEmps', insertEmp)
            const { success, message } = result.data
            if (success === 1) {
                setcount(count + 1)
                reset();
                setOpen(false)
                succesNofity(message)
            }
            else {
                warningNofity("Can't schedule Training")
            }
        }
        else {
            alert("Please Enter all the fields")
        }
    }, [maparr, setcount, count, type, reset, ScheduleDate, empselect, setOpen])












    // const xx = maparr?.filter((item) => {
    //     return type === item.type_slno
    // const ob = {
    //     type_slno: type,
    //     topic_slno: item.topic_slno,
    //     trainers_name: item.trainers_name,
    // }
    // return ob
    // })

    //console.log("maparr", maparr);
    // const { topic } = maparr
    // const xx = maparr.map((val) => {
    //     const obj = {
    //         topic: topic
    //     }
    // })
    // console.log([...xx]);
    // useEffect(() => {
    //     const mapArry = maparr?.map((item) => {
    //         const obj = {
    //             ...item,
    //             trainers: item.trainers,
    //             // topic_slno: item.topic_slno
    //         }
    //         console.log(obj);
    //         return {
    //             obj
    //         }

    //     })
    // }, [maparr])

    // const xx = useMemo(() => {
    //     return {
    //         type: type,
    //         // topic: maparr.topic_slno
    //     }
    // }, [type])




    // useEffect(() => {
    //     const filterLname = selected.filter((val) => {

    //         return maparr.find((item) => {
    //             return item.topic_slno === val.topic_slno
    //         })
    //     })
    //     console.log(filterLname);
    // }, [maparr, selected])


    // console.log("topicData", topicData);


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
                                                    {/* {selected?.map((row, ndx) => (
                                                        <tr key={ndx}>
                                                            <td style={{ textAlign: "center" }}>
                                                                <Checkbox
                                                                    name="Topic select"
                                                                    checked={row?.checkVal || false}
                                                                    onChange={(e) => {
                                                                        HandleCheckbox(e.target.checked, row)
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>{row.topic}</td>
                                                            <td>{row.trainers_names}</td>
                                                            <td>
                                                                <Box flex={1}>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <InputComponent
                                                                            type="date"
                                                                            size="xs"
                                                                            placeholder="ScheduleDate"
                                                                            name="ScheduleDate"
                                                                            value={ScheduleDate}
                                                                        //onchange={(e) => SetScheduleDate(e.target.value)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Box>
                                                            </td>
                                                        </tr>
                                                    ))} */}
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
                                        <Box>
                                            <Box sx={{ mt: 2, gap: 1, display: "flex", flexDirection: "row" }} >
                                                {/* <Tooltip title="Schedule Date">
                                                    <Box flex={1}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <InputComponent
                                                                type="date"
                                                                size="xs"
                                                                placeholder="ScheduleDate"
                                                                name="ScheduleDate"
                                                                value={ScheduleDate}
                                                                onchange={(e) => SetScheduleDate(e.target.value)}
                                                            />
                                                        </LocalizationProvider>
                                                    </Box>
                                                </Tooltip> */}

                                                {/* <Tooltip title="Add More dates">
                                                    <Box>
                                                        <Button aria-label="Like" variant="outlined"
                                                            onClick={AddMoreDates}
                                                        >
                                                            <AddCircleOutlineIcon />
                                                        </Button>
                                                    </Box>
                                                </Tooltip> */}
                                            </Box>

                                        </Box>
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
