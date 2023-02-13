import React, { memo, lazy } from 'react'
import { Paper, Grid, Box, TextField, Typography, TextareaAutosize } from '@mui/material'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { Suspense } from 'react';
import { Form } from 'react-bootstrap';
import TextInputBootStrap from 'src/views/Attendance/Component/TextInputBootStrap';
import MultiLeaveTypeDetl from './Func/CasualLeaveSelected';
import { Button, CssVarsProvider, Textarea, Tooltip, Typography as Typo } from '@mui/joy';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { add, differenceInCalendarDays, eachDayOfInterval, format } from 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useState } from 'react';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getleaverequest } from 'src/views/Constant/Constant';

// lazy import 
const MultiLeaveTypeSelectCmp = lazy(() => import('./Func/MultiLeaveTypeSelectCmp'));
const MuliLeaveMapCmp = lazy(() => import('./MuliLeaveMapCmp'));

const MultiLeaveRequestForm = () => {

    const dispatch = useDispatch();
    const [newData, setnewData] = useState([]);
    const [levRequestNo, setLevRequestNo] = useState(0);
    const [reason, setReason] = useState('');
    //request selected employee details after the submit button pn;y changes
    // const empDetl = useSelector((state) => state.getLeaveRequestInfom.empDetl, _.isEqual);
    // const reqEmpDetl = useMemo(() => empDetl, [empDetl]);
    // const { em_no, requestType, deptSection } = reqEmpDetl;

    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel, _.isEqual);
    const singleLeaveTypeData = useSelector((state) => state.getEmpLeaveData.commonLeave, _.isEqual);

    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const CommonLeaveType = useMemo(() => singleLeaveTypeData, [singleLeaveTypeData]);

    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = empApprovalLevel[0]

    // console.log(hod, incharge)

    const {
        em_no, em_id, em_doj, em_branch, em_designation, em_retirement_date, em_prob_end_date, em_conf_end_date, em_contract_end_date,
        em_department, em_dept_section, ecat_esi_allow, blood_slno, hrm_religion, hrm_profile, contract_status, emp__ot, ot_amount,
        gross_salary, em_category, category_slno, emp_type, des_type, probation_status,
        hod: empHodStat, incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0];

    useEffect(() => {
        getleaverequest().then((val) => setLevRequestNo(val))
    }, [])

    // selected form data 
    const multiLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState, _.isEqual);
    const multiLeaveTypeData = useMemo(() => multiLeaveTypeFormData, [multiLeaveTypeFormData])

    // console.log(`multi leaves`)
    // console.log(reqEmpDetl)

    const { dateRangeCheck, fromDate, toDate, singleLevCheck, singleLeaveType, singleLeaveDesc, totalDays, formSubmit
    } = multiLeaveTypeData;

    //get the date interwal
    // console.log(intervalDate)

    const numberOfDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1;

    useEffect(() => {
        const intervalDate = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) }).map((date) => moment(date).format('YYYY-MM-DD'))
        const leaveSelectedData = intervalDate.map((val, ind) => {
            return {
                index: ind,
                "date": val,
                "leaveTypeSlno": 0,
                "leaveTypeName": '',
                "selectedLveSlno": 0,
                "selectedLeaveTypeName": '',
                "leaveDate": '',
                "selectedLeaveName": '',
            }
        })

        setnewData(leaveSelectedData)
    }, [fromDate, toDate]);


    //allowed leave type 

    // const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData);
    // const allowedLeaveData = useMemo(() => state, [state]);

    //allowed leave details against leave type

    //leave request selection

    const handleChangeLeaveRequest = useCallback(async (leveTypeData, leaveDetl) => {

        //filter the leaves for duplication and get the post data
        const duplicateLeaveSelection = newData?.map((val) => val.selectedLveSlno).includes(leaveDetl?.selectedLveSlno);
        if (duplicateLeaveSelection === true) {
            warningNofity("You are Already Selected This Leaves");
        } else {
            // leave add to the map
            const newSelectedLeaveData = newData?.map((val) => {
                if (val?.index === leveTypeData?.index) {
                    return {
                        ...val,
                        "leaveTypeSlno": leveTypeData?.leaveType,
                        "leaveTypeName": leveTypeData?.leaveTypeName,
                    }
                } else if (val?.index === leaveDetl?.index) {
                    return {
                        ...val,
                        "selectedLveSlno": leaveDetl?.selectedLveSlno,
                        "selectedLeaveTypeName": leaveDetl?.lveTypeName,
                        "leaveDate": leaveDetl?.lveDate,
                        "selectedLeaveName": leaveDetl?.leave,
                    }
                } else {
                    return val
                }
            })
            setnewData(newSelectedLeaveData)
        }
    })

    // multi leave request  submit function
    const leaveRequestSubmitFun = useCallback(async () => {
        // requested form information
        const { dateRangeCheck, fromDate, toDate, singleLevCheck, singleLeaveType, singleLeaveDesc, totalDays, formSubmit
        } = multiLeaveTypeData;

        // leave request master table post data
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

        //validation
        const checkIfSelectedLeveReqType = newData?.filter((val) => val.leaveTypeSlno === 0);
        const checkIfSelectedLeve = newData?.filter((val) => val.selectedLveSlno === 0);

        if (checkIfSelectedLeveReqType.length > 0 || checkIfSelectedLeve.length > 0) {
            warningNofity("Leave Type OR Name not selected OR Duplicate Leave Selected")
        } else {
            console.log(CommonLeaveType)
            // CommonLeaveType?.filter()
        }




    }, [newData, multiLeaveTypeData])

    return (
        <Paper
            // component={Grid}
            // container
            variant="outlined"
            sx={{
                display: "flex",
                flex: 1,
                p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                flexDirection: 'column',
            }}
        >
            <Box sx={{
                flex: 1,
                display: "flex",
                backgroundColor: 'Scrollbar',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                mb: -1
            }} >
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Selected Leave Date</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Type</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Name</Box>
            </Box>
            <Box
                variant="outlined"
                sx={{
                    display: "flex",
                    flex: 1,
                    p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                    flexDirection: 'column',
                    minHeight: 10,
                    maxHeight: 210,
                    overflowY: 'auto'
                }}
            >
                {newData?.map((val, index) => <MuliLeaveMapCmp
                    key={index}
                    data={val}
                    index={index}
                    handleChange={handleChangeLeaveRequest}
                />)}
            </Box>
            <Paper
                variant="outlined"
                sx={{
                    p: 0.5, mb: 0.5,
                }}
            >
                <Box sx={{ display: "flex", flex: 1 }}>
                    <Box sx={{ flex: 2 }} >
                        <Box sx={{ display: "flex", flex: 1 }}>
                            <Box sx={{ display: "flex", flex: 2 }}>
                                <Form.Group style={{ width: '100%' }} >
                                    <Form.Control type="file" size="sm" />
                                </Form.Group>
                            </Box>
                            <Box sx={{ display: "flex", flex: 2, pl: 1 }} >
                                <CssVarsProvider>
                                    <Tooltip title="View Documents" variant="outlined" color="info" placement="top">
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="sm"
                                            color="primary"
                                        // fullWidth

                                        // onClick={() => setOpen(true)}
                                        >
                                            <FindInPageIcon />View Document
                                        </Button>
                                    </Tooltip>
                                </CssVarsProvider>
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
                            <Typo level="body4">Supported Document/ Image Formats - *.pdf / *.jpg,*.jpeg,*.png || Doc/Image Size Should Be Less Than 2 MB </Typo>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flex: 2, px: 1 }} >
                        {/* <TextareaAutosize maxRows={2} minRows={2} style={{ width: '100%', p: 0.5 }} placeholder="Leave Request Reasons" /> */}
                        <CssVarsProvider>
                            <Textarea
                                label="Outlined"
                                placeholder="Reason For Leave Request"
                                variant="outlined"
                                color="warning"
                                size="lg"
                                minRows={1}
                                maxRows={3}
                                onChange={(e) => setReason(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0 }} >
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
                                Save Leave Request
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>

            </Paper>
        </Paper>
    )
}

export default memo(MultiLeaveRequestForm)