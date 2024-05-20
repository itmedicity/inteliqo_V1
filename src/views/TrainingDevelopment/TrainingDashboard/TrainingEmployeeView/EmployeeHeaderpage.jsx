import { Box, } from '@mui/joy';
import { Fragment, React, useEffect } from 'react'
import { Paper } from '@mui/material';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import UpcomingTwoToneIcon from '@mui/icons-material/UpcomingTwoTone';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import { getYear, isAfter } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const EmployeeHeaderpage = ({ em_id, inductComplt, SetInductComplt, inductPndg, SetInductPndg, inductNext, SetInductNext, DeptComplt, SetDeptComplt, DeptPndg, SetDeptPndg, DeptNext, SetDeptNext, SetInductRetest, SetDeptRetest, SetInductTotal, SetDeptTotal }) => {

    useEffect(() => {
        const year = getYear(new Date())
        const obj = {
            year: year,
        }
        const Induction = async () => {
            const results = await axioslogin.post('/TrainingDashboard/InductTotal', obj)
            const { success, data } = results.data
            if (success === 1) {
                const completed = data?.filter((val) => val.pretest_status === 1 && val.posttest_status === 1 && val.indct_emp_no === em_id)
                const compLength = completed?.length
                SetInductComplt(compLength);

                const Pending = data?.filter(val => val.training_status === 0 && val.pretest_status === 0 && val.posttest_status === 0 && val.indct_emp_no === em_id);
                const Pendinglen = Pending?.length
                SetInductPndg(Pendinglen);

                const Retest = data?.filter(val => val.pretest_status === 1 && val.posttest_status === 1 && val.retest === 1 && val.indct_emp_no === em_id);
                const Retestlen = Retest?.length
                SetInductRetest(Retestlen);

                const total = data?.filter((val) => val.indct_emp_no === em_id)
                const totallen = total?.length
                SetInductTotal(totallen);

                const Upcoming = data?.filter((val) => {
                    return isAfter(new Date(moment(val.induct_detail_date).format("YYYY-MM-DD")), new Date()) && val.indct_emp_no === em_id
                });

                const Upcominglen = Upcoming?.length
                SetInductNext(Upcominglen);
            }
            else {
                SetInductComplt(0);
                SetInductNext(0)
                SetInductRetest(0)
                SetInductTotal(0)
            }
        }
        Induction()

        // Departmental
        const Departmental = async () => {
            const results = await axioslogin.post('/TrainingDashboard/DeptTotal', obj)
            const { success, data } = results.data
            if (success === 1) {

                const completed = data?.filter(val => val.training_status === 1 && val.posttest_status === 1 && val.emp_name === em_id);
                const completedlen = completed?.length
                SetDeptComplt(completedlen);
                const Pending = data?.filter(val => val.training_status === 0 && val.pretest_status === 0 && val.posttest_status === 0 && val.emp_name === em_id);
                const Pendinglen = Pending?.length
                SetDeptPndg(Pendinglen);

                const Retest = data?.filter(val => val.pretest_status === 1 && val.posttest_status === 1 && val.retest === 1 && val.emp_name === em_id);
                const Retestlen = Retest?.length
                SetDeptRetest(Retestlen);
                const total = data?.filter((val) => val.emp_name === em_id)
                const totallen = total?.length
                SetDeptTotal(totallen);

                const Upcoming = data?.filter((val) => {
                    return isAfter(new Date(moment(val.schedule_date).format("YYYY-MM-DD")), new Date()) && val.emp_name === em_id
                });
                const Upcominglen = Upcoming?.length
                SetDeptNext(Upcominglen);
            }
            else {
                SetDeptComplt(0);
                SetDeptNext(0);
                SetDeptTotal(0);
                SetDeptRetest(0);
                SetDeptPndg(0);
            }
        }
        Departmental()

    }, [em_id, SetInductComplt, SetInductPndg, SetInductNext, SetDeptComplt, SetDeptPndg, SetDeptNext, SetDeptRetest, SetInductRetest, SetInductTotal, SetDeptTotal])

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

export default EmployeeHeaderpage
