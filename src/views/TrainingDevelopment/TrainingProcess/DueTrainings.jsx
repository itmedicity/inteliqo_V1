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
import { format } from 'date-fns'

const DueTrainings = ({ setShow, trainingcompleted }) => {
    const [filterdate, setFilterDate] = useState(moment());
    const [pickdate, setPickdate] = useState();
    const [flag, setFlag] = useState(0);
    const [topic, setTopic] = useState(0)

    const [completedData, SetCompletedData] = useState([]);
    useEffect(() => {
        const CompletedData = trainingcompleted?.map((val) => {
            const object = {
                deparment_sect: val.deparment_sect,
                department: val.department,
                posttest_status: val.posttest_status,
                schedule_topics: val.schedule_topics,
                schedule_date: val.schedule_date,
                date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                schedule_year: val.schedule_year,
                slno: val.slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                em_name: val.em_name,
                sect_name: val.sect_name,
                sn: val.sn,
                em_no: val.em_no
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
        { headerName: 'Emp ID', field: 'em_no', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Department_sec', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'date', filter: true, width: 100 },
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
export default memo(DueTrainings)


