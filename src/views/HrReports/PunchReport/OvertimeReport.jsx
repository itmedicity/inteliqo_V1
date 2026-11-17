import { Button, Box, IconButton, CssVarsProvider, Typography, Input } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import ReportLayout from '../ReportComponent/ReportLayout';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Paper } from '@mui/material';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { Actiontypes } from 'src/redux/constants/action.type'
import { getAttendanceCalculation, getLateInTimeIntervel, } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import {
    addDays, addHours, differenceInHours, format, isValid, max, min, subHours,
    formatDuration, intervalToDuration, subMonths, addMonths,
    startOfMonth,
    endOfMonth
} from "date-fns";
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action';
import { setDept } from 'src/redux/actions/Dept.Action';
import { getEmployeeDetlDutyPlanBased } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun';
import { employeePunch } from './Function';
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux';
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { exportToWOFFExcel } from '../DayWiseAttendence/ExportToExcel'

const OvertimeReport = () => {
    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [Empno, setEmpNo] = useState({})
    const dispatch = useDispatch();
    const [fromdate, Setfromdate] = useState(moment(new Date()));
    const [todate, Settodate] = useState(moment(new Date()));
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [all, setAll] = useState(false)
    const [value, setValue] = useState(moment(new Date()));
    const [click, setClick] = useState(0)


    const getAttendanceData = async () => {
        if (dept === 0 || deptSect === 0) {
            warningNofity('Check The Department || Department Section Feild');

        } else {
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSect,
            }
            getEmployeeDetlDutyPlanBased(getEmpData).then((emplyDataArray) => {
                const { status, data } = emplyDataArray;
                if (status === 1) {
                    const arr = data?.map((val) => {
                        return val.em_id
                    })
                    const postdata = {
                        emp_id: arr,
                        from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd')
                    }
                    employeePunch(postdata).then((dataObj) => {
                        const { status, punchdata } = dataObj
                        if (status === 1) {
                            console.log(punchdata)
                            const combinedArray = data.map((item1) => {
                                const puncharray = Array.isArray(punchdata)
                                    ? punchdata.filter(
                                        (item2) => item2.emp_id === item1.em_id
                                    )
                                    : [];

                                const totalHrsWorked = puncharray.reduce(
                                    (sum, item) => sum + (Number(item.hrs_worked) || 0),
                                    0
                                );
                                // const totalleavecount=punchdata.filter((item)=>item.duty_desc==='CL'||'EL'||'SL'||'COFF')?.length
                                // const totalOffcount=punchdata.filter((item)=>item.duty_desc==='NOFF'||'DOFF'||'WOFF')?.length

                                const totalleavecount = puncharray.filter((item) =>
                                    ['CL', 'EL', 'SL'].includes(item.duty_desc)
                                ).length;

                                const totalOffcount = puncharray.filter((item) =>
                                    ['NOFF', 'DOFF', 'WOFF',  'COFF'].includes(item.duty_desc)
                                ).length;
                                const totalHours = totalHrsWorked / 60;
                                const remhour = totalHours - 208
                                console.log(puncharray)

                                const shiftCountList = Object.values(
                                    puncharray.reduce((acc, item) => {
                                        const key = `${item.shift_id}_${item.shft_desc}`;

                                        acc[key] = acc[key] || {
                                            //shift_id: item.shift_id,
                                            shft_desc: item.shft_desc,
                                            count: 0,
                                        };

                                        acc[key].count++;

                                        return acc;
                                    }, {})
                                );

                                console.log(shiftCountList);

                                return {
                                    ...item1,
                                    puncharray,
                                    actualhour: 208,
                                    workedInMinutes: totalHrsWorked,
                                    totalHours: Number(totalHours.toFixed(2)),
                                    remHours: remhour <= 0 ? 0 : Number(remhour.toFixed(2)),
                                    totalleavecount: totalleavecount,
                                    totalOffcount: totalOffcount,
                                    shiftCountList: shiftCountList
                                };
                            });
                            console.log(combinedArray)
                            setTableData(combinedArray);
                        } else {
                            warningNofity("Duty Plan Not Done for this Department!!")
                        }
                    })
                } else {
                    warningNofity("No Employees Under This Department!!")
                }
            })
        }
    }

    const [columnDef] = useState([
        { headerName: 'Em Id', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Name', field: 'em_name', minWidth: 100, filter: true },
        { headerName: 'Dept Name', field: 'dept_name', minWidth: 100, filter: true },
        { headerName: 'Sect Name', field: 'sect_name', minWidth: 100, filter: true },
        { headerName: 'Designation', field: 'desg_name', minWidth: 100, filter: true },
        { headerName: 'Gross Salary', field: 'gross_salary', minWidth: 100, filter: true },
        { headerName: 'Total Leave', field: 'totalleavecount', minWidth: 100, filter: true },
        { headerName: 'Total OFF', field: 'totalOffcount', minWidth: 100, filter: true },
        { headerName: 'Actual Hours', field: 'actualhour', wrapText: true, minWidth: 200 },
        { headerName: 'TIme in Hours', field: 'totalHours', wrapText: true, minWidth: 200 },
        { headerName: 'Remaining Hours for OT', field: 'remHours', wrapText: true, minWidth: 200 },
        {
            headerName: 'Shift Count',
            field: 'shiftCountList',
            minWidth: 250,
            autoHeight: true,
            wrapText: true,
            cellRenderer: (params) => {
                return (
                    <div>
                        {params.value?.map((item, index) => (
                            <div key={index}>
                                {item.shft_desc}: {item.count}
                            </div>
                        ))}
                    </div>
                );
            },
            exportValueGetter: (params) => {
                return params.data?.shiftCountList
                    ?.map((item) => `${item.shft_desc}: ${item.count}`)
                    .join(', ') || '';
            },
        },


    ])

    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
            <ReportLayout title="OverTime Report" displayClose={true} data={tableData} >
                <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>Select Month</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    //minDate={subMonths(new Date(), 2)}
                                    //maxDate={addMonnew Date(), 1)}
                                    value={value}
                                    size="small"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>

                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ px: 0.5, mr: 1, mt: .5 }}>
                            <IconButton variant="outlined" size='sm' color="primary"
                                onClick={getAttendanceData}
                            >
                                <PublishedWithChangesIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={tableData}
                            columnDefMain={columnDef}
                        />
                    </Paper>
                </Paper>
            </ReportLayout>
        </Box >
    )
}

export default memo(OvertimeReport) 
