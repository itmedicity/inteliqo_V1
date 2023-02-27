import React, { useCallback, memo } from 'react'
import { Button, Checkbox, CssVarsProvider, Sheet, Textarea, Tooltip, Typography } from '@mui/joy'
import { Box, Grid, Paper, TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react'
import { getDutyPlannedShiftForHalfDayRequest } from 'src/redux/actions/LeaveReqst.action'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import _ from 'underscore'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { axioslogin } from 'src/views/Axios/Axios'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Actiontypes } from 'src/redux/constants/action.type'

const MissPunchRequest = () => {

    const dispatch = useDispatch();
    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    const changeForm = () => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }

    const [fromDate, setFromDate] = useState(moment())
    const [shiftData, setShiftData] = useState({})

    const [shiftDesc, setShiftDesc] = useState('Data Not Found');
    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckOut] = useState('00:00');

    const [checkInCheck, setCheckInCheck] = useState(false);
    const [checkOutCheck, setCheckOutCheck] = useState(false);

    const [reason, setReason] = useState('')

    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel, _.isEqual);

    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])

    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = empApprovalLevel[0]

    // console.log(hod, incharge)

    const {
        em_no, em_id,
        em_department, em_dept_section,
        hod: empHodStat, incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0];

    const handleChangeDate = useCallback((date) => {
        setFromDate(date)
        setCheckInCheck(false)
        setCheckOutCheck(false)
    })


    useEffect(() => {
        setShiftDesc('Data Not Found')
        setCheckin('00:00')
        setCheckOut('00:00')
        setCheckInCheck(false)
        setCheckOutCheck(false)
        const postData = {
            startDate: moment(fromDate).format('YYYY-MM-DD'),
            em_id: em_id
        }
        dispatch(getDutyPlannedShiftForHalfDayRequest(postData));
    }, [fromDate, em_id])

    const shiftInformation = useSelector((state) => state.getDutyPlannedShift.shiftInformation, _.isEqual);

    useEffect(() => {
        setShiftData(shiftInformation?.[0])
    }, [shiftInformation])

    const {
        plan_slno,
        shift_id,
        shft_desc,
        shft_chkin_time,
        shft_chkout_time,
    } = shiftData || {};

    useEffect(() => {
        if (shiftInformation?.length === 0 || shiftInformation?.[0]?.shift_id === 1) {
            warningNofity("Duty Not Planned For the Selected Date")
        } else {
            setShiftDesc(shft_desc)
            setCheckin(moment(shft_chkin_time).format('hh:mm'))
            setCheckOut(moment(shft_chkout_time).format('hh:mm'))
        }
    }, [shiftInformation, shft_desc, shft_chkin_time, shft_chkout_time])

    const handleChangeCheckInCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckInCheck(true)
            setCheckOutCheck(false)
        }
    })

    const handleChangeCheckOutCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setCheckOutCheck(true)
            setCheckInCheck(false)
        }
    })

    const handleChangeMissPunchRequest = useCallback(async () => {
        if (shiftInformation?.length === 0 || shiftInformation?.[0]?.shift_id === 1) {
            warningNofity("Duty Not Planned For the Selected Date")
        } else if (checkInCheck === false && checkOutCheck === false) {
            warningNofity("Check In || Check Out Needs To Check")
        } else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        } else {

            const misspunchReqPostData = {
                checkinflag: checkInCheck === true ? 1 : 0,
                checkintime: checkInCheck === true ? `${moment(fromDate).format('YYYY-MM-DD')} ${moment(shft_chkin_time).format('HH:mm')}` : '0000-00-00 00:00:00',
                checkoutflag: checkOutCheck === true ? 1 : 0,
                checkouttime: checkOutCheck === true ? `${moment(fromDate).format('YYYY-MM-DD')} ${moment(shft_chkout_time).format('HH:mm')}` : '0000-00-00 00:00:00',
                nopunchdate: moment(fromDate).format('YYYY-MM-DD'),  // mispunch date
                plan_slno: plan_slno,
                shift_id: shift_id,
                crted_user: em_id,
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
                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                inc_apprv_cmnt:
                    (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                        (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
                inc_apprv_time:
                    (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
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
            }

            let postDataForGetAttendMarking = {
                empNo: em_no,
                fromDate: moment(fromDate).format('YYYY-MM-DD'),
                toDate: moment(fromDate).format('YYYY-MM-DD')
            }

            //Checking attendance marking is saved in  current month || start of month b/w current date 
            const result = await axioslogin.post('/attedancemarkSave/check', postDataForGetAttendMarking)
            const { success } = result.data;
            if (success === 1) {
                warningNofity("Attendance Marking Processed ! Contact HRD")
            } else {

                const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', misspunchReqPostData)
                const { success, message } = result.data;
                if (success === 1) {
                    succesNofity(message)
                    changeForm()
                } else if (success === 2) {
                    warningNofity(message)
                    changeForm()
                } else {
                    errorNofity(` Contact IT ${JSON.stringify(message)}`)
                    changeForm()
                }
            }

        }
    }, [shiftInformation, reason, checkInCheck, checkOutCheck])

    return (
        <Paper
            variant="outlined"
            sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, flexDirection: 'column' }}
        >
            <Box sx={{ display: "flex", flex: 1, p: 0.5, alignItems: 'center' }} >

                <Box sx={{ display: "flex", p: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={handleChangeDate}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                <Box sx={{ display: "flex", p: 0.2, flex: 1 }} >
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled
                        value={shiftDesc}
                        onChange={() => { }}
                        sx={{ display: 'flex', mt: 0.5 }}
                    />
                </Box>

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
                                label={`Check In : ${checkIn}`}
                                variant="outlined"
                                size="lg"
                                onChange={(e) => handleChangeCheckInCheck(e)}
                                checked={checkInCheck}
                            />
                        </Sheet>
                    </CssVarsProvider>
                </Box>
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
                                label={`Check Out : ${checkOut}`}
                                variant="outlined"
                                size="lg"
                                onChange={(e) => handleChangeCheckOutCheck(e)}
                                checked={checkOutCheck}
                            />
                        </Sheet>
                    </CssVarsProvider>
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
                                    onClick={handleChangeMissPunchRequest}
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

export default memo(MissPunchRequest)