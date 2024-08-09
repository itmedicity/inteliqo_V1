import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type';

const DOFFRequestMain = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState('1')

    const { FETCH_EMP_MENU_SLNO } = Actiontypes;

    useEffect(() => {
        dispatch({ type: FETCH_EMP_MENU_SLNO, payload: 0 })
    }, [dispatch])

    const state = useSelector((state) => state.getMenuRenderCompRights.slno)
    console.log(state);

    const handleChange = useCallback((e, newValue) => {
        console.log(newValue);
        setValue(newValue)
    }, [])

    return (
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </>
    )
}

export default memo(DOFFRequestMain) 