import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { endOfMonth, format } from 'date-fns'
import React, { memo, useCallback, useState } from 'react'
import ReportLayout from '../ReportComponent/ReportLayout'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'

const ManualReqstReport = () => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [tableData, setTableData] = useState([])

    const getManualRequestList = useCallback(async () => {
        const getData = {
            fromdate: format(new Date(fromDate), 'yyyy-MM-dd'),
            todate: format(new Date(toDate), 'yyyy-MM-dd')
        }
        const result = await axioslogin.post('/manualRequest/getdata', getData)
        const { success, data } = result.data
        if (success === 1) {
            const arr = data?.map((val) => {
                return {
                    ...val,
                    dutyDate: format(new Date(val.duty_date), 'dd-MM-yyyy')
                }
            })
            setTableData(arr)
        } else {
            warningNofity("There Is No Request Exist Between This Date")
        }

    }, [fromDate, toDate])

    const [column] = useState([
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name', minWidth: 250 },
        { headerName: 'Dept Section ', field: 'sect_name', minWidth: 250 },
        { headerName: 'Duty Day', field: 'dutyDate' },
        { headerName: 'Duty Description ', field: 'lvereq_desc' },
        { headerName: 'Remark ', field: 'remrk', minWidth: 250 },
    ])

    return (
        <ReportLayout title="Manual Attendnace Report" data={tableData} displayClose={true} >
            <Paper sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
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
                                maxDate={endOfMonth(new Date(fromDate))}
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
                    <Box sx={{ display: "flex", flex: 1, px: 0.3, pl: 5, gap: 2 }} >
                        <CssVarsProvider>
                            <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="success"
                                    onClick={getManualRequestList}
                                    size='sm'
                                    endDecorator={<Box>Search</Box>}
                                //disabled={addDateDisable}
                                >
                                    <ExitToAppOutlinedIcon fontSize='large' />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        p: 1, mt: 0.5,
                        display: 'flex',
                        backgroundColor: '#f0f3f5',
                        flexDirection: "column",
                    }} >
                    <CustomAgGridRptFormatOne
                        tableDataMain={tableData}
                        columnDefMain={column}
                    />
                </Paper>
            </Paper>
        </ReportLayout>
    )
}

export default memo(ManualReqstReport) 