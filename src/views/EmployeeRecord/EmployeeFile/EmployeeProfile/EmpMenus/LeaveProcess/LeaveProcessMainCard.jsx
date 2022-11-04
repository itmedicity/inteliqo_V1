import { CssVarsProvider, Typography } from '@mui/joy';
import { Alert, Paper, Button, Divider, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Suspense } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import CustomTypoThree from 'src/views/Component/MuiCustomComponent/CustomTypoThree';
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo';
import _ from 'underscore';
import LeaveCategoryInfo from '../AnnualLeaveInformation/LeaveCategoryInfo';
import LeaveProcessCard from './LeaveProcessCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { getEmployeeCurrentCategoryInfom, getEmployeeCurrentLeaveProcessInfom, processedLeaveList } from './Functions/LeaveProcessFun';


const CarryForwardLeaveTable = React.lazy(() => import('./CarryForwardCard'));
const CasualLeaveTable = React.lazy(() => import('./CasualLeaveCard'));
const CommonLeaveTable = React.lazy(() => import('./CommonLeavesCard'));
const CreditedLeaveTable = React.lazy(() => import('./CreditedLeavesCard'));
const EarnedLeaveTable = React.lazy(() => import('./EarnedLeaveCard'));
const HolidayLeaveTable = React.lazy(() => import('./HolidayLeaveCard'));


const LeaveProcessMainCard = () => {
    const [empCategory, setEmpCategory] = useState({})
    const [empLeaveProcess, setEmpLeaveProcess] = useState({})
    const [processedLveDetl, setprocessedLeaveDetl] = useState({})

    const { id, no } = useParams();
    const employeeIDs = useMemo(() => {
        return {
            em_no: no,
            em_id: id
        }
    }, [id, no])

    useEffect(() => {
        //Set Current Category Infromation 
        getEmployeeCurrentCategoryInfom(employeeIDs.em_no).then((value) => {
            const { success, data } = value.data;
            if (success === 1) {
                setEmpCategory(data[0])
            }
        })

        // Set Current Leave Process table Data if Active or Excist
        getEmployeeCurrentLeaveProcessInfom(employeeIDs).then((value) => {
            const { success, message } = value.data;
            if (success === 1) {
                setEmpLeaveProcess(message[0])
            }
        })

    }, [employeeIDs.em_no])


    const category = useMemo(() => empCategory, [empCategory])
    const leaveProcess = useMemo(() => empLeaveProcess, [empLeaveProcess])
    const processedLeaveDetl = useMemo(() => processedLveDetl, [processedLveDetl])


    useEffect(() => {
        //procedded Leave List
        if (Object.keys(category).length > 0 && Object.keys(leaveProcess).length > 0) {
            processedLeaveList(category, leaveProcess).then((value) => {
                setprocessedLeaveDetl(value)
            })
        } else {
            //Leave Process table is blank or not processed || data status is 'N' inActive
            let processedObj = {
                message: "Leave process is not done for the employee",
                category: 0,
                processedStatus: 0,
                leaveData: []
            }
            setprocessedLeaveDetl(processedObj)
        }
    }, [category, leaveProcess])

    const { leaveData } = processedLeaveDetl;


    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)
    // console.log(state)

    return (
        <CustomLayout title="Leave Process" >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                <LeaveCategoryInfo />
                <Box sx={{ display: 'flex', py: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Paper square sx={{ flex: 1, }} >
                            {/* <Paper square sx={{ flex: 1, minHeight: 150, maxHeight: 200 }} > */}
                            <CustmTypog title={'Leave criterion &  Process Information'} />
                            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }} >
                                    <Box sx={{ display: 'flex', py: 0.5, px: 0.3, height: 30, }}>
                                        <CustomTypoTwo title={'Leave Process'} bgColor='#dfe6e9' />
                                        <Box sx={{ display: 'flex', flex: 1, height: 25 }} >
                                            <Button variant="outlined" sx={{ mx: 0.5, flex: 1, }} >
                                                Process
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ py: 0.5 }} >
                                        <Divider />
                                    </Box>
                                    <Box sx={{ px: 0.5, pb: 0.5 }} >
                                        {
                                            leaveData && leaveData.map((val, ind) => {
                                                return <LeaveProcessCard key={ind} title={val.name} />
                                            })
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                                    <Box sx={{ p: 0.1, }}>
                                        <CustomTypoThree />
                                    </Box>
                                    <Box sx={{ p: 0.1, }}>
                                        <CustomTypoThree />
                                    </Box>
                                    <Box sx={{ p: 0.1, }}>
                                        <CustomTypoThree />
                                    </Box>
                                    <Box sx={{ p: 0.1, }}>
                                        <CustomTypoThree />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', py: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CasualLeaveTable
                                title={'Casual Leave'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <EarnedLeaveTable
                                title={'Earned || Privilage Leave'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', py: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <HolidayLeaveTable
                                title={'Naional & Festival Holiday'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CommonLeaveTable
                                title={'Common Off Days'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', py: 0.5 }} >
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CarryForwardLeaveTable
                                title={'Carry Forward Leave'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CreditedLeaveTable
                                title={'Credited Leaves'}
                                id={employeeIDs.em_no}
                            />
                        </Suspense>
                    </Box>
                </Box>
            </Box>

        </CustomLayout>
    )
}

export default memo(LeaveProcessMainCard)