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
        { headerName: 'Trainer Names', field: 'traineer_name', filter: true, width: 250 },
        { headerName: 'Training Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Training Department Section', field: 'sect_name', filter: true, width: 250 },
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

// import { Box, Tooltip, TextField } from '@mui/material'
// import moment from 'moment'
// import React, { memo, useCallback, useEffect, useState } from 'react'
// import CommonAgGrid from 'src/views/Component/CommonAgGrid'
// import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage'
// import DoneIcon from '@mui/icons-material/Done';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import { IconButton as OpenIcon } from '@mui/material';
// import { axioslogin } from 'src/views/Axios/Axios'
// import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import SelectTopics from 'src/views/MuiComponents/SelectTopics'
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import SearchIcon from '@mui/icons-material/Search';
// import { isAfter, isBefore } from 'date-fns'

// const TrainingAttendanceMarking = ({ setShow, count, Setcount, Details }) => {

//     const [tabledata, setTableData] = useState([])
//     const [filterdate, setFilterDate] = useState(moment());
//     const [pickdate, setPickdate] = useState();
//     const [flag, setFlag] = useState(0);
//     const [topic, setTopic] = useState([])
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const displayData = data?.map((val) => {
//             const object = {
//                 slno: val.slno,
//                 emp_name: val.emp_name,
//                 emp_dept: val.emp_dept,
//                 emp_dept_sectn: val.emp_dept_sectn,
//                 topic: val.topic,
//                 schedule_date: moment(val.schedule_date).format("DD-MM-YYYY"),
//                 topic_slno: val.topic_slno,
//                 training_topic_name: val.training_topic_name,
//                 em_id: val.em_id,
//                 em_name: val.em_name,
//                 dept_id: val.dept_id,
//                 dept_name: val.dept_name,
//                 sect_id: val.sect_id,
//                 sect_name: val.sect_name,
//                 training_status: val.training_status
//             }
//             return object;
//         })
//         setTableData(displayData)
//         if (flag === 1) {
//             const ScheduleDate = displayData?.filter((val) => {
//                 return val.schedule_date === pickdate

//             })
//             if (ScheduleDate?.length !== 0) {
//                 setTableData(ScheduleDate);
//             }
//             else {
//                 infoNofity("No training Scheduled")
//             }
//         }
//     }, [data, pickdate, flag])


//     const markAttendance = useCallback(async (params) => {
//         const data = params.api.getSelectedRows()
//         const { slno } = data[0]
//         const patchdata = {
//             slno: slno
//         }
//         const result = await axioslogin.patch('/TrainingProcess/attendance', patchdata)
//         const { success, message } = result.data;
//         if (success === 2) {
//             succesNofity(message)
//             Setcount(count + 1)
//         }
//         else {
//             warningNofity(message)
//         }
//     }, [Setcount, count])

//     //table
//     const [columnDef] = useState([
//         // { headerName: 'slno', field: 'slno', filter: true, width: 150 },
//         { headerName: 'Employee Names', field: 'em_name', filter: true, width: 300 },
//         { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
//         { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
//         { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
//         { headerName: 'schedule Date', field: 'schedule_date', filter: true, width: 150 },
//         {
//             headerName: 'Mark Attendance',
//             cellRenderer: params => {
//                 if (params.data.training_status === 1) {
//                     return <OpenIcon
//                         sx={{ paddingY: 0.5, cursor: 'none' }}  >
//                         <Tooltip title="Attendance Marked">
//                             <DoneIcon />
//                         </Tooltip>
//                     </OpenIcon>
//                 } else {
//                     return <OpenIcon onClick={() => markAttendance(params)}
//                         sx={{ paddingY: 0.5 }} >
//                         <Tooltip title="Mark Attendance">
//                             <HowToRegIcon color='primary' />
//                         </Tooltip>
//                     </OpenIcon>
//                 }
//             }
//         }
//     ])
//     const handleDateChange = useCallback(() => {
//         const selectdate = moment(filterdate, "DD-MM-YYYY").toDate();
//         const getdate = moment(selectdate).format("DD-MM-YYYY")
//         setPickdate(getdate);
//         setFlag(1);
//         const scheduleTopic = tabledata?.filter((val) => {
//             return val.topic_slno === topic
//         })
//         setTableData(scheduleTopic);
//     }, [filterdate, setFlag, topic, tabledata])

//     //is before
//     // const rowStyle = { background: '#CE7D78' };
//     // const getRowStyle = params => {
//     //     if (isBefore(new Date(params.data.schedule_date), new Date())) {
//     //         return { background: '#CE7D78' };
//     //     }
//     // };

//     useEffect(() => {
//         const upcomingfilter = Details?.filter((val) => isBefore(new Date(moment(val.schedule_date).format("YYYY-MM-DD")), new Date()));
//         setData(upcomingfilter);
//     }, [Details, setData])

//     console.log(data);
//     return (
//         <CustomDashboardPage title="Training Attendance" displayClose={true} setClose={setShow} >
//             <Box sx={{ width: "100%", p: 2 }}>
//                 <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
//                     <LocalizationProvider dateAdapter={AdapterMoment} >
//                         <DatePicker
//                             views={['day']}
//                             inputFormat="DD-MM-YYYY"
//                             value={filterdate}
//                             onChange={setFilterDate}
//                             renderInput={(params) => (
//                                 <TextField {...params} helperText={null} size="small" />
//                             )}
//                         />
//                     </LocalizationProvider>

//                     <Box sx={{ width: "20%" }} >
//                         <SelectTopics setTopic={setTopic} />

//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <SearchIcon
//                             color="neutral"
//                             onClick={handleDateChange}
//                         />
//                     </Box>
//                 </Box>
//                 <CommonAgGrid
//                     columnDefs={columnDef}
//                     tableData={data}
//                     sx={{
//                         height: 700,
//                         width: "100%", mt: 1
//                     }}
//                     rowHeight={30}
//                     headerHeight={30}
//                 // rowStyle={rowStyle}
//                 // getRowStyle={getRowStyle}
//                 />
//             </Box>
//         </CustomDashboardPage >
//     )
// }

// export default memo(TrainingAttendanceMarking)
