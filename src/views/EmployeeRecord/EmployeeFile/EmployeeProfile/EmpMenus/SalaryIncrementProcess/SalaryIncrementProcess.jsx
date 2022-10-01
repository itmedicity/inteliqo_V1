import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
//import './EmpStyle.css'
import SalaryIncrementMainCard from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/SalaryIncrementMainCard'
import FixedWagesSalaryIncre from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/FixedWagesSalaryIncre'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Box, Paper } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const SalaryIncrementProcess = () => {

    const history = useHistory()
    const { id, no } = useParams()
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home/Profile/${id}/${no}`)
    // }
    const [fixedWages, setFixedwages] = useState([])
    const [Earnings, setEarnings] = useState([])
    const [Deduction, setDeduction] = useState([])
    useEffect(() => {
        const getFixedWages = async () => {
            const result = await axioslogin.get(`/common/getfixedwagesSalary/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setFixedwages(data)
            }
            else if (success === 0) {
                infoNofity('No Fixed wages is set to this employee')
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedWages()
        const getFixedEarnings = async () => {
            const result = await axioslogin.get(`/common/getfixedearnings/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setEarnings(data)

            }
            else if (success === 0) {

            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedEarnings()
        const getFixeddeduction = async () => {
            const result = await axioslogin.get(`/common/getfixeddeduction/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setDeduction(data)
            }
            else if (success === 0) {

            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixeddeduction()
    }, [id])
    //use Memo
    const fixedwage = useMemo(() => fixedWages, [fixedWages])
    const earning = useMemo(() => Earnings, [Earnings])
    const deducted = useMemo(() => Deduction, [Deduction])

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>

                    {/* Heading Section start */}
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Salary Increment Process
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* Heading Section end */}

                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5,
                        }}>
                            <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                <SalaryIncrementMainCard wageName="Fixed Wages" >
                                    {
                                        fixedwage.map((value, index) => {
                                            return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
                                        })

                                    }
                                </SalaryIncrementMainCard>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                <SalaryIncrementMainCard wageName="Earnings">
                                    {
                                        earning.map((value, index) => {
                                            return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
                                        })
                                    }
                                </SalaryIncrementMainCard>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                <SalaryIncrementMainCard wageName="Deduction">
                                    {
                                        deducted.map((value, index) => {
                                            return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
                                        })
                                    }
                                </SalaryIncrementMainCard>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default SalaryIncrementProcess