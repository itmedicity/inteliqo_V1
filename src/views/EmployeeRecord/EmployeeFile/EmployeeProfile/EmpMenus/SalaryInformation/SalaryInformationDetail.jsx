import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import AmendmentStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/AmendmentStatus';
import DeductedWages from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DeductedWages';
import DeductionStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DeductionStatus';
import EarnedWages from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EarnedWages';
import EarningStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EarningStatus';
import FixedWageSalary from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/FixedWageSalary';
import PreviousAmendChanges from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/PreviousAmendChanges';
import WageStatus from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/WageStatus';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const SalaryInformationDetail = () => {
    const history = useHistory()
    const { id, no } = useParams()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
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
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }} >
                <Paper square elevation={0} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
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
                        <Paper square sx={{ display: "flex", width: "100%", flexDirection: "column", pr: 0.5, height: 150 }}>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Fixed Wages</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1"> {sumfixedwages}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex" }} >
                                <Box sx={{ display: "flex", flex: 1, p: 0.5, justifyContent: "center" }} >
                                    {FixedWage === 1 ? <WageStatus /> : <FixedWageSalary emno={id} sumoffixedwage={setSumfixedwages} fixedwagestate={setFixedWageState} />}
                                </Box>
                            </Box>
                        </Paper>

                        <Paper square sx={{ display: "flex", width: "100%", flexDirection: "column", pl: 0.5, height: 150 }}>
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
                                        <Typography level="body1">   Deduction </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">   {-sumdeduction}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, p: 0.5, justifyContent: "center" }} >
                                {DeductStatus === 1 ? <DeductionStatus /> : <DeductedWages emno={id} sumofdeductsalary={sumDeduction} deductstatus={SetDeductionStatus} />}
                            </Box>
                        </Paper>
                    </Paper>

                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '50%',
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            height: 150
                            // backgroundColor: "lightcyan"
                        }}
                    >
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> Earnings</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {sumearning}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 0.5, justifyItems: "flex-start" }} >
                            {EarnStatus === 1 ? <EarningStatus /> : <EarnedWages emno={id} sumoferanedwages={setSumearning} earningstatus={setEarnStatus} />}
                        </Box>

                    </Paper>
                    <Paper square elevation={3}
                        sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            width: '50%',
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            height: 150
                            // backgroundColor: "lightcyan"
                        }}
                    >
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">   Deduction </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly", backgroundColor: "#F7F7F8" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">   {-sumdeduction}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 0.5, justifyItems: "flex-start" }} >
                            {DeductStatus === 1 ? <DeductionStatus /> : <DeductedWages emno={id} sumofdeductsalary={sumDeduction} deductstatus={SetDeductionStatus} />}
                        </Box>

                    </Paper>
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
                    </Paper>
                </Paper>
                {/* <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={RedirectToProfilePage}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper> */}
            </Box>
        </Fragment >
    )
}

export default memo(SalaryInformationDetail) 