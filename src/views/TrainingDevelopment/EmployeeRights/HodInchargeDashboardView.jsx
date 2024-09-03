import React, { memo } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import HODInchargeDashboardPage from '../TrainingDashboard/HODInchargeDashboard/DashboardMainPage/HODInchargeDashboardPage';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InductionCalenderFormat from '../TrainingCalender/InductionCalenderFormat';
import HodInchargCalendarView from '../TrainingCalender/HodInchargeDeptCalendar/HodInchargCalendarView';

const HodInchargeDashboardView = () => {
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
                        <HODInchargeDashboardPage />
                    </TabPanel>
                    <TabPanel value={1}  >
                        <InductionCalenderFormat />
                    </TabPanel>
                    <TabPanel value={2}>
                        <HodInchargCalendarView />
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>
    )
}
export default memo(HodInchargeDashboardView) 
