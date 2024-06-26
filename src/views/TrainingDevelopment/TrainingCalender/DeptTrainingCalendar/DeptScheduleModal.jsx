import React, { Fragment, memo, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Checkbox, Tooltip, } from '@mui/material';
import { Typography, Button, IconButton, Textarea, Modal, ModalDialog, ModalClose, Input, Sheet, Table } from '@mui/joy';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import DepartmentalTrainingTopics from 'src/views/MuiComponents/DepartmentalTrainingTopics';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import moment from 'moment';
import { format } from 'date-fns';

const DeptScheduleModal = ({ Scheduledata, topic, setTopic, SetView, View, datefrmt, setTable, EmpDetails, SetDatefrmt, count, SetCount, dept, deptSec, year }) => {

    const [remark, setRemark] = useState('');
    const [trainer, setTrainer] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [dept_all, setDept_all] = useState(false);
    const [showTrainers, setshowTrainers] = useState(0);
    const [datas, setdatas] = useState([])
    const [newdata, setNewdata] = useState([])

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //reset 
    const reset = useCallback(() => {
        setRemark('');
        setDept_all(false)
        setTopic(0);
        setTrainer([]);
        setshowTrainers(0)
        SetView(false)
        setNewdata([])
        setdatas([])
        setTrainerName([])
        SetCount(0)
        SetDatefrmt('')
    }, [SetView, setTopic, SetCount, SetDatefrmt])

    const handleText = useCallback((event) => {
        setRemark(event.target.value);
    }, []);

    const GetTrainers = useCallback(() => {

        if (topic !== 0) {
            setshowTrainers(1)
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
            infoNofity("Select any Training Topic")
        }
    }, [topic])

    //postData
    const postData = useMemo(() => {
        return {
            department: dept,
            deparment_sect: deptSec,
            schedule_year: moment(year).format("YYYY-MM-DD"),
            schedule_date: datefrmt,
            schedule_topics: topic,
            schedule_trainers: trainer,
            schedule_remark: remark,
            create_user: em_id,
            edit_user: em_id
        }
    }, [dept, deptSec, year, datefrmt, topic, trainer, remark, em_id])

    const HandleSubmit = useCallback(() => {
        if (dept !== 0 && deptSec !== 0 && year !== '' && trainer.length !== 0 && topic !== 0 && datefrmt !== '' && remark !== '') {
            const InsertData = async (postData) => {
                const result = await axioslogin.post("TrainingAfterJoining/InsertDepartmentalSchedule", postData)
                const { message, success, InsertId } = result.data;
                if (success === 1) {
                    const insertEmps = newdata?.map((val) => {
                        const obj = {
                            slno: InsertId,
                            emp_name: val.em_id,
                            emp_desig: val.desg_slno,
                            emp_dept: dept,
                            emp_dept_sectn: deptSec,
                            schedule_date: datefrmt,
                            topic: topic,
                            create_user: em_id
                        }
                        return obj
                    })
                    const results = await axioslogin.post('/TrainingAfterJoining/insertEmployees', insertEmps)
                    const { success, message } = results.data
                    if (success === 1) {
                        succesNofity(message);
                        SetCount(count + 1);
                        reset();
                        setTable(0)
                    }
                    else {
                        warningNofity(message)
                    }
                }
                else {
                    warningNofity(message);
                    reset();
                    SetCount(0)
                    setTable(0)
                }
            }
            InsertData(postData)
        }
        else {

            warningNofity("Please Enter the given fields ")
        }
    }, [postData, setTable, SetCount, count, dept, deptSec, year, newdata, trainer, topic, datefrmt, remark, em_id, reset])

    const ShowallDept = useCallback((e) => {
        if (e.target.checked === true) {
            setDept_all(true)
        }
        else {
            setDept_all(false)
        }
    }, [setDept_all])

    const Handleclose = useCallback((e) => {
        SetView(false)
        setDept_all(false)
        SetDatefrmt('')
        setTopic(0);
        setRemark('');
        setTrainer([]);
        setshowTrainers(0)
    }, [SetView, SetDatefrmt])



    useEffect(() => {
        if (EmpDetails?.length !== 0 && Scheduledata?.length !== 0) {
            const filterArr = EmpDetails?.map((val) => {
                const fountArr = Scheduledata?.find((item) => val.em_id === item.em_id);
                return {
                    ...val, inValue: false, schedule: fountArr?.schedule_date ?? 0
                }
            })
            setdatas(filterArr);
        } else if (EmpDetails?.length !== 0 && Scheduledata?.length === 0) {
            const filterArr = EmpDetails?.map((val) => {
                const obj = {
                    em_no: val.em_no,
                    em_name: val.em_name,
                    desg_name: val.desg_name,
                    inValue: false,
                    schedule: 0

                }
                return {
                    ...val,
                    ...obj
                }
            })
            setdatas(filterArr);
        }
    }, [EmpDetails, Scheduledata]);

    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "em_no": item.em_no, "em_name": item.em_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    useEffect(() => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        setNewdata(filterarray);
    }, [datas])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={View}
                onClose={Handleclose}
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
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                fontSize="xl2"
                                lineHeight={1}
                                sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                            >
                                Schedule Training
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                level='6'
                                color="primary"
                                sx={{ color: "primary" }}
                            >
                                Date : {format(new Date(datefrmt), 'dd-MM-yyyy')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", gap: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", gap: 1 }}>
                            <Tooltip title="Select Topic">
                                {
                                    dept_all === true ?
                                        <Box style={{ width: 400 }} >
                                            <SelectTopics topic={topic} setTopic={setTopic} />
                                        </Box>
                                        : <Box style={{ width: 400 }}><DepartmentalTrainingTopics topic={topic} setTopic={setTopic} dept={dept} /></Box>
                                }
                            </Tooltip>
                            <Tooltip title="All Topics">
                                <Checkbox
                                    name="dept_status"
                                    color="primary"
                                    value={dept_all}
                                    checked={dept_all}
                                    placeholder='All'
                                    onChange={(e) => ShowallDept(e)}
                                />
                            </Tooltip>
                            <Tooltip title="View to more">
                                <IconButton sx={{}} size='sm' color="primary" onClick={GetTrainers}>
                                    <PublishedWithChangesIcon />
                                </IconButton>
                            </Tooltip>
                            {showTrainers === 1 ?
                                <Box sx={{ flex: 1 }}>
                                    <Input
                                        size='md'
                                        value={trainerName}
                                        name="trainers"
                                        disabled={true}

                                    />
                                </Box>
                                : null}
                        </Box>
                        <Box>
                            {showTrainers === 1 ?
                                <Box>
                                    <Box>
                                        <Sheet sx={{
                                            overflow: 'auto',
                                            '::-webkit-scrollbar': { display: "none" }, height: 300,
                                            width: "100%"
                                        }}>
                                            <Table borderAxis="both" stickyHeader >
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "8%", textAlign: "center" }}>
                                                            check
                                                        </th>
                                                        <th style={{ width: "15%" }}>Emp ID</th>
                                                        <th>Name</th>
                                                        <th>Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {datas?.map((row, index) => (
                                                        <tr key={index} style={{
                                                            border: "2px solid black",
                                                            overflow: "hidden",
                                                            overflowY: "scroll"
                                                        }}>
                                                            <th style={{ textAlign: "center" }}>
                                                                <Checkbox
                                                                    checked={row?.schedule === 0 ? row?.inValue : true}
                                                                    onChange={(e) => {
                                                                        HandleCheckbox(e.target.checked, row)
                                                                    }}
                                                                />
                                                            </th>
                                                            <td>{row?.em_no}</td>
                                                            <td>{row?.em_name}</td>
                                                            <td>{row?.desg_name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Sheet>
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Textarea name="Solid" placeholder="Drop Remarks here.." color="warning"
                                            maxRows={3} value={remark} onChange={handleText} style={{ width: '100%' }} />
                                    </Box>
                                    <Box sx={{ textAlign: "end", p: 0.5 }}>
                                        <Button
                                            color="success"
                                            onClick={HandleSubmit}
                                            size="sm"
                                            sx={{ py: 0, color: 'white', }}
                                        >
                                            SAVE
                                        </Button>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal >
        </Fragment >
    )
}

export default memo(DeptScheduleModal) 
