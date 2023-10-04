import { Box, Button, CssVarsProvider, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { ToastContainer } from 'react-toastify'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Suspense } from 'react'
import EmployeeDetlComp from './EmployeeDetlComp'
import { getEmployeeDetlDutyPlanBased } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun'
import { useDispatch, useSelector } from 'react-redux'
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action'
import _ from 'underscore'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import { setDepartment } from 'src/redux/actions/Department.action'
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import EarntypeDropSelect from 'src/views/MuiComponents/JoyComponent/EarntypeDropSelect'
import WageByEarnDropSelect from 'src/views/MuiComponents/JoyComponent/WageByEarnDropSelect'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';

const BulkWageUpdation = () => {

    const dispatch = useDispatch()
    const [dept, changeDept] = useState(0)
    const [deptSect, changeSection] = useState(0)
    const [earntype, setEarntype] = useState(0)
    const [wage, setWage] = useState(0)
    const [EmpAllowance, setEmployeeAllowance] = useState([])
    const [selectMonth, setSelectMonth] = useState('')
    const [firstAmount, setFirstAmount] = useState(0)
    const [flag, setFlag] = useState(0)
    const [filteramount, setFilterAmount] = useState(0)

    useEffect(() => {
        dispatch(getEarnDeduction());
        dispatch(setDepartment());
    }, [dispatch])

    const Earn = useSelector((state) => state?.getEarnData?.DataList, _.isEqual);
    const EarnValues = useMemo(() => Earn, [Earn])

    const getData = useCallback(async () => {
        if (dept !== 0 && deptSect !== 0 && earntype !== 0 && wage !== 0) {
            const postData = {
                em_department: dept,
                em_dept_section: deptSect,
                em_earning_type: earntype,
                em_salary_desc: wage
            }
            getEmployeeDetlDutyPlanBased(postData).then((emplyDataArray) => {
                const { status, data } = emplyDataArray;
                if (status === 1) {
                    const arr = EarnValues.find((val) => val.earnded_id === wage)
                    const { earnded_name, earnded_id, erning_type_id } = arr;
                    const nwArray = data.map((item) => {
                        const obj = {
                            earnded_name: earnded_name,
                            earnded_id: earnded_id,
                            erning_type_id: erning_type_id,
                            date: moment(new Date()).format('YYYY-MM-DD'),
                            amount: 0,
                            status: 0
                        }
                        return {
                            ...item,
                            ...obj
                        }
                    })
                    setFlag(1)
                    setEmployeeAllowance(nwArray);
                }
                else {
                    setEmployeeAllowance([]);
                }
            })
        } else {
            warningNofity("Choose All Option")
        }
    }, [dept, deptSect, earntype, wage, EarnValues])

    const getfilter = useCallback(() => {
        if (flag === 0) {
            infoNofity("Please List Employees!")
        } else {
            const filterArray = EmpAllowance.filter((val) => val.gross_salary <= filteramount)
            setEmployeeAllowance(filterArray)
            setFlag(0)
        }
    }, [flag, EmpAllowance, filteramount])

    const submitData = useCallback(async () => {
        const result = await axioslogin.post('/salaryIncrement/insert', EmpAllowance)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setEmployeeAllowance([])
            changeDept(0)
            changeSection(0)
            setEarntype(0)
            setWage(0)
        } else {
            infoNofity(message)
            setEmployeeAllowance([])
            changeDept(0)
            changeSection(0)
            setEarntype(0)
            setWage(0)
        }
    }, [EmpAllowance])

    const handleChange = useCallback(async (obj) => {
        let ar = EmpAllowance?.map((e) => e.em_no === obj.em_no ? { ...e, date: obj.newDate, amount: obj.newAmnt, status: 1 } : { ...e })
        setEmployeeAllowance([...ar])
    }, [EmpAllowance])

    return (
        <>
            <ToastContainer />
            <CustomLayout title="Wages Bulk Updation" displayClose={true} >
                <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DepartmentDropRedx getDept={changeDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DepartmentSectionRedx getSection={changeSection} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <EarntypeDropSelect getEarn={setEarntype} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <WageByEarnDropSelect getWage={setWage} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyInput
                                type="month"
                                size="sm"
                                name="selectMonth"
                                value={selectMonth}
                                onchange={setSelectMonth}
                            />
                        </Box>
                        <Tooltip title="Amount" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <JoyInput
                                    type="text"
                                    size="sm"
                                    name="firstAmount"
                                    value={firstAmount}
                                    onchange={setFirstAmount}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', pl: 0.5, pt: 0.5
                        }} >
                            <CssVarsProvider>
                                <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                    color: '#90caf9'
                                }} >
                                    <PublishedWithChangesIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', mt: 2, ml: 0.5
                        }} >
                            <ArrowBackIosIcon />
                        </Box>
                        <Tooltip title="Salary" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <JoyInput
                                    type="text"
                                    size="sm"
                                    name="filteramount"
                                    value={filteramount}
                                    onchange={setFilterAmount}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', pl: 0.5, pt: 0.5
                        }} >
                            <CssVarsProvider>
                                <Button aria-label="Like"
                                    size="md"
                                    variant="outlined"
                                    color="neutral" onClick={getfilter} sx={{
                                        color: '#90caf9'
                                    }} >
                                    <FilterAltIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitData}
                                >
                                    Save
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" >
                                <TableHead sx={{ backgroundColor: '#F3F6F9' }}>
                                    <TableRow sx={{ color: '#003A75' }} hover >
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Employee ID </TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Employee Name</TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Description</TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Month</TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Amount</TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Suspense>
                                        {
                                            EmpAllowance?.map((val, index) => {
                                                return <EmployeeDetlComp
                                                    value={val}
                                                    key={index}
                                                    selectMonth={selectMonth}
                                                    firstAmount={firstAmount}
                                                    handleChange={handleChange}
                                                />
                                            })
                                        }
                                    </Suspense>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </CustomLayout>
        </>
    )
}

export default memo(BulkWageUpdation) 