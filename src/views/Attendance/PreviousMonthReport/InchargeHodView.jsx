import { Box, Paper } from '@mui/material'
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection'
import HodWiseEmpList from 'src/views/MuiComponents/JoyComponent/HodWiseEmpList'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import EmployeeView from './EmployeeView'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { CssVarsProvider, IconButton, Input } from '@mui/joy'
import moment from 'moment'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import _ from 'underscore'
import { getEmpNameHodSectionBased, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
const TableRows = lazy(() => import('../PreviousMonthReport/TableRows'))

const InchargeHodView = () => {

    const dispatch = useDispatch();
    const [self, setSelf] = useState(false)
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [selectDate, setSelectDate] = useState(moment(new Date()))
    const [tableData, setTableData] = useState([])

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_id, hod, incharge } = empData;

    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
        }
    }, [dispatch, em_id, hod, incharge])

    const postDataDep = useMemo(() => {
        return {
            deptsec: section,
            fromdate: moment(startOfMonth(new Date(selectDate))).format('YYYY-MM-DD'),
            todate: moment(endOfMonth(new Date(selectDate))).format('YYYY-MM-DD')
        }
    }, [selectDate, section])

    const getData = useCallback(async () => {
        if (section !== 0 && emply?.em_id !== 0) {
            const result = await axioslogin.post(`/ReligionReport/sectiondata`, postDataDep)
            const { data: firstApiData, success } = result.data
            if (success === 1) {
                const result = await axioslogin.post(`/ReligionReport/sectionPunchmast`, postDataDep)
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

                    setTableData(array)

                } else {
                    warningNofity("Dutypaln Not Done")
                }
            } else {
                warningNofity("No Employee Punch Data")
            }
        } else {
            warningNofity("Select Department & Department Section & Employee")
        }
    }, [section, emply, postDataDep])

    return (
        <>
            {
                self === true ? <EmployeeView /> : <CustomLayout title="Incharge/HOD Punch View" displayClose={true} >
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
                                <HodWiseDeptSection detSection={section} setSectionValue={changeSection} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <HodWiseEmpList section={section} setEmployee={getEmployee} />
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
            }
        </>
    )
}

export default InchargeHodView