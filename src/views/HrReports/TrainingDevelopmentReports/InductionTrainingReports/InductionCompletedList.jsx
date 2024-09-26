import React, { memo, useCallback, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';

const InductionCompletedList = ({ setCompleteList, CompleteList, SetFlag }) => {

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
            Todate: Todate
        }
        if (Fromdate !== '' && Todate !== '') {
            const result = await axioslogin.post(`/TrainingInductionReport/inductionCompletedList`, obj)
            const { success, data } = result.data;
            if (success === 2) {
                SetFlag(1)
                const obj = data?.map((val, ndx) => {
                    return {
                        serialno: ndx + 1,
                        indct_emp_no: val.indct_emp_no,
                        induct_detail_date: val.induct_detail_date,
                        date: format(new Date(val.induct_detail_date), 'dd-MM-yyyy'),
                        em_name: val.em_name,
                        dept_name: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        pretest_status: val.pretest_status === 1 ? "Attented" : "Not Attented",
                        posttest_status: val.posttest_status === 1 ? "Attented" : "Not Attented",
                        em_no: val.em_no
                    }
                })
                setCompleteList(obj);
            }
            else {
                warningNofity("No Employee Records Found For The Selected Period")
                setCompleteList([])
            }
        }
        else {
            setFromdate('')
            setTodate('')
            warningNofity("Enter both 'From' and 'To' dates to initiate the search")
        }
    }, [Fromdate, Todate, setCompleteList, SetFlag])

    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'serialno', filter: true, width: 150 },
        { headerName: 'Date', field: 'date', filter: true, width: 250 },
        { headerName: 'Em ID', field: 'em_no', filter: true, width: 250 },
        { headerName: 'Emp Name', field: 'em_name', filter: true, width: 350 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 350 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 350 },
        { headerName: 'Pre_Test', field: 'pretest_status', filter: true, width: 200 },
        { headerName: 'Post-Test', field: 'posttest_status', filter: true, width: 200 },
    ])
    return (
        <Paper>
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
                <Paper sx={{ height: 800, display: 'flex', flexDirection: "column" }}>
                    {/* <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={CompleteList}
                        sx={{
                            height: 700,
                            width: "100%",
                            mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    /> */}
                    <CustomAgGridRptFormatOne
                        tableDataMain={CompleteList}
                        columnDefMain={columnDef}
                        sx={{
                            height: 700,
                            width: "100%",
                            mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </Paper>
    )
}

export default memo(InductionCompletedList) 
