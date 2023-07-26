import { Button, Checkbox, CssVarsProvider, Sheet, Tooltip } from '@mui/joy'
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import _ from 'underscore'
import { ToastContainer } from 'react-toastify'
import { addHours, format, subHours } from 'date-fns'

const OneHourRequest = () => {

    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section, hod: empHodStat, incharge: empInchrgStat } = selectedEmployeeDetl?.[0];

    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)

    const [shiftTiming, setShiftTiming] = useState([])
    const [punchDetl, setPunchDetl] = useState([])

    const [checkinBox, setCheckInCheck] = useState(false)
    const [checkoutBox, setCheckOutCheck] = useState(false)

    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckout] = useState('00:00');

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);
    const [reason, setReason] = useState('')

    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel


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
            const { success, data } = result.data;
            if (success === 1) {

                // GET SHIFT DATA
                const selectedShiftTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time } = selectedShiftTiming[0]

                const inTime = moment(shft_chkin_time).format('HH:mm:ss');
                const outTime = moment(shft_chkout_time).format('HH:mm:ss');

                setCheckin(moment(shft_chkin_time).format('hh:mm'))
                setCheckout(moment(shft_chkout_time).format('hh:mm'))

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                const chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;
                setPunchInTime(chekIn)
                setPunchOutTime(chekOut)

                const postDataForpunchMaster = {
                    date1: format(addHours(new Date(chekOut), 6), 'yyyy-MM-dd H:mm:ss'),
                    date2: format(subHours(new Date(chekIn), 6), 'yyyy-MM-dd H:mm:ss'),
                    em_no: em_no
                }
                //FETCH THE PUNCH TIME FROM PUNCH DATA
                const result = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster)
                const { success, data } = result.data;
                if (success === 1) {
                    setPunchDetl(data)
                    succesNofity('Done , Select The Punching Info')
                } else {
                    //no record
                    warningNofity('Punching Data Not Found')
                }
            } else {
                warningNofity("'Duty Plan Not Done!")
            }
        }
    }

    useEffect(() => {
        console.log(checkinBox, checkoutBox);
        console.log(punchDetl);
        console.log(punchInTime, punchOutTime);

    }, [checkinBox, checkoutBox, punchInTime, punchOutTime])

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
        checkinBox, checkoutBox])

    const submitRequest = async () => {
        if (checkinBox === false && checkoutBox === false) {
            warningNofity("Check In || Check Out Needs To Check")
        }
        else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        }
        else {
            const result = await axioslogin.post('/CommonReqst', postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message)
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

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: '15%', p: 0.5, mt: 0.2 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={setFromDate}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
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
                        <Tooltip title="Save Request" variant="outlined" color="info" placement="top">
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