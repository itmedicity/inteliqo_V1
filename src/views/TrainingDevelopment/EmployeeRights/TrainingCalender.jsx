import React, { memo } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DepartmentalCalender from './DepartmentalCalender';
import InductionCalender from './InductionCalender/InductionCalender';
import TnDDashboardMain from '../TrainingDashboard/TnDViewComponents/TnDDashboardMain';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import DeptDashboardCalenderMain from '../TrainingDashboard/HODInchargeDashboard/DashboardDeptCalender/DeptDashboardCalenderMain';
import StaffDeptCalender from '../TrainingDashboard/HODInchargeDashboard/DashboardDeptCalender/StaffDeptCalender';
import HODInchargeDashboardPage from '../TrainingDashboard/HODInchargeDashboard/DashboardMainPage/HODInchargeDashboardPage';
import EmployeeViewMainPage from '../TrainingDashboard/TrainingEmployeeView/EmployeeViewMainPage';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const TrainingCalender = ({ rights, hod, incharge }) => {
    return (
        <div>
            <Box sx={{ height: screenInnerHeight - 100 }}>
                <Box sx={{ backgroundColor: "pink" }}>
                    <Tabs aria-label="Basic tabs" >
                        <TabList >
                            <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Box><DashboardIcon /></Box>
                                    <Typography>Dashboard</Typography>
                                </Box>
                            </Tab>
                            <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Box><CalendarMonthIcon /></Box>
                                    <Typography>Induction</Typography>
                                </Box>
                            </Tab>
                            <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Box><AppRegistrationIcon /></Box>
                                    <Typography>Departmental</Typography>
                                </Box>
                            </Tab>
                        </TabList>
                        <TabPanel value={0}  >
                            {rights === 1 && (hod === 0 || incharge === 0) ?
                                <TnDDashboardMain /> :

                                (hod === 1 || incharge === 1) && rights === 0 ?
                                    <HODInchargeDashboardPage />
                                    :
                                    <EmployeeViewMainPage />
                            }
                        </TabPanel>
                        <TabPanel value={1}  >
                            {rights === 1 && (hod === 0 || incharge === 0) ?
                                <Box sx={{
                                    width: "100%", overflowX: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }
                                }}>
                                    <InductionCalender />
                                </Box>
                                :

                                (hod === 1 || incharge === 1) && rights === 0 ?
                                    <InductionCalender />
                                    : <InductionCalender />
                            }

                        </TabPanel>
                        <TabPanel value={2}>

                            {rights === 1 && (hod === 0 || incharge === 0) ?
                                <DepartmentalCalender /> :

                                (hod === 1 || incharge === 1) && rights === 0 ?
                                    <DeptDashboardCalenderMain />
                                    : <StaffDeptCalender />
                            }

                        </TabPanel>
                    </Tabs>
                </Box>
            </Box>

        </div>
    )
}

export default memo(TrainingCalender) 
