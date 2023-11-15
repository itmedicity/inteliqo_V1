import { Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DoneIcon from '@mui/icons-material/Done';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IconButton as OpenIcon } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment';
import SaveIcon from '@mui/icons-material/Save';

const AttendanceModal = ({ count, Setcount, open, Setopen, Todaydata, Details, getData }) => {
    const [tableData, setTableData] = useState([]);
    const [setData, setsetData] = useState([]);
    const [question_count, setQuestion_count] = useState('');

    useEffect(() => {
        const filterdata = Details?.filter((val) => {
            return getData?.find((item) => item.topic_slno === val.topic_slno && moment(val.schedule_date).format("YYYY-MM-DD") === moment(new Date()).format('YYYY-MM-DD'));
        })
        setsetData(filterdata);
    }, [getData, Details, setsetData])

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    useEffect(() => {
        const displayData = setData?.map((val) => {
            const object = {
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                em_id: val.em_id,
                em_name: val.em_name,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                emp_name: val.emp_name,
                schedule_date: val.schedule_date,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                training_status: val.training_status
            }
            return object;
        })
        setTableData(displayData)
    }, [setData, setTableData])

    //mark attendance
    const markAttendance = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { slno } = data[0]
        const patchdata = {
            slno: slno
        }
        const result = await axioslogin.patch('/TrainingProcess/attendance', patchdata)
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message)
            Setcount(count + 1)
        }
        else {
            warningNofity(message)
        }
    }, [Setcount, count])

    const [columnDef] = useState([
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 150 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 150 },
        {
            headerName: 'Mark Attendance',
            cellRenderer: params => {
                if (params.data.training_status === 1) {
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
        const { slno, date, topic_slno } = Todaydata[0]
        const patchdata = {
            slno: slno,
            schedule_date: moment(date).format("YYYY-MM-DD HH:MM:SS"),
            topic_slno: topic_slno,
            question_count: question_count
        }
        const result = await axioslogin.patch('/TrainingProcess/questionCount', patchdata)
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message)
            Setcount(count + 1)
            setQuestion_count('');
        }
        else {
            warningNofity(message)
            setQuestion_count('')
        }
    }, [Setcount, count, question_count, setQuestion_count])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "60%", height: 550 }}>
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
                    Training Attendance
                </Typography>
                <Box sx={{ overflow: 'auto', mt: 1 }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 400,
                            width: "100%", mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", mt: 3, width: "100%", justifyContent: "flex-end", gap: 3 }} >
                    <Typography>Random Question Count</Typography>
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
