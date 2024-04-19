import React, { memo, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, CssVarsProvider, Input, Radio, Table, Tooltip, Typography } from '@mui/joy'
import { Paper, TextField } from '@mui/material'
import { useState } from 'react';
import { addDays, differenceInCalendarDays, differenceInDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useSelector } from 'react-redux';
import { allLeavesConvertAnArray, findBalanceCommonLeveCount, getCaualLeaveDetl, getCommonSettings, getEmployeeInformationLimited, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { useMemo } from 'react';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import LeaveRequestTable from './Func/LeaveRequestTable';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CachedIcon from '@mui/icons-material/Cached';
import Textarea from '@mui/joy/Textarea';
import { useEffect } from 'react';

const HalfDayLeaveRequest = () => {
    const [fromDate, setFromDate] = useState(new Date())
    const [casualLve, setCasualLve] = useState([])
    const [halfDayStat, setHalfDayStat] = useState(0)
    const [creditedLve, setCreditedLve] = useState(0)

    const [selectedCL, setSelectedCL] = useState(0)
    const [reson, setReason] = useState('')

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_department, em_dept_section, hod, incharge } = selectedEmpInform;

    const getCasualLeaves = useSelector((state) => getCaualLeaveDetl(state));
    const casualLeave = useMemo(() => getCasualLeaves, [getCasualLeaves]);

    console.log(halfDayStat, creditedLve)

    const handleGetCreditedLeaves = useCallback(async () => {
        if (halfDayStat === null || creditedLve === null) {
            warningNofity("Select all the required fields for the request.")
        } else {
            if (casualLeave?.length > 0) {
                setCasualLve(casualLeave)
            } else {
                warningNofity("You have no leaves available for a half-day request.")
            }
        }
    }, [casualLeave, halfDayStat, creditedLve])

    //GET CASUAL LEAVES FUN
    const getCasualeaves = useCallback((e, val) => {
        setSelectedCL(val)
    }, [])


    //SUBMIT HALF DAY LEAVE REQUEST
    const handleSubmitHalfDayRequest = useCallback(async () => {
        //CHECK FOR ATTENDNCE MARKED OR NOT
        /** PUNCH MARKING HR START **/

        const postDataForAttendaceMark = {
            month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
            section: em_dept_section
        }

        const checkAttendanceMarking = await axioslogin.post('/attendCal/checkPunchMarkingHR', postDataForAttendaceMark);

        const { data: attMarkCheckData, success: attMarkCheckSuccess } = checkAttendanceMarking.data;
        const lastUpdateDate = attMarkCheckData[0]?.last_update_date;

        if (attMarkCheckSuccess === 2) {
            errorNofity("Error Checking Attendance Already Marked or Not ,Try Again !!")
        } else if (
            (attMarkCheckSuccess === 0 || attMarkCheckSuccess === 1) &&
            (attMarkCheckSuccess === 1 && isValid(new Date(lastUpdateDate)) &&
                new Date(lastUpdateDate) < new Date(fromDate))) {

            //GET DEPARTMENT WISE SHIFT INFOMATION




        }

    }, [selectedCL, reson, fromDate, em_dept_section])

    return (
        <Box sx={{ mb: 0.5 }}>
            <Paper variant="outlined" sx={{ mt: 0.5 }} >
                <Box sx={{ display: 'flex', flexDirection: { xl: 'row', lg: 'column', md: 'column', sm: 'column', xs: 'column' }, p: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, mb: { xl: 0, lg: 1 } }}>
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    minDate={startOfMonth(new Date())}
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

                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={(e, val) => setHalfDayStat(val)}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Select Half Day Section"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={1}>Shift First Half</Option>
                                <Option value={2}>Shift Second Half</Option>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={(e, val) => setCreditedLve(val)}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Allowed Leave Types"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={1}>Casual Leave</Option>
                            </Select>
                        </Box>
                        <Box sx={{ px: 0.3 }} >
                            <CssVarsProvider>
                                <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="success"
                                        onClick={handleGetCreditedLeaves}
                                        size='sm'
                                        sx={{ width: '100%' }}
                                        endDecorator={<Box>Get Credited Leaves</Box>}
                                    // disabled={addDateDisable}
                                    >
                                        <ExitToAppOutlinedIcon fontSize='large' />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', px: { xl: 0, lg: 20 } }} >
                        <Box sx={{ flex: 1, px: 0.3 }} >
                            <Select
                                defaultValue={0}
                                onChange={getCasualeaves}
                                sx={{ width: '100%' }}
                                // value={deptID}
                                size='sm'
                                // disabled={disabled}
                                placeholder="Casual Leaves"
                                slotProps={{
                                    listbox: {
                                        placement: 'bottom-start',
                                    },
                                }}
                            >
                                <Option value={0}>Casual Leave</Option>
                                {
                                    casualLve?.map((e) => <Option key={e.slno} value={e.slno}>{e.month}</Option>)
                                }
                            </Select>
                        </Box>

                        <Box sx={{ flex: 1, px: 0.3 }}  >
                            <CssVarsProvider>
                                <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color='danger'
                                        onClick={handleSubmitHalfDayRequest}
                                        size='sm'
                                        sx={{ width: '100%' }}
                                        endDecorator={<Box>Save</Box>}
                                    // disabled={addDateDisable}
                                    >
                                        <ExitToAppOutlinedIcon fontSize='large' />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Paper variant="outlined" sx={{ display: 'none' }} >

                </Paper>
                <Box sx={{ p: 1 }} >
                    <Textarea
                        color="primary"
                        minRows={2}
                        defaultValue=''
                        placeholder="Leave Request Reason ..."
                        size="sm"
                        variant="outlined"
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(HalfDayLeaveRequest) 