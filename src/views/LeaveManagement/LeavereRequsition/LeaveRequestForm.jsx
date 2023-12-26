import { Button, Checkbox, CssVarsProvider } from '@mui/joy'
import { Box, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import React, { lazy, useCallback } from 'react'
import { useState } from 'react'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CommonLeaveOptionCmp from './Func/CommonLeaveOptionCmp'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import moment from 'moment'
import { Actiontypes } from 'src/redux/constants/action.type'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { differenceInCalendarDays, differenceInDays } from 'date-fns'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import _ from 'underscore'

const SingleLeaveRequestForm = lazy(() => import('./SingleLeaveRequestForm'));
const MultiLeaveRequestForm = lazy(() => import('./MultiLeaveRequestForm'));

const BlankForm = () => {
    return (<Box></Box>)
}

const LeaveRequestForm = ({ em_id }) => {
    const { FETCH_SINGLE_LEAVE_REQ_FORM_DATA } = Actiontypes;

    const dispatch = useDispatch()
    const [requestFomOne, setRequestFom] = useState(0)
    const [backDrop, setBackDrop] = useState(false)

    const [dateCheckBox, setCheckBx] = useState(false)
    const [singleLeveTypeCheck, setSgleCheck] = useState(false)
    const [fromDate, setFromDate] = useState(moment())
    const [toDate, setToDate] = useState(moment())
    const [commnLevType, setCommnLevType] = useState(0)
    const [commnLevDesc, setCommnLevDesc] = useState('')

    useEffect(() => {
        dispatch(setCommonSetting())
    }, [dispatch])


    const singleLeaveTypeCheckOption = useCallback((e) => {
        setSgleCheck(e.target.checked)
    }, [])

    //for hide the single and multiple leave request form while checking the check box
    useEffect(() => {
        if (singleLeveTypeCheck === false || singleLeveTypeCheck === true) {
            setRequestFom(0)
        }
    }, [singleLeveTypeCheck, dateCheckBox])

    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const { leave_count } = state;

    const leaveRequestSubmitFun = useCallback(async () => {

        if (fromDate > toDate && dateCheckBox === true) {
            warningNofity("To Date Should be Greater Than From Date")
        } else {
            //for single leave 
            if (singleLeveTypeCheck === true) {
                if (differenceInDays(new Date(), new Date(fromDate)) > 3) {
                    warningNofity("Can't Apply for Leave Request, limitted days exceeded!!")
                }
                else if (commnLevType === 0) {
                    warningNofity("Please Select The Leave Type")
                } else {
                    setRequestFom(true)

                    if (dateCheckBox === true) {
                        //MULTI DATE SELECTED FOR SINGLE LEAVE
                        setBackDrop(true)
                        let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))
                        const postData = {
                            fromDate: moment(fromDate).format('YYYY-MM-DD'),
                            toDate: moment(toDate).format('YYYY-MM-DD'),
                            empId: em_id
                        }

                        const checkDutyPlan = await axioslogin.post('/plan/checkDutyExcist', postData);
                        const { success, data } = checkDutyPlan.data;
                        if (success === 1) {

                            let db_count = data.plan;
                            let dateCount = totalDays + 1

                            if (db_count === dateCount) {

                                let postFormDataDbleDate = {
                                    dateRangeCheck: dateCheckBox,
                                    fromDate: moment(fromDate).format('YYYY-MM-DD'),
                                    toDate: moment(toDate).format('YYYY-MM-DD'),
                                    singleLevCheck: singleLeveTypeCheck,
                                    singleLeaveType: commnLevType,
                                    singleLeaveDesc: commnLevDesc,
                                    totalDays: totalDays + 1,
                                    formSubmit: true
                                }

                                dispatch({ type: FETCH_SINGLE_LEAVE_REQ_FORM_DATA, payload: postFormDataDbleDate })
                                setBackDrop(false)
                            } else {
                                setBackDrop(false)
                                setRequestFom(0)
                                warningNofity('chosen date have no duty schedule. First, complete the duty plan')
                            }
                        }

                    } else {
                        //SINGLE DATE SELECTED FOR SINGLE LEAVE
                        let totalDays = differenceInCalendarDays(new Date(fromDate), new Date(fromDate))

                        const postData = {
                            fromDate: moment(fromDate).format('YYYY-MM-DD'),
                            toDate: moment(fromDate).format('YYYY-MM-DD'),
                            empId: em_id
                        }

                        const checkDutyPlan = await axioslogin.post('/plan/checkDutyExcist', postData);
                        const { success, data } = checkDutyPlan.data;
                        if (success === 1) {
                            let db_count = data.plan;
                            let dateCount = totalDays + 1

                            if (db_count === dateCount) {
                                let postFormDataSgleDate = {
                                    dateRangeCheck: dateCheckBox,
                                    fromDate: moment(fromDate).format('YYYY-MM-DD'),
                                    toDate: moment(fromDate).format('YYYY-MM-DD'),
                                    singleLevCheck: singleLeveTypeCheck,
                                    singleLeaveType: commnLevType,
                                    singleLeaveDesc: commnLevDesc,
                                    totalDays: totalDays + 1,
                                    formSubmit: true
                                }

                                dispatch({ type: FETCH_SINGLE_LEAVE_REQ_FORM_DATA, payload: postFormDataSgleDate })
                                setBackDrop(false)
                            } else {
                                setBackDrop(false)
                                setRequestFom(0)
                                warningNofity('chosen date have no duty schedule. First, complete the duty plan')
                            }
                        }
                    }
                }
            } else {
                setRequestFom(false)
                if ((differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1) > 3) {
                    warningNofity("You Can't apply leave for more than 3 days!!")
                } else {
                    //Not a single Leave type Leave Selection
                    if (dateCheckBox === true) {
                        //MULTI DATE SELECTED 
                        let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))

                        const postData = {
                            fromDate: moment(fromDate).format('YYYY-MM-DD'),
                            toDate: moment(toDate).format('YYYY-MM-DD'),
                            empId: em_id
                        }

                        const checkDutyPlan = await axioslogin.post('/plan/checkDutyExcist', postData);
                        const { success, data } = checkDutyPlan.data;
                        if (success === 1) {
                            let db_count = data.plan;
                            let dateCount = totalDays + 1

                            if (db_count === dateCount) {

                                let postFormDataSgleDate = {
                                    dateRangeCheck: dateCheckBox,
                                    fromDate: moment(fromDate).format('YYYY-MM-DD'),
                                    toDate: moment(toDate).format('YYYY-MM-DD'),
                                    singleLevCheck: singleLeveTypeCheck,
                                    singleLeaveType: commnLevType,
                                    singleLeaveDesc: commnLevDesc,
                                    totalDays: totalDays + 1,
                                    formSubmit: true
                                }

                                dispatch({ type: FETCH_SINGLE_LEAVE_REQ_FORM_DATA, payload: postFormDataSgleDate })
                                setBackDrop(false)
                            } else {
                                setBackDrop(false)
                                setRequestFom(0)
                                warningNofity('chosen date have no duty schedule. First, complete the duty plan')
                            }
                        }
                    } else {
                        //MULTI DATE SELECTED
                        let totalDays = differenceInCalendarDays(new Date(fromDate), new Date(fromDate))

                        const postData = {
                            fromDate: moment(fromDate).format('YYYY-MM-DD'),
                            toDate: moment(toDate).format('YYYY-MM-DD'),
                            empId: em_id
                        }

                        const checkDutyPlan = await axioslogin.post('/plan/checkDutyExcist', postData);
                        const { success, data } = checkDutyPlan.data;
                        if (success === 1) {
                            let db_count = data.plan;
                            let dateCount = totalDays + 1

                            if (db_count === dateCount) {

                                let postFormDataSgleDate = {
                                    dateRangeCheck: dateCheckBox,
                                    fromDate: moment(fromDate).format('YYYY-MM-DD'),
                                    toDate: moment(fromDate).format('YYYY-MM-DD'),
                                    singleLevCheck: singleLeveTypeCheck,
                                    singleLeaveType: commnLevType,
                                    singleLeaveDesc: commnLevDesc,
                                    totalDays: totalDays + 1,
                                    formSubmit: true
                                }

                                dispatch({ type: FETCH_SINGLE_LEAVE_REQ_FORM_DATA, payload: postFormDataSgleDate })
                                setBackDrop(false)
                            } else {
                                setBackDrop(false)
                                setRequestFom(0)
                                warningNofity('chosen date have no duty schedule. First, complete the duty plan')
                            }
                        }
                    }
                }

            }
        }

    }, [fromDate, toDate, singleLeveTypeCheck, commnLevType, dateCheckBox, em_id,
        FETCH_SINGLE_LEAVE_REQ_FORM_DATA, commnLevDesc, dispatch, leave_count])

    return (
        <Box>
            <CustomBackDrop open={backDrop} text="Please Wait ! Verifying the Duty Schedule for the Selected Date" />
            <Paper variant="outlined" sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, alignItems: 'center' }} >
                <Box sx={{ display: "flex", px: 1 }} >
                    <CssVarsProvider>
                        <Checkbox
                            color="danger"
                            label="Date Range"
                            size="lg"
                            variant="outlined"
                            checked={dateCheckBox}
                            onChange={(e) => setCheckBx(e.target.checked)}
                        />
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: "flex", p: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) => setFromDate(date)
                                // dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                {
                    dateCheckBox && <Box sx={{ display: "flex", p: 0.5 }} >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                views={['day']}
                                inputFormat="DD-MM-YYYY"
                                value={toDate}
                                minDate={fromDate}
                                onChange={(date) =>
                                    setToDate(date)
                                    // dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                                }
                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                }
                <Box sx={{ display: "flex", px: 1 }} >
                    <CssVarsProvider>
                        <Checkbox
                            color="danger"
                            label="Leave Type"
                            size="lg"
                            variant="outlined"
                            checked={singleLeveTypeCheck}
                            onChange={(e) => singleLeaveTypeCheckOption(e)}
                        />
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: "flex", flex: 1, px: 1 }} >
                    <CommonLeaveOptionCmp
                        active={singleLeveTypeCheck}
                        setCommonLeve={setCommnLevType}
                        value={commnLevType}
                        setLeaveDesc={setCommnLevDesc}
                    />
                </Box>
                <Box sx={{ display: "flex", p: 0.2 }} >
                    <CssVarsProvider>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={leaveRequestSubmitFun}
                            sx={{
                                // color: '#90caf9'
                            }} >
                            <PublishedWithChangesIcon />
                        </Button>
                    </CssVarsProvider>
                </Box>
            </Paper >
            {
                requestFomOne === true ? < SingleLeaveRequestForm /> : requestFomOne === false ? <MultiLeaveRequestForm /> : <BlankForm />
            }
        </Box>
    )
}

export default memo(LeaveRequestForm)