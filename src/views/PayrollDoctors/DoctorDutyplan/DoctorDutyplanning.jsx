import React, { lazy, memo, useEffect } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Tab, TabList, TabPanel, Tabs, Typography, tabClasses, } from '@mui/joy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import { setDepartment } from 'src/redux/actions/Department.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { useDispatch } from 'react-redux';

const CalendarView = lazy(() => import('./CalendarDutyplanning'))
const DateWiseView = lazy(() => import('./DateWiseDutyplanning'))

const DoctorDutyplanning = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting())
    }, [dispatch])

    const menuList = [
        //  { slno: 1, name: 'Doctor Wise Dutyplan', component: <TestComp />, icon: <LocalHospitalTwoToneIcon color='warning' /> },

        { slno: 1, name: 'Doctor Wise Dutyplan', component: <CalendarView />, icon: <LocalHospitalTwoToneIcon color='warning' /> },
        { slno: 2, name: 'Date Wise Dutyplan', component: <DateWiseView />, icon: <CalendarMonthIcon color='secondary' /> },
    ]

    return (

        <CustomLayout title="Doctor Dutyplan" displayClose={true} >
            <Box sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: 0.3,
                borderRadius: 'md',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },

            }}>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    sx={{ bgcolor: 'transparent', px: 1 }}
                    size="sm"
                >
                    <TabList
                        tabFlex={1}
                        variant="outlined"
                        disableUnderline
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                            },
                        }}
                    >
                        {
                            menuList?.map((val, ind) => {
                                return <Tab
                                    key={ind}
                                    disableIndicator
                                    sx={{ backgroundColor: '#DBEAF8' }}
                                >
                                    {val?.icon}
                                    <Typography level="title-md" sx={{ fontSize: 14.5 }} >{val?.name}</Typography>
                                </Tab>
                            })
                        }
                    </TabList>
                    {
                        menuList?.map((val, ind) => {
                            return <TabPanel
                                key={ind}
                                value={ind}
                                sx={{ p: 0 }}
                            >
                                {val?.component}
                            </TabPanel>
                        })
                    }
                </Tabs>
            </Box>
        </CustomLayout>
    )
}

export default memo(DoctorDutyplanning) 