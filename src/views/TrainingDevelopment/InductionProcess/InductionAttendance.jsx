import { Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DoneIcon from '@mui/icons-material/Done';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IconButton as OpenIcon } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SaveIcon from '@mui/icons-material/Save';
import { format } from 'date-fns';

const InductionAttendance = ({ count, Setcount, open, Setopen, attendance }) => {

    const [tableData, setTableData] = useState([]);
    const [question_count, setQuestion_count] = useState(0);
    const [dataArray, setDataArray] = useState([])
    const [topicArray, setTopicArray] = useState([])
    // const [markData, setMarkData] = useState([]);

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    const maparr = useMemo(() => attendance, [attendance])

    useEffect(() => {
        const displayData = maparr?.map((val) => {
            const object = {
                induction_slno: val.induction_slno,
                schedule_no: val.schedule_no,
                indct_emp_no: val.indct_emp_no,
                induct_emp_dept: val.induct_emp_dept,
                induct_emp_sec: val.induct_emp_sec,
                schedule_topic: val.schedule_topic,
                induction_date: val.induction_date,
                em_id: val.em_id,
                em_name: val.em_name,
                em_no: val.em_no,
                date: format(new Date(val.induction_date), "dd-MM-yyyy"),
                attandance_status: 0,
                training_status: val.training_status,
                topic_training: val.topic_training,
                topic_pretest: val.topic_pretest,
                topic_posttest: val.topic_posttest,
                topic_online: val.topic_online,
                topic_offline: val.topic_offline,
                topic_bothmode: val.topic_bothmode
            }
            return object;
        })
        setTableData(displayData)
        // setMarkData(displayData)
    }, [maparr])


    const { topic_training, topic_pretest, topic_posttest, topic_online, topic_offline, topic_bothmode } = topicArray;

    useEffect(() => {
        if (Object.keys(tableData).length > 0) {
            const { topic_training, topic_pretest, topic_posttest, topic_online, topic_offline, topic_bothmode } = tableData[0];
            const obj = {
                topic_training: topic_training,
                topic_pretest: topic_pretest,
                topic_posttest: topic_posttest,
                topic_online: topic_online,
                topic_offline: topic_offline,
                topic_bothmode: topic_bothmode
            }
            setTopicArray(obj)
        }
    }, [tableData, setTopicArray])


    const markAttendance = useCallback((params) => {
        const data = params.data
        setDataArray(data)
    }, [])

    useEffect(() => {
        if (Object.keys(dataArray).length > 0) {
            const { em_id } = dataArray;
            const obj = {
                em_id: em_id,
                attandance_status: 1
            }
            const result = tableData?.map((item) => item.em_id === obj.em_id ? { ...item, ...obj } : item);
            setTableData(result);
        }
    }, [dataArray])


    const [columnDef] = useState([
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        {
            headerName: 'Mark Attendance',
            cellRenderer: params => {
                if (params.data.attandance_status === 1 || params.data.training_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Attendance Marked">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => markAttendance(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Mark Attendance">
                            <HowToRegIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])

    const handleSubmit = useCallback(async () => {
        if (topic_training === 0 || topic_pretest !== 0 || topic_posttest !== 0 || topic_online !== 0 || topic_offline !== 0 || topic_bothmode !== 0 && question_count !== 0) {
            const arr = tableData?.filter((val) => val.attandance_status === 1);
            const mapArry = arr?.map((item) => {
                const obj = {
                    training_status: 1,
                    question_count: parseInt(question_count)
                }
                return {
                    ...item,
                    ...obj
                }
            })
            const result = await axioslogin.patch('/InductionProcess/questionCount', mapArry)
            const { success, message } = result.data;
            if (success === 1) {
                Setcount(count + 1)
                setQuestion_count(0);
                Setopen(false)
                succesNofity(message)
            }
            else {
                warningNofity(message)
                setQuestion_count(0)
            }
        }
        else {
            const trainingOnly = tableData?.filter((val) => val.attandance_status === 1);
            const trainingArr = trainingOnly?.map((item) => {
                const obj = {
                    training_status: 1
                }
                return {
                    ...item,
                    ...obj
                }
            })
            const result = await axioslogin.patch('/InductionProcess/trainingOnly', trainingArr)
            const { success, message } = result.data;
            if (success === 1) {
                Setcount(count + 1)
                Setopen(false)
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }

    }, [Setcount, tableData, count, question_count, Setopen, setQuestion_count, topic_training, topic_pretest, topic_posttest, topic_online, topic_offline, topic_bothmode])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "60%", height: 600 }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body'
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
                    Induction Training Attendance Marking
                </Typography>
                <Box sx={{ overflow: 'auto', mt: 1 }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 500,
                            width: "100%", mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", mt: 2, width: "100%", justifyContent: "flex-end", gap: 3 }} >
                    <Box>
                        {topic_training === 0 || topic_pretest !== 0 || topic_posttest !== 0 || topic_online !== 0 || topic_offline !== 0 || topic_bothmode !== 0 ?
                            <Box sx={{ display: "flex", flexDirection: "row", }}>
                                <Typography sx={{ mt: 0.5 }}>Random Question Count</Typography>
                                <Box >
                                    <input
                                        type='number'
                                        name='question count'
                                        value={question_count}
                                        onChange={(e) => { setQuestion_count(e.target.value) }}
                                    />
                                </Box>
                            </Box>
                            : null}
                    </Box>
                    <Box>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={handleSubmit}
                                size="sm"
                                sx={{ py: 0, color: '#81c784' }}

                            >
                                <SaveIcon sx={{ fontSize: 25 }} />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(InductionAttendance)
