import { Badge, Box, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import HeaderComponent from './HeaderComponent';
import TrainingOverviewPage from './TrainingOverviewPage';
import ApprovalPage from './ApprovalPage';
import QRCodepage from './QRCodepage';
import TrainingList from './TrainingList';
import TrainingLineChart from './TrainingLineChart';
import TrainingBarGraph from './TrainingBarGraph';
// import TrainingCarousel from './TrainingCarousel';
import DeptTrainingOverview from './DeptTrainingOverview';
import DepartmentalQRPage from './DepartmentalQRPage';
import PendingNReschedule from './PendingNReschedule';
import PendingViewModal from './PendingViewModal';
import { useDispatch, useSelector } from 'react-redux';
import { NewJoiners } from 'src/redux/actions/Training.Action';
import _ from 'underscore';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const TnDDashboardMain = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(NewJoiners());
    }, [dispatch])

    const [openmodal, setopenmodal] = useState(false)
    const [pendingmodal, Setpendingmodal] = useState(false)
    const [inductComplt, SetInductComplt] = useState(0)
    const [inductPndg, SetInductPndg] = useState(0)
    const [inductNext, SetInductNext] = useState(0)
    const [InductRetest, SetInductRetest] = useState(0)
    const [InductTotal, SetInductTotal] = useState(0)
    const [DeptComplt, SetDeptComplt] = useState(0)
    const [DeptPndg, SetDeptPndg] = useState(0)
    const [DeptNext, SetDeptNext] = useState(0)
    const [DeptRetest, SetDeptRetest] = useState(0)
    const [DeptTotal, SetDeptTotal] = useState(0)

    const OpenSchedulePage = useCallback(() => {
        setopenmodal(true)
    }, [setopenmodal])

    const PendingEmpView = useCallback(() => {
        Setpendingmodal(true)
    }, [Setpendingmodal])

    const joinees = useSelector((state) => state?.gettrainingData?.newJoiners?.newJoinersList, _.isEqual);

    const len = joinees.length

    return (
        <Fragment>
            {
                openmodal === true ? <PendingNReschedule openmodal={openmodal} setopenmodal={setopenmodal} />
                    : pendingmodal === true ? <PendingViewModal len={len} joinees={joinees} pendingmodal={pendingmodal} Setpendingmodal={Setpendingmodal} />
                        :
                        <Box sx={{ width: "100%", p: 0.5, overflowX: "auto", height: screenInnerHeight - 200, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Box sx={{ width: "99%" }}>
                                <HeaderComponent
                                    inductComplt={inductComplt} SetInductComplt={SetInductComplt} inductPndg={inductPndg} SetInductPndg={SetInductPndg} inductNext={inductNext} SetInductNext={SetInductNext} DeptComplt={DeptComplt} SetDeptComplt={SetDeptComplt} DeptPndg={DeptPndg} SetDeptPndg={SetDeptPndg} DeptNext={DeptNext} SetDeptNext={SetDeptNext} SetInductRetest={SetInductRetest} SetDeptRetest={SetDeptRetest} SetDeptTotal={SetDeptTotal} SetInductTotal={SetInductTotal}
                                />
                                <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 3, flexWrap: "wrap", }}>
                                    {/* <TrainingCarousel /> */}
                                    <TrainingList />

                                    <TrainingOverviewPage
                                        inductComplt={inductComplt} inductPndg={inductPndg} inductNext={inductNext} InductRetest={InductRetest} InductTotal={InductTotal} />
                                </Box>
                                <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 3, flexWrap: "wrap" }}>
                                    <TrainingLineChart />
                                    <TrainingBarGraph />
                                </Box>
                                <Box sx={{ mt: 2, width: "100%", gap: 3, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                    <Box sx={{ flex: 1 }}>
                                        <ApprovalPage />
                                    </Box>
                                    <DeptTrainingOverview DeptComplt={DeptComplt} DeptPndg={DeptPndg} DeptNext={DeptNext} DeptRetest={DeptRetest} DeptTotal={DeptTotal} />
                                    <Paper elevation={0} sx={{ flex: 1, boxShadow: 4, p: 1, backgroundColor: "#FFFFFF", }}>
                                        <Box sx={{ mt: 3 }}>
                                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                                                <Box>
                                                    <Button onClick={OpenSchedulePage} sx={{ color: "white", backgroundColor: "#77037B" }} startDecorator={<AddIcon />}>
                                                        <Typography color="white">Schedule New Trainings</Typography>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ mt: 3 }}>
                                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                                                <Box>
                                                    <Badge badgeContent={len} sx={{ cursor: "pointer", color: "#7037B" }} onClick={PendingEmpView}>
                                                        <Button sx={{ color: "white", backgroundColor: "#77037B" }} startDecorator={<FormatListBulletedIcon />}>
                                                            <Typography color="white">Pending Employees List   </Typography>
                                                        </Button>
                                                    </Badge>

                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>
                                <Box sx={{ mt: 2, width: "100%", }}>
                                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap", }}>
                                        <Box sx={{ flex: 1, marginBottom: 1 }}>
                                            <QRCodepage />
                                        </Box>
                                        <Box sx={{ flex: 1, marginBottom: 1 }}>
                                            <DepartmentalQRPage />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box >
            }
        </Fragment >
    )
}

export default memo(TnDDashboardMain) 
