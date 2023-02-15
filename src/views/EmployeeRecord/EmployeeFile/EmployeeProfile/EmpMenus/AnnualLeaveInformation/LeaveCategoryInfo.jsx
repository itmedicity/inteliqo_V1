import { Alert, Paper } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment';
import React from 'react'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import CustmTypo_tow from 'src/views/Component/MuiCustomComponent/CustmTypo_tow';
import CustomBtnProcess from 'src/views/Component/MuiCustomComponent/CustomBtnProcess';
import _ from 'underscore';

const LeaveCategoryInfo = () => {
    const dataTabStyle = {
        display: 'flex', flex: 1, justifyContent: 'flex-start'
    }
    // Get The Employee information Details from the Reduct Store
    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)

    // Employee Leave Category Information 
    // des_type === 1 --> 'PROBATION' , des_type === 2 --> 'TRAINING',des_type === 3 --> 'CONFIRMATION' 
    const categoryInform = {
        employeeNo: state.em_no,
        contrStatus: state.contract_status,
        contStartDate: state.em_cont_start === null ? 'No Data' : moment(new Date(state.em_cont_start)).format('DD-MM-YYYY'),
        contEndDate: state.em_cont_end === null ? 'No Data' : moment(new Date(state.em_cont_end)).format('DD-MM-YYYY'),
        doj: state.contract_status === 1 ? moment(new Date(state.em_cont_start)).format('DD-MM-YYYY') : moment(new Date(state.em_doj)).format('DD-MM-YYYY'),
        employeeCaegoryName: state.ecat_name.toLowerCase(),
        empCategSlno: state.category_slno,
        traing_Probarion: state.des_type,
        probationStart: state.des_type === 1 ? moment(new Date(state.em_doj)).format('DD-MM-YYYY') : 'No Data',
        probationEndDate: state.des_type === 1 ? moment(new Date(state.em_prob_end_date)).format('DD-MM-YYYY') : 'No Data',
        trainingStart: state.des_type === 2 ? moment(new Date(state.em_doj)).format('DD-MM-YYYY') : 'No Data',
        trainingEnd: state.des_type === 2 ? moment(new Date(state.em_prob_end_date)).format('DD-MM-YYYY') : 'No Data',
    }

    return (
        <Paper square sx={{ flex: 1, }} >
            {/* Heading  */}
            <Box sx={{ flex: 1 }} >
                <CustmTypog title="Employee Current Leaves & Category Information" />
            </Box>
            {/* Contenet */}
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1, }} ><CustmTypo_tow title="Employee #" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.employeeNo} /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Joining Date" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.doj} /></Box>
            </Box>
            {
                categoryInform.contrStatus === 1 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Contract Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.contStartDate} /></Box>
                    <Box sx={{ flex: 1, }} ><CustmTypo_tow title="Contract End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.contEndDate} /></Box>
                </Box> : null
            }
            {
                categoryInform.traing_Probarion === 1 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Probation Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.probationStart} /></Box>
                    <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Probation End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.probationEndDate} /></Box>
                </Box> : null
            }
            {
                categoryInform.traing_Probarion === 2 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Training Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.trainingStart} /></Box>
                    <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Training End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.trainingEnd} /></Box>
                </Box> : null
            }
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Current Category" fontSize={400} /></Box>
                <Box sx={dataTabStyle}  ><CustmTypo_tow style={{ textTransform: 'capitalize' }} title={categoryInform.employeeCaegoryName} /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Leave Period" fontSize={400} /></Box>
                <Box sx={dataTabStyle}  ><CustmTypo_tow style={{ textTransform: 'capitalize' }} title="DD/MM/YYYY - DD/MM/YYYY" /></Box>
            </Box>
        </Paper>
    )
}

export default memo(LeaveCategoryInfo)