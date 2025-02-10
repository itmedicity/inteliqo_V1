import { CssVarsProvider, Radio, RadioGroup } from '@mui/joy';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { getleaverequest } from 'src/views/CommonCode/Commonfunc';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { getDutyPlannedShiftForHalfDayRequest } from 'src/redux/actions/LeaveReqst.action';
import { useDispatch } from 'react-redux';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';

const LeaveRequestModal = lazy(() => import('./Modal/LeaveRequestModal'));
// const CompansatoryOff = lazy(() => import('./Modal/CompansatoryOff'));
const NoPunchLeaveRequest = lazy(() => import('./Modal/NoPunchLeaveRequest'));
const HalfDayLeaveRequest = lazy(() => import('./Modal/HalfDayLeaveRequest'));
const OndutyReqstModal = lazy(() => import('../CommonRequest/Approvals/Modals/OndutyReqstModal'));
const OneHourReqstModal = lazy(() => import('../CommonRequest/Approvals/Modals/OneHourReqstModal'))

const LeaveApprovalHR = () => {
    const dispatch = useDispatch()
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [value, setValue] = useState(1);
    const [tableData, setTableData] = useState([])

    const [count, setCount] = useState(0)

    const [ondutyOpen, setOndutyOpen] = useState(false)
    const [onhourOpen, setOneHourOpen] = useState(false)
    const [misspunchOpen, setMisspunchOpen] = useState(false)
    const [halfdayOpen, setHalfdayOpen] = useState(false)
    const [leaveOpen, setLeaveOpen] = useState(false)

    const [ondutyData, setOndutyData] = useState({})
    const [oneHourData, setOneHourData] = useState({})
    const [misspunchData, setmisspunchData] = useState({})
    const [halfdayData, setHalfdayData] = useState({})
    const [leaveData, setLeaveData] = useState({})

    const [previousLeave, setPreviousLeave] = useState([])

    useEffect(() => {
        getleaverequest().then((val) => {

            const array = [
                { lrequest_slno: 5, lrequest_type: "ONE HOUR REQUEST" },
                { lrequest_slno: 6, lrequest_type: "ON DUTY REQUEST" }
            ]
            const arr = [...val, ...array]
            setleaverequesttype(arr)
        })
    }, [])

    const handleChangeRadioBtn = useCallback(async (event) => {
        let radioBtnVal = event.target.value;
        setValue(radioBtnVal);
    }, [])


    useEffect(() => {

        const getAllOnHour = async () => {
            const result = await axioslogin.get('/CommonReqst/approval/onehour')
            const { data, success } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        slno: val.request_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        department: val.dept_name,
                        section: val.sect_name,
                        code: 5,
                        requestDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                        one_hour_day: format(new Date(val.one_hour_duty_day), 'dd-MM-yyyy'),
                        status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                            (val.incharge_req_status === 1 && val.incharge_approval_status === 2) ? 'Incharge Rejected' :
                                (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                    (val.incharge_req_status === 1 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                        (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                            (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                (val.incharge_req_status === 1 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                    (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                            (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                                (val.hod_req_status === 1 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' :
                                                                    (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' :
                                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        const getAllOnDuty = async () => {
            const result = await axioslogin.get('/CommonReqst/approval/onduty')
            const { data, success } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        slno: val.onduty_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        department: val.dept_name,
                        section: val.sect_name,
                        code: 6,
                        requestDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                        on_dutydate: format(new Date(val.on_duty_date), 'dd-MM-yyyy'),
                        status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                            (val.incharge_req_status === 1 && val.incharge_approval_status === 2) ? 'Incharge Rejected' :
                                (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                    (val.incharge_req_status === 1 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                        (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                            (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                (val.incharge_req_status === 1 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                    (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                            (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                                (val.hod_req_status === 1 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' :
                                                                    (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' :
                                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        const getAllMisspunch = async () => {
            const resultdel = await axioslogin.get('/LeaveRequestApproval/approval/misspunch');
            const { success, data } = await resultdel.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        slno: val.nopunch_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        department: val.dept_name,
                        section: val.sect_name,
                        code: 3,
                        requestDate: format(new Date(val.creteddate), 'dd-MM-yyyy'),
                        nopunch_date: format(new Date(val.nopunchdate), 'dd-MM-yyyy'),
                        status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.np_inc_apprv_req === 0 && val.np_incapprv_status === 0 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 1 && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 1 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' :
                                                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0 && val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        const getAllHalfDay = async () => {
            const resultdel = await axioslogin.get('/LeaveRequestApproval/approval/halfday');
            const { success, data } = await resultdel.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        slno: val.half_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        department: val.dept_name,
                        section: val.sect_name,
                        code: 2,
                        requestDate: format(new Date(val.requestdate), 'dd-MM-yyyy'),
                        halfday_date: format(new Date(val.leavedate), 'dd-MM-yyyy'),
                        status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 2) ? 'Incharge Rejected' :
                                (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                    (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.hf_inc_apprv_req === 0 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                            (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0 && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                    (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 1 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' :
                                                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0 && val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        const getAllLeave = async () => {
            const result = await axioslogin.get('/LeaveRequestApproval/approval/leave')
            const { data, success } = result.data
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        slno: val.leave_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        department: val.dept_name,
                        section: val.sect_name,
                        code: 1,
                        requestDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                        fromDate: format(new Date(val.leave_date), 'dd-MM-yyyy'),
                        toDate: format(new Date(val.leavetodate), 'dd-MM-yyyy'),
                        status:
                            (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                                (val.inc_apprv_req === 1 && val.incapprv_status === 2) ? 'Incharge Rejected' :
                                    (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                        (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_apprv_status === 0) ? 'HOD Approval Pending' :
                                            (val.inc_apprv_req === 0 && val.incapprv_status === 0 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                (val.inc_apprv_req === 1 && val.incapprv_status === 1 && val.hod_apprv_req === 1 && val.hod_apprv_status === 2) ? 'HOD Rejected' :
                                                    (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 1) ? 'HR Approved' :
                                                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'HR Rejected' :
                                                                (val.hod_apprv_req === 1 && val.hod_apprv_status === 1 && val.hr_aprrv_requ === 1 && val.hr_apprv_status === 2) ? 'HR Rejected' : 'HR Approval Pending',
                    }
                    return {
                        ...val,
                        ...obj
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        if (value === 1 || value === '1') {
            getAllLeave()
        } else if (value === '2') {
            getAllHalfDay()
        } else if (value === '3') {
            getAllMisspunch()
        } else if (value === '5') {
            getAllOnHour()
        } else if (value === '6') {
            getAllOnDuty()
        }
    }, [value, count])


    const [columnDef] = useState([
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'status', minWidth: 200, filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hrstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }, minWidth: 200
        }
    ])

    const handleClickIcon = useCallback(async (params) => {
        const { code } = params.data
        dispatch(setCommonSetting())
        dispatch(setShiftDetails())
        if (code === 1) {

            // setLeaveOpen(true)
            // setLeaveData(params.data)
            const { leave_date, em_id } = params.data
            const postdata = {
                emp_id: [em_id],
                // emp_id: [168],
                from: format(startOfMonth(new Date(leave_date)), 'yyyy-MM-dd'),
                to: format(endOfMonth(new Date(leave_date)), 'yyyy-MM-dd'),
            }
            const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
            const { success, data: punchmast } = result.data
            if (success === 1) {
                const leaveDays = punchmast?.filter((val) => val.duty_desc === 'SL' || val.duty_desc === 'CL'
                    || val.duty_desc === 'EL' || val.duty_desc === 'HCL' || val.duty_desc === 'HDCL' || val.duty_desc === 'COFF')
                setPreviousLeave(leaveDays)
                setLeaveOpen(true)
                setLeaveData(params.data)
            } else {
                setPreviousLeave([])
                setLeaveOpen(true)
                setLeaveData(params.data)
            }

        } else if (code === 2) {
            setHalfdayOpen(true)
            setHalfdayData(params.data)
        } else if (code === 3) {
            setMisspunchOpen(true)
            setmisspunchData(params.data)
        } else if (code === 5) {
            console.log(params.data);
            setOneHourOpen(true)
            setOneHourData(params.data)
        } else if (code === 6) {
            const { on_duty_date, em_id } = params.data
            const postData = {
                startDate: format(new Date(on_duty_date), 'yyyy-MM-dd'),
                em_id: em_id
            }
            dispatch(getDutyPlannedShiftForHalfDayRequest(postData));
            setOndutyOpen(true)
            setOndutyData(params.data)
        }
    }, [dispatch])


    return (
        <CustomLayout title="Leave Approval HR" displayClose={true} >
            <LeaveRequestModal open={leaveOpen} setOpen={setLeaveOpen} data={leaveData} setCount={setCount} previousLeave={previousLeave} />
            <NoPunchLeaveRequest open={misspunchOpen} setOpen={setMisspunchOpen} data={misspunchData} setCount={setCount} />
            <HalfDayLeaveRequest open={halfdayOpen} setOpen={setHalfdayOpen} data={halfdayData} setCount={setCount} />
            <OndutyReqstModal open={ondutyOpen} setOpen={setOndutyOpen} data={ondutyData} setCount={setCount} />
            <OneHourReqstModal open={onhourOpen} setOpen={setOneHourOpen} data={oneHourData} setCount={setCount} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 1 }}>
                <Box sx={{ display: 'flex', flex: 1, p: 1, border: '1px solid #e0e0e0' }}>
                    {
                        <CssVarsProvider>
                            {
                                <RadioGroup
                                    defaultValue="female"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChangeRadioBtn}
                                    sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}
                                    size="lg"
                                >
                                    {
                                        leaverequesttype && leaverequesttype?.map((val, idx) => {
                                            return <Box key={idx} sx={{ display: 'flex', flex: 1 }}>
                                                <Radio
                                                    value={val.lrequest_slno}
                                                    label={val.lrequest_type}
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        })
                                    }
                                </RadioGroup>
                            }
                        </CssVarsProvider>
                    }
                </Box>
                <Paper square elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveApprovalHR)