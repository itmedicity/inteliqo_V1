import React, { memo } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InductionCalender from './InductionCalender/InductionCalender';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import DeptDashboardCalenderMain from '../TrainingDashboard/HODInchargeDashboard/DashboardDeptCalender/DeptDashboardCalenderMain';
import StaffDeptCalender from '../TrainingDashboard/HODInchargeDashboard/DashboardDeptCalender/StaffDeptCalender';
import HODInchargeDashboardPage from '../TrainingDashboard/HODInchargeDashboard/DashboardMainPage/HODInchargeDashboardPage';
import EmployeeViewMainPage from '../TrainingDashboard/TrainingEmployeeView/EmployeeViewMainPage';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EmpTrainingRecords from '../TrainingDashboard/TrainingEmployeeView/EmpTrainingRecords';
import ArticleIcon from '@mui/icons-material/Article';

const TrainingCalender = ({ rights, hod, incharge }) => {
    return (
        <Box sx={{ height: screenInnerHeight - 100 }}>
            <Box sx={{ backgroundColor: "pink" }}>
                <Tabs aria-label="Basic tabs" >
                    <TabList >
                        <Tab disableIndicator sx={{ width: "25%", height: 80 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><DashboardIcon /></Box>
                                <Typography level='6'>Dashboard</Typography>
                            </Box>
                        </Tab>
                        {
                            hod === 0 && incharge === 0 ?
                                <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Box><ArticleIcon /></Box>
                                        <Typography level='6'>Employee Training Details</Typography>
                                    </Box>
                                </Tab> : null
                        }

                        <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><CalendarMonthIcon /></Box>
                                <Typography level='6'>Induction</Typography>
                            </Box>
                        </Tab>
                        <Tab disableIndicator sx={{ width: "30%", height: 80 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><AppRegistrationIcon /></Box>
                                <Typography level='6'>Departmental</Typography>
                            </Box>
                        </Tab>
                    </TabList>
                    <TabPanel value={0}  >
                        {
                            (hod === 1 || incharge === 1) && rights === 0 ?
                                <HODInchargeDashboardPage />
                                :
                                <EmployeeViewMainPage />
                        }
                    </TabPanel>
                    {
                        hod === 0 && incharge === 0 ?
                            <TabPanel value={1}  >
                                <EmpTrainingRecords />
                            </TabPanel>
                            : null}
                    <TabPanel value={2}  >
                        {
                            <InductionCalender />
                        }
                    </TabPanel>
                    <TabPanel value={3}>
                        {
                            (hod === 1 || incharge === 1) && rights === 0 ?
                                <DeptDashboardCalenderMain />
                                : <StaffDeptCalender />
                        }
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>

    )
}

export default memo(TrainingCalender) 
