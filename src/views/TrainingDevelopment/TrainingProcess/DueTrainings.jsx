import { Box, TextField } from '@mui/material'
import moment from 'moment'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import SelectTopics from 'src/views/MuiComponents/SelectTopics'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'

const DueTrainings = ({ setShow, data }) => {
    const [tabledata, setTableData] = useState([])
    const [filterdate, setFilterDate] = useState(moment());
    const [pickdate, setPickdate] = useState();
    const [flag, setFlag] = useState(0);
    const [topic, setTopic] = useState([])

    useEffect(() => {
        const displayData = data?.map((val) => {
            const object = {
                deparment_sect: val.deparment_sect,
                department: val.department,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                schedule_topics: val.schedule_topics,
                date: val.date,
                schedule_trainers: val.schedule_trainers,
                schedule_year: val.schedule_year,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic_slno: val.topic_slno,
                traineer_name: val.traineer_name,
                training_topic_name: val.training_topic_name,
            }
            return object;
        })
        setTableData(displayData)
        if (flag === 1) {
            const ScheduleDate = displayData?.filter((val) => {
                return val.date === pickdate

            })
            if (ScheduleDate?.length !== 0) {
                setTableData(ScheduleDate);
            }
            else {
                infoNofity("No training Scheduled")
            }
        }
    }, [data, flag, pickdate])

    const [columnDef] = useState([
        // { headerName: 'Trainer Names', field: 'traineer_name', filter: true, width: 250 },
        // { headerName: 'Training Department', field: 'dept_name', filter: true, width: 250 },
        // { headerName: 'Training Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'date', filter: true, width: 150 },
    ])

    const handleDateChange = useCallback(() => {
        const selectdate = moment(filterdate, "DD-MM-YYYY").toDate();
        const getdate = moment(selectdate).format("DD-MM-YYYY")
        setPickdate(getdate);
        setFlag(1);
        const scheduleTopic = tabledata?.filter((val) => {
            return val.topic_slno === topic
        })
        setTableData(scheduleTopic);
    }, [filterdate, topic, tabledata])
    return (
        <CustomDashboardPage title="Next Month Trainings" displayClose={true} setClose={setShow} >
            <Box sx={{ width: "100%", p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={filterdate}
                            onChange={setFilterDate}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" />
                            )}
                        />
                    </LocalizationProvider>

                    <Box sx={{ width: "20%" }} >
                        <SelectTopics setTopic={setTopic} />

                    </Box>
                    <Box sx={{ p: 1 }}>
                        <SearchIcon
                            color="neutral"
                            onClick={handleDateChange}
                        />
                    </Box>
                </Box>
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={tabledata}
                    sx={{
                        height: 700,
                        width: "100%", mt: 1
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Box>
        </CustomDashboardPage>
    )
}
export default memo(DueTrainings)


