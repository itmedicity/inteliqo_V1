import { Box, CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import ReportLayout from '../ReportComponent/ReportLayout'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { endOfMonth, endOfYear, format, isValid, startOfYear } from 'date-fns'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const YearlyLeaveCount = () => {
    const [toDate, setToDate] = useState(new Date());
    const [tableData, setTableData] = useState([])


    const [columnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', autoHeight: true, filter: true },
        { headerName: 'Name', field: 'em_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 310 },
        { headerName: 'Section', field: 'sect_name', wrapText: true, minWidth: 310 },
        { headerName: 'Credited  CL', field: 'Clcredit', wrapText: true, minWidth: 310 },
        { headerName: 'Taken CL', field: 'takenCL', wrapText: true, minWidth: 310 },
        { headerName: 'Balance CL', field: 'BalanceCL', wrapText: true, minWidth: 310 },
        { headerName: 'Credited  EL', field: 'ELcredit', wrapText: true, minWidth: 310 },
        { headerName: 'Taken EL', field: 'takenEl', wrapText: true, minWidth: 310 },
        { headerName: 'Balance EL', field: 'BalanceEL', wrapText: true, minWidth: 310 },
        { headerName: 'Credited  SL', field: 'SLcredit', wrapText: true, minWidth: 310 },
        { headerName: 'Taken SL', field: 'takenSL', wrapText: true, minWidth: 310 },
        { headerName: 'Balance SL', field: 'BalanceSL', wrapText: true, minWidth: 310 },
    ])

    const getEmployeeList = useCallback(async () => {
        if (isValid(new Date(toDate))) {
            const postData = {
                fromDate1: format(startOfYear(new Date(toDate)), 'yyyy-MM-dd 00:00:00'),
                toDate1: format(endOfYear(new Date(toDate)), 'yyyy-MM-dd 23:59:59'),
                currentyear: format(new Date(toDate), 'yyyy-MM-dd '),
            }
            const result = await axioslogin.post('/yearleaveprocess/getYearlyLeaveCount', postData);
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
                warningNofity("There Is No Data To Display")
            }
        } else {
            warningNofity("Please Select A Valid Date!")
        }
    }, [toDate])

    return (
        <ReportLayout title="Previous Year Leave Count Report" displayClose={true} data={tableData} >
            <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Select Month</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                inputFormat="dd-MM-yyyy"
                                maxDate={new Date()}
                                value={endOfMonth(new Date(toDate))}
                                size="small"
                                onChange={(newValue) => setToDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ px: 0.2 }}>
                        <IconButton variant="outlined" size='md' color="primary"
                            onClick={getEmployeeList}
                        >
                            <PublishedWithChangesIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                    <CustomAgGridRptFormatOne
                        tableDataMain={tableData}
                        columnDefMain={columnDef}
                    />
                </Paper>

            </Paper>
        </ReportLayout>
    )
}

export default memo(YearlyLeaveCount) 