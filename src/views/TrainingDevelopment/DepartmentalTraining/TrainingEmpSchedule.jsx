import React, { Fragment, memo } from 'react'
import { useCallback } from 'react';
import { CssVarsProvider, Typography, Button, Box, Input, Sheet, IconButton, Table, Checkbox, Modal, ModalDialog } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import { endOfMonth } from 'date-fns';
import ModalClose from '@mui/joy/ModalClose';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


const TrainingEmpSchedule = ({ open, setOpen, setFlag, count, Setcount, rowdata, EmpDetails }) => {

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const [scheduleDate, setScheduleDate] = useState(moment(new Date(rowdata.schedule_date)).format('YYYY-MM-DD'));
    const [slno, setSlno] = useState(0);
    const [viewTable, setViewtable] = useState(0)
    const [datas, setdatas] = useState([])
    const [newdata, setNewdata] = useState([])

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

    const reset = useCallback(() => {
        setNewdata([])
        setScheduleDate('')
        setViewtable(0)
    }, [])

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
        if (EmpDetails.length !== 0) {
            const mapArry = EmpDetails?.map((item) => {
                const obj = {
                    em_name: item.em_name,
                    desg_name: item.desg_name,
                    "inValue": false
                }
                return {
                    ...item,
                    ...obj
                }
            })
            setdatas(mapArry)
        } else {
            setdatas([])
        }
    }, [EmpDetails])

    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "em_name": item.em_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    useEffect(() => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        setNewdata(filterarray);
    }, [datas])

    const patchdata = useMemo(() => {
        return {
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            slno: slno,
            edit_user: em_id
        }
    }, [scheduleDate, slno, em_id])

    const postdata = newdata?.map((val) => {
        const obj = {
            emp_name: val.em_id,
            emp_desig: val.desg_slno,
            emp_dept: data.dept_id,
            emp_dept_sectn: data.sect_id,
            schedule_date: moment(scheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            topic: data.topic_slno,
            create_user: em_id
        }
        return obj
    }, [newdata, scheduleDate, em_id, data])

    const SubmitSchedule = useCallback(async () => {
        const result = await axioslogin.patch('/TrainingAfterJoining/ScheduledateUpdate', patchdata)
        const { success, message } = result.data
        if (success === 1) {
            const results = await axioslogin.post('/TrainingAfterJoining/insertEmployees', postdata)
            const { success, message } = results.data
            if (success === 1) {
                succesNofity(message);
                setFlag(0);
                Setcount(count + 1);
                reset();
            }
            else {
                warningNofity(message)
            }
        }
        else {
            warningNofity(message)
            setFlag(0);

        }
    }, [patchdata, postdata, count, reset, Setcount, setFlag])

    const end = endOfMonth(new Date(scheduleDate))

    const UpdateDate = useCallback((e) => {
        const d = moment(new Date(e.target.value)).format("YYYY-MM-DD")
        setScheduleDate(d)
    }, [setScheduleDate])

    const HandleEmpSelect = useCallback((e) => {
        setViewtable(1);
    }, [setViewtable])

    const Handleclose = useCallback((e) => {
        setOpen(false)
        setViewtable(0);
    }, [setOpen, setViewtable])
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
                        Training Schedule
                    </Typography>
                    {/* <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        textAlign="center"
                        mb={1}
                    >
                        Training Schedule
                    </Typography> */}

                    <Box sx={{ display: "flex", flexDirection: "row", mt: 3, pl: 0.5 }}>
                        <Box sx={{}}>Schedule Date</Box>
                        <Box sx={{ px: 10 }}>{data?.schedule_date}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 2, pl: 0.5 }}>
                        <Box sx={{}}>Training Topic</Box>
                        <Box sx={{ px: 10.5, textTransform: "capitalize" }}>{data?.training_topic_name.toUpperCase()}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 2, pl: 0.5 }}>
                        <Box sx={{}}>Trainer Names</Box>
                        <Box sx={{ px: 10 }}>{data?.traineer_name}</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: 2, pl: 0.5 }}>
                        <Box sx={{ mt: 1 }}>Reschedule Date</Box>
                        <Box sx={{ px: 8 }}>
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="date"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            max: moment(new Date(end)).format('YYYY-MM-DD'),
                                        },
                                    }}
                                    value={scheduleDate}
                                    name="scheduleDate"
                                    onChange={(e) => UpdateDate(e)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ pl: 5, display: "flex", flexDirection: "row", gap: 1 }}>
                            <IconButton style={{ py: 0.5 }} onClick={(e) => { HandleEmpSelect(e) }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                            <Box sx={{ mt: 1 }}>Add Employees</Box>
                        </Box>
                    </Box>
                    {
                        viewTable === 1 ?
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
                                                <th>Name</th>
                                                <th>Designation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas?.map((row, index) => (
                                                <tr key={index}>
                                                    <th style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            checked={row?.inValue || false}
                                                            onChange={(e) => {
                                                                HandleCheckbox(e.target.checked, row)
                                                            }}
                                                        />
                                                    </th>
                                                    <td>{row?.em_name}</td>
                                                    <td>{row?.desg_name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CssVarsProvider>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", px: 5, mt: 2 }}>
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
                            </Sheet>

                            : null
                    }
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(TrainingEmpSchedule)
