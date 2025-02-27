import React, { memo, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, CssVarsProvider, Input, Table, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { useState } from 'react';
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, isValid, lastDayOfMonth, startOfMonth } from 'date-fns';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useSelector } from 'react-redux';
import { allLeavesConvertAnArray, findBalanceCommonLeveCount, getCommonSettings, getEmployeeInformationLimited, getInchargeHodAuthorization, getLeaveReqApprovalLevel, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { useMemo } from 'react';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import LeaveRequestTable from './Func/LeaveRequestTable';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CachedIcon from '@mui/icons-material/Cached';
import Textarea from '@mui/joy/Textarea';
import { useEffect } from 'react';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import LeaveRequestDocModal from './LeaveRequestDocModal';

const LeaveRequestFormNew = ({ setRequestType }) => {

    const [drop, setDropOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [table, setTable] = useState([]);
    const [leaveArray, setLeaveArray] = useState([]);
    const [addDateDisable, setAddDateDisable] = useState(false);
    const [leaveDetails, setLeaveDetails] = useState({})

    //FIND COMMON LEAVE BALANCE COUNT EM_NO WISE
    const findBalanceCountCmnLeave = useSelector((state) => findBalanceCommonLeveCount(state))
    const comnLeaveBalCount = useMemo(() => findBalanceCountCmnLeave, [findBalanceCountCmnLeave])

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_no: loginEmno, groupmenu } = empInformationFromRedux;

    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    const apprLevel = useSelector((state) => getLeaveReqApprovalLevel(state))
    const deptApprovalLevel = useMemo(() => apprLevel, [apprLevel])


    /*
 *3 -> hod and incharge
 *2 -> hod only
 *1 -> incharge only
 *0 -> nothing  
 */

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])



    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    //console.log(selectedEmpInform);
    const { em_no, em_dept_section, actual_doj } = selectedEmpInform ?? {};


    const [reson, setReason] = useState('')
    const allLeavesArray = useSelector((state) => allLeavesConvertAnArray(state, actual_doj))
    const filterdArray = useMemo(() => allLeavesArray, [allLeavesArray]);


    const handleRefreshButton = useCallback(() => {
        setTable([])
        setAddDateDisable(false)
    }, [])


    /********************************************************************************************************/

    const handleChangeLeaveProcess = useCallback(async () => {
        if ((isValid(fromDate) && isValid(toDate)) && fromDate <= toDate) {

            const dateDiffrence = eachDayOfInterval({
                start: new Date(fromDate),
                end: new Date(toDate)
            })

            // console.log(differenceCountFromToDate)
            /**
             * 1-> CHECKING FOR PUNCH MARKING HR -> YES/NO
             * 2-> DUTY PLANNED DONE FOR THE SELECTED DATES 
             */

            /** PUNCH MARKING HR START **/

            const postDataForAttendaceMark = {
                month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                section: em_dept_section
            }

            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Apply Leave Request!!  ")
                } else {
                    /** CHECKING DUTY PLAN AND PUNCH MASTER START HERE **/

                    //dataes difference count for checking the the duyt plan is done or not
                    const differenceCountFromToDate = differenceInCalendarDays(
                        new Date(toDate),
                        new Date(fromDate)
                    ) + 1

                    const postData = {
                        fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
                        toDate: format(new Date(toDate), 'yyyy-MM-dd'),
                        emno: em_no
                    }
                    //CHECKING FOR PUNCH MARKING HR -> YES/NO
                    const checkDutyPlan = await axioslogin.post('/plan/checkDutyPlanExcistNew', postData);
                    const { success, dta } = checkDutyPlan.data;

                    if (success === 1 && dta.plan === differenceCountFromToDate) {
                        //DUTY PLAN IS PLANNED FOR THE SELECTED DATE

                        //FOR LISTING THE SELECTED DATE IN THE SCREEN
                        const modifiedTable = dateDiffrence?.map((e) => {
                            return {
                                date: e,
                                leavetype: 0,
                                leaveTypeName: '',
                                selectedLveSlno: 0,
                                selectedLveName: '',
                                selectedLvType: '',
                                count: 0,
                                commonLeave: 0,
                                commonLeaveSlno: 0
                            }
                        })
                        setTable(modifiedTable)
                        const { status, data } = filterdArray;
                        (status === true && data?.length > 0) && setLeaveArray(data)
                        setAddDateDisable(true)
                    } else {
                        warningNofity('Duty Plan Not planned ')
                        return
                    }
                    /** CHECKING DUTY PLAN AND PUNCH MASTER END HERE **/
                }

            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }

            /** PUNCH MARKING HR END **/
        } else {
            errorNofity("Selected Dates are showing invalid Dates OR 'From Date' Greater Than 'to Date',Retrying Again ")
        }

    }, [fromDate, toDate, filterdArray, em_no, em_dept_section])

    useEffect(() => {
        setTable([])
        setAddDateDisable(false)
    }, [fromDate, toDate,])

    /************************************************************************************************************************************* */
    //SAVE LEAVE REQUEST FUNCTION
    const handleProcessLeaveRequest = useCallback(async () => {

        // console.log(masterGroupStatus)
        // console.log(loginHod, loginIncharge)

        const { em_no, em_id, em_department, em_dept_section, } = selectedEmpInform;

        const checkFromDate = format(new Date(fromDate), 'yyyy-MM-dd 00:00:00');
        const checkToDate = format(new Date(toDate), 'yyyy-MM-dd 23:59:59');
        const checkPostData = {
            fromDate: checkFromDate,
            toDate: checkToDate,
            em_no: em_no
        }
        const checkDutyPlan = await axioslogin.post('/LeaveRequest/getLeaveExcistOrNot', checkPostData);
        const { success, data } = checkDutyPlan.data;
        if (success === 1) {
            const count = data[0]?.count
            if (count === 0) {

                //FIRST CHECK THE ALL LEAVE ARE ENTERD IN THE CORRECTED DATE
                const nulCheckForEnterdLeaves = table?.filter((e) => e.leavetype === 0 || e.selectedLveSlno === 0)?.length;
                if (table?.length === 0 || nulCheckForEnterdLeaves !== 0) {
                    warningNofity("Requested Leave Data Not Enterd Correctly ,Please Check")
                } else {


                    //LEAVE TYPES
                    /***
                     * ESI -> 6
                     * LWP -> 5
                     * ML -> 2
                     * SL -> 7
                     */
                    const commonLeave = [6, 5, 2]
                    // FILTER AND REMOVE THE COMMON LEAVES
                    const commonLeaveFilterArray = table?.filter((e) => !commonLeave?.includes(e.leavetype))?.map((el) => { return { type: el.leavetype, typeslno: el.selectedLveSlno } })
                    const allLeavetypes = [...new Set(commonLeaveFilterArray?.map((e) => e.type))]
                    // console.log(allLeavetypes)
                    // FIND THE DUPLICATE LEAVES 
                    const checkDuplicateLeaves = allLeavetypes?.map((el) => {
                        return {
                            type: el,
                            status: commonLeaveFilterArray?.filter((e) => e.type === el)?.map(e => e.typeslno).length === [...new Set(commonLeaveFilterArray?.filter((e) => e.type === el)?.map(e => e.typeslno))].length
                        }
                    })?.find((e) => e.status === false)
                    //?.find((e) => e.status === false)

                    //DUPLICATE CHECKING RESULTS
                    if (checkDuplicateLeaves === undefined) {
                        //REQUEST SEND TO DATABASE FOR SAVING

                        // const { em_no, em_id, em_department, em_dept_section, hod, incharge } = selectedEmpInform;

                        const requestFromDate = format(new Date(fromDate), 'yyyy-MM-dd H:m:s');
                        const requestToDate = format(new Date(toDate), 'yyyy-MM-dd H:m:s');


                        const approveStatus = await getInchargeHodAuthorization(masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmno)

                        //console.log(approveStatus)
                        // console.log(em_no, em_id, em_department, em_dept_section, hod, incharge)

                        //TOTAL LEAVES REQUIRED COUNT
                        const numberOfDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1
                        //POST DATA FOR MASTER TABLE
                        const postDataMasterTable = {
                            leaveid: 0,
                            em_id: em_id,
                            em_no: em_no,
                            em_department: em_department,
                            em_dept_section: em_dept_section,
                            leavefrom_date: requestFromDate,
                            leavetodate: requestToDate,
                            attendance_marking_month: format(startOfMonth(new Date(fromDate)), "yyyy-MM-dd"),
                            rejoin_date: format(addDays(new Date(toDate), 1), "yyyy-MM-dd"),
                            request_status: 1,
                            inc_apprv_req: approveStatus.inc_apr,
                            incapprv_status: approveStatus.inc_stat,
                            inc_apprv_cmnt: approveStatus.inc_cmnt,
                            inc_apprv_time: approveStatus.inc_apr_time,
                            inc_usCode: approveStatus.usCode_inch,
                            hod_apprv_req: approveStatus.hod_apr,
                            hod_apprv_status: approveStatus.hod_stat,
                            hod_apprv_cmnt: approveStatus.hod_cmnt,
                            hod_apprv_time: approveStatus.hod_apr_time,
                            hod_usCOde: approveStatus.usCode_hod,
                            hr_aprrv_requ: 1,
                            ceo_req_status: 0,
                            resonforleave: reson,
                            no_of_leave: numberOfDays
                        }

                        //POST DATA FOR DETAILS TABLE

                        const postDataForDetlTable = table?.map((e) => {
                            return {
                                leaveid: 0,
                                lveDate: format(new Date(e.date), 'yyyy-MM-dd HH:mm:ss'),
                                leave_processid: e.commonLeave === 0 ? e.selectedLveSlno : e.commonLeaveSlno, //LEAVE SLNO FROM LEAVES TABLE  //leave_processid
                                leave_typeid: e.leavetype, // LEAVE TYPE SLNO // leave_typeid
                                status: 1,
                                leavetype_name: e.selectedLvType, //leavetype_name
                                leave_name: e.selectedLveName, //leave_name
                                leaveCount: e.count, // no of days
                                empNo: em_no,
                                singleleave: 1
                            }
                        })

                        //POST DATA TO BACKEND 

                        // console.log(postDataForDetlTable)

                        const findNotMoreThanBalaLve = commonLeave?.map((type) => {
                            return type === 7 ? {
                                type: 7,
                                leaveCount: postDataForDetlTable?.filter((e) => e.leave_typeid === 7)?.map(e => e.leaveCount)?.reduce((acc, curr) => acc + curr, 0)
                            } : {
                                type: type,
                                leaveCount: postDataForDetlTable?.filter((e) => e.leave_typeid === type).length
                            }
                        })?.filter(e => e.leaveCount !== 0)?.map((el) => comnLeaveBalCount?.find((val) => val.type === el.type)?.balance - el.leaveCount < 0)?.filter(e => e === true).length

                        // console.log(findNotMoreThanBalaLve)
                        // console.log(comnLeaveBalCount)

                        if (reson === '') {
                            warningNofity("The explanation must consist of more than 10 characters.")
                        } else {
                            setDropOpen(true)
                            if (findNotMoreThanBalaLve === 0) {

                                const modifiedLveReq = {
                                    masterPostData: postDataMasterTable,
                                    detlPostSata: postDataForDetlTable
                                }
                                setModalOpen(true)
                                setLeaveDetails(modifiedLveReq)
                                // console.log(modifiedLveReq);
                                // const submitLeaveRequet = await axioslogin.post('/LeaveRequest/modifiedLeaveRequest', modifiedLveReq);
                                // const { success } = submitLeaveRequet.data;
                                // if (success === 1) {
                                //     setDropOpen(false)
                                //     setTable([])
                                //     setReason('')
                                //     setRequestType(0)
                                //     succesNofity("Leave request submited Successfully")
                                //     // console.log(submitLeaveRequet)
                                // } else {
                                //     setDropOpen(false)
                                //     setTable([])
                                //     setReason('')
                                //     setRequestType(0)
                                //     errorNofity('Error Submitting Leave Request')
                                // }
                            } else {
                                warningNofity("One of the selected common leave counts is greater than the credited count.")
                                setDropOpen(false)
                            }

                        }

                    } else {
                        // YES DUPLICATE LEAVE FOUND ERROR THROW
                        warningNofity("Please Check Selected Leaves , No Leaves Selected OR Duplicate Leaves Found !!!")
                    }
                }
            } else {
                warningNofity("The selected date has already been requested.")
            }
        } else {
            errorNofity("Error Getting leave request Data")
        }


    }, [table, selectedEmpInform, fromDate, toDate, reson, loginHod, loginIncharge, loginEmno,
        masterGroupStatus, comnLeaveBalCount, deptApprovalLevel])

    return (
        <Box sx={{ mb: 0.5 }}>
            <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
            <LeaveRequestDocModal open={modalOpen} data={leaveDetails} setOpen={setModalOpen}
                setTable={setTable} setReason={setReason} setRequestType={setRequestType} setDropOpen={setDropOpen} />
            <Paper variant="outlined" sx={{ mt: 0.5 }} >
                <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                //minDate={startOfMonth(new Date())}
                                inputFormat="dd-MM-yyyy"
                                value={fromDate}
                                size="small"
                                onChange={(newValue) => setFromDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' variant='outlined' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                inputFormat="dd-MM-yyyy"
                                minDate={fromDate}
                                maxDate={endOfMonth(new Date(fromDate))}
                                value={toDate}
                                size="small"
                                onChange={(newValue) => setToDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.3, pl: 5, gap: 2 }} >
                        <CssVarsProvider>
                            <Tooltip title="Click Here to Add Leaves" followCursor placement='top' arrow variant='outlined' color='success'>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="success"
                                    onClick={handleChangeLeaveProcess}
                                    size='sm'
                                    endDecorator={<Box>Add Leaves</Box>}
                                    disabled={addDateDisable}
                                >
                                    <ExitToAppOutlinedIcon fontSize='large' />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                        {/* </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.3, pl: 5 }} > */}
                        <CssVarsProvider>
                            <Tooltip title="Click Here to Save Leave Request" followCursor placement='top' arrow variant='outlined' color='danger' >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="danger"
                                    onClick={handleProcessLeaveRequest}
                                    size='sm'
                                    endDecorator={<Box>Save Request</Box>}
                                >
                                    <ExitToAppOutlinedIcon fontSize='large' />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Tooltip title="Refresh" followCursor placement='top' arrow variant='outlined' color='success' >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color='success'
                                    onClick={handleRefreshButton}
                                    size='sm'
                                    sx={{ px: 1, py: 0.5 }}
                                // endDecorator={<Box>Save Request</Box>}
                                >
                                    <CachedIcon fontSize='large' />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Paper variant="outlined" sx={{ maxHeight: screenInnerHeight * 40 / 100, p: 1, m: 0.3, overflow: 'auto' }} >
                    <Table
                        aria-label="basic table"
                        // borderAxis="xBetween"
                        color="neutral"
                        size="sm"
                        variant="plain"
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Requested Leave Date</th>
                                <th>Leave Type</th>
                                <th>Selected Leaves</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                table && table?.map((e, idx) => <LeaveRequestTable key={idx} value={e} leaveArray={leaveArray} seletedLveDates={table} />)
                            }
                        </tbody>
                    </Table>
                </Paper>
                <Box sx={{ p: 1 }} >
                    <Textarea
                        color="primary"
                        minRows={2}
                        defaultValue=''
                        placeholder="Leave Request Reason ..."
                        size="sm"
                        variant="outlined"
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(LeaveRequestFormNew) 