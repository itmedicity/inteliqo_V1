import * as React from 'react';
import Box from '@mui/joy/Box';
import { CssVarsProvider } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import { CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom';
import { colorList } from 'src/views/Constant/Constant';

const TestCmp = ({ widgetName, count, status, slno, indx }) => {
    const history = useHistory()

    const Leaverequest = () => {
        history.push(`/Home/ApprovalHR`)
    }
    const LeaveUser = () => {
        history.push(`/Home/LeaveUser`)
    }
    const LeaveIncharge = () => {
        history.push(`/Home/ApprovalIncharge`)
    }
    const LeaveHOD = () => {
        history.push(`/Home/ApprovalHOD`)
    }
    const LeaveCEO = () => {
        history.push(`/Home/ApprovalCEO`)
    }

    const Otrequest = () => {
        history.push(`/Home/OTApprovalHR`)
    }
    const Otinch = () => {
        history.push(`/Home/OTApprovalIncharge`)
    }
    const Othod = () => {
        history.push(`/Home/OTApprovalHOD`)
    }
    const Otceo = () => {
        history.push(`/Home/OTApprovalCEO`)
    }
    const Otuser = () => {
        history.push(`/Home/OtUser`)
    }
    const Resign = () => {
        history.push(`/Home/ResignationApprovalHR`)
    }
    const ResignInch = () => {
        history.push(`/Home/ResignationApprovalIncharge`)
    }
    const ResignHod = () => {
        history.push(`/Home/ResignationApprovalHod`)
    }
    const ResignCeo = () => {
        history.push(`/Home/ResignationApprovalCEO`)
    }
    const RegistRenew = () => {
        history.push(`/Home/RegistrationRenew`)
    }

    const ContractRenew = () => {
        history.push(`/Home/Contract_end_details`)
    }
    const Training = () => {
        history.push(`/Home/TrainingEnd`)
    }
    const Contractclose = () => {
        history.push(`/Home/ContractEnd`)
    }
    const ProbationEnd = () => {
        history.push(`/Home/ProbationEnd`)
    }
    const Annual = () => {
        history.push(`/Home/AnnualAppraisalList`)
    }
    // const ContractAppraisal = () => {

    // }

    const AppraisalHod = () => {
        history.push(`/Home/AppraisalApprovalHOD`)
    }

    const AppraisalIncharge = () => {
        history.push(`/Home/AppraisalApproveIncharge`)
    }

    const AppraisalCEO = () => {
        history.push(`/Home/AppraisalApprovalCEO`)
    }

    const HrAppraisal = () => {
        history.push(`/Home/HRAppraisalList`)
    }

    const EsiNotAddedEmp = () => {
        history.push(`/Home`)
    }

    const notificationListWindow = (slno) => {

        return slno === 133 && Leaverequest ||
            slno === 135 && LeaveIncharge ||

            slno === 134 && LeaveUser ||

            slno === 136 && LeaveHOD ||
            slno === 137 && LeaveCEO ||

            slno === 141 && Otrequest ||
            slno === 142 && Otuser ||
            slno === 143 && Otinch ||
            slno === 144 && Othod ||
            slno === 145 && Otceo ||

            slno === 146 && Resign ||
            slno === 147 && ResignInch ||
            slno === 148 && ResignHod ||
            slno === 149 && ResignCeo ||
            slno === 154 && RegistRenew ||

            slno === 138 && ContractRenew ||
            slno === 140 && Contractclose ||
            slno === 139 && Training ||
            slno === 187 && ProbationEnd ||
            slno === 188 && Annual ||
            // slno === 196 && ContractAppraisal ||

            slno === 215 && AppraisalHod ||
            slno === 216 && AppraisalIncharge ||
            slno === 217 && AppraisalCEO ||
            slno === 219 && HrAppraisal ||
            slno === 238 && EsiNotAddedEmp
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Paper elevation={3} sx={{
                width: "100%",
                p: 0.5,
                display: "flex",
                direction: "row",
            }} >
                <Box sx={{
                    display: "flex",
                    borderRadius: 10,
                    boxShadow: 8
                }} >
                    <CssVarsProvider>
                        <IconButton
                            variant="outlined"
                            size='lg'
                            color="success"
                            sx={{ borderColor: colorList[indx] }}
                            onClick={notificationListWindow(slno)}
                        >
                            {status === true ? <CircularProgress sx={{ color: 'pink' }} /> : count}
                        </IconButton>
                    </CssVarsProvider>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "lightgreen",
                    justifyContent: "space-around"
                }}>
                    <Box sx={{ px: 0.5 }} >
                        <CssVarsProvider>
                            {/* <Typography fontWeight="md" textColor="success" mb={0.5}>
                            Yosemite Parksdasdasdasdas
                        </Typography> */}
                            <Typography
                                level="body2"
                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                color="success"
                            >
                                {widgetName}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default React.memo(TestCmp)