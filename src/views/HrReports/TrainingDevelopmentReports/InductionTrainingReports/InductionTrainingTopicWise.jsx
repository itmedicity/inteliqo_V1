
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { InductionTrainingTopics } from 'src/redux/actions/Training.Action';
import ReportLayout from '../../ReportComponent/ReportLayout';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import InductionTopics from 'src/views/MuiComponents/JoyComponent/InductionTopics';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const InductionTrainingTopicWise = () => {

    const [TrainigDetails, setTrainigDetails] = useState([])
    const [topic, setTopic] = useState(0);
    const [selectedMonth, setselectedMonth] = useState('');

    const dispatch = useDispatch()

    useEffect(() => dispatch(InductionTrainingTopics()), [dispatch])

    const HandleMonth = useCallback(async (newValue) => {
        const date = new Date(newValue);
        if (isValid(date) && date !== null && date !== undefined) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setselectedMonth(formattedDate);
        } else {
            warningNofity("Selected Date is not valid");
        }
    }, []);

    const SearchingProcess = useCallback(async () => {
        if (topic !== 0) {
            const obj = {
                topic: topic
            };
            const result = await axioslogin.post(`/TrainingInductionReport/inductTrainingTopicWise`, obj);
            const { success, data } = result.data;
            if (success === 2 && data.length !== 0) {
                // Map through the data and format it
                const obj = data?.map((val) => ({
                    Slno: val.Slno,
                    training_topic_name: val.training_topic_name,
                    induction_date: val.induction_date,
                    date: format(new Date(val.induction_date), 'yyyy-MM-dd'),
                    trainer_name: val.trainer_name
                }));
                setTrainigDetails(obj);
                if (selectedMonth !== '') {
                    // Filter data based on the selected month
                    const monthwiseTraining = obj.filter(
                        (val) => format(new Date(val.date), 'MM') === format(new Date(selectedMonth), 'MM')
                    );
                    setTrainigDetails(monthwiseTraining);
                }
            } else {
                warningNofity("No Training Records Found");
            }
        } else {
            warningNofity("Select Any Topic For Search");
        }
    }, [selectedMonth, topic]);

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'Slno', filter: true, width: 350 },
        { headerName: 'Training Date', field: 'date', filter: true, width: 350 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 460 },
        { headerName: 'Trainer Name', field: 'trainer_name', filter: true, width: 450 }
    ])
    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Topic Wise Training Report" data={TrainigDetails} displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mt: 0.3, p: 1, display: "flex", flexDirection: "row", width: "100%" }}>

                        <Box sx={{ flex: 1, p: 0.5 }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Training Topic</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <InductionTopics topic={topic} setTopic={setTopic} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, p: 0.5 }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Select Month</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment} >
                                    <DatePicker
                                        views={['month']}
                                        inputFormat="DD-MM-YYYY"
                                        value={selectedMonth}
                                        onChange={(newValue) => {
                                            HandleMonth(newValue);
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
                                tableDataMain={TrainigDetails}
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

export default memo(InductionTrainingTopicWise) 
