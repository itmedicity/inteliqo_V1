import React, { Fragment, useEffect, useState, memo, useCallback } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, CssVarsProvider } from '@mui/joy';
import Input from '@mui/joy/Input';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { addDays, addMonths, format, getMonth, getYear, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import { getAndUpdatePunchingData } from '../ShiftUpdation/Function';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { Actiontypes } from 'src/redux/constants/action.type';

const PunchMarkingHR = () => {
    const { FETCH_PUNCH_DATA, FETCH_SHIFT_DATA } = Actiontypes;
    const dispatch = useDispatch();

    const [openBkDrop, setOpenBkDrop] = useState(false)
    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);


    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [])

    //EMPLOYEE INFOR BASED ON SELECTED DEPT & SECTION
    const empInform = useSelector((state) => state.getEmployeeBasedSection.emp);
    const [msg, setmsg] = useState(0)

    const handleOnClickFuntion = useCallback(async () => {
        if (dept !== 0 && section !== 0 && empInform.length !== 0) {
            setOpenBkDrop(true)
            const selectedDate = moment(value).format('YYYY-MM-DD');

            empInform && empInform.map((val) => {
                const postdata = {
                    em_no: val.em_no,
                    attendance_marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
                }
                const attendMarkCheck = async (postdata) => {
                    //To Check attendance Proess Done
                    const dataExist = await axioslogin.post("/attendCal/checkAttendanceProcess/", postdata);
                    const { success } = dataExist.data
                    if (success === 1) {
                        setmsg(3)
                        setOpenBkDrop(false)
                    }
                    //If Not done 
                    else {
                        const emply = { em_no: val.em_no }
                        const postData = {
                            fromDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            preFromDate: format(subDays(startOfMonth(new Date(value)), 1), 'yyyy-MM-dd 00:00:00'),
                            toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            preToDate: format(addDays(lastDayOfMonth(new Date(value)), 1), 'yyyy-MM-dd 23:59:59'),
                            dept: dept,
                            section: section,
                            empId: emply
                        }

                        //Get Emp salary and common late in and early out
                        const resultdel = await axioslogin.get(`/common/getgrossSalary/${val.em_id}`);
                        const { dataa } = resultdel.data
                        const { gross_salary } = dataa[0]

                        const gracePeriod = await axioslogin.get('/commonsettings')
                        const { data } = gracePeriod.data
                        const { cmmn_late_in_grace, cmmn_early_out_grace } = data[0]

                        const SelectMonth = getMonth(new Date(selectedDate))
                        const SelectYear = getYear(new Date(selectedDate))

                        const getHolidayPost = {
                            month: SelectMonth + 1,
                            year: SelectYear
                        }
                        //Get Holiday lIst
                        const holiday_data = await axioslogin.post("/attendCal/getHolidayDate/", getHolidayPost);
                        const { holidaydata } = holiday_data.data;

                        //Function for punch master updation. Based on duty plan and punch details in punch data 

                        const result = await getAndUpdatePunchingData(postData, holidaydata, cmmn_late_in_grace, cmmn_early_out_grace,
                            gross_salary, empInform, dispatch)

                        if (result !== undefined) {

                            const { status, message, shift, punch_data } = result;
                            if (status === 1) {
                                dispatch({ type: FETCH_PUNCH_DATA, payload: punch_data })
                                dispatch({ type: FETCH_SHIFT_DATA, payload: shift })
                                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
                                const { success, planData } = punch_master_data.data;

                                if (success === 1) {
                                    const dutyLock = empInform && empInform.map((val, index) => {
                                        const obje = {
                                            em_no: val.em_no,
                                            from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                            to: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd')
                                        }
                                        return obje
                                    })
                                    // After HR Punch in/Out marked then employee or incharge/Hod 
                                    // canot do punch in out mark
                                    const result1 = await axioslogin.patch("/payrollprocess/dutyPlanLock", dutyLock)

                                    const { success } = result1.data
                                    if (success === 1) {
                                        setOpenBkDrop(false)
                                        setmsg(2)
                                        changeDept(0)
                                        changeSection(0)
                                        return { status: 2 }
                                    }
                                }
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                                changeDept(0)
                                changeSection(0)
                            }
                        }
                        else {
                            setOpenBkDrop(false)
                            setmsg(1)
                            changeDept(0)
                            changeSection(0)
                        }
                    }
                }
                attendMarkCheck(postdata)
            })
        }
        else {
            warningNofity("Please Select Depatment And Department section")
        }
    })

    useEffect(() => {

        if (msg === 1) {
            errorNofity("Duty Doesnot Planed, Please do Duty Plan")
        } else if (msg === 2) {
            succesNofity("Punch Updated Successfully")
        } else if (msg === 3) {
            warningNofity("Attendance procees Already Done")
        }
    }, [msg])


    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <PageLayoutCloseOnly
                heading="Punch In/Out Marking HR"
                redirect={() => { }}
            >
                <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                    <Box sx={{ flex: 1, px: 0.5, width: '20%', }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
                                size="small"
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
                    <Box sx={{ display: 'flex', py: 0.5, width: '50%', }}>

                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={changeDept} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={changeSection} />
                        </Box>
                        {/* <Box sx={{ flex: 1, px: 0.5 }}>
                            <SectionBsdEmployee getEmploy={getEmployee} />
                        </Box> */}
                    </Box>

                    <Box sx={{ display: 'flex', px: 0.5, width: '30%' }}>
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="neutral"
                                onClick={handleOnClickFuntion}
                                fullWidth
                                startDecorator={<HourglassEmptyOutlinedIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Process
                            </Button>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="neutral"
                                fullWidth
                                startDecorator={<CleaningServicesOutlinedIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Clear
                            </Button>

                        </CssVarsProvider>
                    </Box>
                </Box>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default memo(PunchMarkingHR)