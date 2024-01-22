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
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'

const MasterPage = () => {
    const [open, setOpen] = useState(false)
    const { GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_EMP_DETAILS } = Actiontypes;

    const reduxDispatch = useDispatch()

    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
        //get holiday current
        reduxDispatch(getHolidayList());

        return () => {
            dispatch({ type: FETCH_EMP_DETAILS, payload: [] })
        }
    }, [FETCH_EMP_DETAILS, reduxDispatch])



    const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState

    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptSecName, deptName } = planState
    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))

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

    const onClickDutyPlanButton = useCallback(async (e) => {
        setOpen(true)
        e.preventDefault()

        if (deptName === 0 || deptSecName === 0) {
            infoNofity('Check The Department || Department Section Feild');
            setOpen(false);
        } else if (moment(toDate) > moment(calanderMaxDate)) {
            infoNofity('Select the Correct From || To || Both Dates')
            setOpen(false);
        } else {
            //For get shift Details
            const postData = {
                em_department: deptName,
                em_dept_section: deptSecName,
            }

            const departmentDetlFrShiftGet = {
                dept_id: deptName,
                sect_id: deptSecName
            }

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
    }, [deptName, deptSecName, GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_EMP_DETAILS,
        calanderMaxDate, commonSettings, deptShift, holidayList, planState, reduxDispatch, toDate])


    return (
        <Paper
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
                <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                    <DeptSelectByRedux setValue={setDepartment} value={deptName} />
                </Box>
                <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                    {/* <DepartmentSection setSection={setDepartSecName} sectionVal={deptSecName} /> */}
                    <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} />
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
    )
}

export default memo(MasterPage) 