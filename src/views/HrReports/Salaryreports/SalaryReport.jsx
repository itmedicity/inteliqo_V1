import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ReportLayout from '../ReportComponent/ReportLayout'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'
import moment from 'moment'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { setDepartment } from 'src/redux/actions/Department.action'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'

const SalaryReport = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setDeptWiseSection());
        dispatch(setCommonSetting());
        dispatch(setDept())
    }, [dispatch])

    const deptSect = useSelector((state) => state?.getDeptSectList?.deptSectionList, _.isEqual)
    const departments = useSelector((state) => state?.getdept?.departmentlist, _.isEqual)

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);
    const commonSettings = useMemo(() => commonState, [commonState]);
    const allDept = useMemo(() => departments, [departments])
    const allSection = useMemo(() => deptSect, [deptSect])

    const [value, setValue] = useState(moment(new Date()));
    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [all, setAll] = useState(false)
    const [mainArray, setArray] = useState([])


    const getData = useCallback(async () => {

        if (all === true) {

            const deptArray = allDept?.map(val => val.dept_id)
            const sectArray = allSection?.map(val => val.sect_id)
            const getEmpData = {
                em_department: deptArray,
                em_dept_section: sectArray,
            }
            const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
            const { succes, dataa } = result1.data
            if (succes === 1) {
                const arr = dataa && dataa.map((val) => val.em_id)
                const postdata = {
                    emp_id: arr,
                    from: moment(startOfMonth(value)).format('YYYY-MM-DD'),
                    to: moment(endOfMonth(value)).format('YYYY-MM-DD'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = dataa?.map((val) => {
                        const empwise = data.filter((value) => {
                            return value.emp_id === val.em_id ? 1 : 0
                        })
                        const total = empwise.length
                        const actual = (empwise.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HFD' || val.duty_desc === 'EHFD')).length
                        const calculated = (empwise.filter(val => val.duty_desc === 'P')).length
                        const offdays = (empwise.filter(val => val.duty_desc === 'OFF' || val.duty_desc === 'NOFF')).length
                        const leaves = (empwise.filter(val => val.duty_desc === 'LV' || val.duty_desc === 'HDL')).length
                        const holidayworked = (empwise.filter(val => val.duty_desc === 'HP')).length
                        const lossofpay = (empwise.filter(val => val.duty_desc === 'A')).length
                        const holiday = (empwise.filter(val => val.holiday_status === 1)).length
                        const calculatedlop = (empwise.filter(val => val.duty_desc === 'LC')).length
                        const lwp = (empwise.filter(val => val.duty_desc === 'LWP')).length
                        const nofhfd = (empwise.filter(val => val.duty_desc === 'HFD' || val.duty_desc === 'EHFD')).length
                        const LCcount = (empwise.filter(val => val.duty_desc === 'LC')).length

                        const total_pay_day = val.gross_salary < commonSettings.salary_above ? calculated + offdays + holiday + holidayworked + leaves + (nofhfd / 2) - lwp :
                            calculated + offdays + holiday + leaves + (nofhfd / 2) - lwp

                        const totalday = LCcount > commonSettings?.max_late_day_count ? total_pay_day + commonSettings?.max_late_day_count + ((LCcount - commonSettings?.max_late_day_count) / 2) : total_pay_day + LCcount

                        const obj = {
                            em_id: val.em_id,
                            em_no: val.em_no,
                            em_name: val.em_name,
                            total: total,
                            actual: actual,
                            lossofpay: lossofpay,
                            lwp: lwp,
                            leaves: leaves,
                            holidayworked: holidayworked,
                            holiday: holiday,
                            offdays: offdays,
                            calculated: calculated,
                            calculatedlop: calculatedlop,
                            paydays: totalday,
                            nofhfd: nofhfd,
                            gross_salary: val.gross_salary,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            em_account_no: val.em_account_no
                        }
                        return obj
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
                em_department: deptartment,
                em_dept_section: section,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa } = result1.data
            if (succes === 1) {
                const arr = dataa && dataa.map((val, index) => {
                    return val.em_id
                })
                // setEmpdata(dataa);
                const postdata = {
                    emp_id: arr,
                    from: moment(startOfMonth(value)).format('YYYY-MM-DD'),
                    to: moment(endOfMonth(value)).format('YYYY-MM-DD'),
                }
                const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = result.data
                if (success === 1) {
                    const finalDataArry = dataa?.map((val) => {
                        const empwise = data.filter((value) => {
                            return value.emp_id === val.em_id ? 1 : 0
                        })
                        const total = empwise.length
                        const actual = (empwise.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HFD' || val.duty_desc === 'EHFD')).length
                        const calculated = (empwise.filter(val => val.duty_desc === 'P')).length
                        const offdays = (empwise.filter(val => val.duty_desc === 'OFF' || val.duty_desc === 'NOFF')).length
                        const leaves = (empwise.filter(val => val.duty_desc === 'LV' || val.duty_desc === 'HDL')).length
                        const holidayworked = (empwise.filter(val => val.duty_desc === 'HP')).length
                        const lossofpay = (empwise.filter(val => val.duty_desc === 'A')).length
                        const holiday = (empwise.filter(val => val.holiday_status === 1)).length
                        const calculatedlop = (empwise.filter(val => val.duty_desc === 'LC')).length
                        const lwp = (empwise.filter(val => val.duty_desc === 'LWP')).length
                        const nofhfd = (empwise.filter(val => val.duty_desc === 'HFD' || val.duty_desc === 'EHFD')).length
                        const LCcount = (empwise.filter(val => val.duty_desc === 'LC')).length

                        const total_pay_day = val.gross_salary < commonSettings.salary_above ? calculated + offdays + holiday + holidayworked + leaves + (nofhfd / 2) - lwp :
                            calculated + offdays + holiday + leaves + (nofhfd / 2) - lwp

                        const totalday = LCcount > commonSettings?.max_late_day_count ? total_pay_day + commonSettings?.max_late_day_count + ((LCcount - commonSettings?.max_late_day_count) / 2) : total_pay_day + LCcount

                        const obj = {
                            em_id: val.em_id,
                            em_no: val.em_no,
                            em_name: val.em_name,
                            total: total,
                            actual: actual,
                            lossofpay: lossofpay,
                            lwp: lwp,
                            leaves: leaves,
                            holidayworked: holidayworked,
                            holiday: holiday,
                            offdays: offdays,
                            calculated: calculated,
                            calculatedlop: calculatedlop,
                            paydays: totalday,
                            nofhfd: nofhfd,
                            gross_salary: val.gross_salary,
                            dept_name: val.dept_name,
                            sect_name: val.sect_name,
                            em_account_no: val.em_account_no
                        }
                        return obj
                    })
                    setArray(finalDataArry)
                }
                else {
                    warningNofity("No Punch Details")
                }
            } else {
                warningNofity("No Employee Under this Department || Department Section")
            }
        }
    }, [value, deptartment, section, all, allDept, allSection])

    const [column] = useState([
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name', minWidth: 250 },
        { headerName: 'Dept Section ', field: 'sect_name', minWidth: 250 },
        { headerName: 'Total Days ', field: 'total' },
        { headerName: 'LOP Days ', field: 'lossofpay' },
        { headerName: 'LWP ', field: 'lwp' },
        { headerName: 'No of Leaves', field: 'leaves' },
        { headerName: 'Calculated LOP', field: 'calculatedlop' },
        { headerName: 'No Of Half Days', field: 'nofhfd' },
        { headerName: 'Total Day', field: 'paydays' },
        { headerName: 'Gross Salary', field: 'gross_salary' },
        { headerName: 'Account Number', field: 'em_account_no' },
    ])

    return (
        <ReportLayout title="Salary Reports" data={mainArray} displayClose={true} >
            <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
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
                        <DepartmentDropRedx getDept={setDepart} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.3, }} >
                        <DepartmentSectionRedx getSection={setDepartSection} />
                    </Box>
                    <Box sx={{ px: 0.3, mt: 1 }} >
                        <JoyCheckbox
                            label='All'
                            name="all"
                            checked={all}
                            onchange={(e) => setAll(e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ ml: 5, display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color="primary" onClick={getData} sx={{
                                color: '#90caf9'
                            }} >
                                <PublishedWithChangesIcon />
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
                    }} >
                    <CustomAgGridRptFormatOne
                        tableDataMain={mainArray}
                        columnDefMain={column}
                    />
                </Paper>
            </Paper>
        </ReportLayout>
    )
}

export default memo(SalaryReport) 