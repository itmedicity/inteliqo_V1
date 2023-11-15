import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { DepartmentalTrainingDetails, ScheduleTopicListOfEmp } from 'src/redux/actions/Training.Action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import QuestionPaper from './QuestionPaper';
import { screenInnerHeight } from 'src/views/Constant/Constant';

const EmployeeTrainingTopViewList = () => {
    const [tabledata, setTabledata] = useState([]);
    const [count, Setcount] = useState(0);
    const [open, setOpen] = useState(false);
    const [Userdata, setUserdata] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ScheduleTopicListOfEmp(em_id))
        dispatch(DepartmentalTrainingDetails())
    }, [dispatch, count])

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const EmpTopics = useSelector((state) => state?.gettrainingData?.scheduleTopicOnEmp?.scheduleTopicOnEmpList, _.isEqual)

    useEffect(() => {
        const displayData = EmpTopics?.map((val) => {
            const object = {
                slno: val.slno,
                em_id: val.em_id,
                em_name: val.em_name,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                question_count: val.question_count
            }
            return object;
        })
        setTabledata(displayData)
    }, [EmpTopics, setTabledata])

    const handleClickOpen = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setOpen(true);
        setUserdata(data);
    }, [setOpen, setUserdata]);

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'slno', filter: true, width: 100 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },
        {
            headerName: 'Action', cellRenderer: params =>
                <OpenIcon sx={{ paddingY: 0.5 }}
                    onClick={(e) => handleClickOpen(params)}
                >
                    <LaunchIcon color='primary' />
                </OpenIcon>
        }
    ])
    return (
        <CustomLayout title="Employee training Topic View List" displayClose={true} >
            <Box sx={{ width: "100%", p: 1, height: screenInnerHeight - 120 }}>
                {
                    open === true ? <QuestionPaper setOpen={setOpen} open={open} count={count} Setcount={Setcount} Userdata={Userdata} />
                        : <Paper variant='outlined' sx={{ mt: 1, display: 'flex', flexDirection: "column" }} >
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tabledata}
                                sx={{
                                    height: 800,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                }
            </Box>
        </CustomLayout >
    )
}

export default memo(EmployeeTrainingTopViewList)
