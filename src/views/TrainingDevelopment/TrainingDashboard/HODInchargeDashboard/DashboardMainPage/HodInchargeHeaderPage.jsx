import { Box } from '@mui/joy';
import { Fragment, React, memo, useEffect } from 'react'
import { Paper } from '@mui/material';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import UpcomingTwoToneIcon from '@mui/icons-material/UpcomingTwoTone';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import { getYear, isAfter } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const HodInchargeHeaderPage = ({ em_department, DeptComplt, SetDeptComplt, DeptPndg, SetDeptPndg, DeptNext, SetDeptNext, SetDeptRetest, SetDeptTotal }) => {
    useEffect(() => {
        const year = getYear(new Date())
        const obj = {
            year: year,
            em_department: em_department
        }

        // Departmental
        const HODInchargeDeptTrainings = async () => {
            const results = await axioslogin.post('/TrainingDashboard/HodInchargeDeptOverview', obj)
            const { success, data } = results.data
            if (success === 1) {
                const displayData = data?.map((val) => {
                    const obj = {
                        training_status: val.training_status,
                        posttest_status: val.posttest_status,
                        pretest_status: val.pretest_status,
                        retest: val.retest,
                        date: moment(val.schedule_date).format("YYYY-MM-DD")
                    }
                    return obj
                })
                const completed = displayData.filter(val => val.training_status === 1 && val.posttest_status === 1);
                const completedlen = completed?.length
                SetDeptComplt(completedlen);
                const Pending = displayData.filter(val => val.training_status === 0 && val.posttest_status === 0 && val.pretest_status === 0);
                const Pendinglen = Pending?.length
                SetDeptPndg(Pendinglen);

                const Retest = displayData.filter(val => val.posttest_status === 1 && val.pretest_status === 1 && val.retest === 1);
                const Retestlen = Retest?.length
                SetDeptRetest(Retestlen);

                const totallen = displayData?.length
                SetDeptTotal(totallen);

                const Upcoming = displayData.filter((val) => {
                    return isAfter(new Date(val.date), new Date())
                });
                const Upcominglen = Upcoming?.length
                SetDeptNext(Upcominglen);
            }
            else {
                SetDeptComplt(0);
                SetDeptPndg(0)
                SetDeptRetest(0)
                SetDeptTotal(0)
                SetDeptNext(0)

            }
        }
        HODInchargeDeptTrainings()


    }, [em_department, SetDeptPndg, SetDeptComplt, SetDeptRetest, SetDeptTotal, SetDeptNext])

    return (
        <Fragment>
            <Paper elevation={0} sx={{ width: "100%", boxShadow: 4, backgroundColor: "#FFFFFF" }}>
                <Box sx={{ p: 1, display: "flex", mx: "auto", flexDirection: "row", flexWrap: "wrap" }}>
                    <Box sx={{ width: "80%", p: 1, display: "flex", mx: "auto", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>

                        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                        <Box sx={{ display: "flex", flexDirection: "row", }}>
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

            </Paper>
        </Fragment >
    )
}

export default memo(HodInchargeHeaderPage) 
