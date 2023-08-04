import { CssVarsProvider } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import { addDays, differenceInDays } from 'date-fns'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import WrongLocationRoundedIcon from '@mui/icons-material/WrongLocationRounded';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import moment from 'moment';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useCallback } from 'react';

const EXistContractDetl = ({ id, no, fine, setFine, setContractEnd, setContractStart, setgraceperiod, setattendanceDays, setOldctaegory }) => {

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
    const [view, setView] = useState(0)

    //destructuring
    const { em_cont_start, em_cont_end, em_no, em_name, ecat_name, grace_period, desg_name, sect_name } = formData
    //use effect for getting existing contract details
    useEffect(() => {
        const getcontractInformation = async () => {
            const result = await axioslogin.get(`/empcontract/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_end, em_no, em_id,
                    em_category, em_name, ecat_name, cont_grace, dept_name, desg_name, sect_name } = data[0]
                const frmData = {
                    em_cont_start: em_cont_start === null ? 'NOT UPDATED' : em_cont_start,
                    em_cont_end: em_cont_end === null ? 'NOT UPDATED' : em_cont_end,
                    em_no: em_no,
                    em_id: em_id,
                    em_name: em_name === null ? 'NOT UPDATED' : em_name,
                    ecat_name: ecat_name === null ? 'NOT UPDATED' : ecat_name,
                    grace_period: cont_grace === null ? 'NOT UPDATED' : cont_grace,
                    dept_name: dept_name === null ? 'NOT UPDATED' : dept_name,
                    desg_name: desg_name === null ? 'NOT UPDATED' : desg_name,
                    sect_name: sect_name === null ? 'NOT UPDATED' : sect_name
                }
                setFormData(frmData)
                setContractEnd(em_cont_end)
                setContractStart(em_cont_start)
                setgraceperiod(cont_grace)
                setOldctaegory(em_category)
                const date = new Date(em_cont_end)
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const length = differenceInDays(new Date(em_cont_end), new Date(firstDay))
                setattendanceDays(length)
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

    //function for Closing first contract
    const dispatch = useDispatch()
    const ContractClose = useCallback(() => {
        if ((em_cont_end !== '' && grace_period !== '') && (addDays(new Date(em_cont_end), grace_period) < new Date())) {
            dispatch({
                type: Actiontypes.FETCH_CONTRACT_CLOSE_DATA, payload: {
                    status: 1,
                    em_cont_close: 'C',
                    em_cont_compl_status: 'C',
                    em_cont_renew: 'R',
                    em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
                    em_cont_renew_date: moment(new Date()).format('YYYY-MM-DD'),
                    em_no: id
                }
            })
            succesNofity("Contract Closed Successfully")
            setView(1)
        }
        else {
            warningNofity("Grace Period Not Completed")
            setView(0)
        }
    }, [em_cont_end, grace_period])


    return (
        <Fragment>
            <Paper square elevation={0} sx={{ display: "flex", p: 1, }}  >
                <Box sx={{ flex: 1 }}>
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                            Existing Contract Details
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {
                    view === 1 ? <Box sx={{ flex: 0, pt: 0.5, pr: 1.5 }}>
                        <CssVarsProvider>
                            <Typography sx={{ color: 'green' }}>
                                Done!
                            </Typography>
                        </CssVarsProvider>
                    </Box> : null
                }
                {
                    view === 1 ? <Box sx={{ flex: 0, }} ><Chip
                        icon={
                            <IconButton disabled
                                className="p-1" >
                                <WrongLocationRoundedIcon size={22} />
                            </IconButton>
                        }
                        label="Contract Close"
                        clickable={false}
                    /> </Box> : <Box sx={{ flex: 0, pl: 0.3 }} >
                        <Chip
                            icon={
                                <IconButton disabled
                                    className="p-1" >
                                    <WrongLocationRoundedIcon className="text-info" size={22} />
                                </IconButton>
                            }
                            label="Contract Close"
                            onClick={ContractClose}
                            clickable={true}
                        />
                    </Box>
                }
            </Paper>
            <Paper sx={{ p: 0.5, mt: 0.5, display: 'flex', width: '100%', justifyContent: "space-evenly", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "row" } }}>
                <Paper square elevation={3}
                    sx={{ p: 0.5, mt: 0.5, display: 'flex', width: '50%', alignItems: "center", justifyContent: "space-evenly", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }}>
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
                    sx={{ p: 0.5, mt: 0.5, display: 'flex', width: '50%', alignItems: "center", justifyContent: "space-evenly", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
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
        </Fragment>
    )
}

export default EXistContractDetl