import { Box, Button, Input } from '@mui/joy';
import { Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import React, { lazy, useCallback, useEffect, useState } from 'react'
import { memo } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection'
import HodWiseEmpList from 'src/views/MuiComponents/JoyComponent/HodWiseEmpList'
import { useDispatch, useSelector } from 'react-redux';
import { getEmpNameHodSectionBased, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action'
import LeaveRequestTypeSelect from '../../MuiComponents/JoyComponent/LeaveRequestTypeSelect';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { format } from 'date-fns';
import {
    getEmployeeWiseLeaveReport, getEmployeeWiseHalfdayReport,
    getEmployeeWisemisspunchReport, getEmployeeWiseonehourReport,
    getEmployeeWiseOndutyReport
} from './LeaveReportFunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify';

const EmployeeComponent = lazy(() => import('./EmployeePage'))

const InchargeHodPage = () => {

    const [leaveRequest, setleaveRequest] = useState(0)
    const [self, setSelf] = useState(false)
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [value, setValue] = useState(moment(new Date()));

    const dispatch = useDispatch();
    const [tabledata, setTabledata] = useState([])

    const [leave, setLeave] = useState(0)
    const [halfday, setHalfday] = useState(0)
    const [misspunch, setMisspunch] = useState(0)
    const [onehour, setOnehour] = useState(0)
    const [onduty, setOnduty] = useState(0)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0])
    const { em_id, hod, incharge } = empData;

    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
        }
    }, [dispatch, em_id, hod, incharge])

    const onProcessClick = useCallback(async () => {

        if (leaveRequest === 1) {
            setLeave(1)
            setHalfday(0)
            setMisspunch(0)
            setOnehour(0)
            setOnduty(0)
            const postdata = {
                em_id: emply?.em_id,
                dateyear: format(new Date(value), 'yyyy-MM-dd')
            }
            getEmployeeWiseLeaveReport(postdata).then((values) => {
                const { status, data } = values;
                if (status === 1) {
                    setTabledata(data)
                } else {
                    setTabledata([])
                    infoNofity('There Is No Data To Display');
                }
            })

        } else if (leaveRequest === 2) {
            setHalfday(1)
            setLeave(0)
            setMisspunch(0)
            setOnehour(0)
            setOnduty(0)
            const postdata = {
                em_id: emply?.em_id,
                dateyear: format(new Date(value), 'yyyy-MM-dd')
            }
            getEmployeeWiseHalfdayReport(postdata).then((values) => {
                const { status, data } = values;
                if (status === 1) {
                    setTabledata(data)
                } else {
                    setTabledata([])
                    infoNofity('There Is No Data To Display');
                }
            })
            //misspunch
        } else if (leaveRequest === 3) {
            setMisspunch(1)
            setLeave(0)
            setHalfday(0)
            setOnehour(0)
            setOnduty(0)
            const postdata = {
                em_id: emply?.em_id,
                dateyear: format(new Date(value), 'yyyy-MM-dd')
            }
            getEmployeeWisemisspunchReport(postdata).then((values) => {
                const { status, data } = values;
                if (status === 1) {
                    setTabledata(data)
                } else {
                    setTabledata([])
                    infoNofity('There Is No Data To Display');
                }
            })
            //one hour
        } else if (leaveRequest === 5) {
            setOnehour(1)
            setLeave(0)
            setHalfday(0)
            setMisspunch(0)
            setOnduty(0)
            const postdata = {
                em_id: emply?.em_id,
                dateyear: format(new Date(value), 'yyyy-MM-dd')
            }
            getEmployeeWiseonehourReport(postdata).then((values) => {
                const { status, data } = values;
                if (status === 1) {
                    setTabledata(data)
                } else {
                    setTabledata([])
                    infoNofity('There Is No Data To Display');
                }
            })
        } else if (leaveRequest === 6) {
            setOnduty(1)
            setLeave(0)
            setHalfday(0)
            setMisspunch(0)
            setOnehour(0)
            const postdata = {
                em_id: emply?.em_id,
                dateyear: format(new Date(value), 'yyyy-MM-dd')
            }
            getEmployeeWiseOndutyReport(postdata).then((values) => {
                const { status, data } = values;

                if (status === 1) {
                    setTabledata(data)
                } else {
                    setTabledata([])
                    infoNofity('There Is No Data To Display');
                }
            })
        }
    }, [leaveRequest, value, emply])

    const [leavecolumnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 200, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 200 },
        { headerName: 'Leave Date', field: 'lvDate', wrapText: true, minWidth: 200 },
        { headerName: 'Leave Type', field: 'leavetype_name', minWidth: 200 },
        { headerName: 'Leave Name', field: 'leave_name', minWidth: 200 },
        { headerName: 'Reason', field: 'leave_reason', minWidth: 300 },
        { headerName: 'Incharge Status', field: 'incharge', minWidth: 200 },
        { headerName: 'Hod Status', field: 'hod', minWidth: 200 },
        { headerName: 'HR Status', field: 'HR', minWidth: 200 },
        { headerName: 'Cancel Status', field: 'cancel', minWidth: 200 },
        { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 200 },
    ])

    const [halfdaycolumnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 200, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 200 },
        { headerName: 'Halfday Date', field: 'lvDate', wrapText: true, minWidth: 200 },
        { headerName: 'HalfdayTime', field: 'halfdaytime', minWidth: 200 },
        { headerName: 'Reason', field: 'hf_reason', minWidth: 300 },
        { headerName: 'Incharge Status', field: 'incharge', minWidth: 200 },
        { headerName: 'Hod Status', field: 'hod', minWidth: 200 },
        { headerName: 'HR Status', field: 'HR', minWidth: 200 },
        { headerName: 'Cancel Status', field: 'cancel', minWidth: 200 },
        { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 200 },
    ])

    const [columnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 200, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 200 },
        { headerName: 'Miss punch Date', field: 'lvDate', wrapText: true, minWidth: 200 },
        { headerName: 'Miss punch Time', field: 'misspunchtime', minWidth: 200 },
        { headerName: 'Reason', field: 'np_reason', minWidth: 300 },
        { headerName: 'Incharge Status', field: 'incharge', minWidth: 200 },
        { headerName: 'Hod Status', field: 'hod', minWidth: 200 },
        { headerName: 'HR Status', field: 'HR', minWidth: 200 },
        { headerName: 'Cancel Status', field: 'cancel', minWidth: 200 },
        { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 200 },
    ])

    const [onecolumnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 200, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 300 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 200 },
        { headerName: 'One Hour Date', field: 'lvDate', wrapText: true, minWidth: 200 },
        { headerName: 'One Hour Time', field: 'misspunchtime', minWidth: 200 },
        { headerName: 'Reason', field: 'reason', minWidth: 300 },
        { headerName: 'Incharge Status', field: 'incharge', minWidth: 200 },
        { headerName: 'Hod Status', field: 'hod', minWidth: 200 },
        { headerName: 'HR Status', field: 'HR', minWidth: 200 },
        { headerName: 'Cancel Status', field: 'cancel', minWidth: 200 },
        { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 200 },
    ])

    const [ondutycolumnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 200, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 300 },
        { headerName: 'Section', field: 'sect_name', wrapText: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 200 },
        { headerName: 'On Duty Date', field: 'lvDate', wrapText: true, minWidth: 200 },
        { headerName: 'Reason', field: 'onduty_reason', minWidth: 300 },
        { headerName: 'Incharge Status', field: 'incharge', minWidth: 200 },
        { headerName: 'Hod Status', field: 'hod', minWidth: 200 },
        { headerName: 'HR Status', field: 'HR', minWidth: 200 },
        { headerName: 'Cancel Status', field: 'cancel', minWidth: 200 },
        { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 200 },
    ])


    return (
        <>
            <ToastContainer />
            {
                self === true ? <EmployeeComponent /> :
                    <CustomLayout title="Employee Leave List" displayClose={true} >
                        <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                            <Paper square elevation={0} sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'row', py: 0.3 }}>
                                <Box sx={{ px: 0.5, mt: 1 }} >
                                    <JoyCheckbox
                                        label='Self'
                                        name="self"
                                        checked={self}
                                        onchange={(e) => setSelf(e.target.checked)}
                                    />
                                </Box>

                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <HodWiseDeptSection detSection={section} setSectionValue={changeSection} />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <HodWiseEmpList section={section} setEmployee={getEmployee} />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.3, }}>
                                    <LeaveRequestTypeSelect value={leaveRequest} setValue={setleaveRequest} />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.3, width: '20%', }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year']}
                                            //minDate={subMonths(new Date(), 1)}
                                            maxDate={new Date()}
                                            value={value}
                                            size="sm"
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box sx={{ display: 'flex', px: 0.5, width: '15%' }}>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="danger"
                                        onClick={onProcessClick}
                                        fullWidth
                                        startDecorator={<HourglassEmptyOutlinedIcon />}
                                        sx={{ mx: 0.5 }}
                                    >
                                        Process
                                    </Button>
                                </Box>
                            </Paper>
                            <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                                <CommonAgGrid
                                    columnDefs={misspunch === 1 ? columnDef :
                                        onehour === 1 ? onecolumnDef :
                                            onduty === 1 ? ondutycolumnDef :
                                                halfday === 1 ? halfdaycolumnDef :
                                                    leave === 1 ? leavecolumnDef : []}
                                    tableData={tabledata}
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
            }


        </>
    )
}

export default memo(InchargeHodPage) 