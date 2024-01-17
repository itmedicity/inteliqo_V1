import React, { memo, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { lastDayOfMonth } from 'date-fns/esm'
import { CssVarsProvider, Button, Input, Tooltip } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import { ToastContainer } from 'react-toastify'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const AttendanceMainCard = ({ setfromdate, setTodate, setdept, setDeptsec, getData, saveData, downloadFormat }) => {

    const redispatch = useDispatch()
    const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'))
    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)

    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))

    useEffect(() => {
        redispatch(setDepartment());
    }, [redispatch])

    useEffect(() => {
        if (deptName !== 0 && deptSecName !== 0) {
            setfromdate(fromDate);
            setTodate(toDate);
            setdept(deptName);
            setDeptsec(deptSecName);
        }
    }, [fromDate, setfromdate, setTodate, setdept, setDeptsec, deptName, deptSecName, toDate])

    // const downloadFormat = useCallback(() => {

    // }, [])


    return (
        <Paper
            square
            variant="outlined"
            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
        >
            <ToastContainer />
            {/* <CustomBackDrop open={open} text="Please Wait" /> */}
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            // maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) =>
                                setFromDate(moment(date).format('YYYY-MM-DD'))
                                // dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <CssVarsProvider>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    </CssVarsProvider>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            minDate={moment(fromDate)}
                            maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={toDate}
                            onChange={(date) =>
                                setToDate(moment(date).format('YYYY-MM-DD'))
                                // dispatch({ type: TO_DATE, to: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <CssVarsProvider>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    </CssVarsProvider>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                    <DepartmentDropRedx getDept={setDepartmentName} />
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                    <DepartmentSectionRedx getSection={setDepartSecName} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                <CssVarsProvider>
                    <Box sx={{ p: 0.2 }} >
                        <Button aria-label="Like" variant="outlined" color="primary" onClick={getData} sx={{
                            color: '#90caf9'
                        }} >
                            <PublishedWithChangesIcon />
                        </Button>
                    </Box>
                    <Tooltip title="Save" followCursor placement='top' arrow >
                        <Box sx={{ p: 0.2 }}>
                            <Button aria-label="Like" variant="outlined" color="success" onClick={saveData} sx={{
                                color: '#65B741'
                            }}>
                                <SaveIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Download Excel" followCursor placement='top' arrow >
                        <Box sx={{ p: 0.2 }}>
                            <Button aria-label="Like" variant="outlined" color="neutral"
                                onClick={downloadFormat}
                                sx={{ color: '#90caf9' }} >
                                <FileDownloadIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default memo(AttendanceMainCard)