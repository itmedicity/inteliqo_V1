import { Box, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { memo, useReducer, useState } from 'react'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import { dutyPlanInitialState, dutyPlanReducer, planInitialState } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun'
import { lastDayOfMonth, startOfMonth } from 'date-fns'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { Button, CssVarsProvider, Input, Typography } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import _ from 'underscore'
import { getAllEarnByDept, getEmployeeData, } from './PaySlipComponents/PayslipFunc'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios'

const PayslipTopCard = () => {

    const reduxDispatch = useDispatch()
    const { FETCH_PAYSLIP_TABLEDATA } = Actiontypes;
    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptName, deptSecName } = planState
    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))
    const { DEPT_NAME, DEPT_SEC_NAME } = planInitialState

    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })
    const state = useSelector((state) => state.getCommonSettings, _.isEqual)

    const [value, setValue] = useState(moment(new Date()));
    const [payrollData, setPayrollData] = useState([])
    const [saveArray, setSavearray] = useState([])

    const getAllData = async (e) => {
        e.preventDefault()
        if (deptName === 0 || deptSecName === 0) {
            infoNofity('Check The Department || Department Section Feild');
        } else if (moment(toDate) > moment(calanderMaxDate)) {
            infoNofity('Select the Correct From || To || Both Dates')
        } else {

            const postData = {
                dept_id: deptName,
                sect_id: deptSecName,
                attendance_marking_month: moment(startOfMonth(value)).format('YYYY-MM-DD')
            }

            const checkdatas = {
                em_department: deptName,
                em_dept_section: deptSecName,
                attendance_marking_month: moment(startOfMonth(value)).format('YYYY-MM-DD')
            }

            getEmployeeData(postData).then((values) => {
                const { status, empData } = values
                if (status === 1) {
                    getAllEarnByDept(checkdatas).then((values) => {
                        const { status, earnData } = values
                        if (status === 1) {
                            //calculating worked days amount
                            const array = earnData.map((val) => {
                                if (val.total_working_days === val.total_days || val.em_earning_type === 3) {
                                    const obj = {
                                        ...val,
                                        worked_amount: val.em_amount
                                    }
                                    return obj
                                } else {
                                    const worked_amount = ((val.em_amount / val.total_working_days) * val.total_days).toFixed(2)
                                    const obj = {
                                        ...val,
                                        worked_amount: Math.round(Number(worked_amount) / 10) * 10
                                    }
                                    return obj
                                }
                            })

                            //calculating esi and pf of employee and employer related to worked days
                            const arr = array.map((i) => {
                                if (i.include_esi === 1 && i.em_esi_status === 1 && i.em_earning_type !== 3) {
                                    const value = Number(i.worked_amount) * state.esi_employee / 100
                                    const esivalue = Number(i.worked_amount) * state.esi_employer / 100
                                    const obj = {
                                        ...i,
                                        esiValue: Math.round(value / 10) * 10,
                                        esiemployer: Math.round(esivalue / 10) * 10,
                                        pfValue: 0,
                                        pfemployer: 0
                                    }
                                    return obj
                                }
                                else if (i.include_pf === 1 && i.em_pf_status === 1 && i.em_earning_type !== 3) {
                                    const value2 = Number(i.worked_amount) * state.pf_employee / 100
                                    const pfvalue2 = Number(i.worked_amount) * state.pf_employer / 100


                                    const obj = {
                                        ...i,
                                        esiValue: 0,
                                        esiemployer: 0,
                                        pfValue: value2 < state.pf_employee_amount ? Math.round(value2 / 10) * 10 : state.pf_employee_amount,
                                        pfemployer: pfvalue2 < state.pf_employer_amount ? Math.round(pfvalue2 / 10) * 10 : state.pf_employer_amount
                                    }
                                    return obj
                                }
                                else {
                                    const obj = {
                                        ...i, esiValue: 0, pfValue: 0, esiemployer: 0, pfemployer: 0
                                    }
                                    return obj
                                }
                            })

                            //deduct esi amount and pf amount from worked days amount

                            const newArray = arr.map((j) => {
                                const amount = Number(j.worked_amount) - (j.pfValue + j.esiValue)
                                const obj = {
                                    ...j,
                                    amount: Math.round(amount / 10) * 10
                                }
                                return obj
                            })
                            setSavearray(newArray)

                            const newFun = (val) => {
                                var earningvalue = (newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 2).reduce((acc, curr) => acc + (curr.amount), 0));
                                var fixedValue = (newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 1).reduce((acc, curr) => acc + (curr.amount), 0));
                                var deductValue = (newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 3).reduce((acc, curr) => acc + (curr.amount), 0));
                                var allesiemployer = (newArray?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.esiemployer), 0));
                                var allpfemployer = (newArray?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.pfemployer), 0));
                                var allesiemployee = (newArray?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.esiValue), 0));
                                var allpfemployee = (newArray?.filter(item => val.em_no === item.em_no).reduce((acc, curr) => acc + (curr.pfValue), 0));

                                const grossAmount = earningvalue + fixedValue;
                                const netAmount = earningvalue + fixedValue - deductValue

                                return {

                                    ...val,
                                    "fixedValue": Math.round(fixedValue / 10) * 10,
                                    "earningvalue": Math.round(earningvalue / 10) * 10,
                                    "deductValue": Math.round(deductValue / 10) * 10,
                                    "fixedSalary": newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 1),
                                    "earnings": newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 2),
                                    "deduction": newArray?.filter(item => val.em_no === item.em_no && item.em_earning_type === 3),
                                    "allesiemployer": Math.round(allesiemployer / 10) * 10,
                                    "allpfemployer": Math.round(allpfemployer / 10) * 10,
                                    "allesiemployee": allesiemployee,
                                    "allpfemployee": allpfemployee,
                                    "gross": Math.round(grossAmount / 10) * 10,
                                    "net": Math.round(netAmount / 10) * 10
                                }
                            }
                            const newEmp = empData?.map(newFun)
                            setPayrollData(newEmp)

                            reduxDispatch({ type: FETCH_PAYSLIP_TABLEDATA, payload: newEmp, status: false })
                        } else {
                            infoNofity("No data found")
                        }
                    })
                }
                else {
                    reduxDispatch({ type: FETCH_PAYSLIP_TABLEDATA, payload: [], status: false })
                    infoNofity("No data found")
                }
            })
        }
    }

    const onClickSave = async () => {
        const array1 = payrollData && payrollData.map((val, index) => {
            const obje = {
                em_no: val.em_no,
                em_id: val.em_id,
                dept_id: deptName,
                sect_id: deptSecName,
                total_working_days: val.total_working_days,
                total_days: val.total_days,
                fixed_wages: val.fixedValue,
                earning_wages: val.earningvalue,
                deduct_wages: val.deductValue,
                gross_amount: val.gross,
                net_amount: val.net,
                attendance_marking_month: moment(value).format('YYYY-MM-01'),
                esi_employee: val.allesiemployee,
                esi_employer: val.allesiemployer,
                pf_employee: val.allpfemployee,
                pf_employer: val.allpfemployer,
                total_lop: val.total_lop,
                calculated_lop: val.calculated_lop
            }
            return obje
        })

        const array2 = saveArray?.map((val) => {
            const obj = {
                em_no: val.em_no,
                em_id: val.em_id,
                total_working_days: val.total_working_days,
                total_days: val.total_days,
                em_earning_type: val.em_earning_type,
                earning_type_name: val.earning_type_name,
                em_amount: val.em_amount,
                em_salary_desc: val.em_salary_desc,
                worked_amount: val.worked_amount,
                attendance_marking_month: moment(value).format('YYYY-MM-01')
            }
            return obj
        })

        const checkdate = {
            attendance_marking_month: moment(value).format('YYYY-MM-01'),
        }
        const result = await axioslogin.post("/payrollprocess/check/payslip", checkdate)
        const { success } = result.data
        if (success === 1) {
            infoNofity("Payslip for this month already created!")
        }
        else {
            const result = await axioslogin.post("/payrollprocess/create/payslip", array1)
            const { success, message } = result.data
            if (success === 1) {
                const result = await axioslogin.post("/payrollprocess/create/detail", array2)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                } else {
                    errorNofity(message)
                }
            } else {
                errorNofity(message)
            }
        }
    }

    return (
        <Paper square variant="outlined"
            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}>
            <ToastContainer />
            {/* <CustomBackDrop open={open} /> */}
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }} >
                <Box sx={{ p: 1 }}>
                    <CssVarsProvider>
                        <Typography>
                            PaySlip Calculation Month
                        </Typography>
                    </CssVarsProvider>
                </Box>
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
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <DeptSelectByRedux setValue={setDepartment} value={deptName} />
                </Box>
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                <CssVarsProvider>

                    <Box sx={{ p: 0.2 }} >
                        <Button aria-label="Like" variant="outlined" color="neutral"
                            onClick={getAllData}
                            sx={{ color: '#90caf9' }} >
                            <PublishedWithChangesIcon />
                        </Button>
                    </Box>
                    <Box sx={{ p: 0.2 }}>
                        <Button aria-label="Like" variant="outlined" color="neutral"
                            onClick={onClickSave}
                            sx={{ color: '#81c784' }}>
                            <SaveIcon />
                        </Button>
                    </Box>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default memo(PayslipTopCard)
