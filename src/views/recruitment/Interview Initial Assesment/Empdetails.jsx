import { Box, Button, CssVarsProvider, Option, Select, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';

const EduView = lazy(() => import('./Eduview'))
const ExpView = lazy(() => import('./Expview'))
const Empdetails = ({ Personaldata, setdesgid, desgid, count, setcount }) => {

    const [data, setSetdata] = useState([])
    const [details, setDetails] = useState({
        email: '',
        first_name: '',
        last_name: '',
        dob: 0,
        mobile_num: 0,
        reg_name: '',
        relg_name: '',
        edu: [],
        exp: [],
        application_no: 0,
        job: []

    })
    const { email, first_name, last_name, mobile_num, application_no } = details;

    useEffect(() => {
        if (Personaldata && Personaldata?.length > 0) {
            const { first_name, last_name, dob, mobile_num, reg_name, relg_name, email, application_no } = Personaldata[0]
            const exp = JSON.parse(Personaldata[0].Experience_details)
            const edu = JSON.parse(Personaldata[0].Education_details)
            const job = JSON.parse(Personaldata[0].Job_applied)
            const details = {
                email: email,
                first_name: first_name,
                last_name: last_name,
                dob: dob,
                mobile_num: mobile_num,
                reg_name: reg_name,
                relg_name: relg_name,
                exp: exp,
                edu: edu,
                application_no: application_no,
                job: job

            }
            setDetails(details)
        }
        else {
            setDetails({})
        }

    }, [Personaldata])

    const postdata = useMemo(() => {
        return {
            application_no: application_no,
        }
    }, [application_no])
    useEffect(() => {
        const getGroupNameList = async () => {
            const result = await axioslogin.post('/Applicationform/select', postdata)
            const { data, success } = result.data
            if (success === 1) {
                setSetdata(data)
            } else {
                setSetdata([])
            }
        }
        getGroupNameList()
    }, [postdata])

    const handlechange = useCallback((e, newValue) => {
        setdesgid(newValue);
    }, [setdesgid])


    // const handleSubmit = useCallback((event) => {
    //     event.preventDefault()
    //     if (desgid === 0) {
    //         warningNofity("Please Select The Designation")
    //     }
    //     else {


    //         setcount(count + 1)
    //     }
    // }, [setcount, desgid, count])
    const updatedata = useMemo(() => {
        return {
            application_no: application_no,
            desgid: desgid
        }
    }, [application_no, desgid])

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        if (desgid === 0) {
            warningNofity("Please Select The Designation")
        }
        else {
            const result = await axioslogin.post('/Applicationform/selectdesgstatus', updatedata)
            const { success } = result.data
            if (success === 1) {
                setcount(count + 1)
            }
            else {
                warningNofity("You are not Selected for the designation You are Choosen")
            }
        }
    }, [setcount, desgid, count, updatedata])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ToastContainer />
            <Paper sx={{ width: "100%", p: 1, boxShadow: 5, display: 'flex', justifyContent: 'space-between' }}>
                <Typography level="h5">Welcome <Typography color="success" level="h4">{first_name} {last_name}</Typography> </Typography>

            </Paper>
            <Paper variant="outlined" sx={{
                px: 1,
            }} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1

                    }}>
                        {/* <CssVarsProvider> */}
                        <Box sx={{ display: "flex", py: 0.3 }} >
                            {/* <PersonOutlinedIcon /> */}
                            <Typography
                                fontSize="xl2"
                                lineHeight={0}
                                // startDecorator={}
                                endDecorator={<PersonOutlinedIcon color='primary' />}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {first_name?.toLowerCase()} {last_name.toLowerCase()}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: "wrap", mt: 1 }} >
                            <Typography textColor="text.secondary"
                                startDecorator={
                                    <ManageAccountsOutlinedIcon fontSize='md' color='primary' />
                                }
                                endDecorator={
                                    <Typography>
                                        |
                                    </Typography>
                                }
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {email?.toLowerCase()}
                            </Typography>
                            <Typography textColor="text.secondary"
                                startDecorator={
                                    <LanOutlinedIcon fontSize='md' color='primary' />
                                }
                                endDecorator={
                                    <Typography>
                                        |
                                    </Typography>
                                }
                                px={1}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {mobile_num}
                            </Typography>
                            <Typography textColor="text.secondary"
                                startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                            >
                                {application_no}
                            </Typography>
                        </Box>

                        {/* </CssVarsProvider> */}
                    </Box>

                </Box>

            </Paper >
            {/* box2 */}
            < Box sx={{ mt: 2 }}>
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Education Information
                    </Typography>
                </CssVarsProvider>
                <Paper variant="outlined" sx={{
                    px: 1, mt: 0.3
                }}>
                    <EduView details={details} />


                </Paper>
            </Box >
            < Box sx={{ mt: 2 }}>
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Experience Information
                    </Typography>
                </CssVarsProvider>
                <Paper variant="outlined" sx={{
                    px: 1, mt: 0.3
                }}>
                    <ExpView details={details} />
                </Paper>
            </Box >

            <Box sx={{ mt: 2 }}>
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Select  Any Designation You Applied
                    </Typography>
                </CssVarsProvider>


                <Paper variant="outlined" sx={{
                    px: 2, mt: 0.3
                }}>
                    <Select
                        defaultValue={[]}
                        value={desgid}
                        onChange={(e, newValue) => handlechange(e, newValue)}
                        sx={{
                            minWidth: '13rem',
                        }}

                        variant='outlined'
                    >
                        <Option disabled value={0}>Select Designation You Applied</Option>
                        {
                            data?.map((val, index) => {
                                return <Option key={index} value={val.desg_slno}>{val.desg_name}</Option>
                            })
                        }
                    </Select>
                </Paper>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Button sx={{ p: 0, width: "100%" }} variant="solid" color="success"
                    onClick={handleSubmit}
                >
                    Click Here To Attent the Exam
                </Button>
            </Box>

        </Box>
    )
}

export default memo(Empdetails)