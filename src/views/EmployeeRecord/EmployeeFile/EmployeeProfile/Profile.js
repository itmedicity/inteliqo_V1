import { Box, createTheme, ThemeProvider, Paper } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MenuList from './MenuList';
import CloseIcon from '@mui/icons-material/Close';
import ProfileCard from './ProfileCard';
import { useHistory, useParams } from 'react-router-dom';
import MenuRenderWind from './MenuRenderWind';
import { useDispatch } from 'react-redux';
import {
    getannualleave,
    getContractDetlEmp,
    notify,
    setAccademicData,
    setExperienceData,
    setPersonalData
} from 'src/redux/actions/Profile.action';
import { setDept } from 'src/redux/actions/Dept.Action'
import { Actiontypes } from 'src/redux/constants/action.type';
import { getStatutoryInfo } from 'src/redux/actions/LeaveProcess.action';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1880
        },
    },
});



const Profile = () => {
    const empCredential = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const { id, no, slno } = empCredential;

    const { FETCH_EMP_MENU_SLNO } = Actiontypes;

    // const toRedirectToHome = () => {
    //     //history.push(`/Home/EmployeeFile`)
    //     history.push(`/Home/EmployeeRecordsAgGrid`)

    // }

    const toRedirectToHome = useCallback(() => {

        if (slno === '1') {
            history.push('/Home/EmpFirstVerification')
        }
        else if (slno === '2') {
            history.push('/Home/EmpSecondVerification')
        }
        else {
            history.push(`/Home/EmployeeRecordsAgGrid`)
        }
        dispatch({ type: FETCH_EMP_MENU_SLNO, payload: 0 })
    }, [slno, id, no])
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(setPersonalData(no))
        dispatch(setAccademicData(id))
        dispatch(setExperienceData(id))
        dispatch(getannualleave(no))
        dispatch(notify(no))
        dispatch(getContractDetlEmp(no))
        dispatch(setDept())
        dispatch(getStatutoryInfo(id));
    }, [id, no, count])
    return (
        // height: { xl: 850, lg: 555, md: 300, sm: 300, xs: 300 }
        <ThemeProvider theme={theme} >
            <Box>
                <Paper square sx={{ display: "flex", flexDirection: "column", }} >
                    <Box sx={{ width: '100%' }} >
                        <Paper square sx={{ display: "flex", height: 30, alignItems: 'center', px: 2, justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <PersonPinIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Personal Record
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='xs' color="danger" onClick={toRedirectToHome}  >
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                    <Box sx={{ display: "flex" }} >
                        <Box sx={{
                            width: { xxl: '15%', xl: '18%', lg: '20%', md: '20%' },
                            height: { xxl: 825, xl: 680, lg: 523, md: 680, sm: 750, xs: 770 },
                            p: 0.5
                        }} >
                            <Paper square sx={{
                                display: "flex",
                                flexDirection: 'column',
                                // backgroundColor: '#EEEFF0',
                                p: 0.5,
                                // backgroundColor: "green",
                                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }
                            }} >
                                {/* Profile Card Section Start */}
                                <ProfileCard />
                                {/* Profile Card Section End */}
                                {/* Menu Section - List item - start */}
                                <MenuList empid={empCredential} />
                                {/* Menu Section - List item - End*/}
                            </Paper>
                        </Box>
                        <Box sx={{
                            //  width: { xxl: '15%', xl: '18%', lg: '20%', md: '20%' },
                            width: { xxl: '85%', xl: '82%', lg: '80%', md: '80%' },
                            // width: '80%',
                            p: 0.5
                        }} >
                            <Paper square sx={{
                                display: "flex",
                                p: 0.5,
                                // backgroundColor: "yellow",
                                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }
                            }} >
                                <MenuRenderWind slno={slno} count={count} setCount={setCount} redirect={toRedirectToHome} />
                            </Paper>
                        </Box>
                    </Box>
                </Paper >
            </Box >
        </ThemeProvider >
    )
}

export default Profile