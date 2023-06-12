import { Button, CssVarsProvider, Input } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import moment from 'moment';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { AttendanceViewFun } from './Functions';
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action';
import _ from 'underscore';


const EmployeeCmpnt = React.lazy(() => import('./EmployeeCompnt'));
const AttendanceView = () => {

    const [empFlag, setEmpFlag] = useState(0)
    const [value, setValue] = useState(moment(new Date()));
    const [mainArray, setMainArray] = useState([])
    const reduxDispatch = useDispatch()
    //login employee details
    const empData = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0];
    })

    const { hod, incharge, em_id, em_no } = empData

    useEffect(() => {
        //get holiday current
        reduxDispatch(getHolidayList());
    }, [])
    // get holiday 
    const holiday = useSelector((state) => state.getHolidayList, _.isEqual);
    const holidayList = useMemo(() => holiday, [holiday]);

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            setEmpFlag(1)
        } else {
            setEmpFlag(0)
        }
    }, [hod, incharge])

    const getData = async () => {
        if (empFlag === 1) {
            const postdata = {
                em_no: em_no,
                from: moment(startOfMonth(value)).format('YYYY-MM-DD'),
                to: moment(endOfMonth(value)).format('YYYY-MM-DD')
            }
            const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
            const { success, data } = result.data
            if (success === 1) {
                let punchData = data;
                AttendanceViewFun(value, punchData, holidayList).then((values) => {
                    setMainArray(values)
                })
            } else {
                setMainArray([])
                infoNofity("No Punch Details")
            }
        } else {
            // console.log("hod");
        }
    }


    return (
        <CustomLayout title="Attendance View" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper
                    square
                    variant="outlined"
                    sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
                >
                    <ToastContainer />
                    {/* <CustomBackDrop open={open} text="Please Wait" /> */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
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
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Box sx={{ p: 0.2 }} >
                                <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                    color: '#90caf9'
                                }} >
                                    <PublishedWithChangesIcon />
                                </Button>
                            </Box>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} ></Box>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }} ></Box>
                </Paper>
                <EmployeeCmpnt mainArray={mainArray} />
            </Box>
        </CustomLayout >
    )
}

export default AttendanceView