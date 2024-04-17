// MAIN PAGE PUNCH MARKING HR 
import React, { Fragment, useState, memo, useCallback } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Chip, CssVarsProvider, Sheet, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
// import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
// import { setDepartment } from 'src/redux/actions/Department.action';
// import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { addDays, addMonths, endOfMonth, format, getMonth, getYear, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
// import { getAndUpdatePunchingData } from '../ShiftUpdation/Function';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
// import { Actiontypes } from 'src/redux/constants/action.type';
// import PunchSavedHrView from './PunchSavedHrView';
import { useHistory } from 'react-router-dom'
import _ from 'underscore'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import Table from '@mui/joy/Table';
// import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { processPunchMarkingHrFunc } from './punchMarkingHrFunc';
// import Sun from '@mui/icons-material/LightMode';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PunchMarkingHR = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    //DEFINE STATES
    const [deptList, setDeptList] = useState([]);
    const [openBkDrop, setOpenBkDrop] = useState(false);
    const [value, setValue] = useState(moment(new Date()));
    const [holidayList, setHolidayList] = useState([]);
    const [empSalary, setEmpSalary] = useState([]);
    const [empList, setEmpList] = useState([]);

    //GET REDUX stored information using useSelector
    const commonSettings = useSelector((state) => state?.getCommonSettings)
    const {
        holiday_policy_count, //HOLIDAY PRESENT AND ABSENT CHECKING COUNT 
        weekoff_policy_max_count // WEEK OFF ELIGIBLE MAX DAY COUNT
    } = commonSettings;

    const shiftInformation = useSelector((state) => state?.getShiftList?.shiftDetails)
    // get login empid 
    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0])
    const { em_id, em_no } = empData

    const monthStart = format(startOfMonth(new Date(value)), 'yyyy-MM-dd');
    const actSelectDate = format(new Date(value), 'yyyy-MM-dd');
    //FUNCTION HANDLE

    const onProcessClick = async () => {
        setOpenBkDrop(true)

        //GET HOLIDAY LIST START
        const SelectMonth = getMonth(new Date(value))
        const SelectYear = getYear(new Date(value))

        const getHolidayPostData = {
            month: SelectMonth + 1,
            year: SelectYear
        }
        const holiday_data = await axioslogin.post("/attendCal/getHolidayListDateWise/", getHolidayPostData);
        const { suc, holidaydata } = holiday_data.data;
        if (suc === 1) setHolidayList(holidaydata)
        //GET HOLIDAY LIST END

        /***
         * 1 -> get all department and sewction info
         * 2 -> get punchmarking hr table data with selected month
         * 3 -> if data ? get the data : insert the data with current month 
         * 4 -> filter the data with deptSection with punchmarking table
         */
        const startOfMonths = startOfMonth(new Date(value));

        const getPunchMarkTablePostData = {
            month: moment(startOfMonths).format('YYYY-MM-DD')
        }

        //GET ALL DEPARTMENT SECTION LIST AND SHOW
        const result = await axioslogin.get('/payrollprocess/getAcriveDepartmentSection/');
        const { success, data } = result.data;
        const deptSectionData = data;

        if (success === 1) {
            //GET PUNCHMARKING DATA FROM table 
            const getPunchMarkingHr_table = await axioslogin.post('/payrollprocess/getPunchMarkingHrFull/', getPunchMarkTablePostData);
            const { succ, data } = getPunchMarkingHr_table.data;
            if (succ === 1) {
                // IF DATA
                const punchMarkingTableData = data;
                const findDept = [...new Set(deptSectionData?.map(e => e.dept_id))]?.map((dept) => {
                    return {
                        "dept_id": dept,
                        "dept_name": deptSectionData?.find(e => e.dept_id === dept)?.dept_name,
                        "section": deptSectionData?.filter((val) => val.dept_id === dept).map((v) => {
                            return { ...v, "updated": punchMarkingTableData?.find((e) => v.sect_id === e.deptsec_slno)?.last_update_date ?? moment(startOfMonths).format('YYYY-MM-DD') }
                        }),
                    }
                })
                setDeptList(findDept)
                setOpenBkDrop(false)
            } else if (succ === 2) {
                // IF NO DATA -> INSERT IN TO punchmarking_hr table
                const postData_PunchMarkHR = deptSectionData?.map((e) => {
                    return [
                        format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        e.dept_id,
                        e.sect_id,
                        1,
                        null,
                        null,
                        em_no,
                        em_no,
                        format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
                    ]
                })

                const insertPunchMarkTable = await axioslogin.post('/payrollprocess/Insert/PunchInOutHr', postData_PunchMarkHR)
                const { success } = insertPunchMarkTable.data
                if (success === 1) {
                    const findDept = [...new Set(deptSectionData?.map(e => e.dept_id))]?.map((dept) => {
                        return {
                            "dept_id": dept,
                            "dept_name": deptSectionData?.find(e => e.dept_id === dept)?.dept_name,
                            "section": deptSectionData?.filter((val) => val.dept_id === dept).map((v) => {
                                return { ...v, "updated": moment(startOfMonths).format('YYYY-MM-DD') }
                            }),
                        }
                    })
                    setDeptList(findDept)
                    setOpenBkDrop(false)
                } else {
                    warningNofity("Error Updating the Punchmarking HR Data ! contact IT")
                    setOpenBkDrop(false)
                }
            } else {
                // IF ERROR
                warningNofity('----error getting punchmarking table data ! contact IT Department')
                setOpenBkDrop(false)
            }
        } else {
            warningNofity("Error Getting the Department Details")
            setOpenBkDrop(false)
        }
        //GET COMMON SETTINGS
        dispatch(setCommonSetting())
        //GET ALL SHIFT INFORMATION 
        dispatch(setShiftDetails())
    }


    /***** 
     * // ON MAIN PROCESS BUTTON
     * get shift master data
     * get common master data
     * get Marking Month from - punchingmarking_hr - department wise and section wise
     * 
     * // EACH update attendance button 
     * get section wise employee list 
     * get duty plan date wise depend on last update date
     * get punch master data depend on last update date
     * 
     * update punchmaster data
     * insert or update punchmasrking_hr table
     * update hrm_duty_plan table
     * 
     * ****/

    //UPDATE ATTENDANDE PROCESS START HERE
    const updateAttendanceProcesss = async (deptID, sectID, lastUpdateDate) => {
        setOpenBkDrop(true)
        const weekOffPolicyCountMax = weekoff_policy_max_count;
        const holidayPolicyCount = holiday_policy_count;

        const today = subDays(new Date(format(new Date(), 'yyyy-MM-dd')), 1);
        const startOfMonths = startOfMonth(new Date(value));

        //GET GROSS SALARY START
        const getGrossSalaryEmpWise = await axioslogin.get(`/common/getgrossSalaryByEmployeeNo/${sectID}`);
        const { su, dataa } = getGrossSalaryEmpWise.data;
        if (su === 1) setEmpSalary(dataa)
        //GET GROSS SALARY END

        if (today < new Date(format(new Date(value), 'yyyy-MM-dd'))) {
            setOpenBkDrop(false)
            warningNofity("Select To date less than today !!!")
        } else {
            // CHECK ATTENADANCE PROCESS DONE OR NOT SECTION WIS

            //GET EMPLOYEE LIST START
            const empData = await axioslogin.get(`/common/getEmpName/${sectID}`)
            const { data, success } = empData.data;
            if (success === 1) {
                const selectedDateSameStatus = new Date(lastUpdateDate) === startOfMonths ? 1 : 0;
                const postData_getPunchData = {
                    preFromDate: selectedDateSameStatus === 1 ?
                        format(subDays(startOfMonth(new Date(value)), 2), 'yyyy-MM-dd 00:00:00') :
                        format(subDays(new Date(lastUpdateDate), 2), 'yyyy-MM-dd 00:00:00'),
                    preToDate: format(addDays(new Date(value), 1), 'yyyy-MM-dd 23:59:59'),
                    fromDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    fromDate_dutyPlan: selectedDateSameStatus === 1 ? format(startOfMonth(new Date(value)), 'yyyy-MM-dd') : format(new Date(lastUpdateDate), 'yyyy-MM-dd'),
                    toDate_dutyPlan: format(new Date(value), 'yyyy-MM-dd'),
                    fromDate_punchMaster: selectedDateSameStatus === 1
                        ? format(subDays(startOfMonth(new Date(value)), weekOffPolicyCountMax), 'yyyy-MM-dd')
                        : format(subDays(new Date(lastUpdateDate), weekOffPolicyCountMax), 'yyyy-MM-dd'),
                    toDate_punchMaster: format(addDays(new Date(value), holidayPolicyCount), 'yyyy-MM-dd'),
                    section: sectID,
                    deptID: deptID,
                    empList: data?.map((e) => e.em_no),
                    loggedEmp: em_no,
                    toDayeForUpdatePunchMast: format(new Date(value), 'yyyy-MM-dd')
                }
                // GET PUNCH DATA FROM TABLE START
                const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData_getPunchData);
                const { su, result_data } = punch_data.data;
                if (su === 1) {
                    const punchaData = result_data;
                    // console.log(punchaData?.filter((e) => e.emp_code === '1812'))
                    const empList = data?.map((e) => e.em_no)
                    // console.log(empList)
                    // PUNCH MARKING HR PROCESS START
                    const result = await processPunchMarkingHrFunc(
                        postData_getPunchData,
                        punchaData,
                        empList,
                        shiftInformation,
                        commonSettings,
                        holidayList,
                        empSalary
                    )
                    const { status, message, errorMessage, dta } = result;
                    if (status === 1) {
                        // console.log(dta.section)
                        const filterDeptAndSection = deptList?.map((e) => {
                            return {
                                "dept_id": e.dept_id,
                                "dept_name": e.dept_name,
                                "section": e.section?.map((el) => {
                                    return dta.section === el.sect_id ? { ...el, updated: dta?.toDayeForUpdatePunchMast } : { ...el }
                                }),
                            }
                        })
                        if (filterDeptAndSection?.length > 0) {
                            setDeptList(filterDeptAndSection)
                            setOpenBkDrop(false)
                            succesNofity('Punch Master Updated Successfully')
                        } else {
                            succesNofity('Error Contact IT')
                            setOpenBkDrop(false)
                        }
                        // onProcessClick()
                    } else {
                        setOpenBkDrop(false)
                        warningNofity(message, errorMessage)
                    }
                    // PUNCH MARKING HR PROCESS END
                } else {
                    warningNofity("Error getting punch Data From DB")
                    setOpenBkDrop(false)
                }
                // GET PUNCH DATA FROM TABLE END
            } else {
                warningNofity("Error Getting Employee List")
                setOpenBkDrop(false)
            }
            //GET EMPLOYEE LIST START
        }
    }
    //FORM DATA 

    //DELETE ATTENDANCE MARKING 

    const deleteAttendanceMarkingProcess = async (dept, section, date) => {
        setOpenBkDrop(true)
        const monthStart = format(startOfMonth(new Date(value)), 'yyyy-MM-dd');
        const monthEnd = format(endOfMonth(new Date(value)), 'yyyy-MM-dd');
        // console.log(dept, section, date, monthStart, monthEnd)

        const postDataUpdatePunchMarkHR = {
            loggedEmp: em_no,
            toDate_punchMaster: monthStart,
            fromDate: monthStart,
            section: section
        }
        // GET EMPLOYEE LIST
        const empData = await axioslogin.get(`/common/getEmpName/${section}`)
        const { data, success } = empData.data;
        if (success === 1 && data?.length > 0) {
            // GET DUTY PLAN DATA -> SLNO
            const empList = data?.map((e) => e.em_no)
            const postData = {
                fromDate_dutyPlan: monthStart,
                toDate_dutyPlan: monthEnd,
                empList: empList
            }
            const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData); //GET DUTY PLAN DAAT
            const { succes, shiftdetail } = getDutyPlan.data;
            if (succes === 1 && shiftdetail?.length > 0) {
                // UPDATE DUTY PLAN SLNO
                const dutyPlanSlno = shiftdetail?.map((e) => e.plan_slno)
                const updateDutyPlanTable = await axioslogin.post("/attendCal/updateDelStatDutyPlanTable/", dutyPlanSlno);
                const { susc, message } = updateDutyPlanTable.data;
                if (susc === 1) {
                    // UPDATE PUNCH_MARKING_HR TABLE
                    const updatePunchMarkingHR = await axioslogin.post("/attendCal/updatePunchMarkingHR/", postDataUpdatePunchMarkHR);
                    const { sus } = updatePunchMarkingHR.data;
                    if (sus === 1) {
                        setDeptList([])
                        setOpenBkDrop(false)
                        succesNofity("Attendance Process Deleted")
                    } else {
                        setOpenBkDrop(false)
                        warningNofity('Error !! Deleting Attendance Process')
                    }
                } else {
                    setOpenBkDrop(false)
                    warningNofity('Error Updating Delete Status in Duty Plan')
                }
                // console.log(dutyPlanSlno)
            } else {
                setOpenBkDrop(false)
                warningNofity('Duty Not planned for selected dates')
            }
            // console.log(succes, shiftdetail)
        } else {
            setOpenBkDrop(false)
            warningNofity('No Employees Found in Selected Department Section')
        }
    }

    const handleView = useCallback(() => {
        history.push('/Home/PunchDoneList');
    }, [history])


    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="!!! Please wait...Monthly Attendance Processing.... Do not Refesh or Reload the Browser !!!" />
            <CustomLayout title="Monthly Attendance Process" displayClose={true} >
                <Box sx={{ width: '100%', }}>
                    <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                        {/* Selected Month */}
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Select Month</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    minDate={subMonths(new Date(), 2)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    size="small"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                        setDeptList([])
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} color='primary' />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        {/* To date */}
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    minDate={startOfMonth(new Date(value))}
                                    maxDate={new Date()}
                                    value={value}
                                    size="small"
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                        setDeptList([])
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} color='primary' />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5, width: '15%' }}>
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="danger"
                                    onClick={onProcessClick}
                                    fullWidth
                                    startDecorator={<HourglassEmptyOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Process
                                </Button>
                                {/* <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={handleView}
                                    startDecorator={<RemoveRedEyeOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    View
                                </Button> */}
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box padding={1} >
                        <Sheet sx={{ height: window.innerHeight - 180, overflow: 'auto' }} >
                            <Table
                                variant='soft'
                                size='sm'
                                hoverRow
                                stickyHeader
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Department Names</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'center' }} >Process</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deptList.map((row, index) => (
                                        <Fragment key={index} >
                                            <tr key={index} style={{ backgroundColor: '#829baf' }} >
                                                <td colSpan={3} >{row.dept_name}</td>
                                                <td></td>
                                            </tr>
                                            {
                                                row?.section?.map((e, idx) => (
                                                    <tr key={idx} >
                                                        <td></td>
                                                        <td>{e.sect_name}</td>
                                                        {/* <td>{e.updated}</td> */}
                                                        <td>
                                                            {
                                                                monthStart === e.updated ?
                                                                    <Chip color='neutral' size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                        {e.updated}
                                                                    </Chip> :
                                                                    actSelectDate <= e.updated ?
                                                                        <Chip color='success' size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                            {e.updated}
                                                                        </Chip>
                                                                        :
                                                                        <Chip color="danger" size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                            {e.updated}
                                                                        </Chip>
                                                            }
                                                        </td>
                                                        <td>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
                                                                <Chip
                                                                    color="success"
                                                                    onClick={(c) => updateAttendanceProcesss(row.dept_id, e.sect_id, e.updated)}
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Update Attendance</Chip>
                                                                <Chip
                                                                    color="danger"
                                                                    onClick={() => deleteAttendanceMarkingProcess(row.dept_id, e.sect_id, e.updated)}
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Delete Process</Chip>
                                                            </Box>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Box>
                </Box>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(PunchMarkingHR)