import { Button, Checkbox, CssVarsProvider, Sheet, Tooltip } from '@mui/joy'
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import _ from 'underscore'
import { ToastContainer } from 'react-toastify'
import { addHours, addMinutes, format, isAfter, isBefore, subHours, isEqual, addDays } from 'date-fns'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
// import { CalculationFun } from './CommonRqstFun'

const OneHourRequest = ({ count, setCount }) => {

    const reduxDispatch = useDispatch()

    useEffect(() => {
        reduxDispatch(setCommonSetting())
    }, [reduxDispatch])


    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section, hod: empHodStat } = selectedEmployeeDetl?.[0];

    // const state = useSelector((state) => state.getCommonSettings, _.isEqual)

    const [fromDate, setFromDate] = useState(moment())
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)

    const [shiftTiming, setShiftTiming] = useState([])
    // const [punchDetl, setPunchDetl] = useState([])

    const [checkinBox, setCheckInCheck] = useState(false)
    const [checkoutBox, setCheckOutCheck] = useState(false)

    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckout] = useState('00:00');

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);
    const [reason, setReason] = useState('')
    const [punchCheck, setPunchcheck] = useState(0)
    const [punchData, setPunchData] = useState([])

    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel
    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const { cmmn_grace_period, comp_hour_count } = state;

    useEffect(() => {
        const getdepartmentShift = async () => {
            if (em_department !== 0 && em_dept_section !== 0) {
                const postData = {
                    dept_id: em_department,
                    sect_id: em_dept_section
                }
                const result = await axioslogin.post('/departmentshift/shift', postData)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0];
                    const obj = JSON.parse(shft_code)
                    setDeptShift(obj);
                    //get shift timing
                    const shiftSlno = await obj?.map(val => val.shiftcode)

                    const shiftArray = await axioslogin.post('/departmentshift/getShiftTiming', shiftSlno);
                    const { succ, result } = await shiftArray.data;
                    if (succ === 1) {
                        setShiftTiming(result)
                    } else {
                        setShiftTiming([])
                    }
                } else if (success === 0) {
                    warningNofity(message);
                } else {
                    errorNofity(message)
                }
            }
        }
        getdepartmentShift();
    }, [em_department, em_dept_section])

    const handleChangeCheckInCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckInCheck(true)
            setCheckOutCheck(false)
        }
    }, [])

    const handleChangeCheckOutCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckOutCheck(true)
            setCheckInCheck(false)
        }
    }, [])

    const getShiftdetail = async () => {
        if (selectedShift === 0) {
            warningNofity("Please Select Any Shift!!")
        } else {
            const postData = {
                emp_id: em_id,
                duty_day: moment(fromDate).format('YYYY-MM-DD')
            }
            const result = await axioslogin.post('/overtimerequest/shiftdata/', postData);
            const { success } = result.data;
            if (success === 1) {

                // GET SHIFT DATA
                const selectedShiftTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time, shft_cross_day } = selectedShiftTiming[0]

                const inTime = moment(shft_chkin_time).format('HH:mm');
                // const outTime = moment(shft_chkout_time).format('HH:mm');

                setCheckin(moment(shft_chkin_time).format('hh:mm'))
                setCheckout(moment(shft_chkout_time).format('hh:mm'))

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                // const chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;

                const chekOut = shft_cross_day === 0 ? `${format(new Date(fromDate), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}` :
                    `${format(addDays(new Date(fromDate), 1), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}`;

                setPunchInTime(chekIn)
                setPunchOutTime(chekOut)

                // const postDataForpunchMaster = {
                //     date2:  shft_cross_day === 0 ? format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(addHours(new Date(addDays(new Date(fromDate), 1)), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                //     date1: shft_cross_day === 0 ? format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd H:mm:ss') : format(subHours(new Date(fromDate), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                //     em_no: em_no
                // }
                const postDataForpunchMaster = {
                    date2: format(addHours(new Date(chekOut), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                    date1: format(subHours(new Date(chekIn), comp_hour_count), 'yyyy-MM-dd H:mm:ss'),
                    em_no: em_no
                }

                //FETCH THE PUNCH TIME FROM PUNCH DATA
                const result = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster)
                const { success, data } = result.data;
                if (success === 1) {
                    setPunchData(data)
                    succesNofity('Done , Select The Punching Info')
                    setPunchcheck(1)
                } else {
                    //no record
                    warningNofity('Punching Data Not Found')
                }
            } else {
                warningNofity("'Duty Plan Not Done!")
            }
        }
    }

    const postData = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            dept_id: em_department,
            dept_sect_id: em_dept_section,
            request_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            one_hour_duty_day: moment(fromDate).format('YYYY-MM-DD'),
            checkin_flag: checkinBox === true ? 1 : 0,
            checkout_flag: checkoutBox === true ? 1 : 0,
            check_in: punchInTime,
            check_out: punchOutTime,
            shift_id: selectedShift,
            reason: reason,
            incharge_req_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (authorization_incharge === 1 && incharge === 0) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            incharge_approval_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (hod === 1) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            incharge_approval_comment: (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                (hod === 1) ? "DIRECT" :
                    (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
            incharge_approval_date: (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
            hod_req_status: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 1 && hod === 0) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_approval_status: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_approval_comment: (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
            hod_approval_date: (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
            ceo_req_status: empHodStat === 1 ? 1 : 0,
            hr_req_status: 1
        }
    }, [em_no, em_id, em_department, em_dept_section, reason, punchInTime, punchOutTime, fromDate,
        selectedShift, authorization_incharge, authorization_hod, hod, incharge,
        checkinBox, checkoutBox, empHodStat])

    const submitRequest = async () => {
        if (checkinBox === false && checkoutBox === false) {
            warningNofity("Check In || Check Out Needs To Check")
        }
        else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        } else if (punchCheck === 0) {
            warningNofity("Please Select Punch Data Button!!")
        }
        else {
            if (checkinBox === true) {
                const intime = format(addHours(new Date(punchInTime), 1), 'yyyy-MM-dd H:mm')
                const relaxTime = format(addMinutes(new Date(intime), cmmn_grace_period), 'yyyy-MM-dd H:mm')
                const result = punchData.find((val) => val)
                const dd = isBefore(new Date(result.punch_time), new Date(relaxTime)) && isAfter(new Date(result.punch_time), new Date(punchInTime)) ? 1 : 0
                if (dd === 0) {
                    warningNofity("Can't Apply For One Hour Request!!");
                    setSelectedShift(0)
                    setFromDate(moment(new Date()))
                    setReason('')
                    setPunchInTime(0)
                    setPunchOutTime(0)
                    setCheckInCheck(false)
                    setCheckOutCheck(false)
                } else {
                    // CalculationFun(punchDetl, checkinBox, checkoutBox, punchInTime, punchOutTime)
                    const result = await axioslogin.post('/CommonReqst', postData)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        setCount(count + 1)
                        setSelectedShift(0)
                        setFromDate(moment(new Date()))
                        setReason('')
                        setPunchInTime(0)
                        setPunchOutTime(0)
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                    } else {
                        warningNofity(message)
                        setSelectedShift(0)
                        setFromDate(moment(new Date()))
                        setReason('')
                        setPunchInTime(0)
                        setPunchOutTime(0)
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                    }
                }
            } else {

                const outtime = format(subHours(new Date(punchOutTime), 1), 'yyyy-MM-dd H:mm')
                const result = punchData.findLast((val) => val)
                const dd = isBefore(new Date(result.punch_time), new Date(punchOutTime)) && isAfter(new Date(result.punch_time), new Date(outtime)) || isEqual(new Date(result.punch_time), new Date(outtime)) ? 1
                    : 0

                if (dd === 0) {
                    warningNofity("Can't Apply For One Hour Request!!");
                    setSelectedShift(0)
                    setFromDate(moment(new Date()))
                    setReason('')
                    setPunchInTime(0)
                    setPunchOutTime(0)
                    setCheckInCheck(false)
                    setCheckOutCheck(false)
                } else {
                    const result = await axioslogin.post('/CommonReqst', postData)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        setCount(count + 1)
                        setSelectedShift(0)
                        setFromDate(moment(new Date()))
                        setReason('')
                        setPunchInTime(0)
                        setPunchOutTime(0)
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                    } else {
                        warningNofity(message)
                        setSelectedShift(0)
                        setFromDate(moment(new Date()))
                        setReason('')
                        setPunchInTime(0)
                        setPunchOutTime(0)
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                    }
                }
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: '15%', p: 0.5, mt: 0.2 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            // maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) => setFromDate(date)}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ pl: 0., width: '20%', mt: 0.2 }} >
                    <FormControl
                        fullWidth={true}
                        margin="dense"
                        size='small'
                    >
                        <Select
                            fullWidth
                            variant="outlined"
                            margin='dense'
                            size='small'
                            defaultValue={0}
                            value={selectedShift}
                            onChange={(e, { props }) => {
                                setSelectedShift(e.target.value)
                                //setShiftname(props.children)
                            }}
                        >
                            <MenuItem value={0} disabled>Select Shift</MenuItem>
                            {
                                deptShift?.map((val) => {
                                    return <MenuItem value={val.shiftcode}
                                        name={val.shiftDescription} key={val.shiftcode} >{val.shiftDescription}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: '5%', p: 0.5, mt: 0.5 }} >
                    <CssVarsProvider>
                        <Tooltip title="Select Punch Data" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    getShiftdetail()
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ width: '60%', }}>
                    <Box sx={{ width: '100%', px: 0.5, alignItems: 'center', display: "flex", flexDirection: 'row', }} >
                        <Box sx={{ display: "flex", p: 0.5, flex: 1, alignItems: 'center' }} >
                            <CssVarsProvider>
                                <Sheet variant="outlined" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    flex: 1,
                                    paddingX: 2,
                                    paddingY: 1.15,
                                    borderRadius: 5,
                                    // height: 10,
                                    '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                                }}>
                                    <Checkbox
                                        overlay
                                        label={`After : ${checkIn}`}
                                        variant="outlined"
                                        size="lg"
                                        onChange={(e) => handleChangeCheckInCheck(e)}
                                        checked={checkinBox}
                                    />
                                </Sheet>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", p: 0.5, flex: 1, alignItems: 'center' }} >
                            <CssVarsProvider>
                                <Sheet variant="outlined" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    flex: 1,
                                    paddingX: 2,
                                    paddingY: 1.15,
                                    borderRadius: 5,
                                    // height: 10,
                                    '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                                    // backgroundColor: 'green'
                                }}>
                                    <Checkbox
                                        overlay
                                        label={`Before : ${checkOut}`}
                                        variant="outlined"
                                        size="lg"
                                        onChange={(e) => handleChangeCheckOutCheck(e)}
                                        checked={checkoutBox}
                                    />
                                </Sheet>
                            </CssVarsProvider>
                        </Box>
                    </Box >
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 0.5 }}>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.2 }}>
                    <TextField
                        placeholder="Reason"
                        fullWidth
                        id="fullWidth"
                        size="small"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
                <Box sx={{ px: 0.5, mt: 0.2 }}>
                    <CssVarsProvider>
                        <Tooltip title="Save Request" variant="outlined" placement="top">
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={submitRequest}
                            >
                                Save Request
                            </Button>
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(OneHourRequest) 