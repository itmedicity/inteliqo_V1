import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo'
import _ from 'underscore'
import {
    casualLeaveInsertFun,
    getEarnLvCategory,
    getEmployeeProcessStartAndEndDate,
    insertCommonLeaves,
    insertEarnLeaves,
    insertHolidayFun,
    updateCasualLeave,
    updateCommonLeaves,
    updateEarnLeaves,
    updateEarnLeavesAfterRenewal,
    updateHolidayLeaves,
} from './Functions/LeaveProcessFun'

import { Actiontypes } from 'src/redux/constants/action.type'
import { differenceInDays, eachMonthOfInterval, endOfYear, format } from 'date-fns'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
const { UPDATE_CASUAL_LEAVE } = Actiontypes

const LeaveProcessCard = ({ data, category }) => {

    const dispatch = useDispatch()

    const [statutory_esi, setStatutoryEsi] = useState(0)

    //employee category and contract detailed based on after hrm_leave_process
    const empCategoryProcess = useSelector((state) => state?.getEmployeeProcessRecord?.ProcessRecord, _.isEqual,)

    const statutory = useSelector((state) => state?.setStatutoryInfo?.data, _.isEqual)
    const esiInfo = useMemo(() => statutory, [statutory])

    useEffect(() => {
        if (Object.keys(esiInfo).length !== 0) {
            const { em_esi_status } = esiInfo[0]
            setStatutoryEsi(em_esi_status)
        } else {
            setStatutoryEsi(0)
        }
    }, [esiInfo])

    const LeaveProcessedData = useMemo(() => data, [data])
    const empCategoryProcessDetl = useMemo(() => empCategoryProcess, [empCategoryProcess])

    //{ 1-> 'Casual Leave', 2-> 'Common Leave', 3-> 'Privilege Leave', 4-> 'Holiday' }

    // Processed table data 'hrm_leave_process' table
    const {
        name,
        value,
        leave,
        lv_process_slno,
        em_id,
        em_no,
    } = LeaveProcessedData

    // category Details
    const {
        actual_doj,
        em_doj,
    } = category

    let buttonDisableStatus = value === 0 ? false : true;
    let bgColor = value === 0 ? false : true;

    const getcommonSettings = useSelector((state) => getEarnLvCategory(state, category))
    const cateStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    /***
     * 1-> Leave Start Date and End Date Calculation
     * 2-> Periodic date calculation Based on start and end date
     * 3-> Get Yearly holiday list for update Holidays ( Only after setting the yeary holiday allow holiday process )
     * 4-> Get Common leave details from database
     *
     */

    const leaveCreditProcessFun = useCallback(async (leaveName) => {
        //{ 1-> 'Casual Leave', 2-> 'Common Leave', 3-> 'Privilege Leave', 4-> 'Holiday' }

        getEmployeeProcessStartAndEndDate(empCategoryProcessDetl).then((calulatedProcessDate) => {
            const { em_gender } = empCategoryProcessDetl;
            const { status } = calulatedProcessDate;
            if (status === 0) {
                warningNofity('Invalid Dates Showing ! ,Please check the Joining Dates')
            } else {

                if (leaveName === 1) {
                    // Casual Leave Process and Leave Crediting
                    updateCasualLeave(calulatedProcessDate, lv_process_slno, em_id, em_no).then((value) => {
                        //insert Casula Leave function
                        Object.keys(value).length > 0 && casualLeaveInsertFun(value, lv_process_slno).then((value) => {
                            let { status, message } = value;
                            if (status === 1) {
                                infoNofity(message)
                                dispatch({ type: UPDATE_CASUAL_LEAVE })
                            } else {
                                warningNofity(message)
                            }
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 110' + err) })
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -111' + err) })
                }
                else if (leaveName === 2) {
                    //Common Off days Leave Credit option
                    updateCommonLeaves(lv_process_slno, em_id, em_no, em_gender, statutory_esi, category).then((values) => {
                        const { status, data } = values;
                        //insert Common Leaves
                        if (status === 1) {
                            insertCommonLeaves(data, lv_process_slno).then((messages) => {
                                let { status, message } = messages;
                                if (status === 1) {
                                    infoNofity(message)
                                    dispatch({ type: UPDATE_CASUAL_LEAVE })
                                } else {
                                    warningNofity(message)
                                }
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 127' + err) })
                        } else {
                            warningNofity('Error ! ,Contact Edp !!! line - 129')
                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 131' + err) })
                }
                else if (leaveName === 3) {

                    // Calculate the difference in days between the current date and the actual date of joining (DOJ)
                    const result = differenceInDays(new Date(), new Date(actual_doj))

                    // Check if the category status is true and the difference in days is greater than 365
                    if (cateStatus === true && result > 365) {
                        // Proceed with updating earn leaves
                        updateEarnLeavesAfterRenewal(calulatedProcessDate, lv_process_slno, em_id, em_no).then(async (dateRange) => {

                            // const today = format(subYears(new Date(), 1), 'yyyy-MM-dd')
                            // // Define start and end dates for the leave process
                            const startDate = format(new Date(actual_doj), 'yyyy-MM-dd')
                            const endDate = endOfYear(new Date(actual_doj))
                            // Generate an array of dates for each month in the interval from start to end date
                            let earnLeaveDateRange = eachMonthOfInterval({
                                start: new Date(startDate),
                                end: new Date(endDate),
                            })
                            // Process each month in the leave date range
                            let processedEarnLeaveList = earnLeaveDateRange && earnLeaveDateRange.map((value, index) => {
                                const leaveDay = format(new Date(value), 'yyyy-MM-dd')
                                // Return the formatted leave day with necessary data
                                return {
                                    em_no: em_no,
                                    ernlv_mnth: leaveDay,
                                    ernlv_year: leaveDay,
                                    ernlv_allowed: 1,  // Allow 1 day of leave
                                    ernlv_credit: 1,   // Credit 1 day of leave
                                    ernlv_taken: 0,    // No leave taken
                                    lv_process_slno: lv_process_slno,
                                    update_user: employeeIdNumber(), // Get employee ID for update
                                    em_id: em_id,
                                    credit_status: 1,   // Credit status is 1
                                    credit_year: format(new Date(), 'yyyy'), // Current year
                                }
                            }).filter((val) => val !== false) // Filter out any false values

                            // Send the processed data to the server to insert leave records
                            const result = await axioslogin.post('/yearleaveprocess/insertPrevious', processedEarnLeaveList);
                            const { success, message } = result.data
                            // Check if the insertion was successful
                            if (success === 1) {
                                //insert privilege leaves
                                insertEarnLeaves(dateRange, lv_process_slno, em_doj, em_no).then((msage) => {
                                    let { status, message } = msage;
                                    // Show notification based on the status of the leave insertion
                                    if (status === 1) {
                                        infoNofity(message)
                                        dispatch({ type: UPDATE_CASUAL_LEAVE })
                                    } else {
                                        warningNofity(message)
                                    }
                                }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -186' + err) })
                            } else {
                                warningNofity(message)
                            }
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 190' + err) })
                    } else {

                        updateEarnLeaves(calulatedProcessDate, lv_process_slno, em_id, em_no).then((dateRange) => {
                            //insert privilege leaves
                            insertEarnLeaves(dateRange, lv_process_slno, em_doj, em_no).then((msage) => {
                                let { status, message } = msage;
                                if (status === 1) {
                                    infoNofity(message)
                                    dispatch({ type: UPDATE_CASUAL_LEAVE })
                                } else {
                                    warningNofity(message)
                                }
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -198' + err) })
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 199' + err) })
                    }
                }
                else if (leaveName === 4) {

                    // National And Festival Holiday
                    updateHolidayLeaves(calulatedProcessDate, lv_process_slno, em_id, em_no, em_doj).then((value) => {
                        //insert function holiday
                        let { status, data } = value;
                        if (status === 0) {
                            warningNofity("Holiday List Not Updted For Current Year")
                        } else if (Object.keys(data).length === 0) {
                            warningNofity("Holidays Not Available For Updates")
                        } else {
                            Object.keys(value).length > 0 && insertHolidayFun(data, lv_process_slno).then((values) => {
                                let { status, message } = values;
                                if (status === 1) {
                                    infoNofity(message)
                                    dispatch({ type: UPDATE_CASUAL_LEAVE })
                                } else {
                                    warningNofity(message)
                                }
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -226 ' + err) })
                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!!line 228' + err) })
                }
            }
        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -231' + err) })
    }, [actual_doj, cateStatus, category, dispatch, em_doj, em_id, em_no, empCategoryProcessDetl,
        lv_process_slno, statutory_esi])

    return (
        <Box sx={{ display: 'flex', p: 0.3, height: 30 }}>
            <CustomTypoTwo title={name} updateStatus={bgColor} />
            <Box sx={{ display: 'flex', height: 25, width: '30%', pt: 0.05 }}>
                <Button
                    variant="outlined"
                    sx={{ mx: 0.5, flex: 1, mt: 0.01 }}
                    disabled={buttonDisableStatus}
                    onClick={() => leaveCreditProcessFun(leave)}
                >
                    Process
                </Button>
            </Box>
        </Box>
    )
}

export default memo(LeaveProcessCard)
