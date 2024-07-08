import { Button, CssVarsProvider, Typography } from '@mui/joy'
import { Box, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { lastDayOfMonth, startOfMonth } from 'date-fns'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import _ from 'underscore'

const OnDutyRequest = () => {

    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section, hod: empHodStat } = selectedEmployeeDetl?.[0];

    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [toDate, setToDate] = useState(moment(new Date()))
    const [viewTable, setViewTable] = useState(0)
    const [dates, setDates] = useState([])
    const [remark, setRemark] = useState('')
    const [deptShift, setDeptShift] = useState([])
    const [selectedShift, setSelectedShift] = useState(0)

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

    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel

    const Displaydata = useCallback(async () => {
        if (selectedShift === 0) {
            warningNofity("Plaese select any shift")
        } else {
            var dateArray = [];
            var currentDate = moment(fromDate);
            var stopDate = moment(toDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
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
            setViewTable(1)
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

    const Submitrequest = async () => {
        const postArray = dates.map((val) => {
            const obj = {
                em_id: em_id,
                em_no: em_no,
                dept_id: em_department,
                dept_sect_id: em_dept_section,
                request_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                on_duty_date: val.date,
                shift_id: selectedShift,
                in_time: val.inValue === true ? 1 : 0,
                out_time: val.outValue === true ? 1 : 0,
                onduty_reason: remark,
                attendance_marking_month: moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD'),
                incharge_req_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                    (authorization_incharge === 1 && incharge === 0) ? 1 :
                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                incharge_approval_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                    (hod === 1) ? 1 :
                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
                incharge_approval_comment: (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                    (hod === 1) ? "DIRECT" :
                        (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
                incharge_approval_date: (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                        (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
                hod_req_status: (authorization_hod === 1 && hod === 1) ? 1 :
                    (authorization_hod === 1 && hod === 0) ? 1 :
                        (authorization_hod === 0 && hod === 1) ? 1 : 0,
                hod_approval_status: (authorization_hod === 1 && hod === 1) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
                hod_approval_comment: (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                    (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
                hod_approval_date: (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
                ceo_req_status: empHodStat === 1 ? 1 : 0,
                hr_req_status: 1
            }
            return obj
        })

        const monthStartDate = moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD')
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
                const lastUpdateDate = data?.length === 0 ? moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD') : moment(new Date(data[0]?.last_update_date)).format('YYYY-MM-DD')
                const lastDay_month = moment(lastDayOfMonth(new Date(fromDate))).format('YYYY-MM-DD')

                if (lastUpdateDate === lastDay_month) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                } else {
                    const result = await axioslogin.post('/CommonReqst/onduty/create', postArray)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        setFromDate(moment(new Date()))
                        setToDate(moment(new Date()))
                        setViewTable(0)
                        setRemark('')
                        setSelectedShift(0)
                    } else {
                        errorNofity(message)
                        setFromDate(moment(new Date()))
                        setToDate(moment(new Date()))
                        setViewTable(0)
                        setRemark('')
                        setSelectedShift(0)
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }

    }
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
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
                            onChange={(e) => {
                                setSelectedShift(e.target.value)
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
                <Box sx={{ pl: 1, mt: 2 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary" >
                            From Date
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ p: 0.5, mt: 0.2 }} >
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
                <Box sx={{ pl: 1, mt: 2 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary" >
                            To Date
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ p: 0.5, mt: 0.2 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={toDate}
                            onChange={setToDate}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ px: 0.5, mt: 0.9 }}>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={Displaydata}
                        >
                            Select Date
                        </Button>
                    </CssVarsProvider>
                </Box>
            </Box>
            <Box sx={{ width: 500 }}>
                {
                    viewTable === 1 ? <TableContainer sx={{}}>
                        <Table size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">In</TableCell>
                                    <TableCell align="center">Out</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dates?.map((val, ind) => {
                                        return <TableRow key={ind}>
                                            <TableCell align="center">{val.date}</TableCell>
                                            <TableCell align="center"><CommonCheckBox
                                                checked={val?.inValue || false}
                                                onChange={(e) => {
                                                    getValue(e.target.checked, val)
                                                }}
                                            /></TableCell>
                                            <TableCell align="center"><CommonCheckBox
                                                name="out"
                                                // value={contractTpPermanent}
                                                checked={val?.outValue || false}
                                                onChange={(e) => {
                                                    getoutvalue(e.target.checked, val)
                                                }}
                                            /></TableCell>

                                        </TableRow>
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer> : null
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ pr: 1, flex: 1 }}>
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex" }}
                        minRows={2}
                        placeholder="Add Remark"
                        value={remark}
                        name="remark"
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </Box>
                <Box sx={{ px: 0.5, mt: 0.9 }}>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={Submitrequest}
                        >
                            Save Request
                        </Button>
                        {/* </Tooltip> */}
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(OnDutyRequest) 