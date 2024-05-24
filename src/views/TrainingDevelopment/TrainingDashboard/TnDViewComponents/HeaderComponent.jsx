import { Box, } from '@mui/joy';
import { Fragment, React, memo, useEffect } from 'react'
import { Paper } from '@mui/material';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import UpcomingTwoToneIcon from '@mui/icons-material/UpcomingTwoTone';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import { getYear } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';

const HeaderComponent = ({ inductComplt, SetInductComplt, inductPndg, SetInductPndg, inductNext, SetInductNext, DeptComplt, SetDeptComplt, DeptPndg, SetDeptPndg, DeptNext, SetDeptNext, SetInductRetest, SetDeptRetest, SetInductTotal, SetDeptTotal }) => {

    useEffect(() => {
        const year = getYear(new Date())
        const obj = {
            year: year
        }
        const InductCompleted = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductComplete', obj)
            const { success, data } = results.data
            if (success === 1) {
                const compLength = data?.length
                SetInductComplt(compLength);
            }
            else {
                SetInductComplt(0);
            }
        }
        InductCompleted()

        const InductPending = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductPending', obj)
            const { success, data } = results.data
            if (success === 1) {
                const PndgLength = data?.length
                SetInductPndg(PndgLength);
            }
            else {
                SetInductPndg(0);
            }
        }
        InductPending()

        const InductNxtMnthTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductNextMnth', obj)
            const { success, data } = results.data
            if (success === 1) {
                const NextmnthLength = data?.length
                SetInductNext(NextmnthLength);
            }
            else {
                SetInductNext(0);
            }
        }
        InductNxtMnthTrainings()

        const InductRetestTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductRetest', obj)
            const { success, data } = results.data
            if (success === 1) {
                const retestLength = data?.length
                SetInductRetest(retestLength);
            }
            else {
                SetInductRetest(0);
            }
        }
        InductRetestTrainings()

        const InductTotalTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductTotal', obj)
            const { success, data } = results.data
            if (success === 1) {
                const totalLength = data?.length
                SetInductTotal(totalLength);
            }
            else {
                SetInductTotal(0);
            }
        }
        InductTotalTrainings()

        // Departmental
        const DeptCompleted = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptComplete', obj)
            const { success, data } = results.data
            if (success === 1) {
                const compLength = data?.length
                SetDeptComplt(compLength);
            }
            else {
                SetDeptComplt(0);
            }
        }
        DeptCompleted()

        const DeptPending = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptPending', obj)
            const { success, data } = results.data
            if (success === 1) {
                const PndgLength = data?.length
                SetDeptPndg(PndgLength);
            }
            else {
                SetDeptPndg(0);
            }
        }
        DeptPending()

        const DeptNxtMnthTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptNextMnth', obj)
            const { success, data } = results.data
            if (success === 1) {
                const NextmnthLength = data?.length
                SetDeptNext(NextmnthLength);
            }
            else {
                SetDeptNext(0);
            }
        }
        DeptNxtMnthTrainings()

        const DeptRetestTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptRetest', obj)
            const { success, data } = results.data
            if (success === 1) {
                const retestLength = data?.length
                SetDeptRetest(retestLength);
            }
            else {
                SetDeptRetest(0);
            }
        }
        DeptRetestTrainings()

        const DeptTotalTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptTotal', obj)
            const { success, data } = results.data
            if (success === 1) {
                const totalLength = data?.length
                SetDeptTotal(totalLength);
            }
            else {
                SetDeptTotal(0);
            }
        }
        DeptTotalTrainings()


    }, [SetInductComplt, SetInductPndg, SetInductNext, SetDeptComplt, SetDeptPndg, SetDeptNext, SetDeptRetest, SetInductRetest, SetInductTotal, SetDeptTotal])

    return (
        <Fragment>
            <Paper elevation={0} sx={{ width: "100%", boxShadow: 4, backgroundColor: "#FFFFFF" }}>
                <Box >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Box sx={{ flex: 1, textAlign: "center", mt: 1, color: "#0C359E" }}><h6>Induction Training </h6></Box>
                        <Box sx={{ flex: 1, textAlign: "center", mt: 1, color: "#0C359E" }}><h6>Departmental Training </h6></Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", }}>
                        <Box sx={{ p: 1, flex: 1, display: "flex", flexDirection: "row", mx: "auto", flexWrap: "wrap" }}>
                            {/* <Box sx={{ color: "#0C359E", flex: 1, display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "flex-start" }}>
                                <h5>Induction Training </h5>
                            </Box> */}
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <VerifiedTwoToneIcon sx={{ fontSize: 50, color: "#00A9FF" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Completed</h6></Box>
                                    <h6>{inductComplt !== null ? inductComplt : 0}</h6>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <UpcomingTwoToneIcon sx={{ fontSize: 50, color: "#29ADB2" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Upcoming</h6></Box>
                                    <h6>{inductNext !== null ? inductNext : 0}</h6>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <PendingTwoToneIcon sx={{ fontSize: 50, color: "#9D44C0" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Pending</h6></Box>
                                    <h6>{inductPndg !== null ? inductPndg : 0}</h6>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ p: 1, flex: 1, display: "flex", flexDirection: "row", mx: "auto", flexWrap: "wrap" }}>
                            {/* <Box sx={{ flex: 1, color: "#0C359E", display: "flex", textAlign: "center", flexDirection: "row", justifyContent: "flex-start" }}>
                                <h5>Departmental Training</h5>
                            </Box> */}
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <VerifiedTwoToneIcon sx={{ fontSize: 50, color: "#00A9FF" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Completed</h6></Box>
                                    <h6>{DeptComplt !== null ? DeptComplt : 0}</h6>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <UpcomingTwoToneIcon sx={{ fontSize: 50, color: "#29ADB2" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Upcoming</h6></Box>
                                    <h6>{DeptNext !== null ? DeptNext : 0}</h6>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", }}>
                                <Box>
                                    <Box sx={{ mx: "auto" }}>
                                        <PendingTwoToneIcon sx={{ fontSize: 50, color: "#9D44C0" }} />
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Box sx={{ color: "#9BA4B5" }}><h6>Pending</h6></Box>
                                    <h6>{DeptPndg !== null ? DeptPndg : 0}</h6>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(HeaderComponent)
