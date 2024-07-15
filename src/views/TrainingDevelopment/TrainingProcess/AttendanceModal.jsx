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

const AttendanceModal = ({ count, Setcount, open, Setopen, attendance }) => {

    const [tableData, setTableData] = useState([]);
    const [question_count, setQuestion_count] = useState(0);
    const [dataArray, setDataArray] = useState([])

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    const maparr = useMemo(() => attendance, [attendance])

    useEffect(() => {
        const displayData = maparr?.map((val) => {
            const object = {
                em_id: val.em_id,
                em_name: val.em_name,
                posttest_permission: val.posttest_permission,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                question_count: val.question_count,
                slno: val.slno,
                topic: val.topic,
                schedule_date: val.schedule_date,
                date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                topic_slno: val.topic_slno,
                training_status: val.training_status,
                training_topic_name: val.training_topic_name,
                attandance_status: 0,
                em_no: val.em_no
            }
            return object;
        })
        setTableData(displayData)
    }, [maparr])


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
        if (question_count !== 0) {
            const arr = tableData?.filter((val) => val.attandance_status === 1);
            const mapArry = arr?.map((item) => {
                const obj = {
                    training_status: 1,
                    question_count: question_count
                }
                return {
                    ...item,
                    ...obj
                }
            })
            const result = await axioslogin.patch('/TrainingProcess/questionCount', mapArry)
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
            alert("The Question Count Field is empty")
        }

    }, [Setcount, tableData, count, question_count, Setopen, setQuestion_count])

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
                    Training Attendance Marking
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
                    <Typography sx={{ mt: 0.5 }}>Random Question Count</Typography>
                    <Box >
                        <input
                            type='number'
                            name='question count'
                            value={question_count}
                            onChange={(e) => { setQuestion_count(e.target.value) }}
                        />
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

export default memo(AttendanceModal)
