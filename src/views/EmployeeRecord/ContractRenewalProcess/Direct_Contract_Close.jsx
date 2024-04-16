import { CssVarsProvider, IconButton, Button } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import { differenceInDays } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import CloseIcon from '@mui/icons-material/Close';
import { employeeNumber } from 'src/views/Constant/Constant';

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
    const { em_cont_start, em_cont_end, em_no, em_name, ecat_name, grace_period,
        desg_name, sect_name } = formData
    const defaultState = useMemo(() => {
        return {
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
    }, [])

    //use effect for getting existing contract details
    useEffect(() => {
        const getcontractInformation = async () => {
            const result = await axioslogin.get(`/empcontract/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_end, em_no, em_id,
                    em_name, ecat_name, cont_grace, dept_name, desg_name, sect_name } = data[0]
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

    }, [no])

    //update hrm_emp_contract_detl table
    const contractclose = useMemo(() => {
        return {
            status: 1,
            em_cont_close: 'C',
            em_cont_compl_status: 'C',
            em_cont_renew: 'R',
            em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
            em_cont_renew_date: moment(new Date()).format('YYYY-MM-DD'),
            em_no: id,
            edit_user: employeeNumber(),
            em_id: no,
            em_status: 0
        }
    }, [id, no])

    const redirect = useCallback(() => {
        history.push('/Home/Contract_end_details')
    }, [history])

    //FUNCTION FOR CLOSING CONTRACT
    const ContractClose = useCallback(async () => {
        const result = await axioslogin.patch('/empcontract/contractrenew', contractclose)
        const { success, message } = result.data
        if (success === 2) {
            setFine(0)
            setFormData(defaultState)
            history.push('/Home/Contract_end_details')
            succesNofity(message)
        } else {
            errorNofity(`Contact IT - ${JSON.stringify(message)}`)
        }
    }, [contractclose, defaultState, history])


    return (
        <Fragment>
            <ToastContainer />
            <Paper sx={{ width: "100%" }}>
                <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Direct Contract Close
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pl: 0.5, mt: 0.5 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='xs' color="danger" onClick={redirect}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper variant='outlined' sx={{ p: 0.5, mt: 0.5, display: 'flex', width: '100%', justifyContent: "space-evenly", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "row" } }}  >
                    <Paper square elevation={0}
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
                    <Paper square elevation={0}
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
                                    <Typography level="body1">{moment(new Date(em_cont_start)).format('DD-MM-YYYY')}</Typography>
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
                                    <Typography level="body1">{moment(new Date(em_cont_end)).format('DD-MM-YYYY')}</Typography>
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
                <Paper square elevation={0} sx={{ display: "flex", flexDirection: 'row-reverse' }}  >
                    <Box sx={{}}>
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={ContractClose}
                                fullWidth
                                startDecorator={<CloseIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Contract Close
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Paper>
        </Fragment >
    )
}

export default memo(Direct_Contract_Close) 