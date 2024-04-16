import React, { memo, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, CssVarsProvider, Input, Radio, Table, Tooltip, Typography } from '@mui/joy'
import { Paper, TextField } from '@mui/material'
import { useState } from 'react';
import { addDays, differenceInCalendarDays, differenceInDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useSelector } from 'react-redux';
import { allLeavesConvertAnArray, getCommonSettings, getEmployeeInformationLimited, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { useMemo } from 'react';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LeaveRequestTable from './Func/LeaveRequestTable';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CachedIcon from '@mui/icons-material/Cached';
import Textarea from '@mui/joy/Textarea';
import { useEffect } from 'react';

const LeaveRequestFormNew = () => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [radioBtnValue, setSelectedValue] = useState('C');
    const [openPage, setOpenPage] = useState(false)
    const [table, setTable] = useState([]);
    const [leaveArray, setLeaveArray] = useState([]);
    const [addDateDisable, setAddDateDisable] = useState(false);

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_no: loginEmno, em_id: loginEmid, em_department: loginDept, em_dept_section: loginSection, groupmenu } = empInformationFromRedux;

    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])


    const [reson, setReason] = useState('')
    const allLeavesArray = useSelector((state) => allLeavesConvertAnArray(state))
    const filterdArray = useMemo(() => allLeavesArray, [allLeavesArray]);

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_id, em_no, hod, incharge, em_dept_section } = selectedEmpInform;
    // console.log(selectedEmpInform)

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

            const checkAttendanceMarking = await axioslogin.post('/attendCal/checkPunchMarkingHR', postDataForAttendaceMark);


            const { data: attMarkCheckData, success: attMarkCheckSuccess } = checkAttendanceMarking.data;
            const lastUpdateDate = attMarkCheckData[0]?.last_update_date;
            // console.log(lastUpdateDate)
            // console.log(isValid(new Date(lastUpdateDate)))


            if (attMarkCheckSuccess === 2) {
                errorNofity("Error Checking Attendance Already Marked or Not ,Try Again !!")
            } else if ((attMarkCheckSuccess === 0 || attMarkCheckSuccess === 1) && (attMarkCheckSuccess === 1 && isValid(new Date(lastUpdateDate)) && new Date(lastUpdateDate) < new Date(fromDate))) {


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

            } else {
                warningNofity('Attendance Marking For the Selected Date Was Completed , Try Another Dates')
            }

            /** PUNCH MARKING HR END **/
        } else {
            errorNofity("Selected Dates are showing invalid Dates OR 'From Date' Greater Than 'to Date',Retrying Again ")
        }

    }, [fromDate, toDate, filterdArray, em_no, em_dept_section])

    /************************************************************************************************************************************* */
    //SAVE LEAVE REQUEST FUNCTION
    const handleProcessLeaveRequest = useCallback(async () => {
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
            const commonLeave = [6, 5, 2, 7]
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


                const { em_no, em_id, em_department, em_dept_section, hod, incharge } = selectedEmpInform;

                const requestFromDate = format(new Date(fromDate), 'yyyy-MM-dd H:m:s');
                const requestToDate = format(new Date(toDate), 'yyyy-MM-dd H:m:s');

                const approveStatus = (masterGroupStatus === true) ?
                    {
                        inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                        usCode_inch: loginEmno, usCode_hod: loginEmno
                    } :
                    (loginHod === 1 && loginIncharge === 1) ?
                        {
                            inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                            usCode_inch: loginEmno, usCode_hod: loginEmno
                        }
                        :
                        (loginHod === 1 && loginIncharge === 0) ?
                            {
                                inc_apr: 0, hod_apr: 0, inc_stat: 1, hod_stat: 1, inc_cmnt: 'DIRECT', hod_cmnt: 'DIRECT', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'),
                                usCode_inch: null, usCode_hod: loginEmno
                            }
                            :
                            (loginHod === 0 && loginIncharge === 1) ?
                                {
                                    inc_apr: 0, hod_apr: 1, inc_stat: 1, hod_stat: 0, inc_cmnt: 'DIRECT', hod_cmnt: '', inc_apr_time: format(new Date(), 'yyyy-MM-dd H:m:s'), hod_apr_time: null,
                                    usCode_inch: loginEmno, usCode_hod: null
                                }
                                :
                                {
                                    inc_apr: 0, hod_apr: 0, inc_stat: 0, hod_stat: 0, inc_cmnt: 'DIRECT', hod_cmnt: '', inc_apr_time: null, hod_apr_time: null,
                                    usCode_inch: null, usCode_hod: null
                                }

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

                if (reson === '') {
                    warningNofity("The explanation must consist of more than 10 characters.")
                } else {

                    const modifiedLveReq = {
                        masterPostData: postDataMasterTable,
                        detlPostSata: postDataForDetlTable
                    }
                    const submitLeaveRequet = await axioslogin.post('/LeaveRequest/modifiedLeaveRequest', modifiedLveReq);
                    console.log(submitLeaveRequet)
                }

            } else {
                // YES DUPLICATE LEAVE FOUND ERROR THROW
                warningNofity("Please Check Selected Leaves , No Leaves Selected OR Duplicate Leaves Found !!!")
            }
        }

    }, [table, selectedEmpInform, fromDate, toDate, reson, loginHod, loginIncharge, loginEmno, masterGroupStatus])

    return (
        <Box sx={{ mb: 0.5 }}>
            <Paper variant="outlined" sx={{ mt: 0.5 }} >
                <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                minDate={startOfMonth(new Date())}
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