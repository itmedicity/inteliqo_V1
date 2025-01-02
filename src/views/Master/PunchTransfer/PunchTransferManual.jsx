import { Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy';
import { Box } from '@mui/material';
import React, { lazy, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import GroupIcon from '@mui/icons-material/Group';

const AllTransfer = lazy(() => import('./PunchTransfer'))
const EmployeeTransfer = lazy(() => import('./EmployeePunchTransfer'))

const PunchTransferManual = () => {
    const [menurights, setMenurights] = useState([])

    //all menu slno
    const modulerights = useSelector((state) => state?.getModuleRightList?.modulerightsList)

    //static menu rights
    const menuList = [
        { slno: 320, name: 'Punch Transfer', component: <AllTransfer />, icon: <GroupIcon color='warning' /> },
        { slno: 321, name: 'Employee ID Wise Punch Transfer', component: <EmployeeTransfer />, icon: <AccessibilityIcon color='secondary' /> },
    ]

    useEffect(() => {
        let array = menuList?.filter((value) => {
            return modulerights?.find((val) => {
                return value.slno === val.menu_slno;
            })
        });
        setMenurights(array)
    }, [])
    return (
        <CustomLayout title="Punch Transfer Manual" displayClose={true} >
            <Box sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: 0.3,
                borderRadius: 'md',
                boxShadow: 'lg',
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
                            menurights?.map((val, ind) => {
                                return <Tab
                                    key={ind}
                                    disableIndicator
                                    sx={{ backgroundColor: '#DBEAF8' }}
                                >
                                    {val.icon}
                                    <Typography level="title-md" sx={{ fontSize: 14.5 }} >{val.name}</Typography>
                                </Tab>
                            })
                        }
                    </TabList>
                    {
                        menurights?.map((val, ind) => {
                            return <TabPanel
                                key={ind}
                                value={ind}
                                sx={{ p: 0 }}
                            >
                                {val.component}
                            </TabPanel>
                        })
                    }
                </Tabs>
            </Box>
        </CustomLayout>
    )
}

export default memo(PunchTransferManual) 