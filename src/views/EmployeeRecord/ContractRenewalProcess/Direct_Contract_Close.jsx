import { CssVarsProvider } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import WrongLocationRoundedIcon from '@mui/icons-material/WrongLocationRounded';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';


const Direct_Contract_Close = () => {
    const { id, no } = useParams()
    const history = useHistory()
    const [fine, setFine] = useState(0)
    //use state for displaying existing contract details
    const [formData, setFormData] = useState({
        em_cont_start: '',
        em_cont_end: '',
        em_no: '',
        em_id: '',
        em_name: '',
        ecat_name: '',
        grace_period: '',
        dept_name: '',
        desg_name: '',
        sect_name: ''
    })
    //destructuring
    const { em_cont_start, em_cont_end, em_no, em_id, em_name, ecat_name, grace_period, dept_name, desg_name, sect_name } = formData
    const defaultState = {
        em_cont_start: '',
        em_cont_end: '',
        em_no: '',
        em_id: '',
        em_name: '',
        ecat_name: '',
        grace_period: '',
        dept_name: '',
        desg_name: '',
        sect_name: ''
    }

    //use effect for getting existing contract details
    useEffect(() => {
        const getcontractInformation = async () => {
            const result = await axioslogin.get(`/empcontract/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_end, em_no, em_id, em_cont_close,
                    em_category, em_name, ecat_name, cont_grace, dept_name, desg_name, sect_name } = data[0]
                const frmData = {
                    em_cont_start: em_cont_start,
                    em_cont_end: em_cont_end,
                    em_no: em_no,
                    em_id: em_id,
                    em_name: em_name,
                    ecat_name: ecat_name,
                    grace_period: cont_grace,
                    dept_name: dept_name,
                    desg_name: desg_name,
                    sect_name: sect_name
                }
                setFormData(frmData)

            }
        }
        getcontractInformation()
    }, [no])
    //useEffect for getting fine Deatails
    useEffect(() => {
        const getFinedetl = async () => {
            const result = await axioslogin.get(`/empfinededuction/totalfine/byemid/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                setFine(data[0].fine_sum)
            }
            else {
                setFine(0)
            }
        }
        getFinedetl()

    }, [id])
    const contractclose = {
        em_cont_close: 'C',
        em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
        em_no: id
    }
    //FUNCTION FOR CLOSING CONTRACT
    const ContractClose = async () => {
        const result = await axioslogin.patch('/empcontract/contractclose', contractclose)
        const { success, message } = result.data
        if (success === 2) {
            setFine(0)
            setFormData(defaultState)
            history.push('/Home/Contract_end_details')
            succesNofity(message)

        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    const redirect = async () => {
        history.push('/Home/Contract_end_details')
    }
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper square elevation={2} sx={{ p: 0.5, flexDirection: "row" }} >
                    <Paper square elevation={0} sx={{
                        display: "flex",
                        p: 1,

                    }}  >
                        <Box sx={{ flex: 1 }}>
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Direct Contract Close
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 0 }} >
                            <Chip
                                icon={
                                    <IconButton className="p-1" >
                                        <WrongLocationRoundedIcon className="text-info" size={22} />
                                    </IconButton>
                                }
                                label="Contract Close"
                                onClick={ContractClose}
                                clickable={true}
                            />
                        </Box>
                    </Paper>
                    <Paper sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        width: '100%',
                        justifyContent: "space-evenly",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "row" }
                        // backgroundColor: "lightcyan"
                    }}
                    >
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
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Employee ID</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{em_no}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Employee Name</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{em_name}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Deaprtment Section</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{sect_name}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Designation</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{desg_name}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Employee Category</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{ecat_name}</Typography>
                                    </CssVarsProvider>
                                </Box>
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
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Contract Start Date</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{em_cont_start}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Contract End Date</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{em_cont_end}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Grace Period</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{grace_period}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Remaining Days</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{differenceInDays(new Date(em_cont_end), new Date())}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">Fine Amount</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "space-evenly" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{fine}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        display: "flex",

                    }}  >
                        <Box sx={{ flex: 0 }}>
                            <IconButton variant="outlined" size='sm' onClick={redirect}>
                                <CssVarsProvider>
                                    <DisabledByDefaultOutlinedIcon color='primary' fontSize='large' />
                                </CssVarsProvider>
                            </IconButton>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default Direct_Contract_Close