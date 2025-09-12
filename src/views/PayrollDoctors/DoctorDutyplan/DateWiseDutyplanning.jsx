import { Box, Button, Input, Sheet, Table, Typography } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import { errorNofity, infoNofity, } from 'src/views/CommonCode/Commonfunc';
import { eachDayOfInterval, endOfMonth, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { employeeIdNumber, screenInnerHeight } from 'src/views/Constant/Constant';
import { Paper } from '@mui/material';
import ShiftPlanningModal from './ShiftPlanningModal';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { getCommonSettingData, getHolidayListAll } from 'src/redux/reduxFun/useQueryFunctions';
import { useQuery } from 'react-query';
import DoctorDepartment from './Components/DoctorDepartment';
import DoctorDepartmentSection from './Components/DoctorDepartmentSection';

const DateWiseDutyplanning = () => {
    const dispatch = useDispatch();
    const [fromDate, setFromdate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [tableArray, settableArray] = useState([])
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])
    const [selectedDateKey, setSelectedDateKey] = useState(null);
    const [selecteedEmployee, setSelectedEmployee] = useState({})
    const [currentEmpdata, setCurrentEmpdata] = useState({})
    const [sectionEmployee, setSectionEmployee] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(setDepartment());

    }, [dispatch])

    const departmentSectionShift = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: section
        }
    }, [dept, section])


    const { data: holidayList, isLoading: isholidayLoading,
        error: holidayError } = useQuery({
            queryKey: ['allHolidayList'],
            queryFn: getHolidayListAll
        })

    const { data: commonSettingData, isLoading: iscommonSettingLoading,
        error: commonSettingError } = useQuery({
            queryKey: ['commongSettingData'],
            queryFn: getCommonSettingData
        })

    const onClickDutyPlanButton = useCallback(async () => {

        const { notapplicable_shift, default_shift } = commonSettingData;

        const dateArray = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) })
            ?.map(e => format(new Date(e), 'yyyy-MM-dd'));

        const monthStart = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd');
        const monthEnd = format(endOfMonth(new Date(toDate)), 'yyyy-MM-dd');

        if (dept === 0 || section === 0) {
            infoNofity('Check The Department || Department Section Feild');
        }
        else {
            const postData = {
                dept_id: dept,
                sect_id: section,
            }
            const result = await axioslogin.post('/empmast/doctors/bysection', postData)
            const { success, data: employeeData } = result.data

            if (success === 1) {
                setSectionEmployee(employeeData)
                const emidArray = employeeData?.map((val) => val?.em_id)//emid array
                //to checking complete month dutypla ins existing
                const postDate = {
                    start_date: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
                    end_date: format(endOfMonth(new Date(toDate)), 'yyyy-MM-dd'),
                    empData: emidArray
                }
                //to get selected date dutyplan
                const getDutyplanDate = {
                    start_date: format(new Date(fromDate), 'yyyy-MM-dd'),
                    end_date: format(new Date(toDate), 'yyyy-MM-dd'),
                    empData: emidArray
                }
                setCurrentEmpdata(getDutyplanDate)

                const result = await axioslogin.post("/DoctorsProcess/check", postDate)
                const { success, data: dutyplanData } = result.data;
                if (success === 1) {
                    // Filter employeeData to find items whose em_id is not in dutyplanData
                    const notAddedArray = employeeData?.filter(emp => !dutyplanData?.map(item => item.emp_id)?.includes(emp.em_id));

                    if (notAddedArray?.length === 0) {
                        /******** If duty plan is already inserted *********/
                        const result = await axioslogin.post("/DoctorsProcess/getData", getDutyplanDate)
                        const { success, data } = result.data;
                        if (success === 1) {
                            const mainArray = employeeData?.map((k) => {
                                return {
                                    dateAray: dateArray?.map(e => format(new Date(e), 'dd')),
                                    daysAry: dateArray?.map(e => format(new Date(e), 'eee')),
                                    em_no: k.em_no,
                                    em_name: k.emp_name,
                                    arr: data.filter((val) => val.emp_id === k.em_id ? val : null)

                                }
                            })
                            settableArray(mainArray);
                            setdaysStr(dateArray?.map(e => format(new Date(e), 'dd')))
                            setdaysNum(dateArray?.map(e => format(new Date(e), 'eee')))
                        } else {
                            errorNofity("Error While getting dcotor ")
                        }
                    } else {
                        /** If duty plan is already inserted, but some employee id duty is not planned */
                        //finding the dates between start date and end date
                        const dateRange = eachDayOfInterval({ start: new Date(monthStart), end: new Date(monthEnd) });

                        const fullDutyplanDateRange = dateRange?.map((val) => { return { date: format(new Date(val), 'yyyy-MM-dd') } });

                        const fullShiftDutyDay = await notAddedArray?.map((val) => {
                            return fullDutyplanDateRange?.map((value) => {
                                return {
                                    date: value?.date,
                                    emp_id: val?.em_id,
                                    doj: val?.em_doj,
                                    em_no: val?.em_no,
                                    holiday_type: val?.holiday_type
                                }
                            })
                        }).flat(Infinity)

                        const fullMonthHolidayList = holidayList?.map((values) => {
                            return values.hld_date >= format(new Date(monthStart), 'yyyy-MM-dd') && values.hld_date <= format(new Date(monthEnd), 'yyyy-MM-dd') ? values : null;
                        }).filter((val) => val !== null);

                        //add the holiday details into the shift plan array
                        const fullholidayFilterFun = (values) => {
                            const holiday = fullMonthHolidayList.find((val) => val.hld_date === values.date)
                            if (holiday !== undefined) {
                                return {
                                    date: values?.date,
                                    emp_id: values?.emp_id,
                                    em_no: values?.em_no,
                                    shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                                    holidayStatus: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : 1,
                                    holidayName: values?.holiday_type === 1 && holiday?.special_type === 2 ? null : holiday?.hld_desc,
                                    holidaySlno: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : holiday?.hld_slno,
                                    plan_user: employeeIdNumber()
                                }
                            } else {
                                return {
                                    date: values?.date,
                                    emp_id: values?.emp_id,
                                    em_no: values?.em_no,
                                    shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                                    holidayStatus: 0,
                                    holidayName: null,
                                    holidaySlno: 0,
                                    plan_user: employeeIdNumber()
                                }
                            }
                        }

                        // after the holiday inserted duty day array
                        const insertDutyPlanArray = await fullShiftDutyDay.map(fullholidayFilterFun);

                        // duty plan inserting function
                        const insertDutyPlainIntDB = await axioslogin.post("/DoctorsProcess/insert", insertDutyPlanArray)
                        const { success1 } = insertDutyPlainIntDB.data;
                        if (success1 === 1) {
                            const result = await axioslogin.post("/DoctorsProcess/getData", getDutyplanDate)
                            const { success, data } = result.data;
                            if (success === 1) {
                                const mainArray = employeeData?.map((k) => {
                                    return {
                                        dateAray: dateArray?.map(e => format(new Date(e), 'dd')),
                                        daysAry: dateArray?.map(e => format(new Date(e), 'eee')),
                                        em_no: k?.em_no,
                                        em_name: k?.emp_name,
                                        arr: data.filter((val) => val?.emp_id === k?.em_id ? val : null)
                                    }
                                })
                                settableArray(mainArray);
                                setdaysStr(dateArray?.map(e => format(new Date(e), 'dd')))
                                setdaysNum(dateArray?.map(e => format(new Date(e), 'eee')))
                            } else {
                                errorNofity("Error While Getting Duytplan Data")
                            }
                        } else {
                            errorNofity("Error While Inserting Dutyplan Data")
                        }
                    }
                } else {
                    /**If duty is not planned for selected department */

                    if (holidayList?.length === 0) return infoNofity("Holiday List Not Updated")

                    const dateRange = eachDayOfInterval({ start: new Date(monthStart), end: new Date(monthEnd) });

                    const fullDutyplanDateRange = dateRange?.map((val) => { return { date: format(new Date(val), 'yyyy-MM-dd') } });

                    const fullShiftDutyDay = await employeeData?.map((val) => {
                        return fullDutyplanDateRange?.map((value) => {
                            return {
                                date: value?.date,
                                emp_id: val?.em_id,
                                doj: val?.em_doj,
                                em_no: val?.em_no,
                                holiday_type: val?.holiday_type
                            }
                        })
                    }).flat(Infinity)

                    const fullMonthHolidayList = holidayList?.map((values) => {
                        return values?.hld_date >= format(new Date(monthStart), 'yyyy-MM-dd') && values?.hld_date <= format(new Date(monthEnd), 'yyyy-MM-dd') ? values : null;
                    }).filter((val) => val !== null);

                    //add the holiday details into the shift plan array
                    const fullholidayFilterFun = (values) => {
                        const holiday = fullMonthHolidayList?.find((val) => val?.hld_date === values?.date)
                        if (holiday !== undefined) {
                            return {
                                date: values?.date,
                                emp_id: values?.emp_id,
                                em_no: values?.em_no,
                                shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                                holidayStatus: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : 1,
                                holidayName: values?.holiday_type === 1 && holiday?.special_type === 2 ? null : holiday?.hld_desc,
                                holidaySlno: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : holiday?.hld_slno,
                                plan_user: employeeIdNumber()
                            }
                        } else {
                            return {
                                date: values?.date,
                                emp_id: values?.emp_id,
                                em_no: values?.em_no,
                                shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                                holidayStatus: 0,
                                holidayName: null,
                                holidaySlno: 0,
                                plan_user: employeeIdNumber()
                            }
                        }
                    }
                    // after the holiday inserted duty day array
                    const insertDutyPlanArray = await fullShiftDutyDay.map(fullholidayFilterFun);

                    // duty plan inserting function
                    const insertDutyPlainIntDB = await axioslogin.post("/DoctorsProcess/insert", insertDutyPlanArray)
                    const { success1 } = insertDutyPlainIntDB.data;
                    if (success1 === 1) {
                        const result = await axioslogin.post("/DoctorsProcess/getData", getDutyplanDate)
                        const { success, data } = result.data;
                        if (success === 1) {
                            const mainArray = employeeData?.map((k) => {
                                return {
                                    dateAray: dateArray?.map(e => format(new Date(e), 'dd')),
                                    daysAry: dateArray?.map(e => format(new Date(e), 'eee')),
                                    em_no: k?.em_no,
                                    em_name: k?.emp_name,
                                    arr: data?.filter((val) => val?.emp_id === k?.em_id ? val : null)
                                }
                            })
                            settableArray(mainArray);
                            setdaysStr(dateArray?.map(e => format(new Date(e), 'dd')))
                            setdaysNum(dateArray?.map(e => format(new Date(e), 'eee')))
                        } else {
                            errorNofity("Error While Getting Duytplan Data")
                        }
                    } else {
                        errorNofity("Error While Inserting Dutyplan Data")
                    }
                }
            } else {
                infoNofity("There Is No Doctors Under This Department!")
            }
        }
    }, [dept, section, fromDate, toDate, holidayList, commonSettingData])

    const builkShiftUpdation = useCallback((row) => {
        setSelectedEmployee(row)
        const dateArray = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) })
        const fullDutyplanDateRange = dateArray?.map((val) => { return { date: format(new Date(val), 'yyyy-MM-dd') } });
        //setSelectedEmp(em_no);         // set the selected employee
        setSelectedDateKey(fullDutyplanDateRange);      // set the selected date
        setOpen(true);                 // open the modal
    }, [fromDate, toDate]);

    if (iscommonSettingLoading || isholidayLoading) return <p>Loading...</p>
    if (commonSettingError || holidayError) return <p>Error occurred.</p>

    return (
        <>
            <ShiftPlanningModal
                open={open}
                setOpen={setOpen}
                departmentSectionShift={departmentSectionShift}
                selectedDateKey={selectedDateKey}
                selecteedEmployee={selecteedEmployee}
                currentEmpdata={currentEmpdata}
                settableArray={settableArray}
                sectionEmployee={sectionEmployee}
            />
            <Paper sx={{ display: 'flex', height: screenInnerHeight * 83 / 100, flexDirection: 'column', width: '100%' }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5 }}  >
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    value={fromDate}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(newValue) => {
                                        setFromdate(newValue);
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

                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    minDate={new Date(fromDate)}
                                    maxDate={lastDayOfMonth(new Date(fromDate))}
                                    value={toDate}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(newValue) => {
                                        setToDate(newValue);
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
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DoctorDepartment value={dept} setValue={changeDept} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
                    </Box>

                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }} >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            size='sm'
                            onClick={onClickDutyPlanButton}
                            fullWidth
                            startDecorator={<HourglassEmptyOutlinedIcon />}
                            sx={{ mx: 0.5 }}
                        >
                            Process
                        </Button>
                    </Box>
                    {/* <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, pl: 0.5 }}>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="success"
                            size='sm'
                            onClick={saveAllDuties}
                            fullWidth
                            startDecorator={<SaveIcon />}
                            sx={{ mx: 0.5 }}
                        >
                            Save
                        </Button>
                    </Box> */}

                </Paper>
                <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column', p: 0.5,
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                }}>
                    <Sheet
                        variant="outlined"
                        invertedColors
                        sx={{
                            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                            overflow: 'auto',
                            borderRadius: 5,
                            width: '100%'
                        }}
                    >
                        <Table
                            borderAxis="bothBetween"
                            stripe="odd"
                            hoverRow
                            stickyHeader
                            size='sm'
                            sx={{
                                '& tr > *:first-of-type': {
                                    position: 'sticky',
                                    left: 0,
                                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                                    bgcolor: 'background.surface',
                                    zIndex: 4,
                                    width: '100%'
                                },
                            }}
                        >
                            <thead>
                                <tr style={{ backgroundColor: '#f9fafb' }} >
                                    <th style={{ width: 200, zIndex: 5, backgroundColor: '#f9fafb' }}>Name</th>
                                    <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }} >ID#</th>
                                    {
                                        daysNum?.map((e, idx) => (
                                            <th key={idx} style={{ zIndex: 1, width: 150, textAlign: 'center', backgroundColor: '#f9fafb', color: '#344767', fontWeight: 800 }} >
                                                {e}
                                            </th>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <th style={{ zIndex: 5, backgroundColor: '#b1b9c0' }}> Days </th>
                                    <th style={{ textAlign: "center", zIndex: 1, backgroundColor: '#b1b9c0' }}>  </th>
                                    {
                                        daysStr?.map((e, idx) => (
                                            <th key={idx} style={{ zIndex: 1, textAlign: 'center', width: 150, backgroundColor: '#b1b9c0' }}>
                                                {e}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {tableArray && tableArray.map((row, index) => (
                                    <Fragment key={index}>
                                        <tr >
                                            <td rowSpan={2} style={{ zIndex: 4, backgroundColor: '#f4f6f8', }} >
                                                <Box sx={{ width: 200 }}> {row?.em_name}</Box>
                                            </td>
                                            <td rowSpan={2} style={{ textAlign: 'center', zIndex: 4, backgroundColor: '#f4f6f8' }} >
                                                <Box
                                                    sx={{ width: 60, cursor: 'pointer' }}
                                                    component={Button}
                                                    variant='outlined'
                                                    onClick={() => builkShiftUpdation(row)}
                                                > {row?.em_no}</Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            {row?.arr?.map((val, ind) => {
                                                return (
                                                    <td key={ind}>
                                                        <Box >
                                                            <Typography fontSize="0.8rem" sx={{ textAlign: 'center', }}>
                                                                {val?.dutyName === null ? 'NIL' : val?.dutyName}
                                                            </Typography>

                                                            <Typography fontSize="0.8rem" sx={{ textAlign: 'center', }}>
                                                                {val?.shiftName}
                                                            </Typography>

                                                        </Box>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Paper>
        </>
    )
}

export default memo(DateWiseDutyplanning) 