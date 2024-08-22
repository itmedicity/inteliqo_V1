import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import CustomInnerHeightDashBoard from 'src/views/Component/MuiCustomComponent/CustomInnerHeightDashBoard'
import { format } from 'date-fns'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action'

const TrainingCompletedDepats = ({ setShow, trainingcompleted }) => {
    const [dept, setDept] = useState(0)

    const dispatch = useDispatch()

    const [completedData, SetCompletedData] = useState([]);
    useEffect(() => {
        dispatch(setDepartment())
        const CompletedData = trainingcompleted?.map((val) => {
            const object = {
                sn: val.sn,
                department: val.department,
                deparment_sect: val.deparment_sect,
                schedule_topics: val.schedule_topics,
                schedule_date: val.schedule_date,
                date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                slno: val.slno,
                training_topic_name: val.training_topic_name,
                sect_name: val.sect_name,
                dept_name: val.dept_name
            }
            return object;
        })
        SetCompletedData(CompletedData)
        const ScheduleDate = CompletedData?.filter((val) => {
            return val.department === dept

        })
        if (ScheduleDate?.length !== 0) {
            SetCompletedData(ScheduleDate);
        }
        else {
            infoNofity("No training Scheduled")
        }
    }, [trainingcompleted, dispatch, dept])


    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sn', filter: true, width: 100 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 150 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 200 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'schedule Date', field: 'date', filter: true, width: 100 },
    ])

    const toClose = useCallback(() => {
        setShow(0)
    }, [setShow])

    return (
        <CustomInnerHeightDashBoard title="Training Completed Department List" toClose={toClose} >
            <Box sx={{ width: "100%", p: 0.2, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper elevation={0} sx={{ display: 'flex', px: 1, py: 0.5 }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <JoyDepartment getDept={setDept} deptValue={dept} />
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

export default memo(TrainingCompletedDepats) 
