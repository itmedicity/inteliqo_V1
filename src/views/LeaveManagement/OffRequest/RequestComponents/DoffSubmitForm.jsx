import { Box, Paper } from '@mui/material'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { Button, IconButton, Input, Textarea, Tooltip, Typography } from '@mui/joy';
import { addDays, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited, getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DeleteIcon from '@mui/icons-material/Delete';

const Doffcancel = lazy(() => import('./DoffCancelModal'))

const DoffSubmitForm = () => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [planSlno, setPlanSlno] = useState(0)
    const [requiredDate, setRequiredDate] = useState(moment(new Date()))

    const [reson, setReason] = useState('')
    const [shiftDesc, setShiftDesc] = useState('Data Not Found');

    const [tableData, setTableData] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [empdata, setEmpdata] = useState({})
    const [count, setCount] = useState(0)
    const [doffPlanSlno, setDoffPlanSlno] = useState(0)

    const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
    const { em_no, em_id, em_dept_section, } = selectedEmpInform;

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { em_id: loginEmid } = empInformationFromRedux;

    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { doff } = commonStates;

    useEffect(() => {
        const getDoff = async () => {
            const getID = {
                em_id: em_id
            }
            const result = await axioslogin.post('/OffRequest/getDoff', getID)
            const { data, success } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    return {
                        ...val,
                        twentyDuty: format(new Date(val.duty_date), 'dd-MM-yyyy'),
                        doffdate: format(new Date(val.required_date), 'dd-MM-yyyy'),
                        deleteStatus: val.delete_status === 1 ? "Request Cancelled" : "NIL"
                    }
                })
                setTableData(arr)
            } else {
                setTableData([])
            }
        }

        if (em_id !== 0) {
            getDoff(em_id)
        }
    }, [em_id, count])


    const handleChangeDate = useCallback(async (date) => {
        setFromDate(date)
        const postData = {
            startDate: format(new Date(date), 'yyyy-MM-dd'),
            em_id: em_id
        }
        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
        const { success, data } = result.data;
        if (success === 1) {
            const { plan_slno, attendance_update_flag, shft_desc, twenty_four } = data[0];
            if (attendance_update_flag === 1) {
                warningNofity("This Date Is Already Used For DOFF Request")
                setFromDate(moment(new Date()))
            } else if (twenty_four === 0) {
                warningNofity("This Shift Is Not Applicable For Doff Request!")
            }
            else {
                setShiftDesc(shft_desc)
                setPlanSlno(plan_slno)
            }

        } else {
            warningNofity("Duty Not Planned For the Selected Date")
            setPlanSlno(0)
            // setShiftId(0)
        }
    }, [em_id])

    useEffect(() => {
        const getOffShift = async () => {
            const postData = {
                startDate: format(new Date(requiredDate), 'yyyy-MM-dd'),
                em_id: em_id
            }
            const result = await axioslogin.post('LeaveRequest/gethafdayshift/', postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { plan_slno, } = data[0];
                setDoffPlanSlno(plan_slno)
            } else {
                setDoffPlanSlno(0)
            }
        }
        getOffShift()
    }, [requiredDate])

    const SubmitDoffRequest = useCallback(async () => {
        setOpenBkDrop(true)
        const savedata = {
            em_no: em_no,
            em_id: em_id,
            duty_date: format(new Date(fromDate), 'yyyy-MM-dd'),
            required_date: format(new Date(requiredDate), 'yyyy-MM-dd'),
            create_user: loginEmid,
            reason: reson,
            duty_day: format(new Date(requiredDate), 'yyyy-MM-dd'),
            emp_id: em_id,
            shift_id: doff,
            plan_slno: planSlno,
            doffPlanSlno: doffPlanSlno
        }

        if (reson === '') {
            setOpenBkDrop(false)
            warningNofity("Add Reason!")

        } else {
            const holidayData = {
                em_id: em_id,
                date: format(new Date(fromDate), 'yyyy-MM-dd')
            }

            const result = await axioslogin.post('/LeaveRequest/getHoliday', holidayData)
            const { success, data } = result.data;
            if (success === 1) {
                const { lvereq_desc } = data[0]
                if (lvereq_desc === 'P' || lvereq_desc === 'LC') {
                    const monthStartDate = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                    const postData = {
                        month: monthStartDate,
                        section: em_dept_section
                    }
                    const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
                    const { success, data } = checkPunchMarkingHr.data
                    if (success === 0 || success === 1) {
                        const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                        const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                        if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                            warningNofity("Punch Marking Monthly Process Done !! Can't Apply DOFF Request!!  ")
                            setOpenBkDrop(false)
                        } else {
                            const result = await axioslogin.post('/OffRequest/create', savedata)
                            const { success, message } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setOpenBkDrop(false)
                            } else {
                                warningNofity(message)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        errorNofity("Error getting PunchMarkingHR ")
                        setOpenBkDrop(false)
                    }
                } else {
                    warningNofity("Attendance Description Must be P or LC")
                    setOpenBkDrop(false)
                }

            } else {
                warningNofity("Duty plan data not found, Contact IT")
                setOpenBkDrop(false)
            }
        }

    }, [reson, em_id, fromDate, em_dept_section, em_no, loginEmid, requiredDate, planSlno, doff])


    const [columndef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Emp Name', field: 'em_name', minWidth: 200, filter: true },
        { headerName: '24 Duty Date ', field: 'twentyDuty', filter: true, minWidth: 200 },
        { headerName: 'Off Date', field: 'doffdate', filter: true, minWidth: 200 },
        { headerName: 'Status', field: 'deleteStatus', filter: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params => {
                if (params.data.cancelStatus === 1) {
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
        setDeleteOpen(true)
        setEmpdata(data)
    }, [])

    return (
        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
            <Doffcancel open={deleteOpen} setOpen={setDeleteOpen} empData={empdata} setCount={setCount} />
            <CustomBackDrop open={openBkDrop} text="Please wait !. Submitting DOFF Request" />
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center' }} >
                <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >24 Duty Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={fromDate}
                            size="small"
                            onChange={handleChangeDate}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Input
                        size="md"
                        fullWidth
                        placeholder='Duty OFF'
                        disabled
                    />
                </Box>
                <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                    <Input
                        size="md"
                        fullWidth
                        variant="outlined"
                        value={shiftDesc}
                        disabled
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                    <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >OFF Required Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['day']}
                            inputFormat="dd-MM-yyyy"
                            value={requiredDate}
                            minDate={new Date(fromDate)}
                            maxDate={addDays(new Date(fromDate), 30)}
                            size="small"
                            onChange={(newValue) => {
                                setRequiredDate(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center', }} >
                <Box sx={{ px: 0.5, mt: 0.5, flex: 1 }}>
                    <Tooltip title="reason" followCursor placement='top' arrow variant='outlined' color='success'  >
                        <Box sx={{ p: 1 }} >
                            <Textarea
                                color="warning"
                                defaultValue=''
                                placeholder="DOFF Request Reason ..."
                                size="md"
                                variant="outlined"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', }} >
                    <Tooltip title="Save Compansatory Off Request" variant="outlined" color="success" placement="top" followCursor arrow>
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            fullWidth
                            color="primary"
                            onClick={SubmitDoffRequest}
                        >
                            Save Request
                        </Button>
                    </Tooltip>
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

export default memo(DoffSubmitForm) 