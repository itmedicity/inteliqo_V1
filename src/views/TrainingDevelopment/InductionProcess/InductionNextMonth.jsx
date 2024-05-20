import { Box, Paper } from '@mui/material'
import moment from 'moment'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import CustomInnerHeightDashBoard from 'src/views/Component/MuiCustomComponent/CustomInnerHeightDashBoard'
import { CssVarsProvider, IconButton, Input } from '@mui/joy'
import JoySelectTopic from 'src/views/MuiComponents/JoyComponent/JoySelectTopic'

const InductionNextMonth = ({ setShow, NextmonthData, }) => {
    const [tabledata, setTableData] = useState([])
    const [filterdate, setFilterDate] = useState(moment());
    const [pickdate, setPickdate] = useState();
    const [flag, setFlag] = useState(0);
    const [topic, setTopic] = useState([])

    useEffect(() => {
        const displayData = NextmonthData?.map((val) => {
            const object = {
                schedule_topic: val.schedule_topic,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                date: val.date
            }
            return object;
        })
        setTableData(displayData)
        if (flag === 1) {
            const ScheduleDate = displayData?.filter((val) => {
                return val.date === pickdate && val.topic_slno === topic

            })
            if (ScheduleDate?.length !== 0) {
                setTableData(ScheduleDate);
            }
            else {
                infoNofity("No training Scheduled")
            }
        }
    }, [NextmonthData, flag, topic, pickdate])

    const [columnDef] = useState([
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'date', filter: true, width: 150 },
    ])

    const handleDateChange = useCallback(() => {
        const selectdate = moment(filterdate, "DD-MM-YYYY").toDate();
        const getdate = moment(selectdate).format("DD-MM-YYYY")
        setPickdate(getdate);
        setFlag(1);
    }, [filterdate])

    const toClose = useCallback(() => {
        setShow(0)
    }, [setShow])
    return (
        <CustomInnerHeightDashBoard title="Next Month Training List" toClose={toClose} >
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
                        tableData={tabledata}
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
export default memo(InductionNextMonth)
