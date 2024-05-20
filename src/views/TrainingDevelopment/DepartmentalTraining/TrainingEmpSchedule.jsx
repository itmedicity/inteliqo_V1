import React, { Fragment, memo } from 'react'
import { useCallback } from 'react';
import { CssVarsProvider, Typography, Button, Box, Input, Sheet, IconButton, Table, Checkbox, Modal, ModalDialog } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import { startOfMonth } from 'date-fns';
import ModalClose from '@mui/joy/ModalClose';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Tooltip } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import JoyTrainerMultipleSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainerMultipleSelect';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { TrainerNames } from 'src/redux/actions/Training.Action';
const TrainingEmpSchedule = ({ Scheduledata, open, setOpen, setFlag, count, Setcount, rowdata, EmpDetails }) => {

    const dispatch = useDispatch();

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const [scheduleDate, setScheduleDate] = useState(moment(new Date(rowdata.schedule_date)).format('YYYY-MM-DD'));
    const [slno, setSlno] = useState(0);
    const [datas, setdatas] = useState([])
    const [newdata, setNewdata] = useState([])
    const [editTrainer, seteditTrainer] = useState(0)
    const [trainer, setTrainer] = useState([])
    const [updateFlag, setUpdateFlag] = useState(0)

    const [data, setdata] = useState({
        slno: 0,
        date: '',
        month: '',
        schedule_date: '',
        em_id: '',
        traineer_name: '',
        training_topic_name: '',
        topic_slno: '',
        dept_id: 0,
        sect_id: 0
    })
    useEffect(() => {
        dispatch(TrainerNames())
    }, [dispatch, count])

    const reset = useCallback(() => {
        setScheduleDate('')
        setFlag(0);
    }, [setFlag])

    useEffect(() => {
        if (Object.keys(rowdata).length !== 0) {
            const { date, month, schedule_date, traineer_name, training_topic_name, slno, em_id, topic_slno, dept_id, sect_id } = rowdata;
            const obj = {
                slno: slno,
                date: date,
                month: month,
                schedule_date: moment(schedule_date).format("YYYY-MM-DD"),
                traineer_name: traineer_name,
                training_topic_name: training_topic_name,
                topic_slno: topic_slno,
                em_id: em_id,
                dept_id: dept_id,
                sect_id: sect_id
            }
            setdata(obj);
            setSlno(slno);
        }
    }, [rowdata])

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

    const start = startOfMonth(new Date(scheduleDate))

    const Handleclose = useCallback((e) => {
        setOpen(false)
    }, [setOpen])


    const postdata = newdata?.map((val) => {
        const obj = {
            slno: slno,
            emp_name: val.em_id,
            emp_desig: val.desg_slno,
            emp_dept: data.dept_id,
            emp_dept_sectn: data.sect_id,
            schedule_date: data.schedule_date,
            topic: data.topic_slno,
            create_user: em_id
        }
        return obj
    }, [newdata, scheduleDate, slno, em_id, data])

    const patchdata = useMemo(() => {
        return {
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            slno: slno,
            edit_user: em_id
        }
    }, [scheduleDate, slno, em_id])


    const EditTrainers = useCallback(() => {
        seteditTrainer(1)
        setUpdateFlag(2)
    }, [seteditTrainer])

    const updateTrainers = useMemo(() => {
        return {
            slno: slno,
            trainer: trainer,
            edit_user: em_id
        }
    }, [trainer, slno, em_id])


    const SubmitSchedule = useCallback(() => {
        //Insert
        if (updateFlag === 0) {
            const InsertData = async (postdata) => {
                const results = await axioslogin.post('/TrainingAfterJoining/insertEmployees', postdata)
                const { success, message } = results.data
                if (success === 1) {
                    succesNofity(message);
                    Setcount(count + 1);
                    reset();
                }
                else {
                    warningNofity(message)
                }
            }
            InsertData(postdata)
        }
        else if (updateFlag === 1) {

            //Edit
            const editDate = async (patchdata) => {
                const result = await axioslogin.patch('/TrainingAfterJoining/ScheduledateUpdate', patchdata)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    Setcount(count + 1);
                }
                else {
                    warningNofity("Date Not Changed")
                }
            }
            editDate(patchdata)
        }
        else {
            const editTrainers = async (updateTrainers) => {
                if (editTrainer === 1) {
                    const result = await axioslogin.patch('/TrainingAfterJoining/UpdateTrainers', updateTrainers)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNofity(message)
                        Setcount(count + 1);
                        setTrainer([])
                        seteditTrainer(0)
                    }
                    else {
                        warningNofity("Not Changed")
                    }
                }
            }
            editTrainers(updateTrainers)
        }
    }, [patchdata, updateFlag, reset, postdata, editTrainer, seteditTrainer, setTrainer, Setcount, count, updateTrainers])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={Handleclose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
                        startDecorator={
                            <PendingActionsIcon sx={{ color: 'green' }} />
                        }
                        sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                    >
                        Training Reschedule & Add Employee
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: "row", p: 1, gap: 5 }}>
                        <Box >
                            <Box sx={{ mt: 2 }}>Schedule Date</Box>
                            <Box sx={{ mt: 2 }}>Training Topic</Box>
                            <Box sx={{ mt: 2 }}>Trainer Names</Box>
                            <Box sx={{ mt: 4 }}>Reschedule Date</Box>
                        </Box>
                        <Box >
                            <Box sx={{ mt: 2 }}>{data?.schedule_date}</Box>
                            <Box sx={{ mt: 2, textTransform: "capitalize" }}>{data?.training_topic_name?.toLowerCase()}</Box>
                            <Box sx={{ mt: 2 }}>
                                {
                                    editTrainer === 1 ?
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                            <Box sx={{ width: "100%" }}>
                                                <JoyTrainerMultipleSelect value={trainer} setValue={setTrainer} />
                                            </Box>
                                        </Box>
                                        : <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                            <Box sx={{ textTransform: "capitalize" }}>{data?.traineer_name?.toLowerCase()}</Box>
                                            <Tooltip title="Change Trainer">
                                                <Box>
                                                    <IconButton onClick={(e) => { EditTrainers(e) }}>
                                                        <ChangeCircleIcon />
                                                    </IconButton>
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                }
                            </Box>
                            <Box sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
                                <Box>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        < DatePicker
                                            views={['day']}
                                            minDate={moment(new Date(start)).format('YYYY-MM-DD')}
                                            value={scheduleDate}
                                            size="small"
                                            onChange={(e) => {
                                                setScheduleDate(moment(e).format("YYYY-MM-DD"));
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <CssVarsProvider>
                                                        <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                                    </CssVarsProvider>
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Tooltip title="Save employees">
                            <Box sx={{ display: "flex", justifyContent: "flex-start", }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={SubmitSchedule}
                                        size="sm"
                                        sx={{ color: '#81c784' }}
                                    >
                                        <SaveIcon sx={{ fontSize: 25 }} />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                    </Box>

                    <Sheet sx={{
                        mt: 3,
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }, height: 400,
                        width: "100%"
                    }}>
                        <CssVarsProvider>
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
                        </CssVarsProvider>
                    </Sheet>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(TrainingEmpSchedule)
