import { CssVarsProvider, IconButton, Button, Card, CardContent, Avatar, CardActions } from '@mui/joy'
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
import { employeeNumber, screenInnerHeight } from 'src/views/Constant/Constant';

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

        <Paper sx={{ width: "100%", pb: 1 }}>
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
            <Card
                variant="outlined"
                sx={{
                    // to make the card resizable
                    // overflow: 'auto',
                    // width: { lg: '90%', xl: '70%' },
                    resize: 'horizontal',
                    m: 2,
                    mx: { lg: 2, xl: 30 }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex' }} >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                pr: 2,
                                "--Avatar-size": "80px",
                                "--Avatar-ringSize": "8px"
                            }}
                        >
                            <Avatar src="" size="lg" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, }} >
                                    <Typography level="title-lg">{em_name}</Typography>
                                    <Typography level="title-lg">Employee No # {em_no}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{sect_name}</Typography>
                                <Typography level="body-sm" fontFamily="monospace" >Designation</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{desg_name}</Typography>
                                <Typography level="body-sm" fontFamily="monospace" >Contract:</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{em_cont_start}</Typography>
                                <Typography level="body-sm" fontFamily="monospace" >to</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{em_cont_end}</Typography>
                                <Typography level="body-sm" fontFamily="monospace" >Category</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{ecat_name}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pl: 5 }}>
                            <Button
                                //aria-label="Like"
                                variant="outlined"
                                sx={{ borderRadius: 30 }}
                                color="danger"
                                onClick={ContractClose}
                            // fullWidth
                            // startDecorator={<CloseIcon />}

                            >
                                Contract Close
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
                {/* <CardActions>
                    <Box sx={{ px: 60, flex: 1 }}>
                        <Button
                            //aria-label="Like"
                            // variant="outlined"
                            color="primary"
                            onClick={ContractClose}
                            fullWidth
                        // startDecorator={<CloseIcon />}

                        >
                            Contract Close
                        </Button>
                    </Box>
                </CardActions> */}
            </Card>
            {/* <Paper square elevation={0} sx={{ display: "flex", flexDirection: 'row-reverse' }}  >
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
            </Paper> */}
        </Paper >

    )
}

export default memo(Direct_Contract_Close) 