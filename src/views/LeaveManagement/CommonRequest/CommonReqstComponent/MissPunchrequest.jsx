
import { Button, Checkbox, CssVarsProvider, Sheet, Tooltip } from '@mui/joy'
import { Box, TextareaAutosize, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getDutyPlannedShiftForHalfDayRequest } from 'src/redux/actions/LeaveReqst.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import _ from 'underscore'

const MissPunchrequest = () => {

    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section, hod: empHodStat, incharge: empInchrgStat } = selectedEmployeeDetl?.[0];

    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState(moment())
    const [shiftDesc, setShiftDesc] = useState('Data Not Found');
    const [shiftData, setShiftData] = useState({})
    const [reason, setReason] = useState('')

    const [checkInCheck, setCheckInCheck] = useState(false);
    const [checkOutCheck, setCheckOutCheck] = useState(false);

    const [checkIn, setCheckin] = useState('00:00');
    const [checkOut, setCheckOut] = useState('00:00');

    useEffect(() => {
        if (moment(fromDate).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
            console.log("equal");
            setShiftDesc('Data Not Found')
            setCheckin('00:00')
            setCheckOut('00:00')
            setCheckInCheck(false)
            setCheckOutCheck(false)
        } else {
            console.log("not equal");
            const postData = {
                startDate: moment(fromDate).format('YYYY-MM-DD'),
                em_id: em_id
            }
            dispatch(getDutyPlannedShiftForHalfDayRequest(postData));
        }
    }, [fromDate, em_id, dispatch])

    const handleChangeDate = useCallback((date) => {
        setFromDate(date)
        setCheckInCheck(false)
        setCheckOutCheck(false)
    }, [])

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

    const shiftInformation = useSelector((state) => state.getDutyPlannedShift.shiftInformation, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel

    useEffect(() => {
        setShiftData(shiftInformation?.[0])
    }, [shiftInformation])

    const {
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

    const handleChangeMissPunchRequest = async () => {
        if (shiftInformation?.length === 0 || shiftInformation?.[0]?.shift_id === 1) {
            warningNofity("Duty Not Planned For the Selected Date")
        }
        else if (checkInCheck === false && checkOutCheck === false) {
            warningNofity("Check In || Check Out Needs To Check")
        }
        else if (reason === '') {
            warningNofity("Reason Is Mandatory")
        }
        else {
            const misspunchReqPostData = {
                em_id: em_id,
                em_no: em_no,
                dept_id: em_department,
                dept_sect_id: em_dept_section,
                request_date: moment(new Date).format('YYYY-MM-DD'),
                miss_punch_day: moment(fromDate).format('YYYY-MM-DD'),  // mispunch date
                shift_id: shift_id,
                checkinflag: checkInCheck === true ? 1 : 0,
                check_in: checkInCheck === true ? `${moment(fromDate).format('YYYY-MM-DD')} ${moment(shft_chkin_time).format('HH:mm')}` : '0000-00-00 00:00:00',
                checkoutflag: checkOutCheck === true ? 1 : 0,
                check_out: checkOutCheck === true ? `${moment(fromDate).format('YYYY-MM-DD')} ${moment(shft_chkout_time).format('HH:mm')}` : '0000-00-00 00:00:00',
                reason: reason,
                create_date: moment(new Date).format('YYYY-MM-DD'),
                incharge_req_status:
                    (authorization_incharge === 1 && incharge === 1) ? 1 :
                        (authorization_incharge === 1 && incharge === 0) ? 1 :
                            (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                incharge_approval_status:
                    (authorization_incharge === 1 && incharge === 1) ? 1 :
                        (hod === 1) ? 1 :
                            (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                incharge_approval_comment:
                    (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                        (hod === 1) ? "DIRECT" :
                            (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
                incharge_approval_date:
                    (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                        (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                            (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                hod_req_status:
                    (authorization_hod === 1 && hod === 1) ? 1 :
                        (authorization_hod === 1 && hod === 0) ? 1 :
                            (authorization_hod === 0 && hod === 1) ? 1 : 0,
                hod_approval_status:
                    (authorization_hod === 1 && hod === 1) ? 1 :
                        (authorization_hod === 0 && hod === 1) ? 1 : 0,
                hod_approval_comment:
                    (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                        (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
                hod_approval_date:
                    (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                        (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                ceo_req_status: empHodStat === 1 ? 1 : 0,
                hr_req_status: 1,
            }
            let dataSecond = {
                date: moment(fromDate).format('YYYY-MM-DD'),
                em_id: em_id
            }
            const result = await axioslogin.post('/CommonReqst/check/misspunchreq', dataSecond)
            const { success, data } = result.data
            if (success === 1) {
                const { np_hr_apprv_status } = data[0]
                if (np_hr_apprv_status === 1) {
                    const result = await axioslogin.post('/CommonReqst/enablemispunch/create', misspunchReqPostData)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        setShiftDesc('Data Not Found')
                        setCheckin('00:00')
                        setCheckOut('00:00')
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                        setReason('')
                    } else {
                        warningNofity(message)
                        setShiftDesc('Data Not Found')
                        setCheckin('00:00')
                        setCheckOut('00:00')
                        setCheckInCheck(false)
                        setCheckOutCheck(false)
                        setReason('')
                    }
                } else {
                    warningNofity("HR Approval Process Not Completed! Please Contact HRD")
                }
            } else {
                warningNofity("No Miss Request Exist for this Employee!")
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flex: 1, p: 0.5, alignItems: 'center' }} >
                <Box sx={{ display: "flex", p: 0.2 }} >
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
                            '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
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
                        <Sheet
                            variant="outlined" sx={{
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
            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, p: 0.3 }}>
                <Box sx={{ display: 'flex', flex: 6 }} >
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex" }}
                        minRows={2}
                        placeholder="Reason For  Request"
                        value={reason}
                        name="reason"
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
                <Box sx={{ pl: 1, pt: 0.5 }}>
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
        </Fragment >
    )
}

export default memo(MissPunchrequest)