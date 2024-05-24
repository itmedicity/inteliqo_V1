import React, { useCallback, useMemo } from 'react'
import { memo } from 'react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import { useReducer } from 'react'
import { lastDayOfMonth } from 'date-fns/esm'
import {
    dutyPlanInitialState,
    dutyPlanInsertFun,
    dutyPlanReducer,
    getEmployeeDetlDutyPlanBased,
    planInitialState,
} from './DutyPlanFun/DutyPlanFun'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch } from 'react-redux'
import { getSectionShift } from 'src/redux/actions/dutyplan.action'
import { useEffect } from 'react'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { useSelector } from 'react-redux'
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action'
import _ from 'underscore'
import { Actiontypes } from 'src/redux/constants/action.type'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { CssVarsProvider, Button, Tooltip } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios'
import { getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action'
import DepartmentSection from 'src/views/LeaveManagement/LeavereRequsition/Func/DepartmentSection'
import MasterPage from './MasterPage'
import { startOfMonth } from 'date-fns'

const DutyPlanTopCard = () => {
    const [open, setOpen] = useState(false)
    const [rights, setRights] = useState(0)

    const { GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_EMP_DETAILS } = Actiontypes;

    const reduxDispatch = useDispatch()
    const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState

    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptSecName } = planState
    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))

    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
        //get holiday current
        reduxDispatch(getHolidayList());

        return () => {
            dispatch({ type: FETCH_EMP_DETAILS, payload: [] })
        }
    }, [FETCH_EMP_DETAILS, reduxDispatch])



    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_department } = employeeProfileDetl;



    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            reduxDispatch(getHodBasedDeptSectionName(em_id));
        }
    }, [hod, incharge, em_id, reduxDispatch])

    useEffect(() => {
        if (em_department !== 0) {
            setDepartment(em_department)
        }
    }, [em_department])

    // state variable from redux state
    // EMployee detaild selected dept & dept_section
    //const employeeDetl = useSelector((state) => state.getEmployeedetailsDutyplan.EmpdetlInitialdata, _.isEqual);

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);
    // get holiday 
    const holiday = useSelector((state) => state.getHolidayList, _.isEqual);
    // selected department shift details
    const departmentShiftt = useSelector((state) => state.getDepartmentShiftData.deptShiftData, _.isEqual);

    //const empDetl = useMemo(() => employeeDetl, [employeeDetl]);
    const commonSettings = useMemo(() => commonState, [commonState]);
    const holidayList = useMemo(() => holiday, [holiday]);
    const deptShift = useMemo(() => departmentShiftt, [departmentShiftt])
    const { group_slno } = commonSettings;

    //updated shift array for updating into database
    const getUpdatedShiftId = useSelector((state) => state.getUpdatedShiftId, _.isEqual);
    const shiftId = useMemo(() => getUpdatedShiftId, [getUpdatedShiftId]);

    const onClickSaveShiftUpdation = useCallback(async (e) => {
        e.preventDefault();
        const updateShiftChanges = await axioslogin.patch("/plan", shiftId)
        const { success, message } = updateShiftChanges.data
        if (success === 1) {
            succesNofity("Duty Plan Updated")
        }
        else {
            errorNofity(message)
        }
    }, [shiftId])

    useEffect(() => {
        const getEmployeeRight = async () => {
            const result = await axioslogin.post("/attendCal/rights/", postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { user_grp_slno } = data[0];
                if (group_slno !== undefined) {
                    if (group_slno.includes(user_grp_slno) === true) {
                        setRights(1)
                    } else {
                        setRights(0)
                    }
                }

            } else {
                setRights(0)
            }
        }

        const postData = {
            emid: em_id
        }
        getEmployeeRight(postData)

    }, [em_id, group_slno])


    /****
     * a->before getting the date need to check the validation it exceed current month last days
     *
     * 1-> get post data dep,sect,and date start & end
     * 2-> dispatch for gettting employee details
     */

    const onClickDutyPlanButton = useCallback(async (e) => {
        setOpen(true)
        e.preventDefault()

        if (em_department === 0 || deptSecName === 0) {
            infoNofity('Check The Department || Department Section Feild');
            setOpen(false);
        } else if (moment(toDate) > moment(calanderMaxDate)) {
            infoNofity('Select the Correct From || To || Both Dates')
            setOpen(false);
        } else {
            //For get shift Details
            const postData = {
                em_department: em_department,
                em_dept_section: deptSecName,
            }

            const departmentDetlFrShiftGet = {
                dept_id: em_department,
                sect_id: deptSecName
            }

            const dateCheck = {
                month: moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD'),
                section: deptSecName
            }
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", dateCheck);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD') : moment(new Date(data[0]?.last_update_date)).format('YYYY-MM-DD')
                const lastDay_month = moment(lastDayOfMonth(new Date(fromDate))).format('YYYY-MM-DD')

                if (lastUpdateDate === lastDay_month) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't do dutyplan!!  ")
                    setOpen(false)
                } else {
                    getEmployeeDetlDutyPlanBased(postData).then((emplyDataArray) => {
                        const { status, data } = emplyDataArray;
                        if (status === 1) {
                            dispatch({ type: FETCH_EMP_DETAILS, payload: data });
                            reduxDispatch(getSectionShift(departmentDetlFrShiftGet));
                            //process function
                            dutyPlanInsertFun(planState, commonSettings, holidayList, data, deptShift).then((values) => {
                                // employee details based on selected dept and dept sec
                                const { data, status, message, dateFormat } = values;
                                if (status === 1) {
                                    reduxDispatch({ type: GET_SHIFT_PLAN_DETL, payload: data, status: false })
                                    reduxDispatch({ type: GET_SHIFT_DATE_FORMAT, payload: dateFormat, status: false })
                                    setOpen(false)
                                } else {
                                    warningNofity(message)
                                    setOpen(false)
                                }
                            })
                        } else {
                            dispatch({ type: FETCH_EMP_DETAILS, payload: [] })
                        }
                    })
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }
    }, [em_department, deptSecName, GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_EMP_DETAILS,
        calanderMaxDate, commonSettings, deptShift, holidayList, planState, reduxDispatch, toDate,
        fromDate])

    return (
        <>
            {
                rights === 1 ? <MasterPage /> : <Paper
                    square
                    variant="outlined"
                    sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
                >
                    <CustomBackDrop open={open} text="Please Wait" />
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}  >
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }}  >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    // maxDate={moment(calanderMaxDate)}
                                    inputFormat="DD-MM-YYYY"
                                    value={fromDate}
                                    onChange={(date) =>
                                        dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    minDate={moment(fromDate)}
                                    maxDate={moment(calanderMaxDate)}
                                    inputFormat="DD-MM-YYYY"
                                    value={toDate}
                                    onChange={(date) =>
                                        dispatch({ type: TO_DATE, to: moment(date).format('YYYY-MM-DD') })
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
            <DeptSelectByRedux setValue={setDepartment} value={deptName} />
        </Box> */}
                        <Box sx={{ flex: 1, px: 0.3, }} >
                            <DepartmentSection setSection={setDepartSecName} sectionVal={deptSecName} />
                            {/* <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} /> */}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Box sx={{ p: 0.2 }} >
                                <Tooltip title="Process" followCursor placement='top' arrow >
                                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={onClickDutyPlanButton} sx={{
                                        color: '#90caf9'
                                    }} >
                                        <PublishedWithChangesIcon />
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Box sx={{ p: 0.2 }}>
                                <Tooltip title="Save" followCursor placement='top' arrow >
                                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={onClickSaveShiftUpdation} sx={{
                                        color: '#81c784'
                                    }}>
                                        <SaveIcon />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            }
        </>
    )
}

export default memo(DutyPlanTopCard)
