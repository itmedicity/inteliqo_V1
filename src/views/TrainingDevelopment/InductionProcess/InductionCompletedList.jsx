import { Box, Paper } from '@mui/material'
import moment from 'moment'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Input } from '@mui/joy'
import CustomInnerHeightDashBoard from 'src/views/Component/MuiCustomComponent/CustomInnerHeightDashBoard'
import JoySelectTopic from 'src/views/MuiComponents/JoyComponent/JoySelectTopic'

const InductionCompletedList = ({ setShow, trainingcompleted }) => {
    const [filterdate, setFilterDate] = useState(moment());
    const [pickdate, setPickdate] = useState();
    const [flag, setFlag] = useState(0);
    const [topic, setTopic] = useState(0)

    const [completedData, SetCompletedData] = useState([]);
    useEffect(() => {
        const CompletedData = trainingcompleted?.map((val) => {
            const object = {
                induction_slno: val.induction_slno,
                schedule_no: val.schedule_no,
                indct_emp_no: val.indct_emp_no,
                induct_emp_dept: val.induct_emp_dept,
                training_status: val.training_status,
                induction_date: val.induction_date,
                date: moment(val.induction_date).format('YYYY-MM-DD'),
                question_count: val.question_count,
                pretest_status: val.pretest_status,
                topic_slno: val.topic_slno,
                posttest_status: val.posttest_status,
                online_mode: val.online_mode,
                offline_mode: val.offline_mode,
                retest: val.retest,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                schedule_topic: val.schedule_topic,
                training_topic_name: val.training_topic_name,
                sn: val.sn,
                em_id: val.em_id,
                em_name: val.em_name,
                postdate: moment(val.postdate).format('YYYY-MM-DD'),
            }
            return object;
        })

        SetCompletedData(CompletedData)
        if (flag === 1) {
            const ScheduleDate = CompletedData?.filter((val) => {
                return val.date === pickdate && val.topic_slno === topic

            })
            if (ScheduleDate?.length !== 0) {
                SetCompletedData(ScheduleDate);
            }
            else {
                infoNofity("No training Scheduled")
            }
        }
    }, [trainingcompleted, flag, topic, pickdate])

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Department_sec', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Schedule Date ', field: 'date', filter: true, width: 100 },
        { headerName: 'Completed ', field: 'postdate', filter: true, width: 100 },
    ])

    const handleDateChange = useCallback(() => {
        setPickdate(moment(filterdate).format("YYYY-MM-DD"));
        setFlag(1);
    }, [filterdate])

    const toClose = useCallback(() => {
        setShow(0)
    }, [setShow])

    return (
        <CustomInnerHeightDashBoard title="Training Completed Employee List" toClose={toClose} >
            <Box sx={{ width: "100%", p: 0.2, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper elevation={0} sx={{ display: 'flex', px: 1, py: 0.5 }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <LocalizationProvider dateAdapter={AdapterMoment} >
                            <DatePicker
                                views={['day']}
                                inputFormat="DD-MM-YYYY"
                                value={filterdate}
                                onChange={(newValue) => {
                                    setFilterDate(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <JoySelectTopic setTopic={setTopic} topic={topic} />

                    </Box>
                    <Box sx={{ p: 1 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' color="primary" onClick={handleDateChange}>
                                <SearchIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1 }}></Box>
                    <Box sx={{ flex: 1 }}></Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={completedData}
                        sx={{
                            height: 400,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </CustomInnerHeightDashBoard >
    )
}
export default memo(InductionCompletedList)


