import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment';
import React from 'react'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import CustoTypography from 'src/views/Component/MuiCustomComponent/CustoTypography';
import _ from 'underscore';

const LeaveCategoryInform = () => {
    const dataTabStyle = {
        display: 'flex', flex: 1, justifyContent: 'flex-start'
    }
    // Get The Employee information Details from the Reduct Store
    const state = useSelector((state) => state?.getPrifileDateEachEmp?.empPersonalData?.personalData, _.isEqual)

    const categoryInform = {
        employeeNo: state?.em_no,
        contrStatus: state?.contract_status,
        contStartDate: state?.em_cont_start === null ? 'No Data' : moment(new Date(state?.em_cont_start)).format('DD-MM-YYYY'),
        contEndDate: state?.em_cont_end === null ? 'No Data' : moment(new Date(state?.em_cont_end)).format('DD-MM-YYYY'),
        doj: state.contract_status === 1 ? moment(new Date(state.em_cont_start)).format('DD-MM-YYYY') : moment(new Date(state.em_doj)).format('DD-MM-YYYY'),
        employeeCaegoryName: state?.ecat_name?.toLowerCase(),
        Probarion: state?.ecat_prob,
        training: state?.ecat_training,
        probationStart: state?.ecat_prob === 1 ? moment(new Date(state?.em_doj)).format('DD-MM-YYYY') : 'No Data',
        probationEndDate: state?.ecat_prob === 1 ? moment(new Date(state?.em_prob_end_date)).format('DD-MM-YYYY') : 'No Data',
        trainingStart: state?.ecat_training === 1 ? moment(new Date(state?.em_doj)).format('DD-MM-YYYY') : 'No Data',
        trainingEnd: state?.ecat_training === 1 ? moment(new Date(state?.em_prob_end_date)).format('DD-MM-YYYY') : 'No Data',
    }

    return (
        <Paper square sx={{ flex: 1, }} >
            {/* Heading  */}
            <Box sx={{ flex: 1 }} >
                <CustmTypog title="Employee Current Leaves & Category Information" />
            </Box>
            {/* Contenet */}
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1, }} ><CustoTypography title="Employee #" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.employeeNo} /></Box>
                <Box sx={{ flex: 1 }} ><CustoTypography title="Joining Date" fontSize={400} /></Box>
                <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.doj} /></Box>
            </Box>
            {
                categoryInform?.contrStatus === 1 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustoTypography title="Contract Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.contStartDate} /></Box>
                    <Box sx={{ flex: 1, }} ><CustoTypography title="Contract End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.contEndDate} /></Box>
                </Box> : null
            }
            {
                categoryInform.Probarion === 1 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustoTypography title="Probation Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.probationStart} /></Box>
                    <Box sx={{ flex: 1 }} ><CustoTypography title="Probation End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform?.probationEndDate} /></Box>
                </Box> : null
            }
            {
                categoryInform?.training === 1 ? <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                    <Box sx={{ flex: 1 }} ><CustoTypography title="Training Start" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform.trainingStart} /></Box>
                    <Box sx={{ flex: 1 }} ><CustoTypography title="Training End" fontSize={400} /></Box>
                    <Box sx={dataTabStyle} ><CustoTypography title={categoryInform.trainingEnd} /></Box>
                </Box> : null
            }
            <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                <Box sx={{ flex: 1 }} ><CustoTypography title="Current Category" fontSize={400} /></Box>
                <Box sx={dataTabStyle}  ><CustoTypography style={{ textTransform: 'capitalize' }} title={categoryInform.employeeCaegoryName} /></Box>
                <Box sx={{ flex: 1 }} ><CustoTypography title="Leave Period" fontSize={400} /></Box>
                <Box sx={dataTabStyle}  ><CustoTypography style={{ textTransform: 'capitalize' }} title="DD/MM/YYYY - DD/MM/YYYY" /></Box>
            </Box>
        </Paper>
    )
}

export default memo(LeaveCategoryInform)