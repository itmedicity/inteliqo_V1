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
import {
    checkContractStatus,
    getEmployeeCurrentCategoryInfom,
    getEmployeeCurrentLeaveProcessInfom,
    processedLeaveList,
    newProcessedEmployeeData,
    categoryChangedNewObject,
    updateInactiveLeaves,
    updateOldLeaveProcessedData,
    insertNewLeaveProcessData
} from './Functions/LeaveProcessFun';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getProcessserialnum } from 'src/views/Constant/Constant';
import CircularProgressBar from 'src/views/Component/MuiCustomComponent/CircularProgressBar';

const CarryForwardLeaveTable = React.lazy(() => import('./CarryForwardCard'));
const CasualLeaveTable = React.lazy(() => import('./CasualLeaveCard'));
const CommonLeaveTable = React.lazy(() => import('./CommonLeavesCard'));
const CreditedLeaveTable = React.lazy(() => import('./CreditedLeavesCard'));
const EarnedLeaveTable = React.lazy(() => import('./EarnedLeaveCard'));
const HolidayLeaveTable = React.lazy(() => import('./HolidayLeaveCard'));

const LeaveProcessMainCard = () => {
    const [empCategory, setEmpCategory] = useState({}) //emp_master category
    const [empLeaveProcess, setEmpLeaveProcess] = useState({}) // Employee Leave processed data from 'hrm_leave_process'
    const [processedLveDetl, setprocessedLeaveDetl] = useState({}) // object after the calculation based on emp category and  Leave processed data from 'hrm_leave_process'
    const [processMesg, setprocessMesg] = useState('')
    const [processBtn, setprocessBtn] = useState(true)
    const [processSlno, setProcessSlno] = useState(0)

    //new Object for inserting ( after category change, new Employee Object etc.. )
    const [newEmployeeProcesedData, setNewEmployeeProcesedData] = useState({});
    const [processSpinner, setProcessSpinner] = useState(true)

    const { id, no } = useParams();
    const employeeIDs = useMemo(() => {
        return {
            em_no: no,
            em_id: id
        }
    }, [id, no])

    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)
    const { contract_status, em_contract_end_date } = state;

    useEffect(() => {
        //new process serial number
        getProcessserialnum().then((val) => {
            setProcessSlno(val)
        })
    }, [])

    useEffect(() => {
        //Set Current Category Infromation 
        getEmployeeCurrentCategoryInfom(employeeIDs.em_no).then((value) => {
            const { success, data } = value.data;
            if (success === 1) {
                setEmpCategory(data[0])
            }
        }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

        // Set Current Leave Process table Data if Active or Excist
        getEmployeeCurrentLeaveProcessInfom(employeeIDs).then((value) => {
            const { success, message } = value.data;
            if (success === 1) {
                setEmpLeaveProcess(message[0])
            }
        }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

        return () => {
            setEmpCategory({})
            setEmpLeaveProcess({})
        }

    }, [employeeIDs.em_no])

    const category = useMemo(() => empCategory, [empCategory])
    const leaveProcess = useMemo(() => empLeaveProcess, [empLeaveProcess])
    const processedLeaveDetl = useMemo(() => processedLveDetl, [processedLveDetl])

    useEffect(() => {
        //procedded Leave List
        if (Object.keys(category).length > 0 && Object.keys(leaveProcess).length > 0) {
            processedLeaveList(category, leaveProcess).then((value) => {
                setprocessedLeaveDetl(value)
            }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))
        } else {
            //Leave Process table is blank or not processed || data status is 'N' inActive
            let processedObj = {
                message: "Leave Process is not done",
                categoryStatus: 1,
                processedStatus: false,
                leaveData: [],
                newProcess: true,
                dateExceed: false
            }
            setprocessedLeaveDetl(processedObj)
        }
        return () => {
            setprocessedLeaveDetl({})
        }
    }, [category, leaveProcess])


    useEffect(() => {
        setprocessMesg(processedLeaveDetl.message)
        setprocessBtn(processedLeaveDetl.processedStatus)
        return () => {
            setprocessMesg('')
            setprocessBtn(true)
        }
    }, [processedLeaveDetl])


    //For new employee new process data for table
    useEffect(() => {
        //for new employee primary data for inserting the the "hrm_emp_processs" table
        newProcessedEmployeeData(category, processSlno, employeeIDs).then((newEmployeeObj) => {
            setNewEmployeeProcesedData(newEmployeeObj)
        }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

    }, [category, processSlno, employeeIDs])


    const { leaveData } = processedLeaveDetl;

    //Leave Process 
    const leaveProcessOption = async () => {
        setprocessBtn(true)
        /****
         * 1-> employee is under contract or not
         * 2-> if Yes retun the message "needs to renew the contract or clode the contract"
         * 3-> NOT UNDER CONTRACT
         * 4-> First check any processed data available in processed table
         * 5-> if Yes , Inactive that data
         * 6-> create a new object based on new category and new dates --> if contract then contract start & end date
         *      & consider the 'end of the yesr date' and 'start of the year date'
         * 7-> then insert a new processed data into the table
         * 
         *  
         */

        // 1 -> 
        const contractStatus = await checkContractStatus(em_contract_end_date, contract_status);

        if (contractStatus.status === true) {
            // 4->
            if (processedLveDetl.newProcess === true) {
                //new Process --> No data in 'hrm_process_table' || No active data in 'hrm_process_table';
                // new employee data for insert to DB
                insertNewLeaveProcessData(newEmployeeProcesedData).then((insertMessage) => {
                    let { success, message } = insertMessage;
                    if (success === 1) {
                        succesNofity(insertMessage)
                        setprocessBtn(false)
                        setProcessSpinner(false)
                    } else {
                        warningNofity(`error ! ${message} , LeaveProcessMainCard line # 173, Contact Information Technology`)
                    }
                }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 175, Contact Information Technology`))


            } else if (processedLveDetl.categoryStatus === 0) {
                //Category changed in 'hrm_emp_mast' ( check both the table ''hrm_emp_mast' & 'hrm_process_table' )

                //1 --> first create a new object with current category and currenct active 'hrm_emp_process' table data
                categoryChangedNewObject(category, leaveProcess, processSlno, employeeIDs).then((newCategoryObject) => {
                    // new category based data to insert into DB
                    /***
                     * 2 --> Inactive the All credited leaves ( Casual leace, holidays, earn Leave )
                     * if only inactive the following criteria 
                     * if previous category have the CL but the current category dont have the CL
                     * then inactive all the credited CL Leaves
                     * 
                    **/

                    const result = updateInactiveLeaves(category, leaveProcess).then((updateStatus) => {
                        // updatation Status old leaves if excist
                        const { success } = updateStatus;
                        if (success === 1) {
                            //3 --> Inactive the current Active or Old 'hrm_emp_process' table data / status - 'N'
                            updateOldLeaveProcessedData(leaveProcess).then((updateStatus) => {
                                let { success } = updateStatus;
                                if (success === 1) {

                                    //4 --> Insert new object data for  'hrm_emp_process' table with Active status

                                    insertNewLeaveProcessData(newCategoryObject).then((insertMessage) => {
                                        let { success, message } = insertMessage;
                                        if (success === 1) {
                                            succesNofity(insertMessage)
                                            setprocessBtn(false)
                                            setProcessSpinner(false)
                                        } else {
                                            warningNofity(`error ! ${message} , LeaveProcessMainCard line # 202, Contact Information Technology`)
                                        }
                                    }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 202, Contact Information Technology`))

                                } else {
                                    warningNofity('Error !, Contact IT')
                                }

                            }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

                        } else {
                            warningNofity('Somthing went Wrong in Old Leave Updation in Category change Process, contact Information Technology')
                            return
                        }

                    }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

                }).catch((error) => warningNofity(`error ! ${error} , LeaveProcessMainCard line # 193, Contact Information Technology`))

            } else if (processedLveDetl.dateExceed === true) {
                //Next updation date is exceed the current date
                warningNofity('Next Updated Date Exceeded !, Pleace contact Information Technology')
            }

        } else {
            warningNofity(contractStatus.message)
        }
    }


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
                                        <CustomTypoTwo
                                            updateStatus={processBtn}
                                            title={processMesg}
                                            bgColor={processBtn === true ? '#81c784' : '#ef9a9a'}
                                        />
                                        <Box sx={{ display: 'flex', flex: 1, height: 25, }} >
                                            <Button
                                                variant="outlined"
                                                sx={{ display: 'flex', mx: 0.5, flex: 1, }}
                                                disabled={processBtn}
                                                onClick={() => { leaveProcessOption() }}
                                            >
                                                Process
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ py: 0.5 }} >
                                        <Divider />
                                    </Box>
                                    <Box sx={{ px: 0.5, pb: 0.5, }} >
                                        {processBtn === true ? null : <CircularProgressBar />}
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
                                processStat={processBtn}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <EarnedLeaveTable
                                title={'Earned || Privilage Leave'}
                                id={employeeIDs.em_no}
                                processStat={processBtn}
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
                                processStat={processBtn}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CommonLeaveTable
                                title={'Common Off Days'}
                                id={employeeIDs.em_no}
                                processStat={processBtn}
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
                                processStat={processBtn}
                            />
                        </Suspense>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Suspense fallback={<CircularProgress color="secondary" size={30} />} >
                            <CreditedLeaveTable
                                title={'Credited Leaves'}
                                id={employeeIDs.em_no}
                                processStat={processBtn}
                            />
                        </Suspense>
                    </Box>
                </Box>
            </Box>

        </CustomLayout>
    )
}

export default memo(LeaveProcessMainCard)