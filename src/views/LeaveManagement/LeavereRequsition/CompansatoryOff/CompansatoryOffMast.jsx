import React, { useCallback, memo } from 'react'
import { Button, Checkbox, CssVarsProvider, Sheet, Textarea, Tooltip, Typography } from '@mui/joy'
import { Box, Grid, Paper, TextField, FormControl, MenuItem, Select, Skeleton } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import _ from 'underscore'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { axioslogin } from 'src/views/Axios/Axios'
import { addDays, addHours, differenceInMinutes, format, subHours } from 'date-fns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Actiontypes } from 'src/redux/constants/action.type'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setCommonSetting } from 'src/redux/actions/Common.Action'

const CompansatoryOffMast = () => {

    const dispatch = useDispatch();
    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;
    useEffect(() => {
        //get holiday current
        dispatch(setCommonSetting())
    }, [dispatch])


    const changeForm = useCallback(() => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }, [dispatch, FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT])

    const [offType, setOffType] = useState(0)
    const [fromDate, setFromDate] = useState(moment())
    const [disShift, serDisShift] = useState(false)
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSdhift] = useState(0)
    const [punchSlno, setPunchSlno] = useState(0)

    const [shiftTiming, setShiftTiming] = useState([])
    const [punchDetl, setPunchDetl] = useState([])

    const [checkinBox, setCheckIn] = useState(false)
    const [checkoutBox, setCheckOut] = useState(false)

    const [disableIn, setDisableIn] = useState(true)
    const [disableOut, setDisableOut] = useState(true)

    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);

    const [disableCheck, setDisableCheck] = useState(true)

    const [selectedShiftTiming, setselectedShiftTiming] = useState({})
    const [reason, setReason] = useState('')

    const handleChangeCoffType = useCallback(async (e, { props }) => {
        const selectedCoffType = e.target.value;
        setOffType(selectedCoffType)
        selectedCoffType === 1 ? serDisShift(false) : serDisShift(true);
    }, [])

    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const { salary_above, week_off_day } = state;
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])

    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel;

    const {
        em_no, em_id, gross_salary,
        em_department, em_dept_section,
        hod: empHodStat,
        //incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0];

    // GET DEPARTMENT WISE SHIFT
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
                    }
                    serDisShift(true)
                } else if (success === 0) {
                    infoNofity(message);
                } else {
                    errorNofity(message)
                }
            }
        }
        getdepartmentShift();
    }, [em_department, em_dept_section])

    const handleChangefetchShift = useCallback(async () => {
        setDisableCheck(false)
        if (offType === 2 && selectedShift !== 0) {
            //GET SHIFT DATA 
            const postData = {
                emp_id: em_id,
                duty_day: moment(fromDate).format('YYYY-MM-DD')
            }

            const result = await axioslogin.post('common/getShiftdetails/', postData);
            const { success, data, message } = result.data;
            if (success === 1) {
                console.log(data);
                const { ot_request_flag, punch_slno, holiday_slno } = data[0];
                setPunchSlno(punch_slno)
                const selectedShiftTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time, shft_cross_day, shift_id } = selectedShiftTiming[0]

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
                }
                // else if (shift_id !== week_off_day) {
                //     warningNofity("Can't Apply for Compensatory Off, Shift Must be Week Off")
                // }
                else {

                    //TO FETCH PUNCH DATA FROM TABLE
                    const postDataForpunchMaster = {
                        date1: shft_cross_day === 0 ? format(addHours(new Date(chekOut), 6), 'yyyy-MM-dd H:mm:ss') : format(addHours(new Date(addDays(new Date(fromDate), 1)), 6), 'yyyy-MM-dd H:mm:ss'),
                        date2: shft_cross_day === 0 ? format(subHours(new Date(chekIn), 6), 'yyyy-MM-dd H:mm:ss') : format(subHours(new Date(fromDate), 6), 'yyyy-MM-dd H:mm:ss'),
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
                    }
                }
            } else {
                warningNofity('Duty Plan Not Done')
            }

        } else {
            warningNofity('Select The Off Type and Shift Feild')
        }
    }, [fromDate, offType, selectedShift, em_id, em_no, shiftTiming, gross_salary, salary_above,
        week_off_day])


    const handleChangeCheckInCheck = useCallback((e) => {
        const checkin = e.target.checked;
        setCheckIn(checkin)
        setDisableIn(!checkin)
    }, [])

    const handleChangeCheckOutCheck = useCallback((e) => {
        const checkout = e.target.checked;
        setCheckOut(checkout)
        setDisableOut(!checkout)
    }, [])


    //submit coff request 

    const handleChangeSubmitCoffRequest = useCallback(async () => {
        const { inCheck, outCheck } = selectedShiftTiming;
        if (punchInTime === 0 || punchOutTime === 0) {
            warningNofity('Please Select In and Out Punch')
        } else if (reason === '') {
            warningNofity('Request Reason Is Mandatory')
        } else {
            if (offType === 2) {
                const coffPostData = {
                    startdate: moment(fromDate).format('YYYY-MM-DD'),
                    punchindata: punchInTime,
                    punchoutdata: punchOutTime,
                    req_type: offType,
                    reqtype_name: offType === 1 ? "C Off" : "Duty Off",
                    durationpunch: differenceInMinutes(new Date(outCheck), new Date(inCheck)),
                    shiftduration: differenceInMinutes(new Date(punchOutTime), new Date(punchInTime)),
                    extratime: differenceInMinutes(new Date(outCheck), new Date(inCheck)),
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
                    shift_id: selectedShift,
                    punchSlno: punchSlno
                }

                const result = await axioslogin.post('/LeaveRequest/insertcompensatyoff', coffPostData)
                const { success, message } = result.data;
                if (success === 1) {
                    succesNofity('C-OFF Request Created SuccessFully')
                    changeForm()
                } else {
                    errorNofity(`Contact EDP , ${JSON.stringify(message)}`)
                    changeForm()
                }
            } else if (offType === 1) {
                // request for extra time convert to c -off
            }
        }

    }, [authorization_hod, hod, authorization_incharge, reason, punchSlno, changeForm,
        empHodStat, em_department, em_dept_section, em_id, em_no, fromDate, incharge, offType, punchInTime,
        punchOutTime, selectedShift, selectedShiftTiming])

    return (
        <Paper
            variant="outlined"
            sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, flexDirection: 'column' }}
        >
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >

                <Box sx={{ display: "flex", p: 0.5 }} >
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
                {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
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
                            name="type"
                            value={offType}
                            onChange={handleChangeCoffType}
                        >
                            <MenuItem value={0} disabled>Select Request Type</MenuItem>
                            {/* <MenuItem value={1} >Covert Over Time To COFF</MenuItem> */}
                            <MenuItem value={2} >Compansatory Off Day</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
                    {
                        disShift === false ?
                            <Skeleton variant="rounded" height={40} sx={{ display: "flex", flex: 1, alignContent: 'stretch' }} />
                            :
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
                                    value={selectedShift}
                                    onChange={(e) => setSdhift(e.target.value)}
                                >
                                    <MenuItem value={0} disabled>Select Shift</MenuItem>
                                    {
                                        deptShift?.map((val) => {
                                            return <MenuItem value={val.shiftcode} key={val.shiftcode} >{val.shiftDescription}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                    }
                </Box>
                <Box>
                    <CssVarsProvider>
                        <Tooltip title="Process" variant="outlined" placement="top">
                            <Button
                                variant="outlined"
                                component="label"
                                size="lg"
                                color="success"
                                onClick={handleChangefetchShift}
                            >
                                <AddBoxIcon />
                            </Button>
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
            </Box>

            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >
                <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
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
                                label={`Check In`}
                                variant="outlined"
                                size="lg"
                                disabled={disableCheck}
                                onChange={(e) => handleChangeCheckInCheck(e)}
                                checked={checkinBox}
                            />
                        </Sheet>
                    </CssVarsProvider>
                </Box>

                {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
                    <FormControl
                        fullWidth={true}
                        margin="dense"
                        size='small'
                        sx={{ display: "flex", flex: 2 }}
                    >
                        <Select
                            fullWidth
                            variant="outlined"
                            margin='dense'
                            size='small'
                            defaultValue={0}
                            disabled={disableIn}
                            value={punchInTime}
                            onChange={useCallback((e) => setPunchInTime(e.target.value), [])}
                        >
                            <MenuItem value={0} disabled>Check In Time</MenuItem>
                            {
                                punchDetl?.map((val, index) => {
                                    return <MenuItem value={val.punch_time} key={index} >{val.punch_time}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
                    <CssVarsProvider>
                        <Sheet variant="outlined"
                            sx={{
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
                                label={`Check Out`}
                                variant="outlined"
                                size="lg"
                                disabled={disableCheck}
                                onChange={(e) => handleChangeCheckOutCheck(e)}
                                checked={checkoutBox}
                            />
                        </Sheet>
                    </CssVarsProvider>
                </Box>

                {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
                    <FormControl
                        fullWidth={true}
                        margin="dense"
                        size='small'
                        sx={{ display: "flex", flex: 2 }}
                    >
                        <Select
                            fullWidth
                            variant="outlined"
                            margin='dense'
                            size='small'
                            defaultValue={0}
                            disabled={disableOut}
                            value={punchOutTime}
                            onChange={useCallback((e) => setPunchOutTime(e.target.value), [])}
                        >
                            <MenuItem value={0} disabled>Check Out Time</MenuItem>
                            {
                                punchDetl?.map((val, index) => {
                                    return <MenuItem value={val.punch_time} key={index} >{val.punch_time}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Box >
            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, p: 0.3 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 6 }} >
                    <CssVarsProvider>
                        <Textarea
                            label="Outlined"
                            placeholder="Reason For Compansatory OFF Request"
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
                            <Tooltip title="Upload Documents" variant="outlined" placement="top">
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
                            <Tooltip title="View Documents" variant="outlined" placement="top">
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
                            <Tooltip title="Save Compansatory Off Request" variant="outlined" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="primary"
                                    onClick={handleChangeSubmitCoffRequest}
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

export default memo(CompansatoryOffMast)  