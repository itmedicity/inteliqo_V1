import React, { useCallback } from 'react'
import { Button, CssVarsProvider, Textarea, Tooltip, Typography } from '@mui/joy'
import { Box, Grid, Paper, TextField, FormControl, MenuItem, Select } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react'
import { getCreditedCasualLeave, getDutyPlannedShiftForHalfDayRequest } from 'src/redux/actions/LeaveReqst.action'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import moment from 'moment'
import _ from 'underscore'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { axioslogin } from 'src/views/Axios/Axios'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import HalfDayCasualLeaveOption from '../Func/HalfDayCasualLeaveOption'
import { Actiontypes } from 'src/redux/constants/action.type'
import { getannualleave } from 'src/redux/actions/Profile.action'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const HaldayRequetsMainForm = () => {

    const dispatch = useDispatch();
    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    const changeForm = () => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }


    const [fromDate, setFromDate] = useState(moment())
    const [leveType, setLeaveType] = useState([])
    const [disable, setDisable] = useState(true);
    const [shiftTime, setShiftTime] = useState(0)
    const [leveTypeState, setLeveTypeState] = useState(0)
    const [leaveName, setLeaveName] = useState(0)
    const [innerText, setInnertext] = useState('')
    const [shiftData, setShiftData] = useState({})
    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')
    const [reason, setReason] = useState('')
    const [name, setName] = useState('')

    const [drop, setDropOpen] = useState(false)

    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);

    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])

    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = empApprovalLevel;

    const {
        em_no, em_id,
        em_department, em_dept_section,
        hod: empHodStat, incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0] || {};
    console.log(em_id);

    //SELECTED EMPLOYEE EMP_ID AND EMP_NO DETAILS
    const empInformation = useSelector((state) => state.leaveRequestSelectedEmployee, _.isEqual)
    const empIdInform = useMemo(() => empInformation, [empInformation])

    //get employee category based allowed leave type
    const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData, _.isEqual);
    const totalAllowedData = useMemo(() => state?.leaveData, [state]);
    const {
        plan_slno,
        shift_id,
        shft_desc,
        first_half_in,
        first_half_out,
        second_half_in,
        second_half_out
    } = shiftData || {};
    // console.log(shiftData)

    useEffect(() => {
        if (totalAllowedData?.length > 0) {
            // console.log(totalAllowedData?.length)
            const allowedHalfdayLeaveData = totalAllowedData?.filter((val) => (val.type === 1) && val.balance > 0)
            setLeaveType(allowedHalfdayLeaveData);
        }
    }, [totalAllowedData])

    useEffect(() => {
        const postData = {
            startDate: moment(fromDate).format('YYYY-MM-DD'),
            em_id: hod === 0 && incharge === 0 ? em_id : empIdInform.em_id
        }
        dispatch(getDutyPlannedShiftForHalfDayRequest(postData));
        setShiftTime(0)
        setLeveTypeState(0)
        setLeaveName(0)
        setDisable(true)
    }, [empIdInform, fromDate])
    //SHIFT INFORMATION BASED ON SELECTED DATE
    const shiftInformation = useSelector((state) => state.getDutyPlannedShift.shiftInformation, _.isEqual);

    useEffect(() => {
        setShiftData(shiftInformation?.[0])
    }, [shiftInformation])

    // ONCHANGE DATE FUNCTION
    const handleChangeDate = useCallback(async (date) => {
        setFromDate(date)
        setShiftTime(0)
    })

    // onCHange Select Half Day Timing Shift Function
    const changeHalfDayShiftTiming = useCallback(async (e) => {
        setShiftTime(e.target.value)
        //CHECKING IF SHIFT IS MARKED IN DUTY PLANNING AND IS LEAVE CREDITED
        if (shiftInformation?.length === 0 || shiftInformation?.[0]?.shift_id === 1) {
            warningNofity("Duty Not Planned For the Selected Date")
            setShiftTime(0)
            setDisable(true)
        } else if (leveType?.length === 0) {
            warningNofity("Not Emough Credited Leaves")
            setShiftTime(0)
            setDisable(true)
        } else {
            setDisable(false)
            setInnertext(shft_desc)
            if (e.target.value === 1) {
                setTimeIn(moment(first_half_in).format('hh:mm A'))
                setTimeOut(moment(first_half_out).format('hh:mm A'))
            } else {
                setTimeIn(moment(second_half_in).format('hh:mm A'))
                setTimeOut(moment(second_half_out).format('hh:mm A'))
            }
        }

    }, [shiftInformation, leveType, shiftData])

    //ONCHAGE LEAVE TYPE FUNCTION
    const handleChangeLeaveType = useCallback(async (e) => {
        setLeveTypeState(e.target.value)
    })

    //ONCHAGE LEAVE NAME
    const handleChangeLeaveName = useCallback(async (e, { props }) => {
        setName(props.children)
        setLeaveName(e.target.value)
    })

    // SAVE HALF DAY LEAVE REQUEST 

    const handleSaveHalfDayLeaveRequest = useCallback(async () => {
        setDropOpen(true)
        let postDataForGetAttendMarking = {
            empNo: empIdInform.em_no,
            fromDate: moment(fromDate).format('YYYY-MM-DD'),
            toDate: moment(fromDate).format('YYYY-MM-DD')
        }
        //Checking attendance marking is saved in  current month || start of month b/w current date 
        const result = await axioslogin.post('/attedancemarkSave/check', postDataForGetAttendMarking)
        const { success } = result.data;
        if (success === 1) {
            warningNofity("Attendance Marking Processed ! Contact HRD")
        } else {

            if (shiftTime === 0 || leveTypeState === 0 || leaveName === 0) {
                warningNofity("Select All The Feild")
            } else if (reason === '') {
                warningNofity("Leave Request Reason Is Mandatory")
            } else {

                const first_half_inTime = `${moment(fromDate).format('YYYY-MM-DD')} ${moment(first_half_in).format('HH:mm')}`;
                const first_half_outTime = `${moment(fromDate).format('YYYY-MM-DD')} ${moment(first_half_out).format('HH:mm')}`;
                const second_half_inTime = `${moment(fromDate).format('YYYY-MM-DD')} ${moment(second_half_in).format('HH:mm')}`;
                const second_half_outTime = `${moment(fromDate).format('YYYY-MM-DD')} ${moment(second_half_out).format('HH:mm')}`;

                // console.log(moment(first_half_in).format('hh:mm'))
                const halfdaysavedata = {
                    checkIn: shiftTime === 1 ? first_half_inTime : second_half_inTime,
                    checkOut: shiftTime === 1 ? first_half_outTime : second_half_outTime,
                    leavedate: moment(fromDate).format('YYYY-MM-DD HH:mm:ss'),
                    planslno: leaveName, // selected leave name slno 
                    shiftid: shift_id,
                    month: name, // Selected leave Name
                    em_id: em_id,
                    em_no: em_no,
                    em_department: em_department,
                    em_dept_section: em_dept_section,
                    inc_apprv_req:
                        (authorization_incharge === 1 && incharge === 1) ? 1 :
                            (authorization_incharge === 1 && incharge === 0) ? 1 :
                                (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                    incapprv_status:
                        (authorization_incharge === 1 && incharge === 1) ? 1 :
                            (hod === 1) ? 1 :
                                (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                    inc_apprv_cmnt:
                        (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                            (hod === 1) ? "DIRECT" :
                                (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
                    inc_apprv_time:
                        (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                            (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                                (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                    hod_apprv_req:
                        (authorization_hod === 1 && hod === 1) ? 1 :
                            (authorization_hod === 1 && hod === 0) ? 1 :
                                (authorization_hod === 0 && hod === 1) ? 1 : 0,
                    hod_apprv_status:
                        (authorization_hod === 1 && hod === 1) ? 1 :
                            (authorization_hod === 0 && hod === 1) ? 1 : 0,
                    hod_apprv_cmnt:
                        (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                            (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
                    hod_apprv_time:
                        (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                            (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                    hr_aprrv_requ: 1,
                    ceo_req_status: empHodStat === 1 ? 1 : 0,
                    resonforleave: reason,
                    dutyPlanSlno: plan_slno // duty plan table slno 
                }
                const result = await axioslogin.post('/LeaveRequest/inserthalfdayreque', halfdaysavedata)
                const { success, message } = result.data;
                if (success === 1) {
                    succesNofity(message)
                    changeForm()
                    setDropOpen(false)
                    dispatch(getCreditedCasualLeave(em_id))
                } else if (success === 2) {
                    warningNofity(message)
                    changeForm()
                    setDropOpen(false)
                } else {
                    warningNofity(`Contact EDP ${JSON.stringify(message)}`)
                    changeForm()
                    setDropOpen(false)
                }
            }
        }

    }, [name, reason])

    useEffect(() => {
        return () => {
            dispatch(getannualleave(em_id));
        }
    }, [em_id])

    return (
        <Paper
            variant="outlined"
            sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, flexDirection: 'column' }}
        >
            <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
            <Box sx={{ display: "flex", flex: 1, p: 0.5, alignItems: 'center' }} >

                <Box sx={{ display: "flex", p: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={
                                handleChangeDate
                                // (date) => setFromDate(date)
                                // dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                <Box sx={{ display: "flex", p: 0.2, flex: 1 }} >
                    <FormControl
                        fullWidth={true}
                        margin="dense"
                        size='small'
                        sx={{ display: "flex", flex: 1 }}
                    >
                        <Select
                            fullWidth
                            variant="outlined"
                            margin='dense'
                            size='small'
                            defaultValue={0}
                            // disabled={true}
                            value={shiftTime}
                            onChange={changeHalfDayShiftTiming}
                        >
                            <MenuItem value={0} disabled>Select Half-Day Timing Shift</MenuItem>
                            <MenuItem value={1} >Shift First Half</MenuItem>
                            <MenuItem value={2} >Shift Second Half</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* SELECTION OPTION FOR LEAVE TYPE */}
                <Box sx={{ display: "flex", p: 0.2, flex: 1 }} >
                    <FormControl
                        fullWidth={true}
                        margin="dense"
                        size='small'
                        sx={{ display: "flex", flex: 1 }}
                    >
                        <Select
                            fullWidth
                            variant="outlined"
                            margin='dense'
                            size='small'
                            // defaultValue={0}
                            disabled={disable}
                            value={leveTypeState}
                            onChange={handleChangeLeaveType}
                        >
                            <MenuItem value={0} disabled>Select Leave Type</MenuItem>
                            {
                                leveType?.map((val, index) => {
                                    return <MenuItem value={val.type} key={index} >{val.typeleve}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                {/* LEAVE NAMES AGAINST SELECTED     */}
                <Box sx={{ display: "flex", p: 0.2, flex: 1 }} >
                    <HalfDayCasualLeaveOption disable={disable} handleChange={handleChangeLeaveName} value={leaveName} />
                </Box>
            </Box >

            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Half Day Shift In :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{timeIn}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Half Day Shift Out :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{timeOut}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Half Day For :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{moment(fromDate).format('DD-MM-YYYY')}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 2, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Shift Name:</Box>
                    <Box sx={{ display: 'flex', flex: 3, justifyContent: 'space-around' }}>{innerText}</Box>
                </Box>
            </Box>
            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, p: 0.3 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 6 }} >
                    <CssVarsProvider>
                        <Textarea
                            label="Outlined"
                            placeholder="Reason For Leave Request"
                            variant="outlined"
                            color="warning"
                            size="lg"
                            minRows={1}
                            maxRows={2}
                            onChange={(e) => setReason(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', flex: 2, alignItems: 'center', px: 1, justifyContent: "space-evenly" }}>
                    <Box>
                        <CssVarsProvider>
                            <Tooltip title="Upload Documents" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="danger"
                                >
                                    <UploadFileIcon />
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <Box>
                        <CssVarsProvider>
                            <Tooltip title="View Documents" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="primary"
                                // onClick={() => setOpen(true)}
                                >
                                    <FindInPageIcon />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <Box>
                        <CssVarsProvider>
                            <Tooltip title="View Documents" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="primary"
                                    onClick={handleSaveHalfDayLeaveRequest}
                                >
                                    Save Request
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
                flexDirection: 'start',
                p: 0,
                m: 0
            }} >
                <Typography level="body4">Supported Document/ Image Formats - *.pdf / *.jpg,*.jpeg,*.png || Doc/Image Size Should Be Less Than 2 MB </Typography>
            </Box>
        </Paper >
    )
}

export default memo(HaldayRequetsMainForm)