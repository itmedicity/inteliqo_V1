import { Box, Paper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import _ from 'underscore';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { CssVarsProvider, IconButton, Input } from '@mui/joy';
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { axioslogin } from 'src/views/Axios/Axios';
import TableRows from './TableRows';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const EmployeeView = () => {

    const [selectDate, setSelectDate] = useState(moment(new Date()))
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_name, em_no, sect_name } = empData;
    const postData = useMemo(() => {
        return {
            empno: em_no,
            fromdate: format(startOfMonth(new Date(selectDate)), 'yyyy-MM-dd'),
            todate: format(addDays(endOfMonth(new Date(selectDate)), 1), 'yyyy-MM-dd')
        }
    }, [em_no, selectDate])

    const getData = useCallback(async () => {
        setOpenBkDrop(true)
        const result = await axioslogin.post(`/ReligionReport/punchReport`, postData)
        const { data: firstApiData, success } = result.data
        if (success === 1) {
            const result = await axioslogin.post(`/ReligionReport/punchReportmaster`, postData)
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
                const updatedSecondApiData = setData?.map(data => {
                    const correspondingFirstData = firstApiData?.filter(firstApiData => {
                        return (
                            parseInt(firstApiData?.emp_code) === data?.em_no &&
                            new Date(firstApiData?.punch_time).toDateString() === new Date(data?.duty_day).toDateString()
                        );
                    });
                    return {
                        ...data,
                        new_field: correspondingFirstData.map(data => data?.punch_time)
                    };
                });
                const array = updatedSecondApiData?.sort((a, b) => new Date(a?.duty_day) - new Date(b?.duty_day));
                setTableData(array)
                setOpenBkDrop(false)
                // setTableData(updatedSecondApiData)
            }
            else {
                warningNofity("Dutypaln Not Done")
                setOpenBkDrop(false)
            }
        }
        else {
            warningNofity("No Employee Punch Data")
            setOpenBkDrop(false)
        }
    }, [postData])
    return (
        <CustomLayout title="Employee Punch View" displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !. " />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                <Paper square elevation={0} sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'row', py: 0.3 }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="em_no"
                            disabled={true}
                            value={em_no}
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            disabled={true}
                            name="em_name"
                            value={em_name}
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            disabled={true}
                            name="sect_name"
                            value={sect_name}
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, width: '20%', }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 2)}
                                maxDate={endOfMonth(new Date())}
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
                    <Box sx={{}}>
                        <IconButton variant="outlined" size='md' color="primary" onClick={getData} >
                            <PublishedWithChangesIcon />
                        </IconButton>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", height: window.innerHeight - 170, overflow: 'auto' }} >
                    <TableRows data={tableData} />

                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default EmployeeView