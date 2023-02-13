import { Button, Checkbox, CssVarsProvider } from '@mui/joy'
import { Box, Grid, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import React, { lazy, useCallback } from 'react'
import { useState } from 'react'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CommonLeaveOptionCmp from './Func/CommonLeaveOptionCmp'
import { getCommonLeaveData } from 'src/redux/actions/LeaveReqst.action'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import moment from 'moment'
import { Actiontypes } from 'src/redux/constants/action.type'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { differenceInCalendarDays, intervalToDuration } from 'date-fns'
import { useMemo } from 'react'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect } from 'react'


const SingleLeaveRequestForm = lazy(() => import('./SingleLeaveRequestForm'));
const MultiLeaveRequestForm = lazy(() => import('./MultiLeaveRequestForm'));

const BlankForm = () => {
    return (<Box></Box>)
}

const LeaveRequestForm = () => {
    const { FETCH_SINGLE_LEAVE_REQ_FORM_DATA } = Actiontypes;

    const dispatch = useDispatch()
    const [requestFomOne, setRequestFom] = useState(0)

    const [dateCheckBox, setCheckBx] = useState(false)
    const [singleLeveTypeCheck, setSgleCheck] = useState(false)
    const [fromDate, setFromDate] = useState(moment())
    const [toDate, setToDate] = useState(moment())
    const [commnLevType, setCommnLevType] = useState(0)
    const [commnLevDesc, setCommnLevDesc] = useState('')

    const singleLeaveTypeCheckOption = useCallback((e) => {
        setSgleCheck(e.target.checked)
    })

    // console.log(singleLeveTypeCheck)
    const leaveRequestSubmitFun = useCallback(async () => {

        if (singleLeveTypeCheck === true) {
            // console.log('single leaves')
            if (commnLevType === 0) {
                warningNofity("Please Select The Leave Type")
            } else {
                setRequestFom(true)
                //single Leave type Leave Selection
                if (dateCheckBox === true) {
                    //Single Date Selected

                    let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))
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
                } else {
                    let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))
                    //Date Rage selected
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
                }

            }
        } else {
            setRequestFom(false)
            // console.log('multi leave ')
            //Not a single Leave type Leave Selection
            if (dateCheckBox === true) {
                //Single Date Selected
                let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))
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
            } else {
                //Date Rage selected
                let totalDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate))
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
            }
        }

    }, [fromDate, toDate, singleLeveTypeCheck, commnLevType, dateCheckBox])

    return (
        <Box>
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