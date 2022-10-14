import { Alert, Paper } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment';
import React from 'react'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import CustmTypo_tow from 'src/views/Component/MuiCustomComponent/CustmTypo_tow';
import CustomBtnProcess from 'src/views/Component/MuiCustomComponent/CustomBtnProcess';

const LeaveCategoryInfo = ({ empNumber }) => {
    const dataTabStyle = {
        display: 'flex', flex: 1, justifyContent: 'center'
    }
    // Get The Employee information Details from the Reduct Store
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })

    // Employee Leave Category Information 
    // des_type === 1 --> 'PROBATION' , des_type === 2 --> 'TRAINING',des_type === 3 --> 'CONFIRMATION' 
    const categoryInform = {
        contrStatus: state.contract_status,
        contStartDate: state.em_cont_start === null ? 'No Data' : moment(new Date(state.em_cont_start)).format('DD-MM-YYYY'),
        contEndDate: state.em_cont_end === null ? 'No Data' : moment(new Date(state.em_cont_end)).format('DD-MM-YYYY'),
        doj: state.em_doj,
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
                <CustmTypog title="Leave Category Information" />
            </Box>
            {/* Contenet */}
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Contract Start" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.contStartDate} /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Contract End" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.contEndDate} /></Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Probation Start" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.probationStart} /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Probation End" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.probationEndDate} /></Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Training Start" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.trainingStart} /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Training End" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title={categoryInform.trainingEnd} /></Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Current Category" fontSize={400} /></Box>
                <Box sx={{ flex: 2 }}  ><CustmTypo_tow style={{ textTransform: 'capitalize' }} title={categoryInform.employeeCaegoryName} /></Box>
            </Box>
            {/* <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Leave Process" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustmTypo_tow title="21-10-2022" /></Box>
                <Box sx={{ flex: 1 }} ><CustmTypo_tow title="Next Process" fontSize={400} /></Box>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }} ><CustmTypo_tow title="21-10-2022" /></Box>
            </Box> */}
            {/* <Box sx={{ display: 'flex', flex: 1, py: 0.5, alignItems: 'center' }} >
                <Box sx={{ flex: 5, p: 0.5 }} >
                    <Alert
                        variant="outlined"
                        severity="success"
                        sx={{ py: 0 }}
                    >
                        CAtegory Cahanged you needs to process
                    </Alert>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }} ><CustomBtnProcess style={{ p: 1 }} /></Box>
            </Box> */}
        </Paper>
    )
}

export default memo(LeaveCategoryInfo)