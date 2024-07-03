import { Box, CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import ReportLayout from '../ReportComponent/ReportLayout'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { format, isValid } from 'date-fns'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const OndutyReport = () => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [tableData, setTableData] = useState([])


    const [columnDef] = useState([
        { headerName: 'On Duty Date', field: 'on_duty_date', minWidth: 200, filter: true },
        { headerName: 'Emp ID', field: 'em_no', autoHeight: true, filter: true },
        { headerName: 'Name', field: 'em_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 310 },
        { headerName: 'Section', field: 'sect_name', wrapText: true, minWidth: 310 },
        { headerName: 'Reason', field: 'onduty_reason', wrapText: true, minWidth: 310 },
        { headerName: 'Status', field: 'status', wrapText: true, minWidth: 310 },

    ])

    const getEmployeeList = useCallback(async () => {
        if (isValid(new Date(fromDate)) && isValid(new Date(toDate))) {
            const postData = {
                fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
                toDate: format(new Date(toDate), 'yyyy-MM-dd'),
            }
            const result1 = await axioslogin.post("/CommonReqst/onduty/list", postData);
            const { success, data } = result1.data
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        on_duty_date: format(new Date(val.on_duty_date), 'dd-MM-yyyy')
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        } else {
            warningNofity("Please Select A Valid Date!")
        }

    }, [fromDate, toDate])

    return (
        <ReportLayout title="Employee On Duty Report" displayClose={true} data={tableData} >
            <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                //minDate={startOfMonth(new Date())}
                                inputFormat="dd-MM-yyyy"
                                value={fromDate}
                                size="small"
                                onChange={(newValue) => setFromDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' variant='outlined' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                inputFormat="dd-MM-yyyy"
                                // maxDate={endOfMonth(new Date(fromDate))}
                                value={toDate}
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

export default memo(OndutyReport) 