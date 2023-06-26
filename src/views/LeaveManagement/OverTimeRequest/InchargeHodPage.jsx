import { Button, Checkbox, CssVarsProvider, Sheet, Tooltip } from '@mui/joy';
import { Box, FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSectionSelect from '../NightOff/DeptSectionSelect'
import EmployeeUderDeptSec from '../NightOff/EmployeeUderDeptSec'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorNofity, getTotalShiftHours, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { addHours, format, subHours } from 'date-fns'
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeApprovalLevel } from 'src/redux/actions/LeaveReqst.action';
import { ToastContainer } from 'react-toastify';

const InchargeHodPage = ({ em_id, em_department }) => {
    const hodid = useMemo(() => em_id, [em_id])
    const dept = useMemo(() => em_department, [em_department])

    const dispatch = useDispatch();
    const [empid, setEmpid] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [employee, setEmployee] = useState(0)
    const [desgname, setDesgname] = useState('')
    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [selectedShift, setSelectedShift] = useState(0)
    const [shiftname, setShiftname] = useState('')
    const [deptShift, setDeptShift] = useState([])
    const [disableCheck, setDisableCheck] = useState(true)

    const [checkinBox, setCheckIn] = useState(false)
    const [checkoutBox, setCheckOut] = useState(false)

    const [disableIn, setDisableIn] = useState(true)
    const [disableOut, setDisableOut] = useState(true)

    const [punchDetl, setPunchDetl] = useState([])
    const [punchInTime, setPunchInTime] = useState(0);
    const [punchOutTime, setPunchOutTime] = useState(0);

    const [tableData, setTabledata] = useState([])
    const [table, setTable] = useState(false)
    const [count, setCount] = useState(0)

    const [ot_reason, setOt_reason] = useState('')
    const [ot_remark, setOt_remark] = useState('')
    const [ot_amount, setOt_amount] = useState(0)

    const [shift_start, setShiftstart] = useState('')
    const [shift_end, setShiftend] = useState('')
    const [shiftTiming, setShiftTiming] = useState([])
    const [selectedShiftTiming, setselectedShiftTiming] = useState({})

    const [approvalrights, setapprovalrights] = useState({})
    const [saveArray, setSaveArray] = useState([])
    const [dutyday, setdutyday] = useState(new Date())
    const [update, setUpdate] = useState(0)
    const [editslno, setEditslno] = useState(0)

    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = approvalrights;

    useEffect(() => {
        const getEmployeedetails = async (employee) => {
            const result = await axioslogin.get(`/overtimerequest/empmast/details/${employee}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { ot_amount, desg_name, em_id } = data[0]
                setDesgname(desg_name)
                setEmpid(em_id)
                setOt_amount(ot_amount)
            } else {
                setDesgname('')
                setEmpid(0)
                setOt_amount(0)
            }
        }
        getEmployeedetails(employee)

        const getdepartmentShift = async () => {
            if (dept !== 0 && deptSection !== 0) {
                const postData = {
                    dept_id: dept,
                    sect_id: deptSection
                }
                const result = await axioslogin.post('/departmentshift/shift', postData)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0];
                    const obj = JSON.parse(shft_code)
                    setDeptShift(obj);
                    //get shift timing
                    const shiftSlno = await obj?.map(val => val.shiftcode)
                    const shiftArray = await axioslogin.post('/departmentshift/getShiftTiming', shiftSlno);
                    const { succ, result } = await shiftArray.data;
                    if (succ === 1) {
                        setShiftTiming(result)
                    }
                } else if (success === 0) {
                    infoNofity(message);
                } else {
                    errorNofity(message)
                }
            }
        }
        getdepartmentShift();

        dispatch(getEmployeeApprovalLevel(empid))
    }, [employee, dispatch, empid])

    //Get Data
    useEffect(() => {
        if (empid !== 0) {
            const getBoard = async () => {
                const result = await axioslogin.get(`overtimerequest/details/${empid}`)
                const { success, data } = result.data;
                if (success === 1) {
                    setTabledata(data);
                    setCount(0)
                } else if (success === 0) {
                    infoNofity("No Over Time requested to this employee")
                } else {
                    warningNofity(" Error occured contact EDP")
                }
            }
            getBoard();
        }
    }, [empid, count]);

    useEffect(() => {
        if (punchInTime !== 0 && punchOutTime !== 0) {
            setTable(true)
        } else {
            setTable(false)
        }
        if (empApprovalLevel !== undefined) {
            setapprovalrights(empApprovalLevel)
        } else {
            setapprovalrights({})
        }
        const editdata = punchDetl.filter((val) => {
            if (val.punch_time === punchInTime || val.punch_time === punchOutTime) {
                return val
            }
        })
        setSaveArray(editdata)

        const checkpost = {
            punch_in: punchInTime,
            punch_out: punchOutTime,
            emp_id: empid
        }
        const checkpuch = async () => {
            const result = await axioslogin.post('/common/getdutydaycheck', checkpost)
            const { success, data } = result.data;
            if (success === 1) {
                const { duty_day } = data[0]
                if (duty_day !== 'NULL') {
                    setdutyday(duty_day)
                } else {
                    setdutyday(new Date())
                }
            }
        }
        checkpuch()
    }, [punchInTime, punchOutTime, empApprovalLevel, empid])

    //Shift Hours
    const inTime = moment(selectedShiftTiming.inCheck).format("YYYY-MM-DD HH:mm:ss")
    const inTimeValue = moment(inTime)
    const outTime = moment(selectedShiftTiming.outCheck).format("YYYY-MM-DD HH:mm:ss")
    const outTimeValue = moment(outTime)
    const exactWork = getTotalShiftHours(inTimeValue, outTimeValue)

    //Working hours
    const punchIn = moment(new Date(punchInTime)).format("YYYY-MM-DD HH:mm:ss")
    const punchInValue = moment(punchIn)
    const punchOut = moment(new Date(punchOutTime)).format("YYYY-MM-DD HH:mm:ss")
    const punchOutValue = moment(punchOut)
    const working = getTotalShiftHours(punchInValue, punchOutValue)

    //over time
    const overTime = working - exactWork
    var othour = Math.floor(overTime / 60);
    var otminute = overTime % 60;
    var remove = Math.floor(otminute / 1);
    const finaltime = `${othour}:${remove}`;


    //over time rate calculation
    var minRate = 0;
    var hrRate = (othour * ot_amount)
    if (otminute >= 30) {
        minRate = ot_amount / 2
    } else { }
    var amount = hrRate + minRate

    const handleChangeCheckInCheck = useCallback((e) => {
        const checkin = e.target.checked;
        setCheckIn(checkin)
        setDisableIn(!checkin)
    })

    const handleChangeCheckOutCheck = useCallback((e) => {
        const checkout = e.target.checked;
        setCheckOut(checkout)
        setDisableOut(!checkout)
    })

    const getShiftdetail = async () => {
        if (selectedShift === 0) {
            warningNofity("Please Select Any Shift!!")
        } else {
            //GET SHIFT DATA 
            const postData = {
                emp_id: empid,
                duty_day: moment(fromDate).format('YYYY-MM-DD')
            }
            const result = await axioslogin.post('/overtimerequest/shiftdata/', postData);
            const { success, data, message } = result.data;
            if (success === 1) {
                const { punch_slno } = data[0];
                // setPunchSlno(punch_slno)
                const selectedShiftTiming = shiftTiming?.filter(val => val.shft_slno === selectedShift)
                const { shft_chkin_time, shft_chkout_time } = selectedShiftTiming[0]

                const inTime = moment(shft_chkin_time).format('HH:mm:ss');
                const outTime = moment(shft_chkout_time).format('HH:mm:ss');

                setShiftstart(inTime)
                setShiftend(outTime)

                const selecteShiftData = {
                    inCheck: shft_chkin_time,
                    outCheck: shft_chkout_time
                }
                setselectedShiftTiming(selecteShiftData);

                const chekIn = `${moment(fromDate).format('YYYY-MM-DD')} ${inTime}`;
                const chekOut = `${moment(fromDate).format('YYYY-MM-DD')} ${outTime}`;

                if (punch_slno === 0) {
                    warningNofity('No Punch Details')
                    setDisableCheck(true)
                } else {
                    //TO FETCH PUNCH DATA FROM TABLE
                    const postDataForpunchMaster = {
                        date1: format(addHours(new Date(chekOut), 6), 'yyyy-MM-dd H:mm:ss'),
                        date2: format(subHours(new Date(chekIn), 6), 'yyyy-MM-dd H:mm:ss'),
                        em_no: employee
                    }
                    //FETCH THE PUNCH TIME FROM PUNCH DATA
                    const result = await axioslogin.post('overtimerequest/punchdatabydate/', postDataForpunchMaster)
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPunchDetl(data)
                        setDisableCheck(false)
                        succesNofity('Done , Select The Punching Info')
                    } else if (success === 0) {
                        //no record
                        warningNofity('Punching Data Not Found')
                        setDisableCheck(true)
                    } else {
                        // error
                        errorNofity(message)
                    }
                }
            } else {
                warningNofity('Duty Plan Not Done')
            }
        }
    }

    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'OT Date ', field: 'ot_days', filter: true },
        { headerName: 'Request Date', field: 'ot_date', filter: true },
        { headerName: 'Over Time', field: 'over_time', filter: true },
        { headerName: 'OT Reason ', field: 'ot_reson', },
        { headerName: 'OT Remark ', field: 'ot_remarks', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'who', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Edit" followCursor placement='top' arrow >
                        <IconButton sx={{ paddingY: 0.5 }}
                            onClick={() => getData(params)}
                        >
                            <EditIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" followCursor placement='top' arrow >
                        <IconButton sx={{ paddingY: 0.5 }}
                            onClick={() => deletOTRequest(params)}
                        >
                            <DeleteIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    const deletOTRequest = async (params) => {
        const data = params.api.getSelectedRows()
        const { ot_slno } = data[0]
        const result = await axioslogin.delete(`/overtimerequest/delete/${ot_slno}`)
        const { message, success } = result.data;
        if (success === 1) {
            setCount(count - 1)
            succesNofity(message);
        } else {
            warningNofity(" Error occured contact EDP")
            setCount(0)
        }
    }
    const getData = async (params) => {

        setTable(false)
        setUpdate(1)
        const data = params.api.getSelectedRows()
        const { ot_slno, ot_days, ot_shift_id,
            ot_reson, ot_remarks, } = data[0]
        setEditslno(ot_slno)
        setFromDate(ot_days)
        setSelectedShift(ot_shift_id)
        setOt_remark(ot_remarks)
        setOt_reason(ot_reson)
    }

    //post Data
    const postData = useMemo(() => {
        return {
            emp_id: empid,
            em_no: employee,
            ot_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            ot_days: moment(fromDate).format('YYYY-MM-DD'),
            ot_shift_id: selectedShift,
            check_in: punchInTime,
            check_out: punchOutTime,
            over_time: overTime,
            ot_reson: ot_reason,
            ot_remarks: ot_remark,
            ot_convert: 0,
            ot_amount: amount,
            ot_inch_require: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (authorization_incharge === 1 && incharge === 0) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            ot_inch_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (authorization_incharge === 1 && incharge === 0) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            ot_inch_remark: (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                (authorization_incharge === 1 && incharge === 0) ? "DIRECT" :
                    (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
            ot_hod_require: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 1 && hod === 0) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
            ot_hod_status: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 1 && hod === 0) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
            ot_hod_remark: (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                (authorization_hod === 1 && hod === 0) ? 'DIRECT' :
                    (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
            ot_hr_require: 1,
            ot_ceo_require: co_assign === undefined ? 0 : co_assign,
            ot_deptsec_id: deptSection,
            duty_day: moment(dutyday).format("YYYY-MM-DD")
        }
    }, [empid, co_assign, employee, fromDate, selectedShift, punchInTime,
        punchOutTime, overTime, ot_reason, ot_remark, amount, incharge, hod,
        authorization_incharge, authorization_hod, deptSection, dutyday])

    const patchData = useMemo(() => {
        return {
            ot_reson: ot_reason,
            ot_remarks: ot_remark,
            ot_slno: editslno
        }
    }, [ot_reason, ot_remark, editslno])

    const submitRequest = async () => {
        const obj = {
            punch_taken: 2
        }
        const array = saveArray.map((item) => item.punch_taken === 0 ? { ...item, ...obj } : item);
        if (update === 0) {
            if (overTime >= 60) {
                const result = await axioslogin.post('/overtimerequest/create', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    const result = await axioslogin.patch('/overtimerequest/update/punch', array)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity("Over Time Requested Successfully");
                        setTable(false)
                        setSelectedShift(0)
                        setCount(count + 1)
                        setDisableCheck(true)
                        setOt_reason('')
                        setOt_remark('')
                        setdutyday(new Date())
                        setDeptSection(0)
                        setEmployee(0)
                        setFromDate(new Date())
                    } else {
                        infoNofity(message)
                    }

                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
            else {
                warningNofity(" Over Time Less Than 1 Hour so do not applay for OT")
                setTable(false)
                setSelectedShift(0)
                setDisableCheck(true)
                setOt_reason('')
                setOt_remark('')
                setdutyday(new Date())
                setDeptSection(0)
                setEmployee(0)
                setFromDate(new Date())
            }
        } else {
            const result = await axioslogin.patch('/overtimerequest', patchData)
            const { message, success } = result.data;
            if (success === 2) {
                succesNofity(message);
                setTable(false)
                setSelectedShift(0)
                setCount(count + 1)
                setDisableCheck(true)
                setOt_reason('')
                setOt_remark('')
                setdutyday(new Date())
                setUpdate(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }

    return (
        <CustomLayout title="Over Time request" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper elevation={0} sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                        <DeptSectionSelect em_id={hodid} value={deptSection} setValue={setDeptSection} />
                    </Box>
                    <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                        <EmployeeUderDeptSec value={employee} setValue={setEmployee} deptSect={deptSection} />
                    </Box>
                    <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={employee}
                            disabled
                        />
                    </Box>
                    <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={desgname}
                            disabled
                        />
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                    <Box sx={{ width: '15%', p: 0.5, mt: 0.2 }} >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                views={['day']}
                                inputFormat="DD-MM-YYYY"
                                value={fromDate}
                                onChange={setFromDate}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ pl: 0., width: '20%', mt: 0.2 }} >
                        <FormControl
                            fullWidth={true}
                            margin="dense"
                            size='small'
                        >
                            <Select
                                fullWidth
                                variant="outlined"
                                margin='dense'
                                size='small'
                                defaultValue={0}
                                value={selectedShift}
                                onChange={(e, { props }) => {
                                    setSelectedShift(e.target.value)
                                    setShiftname(props.children)
                                }}
                            >
                                <MenuItem value={0} disabled>Select Shift</MenuItem>
                                {
                                    deptShift?.map((val) => {
                                        return <MenuItem value={val.shiftcode}
                                            name={val.shiftDescription} key={val.shiftcode} >{val.shiftDescription}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '5%', p: 0.5, mt: 0.2 }} >
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    getShiftdetail()
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: '60%', }}>
                        <Box sx={{ width: '100%', px: 0.5, alignItems: 'center', display: "flex", flexDirection: 'row' }} >
                            <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
                                <CssVarsProvider>
                                    <Sheet variant="outlined" sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        flex: 1,
                                        paddingX: 2,
                                        paddingY: 1.15,
                                        borderRadius: 5,
                                        // height: 10,
                                        '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                                        // backgroundColor: 'green'
                                    }}>
                                        <Checkbox
                                            overlay
                                            label={`Check In`}
                                            variant="outlined"
                                            size="lg"
                                            disabled={disableCheck}
                                            onChange={(e) => handleChangeCheckInCheck(e)}
                                            checked={checkinBox}
                                        />
                                    </Sheet>
                                </CssVarsProvider>
                            </Box>

                            {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                            <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
                                <FormControl
                                    fullWidth={true}
                                    margin="dense"
                                    size='small'
                                    sx={{ display: "flex", flex: 2 }}
                                >
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        margin='dense'
                                        size='small'
                                        defaultValue={0}
                                        disabled={disableIn}
                                        value={punchInTime}
                                        onChange={useCallback((e) => setPunchInTime(e.target.value))}
                                    >
                                        <MenuItem value={0} disabled>Check In Time</MenuItem>
                                        {
                                            punchDetl?.map((val, index) => {
                                                return <MenuItem value={val.punch_time} key={index} >{val.punch_time}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: "flex", p: 0.2, flex: 1, alignItems: 'center' }} >
                                <CssVarsProvider>
                                    <Sheet variant="outlined"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            flex: 1,
                                            paddingX: 2,
                                            paddingY: 1.15,
                                            borderRadius: 5,
                                            '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
                                        }}>
                                        <Checkbox
                                            overlay
                                            label={`Check Out`}
                                            variant="outlined"
                                            size="lg"
                                            disabled={disableCheck}
                                            onChange={(e) => handleChangeCheckOutCheck(e)}
                                            checked={checkoutBox}
                                        />
                                    </Sheet>
                                </CssVarsProvider>
                            </Box>

                            {/* SELECT OPTION FOR HALF SHIFT SELECTION */}
                            <Box sx={{ display: "flex", p: 0.2, flex: 2 }} >
                                <FormControl
                                    fullWidth={true}
                                    margin="dense"
                                    size='small'
                                    sx={{ display: "flex", flex: 2 }}
                                >
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        margin='dense'
                                        size='small'
                                        defaultValue={0}
                                        disabled={disableOut}
                                        value={punchOutTime}
                                        onChange={useCallback((e) => setPunchOutTime(e.target.value))}
                                    >
                                        <MenuItem value={0} disabled>Check Out Time</MenuItem>
                                        {
                                            punchDetl?.map((val, index) => {
                                                return <MenuItem value={val.punch_time} key={index} >{val.punch_time}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box >
                    </Box>
                </Box>
                <Box>
                    {
                        table === true ? <TableContainer sx={{ maxHeight: 150 }}>
                            <Table size="small" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Shift</TableCell>
                                        <TableCell align="center">Shift Start</TableCell>
                                        <TableCell align="center">Shift end</TableCell>
                                        <TableCell align="center">Punch In</TableCell>
                                        <TableCell align="center">Punch Out</TableCell>
                                        <TableCell align="center">OT(In hour)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">{moment(fromDate).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell align="center">{shiftname}</TableCell>
                                        <TableCell align="center">{shift_start}</TableCell>
                                        <TableCell align="center">{shift_end}</TableCell>
                                        <TableCell align="center">{punchInTime}</TableCell>
                                        <TableCell align="center">{punchOutTime}</TableCell>
                                        <TableCell align="center">{finaltime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> : null
                    }
                </Box>
                <Box sx={{ wisth: '100%', display: 'flex', flexDirection: 'row', }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            placeholder="Over Time Reason"
                            fullWidth
                            id="fullWidth"
                            size="small"
                            value={ot_reason}
                            onChange={(e) => setOt_reason(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            fullWidth
                            placeholder="Over Time Remark"
                            id="fullWidth"
                            size="small"
                            value={ot_remark}
                            onChange={(e) => setOt_remark(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ px: 0.5, mt: 0.2 }}>
                        <CssVarsProvider>
                            <Tooltip title="Save Request" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitRequest}
                                >
                                    Save Request
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Paper square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={column}
                        tableData={tableData}
                        sx={{
                            height: 400,
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

export default InchargeHodPage