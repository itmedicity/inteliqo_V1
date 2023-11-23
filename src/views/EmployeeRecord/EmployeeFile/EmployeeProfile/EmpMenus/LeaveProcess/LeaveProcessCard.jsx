import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
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
    getEmployeeProcessStartAndEndDate,
    insertCommonLeaves,
    insertEarnLeaves,
    insertHolidayFun,
    updateCasualLeave,
    updateCommonLeaves,
    updateEarnLeaves,
    updateHolidayLeaves,
} from './Functions/LeaveProcessFun'

import { Actiontypes } from 'src/redux/constants/action.type'
const { UPDATE_CASUAL_LEAVE } = Actiontypes

const LeaveProcessCard = ({ data, category }) => {
    const dispatch = useDispatch()

    const [statutory_esi, setStatutoryEsi] = useState(0)

    // const holiday = useSelector((state) => state.getHolidayList, _.isEqual)
    // const commonLve = useSelector((state) => state.getCommonLeave, _.isEqual)
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
    // const categoryData = useMemo(() => category, [category])
    const empCategoryProcessDetl = useMemo(() => empCategoryProcess, [empCategoryProcess])

    //{ 1-> 'Casual Leave', 2-> 'Common Leave', 3-> 'Privilege Leave', 4-> 'Holiday' }

    //const holidayList = useMemo(() => holiday, [holiday])
    // const commonLeave = useMemo(() => commonLve, [commonLve])

    // Processed table data 'hrm_leave_process' table
    const {
        name,
        value,
        leave,
        lv_process_slno,
        em_id,
        em_no,
        // category_slno,
        // process_updatedate,
        // hrm_clv,
        // hrm_ern_lv,
        // hrm_hld,
        // hrm_cmn,
        // hrm_process_status,
        // next_updatedate,
    } = LeaveProcessedData

    // category Details
    const {
        // em_category,
        // em_contract_end_date,
        // em_retirement_date,
        // em_prob_end_date,
        // ecat_cont,
        // ecat_prob,
        ecat_esi_allow,
        // ecat_confere,
        // ecat_lop,
        // ecat_sl,
        em_doj,
        // ecat_mate,
    } = category

    let buttonDisableStatus = value === 0 ? false : true;
    let bgColor = value === 0 ? false : true;

    /***
     * 1-> Leave Start Date and End Date Calculation
     * 2-> Periodic date calculation Based on start and end date
     * 3-> Get Yearly holiday list for update Holidays ( Only after setting the yeary holiday allow holiday process )
     * 4-> Get Common leave details from database
     *
     */

    const leaveCreditProcessFun = async (leaveName) => {
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
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 117' + err) })

                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -119' + err) })

                }
                else if (leaveName === 2) {
                    //Common Off days Leave Credit option
                    updateCommonLeaves(lv_process_slno, em_id, em_no, em_gender, ecat_esi_allow, statutory_esi).then((values) => {
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
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 136' + err) })
                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 138' + err) })

                }
                else if (leaveName === 3) {
                    // Earn Leave Process and Leave Crediting
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
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -152' + err) })

                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 154' + err) })

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
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -174 ' + err) })

                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!!line 177' + err) })

                }
            }

        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -182' + err) })
    }

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
