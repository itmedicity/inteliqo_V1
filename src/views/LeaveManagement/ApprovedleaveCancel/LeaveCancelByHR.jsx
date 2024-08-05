import { CssVarsProvider, Radio, RadioGroup } from '@mui/joy';
import { IconButton, Paper, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { getleaverequest } from 'src/views/CommonCode/Commonfunc';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { format } from 'date-fns';

const HalfdayModal = lazy(() => import('./ModalComponents/HalfdayModal'))
const MisspunchModal = lazy(() => import('./ModalComponents/MisspunchModal'))
const OnDutyModal = lazy(() => import('./ModalComponents/OnDutyModal'))
const OneHourModal = lazy(() => import('./ModalComponents/OneHourModal'))
const LeaveRqModal = lazy(() => import('./ModalComponents/LeaveRqModal'))

const LeaveCancelByHR = () => {
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
    }, [count])


    useEffect(() => {

        const getAllOnHour = async () => {
            const result = await axioslogin.get('/CommonReqst/hrApproved/onehour')
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
                        one_hour_day: format(new Date(val.one_hour_duty_day), 'dd-MM-yyyy')
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
            const result = await axioslogin.get('/CommonReqst/hrApproved/Onduty')
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
                        on_dutydate: format(new Date(val.on_duty_date), 'dd-MM-yyyy')
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
            const resultdel = await axioslogin.get('/LeaveRequestApproval/hrApproved/misspunch');
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
                        nopunch_date: format(new Date(val.nopunchdate), 'dd-MM-yyyy')
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
            const resultdel = await axioslogin.get('/LeaveRequestApproval/hrApproved/halfday');
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
                        halfday_date: format(new Date(val.leavedate), 'dd-MM-yyyy')
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
            const resultdel = await axioslogin.get('/LeaveRequestApproval/hrApproved/Leavereqst');
            const { success, data } = await resultdel.data;
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

        if (value === 1) {
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
        // { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department ', field: 'department', minWidth: 200, filter: true },
        { headerName: 'Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Request Date', field: 'requestDate', filter: true, minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.cancelstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Cancel Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Cancel">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }
        },
    ])

    const handleClickIcon = useCallback(async (params) => {
        const { code } = params.data
        if (code === 1) {
            setLeaveOpen(true)
            setLeaveData(params.data)
        } else if (code === 2) {
            setHalfdayOpen(true)
            setHalfdayData(params.data)
        } else if (code === 3) {
            setMisspunchOpen(true)
            setmisspunchData(params.data)
        } else if (code === 5) {
            setOneHourOpen(true)
            setOneHourData(params.data)

        } else if (code === 6) {
            setOndutyOpen(true)
            setOndutyData(params.data)
        }
    }, [])

    return (
        <CustomLayout title="Approved Leave Cancel By HR" displayClose={true} >
            <OneHourModal open={onhourOpen} setOpen={setOneHourOpen} onhourdata={oneHourData} setCount={setCount} />
            <OnDutyModal open={ondutyOpen} setOpen={setOndutyOpen} ondutyData={ondutyData} setCount={setCount} />
            <MisspunchModal open={misspunchOpen} setOpen={setMisspunchOpen} missData={misspunchData} setCount={setCount} />
            <HalfdayModal open={halfdayOpen} setOpen={setHalfdayOpen} empData={halfdayData} setCount={setCount} />
            <LeaveRqModal open={leaveOpen} setOpen={setLeaveOpen} empData={leaveData} setCount={setCount} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex', flex: 1, p: 1 }}>
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
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
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

export default memo(LeaveCancelByHR) 