import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { Box } from '@mui/material';
import React, { lazy, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';

const COFFPage = lazy(() => import('./RequestComponents/CompensatoryRequest'))
const NightOffPage = lazy(() => import('./RequestComponents/NightOffrequest'))
const DoffPage = lazy(() => import('./RequestComponents/Doffrequest'))
const Commonpage = lazy(() => import('./RequestComponents/CommonRequest'))
const OverTimePage = lazy(() => import('./RequestComponents/OvertimeRequest'))

const OffrequestCombinePage = () => {

    const [menurights, setMenurights] = useState([])

    //all menu slno
    const modulerights = useSelector((state) => state?.getModuleRightList?.modulerightsList)

    //static menu rights
    const menuList = [
        { slno: 285, name: 'Credit Off Request', component: <COFFPage /> },
        { slno: 236, name: 'Night Off Request', component: <NightOffPage /> },
        { slno: 300, name: 'DOFF Request', component: <DoffPage /> },
        { slno: 239, name: 'Common Request', component: <Commonpage /> },
        { slno: 31, name: 'Over Time Request', component: <OverTimePage /> },
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
        <CustomLayout title="OFF Request" displayClose={true} >
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
                    aria-label="Basic tabs" defaultValue={0}
                >
                    <TabList tabFlex={1} variant="plain">
                        {
                            menurights?.map((val, ind) => {
                                return <Tab key={ind} color='success' >{val.name}</Tab>
                            })
                        }
                    </TabList>
                    {
                        menurights?.map((val, ind) => {
                            return <TabPanel key={ind} value={ind}>
                                {val.component}
                            </TabPanel>
                        })
                    }
                </Tabs>
            </Box>
        </CustomLayout>
    )
}

export default memo(OffrequestCombinePage) 