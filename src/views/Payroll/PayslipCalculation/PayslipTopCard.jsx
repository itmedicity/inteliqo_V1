import { Box, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import React, { memo, useReducer, useState } from 'react'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import { dutyPlanInitialState, dutyPlanReducer, getEmployeeDetlDutyPlanBased, planInitialState } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun'
import Moment from 'react-moment'
import { format, lastDayOfMonth } from 'date-fns'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { Button, CssVarsProvider } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import _ from 'underscore'
import { deductionSalary, EarningSalary, FixedSalary, getEmployeeData, newFun } from './PaySlipComponents/PayslipFunc'

const PayslipTopCard = ({ setView }) => {

    const reduxDispatch = useDispatch()
    const { FETCH_PAYSLIP_TABLEDATA, FETCH_EMP_DETAILS } = Actiontypes;
    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptName, deptSecName } = planState
    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))
    const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState
    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })
    const state = useSelector((state) => state.getCommonSettings, _.isEqual)
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
                attnd_mark_startdate: fromDate,
                attnd_mark_enddate: toDate
            }

            const checkdatas = {
                em_department: deptName,
                em_dept_section: deptSecName,
            }

            getEmployeeData(postData).then((values) => {
                const { status, empData } = values
                console.log(values);
                if (status === 1) {
                    FixedSalary(checkdatas).then((svalues) => {
                        const { status, fixedData } = svalues
                        if (status === 1) {
                            EarningSalary(checkdatas).then((values) => {
                                const { status, earningData } = values
                                if (status === 1) {
                                    deductionSalary(checkdatas).then((values) => {
                                        const { status, deductionData } = values
                                        const newFun = (val) => {
                                            // console.log(earningData?.filter(arr3 => val.em_no === arr3.em_no));

                                            var earningvalue = (earningData?.filter(arr3 => val.em_no === arr3.em_no)).reduce((acc, curr) => acc + curr.em_amount, 0);
                                            var fixedvalue = (fixedData?.filter(arr1 => val.em_no === arr1.em_no)).reduce((acc, curr) => acc + curr.em_amount, 0)
                                            var deductionvalue = (deductionData?.filter(arr4 => val.em_no === arr4.em_no)).reduce((acc, curr) => acc + curr.em_amount, 0)

                                            const grosssalary = (earningvalue + (fixedvalue * val.calculated_worked / val.total_working_days) - deductionvalue).toFixed(2)
                                            // const PfValue
                                            // console.log(grosssalary);

                                            return {
                                                ...val,
                                                "fixedSalary": fixedData?.filter(arr1 => val.em_no === arr1.em_no),
                                                "earnings": earningData?.filter(arr3 => val.em_no === arr3.em_no),
                                                "deduction": deductionData?.filter(arr4 => val.em_no === arr4.em_no),
                                                "gross_salary": grosssalary,
                                                "esiValue": fixedvalue <= state.esi_limit ? (fixedvalue * state.esi_employee / 100) : 0,
                                                "pfValue": (fixedvalue <= state.max_salary && fixedvalue > state.min_salary) ? (fixedvalue * state.pf_employee / 100) : 0,
                                                "netSalary": 0
                                                //"esiValue": fixedvalue <= state.esi_limit?.(fixedvalue * state.esi_employee / 100)
                                            }
                                        }
                                        const newEmp = empData?.map(newFun)
                                        reduxDispatch({ type: FETCH_PAYSLIP_TABLEDATA, payload: newEmp, status: false })
                                    })
                                }
                            })
                        }
                    })
                }

                else {
                    reduxDispatch({ type: FETCH_PAYSLIP_TABLEDATA, payload: [], status: false })
                    setView(0)
                    infoNofity("No data found")
                }
            })
        }
    }

    return (
        <Paper square variant="outlined"
            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}>
            <ToastContainer />
            {/* <CustomBackDrop open={open} /> */}
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }} >
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            // maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) =>
                                dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }}  >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            minDate={moment(fromDate)}
                            maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={toDate}
                            onChange={(date) =>
                                dispatch({ type: TO_DATE, to: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
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
                            //onClick={onClickSave} 
                            sx={{ color: '#81c784' }}>
                            <SaveIcon />
                        </Button>
                    </Box>
                </CssVarsProvider>
                {/* <Button variant="outlined" startIcon={<SendIcon />} onClick={onClickDutyPlanButton}>
        </Button>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={onClickDutyPlanButton}>
        </Button> */}
            </Box>
        </Paper>
    )
}

export default memo(PayslipTopCard)