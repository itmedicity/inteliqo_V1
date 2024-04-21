import { Paper } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, CssVarsProvider, Input, Option, Select, Skeleton, Tooltip } from '@mui/joy';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { getDepartmentShiftDetails } from '../LeavereRequsition/Func/LeaveFunction';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, addHours, differenceInMinutes, differenceInHours, format, subHours } from 'date-fns'

const OffSubmitForm = ({ employeeData }) => {

    const empData = useMemo(() => employeeData, [employeeData])

    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [offType, setOffType] = useState(0)
    const [disShift, setDisShift] = useState(false)
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)
    const [punchSlno, setPunchSlno] = useState(0)

    const [shiftTiming, setShiftTiming] = useState([])
    const [punchDetl, setPunchDetl] = useState([])
    const [disableCheck, setDisableCheck] = useState(true)
    const [selectedShiftTiming, setselectedShiftTiming] = useState({})
    const [reason, setReason] = useState('')

    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { salary_above, week_off_day, comp_hour_count } = commonStates;

    const getEmployeeInformation = useSelector((state) => state?.getEmployeeInformationState?.empData);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    console.log(selectedEmployeeDetl);
    const { em_no, em_id, gross_salary, em_department, em_dept_section, hod: empHodStat } = selectedEmployeeDetl?.[0];



    useEffect(() => {
        getDepartmentShiftDetails(empData).then((values) => {
            const { status, deptShift, shiftTime } = values;
            if (status === 1) {
                setDeptShift(deptShift);
                setShiftTiming(shiftTime)
                setDisShift(false)
            } else {
                setDeptShift([]);
                setShiftTiming([])
            }
        })

    }, [empData])


    const handleChangefetchShift = useCallback(async () => {
        setDisableCheck(false)
        if (offType === 2 && selectedShift !== 0) {
            //GET SHIFT DATA 
            const postData = {
                emp_id: empData?.emID,
                duty_day: moment(fromDate).format('YYYY-MM-DD')
            }

            const result = await axioslogin.post('common/getShiftdetails/', postData);
            const { success, data, message } = result.data;
            if (success === 1) {
                const { ot_request_flag, punch_slno, holiday_slno, shift_id } = data[0];
                setPunchSlno(punch_slno)
                const selectedShiftTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time, shft_cross_day } = selectedShiftTiming[0]

                const inTime = moment(shft_chkin_time).format('HH:mm:ss');
                const outTime = moment(shft_chkout_time).format('HH:mm:ss');

                const selecteShiftData = {
                    inCheck: shft_chkin_time,
                    outCheck: shft_chkout_time
                }
                setselectedShiftTiming(selecteShiftData);

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                const chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;

                if (ot_request_flag === 1) {
                    warningNofity('Selected Date Already Raised A COFF Request')
                    setDisableCheck(true)
                }
                else if (holiday_slno !== 0 && gross_salary < salary_above) {
                    warningNofity('Cannot Apply for Compensatory Off Request!')
                    setDisableCheck(false)
                }
                else if (shift_id !== week_off_day && holiday_slno === 0) {
                    warningNofity("Can't Apply for Compensatory Off, Shift Must be Week Off")
                    setDisableCheck(false)
                }
                else {
                    //TO FETCH PUNCH DATA FROM TABLE
                    const postDataForpunchMaster = {
                        date1: shft_cross_day === 0 ? format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(addHours(new Date(addDays(new Date(fromDate), 1)), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                        date2: shft_cross_day === 0 ? format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(subHours(new Date(fromDate), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                        em_no: em_no
                    }

                    //FETCH THE PUNCH TIME FROM PUNCH DATA
                    const result = await axioslogin.post('common/getShiftdata/', postDataForpunchMaster)
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPunchDetl(data)
                        succesNofity('Done , Select The Punching Info')
                    } else if (success === 0) {
                        //no record
                        warningNofity('Punching Data Not Found')
                        setDisableCheck(true)
                    } else {
                        // error
                        errorNofity(message)
                        setDisableCheck(true)
                    }
                }
            } else {
                warningNofity('Duty Plan Not Done')
            }

        } else {
            warningNofity('Select The Off Type and Shift Feild')
        }
    }, [fromDate, offType, selectedShift, empData, em_no, shiftTiming, gross_salary, salary_above,
        week_off_day, comp_hour_count])


    return (
        <Paper variant='oulined' sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['day']}
                        value={fromDate}
                        size="small"
                        onChange={(newValue) => {
                            setFromDate(newValue);
                        }}
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
            <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                <Select
                    value={offType}
                    onChange={(event, newValue) => {
                        setOffType(newValue);
                    }}
                    size='md'
                    variant='outlined'
                >

                    <Option value={0} disabled>Select Request Type</Option>
                    {/* <Option value="1">Covert Over Time To COFF</Option> */}
                    <Option value="2">Compansatory Off Day</Option>
                </Select>
            </Box>
            <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                <Select
                    value={selectedShift}
                    onChange={(event, newValue) => {
                        setSelectedShift(newValue);
                    }}
                    size='md'
                    variant='outlined'
                >
                    <Option disabled value={0}>Select Shift</Option>
                    {
                        deptShift?.map((val) => {
                            return <Option key={val.shiftcode} value={val.shiftcode}>{val.shiftDescription}</Option>
                        })
                    }
                </Select>
            </Box>
            <Box sx={{ px: 0.5, mt: 0.5 }}>
                <CssVarsProvider>
                    <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="success"
                            onClick={handleChangefetchShift}
                            size='sm'
                            sx={{ width: '100%' }}
                            endDecorator={<Box>Show Punch Data</Box>}
                        >
                            <ExitToAppOutlinedIcon fontSize='large' />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default OffSubmitForm