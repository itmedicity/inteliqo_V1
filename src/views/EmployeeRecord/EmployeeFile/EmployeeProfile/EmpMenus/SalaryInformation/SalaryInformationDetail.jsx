import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import AmendmentStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/AmendmentStatus';
//import DeductedWages from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DeductedWages';
import DeductedWages from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/SalaryInformation/DeductedWages'

import DeductionStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DeductionStatus';
//import EarnedWages from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EarnedWages';
import EarnedWages from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/SalaryInformation/EarnedWages'

import EarningStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EarningStatus';
//import FixedWageSalary from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/FixedWageSalary';
import FixedWageSalary from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/SalaryInformation/FixedWageSalary'
//import PreviousAmendChanges from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/PreviousAmendChanges';
import PreviousAmendChanges from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/SalaryInformation/PreviousAmendChanges'

import WageStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/WageStatus';

const SalaryInformationDetail = () => {
    //const history = useHistory()
    const { id, no } = useParams()
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home/Profile/${id}/${no}`)
    // }
    //use State For sum of fixe wages
    const [sumfixedwages, setSumfixedwages] = useState(0)
    //use State For sum of earning
    const [sumearning, setSumearning] = useState(0)
    //use State For sum of deduction
    const [sumdeduction, sumDeduction] = useState(0)
    //use State for Gross Salary
    const [Grosssalary, setGrosssalary] = useState(0)
    //use State for fixed wage status
    const [FixedWage, setFixedWageState] = useState(0)
    const [EarnStatus, setEarnStatus] = useState(0)
    const [DeductStatus, SetDeductionStatus] = useState(0)
    const [AmendStatus, SetAmendStatus] = useState(0)
    useEffect(() => {
        //calculating gross salary
        const gross_slary = sumfixedwages + sumearning - sumdeduction
        setGrosssalary(gross_slary)
    }, [sumdeduction, sumearning, sumfixedwages])
    //calculating gross salary

    return (
        <Fragment>
            <Box sx={{
                width: "100%",
                // height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper variant='outlined' square elevation={0} sx={{ p: 0.5, }}>
                    <Paper variant='outlined' square elevation={0} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Salary Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '100%',
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "row" },
                            //backgroundColor: "lightcyan"
                        }}
                    >

                        {/* Fixed wages box start */}
                        <Paper square sx={{ display: "flex", width: "100%", flexDirection: "column", pr: 0.5, height: 150 }}>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Fixed Wages</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, backgroundColor: "#F7F7F8", justifyContent: "end" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> {sumfixedwages}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                            {/* calling fixed wage salary component start */}
                            <Box sx={{ display: "flex", flexDirection: "column", }} >
                                {FixedWage === 1 ? <WageStatus /> : <FixedWageSalary emno={id} sumoffixedwage={setSumfixedwages} fixedwagestate={setFixedWageState} />}
                            </Box>
                            {/* calling fixed wage salary component end */}

                        </Paper>
                        {/* Fixed wages box end */}

                        {/* Amendment box start */}
                        <Paper square sx={{
                            display: "flex",
                            width: "100%", flexDirection: "column", pl: 0.5, height: 150, overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }
                        }}>
                            <Box boxShadow={3} sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Previous Amendment Information </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", pt: 0.5 }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">   Description </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Amendment Date</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Changes</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                            {/* calling previous amend changes component start */}
                            <Box sx={{ display: "flex", flexDirection: "column" }} >
                                {AmendStatus === 1 ? <AmendmentStatus /> : <PreviousAmendChanges emp_id={no} amendStatus={SetAmendStatus} />}
                            </Box>
                            {/* calling previous amend changes component end */}

                        </Paper>
                    </Paper>
                    {/* Amendment box end */}

                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '50%',
                            justifyContent: "space-evenly",
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            height: 150
                        }}
                    >
                        {/* Earnings box start */}
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> Earnings</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "end", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {sumearning}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        {/* calling earned wages component start */}
                        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }} >
                            {EarnStatus === 1 ? <EarningStatus /> : <EarnedWages emno={id} sumoferanedwages={setSumearning} earningstatus={setEarnStatus} />}
                        </Box>
                        {/* calling earned wages component end */}
                    </Paper>

                    {/* Earnings box start */}
                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '50%',
                            //alignItems: "center",
                            //justifyContent: "space-evenly",
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            height: 150
                        }}
                    >
                        {/* Deduction box start */}
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "start", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">   Deduction </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "end", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">   {-sumdeduction}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start" }} >
                            {DeductStatus === 1 ? <DeductionStatus /> : <DeductedWages emno={id} sumofdeductsalary={sumDeduction} deductstatus={SetDeductionStatus} />}
                        </Box>

                    </Paper>
                    {/* deduction box end */}
                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '50%',
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" }
                            // backgroundColor: "lightcyan"
                        }}
                    >
                        {/* Gross salary box start */}
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> Gross Salary </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {Grosssalary}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        {/* Gross Salary box start */}
                    </Paper>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(SalaryInformationDetail) 