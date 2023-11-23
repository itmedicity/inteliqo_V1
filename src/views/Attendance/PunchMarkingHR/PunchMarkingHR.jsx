import React, { Fragment, useEffect, useState, memo, useMemo, useCallback } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { Actiontypes } from 'src/redux/constants/action.type';
import PunchSavedHrView from './PunchSavedHrView';
import { useHistory } from 'react-router-dom'
import _ from 'underscore'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';


const PunchMarkingHR = () => {
    const { FETCH_PUNCH_DATA, FETCH_SHIFT_DATA } = Actiontypes;
    const dispatch = useDispatch();
    const history = useHistory()
    const [openBkDrop, setOpenBkDrop] = useState(false)
    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [flag, setFlag] = useState(0)
    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    const { em_no } = employeeProfileDetl
    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    useEffect(() => {
        if (dept !== 0) {
            setFlag(0)
        }

    }, [dept])
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
                        const { cmmn_early_out, cmmn_grace_period, cmmn_late_in } = data[0]

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

                        const result = await getAndUpdatePunchingData(postData, holidaydata, cmmn_early_out,
                            cmmn_grace_period, cmmn_late_in,
                            gross_salary, empInform, dispatch)

                        if (result !== undefined) {

                            const { status, message, shift, punch_data } = result;
                            if (status === 1) {
                                dispatch({ type: FETCH_PUNCH_DATA, payload: punch_data })
                                dispatch({ type: FETCH_SHIFT_DATA, payload: shift })
                                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
                                const { success } = punch_master_data.data;

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
                                        setmsg(2)
                                        return { status: 2 }
                                    }
                                }
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                            }
                        }
                        else {
                            setOpenBkDrop(false)
                            setmsg(1)
                        }
                    }
                }
                attendMarkCheck(postdata)
                return 0
            })
        } else {
            warningNofity("Please Select Depatment And Department section")
        }
    }, [empInform, dept, section, FETCH_PUNCH_DATA, FETCH_SHIFT_DATA, dispatch, value])

    const [nextstage, setNextStage] = useState(0)
    useEffect(() => {
        if (msg === 1) {
            errorNofity("Duty Doesnot Planed, Please do Duty Plan")
        } else if (msg === 2) {
            setNextStage(1)
        } else if (msg === 3) {
            warningNofity("Attendance procees Already Done")
        }
    }, [msg, setFlag])

    const punchMarkSave = async (saveDta) => {
        const result = await axioslogin.post('/payrollprocess/Insert/PunchInOutHr', saveDta)
        const { success } = result.data
        if (success === 1) {
            succesNofity("Punch Updated Successfully")
            setOpenBkDrop(false)
            setFlag(1)
        } else {
            warningNofity("Error While Updating Punch")
        }
    }

    useEffect(() => {
        if (nextstage === 1) {
            const saveDta = {
                marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                dept_slno: dept,
                deptsec_slno: section,
                create_user: em_no,
                edit_user: em_no,
                status: 1
            }
            punchMarkSave(saveDta)
        }
    }, [nextstage, value, dept, section, em_no])

    const handleView = useCallback(() => {
        history.push('/Home/PunchDoneList');
    }, [history])

    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <CustomLayout title="Punch In/Out Marking HR" displayClose={true} >
                <Box sx={{ width: '100%', }}>
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
                        <Box sx={{ display: 'flex', width: '50%', }}>

                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentDropRedx getDept={changeDept} deptslno={dept} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentSectionRedx getSection={changeSection} />
                            </Box>
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
                                    onClick={handleView}
                                    startDecorator={<RemoveRedEyeOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    View
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {flag === 1 ? <PunchSavedHrView value={value} dept={dept} section={section}
                    /> : null}
                </Box>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(PunchMarkingHR)