
import { Box, Button, Checkbox, IconButton, Input, Option, Select, Table, Textarea, Tooltip, Typography } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited, getInchargeHodAuthorization, getLeaveReqApprovalLevel, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { Paper } from '@mui/material';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';

const DeleteOnduty = lazy(() => import('./OnDutyCancelModal'))

const OnDutyRequest = () => {

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [dates, setDates] = useState([])
    const [remark, setRemark] = useState('')
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [empdata, setEmpdata] = useState({})

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_department, em_dept_section, } = selectedEmpInform;

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod: loginHod, incharge: loginIncharge, em_id: loginEmid, groupmenu } = empInformationFromRedux;

    const apprLevel = useSelector((state) => getLeaveReqApprovalLevel(state))
    const deptApprovalLevel = useMemo(() => apprLevel, [apprLevel])

    //CHEK THE AURHORISED USER GROUP
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])



    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])


    useEffect(() => {
        const getOnDuty = async (em_id) => {
            const getID = {
                em_id: em_id
            }
            const result = await axioslogin.post('/CommonReqst/onduty/empwise', getID)
            const { data, success } = result.data;
            if (success === 1) {
                const array1 = data && data.filter((val) => {
                    return (val.em_id === em_id)
                })
                const newOnduty = array1.map((val) => {
                    return {
                        ...val,
                        typeslno: 2,
                        em_no: val.em_no,
                        type: 'On Duty Request',
                        slno: val.onduty_slno,
                        serialno: val.serialno,
                        empname: val.em_name,
                        sectname: val.sect_name,
                        reqDate: format(new Date(val.request_date), 'dd-MM-yyyy'),
                        dutyDate: format(new Date(val.on_duty_date), 'dd-MM-yyyy'),
                        reason: val.onduty_reason,
                        inchStatus: val.incharge_approval_status,
                        hodStatus: val.hod_approval_status,
                        hrstatus: val.hr_approval_status,
                        cancelStatus: val.cancel_status,
                        status: val.cancel_status === 1 ? 'Request Cancelled' :
                            (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                                (val.incharge_req_status === 1 && val.incharge_approval_status === 2) ? 'Incharge Approved' :
                                    (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                        (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                            (val.incharge_req_status === 0 && val.incharge_approval_status === 0 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                (val.incharge_req_status === 1 && val.incharge_approval_status === 1 && val.hod_req_status === 1 && val.hod_approval_status === 2) ? 'HOD Rejected' :
                                                    (val.hod_req_status === 1 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                        (val.hod_req_status === 0 && val.hod_approval_status === 0 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                            (val.hod_req_status === 1 && val.hod_approval_status === 1 && val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'HR Approved' :
                                                                (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'HR Reject' : 'HR Approval Pending',
                    }
                })
                setTableData(newOnduty)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        if (em_id !== 0) {
            getOnDuty(em_id)
        }

    }, [em_id, count])

    useEffect(() => {
        const getdepartmentShift = async () => {
            if (em_department !== 0 && em_dept_section !== 0) {
                const postData = {
                    dept_id: em_department,
                    sect_id: em_dept_section
                }
                const result = await axioslogin.post('/departmentshift/shift', postData)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0];
                    const obj = JSON.parse(shft_code)
                    setDeptShift(obj);
                } else if (success === 0) {
                    warningNofity(message);
                } else {
                    errorNofity(message)
                }
            }
        }
        getdepartmentShift();
    }, [em_department, em_dept_section])

    const Displaydata = useCallback(async () => {
        if (selectedShift === 0) {
            warningNofity("Plaese select any shift")
        } else {
            var dateArray = [];
            var currentDate = fromDate;
            var stopDate = toDate;
            while (currentDate <= stopDate) {
                dateArray.push(format(new Date(currentDate), 'yyyy-MM-dd'),)
                currentDate = addDays(new Date(currentDate), 1);
            }
            const arr = dateArray.map((val) => {
                const obj = {
                    "date": val,
                    "inValue": false,
                    "outValue": false
                }
                return obj
            })
            setDates(arr)
        }
    }, [fromDate, selectedShift, toDate])

    const getValue = async (e, val) => {
        let arr = dates.map((item) => item.date === val.date ? { ...item, inValue: e } : item)
        setDates(arr)
    }
    const getoutvalue = async (e, val) => {
        let arr = dates.map((item) => item.date === val.date ? { ...item, outValue: e } : item)
        setDates(arr)
    }

    const Submitrequest = useCallback(async () => {

        const approveStatus = await getInchargeHodAuthorization(masterGroupStatus, deptApprovalLevel, loginHod, loginIncharge, loginEmid)

        const postArray = dates.map((val) => {
            const obj = {
                em_id: em_id,
                em_no: em_no,
                dept_id: em_department,
                dept_sect_id: em_dept_section,
                request_date: format(new Date(), 'yyyy-MM-dd H:m:s'),
                on_duty_date: format(new Date(val.date), 'yyyy-MM-dd'),
                shift_id: selectedShift,
                in_time: val.inValue === true ? 1 : 0,
                out_time: val.outValue === true ? 1 : 0,
                onduty_reason: remark,
                attendance_marking_month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                incharge_req_status: approveStatus.inc_apr,
                incharge_approval_status: approveStatus.inc_stat,
                incharge_approval_comment: approveStatus.inc_cmnt,
                incharge_approval_date: approveStatus.inc_apr_time,
                incharge_empid: approveStatus.usCode_inch,
                hod_req_status: approveStatus.hod_apr,
                hod_approval_status: approveStatus.hod_stat,
                hod_approval_comment: approveStatus.hod_cmnt,
                ceo_req_status: 0,
                hr_req_status: 1,
                hod_approval_date: approveStatus.hod_apr_time,
                hod_empid: approveStatus.usCode_hod,

            }
            return obj
        })

        const monthStartDate = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
        const dateCheck = {
            month: monthStartDate,
            section: em_dept_section
        }

        if (remark === '') {
            warningNofity("Please Add Remark!")
        } else {
            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", dateCheck);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                if (lastUpdateDate === lastDay_month) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                } else {
                    const postdata = {
                        fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
                        toDate: format(new Date(toDate), 'yyyy-MM-dd'),
                        em_no: em_no,
                        postArray: postArray
                    }
                    const result = await axioslogin.post('/CommonReqst/onduty/create', postdata)
                    const { message, success } = result.data;
                    if (success === 3) {
                        succesNofity(message)
                        setFromDate(new Date())
                        setToDate(new Date())
                        setRemark('')
                        setSelectedShift(0)
                        setDates([])
                        setCount(Math.random())
                    } else if (success === 2) {
                        warningNofity(message)
                        setFromDate(new Date())
                        setToDate(new Date())
                        setRemark('')
                        setSelectedShift(0)
                        setDates([])
                    } else {
                        errorNofity(message)
                        setFromDate(new Date())
                        setToDate(new Date())
                        setRemark('')
                        setSelectedShift(0)
                        setDates([])
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }

    }, [em_dept_section, fromDate, remark, em_id, em_no, em_department, selectedShift, dates,
        deptApprovalLevel, masterGroupStatus, loginEmid, loginIncharge, loginHod, toDate])


    const [columndef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Emp Name', field: 'empname', minWidth: 200, filter: true },
        { headerName: 'Department Section ', field: 'sectname', minWidth: 250, filter: true },
        { headerName: 'Request Type ', field: 'type', minWidth: 200, filter: true },
        { headerName: 'Duty Date ', field: 'dutyDate', filter: true, minWidth: 200 },
        { headerName: 'Request Date', field: 'reqDate', filter: true, minWidth: 200 },
        { headerName: 'Reason ', field: 'reason', minWidth: 200 },
        { headerName: 'Status', field: 'status', filter: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params => {
                if (params.data.hrstatus === 1 || params.data.inchStatus === 1 || params.data.hodStatus === 1 || params.data.cancelStatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5 }} >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => deleteRequest(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                }
            }
        },
    ])

    const deleteRequest = useCallback(async (params) => {
        const data = params.data
        const { hrstatus } = data;
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        }
        else if (hrstatus === 2) {
            warningNofity("HR Rejected, You can't delete request")
        } else {
            setDeleteOpen(true)
            setEmpdata(data)
        }
    }, [])

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5, }}>
            <DeleteOnduty open={deleteOpen} setOpen={setDeleteOpen} empData={empdata} setCount={setCount} />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%', mt: 0.5 }}>
                <Box sx={{ width: '30%', px: 0.5 }} >
                    <Select
                        defaultValue={selectedShift}
                        onChange={(event, newValue) => {
                            setSelectedShift(newValue);
                        }}
                        size='sm'
                        sx={{ width: '100%' }}
                        variant='outlined'
                        color='primary'
                    >
                        <Option value={0} disabled >Select Shift ...</Option>
                        {
                            deptShift?.map((val, index) => {
                                return <Option key={index} value={val.shiftcode}>{val.shiftDescription}</Option>
                            })
                        }
                    </Select>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={fromDate}
                            size="small"
                            onChange={setFromDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            minDate={new Date(fromDate)}
                            maxDate={lastDayOfMonth(new Date(fromDate))}
                            value={toDate}
                            size="small"
                            onChange={setToDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ px: 0.5, }}>
                    <Button
                        variant="outlined"
                        component="label"
                        size="md"
                        color="primary"
                        onClick={Displaydata}
                    >
                        Select Date
                    </Button>

                </Box>
            </Box>
            <Box sx={{}}>
                <Paper variant="outlined"
                    sx={{
                        maxHeight: screenInnerHeight * 40 / 100, p: 1, m: 0.3, overflow: 'auto',

                    }} >
                    <Table
                        aria-label="basic table"
                        color="neutral"
                        size="sm"
                        variant="plain"
                    >
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', }}> Date</th>
                                <th style={{ textAlign: 'center', }}>IN </th>
                                <th style={{ textAlign: 'center', }}>OUT</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                dates?.map((val, idx) =>
                                    <tr key={idx} style={{ p: 0, m: 0 }} >
                                        <td style={{ textAlign: 'center', }}>
                                            <Box  >

                                                <Typography
                                                    level="title-md"
                                                    textColor="var(--joy-palette-success-plainColor)"
                                                    fontFamily="monospace"
                                                    sx={{ opacity: '80%' }}
                                                >
                                                    {val.date}
                                                </Typography>
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'center' }} >
                                            <Box>
                                                <Checkbox
                                                    checked={val?.inValue || false}
                                                    // disabled={val?.duty_desc !== 'A' ? true : val?.shift_id === default_shift ? true : false}
                                                    onChange={(e) => {
                                                        getValue(e.target.checked, val)
                                                    }}
                                                />
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            <Box>
                                                <Checkbox
                                                    checked={val?.outValue || false}
                                                    onChange={(e) => {
                                                        getoutvalue(e.target.checked, val)
                                                    }}
                                                />
                                            </Box>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ pr: 1, flex: 1 }}>
                    <Tooltip title="reason" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Box sx={{ p: 1 }} >
                            <Textarea
                                label="Outlined"
                                placeholder="Reason"
                                variant="outlined"
                                color="warning"
                                size="md"
                                minRows={1}
                                maxRows={2}
                                name='remark'
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    </Tooltip>
                </Box>
                <Box sx={{ px: 0.5, mt: 0.9 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        size="md"
                        color="primary"
                        onClick={Submitrequest}
                    >
                        Save Request
                    </Button>
                </Box>
            </Box>

            <Paper square sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid
                    columnDefs={columndef}
                    tableData={tableData}
                    sx={{
                        height: 400,
                        width: "100%"
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Paper>

        </Paper>
    )
}

export default memo(OnDutyRequest) 