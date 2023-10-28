import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MenuList from './MenuList';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory, useParams } from 'react-router-dom';
import MenuRenderWind from './MenuRenderWind';
import { useDispatch } from 'react-redux';
import {
    getannualleave,
    getContractDetlEmp,
    notify,
    setAccademicData,
    setExperienceData,
    setPersonalData,

} from 'src/redux/actions/Profile.action';
import { setDept } from 'src/redux/actions/Dept.Action'
import { Actiontypes } from 'src/redux/constants/action.type';
import { getStatutoryInfo } from 'src/redux/actions/LeaveProcess.action';
import { setVaccination } from 'src/redux/actions/Vaccination.Action';

const ProfileCard = React.lazy(() => import('./ProfileCard'))

const Profile = () => {
    const empCredential = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const { id, no, slno } = empCredential;
    const [count, setCount] = useState(0)

    const { FETCH_EMP_MENU_SLNO } = Actiontypes;

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
    }, [slno, history, dispatch, FETCH_EMP_MENU_SLNO])

    useEffect(() => {
        dispatch(setPersonalData(no))
        dispatch(setAccademicData(id))
        dispatch(setExperienceData(id))
        dispatch(getannualleave(no))
        dispatch(notify(no))
        dispatch(getContractDetlEmp(no))
        dispatch(setDept())
        dispatch(getStatutoryInfo(id));
        dispatch(setVaccination(id));
    }, [id, no, dispatch, count])

    return (
        <Box sx={{
            display: "flex",
            flexGrow: 1, bgcolor: 'pink',
            // height: window.innerHeight - 85, 
            width: "100%"
        }} >
            <Paper sx={{
                display: 'flex', flex: 1, height: window.innerHeight - 85,
                flexDirection: 'row', justifyContent: 'space-between',
                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%', backgroundColor: '#EEEFF0' }}>
                    <ProfileCard />
                    <MenuList empid={empCredential} />
                </Box>
                <Box sx={{ display: 'flex', width: '85%', flexDirection: 'column' }}>
                    <Paper square sx={{
                        display: "flex", height: 30, alignItems: 'center', px: 2,
                        justifyContent: "space-between", width: "100%"
                    }} >
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
                    <MenuRenderWind slno={slno} count={count} setCount={setCount} redirect={toRedirectToHome} />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(Profile) 