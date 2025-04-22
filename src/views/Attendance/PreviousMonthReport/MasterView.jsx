import { Box, Paper } from '@mui/material';
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { CssVarsProvider, IconButton, Input } from '@mui/joy';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useEffect } from 'react';
import { setDepartment } from 'src/redux/actions/Department.action';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const TableRows = lazy(() => import('../PreviousMonthReport/TableRows'))

const MasterView = () => {

    const dispatch = useDispatch();

    const [selectDate, setSelectDate] = useState(moment(new Date()))
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const postDataDep = useMemo(() => {
        return {
            deptno: dept,
            deptsec: section,
            fromdate: format(startOfMonth(new Date(selectDate)), 'yyyy-MM-dd'),
            todate: format(addDays(endOfMonth(new Date(selectDate)), 1), 'yyyy-MM-dd')
        }
    }, [dept, section, selectDate])

    const getData = useCallback(async () => {
        setOpenBkDrop(true)
        if (dept !== 0 && section !== 0 && emply?.em_id !== 0) {
            const result = await axioslogin.post(`/ReligionReport/punchReportdep`, postDataDep)
            const { data: firstApiData, success } = result.data
            if (success === 1) {
                const result = await axioslogin.post(`/ReligionReport/punchReportmasterdep`, postDataDep)
                const { data, success } = result.data
                if (success === 1) {
                    const setData = data?.map((data) => {
                        let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_in), 'HH:mm')}`;
                        let shiftOut = data.shft_cross_day === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}` :
                            `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}`;
                        return {

                            dept_name: data?.dept_name,
                            duty_day: data?.duty_day,
                            em_name: data?.em_name,
                            em_no: data?.em_no,
                            shft_desc: data?.shft_desc,
                            sect_name: data?.sect_name,
                            shft_cross_day: data?.shft_cross_day,
                            shift_id: data?.shift_id,
                            shift_in: shiftIn,
                            shift_out: shiftOut

                        }
                    })

                    const updatedSecondApiData = setData.map(data => {
                        const correspondingFirstData = firstApiData.filter(firstApiData => {
                            return (
                                parseInt(firstApiData.emp_code) === data.em_no &&
                                new Date(firstApiData.punch_time).toDateString() === new Date(data.duty_day).toDateString()
                            );
                        });
                        return {
                            ...data,
                            new_field: correspondingFirstData.map(data => data.punch_time)
                        };
                    });

                    const array = updatedSecondApiData?.filter(val => val.em_no === emply?.em_no)

                    setTableData(array.slice(0, -1))
                    setOpenBkDrop(false)

                } else {
                    warningNofity("Dutypaln Not Done")
                    setOpenBkDrop(false)
                }
            } else {
                warningNofity("No Employee Punch Data")
                setOpenBkDrop(false)
            }
        } else {
            warningNofity("Select Department & Department Section & Employee")
            setOpenBkDrop(false)
        }
    }, [dept, section, emply, postDataDep])


    return (
        <CustomLayout title="All Punch View" displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !. " />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                <Paper square elevation={0} sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'row', py: 0.3 }}>
                    <Box sx={{ flex: 1, px: 0.3, width: '20%', }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={selectDate}
                                size="small"
                                onChange={(newValue) => {
                                    setSelectDate(newValue);
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
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={changeSection} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBsdEmployee getEmploy={getEmployee} />
                    </Box>
                    <Box sx={{}}>
                        <IconButton variant="outlined" size='md' color="primary" onClick={getData} >
                            <PublishedWithChangesIcon />
                        </IconButton>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", height: window.innerHeight - 170, overflow: 'auto' }} >
                    <Suspense>
                        <TableRows data={tableData} />
                    </Suspense>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(MasterView) 