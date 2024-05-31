import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addMonths, endOfMonth, format, getDaysInMonth, isValid, startOfMonth, subDays } from 'date-fns'
import React, { memo, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import ReportLayout from 'src/views/HrReports/ReportComponent/ReportLayout'
import { Paper } from '@mui/material'
import SalaryReportAgGrid from 'src/views/Component/SalaryReportAgGrid'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action'
import { DeptWiseAttendanceViewFun } from '../AttendanceView/Functions'
import { ExporttoExcel } from 'src/views/HrReports/DayWiseAttendence/ExportToExcel'

const SalaryProcessed = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(new Date());
    const [dept, setDeptartment] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [all, setAll] = useState(false)
    const [mainArray, setArray] = useState([])
    const [processBtn, setProcessBtn] = useState(false)


    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setDeptWiseSection());
        dispatch(setCommonSetting());
        dispatch(setDept())
        dispatch(getHolidayList());
    }, [dispatch])

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings);
    const commonSettings = useMemo(() => commonState, [commonState]);
    const deptSect = useSelector((state) => state?.getDeptSectList?.deptSectionList)
    const departments = useSelector((state) => state?.getdept?.departmentlist)
    const allDept = useMemo(() => departments, [departments])
    const allSection = useMemo(() => deptSect, [deptSect])
    const holiday = useSelector((state) => state.getHolidayList);
    const holidayList = useMemo(() => holiday, [holiday]);


    const onClickProcess = useCallback(async () => {
        setProcessBtn(true)
        if (all === true) {
            const deptArray = allDept?.map(val => val.dept_id)
            const sectArray = allSection?.map(val => val.sect_id)
            const getEmpData = {
                em_department: deptArray,
                em_dept_section: sectArray,
            }
            const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1 && isValid(value) && value !== null) {

                const result1 = await axioslogin.post("/payrollprocess/empDeduction", getEmpData)
                const { data: deductData } = result1.data

                const arr = employeeData && employeeData.map((val) => val.em_id)
                const postdata = {
                    emp_id: arr,
                    from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = employeeData?.map((val) => {
                        const empwise = data.filter((value) => value.emp_id === val.em_id)

                        const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
                        const totalLOP = (empwise?.filter(val => val.lvereq_desc === 'A' || val.lvereq_desc === 'ESI' || val.lvereq_desc === 'LWP' || val.lvereq_desc === 'ML')).length
                        const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
                        const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD')).length
                        const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

                        const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0));

                        const npsamount = val.nps === 1 ? val.npsamount : 0
                        const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

                        const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

                        // const totallopCount = totalLC > commonSettings?.max_late_day_count ? totalLOP + (totalHD * 0.5) + ((totalLC - commonSettings?.max_late_day_count) / 2) : totalLOP + (totalHD * 0.5)
                        const totallopCount = totalLOP + (totalHD * 0.5)

                        const workday =
                            (empwise?.filter(val => val.lvereq_desc === 'P' ||
                                val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' ||
                                val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'WOFF' ||
                                val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' ||
                                val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
                                val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
                                val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
                                val.lvereq_desc === 'ODP')).length

                        const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

                        const totalDays = getDaysInMonth(new Date(value))
                        const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0
                        const totalPayday = workday === 0 ? 0 : (totalDays + totalHP) - totallopCount
                        const lopamount = totallopCount * (val.gross_salary / totalDays);
                        const paydaySalay = (val.gross_salary / totalDays) * totalPayday
                        const totalSalary = val.gross_salary - npsamount - lwfamount - deductValue - lopamount

                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            branch_name: val.branch_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            ecat_name: val.ecat_name,
                            inst_emp_type: val.inst_emp_type,
                            empSalary: val.gross_salary,
                            em_account_no: val.em_account_no,
                            totalDays: getDaysInMonth(new Date(value)),
                            totalLeaves: totalLV,
                            totalHoliday: totalH,
                            totallopCount: totallopCount,
                            holidayworked: totalHP,
                            totalHD: totalHD,
                            totalLC: totalLC,
                            paydays: totalPayday,
                            lopAmount: Math.round((onedaySalary * totallopCount) / 10) * 10,
                            npsamount: npsamount,
                            lwfamount: lwfamount,
                            holidaySalary: Math.round(holidaysalary / 10) * 10,
                            deductValue: deductValue,
                            totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary / 10) * 10,
                        }
                    })
                    setArray(finalDataArry)
                }
                else {
                    warningNofity("No Punch Details")
                }
            } else {
                warningNofity("Error While Fetching data!")
            }

        } else {
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSection,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1 && isValid(value) && value !== null) {
                const result1 = await axioslogin.post("/payrollprocess/empDeduction", getEmpData)
                const { data: deductData } = result1.data


                const arr = employeeData?.map((val) => val.em_id)
                const postdata = {
                    emp_id: arr,
                    from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = employeeData?.map((val) => {
                        const empwise = data.filter((value) => value.emp_id === val.em_id)

                        const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
                        const totalLOP = (empwise?.filter(val => val.lvereq_desc === 'A' || val.lvereq_desc === 'ESI' || val.lvereq_desc === 'LWP' || val.lvereq_desc === 'ML')).length
                        const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
                        const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD')).length
                        const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

                        const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0));

                        const npsamount = val.nps === 1 ? val.npsamount : 0
                        const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

                        const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

                        // const totallopCount = totalLC > commonSettings?.max_late_day_count ? totalLOP + (totalHD * 0.5) + ((totalLC - commonSettings?.max_late_day_count) / 2) : totalLOP + (totalHD * 0.5)
                        const totallopCount = totalLOP + (totalHD * 0.5)

                        const workday =
                            (empwise?.filter(val => val.lvereq_desc === 'P' ||
                                val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' ||
                                val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'WOFF' ||
                                val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' ||
                                val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
                                val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
                                val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
                                val.lvereq_desc === 'ODP')).length

                        const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

                        const totalDays = getDaysInMonth(new Date(value))
                        const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0
                        const totalPayday = workday === 0 ? 0 : (totalDays + totalHP) - totallopCount
                        const lopamount = totallopCount * (val.gross_salary / totalDays);
                        const paydaySalay = (val.gross_salary / totalDays) * totalPayday
                        const totalSalary = val.gross_salary - npsamount - lwfamount - deductValue - lopamount

                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            branch_name: val.branch_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            ecat_name: val.ecat_name,
                            inst_emp_type: val.inst_emp_type,
                            empSalary: val.gross_salary,
                            em_account_no: val.em_account_no,
                            totalDays: getDaysInMonth(new Date(value)),
                            totalLeaves: totalLV,
                            totalHoliday: totalH,
                            totallopCount: totallopCount,
                            holidayworked: totalHP,
                            totalHD: totalHD,
                            totalLC: totalLC,
                            paydays: totalPayday,
                            lopAmount: Math.round((onedaySalary * totallopCount) / 10) * 10,
                            npsamount: npsamount,
                            lwfamount: lwfamount,
                            holidaySalary: Math.round(holidaysalary / 10) * 10,
                            deductValue: deductValue,
                            totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary / 10) * 10,
                        }
                    })
                    setArray(finalDataArry)
                } else {
                    warningNofity("No Punch Details or Not a Valid date")
                }
            } else {
                warningNofity("No Employee Under this Department || Department Section")
            }
        }


        // // console.log(data, success)
        // const filterdPunchMaster = data;

        // const filterEmNoFromPunMast = [...new Set(filterdPunchMaster?.map((e) => e.em_no))];

        // console.log(filterEmNoFromPunMast);

        // const punchMasterFilterData = filterEmNoFromPunMast?.map((emno) => {
        //     return {
        //         em_no: emno,
        //         data: filterdPunchMaster?.filter((l) => l.em_no === emno)?.map((el) => {
        //             return {
        //                 duty_day: el.duty_day,
        //                 em_no: el.em_no,
        //                 duty_desc: el.duty_desc
        //             }
        //         })?.sort((a, b) => b.duty_day - a.duty_day)
        //     }
        // })?.filter((g) => g.em_no === 13802)

        // // CALCULATION BASED ON WEEEK OF AND HOLIDAY 
        // const funcForCalcForattendance = await Promise.allSettled(
        //     punchMasterFilterData?.map(calculateDutyDesc)
        // ).then((result) => {
        //     // console.log(result)
        // })



    }, [value, all, dept, deptSection, commonSettings, allDept, allSection])

    const [column] = useState([
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Branch', field: 'branch_name' },
        { headerName: 'Department', field: 'dept_name', minWidth: 250 },
        { headerName: 'Department Section ', field: 'sect_name', minWidth: 250 },
        { headerName: 'Category ', field: 'ecat_name', minWidth: 250 },
        { headerName: 'Institution ', field: 'inst_emp_type', minWidth: 250 },

        { headerName: 'Account Number', field: 'em_account_no' },
        { headerName: 'Total Days ', field: 'totalDays' },
        { headerName: 'Leave Count', field: 'totalLeaves' },
        { headerName: 'Holiday Count ', field: 'totalHoliday' },

        // { headerName: 'LOP Days ', field: 'lopDays' },
        { headerName: 'No Of Half Day LOP(HD)', field: 'totalHD', minWidth: 250 },
        { headerName: 'No Of LC Count', field: 'totalLC' },
        { headerName: 'Total LOP', field: 'totallopCount' },
        { headerName: 'Total Pay Day', field: 'paydays' },
        { headerName: 'LOP Amount ', field: 'lopAmount' },
        { headerName: 'NPS Amount', field: 'npsamount' },
        { headerName: 'LWF Amount', field: 'lwfamount' },
        { headerName: 'Deduction Amount', field: 'deductValue' },
        { headerName: 'Gross Salary ', field: 'empSalary' },
        { headerName: 'Total Salary', field: 'totalSalary' },
        { headerName: 'Holiday Worked ', field: 'holidayworked' },
        { headerName: 'Holiday Amount ', field: 'holidaySalary' },
    ])

    const downloadFormat = useCallback(async () => {
        if (processBtn === false) {
            warningNofity("Please Select Any Option!!")
        }
        else if (processBtn === true && all === true) {
            const deptArray = allDept?.map(val => val.dept_id)
            const sectArray = allSection?.map(val => val.sect_id)
            const getEmpData = {
                em_department: deptArray,
                em_dept_section: sectArray,
            }
            const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1 && isValid(value) && value !== null) {

                const result1 = await axioslogin.post("/payrollprocess/empDeduction", getEmpData)
                const { data: deductData } = result1.data

                const arr = employeeData && employeeData.map((val) => val.em_id)
                const postdata = {
                    emp_id: arr,
                    from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = employeeData?.map((val) => {
                        const empwise = data.filter((value) => value.emp_id === val.em_id)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: empwise
                        }
                    })
                    DeptWiseAttendanceViewFun(format(startOfMonth(new Date(value)), 'yyyy-MM-dd'), holidayList).then((values) => {
                        const fileName = "Attendance_Report";
                        const headers = ["Name", "Emp Id", "Department", "Department Section", ...values.map(val => val.date)];
                        const days = ["Days", "", "", "", ...values.map(val => val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days)];
                        // Rows for Excel file
                        const rows = finalDataArry.map(row => {
                            const rowData = [
                                row.em_name,
                                row.em_no,
                                row.dept_name,
                                row.sect_name,
                                ...row.arr.map(val => val.lvereq_desc)
                            ];
                            return rowData;
                        });

                        // Prepare data for Excel export
                        const excelData = [headers, days, ...rows];

                        // Call ExporttoExcel function
                        ExporttoExcel(excelData, fileName);

                    })

                }
                else {
                    warningNofity("No Punch Details")
                }
            } else {
                warningNofity("Error While Fetching data!")
            }

        } else {
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSection,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1 && isValid(value) && value !== null) {

                const arr = employeeData?.map((val) => val.em_id)
                const postdata = {
                    emp_id: arr,
                    from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = employeeData?.map((val) => {
                        const empwise = data.filter((value) => value.emp_id === val.em_id)
                        return {
                            em_no: val.em_no,
                            em_name: val.em_name,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            arr: empwise
                        }
                    })

                    DeptWiseAttendanceViewFun(format(startOfMonth(new Date(value)), 'yyyy-MM-dd'), holidayList).then((values) => {
                        const fileName = "Attendance_Report";
                        const headers = ["Name", "Emp Id", "Department", "Department Section", ...values.map(val => val.date)];
                        const days = ["Days", "", "", "", ...values.map(val => val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days)];
                        // Rows for Excel file
                        const rows = finalDataArry.map(row => {
                            const rowData = [
                                row.em_name,
                                row.em_no,
                                row.dept_name,
                                row.sect_name,
                                ...row.arr.map(val => val.lvereq_desc)
                            ];
                            return rowData;
                        });

                        // Prepare data for Excel export
                        const excelData = [headers, days, ...rows];

                        // Call ExporttoExcel function
                        ExporttoExcel(excelData, fileName);

                    })
                } else {
                    warningNofity("No Punch Details or Not a Valid date")
                }
            } else {
                warningNofity("No Employee Under this Department || Department Section")
            }
        }
    }, [value, all, dept, deptSection, commonSettings, allDept, allSection, processBtn])


    return (
        <ReportLayout title="Salary Reports" data={mainArray} displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                // minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.3, }} >
                        <DepartmentDropRedx getDept={setDeptartment} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.3, }} >
                        <DepartmentSectionRedx getSection={setDeptSection} />
                    </Box>
                    <Box sx={{ px: 0.3, mt: 1 }} >
                        <JoyCheckbox
                            label='All'
                            name="all"
                            checked={all}
                            onchange={(e) => setAll(e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ px: 1, display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color='success'
                                sx={{
                                    // color: '#90caf9'
                                }}
                                startDecorator={<RotateRightIcon />}
                                endDecorator={'Process'}
                                onClick={onClickProcess}
                            >

                            </Button>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ px: 1, display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color='primary'
                                sx={{
                                    // color: '#90caf9'
                                }}
                                startDecorator={<ArrowDownwardIcon />}
                                endDecorator={'Download Attendance Format'}
                                onClick={downloadFormat}
                            >

                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        p: 1, mt: 0.5,
                        display: 'flex',
                        backgroundColor: '#f0f3f5',
                        flexDirection: "column",
                    }}  >
                    <SalaryReportAgGrid
                        tableDataMain={mainArray}
                        columnDefMain={column}
                        sx={{
                            height: 470,
                            width: "100%"
                        }}
                    />
                </Paper>
            </Box>
        </ReportLayout>
    )
}

export default memo(SalaryProcessed) 