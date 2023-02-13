import { Button, Checkbox, CssVarsProvider, Textarea, Tooltip, Typography } from '@mui/joy'
import { Box, Grid, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import React from 'react'
import { useState } from 'react'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CommonLeaveOptionCmp from './Func/CommonLeaveOptionCmp'
import { getCommonLeaveData } from 'src/redux/actions/LeaveReqst.action'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import moment from 'moment'
import _ from 'underscore'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LeaveRequestDocModal from './LeaveRequestDocModal'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { axioslogin } from 'src/views/Axios/Axios'
import { add, differenceInCalendarDays, format } from 'date-fns'
import { getleaverequest } from 'src/views/Constant/Constant'
import { useCallback } from 'react'

import { Actiontypes } from 'src/redux/constants/action.type'

const SingleLeaveRequestForm = () => {

    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;
    const dispatch = useDispatch();

    //form reset function
    const changeForm = () => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }

    const [singleLeaveState, setSingleLeaveState] = useState({});
    const [levRequestNo, setLevRequestNo] = useState(0);
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');

    const singleLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState, _.isEqual);
    const singleLeaveTypeData = useSelector((state) => state.getEmpLeaveData.commonLeave, _.isEqual);
    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel, _.isEqual);

    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])

    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = empApprovalLevel[0]

    // console.log(hod, incharge)

    const {
        em_no, em_id, em_doj, em_branch, em_designation, em_retirement_date, em_prob_end_date, em_conf_end_date, em_contract_end_date,
        em_department, em_dept_section, ecat_esi_allow, blood_slno, hrm_religion, hrm_profile, contract_status, emp__ot, ot_amount,
        gross_salary, em_category, category_slno, emp_type, des_type, probation_status,
        hod: empHodStat, incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0];

    // console.log(empHodStat, empInchrgStat)

    useEffect(() => {
        getleaverequest().then((val) => setLevRequestNo(val))
    }, [])

    useEffect(() => {
        setSingleLeaveState(singleLeaveTypeFormData)
    }, [singleLeaveTypeFormData])

    const {
        dateRangeCheck,
        fromDate,
        toDate,
        singleLevCheck,
        singleLeaveType,
        singleLeaveDesc,
        totalDays
    } = singleLeaveState;

    const CommonLeaveType = useMemo(() => singleLeaveTypeData, [singleLeaveTypeData]);

    const leaveRequestSubmitFun = useCallback(async () => {

        let postDataLeaveDetlInform = [{
            leaveid: levRequestNo,
            lveDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            caulmnth: singleLeaveType,
            lveType: singleLeaveType,
            status: 1,
            levtypename: singleLeaveDesc,
            leave: singleLeaveDesc,
            nof_leave: totalDays,
            singleleave: 1
        }]

        let postDataForGetAttendMarking = {
            empNo: em_no,
            fromDate: moment(fromDate).format('YYYY-MM-DD'),
            toDate: moment(toDate).format('YYYY-MM-DD')
        }

        const numberOfDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1;

        //Checking attendance marking is saved in  current month || start of month b/w current date 
        const result = await axioslogin.post('/attedancemarkSave/check', postDataForGetAttendMarking)
        const { success } = result.data;

        const singleLeveData = CommonLeaveType?.filter((val) => val.llvetype_slno === singleLeaveType)
        const { cmn_lv_balance } = singleLeveData?.[0];
        // console.log(singleLeveData)

        if (success === 1) {
            warningNofity("Attendance Marking Processed ! Contact HRD")
        } else {
            // console.log(cmn_lv_balance, totalDays)

            if (cmn_lv_balance >= totalDays) {

                /***
                 * 1 -> get the Probation / traning Details Currespoding to the Employee
                 * 2 -> checking for employee under probation or Training
                 *      on probation || training period CL,EL & SL Not Applicable if Yes -> Leave cannot  procesed
                 * 3 -> Then check the currecnt month attendace marking is saved or Not -> is saved Leave cannot  procesed
                 * 4 -> Reason for leave is mandatory
                 * 5 -> SL,ML not allowed on Probation / Training
                 * 6 -> Only LOP - 5  is Allowed 
                 * 
                 * 
                 *  des_type === 1 -> Probation , 2 -> Traiing
                 */

                // check the pronbation status and lev type
                if (probation_status === 1 && singleLeaveType !== 5) {
                    warningNofity("Selected Leave Not Allowed On Probation/Training")
                } else {
                    if (reason === '') {
                        warningNofity("Reason for request is Mandatory")
                    } else {
                        const postData = {
                            leaveid: levRequestNo,
                            em_id: em_id,
                            em_no: em_no,
                            em_department: em_department,
                            em_dept_section: em_dept_section,
                            leavefrom_date: fromDate,
                            leavetodate: toDate,
                            rejoin_date: format(add(new Date(toDate), { days: 1 }), "yyyy-MM-dd"),
                            request_status: 1,
                            inc_apprv_req:
                                (authorization_incharge === 1 && incharge === 1) ? 1 :
                                    (authorization_incharge === 1 && incharge === 0) ? 1 :
                                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                            incapprv_status:
                                (authorization_incharge === 1 && incharge === 1) ? 1 :
                                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                            inc_apprv_cmnt:
                                (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                                    (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
                            inc_apprv_time:
                                (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                                    (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                            hod_apprv_req:
                                (authorization_hod === 1 && hod === 1) ? 1 :
                                    (authorization_hod === 1 && hod === 0) ? 1 :
                                        (authorization_hod === 0 && hod === 1) ? 1 : 0,
                            hod_apprv_status:
                                (authorization_hod === 1 && hod === 1) ? 1 :
                                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
                            hod_apprv_cmnt:
                                (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                                    (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
                            hod_apprv_time:
                                (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                                    (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
                            hr_aprrv_requ: 1,
                            ceo_req_status: empHodStat === 1 ? 1 : 0,
                            resonforleave: reason,
                            no_of_leave: numberOfDays
                        }

                        // insert the single leave request 
                        const result = await axioslogin.post('/LeaveRequest', postData);
                        const { success, message } = await result.data;
                        if (success === 1) {
                            // insert the leave request detailed table
                            const insertDetlTable = await axioslogin.post('/LeaveRequest/createdetlleave', postDataLeaveDetlInform);
                            const { success, message } = await insertDetlTable.data;
                            if (success === 1) {
                                succesNofity(message);
                                changeForm()
                            } else {
                                warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                                changeForm()
                            }
                        } else {
                            warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                            changeForm()
                        }
                    }
                }
            } else {
                warningNofity("Allowed Leave is Not Enough For This Leave Request")
            }
        }
    }, [CommonLeaveType, em_no, fromDate, toDate, reason, singleLeaveState])

    return (
        <Paper
            variant="outlined"
            sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, alignItems: 'center', backgroundColor: '#EBEDEF', flexDirection: 'column' }}
        >
            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Start Date :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{fromDate}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>End Date :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{toDate}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Total Days :</Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>{totalDays}</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 2, border: 1, borderRadius: 1, p: 0.3, borderColor: '#C4C4C4', mx: 0.3, backgroundColor: 'white', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', fontWeight: 600 }}>Leave Type :</Box>
                    <Box sx={{ display: 'flex', flex: 3, justifyContent: 'space-around' }}>{singleLeaveDesc}</Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, p: 0.2, justifyContent: 'space-around' }} >
                    <CssVarsProvider>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            size="sm"
                            startDecorator={<SaveAsIcon />}
                            onClick={leaveRequestSubmitFun}
                            fullWidth
                        // sx={{ color: 'green' }} 
                        >
                            Save
                        </Button>
                    </CssVarsProvider>
                </Box>
            </Box>
            <Box
                sx={{ display: 'flex', flex: 1, width: '100%', my: 0.3, p: 0.3 }}
                component={Grid}
            >
                <Box sx={{ display: 'flex', flex: 6 }} >
                    <CssVarsProvider>
                        <Textarea
                            label="Outlined"
                            placeholder="Reason For Leave Request"
                            variant="outlined"
                            color="warning"
                            size="lg"
                            minRows={2}
                            maxRows={3}
                            onChange={(e) => setReason(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', px: 1, justifyContent: "space-evenly" }}>
                    <Box>
                        <CssVarsProvider>
                            <Tooltip title="Upload Documents" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="danger"
                                >
                                    <UploadFileIcon />
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <Box>
                        <CssVarsProvider>
                            <Tooltip title="View Documents" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="lg"
                                    color="primary"
                                    onClick={() => setOpen(true)}
                                >
                                    <FindInPageIcon />
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <LeaveRequestDocModal
                        open={open}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
                flexDirection: 'start',
                p: 0,
                m: 0
            }} >
                <Typography level="body4">Supported Document/ Image Formats - *.pdf / *.jpg,*.jpeg,*.png || Doc/Image Size Should Be Less Than 2 MB </Typography>
            </Box>
        </Paper >
    )
}

export default memo(SingleLeaveRequestForm) 