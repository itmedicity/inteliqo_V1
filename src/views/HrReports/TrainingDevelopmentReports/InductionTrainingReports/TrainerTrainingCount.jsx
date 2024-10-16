
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Option, Select, Tooltip, Typography } from '@mui/joy'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { InductionTrainingTopics } from 'src/redux/actions/Training.Action';
import ReportLayout from '../../ReportComponent/ReportLayout';
import JoyTrainerSingleSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainerSingleSelect';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';


const TrainerTrainingCount = () => {

    const [TrainerDetails, setTrainerDetails] = useState([])
    const [trainer, setTrainer] = useState(0)
    const [type, SetType] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => dispatch(InductionTrainingTopics()), [dispatch])

    const SearchingProcess = useCallback(async () => {
        if (parseInt(trainer) !== 0 && parseInt(type) !== 0) {
            if (parseInt(type) === 1) {
                const result = await axioslogin.get(`/TrainingInductionReport/TrainerTrainingInductDatas/${trainer}`)
                const { success, data } = result.data;
                if (success === 2 && data?.length !== 0) {
                    const obj = data?.map((val) => {
                        return {
                            serialno: val.Slno,
                            schedule_topic: val.schedule_topic,
                            induction_date: val.induction_date,
                            date: format(new Date(val.induction_date), 'dd-MM-yyyy'),
                            trainers: val.trainers,
                            trainer_name: val.trainer_name,
                            topic_slno: val.topic_slno,
                            training_topic_name: val.training_topic_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            em_no: val.em_no
                        }
                    })
                    setTrainerDetails(obj);
                }
                else {
                    warningNofity("No Employee Records Found")
                    setTrainerDetails([])
                }
            }
            else if (parseInt(type) === 2) {
                const result = await axioslogin.get(`/TrainingInductionReport/TrainerTrainingDeptDatas/${trainer}`)
                const { success, data } = result.data;
                if (success === 2 && data?.length !== 0) {
                    const obj = data?.map((val) => {
                        return {
                            serialno: val.Slno,
                            schedule_topic: val.schedule_topic,
                            schedule_date: val.schedule_date,
                            date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                            trainers: val.trainers,
                            trainer_name: val.trainer_name,
                            topic_slno: val.topic_slno,
                            training_topic_name: val.training_topic_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            em_no: val.em_no
                        }
                    })
                    setTrainerDetails(obj);
                }
                else {
                    warningNofity("No Employee Records Found")
                    setTrainerDetails([])
                }
            }
        } else {
            warningNofity("Select Trainer Name and Training Type")
        }
    }, [trainer, type])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'serialno', filter: true, width: 150 },
        { headerName: 'Em ID', field: 'em_no', filter: true, width: 250 },
        { headerName: 'Emp Name', field: 'trainer_name', filter: true, width: 250 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 350 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 350 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 400 },
        { headerName: 'Date', field: 'date', filter: true, width: 250 },


    ])
    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Trainers Report" data={TrainerDetails} displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mt: 0.3, p: 1, display: "flex", flexDirection: "row", width: "100%" }}>
                        <Box sx={{ flex: 1, p: 0.5 }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Trainer</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyTrainerSingleSelect setTrainer={setTrainer} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, p: 0.5 }}>

                            {/* <Tooltip title="Select Training Type"> */}
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Training Type</Typography>
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <Select
                                    value={type}
                                    onChange={(event, newValue) => {
                                        SetType(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0}>Select Tarining Type</Option>
                                    <Option value="1">Induction</Option>
                                    <Option value="2">Departmental</Option>
                                </Select>
                            </Box>

                            {/* </Tooltip> */}
                            {/* <Box sx={{ flex: 1 }}>
                                <InductionTopics topic={topic} setTopic={setTopic} />
                            </Box> */}
                        </Box>
                        <Box sx={{ p: 0.5, mt: 3 }}>
                            <CssVarsProvider>
                                <Tooltip title="Search Employees">
                                    <IconButton variant="outlined" size='sm' color="primary"
                                        onClick={SearchingProcess}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", overflow: 'auto' }}>
                        <Paper sx={{ height: 700, display: 'flex', flexDirection: "column" }}>
                            <CustomAgGridRptFormatOne
                                tableDataMain={TrainerDetails}
                                columnDefMain={columnDef}
                                sx={{
                                    height: 600,
                                    width: "100%",
                                    mt: 1
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                    </Box>
                </Box>
            </ReportLayout>
        </Paper>
    )
}
export default memo(TrainerTrainingCount) 
