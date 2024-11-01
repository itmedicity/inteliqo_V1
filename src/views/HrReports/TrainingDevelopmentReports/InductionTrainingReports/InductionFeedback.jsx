
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { InductionTrainingTopics } from 'src/redux/actions/Training.Action';
import ReportLayout from '../../ReportComponent/ReportLayout';
import InductionTopics from 'src/views/MuiComponents/JoyComponent/InductionTopics';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';


const InductionFeedback = () => {

    const [Fromdate, setFromdate] = useState('');
    const [Todate, setTodate] = useState('');
    const [topic, setTopic] = useState(0)
    const [EmpDetails, setEmpDetails] = useState([])

    const dispatch = useDispatch()

    useEffect(() => dispatch(InductionTrainingTopics()), [dispatch])

    const HandleFromDate = useCallback(async (newValue) => {
        const date = new Date(newValue);
        if (isValid(date) && date !== null && date !== undefined) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setFromdate(formattedDate);
        } else {
            warningNofity("Selected Date is not valid");
        }
    }, []);

    const HandleToDate = useCallback(async (newValue) => {
        const date = new Date(newValue);
        if (isValid(date) && date !== null && date !== undefined) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setTodate(formattedDate);
        } else {
            warningNofity("Selected Date is not valid");
        }
    }, []);

    const SearchingProcess = useCallback(async () => {
        const obj = {
            Fromdate: Fromdate,
            Todate: Todate
        }
        if (Fromdate !== '' && Todate !== '' && topic === 0) {
            const result = await axioslogin.post(`/TrainingInductionReport/inductionReTestEmpList`, obj)
            const { success, data } = result.data;
            if (success === 2 && data?.length !== 0) {

                const obj = data?.map((val, ndx) => {
                    return {
                        serialno: ndx + 1,
                        indct_emp_no: val.indct_emp_no,
                        em_no: val.em_no,
                        induct_detail_date: val.induct_detail_date,
                        date: format(new Date(val.induct_detail_date), 'dd-MM-yyyy'),
                        em_name: val.em_name,
                        dept_name: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        pretest_mark: val.pre_mark !== null ? val.pre_mark : "Not Updated",
                        posttest_mark: val.post_mark !== null ? val.post_mark : "Not Updated",
                        schedule_topic: val.schedule_topic,
                        trainers_name: val.trainers_name
                    }
                })
                setEmpDetails(obj);
            }
            else {
                warningNofity("No Employee Records Found For The Selected Period")
                setEmpDetails([])
            }
        }
        else if (Fromdate !== '' && Todate !== '' && topic !== 0) {
            const result = await axioslogin.post(`/TrainingInductionReport/inductionReTestEmpList`, obj)
            const { success, data } = result.data;
            if (success === 2 && data?.length !== 0) {
                const obj = data?.map((val, ndx) => {
                    return {
                        serialno: ndx + 1,
                        indct_emp_no: val.indct_emp_no,
                        em_no: val.em_no,
                        induct_detail_date: val.induct_detail_date,
                        date: format(new Date(val.induct_detail_date), 'dd-MM-yyyy'),
                        em_name: val.em_name,
                        dept_name: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        pretest_mark: val.pre_mark !== null ? val.pre_mark : "Not Updated",
                        posttest_mark: val.post_mark !== null ? val.post_mark : "Not Updated",
                        schedule_topic: val.schedule_topic,
                        trainers_name: val.trainers_name
                    }
                })
                const topicwise = obj?.filter((val) => val.schedule_topic === topic)
                setEmpDetails(topicwise);
            }
            else {
                warningNofity("No Employee Records Found For The Selected Period")
                setEmpDetails([])
            }
        }
        else {
            setFromdate('')
            setTodate('')
            warningNofity("Enter both 'From' and 'To' dates to initiate the search")
        }
    }, [Fromdate, Todate, setEmpDetails, topic])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'serialno', filter: true, width: 150 },
        { headerName: 'Date', field: 'date', filter: true, width: 250 },
        { headerName: 'Em ID', field: 'em_no', filter: true, width: 250 },
        { headerName: 'Emp Name', field: 'em_name', filter: true, width: 350 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 350 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 350 },
        { headerName: 'Trainer Names', field: 'trainers_name', filter: true, width: 350 },
        { headerName: 'Pre-Test Mark', field: 'pretest_mark', filter: true, width: 200 },
        { headerName: 'Post-Test Mark', field: 'posttest_mark', filter: true, width: 200 },
    ])
    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Feedback Reports" data={[]} displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mt: 0.3, p: 1, display: "flex", flexDirection: "row" }}>
                        <Box sx={{ flex: 1, px: 1 }} >
                            <Typography sx={{ fontWeight: "bold" }}>From Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"
                                    value={Fromdate}
                                    onChange={(newValue) => {
                                        HandleFromDate(newValue);
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
                        <Box sx={{ flex: 1, px: 1 }} >
                            <Typography sx={{ fontWeight: "bold" }}>To Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"
                                    value={Todate}
                                    onChange={(newValue) => {
                                        HandleToDate(newValue);
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
                        <Typography sx={{ fontWeight: "bold" }}>Topic</Typography>
                        <Box sx={{ flex: 1, mt: 3, px: 0.3, }} >
                            <InductionTopics topic={topic} setTopic={setTopic} />
                        </Box>

                        <Box sx={{ flex: 1, mt: 3 }}>
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
                                tableDataMain={EmpDetails}
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
export default memo(InductionFeedback) 
