import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import ReportLayout from '../../ReportComponent/ReportLayout'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import JoyTrainingSubtype from 'src/views/MuiComponents/JoyTrainingSubtype';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';

const IductPendingList = () => {

    const [flag, SetFlag] = useState(0);

    //new
    const [subtype, SetSubType] = useState(0);
    const [PendingList, SetPendingList] = useState([]);

    const [Fromdate, setFromdate] = useState('');
    const [Todate, setTodate] = useState('');

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
            Todate: Todate,
            typeId: subtype
        };

        if (Fromdate !== '' && Todate !== '') {

            const result = await axioslogin.post(`/TrainingInductionReport/inductPendingList`, obj);
            const { success, data } = result.data;
            if (success === 2 && data.length !== 0) {
                const obj = data?.map((val, ndx) => ({
                    serialno: ndx + 1,
                    indct_emp_no: val.indct_emp_no,
                    induct_detail_date: val.induct_detail_date,
                    date: format(new Date(val.induct_detail_date), 'dd-MM-yyyy'),
                    em_name: val.em_name,
                    dept_name: val.dept_name,
                    training_topic_name: val.training_topic_name,
                    pretest_status: val.pretest_status,
                    posttest_status: val.posttest_status,
                    em_no: val.em_no,
                    subtype_no: val.subtype_no,
                    subtype_count: val.subtype_count,
                    topic_pre_status: val.topic_pre_status,
                    topic_post_status: val.topic_post_status,
                    topic_offline_status: val.topic_offline_status,
                    topic_online_status: val.topic_online_status,
                    training_status: val.training_status,
                    online_mode: val.online_mode,
                    offline_mode: val.offline_mode,
                    retest: val.retest,
                    training_iduct_tnd_verify_status: val.training_iduct_tnd_verify_status,
                    sect_name: val.sect_name
                }));
                // const employees = obj?.filter(val =>
                //     val.topic_pre_status === 1 &&
                //     val.topic_post_status === 1 &&
                //     val.topic_offline_status === 1 &&
                //     val.training_status === 1 &&
                //     val.pretest_status === 1 &&
                //     val.posttest_status === 1 &&
                //     val.offline_mode === 1
                // );
                SetPendingList(obj);
                SetFlag(1);
            } else {
                warningNofity("No Employee Records Found For The Selected Period");
                // setCompleteList([]);
            }

        } else {
            setFromdate('');
            setTodate('');
            warningNofity("Enter both 'From' and 'To' dates to initiate the search");
        }
    }, [Fromdate, Todate, SetFlag, subtype]);

    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'serialno', filter: true, width: 150 },
        { headerName: 'Training Date', field: 'date', filter: true, width: 250 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 250 },
        { headerName: 'Emp Name', field: 'em_name', filter: true, width: 350 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 300 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 300 },
    ])

    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Training Pending Reports" data={PendingList} displayClose={true} >
                <Box sx={{ width: "100%" }}>
                    <ToastContainer />
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
                        <Box sx={{ flex: 1, px: 1 }} >
                            <Typography sx={{ fontWeight: "bold" }}>Select Type</Typography>
                            <JoyTrainingSubtype value={subtype} setValue={SetSubType} />
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
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ height: 600, display: 'flex', flexDirection: "column" }}>
                            <CustomAgGridRptFormatOne
                                tableDataMain={PendingList}
                                columnDefMain={columnDef}
                                sx={{
                                    height: 450,
                                    width: "100%",
                                    // mt: 1,
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

export default memo(IductPendingList) 
