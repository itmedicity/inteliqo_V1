import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import moment from 'moment';
import { Button, Chip, Input, Sheet, Table, Typography } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';
import { getAllDeptList } from 'src/redux/actions/Department.action';
import { useQuery, } from 'react-query';
import { getAllDeptSectList } from 'src/redux/actions/DepartmentSection.Action';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { ToastContainer } from 'react-toastify';
import { attendnaceCountCalculationFunc, employeeEarnDeduction, getAllPunchmastData } from './SalaryProcessFunctions';
import { getCommonsettingData } from 'src/views/CommonCode/CommonReactQueries';

const MonthlySalaryProcess = () => {
    const [value, setValue] = useState(moment(new Date()));
    const [openBkDrop, setOpenBkDrop] = useState(false);
    const [deptList, setDeptList] = useState([]);

    // get login empid 
    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0])
    const { em_no } = empData

    const monthStart = format(startOfMonth(new Date(value)), 'yyyy-MM-dd');
    const actSelectDate = format(new Date(value), 'yyyy-MM-dd');

    const { data: deptartments } = useQuery({
        queryKey: ['departmentList'],
        queryFn: getAllDeptList,
        staleTime: Infinity
    })

    const { data: deptartmentSection } = useQuery({
        queryKey: ['departmentSectionList'],
        queryFn: getAllDeptSectList,
        staleTime: Infinity
    })


    const { data: commonSettings } = useQuery({
        queryKey: ['commonSettingdata'],
        queryFn: getCommonsettingData,
        staleTime: Infinity
    })

    const onProcessClick = useCallback(async () => {
        setOpenBkDrop(true)
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
                setDeptList(findDept)
                setOpenBkDrop(false)
            } else if (succ === 2) {
                const deptArray = deptartments?.map(val => val.dept_id)
                const sectArray = deptartmentSection?.map(val => val.sect_id)
                const getEmpData = {
                    em_department: deptArray,
                    em_dept_section: sectArray,
                }

                const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
                const { succes, dataa: employeeData } = result1.data
                if (succes === 1 && value !== null) {

                    employeeEarnDeduction(getEmpData).then((values) => {
                        const { status, data: deductData } = values;
                        if (status === 1) {
                            const arr = employeeData && employeeData.map((val) => val.em_id)
                            const postdata = {
                                emp_id: arr,
                                from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            }
                            getAllPunchmastData(postdata).then((punchmastdata) => {
                                const { status, data } = punchmastdata;
                                if (status === 1) {

                                    attendnaceCountCalculationFunc(employeeData, deductData, data, value, commonSettings).then(async (allData) => {
                                        const { status, data } = allData
                                        if (status === 1 && data?.length !== 0) {
                                            //setArray(data)
                                            setOpenBkDrop(false)

                                            const result1 = await axioslogin.post("/payrollprocess/create/processedSalary", data);
                                            const { success, message } = result1.data
                                            if (success === 1) {
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
                                                // if condition for check null and undefined 
                                                const insertPunchMarkTable = await axioslogin.post('/payrollprocess/insert/monthlyprocess', postData_PunchMarkHR)
                                                const { success } = insertPunchMarkTable.data
                                                if (success === 1) {
                                                    const findDept = [...new Set(deptSectionData?.map(e => e.dept_id))]?.map((dept) => {
                                                        return {
                                                            "dept_id": dept,
                                                            "dept_name": deptSectionData?.find(e => e.dept_id === dept)?.dept_name,
                                                            "section": deptSectionData?.filter((val) => val.dept_id === dept).map((v) => {
                                                                return {
                                                                    ...v, "updated": format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                                                    "status": 1
                                                                }
                                                            }),
                                                        }
                                                    })
                                                    // setArray(data)
                                                    setDeptList(findDept)
                                                    setOpenBkDrop(false)

                                                } else {
                                                    warningNofity("Error Updating the Punchmarking HR Data ! contact IT")
                                                    setOpenBkDrop(false)
                                                }

                                            } else {
                                                errorNofity(message)
                                                setOpenBkDrop(false)
                                            }
                                        } else {
                                            errorNofity("Error While Attendance Calculation")
                                            setOpenBkDrop(false)
                                        }
                                    })
                                } else {
                                    errorNofity("Error While Geting All Employee PunchMast Data")
                                    setOpenBkDrop(false)
                                }
                            })
                        } else {
                            errorNofity("Error While Getting Deduction Details!")
                            setOpenBkDrop(false)
                        }
                    })
                } else {
                    warningNofity("Error While Fetching Employee data!")
                    setOpenBkDrop(false)
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

    //  const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    const deleteAttendanceMarkingProcess = useCallback(async (dept, section, date) => {

        const getPunchMarkTablePostData = {
            month: format(startOfMonth(new Date(date)), 'yyyy-MM-dd')
        }

        const postDta = {
            update_user: em_no,
            dept_id: dept,
            sect_id: section,
            processed_month: format(startOfMonth(new Date(date)), 'yyyy-MM-dd')
        }

        const result1 = await axioslogin.post("/payrollprocess/delete/processedSalary", postDta);
        const { success, message } = result1.data
        if (success === 1) {
            const result1 = await axioslogin.post("/payrollprocess/cancel/process", postDta);
            const { success, message } = result1.data
            if (success === 1) {
                const result = await axioslogin.get('/payrollprocess/getAcriveDepartmentSection/');
                const { success, data } = result.data;
                const deptSectionData = data;
                if (success === 1) {
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
                        setDeptList(findDept)
                        setOpenBkDrop(false)
                        succesNofity(message)
                    }
                }
            } else {
                errorNofity(message)
                setOpenBkDrop(false)
            }
        } else {
            errorNofity(message)
        }
    }, [em_no, value])

    const insertSectionAttendance = useCallback(async (dept, section, date) => {
        setOpenBkDrop(true)

        const getEmpData = {
            em_department: [dept],
            em_dept_section: [section],
        }

        const postDta = {
            update_user: em_no,
            dept_id: dept,
            sect_id: section,
            processed_month: format(startOfMonth(new Date(date)), 'yyyy-MM-dd')
        }


        const getPunchMarkTablePostData = {
            month: format(startOfMonth(new Date(date)), 'yyyy-MM-dd')
        }

        const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
        const { succes, dataa: employeeData } = result1.data
        if (succes === 1 && value !== null) {
            employeeEarnDeduction(getEmpData).then((values) => {
                const { status, data: deductData } = values;
                if (status === 1) {
                    const arr = employeeData && employeeData.map((val) => val.em_id)
                    const postdata = {
                        emp_id: arr,
                        from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        to: format(endOfMonth(new Date(value)), 'yyyy-MM-dd'),
                    }
                    getAllPunchmastData(postdata).then((punchmastdata) => {
                        const { status, data } = punchmastdata;
                        if (status === 1 && data.length !== 0) {

                            attendnaceCountCalculationFunc(employeeData, deductData, data, value, commonSettings).then(async (allData) => {
                                const { status, data } = allData
                                if (status === 1 && data?.length !== 0) {
                                    setOpenBkDrop(false)
                                    const result1 = await axioslogin.post("/payrollprocess/create/processedSalary", data);
                                    const { success, message } = result1.data
                                    if (success === 1) {
                                        const result1 = await axioslogin.post("/payrollprocess/activate/processedSalary", postDta);
                                        const { success, message } = result1.data
                                        if (success === 1) {
                                            const result = await axioslogin.get('/payrollprocess/getAcriveDepartmentSection/');
                                            const { success, data } = result.data;
                                            const deptSectionData = data;
                                            if (success === 1) {
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
                                                    setDeptList(findDept)
                                                    setOpenBkDrop(false)
                                                    succesNofity(message)
                                                }
                                            }
                                        } else {
                                            errorNofity(message)
                                            setOpenBkDrop(false)
                                        }
                                    } else {
                                        errorNofity(message)
                                        setOpenBkDrop(false)
                                    }
                                } else {
                                    errorNofity("Error While Attendance Calculation")
                                    setOpenBkDrop(false)
                                }
                            })
                        } else {
                            errorNofity("Error While Geting All Employee PunchMast Data")
                            setOpenBkDrop(false)
                        }
                    })
                } else {
                    errorNofity("Error While Getting Deduction Details!")
                    setOpenBkDrop(false)
                }
            })
        } else {
            warningNofity("Error While Fetching Employee data!")
            setOpenBkDrop(false)
        }
    }, [value, em_no, commonSettings])

    return (
        <CustomLayout title="Monthly Salary Process" displayClose={true} >
            <ToastContainer />
            <CustomBackDrop open={openBkDrop} text="!!! Please wait...Monthly Payroll Processing.... Do not Refesh or Reload the Browser !!!" />
            <Box sx={{ width: '100%', }}>
                <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Select Month</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                // minDate={subMonths(new Date(), 2)}
                                // maxDate={addMonths(new Date(), 1)}
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
                                                            (monthStart === e.updated) ?
                                                                <Chip color='neutral' size="sm" variant="solid" startDecorator={<CalendarMonthIcon fontSize='inherit' />}>
                                                                    {e.updated}
                                                                </Chip> :
                                                                (actSelectDate <= e.updated) && e.status === 1 ?
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
                                                            {
                                                                e.status === 1 ? <Chip
                                                                    color="neutral"
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Insert Process</Chip> :
                                                                    <Chip
                                                                        color="success"
                                                                        onClick={(c) => insertSectionAttendance(row.dept_id, e.sect_id, e.updated)}
                                                                        size="sm"
                                                                        variant="outlined"
                                                                    >Insert Process</Chip>
                                                            }
                                                            {
                                                                e.status === 1 ? <Chip
                                                                    color="danger"
                                                                    onClick={() => deleteAttendanceMarkingProcess(row.dept_id, e.sect_id, e.updated)}
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Delete Process</Chip> : <Chip
                                                                    color="neutral"
                                                                    size="sm"
                                                                    variant="outlined"
                                                                >Delete Process</Chip>
                                                            }
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