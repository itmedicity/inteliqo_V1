import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addMonths, endOfMonth, format, getDaysInMonth, startOfMonth, subDays } from 'date-fns'
import React, { memo, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Table from '@mui/joy/Table';
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { calculateDutyDesc } from './SalaryProcessFun'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import ReportLayout from 'src/views/HrReports/ReportComponent/ReportLayout'
import { Paper } from '@mui/material'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import SalaryReportAgGrid from 'src/views/Component/SalaryReportAgGrid'

const SalaryProcessed = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(new Date());
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [all, setAll] = useState(false)
    const [mainArray, setArray] = useState([])

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting());
    }, [dispatch])


    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings);
    const commonSettings = useMemo(() => commonState, [commonState]);


    const onClickProcess = useCallback(async () => {
        const monthStartDate = format(subDays(startOfMonth(new Date(value)), 6), 'yyyy-MM-dd');
        const endOfMonthDate = format(endOfMonth(new Date(value)), 'yyyy-MM-dd');
        const postDate = {
            fromDate: monthStartDate,
            toDate: endOfMonthDate
        }

        console.log(all)
        if (all === true) {
            console.log("dgf");
            const getPunchMasterDta = await axioslogin.post("/payrollprocess/getPunchMasterSalaryAllEmployee", postDate);
            const { success, data: punchMasteData } = getPunchMasterDta.data

            console.log(punchMasteData);

            const resultss = [...new Set(punchMasteData?.map(e => e.em_no))]?.map((el) => {
                const empArray = punchMasteData?.filter(e => e.em_no === el)
                let emName = empArray?.find(e => e.em_no === el).em_name;
                let emNo = empArray?.find(e => e.em_no === el).em_no;
                let emId = empArray?.find(e => e.em_no === el).emp_id;
                let grossSalary = empArray?.find(e => e.em_no === el).gross_salary;

                // console.log(dateRange)
                // console.log(empArray)
                return {
                    em_no: el,
                    emName: emName,
                    totalDays: getDaysInMonth(new Date(value)),
                    totalP: empArray?.filter(el => el.duty_desc === "P").length ?? 0,
                    totalWOFF: empArray?.filter(el => el.duty_desc === "WOFF").length ?? 0,
                    totalNOFF: empArray?.filter(el => el.duty_desc === "NOFF").length ?? 0,
                    totalLC: empArray?.filter(el => el.duty_desc === "LC").length ?? 0,
                    totalHD: empArray?.filter(el => el.duty_desc === "HD").length ?? 0,
                    totalA: empArray?.filter(el => el.duty_desc === "A").length ?? 0,
                    totalLV: empArray?.filter(el => el.duty_desc === "LV").length ?? 0,
                    totalHDL: (empArray?.filter(el => el.duty_desc === "HDL").length ?? 0) * 1,
                    totaESI: empArray?.filter(el => el.duty_desc === "ESI").length ?? 0,
                    totaLWP: empArray?.filter(el => el.duty_desc === "LWP").length ?? 0,
                    totaH: empArray?.filter(el => el.duty_desc === "H").length ?? 0,
                    // totaHP: grossSalary <= salary_above ? (empArray?.filter(el => el.lvereq_desc === "HP").length ?? 0) * 2 : (empArray?.filter(el => el.lvereq_desc === "H").length ?? 0),
                }
            })

            console.log(resultss);

        } else {
            console.log("xc");
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSection,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            console.log(employeeData);
            if (succes === 1) {
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

                        //No. of days in a month
                        const totalDays = getDaysInMonth(new Date(value))
                        //No of holidays in a month
                        const totalHoliday = (empwise?.filter(val => val.holiday_status === 1)).length
                        //No of LOP days
                        const totalLop = (empwise?.filter(val => val.duty_desc === 'A' || val.duty_desc === 'ESI' || val.duty_desc === 'LWP')).length
                        //No of leave count
                        const totalLeaves = (empwise?.filter(val => val.duty_desc === 'SL' || val.duty_desc === 'CL' || val.duty_desc === 'COFF' || val.duty_desc === 'EL')).length
                        //no of halfday leave count
                        const totalHalfdayLeaves = (empwise?.filter(val => val.duty_desc === 'HCL')).length
                        //no of halfdays
                        const totalHD = (empwise?.filter(val => val.duty_desc === 'HD')).length
                        //no of late coming
                        const totalLC = (empwise?.filter(val => val.duty_desc === 'LC')).length

                        const npsamount = val.nps === 1 ? val.npsamount : 0
                        const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

                        //one day salary
                        const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

                        const totallopCount = totalLC > commonSettings?.max_late_day_count ? totalLop + (totalHD * 0.5) + ((totalLC - commonSettings?.max_late_day_count) / 2) : totalLop + (totalHD * 0.5)

                        const workday = (empwise?.filter(val => val.duty_desc === 'HD' || val.duty_desc === 'P' || val.duty_desc === 'NOFF' || val.duty_desc === 'LV' || val.duty_desc === 'HDL')).length

                        const holidayworked = (empwise?.filter(val => val.duty_desc === 'HP')).length

                        //holiday salary
                        const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * holidayworked : 0


                        const totalPayday = workday === 0 ? 0 : totalDays - totallopCount

                        const paydaySalay = (val.gross_salary / totalDays) * totalPayday

                        const totalSalary = paydaySalay + holidaysalary - npsamount - lwfamount



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
                            totalLeaves: totalLeaves,
                            totalHoliday: totalHoliday,
                            totallopCount: totallopCount
                        }
                    })
                    console.log(finalDataArry);
                    setArray(finalDataArry)
                } else {
                    warningNofity("No Punch Details")
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



    }, [value, all, dept, deptSection, commonSettings])

    const [column] = useState([
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Branch', field: 'branch_name' },
        { headerName: 'Department', field: 'dept_name', minWidth: 250 },
        { headerName: 'Department Section ', field: 'sect_name', minWidth: 250 },
        { headerName: 'Category ', field: 'ecat_name', minWidth: 250 },
        { headerName: 'Institution ', field: 'inst_emp_type', minWidth: 250 },
        { headerName: 'Gross Salary ', field: 'empSalary' },
        { headerName: 'Account Number', field: 'em_account_no' },
        { headerName: 'Total Days ', field: 'totalDays' },
        { headerName: 'Leave Count', field: 'totalLeaves' },
        { headerName: 'Holiday Count ', field: 'totalHoliday' },
        { headerName: 'LOP Days ', field: 'lopDays' },
        { headerName: 'No Of Half Day LOP(HD)', field: 'nofhfd', minWidth: 250 },
        { headerName: 'No Of LC Count', field: 'LCcount' },
        { headerName: 'Total LOP', field: 'totallopCount' },
        { headerName: 'Total Pay Day', field: 'paydays' },
        { headerName: 'LOP Amount ', field: 'lopAmount' },
        { headerName: 'Holiday Worked ', field: 'holidayworked' },
        { headerName: 'Holiday Amount ', field: 'holidaySalary' },
        { headerName: 'NPS Amount', field: 'npsamount' },
        { headerName: 'LWF Amount', field: 'lwfamount' },
        { headerName: 'Total Salary', field: 'totalSalary' },
    ])




    return (
        <ReportLayout title="Salary Reports" data={[]} displayClose={true} >
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
                        <DepartmentDropRedx getDept={setDept} />
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