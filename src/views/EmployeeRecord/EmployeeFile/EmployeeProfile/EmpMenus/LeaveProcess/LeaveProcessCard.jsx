import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo'
import _ from 'underscore'
import { getEmployeeProcessStartAndEndDate } from './Functions/LeaveProcessFun'

const LeaveProcessCard = ({ data, category }) => {

    const holiday = useSelector((state) => state.getHolidayList, _.isEqual)
    const commonLve = useSelector((state) => state.getCommonLeave, _.isEqual)
    //employee category and contract detailed based on after hrm_leave_process
    const empCategoryProcess = useSelector((state) => state.getEmployeeProcessRecord.ProcessRecord, _.isEqual)

    const LeaveProcessedData = useMemo(() => data, [data]);
    const categoryData = useMemo(() => category, [category]);
    const empCategoryProcessDetl = useMemo(() => empCategoryProcess, [empCategoryProcess]);


    //{ 1-> 'Casual Leave', 2-> 'Common Leave', 3-> 'Privilege Leave', 4-> 'Holiday' }

    const holidayList = useMemo(() => holiday, [holiday]);
    const commonLeave = useMemo(() => commonLve, [commonLve]);

    // Processed table data 'hrm_leave_process' table
    const {
        name,
        value,
        leave,
        lv_process_slno,
        em_no,
        category_slno,
        process_updatedate,
        hrm_clv,
        hrm_ern_lv,
        hrm_hld,
        hrm_cmn,
        hrm_process_status,
        next_updatedate } = LeaveProcessedData;

    // category Details 
    const {
        em_category,
        em_contract_end_date,
        em_retirement_date,
        em_prob_end_date,
        ecat_cont,
        ecat_prob,
        ecat_esi_allow,
        ecat_confere,
        ecat_lop,
        ecat_sl,
        em_doj,
        ecat_mate
    } = category;

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
        getEmployeeProcessStartAndEndDate(empCategoryProcessDetl).then((value) => {
            // console.log(value)
        })

    }

    return (
        <Box sx={{ display: 'flex', p: 0.3, height: 30, }}>
            <CustomTypoTwo title={name} updateStatus={bgColor} />
            <Box sx={{ display: 'flex', height: 25, width: '30%', pt: 0.05 }} >
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