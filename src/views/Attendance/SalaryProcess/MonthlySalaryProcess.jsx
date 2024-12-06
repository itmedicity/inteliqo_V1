import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import moment from 'moment';
import { Button, Chip, Input, Sheet, Table, Typography } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, format, getDaysInMonth, isValid, startOfMonth, subMonths } from 'date-fns';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';
import UploadIcon from '@mui/icons-material/Upload';
import { getAllDeptList } from 'src/redux/actions/Department.action';
import { useQuery } from 'react-query';
import { getAllDeptSectList } from 'src/redux/actions/DepartmentSection.Action';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { ExportAttendance } from 'src/views/Payroll/AttendanceUpdation/ExportToExcel';
import { getCommonsettingData } from 'src/views/CommonCode/CommonReactQueries';

const MonthlySalaryProcess = () => {
    const [value, setValue] = useState(moment(new Date()));
    const [openBkDrop, setOpenBkDrop] = useState(false);
    const [deptList, setDeptList] = useState([]);
    const [process, setProcess] = useState(0)
    const [mainArray, setArray] = useState([])

    // get login empid 
    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0])
    const { em_no } = empData

    const monthStart = format(startOfMonth(new Date(value)), 'yyyy-MM-dd');
    const actSelectDate = format(new Date(value), 'yyyy-MM-dd');

    const { data: deptartments } = useQuery({
        queryKey: ['departmentList'],
        queryFn: getAllDeptList
    })

    const { data: deptartmentSection } = useQuery({
        queryKey: ['departmentSectionList'],
        queryFn: getAllDeptSectList
    })


    const { data: commonSettings } = useQuery({
        queryKey: ['commonSettingdata'],
        queryFn: getCommonsettingData
    })

    const onProcessClick = useCallback(async () => {
        setOpenBkDrop(true)
        setProcess(1)
        const getPunchMarkTablePostData = {
            month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
        }
        //GET ALL DEPARTMENT SECTION LIST AND SHOW
        const result = await axioslogin.get('/payrollprocess/getAcriveDepartmentSection/');
        const { success, data } = result.data;
        const deptSectionData = data;
        if (success === 1) {
            //GET PUNCHMARKING DATA FROM table 
            const getPunchMarkingHr_table = await axioslogin.post('/payrollprocess/getmonthdeptlist/', getPunchMarkTablePostData);
            const { succ, data } = getPunchMarkingHr_table.data;
            if (succ === 1) {
                const punchMarkingTableData = data;
                const findDept = [...new Set(deptSectionData?.map(e => e.dept_id))]?.map((dept) => {
                    return {
                        "dept_id": dept,
                        "dept_name": deptSectionData?.find(e => e.dept_id === dept)?.dept_name,
                        "section": deptSectionData?.filter((val) => val.dept_id === dept).map((v) => {
                            return {
                                ...v, "updated": punchMarkingTableData?.find((e) => v.sect_id === e.sect_id)?.last_update_date ?? format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                "status": punchMarkingTableData?.find((e) => v.sect_id === e.sect_id)?.salary_status ?? 0
                            }

                        }),
                    }
                })

                const getData = {
                    month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
                }
                const result = await axioslogin.post('/payrollprocess/processed/empdata', getData);
                const { success, data: allList } = result.data;
                if (success === 1) {
                    const array = allList?.map((val) => {
                        return {
                            ...val,
                            em_account_no: val.account_number,
                            em_ifsc: val.ifsc_number,
                            totalDays: val.total_days,
                            totalLeaves: val.leave_count,
                            totalHoliday: val.holiday_count,
                            totalHD: val.halfday_lop_count,
                            totalLC: val.lc_count,
                            totallopCount: val.total_lop_count,
                            paydays: val.total_pay_days,
                            lopAmount: val.lop_amount,
                            npsamount: val.nps_amount,
                            lwfamount: val.lwf_amount,
                            deductValue: val.deduction_amount,
                            empSalary: val.gross_salary,
                            totalSalary: val.total_salary,
                            holidayworked: val.holidayworked,
                            holidaySalary: val.holiday_amount
                        }
                    })
                    setArray(array)
                    setDeptList(findDept)

                    setOpenBkDrop(false)
                } else {
                    warningNofity("No Such data Exist")
                    setOpenBkDrop(false)
                }
                setDeptList(findDept)
                setOpenBkDrop(false)
            } else if (succ === 2) {

                // IF NO DATA -> INSERT IN TO payroll_processed_salary table
                const postData_PunchMarkHR = deptSectionData?.map((e) => {
                    return [
                        format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        e.dept_id,
                        e.sect_id,
                        1,
                        em_no,
                        em_no,
                        format(endOfMonth(new Date(value)), 'yyyy-MM-dd')
                    ]
                })
                const insertPunchMarkTable = await axioslogin.post('/payrollprocess/insert/monthlyprocess', postData_PunchMarkHR)
                const { success } = insertPunchMarkTable.data
                if (success === 1) {
                    const findDept = [...new Set(deptSectionData?.map(e => e.dept_id))]?.map((dept) => {
                        return {
                            "dept_id": dept,
                            "dept_name": deptSectionData?.find(e => e.dept_id === dept)?.dept_name,
                            "section": deptSectionData?.filter((val) => val.dept_id === dept).map((v) => {
                                return { ...v, "updated": format(startOfMonth(new Date(value)), 'yyyy-MM-dd') }
                            }),
                        }
                    })
                    const deptArray = deptartments?.map(val => val.dept_id)
                    const sectArray = deptartmentSection?.map(val => val.sect_id)
                    const getEmpData = {
                        em_department: deptArray,
                        em_dept_section: sectArray,
                    }
                    const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
                    const { succes, dataa: employeeData } = result1.data
                    if (succes === 1 || isValid(value) || value !== null) {

                        const result1 = await axioslogin.post("/payrollprocess/empDeduction", getEmpData)
                        const { data: deductData } = result1.data

                        const arr = employeeData && employeeData.map((val) => val.em_id)
                        const postdata = {
                            emp_id: arr,
                            // emp_id: [168],
                            from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        }
                        const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                        const { success, data } = result.data
                        if (success === 1) {
                            const finalDataArry = employeeData?.map((val) => {
                                const empwise = data.filter((value) => value.emp_id === val.em_id)

                                const totalH = (empwise?.filter(val => val.holiday_status === 1)).length
                                //  const totalLOP = (empwise?.filter(val => val.lvereq_desc === 'A' || val.lvereq_desc === 'ESI' || val.lvereq_desc === 'LWP' || val.lvereq_desc === 'ML')).length
                                const totalLV = (empwise?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length
                                const totalHD = (empwise?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length
                                const totalLC = (empwise?.filter(val => val.lvereq_desc === 'LC')).length

                                const deductValue = (deductData?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.em_amount), 0)) ?? 0;

                                const npsamount = val.nps === 1 ? val.npsamount : 0
                                const lwfamount = val.lwf_status === 1 ? val.lwfamount : 0

                                const onedaySalary = val.gross_salary / getDaysInMonth(new Date(value))

                                // const totallopCount = totalLC > commonSettings?.max_late_day_count ? totalLOP + (totalHD * 0.5) + ((totalLC - commonSettings?.max_late_day_count) / 2) : totalLOP + (totalHD * 0.5)
                                // const totallopCount = totalLOP + (totalHD * 0.5)

                                const workday =
                                    (empwise?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
                                        val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
                                        val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
                                        val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
                                        val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
                                        val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length

                                const totalHP = (empwise?.filter(val => val.lvereq_desc === 'HP')).length

                                const totalDays = getDaysInMonth(new Date(value))
                                const holidaysalary = val.gross_salary <= commonSettings.salary_above ? onedaySalary * totalHP : 0;
                                const totalPayday = workday + (totalHD * 0.5)
                                const totallopCount = totalDays - totalPayday;
                                // const totalPayday = workday === 0 ? 0 : totalDays - totallopCount
                                const lopamount = totallopCount * (val.gross_salary / totalDays);
                                //const paydaySalay = (val.gross_salary / totalDays) * totalPayday
                                const totalSalary = Number(val.gross_salary).toFixed(2) - Number(npsamount).toFixed(2) - Number(lwfamount).toFixed(2) - Number(deductValue).toFixed(2) - Number(lopamount).toFixed(2)

                                return {
                                    em_no: val.em_no,
                                    em_name: val.em_name,
                                    branch_name: val.branch_name,
                                    dept_name: val.dept_name,
                                    sect_name: val.sect_name,
                                    ecat_name: val.ecat_name,
                                    desg_name: val.desg_name,
                                    inst_emp_type: val.inst_emp_type,
                                    empSalary: val.gross_salary,
                                    em_account_no: val.em_account_no,
                                    em_ifsc: val.em_ifsc,
                                    totalDays: getDaysInMonth(new Date(value)),
                                    totalLeaves: totalLV,
                                    totalHoliday: totalH,
                                    totallopCount: totalPayday === 0 ? getDaysInMonth(new Date(value)) : totallopCount,
                                    holidayworked: totalHP,
                                    totalHD: totalHD,
                                    totalLC: totalLC,
                                    paydays: totalPayday,
                                    lopAmount: Math.round(onedaySalary * totallopCount),
                                    npsamount: npsamount,
                                    lwfamount: lwfamount,
                                    holidaySalary: Math.round(holidaysalary),
                                    deductValue: deductValue,
                                    totalSalary: totalSalary < 0 ? 0 : Math.round(totalSalary),
                                    branch_slno: val.branch_slno,
                                    category_slno: val.category_slno,
                                    dept_id: val.dept_id,
                                    desg_slno: val.desg_slno,
                                    em_id: val.em_id,
                                    inst_slno: val.inst_slno,
                                    sect_id: val.sect_id,
                                    processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                }
                            })
                            const result1 = await axioslogin.post("/payrollprocess/create/processedSalary", finalDataArry);
                            const { success, message } = result1.data
                            if (success === 1) {
                                setArray(finalDataArry)
                                setDeptList(findDept)

                                setOpenBkDrop(false)
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                            }
                        }
                        else {
                            warningNofity("No Punch Details")
                            setOpenBkDrop(false)
                        }
                    } else {
                        warningNofity("Error While Fetching data!")
                        setOpenBkDrop(false)
                    }
                    // setOpenBkDrop(false)
                } else {
                    warningNofity("Error Updating the Punchmarking HR Data ! contact IT")
                    //setOpenBkDrop(false)
                }
            } else {
                // IF ERROR
                warningNofity('----error getting punchmarking table data ! contact IT Department')
                setOpenBkDrop(false)
            }
        } else {
            warningNofity("Error Getting the Department Details")
            setOpenBkDrop(false)
        }
    }, [value, em_no, deptartments, deptartmentSection, commonSettings])

    const deleteAttendanceMarkingProcess = useCallback(async (dept, section, date) => {
        const postDta = {
            update_user: 4516,
            dept_id: dept,
            sect_id: section,
            processed_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
        }

        const result1 = await axioslogin.post("/payrollprocess/delete/processedSalary", postDta);
        const { success, message } = result1.data
        if (success === 1) {
            const result1 = await axioslogin.post("/payrollprocess/cancel/process", postDta);
            const { success, message } = result1.data
            if (success === 1) {
                //setDeptList(findDept)
                setOpenBkDrop(false)
            } else {
                errorNofity(message)
                setOpenBkDrop(false)
            }
        } else {
            errorNofity(message)
        }
    }, [value])


    const exportDataClick = useCallback(() => {
        if (process === 0) {
            warningNofity("Click The Process Button First!")
        } else {
            const fileName = format(new Date(value), 'MMMM');
            const array = mainArray?.map((val) => {
                return {
                    'ID': val.em_no,
                    'Name ': val.em_name,
                    'Branch': val.branch_name,
                    'Department': val.dept_name,
                    'Department Section ': val.sect_name,
                    'Category ': val.ecat_name,
                    'Designation ': val.desg_name,
                    'Institution ': val.inst_emp_type,
                    'Account Number': val.em_account_no,
                    'IFSC Number': val.em_ifsc,
                    'Total Days ': val.totalDays,
                    "Leave Count": val.totalLeaves,
                    "Holiday Count": val.totalHoliday,
                    'No Of Half Day LOP(HD)': val.totalHD,
                    'No Of LC Count': val.totalLC,
                    'Total LOP': val.totallopCount,
                    'Total Pay Day': val.paydays,
                    'LOP Amount ': val.lopAmount,
                    'NPS Amount': val.npsamount,
                    'LWF Amount': val.lwfamount,
                    'Deduction Amount': val.deductValue,
                    'Gross Salary ': val.empSalary,
                    'Total Salary': val.totalSalary,
                    'Holiday Worked ': val.holidayworked,
                    'Holiday Amount': val.holidaySalary,
                }

            })
            ExportAttendance(array, fileName)
            setProcess(0)
        }
    }, [process, value, mainArray])

    return (
        <CustomLayout title="Monthly Salary Process" displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="!!! Please wait...Monthly Payroll Processing.... Do not Refesh or Reload the Browser !!!" />
            <Box sx={{ width: '100%', }}>
                <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Select Month</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 2)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
                                size="small"
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    // setDeptList([])
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} color='primary' />
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
                            color="success"
                            onClick={onProcessClick}
                            fullWidth
                            startDecorator={<HourglassEmptyOutlinedIcon />}
                            sx={{ mx: 0.5 }}
                        >
                            Process
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', px: 0.5, width: '15%' }}>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={exportDataClick}
                            fullWidth
                            startDecorator={<UploadIcon />}
                            sx={{ mx: 0.5 }}
                        >
                            Export Data
                        </Button>
                    </Box>
                </Box>
                <Box padding={1} >
                    <Sheet sx={{ height: window.innerHeight - 180, overflow: 'auto' }} >
                        <Table
                            variant='soft'
                            size='sm'
                            hoverRow
                            stickyHeader
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Department Names</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'center' }} >Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deptList.map((row, index) => (
                                    <Fragment key={index} >
                                        <tr key={index} style={{ backgroundColor: '#A2D2DF' }} >
                                            <td colSpan={3} >{row.dept_name}</td>
                                            <td></td>
                                        </tr>
                                        {
                                            row?.section?.map((e, idx) => (
                                                <tr key={idx} >
                                                    <td></td>
                                                    <td>{e.sect_name}</td>
                                                    {/* <td>{e.updated}</td> */}
                                                    <td>
                                                        {
                                                            monthStart === e.updated ?
                                                                <Chip color='neutral' size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                    {e.updated}
                                                                </Chip> :
                                                                actSelectDate <= e.updated ?
                                                                    <Chip color='success' size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                        {e.updated}
                                                                    </Chip>
                                                                    :
                                                                    <Chip color="danger" size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                        {e.updated}
                                                                    </Chip>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
                                                            {/* <Chip
                                                                    color="success"
                                                                    onClick={(c) => updateAttendanceProcesss(row.dept_id, e.sect_id, e.updated)}
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Update Attendance</Chip> */}
                                                            <Chip
                                                                color="danger"
                                                                onClick={() => deleteAttendanceMarkingProcess(row.dept_id, e.sect_id, e.updated)}
                                                                size="sm"
                                                                variant="outlined"
                                                            >Delete Process</Chip>
                                                        </Box>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </Fragment>
                                ))}

                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default memo(MonthlySalaryProcess) 