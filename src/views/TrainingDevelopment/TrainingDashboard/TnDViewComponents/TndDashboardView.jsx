import React, { memo } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TnDDashboardMain from './TnDDashboardMain';
import InductionCalender from '../../InductionTrainingCalender/InductionCalender';
import DepartmentalCalender from '../../EmployeeRights/DepartmentalCalender';

const TndDashboardView = () => {
    return (
        <Box sx={{ height: screenInnerHeight - 80 }}>
            <Tabs >
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
                    <TnDDashboardMain />

                </TabPanel>
                <TabPanel value={1}  >
                    <Box sx={{
                        width: "100%", overflowX: 'auto',
                        '::-webkit-scrollbar': { display: "none" }
                    }}>
                        <InductionCalender />
                    </Box>

                </TabPanel>
                <TabPanel value={2}>
                    <DepartmentalCalender />
                </TabPanel>
            </Tabs>
        </Box>

    )
}

export default memo(TndDashboardView) 
