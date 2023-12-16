import React, { useEffect, useState, memo, lazy, useMemo, useCallback } from 'react'
import { Box, Button, Modal, Typography } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ModalClose from '@mui/joy/ModalClose';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';


const Submittedexp = lazy(() => import('./Submittedexp'))
const Submittededu = lazy(() => import('./Submittededu'))

const SubmittedModal = ({ isModalOpen, setIsModalOpen, personaldata, setpersonaldata, setcount, count }) => {

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
        desgid: 0,
        status: 0
    })

    const { email, first_name, last_name, dob, mobile_num, reg_name, relg_name, application_no, desgid, status } = details;

    // console.log(application_no);
    useEffect(() => {
        if (personaldata && personaldata.length > 0) {
            const { first_name, last_name, dob, mobile_num, reg_name, relg_name, email, application_no, desgid, status } = personaldata[0]

            const exp = JSON.parse(personaldata[0].Experience_details)
            const edu = JSON.parse(personaldata[0].Education_details)

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
                desgid: desgid,
                status: status
            }

            setDetails(details)
        }
        else {
            setDetails({})
        }

    }, [personaldata])

    //for saving
    const postdata = useMemo(() => {
        return {
            application_no: application_no,
            Shortlist_status: 1,
            desgid: desgid
        }
    }, [application_no, desgid])

    const handleCloseModal = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/Applicationform/shortlistapprove', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity('Application Short Listed Sucessfully')
            setIsModalOpen(false)
            setDetails({})
            setpersonaldata([])
            // setcount(count + 1)
        } else {
            warningNofity(message)
        }

    }, [postdata, setDetails, setpersonaldata, setIsModalOpen])


    // for reject
    const rejectpostdata = useMemo(() => {
        return {
            application_no: application_no,
            Shortlist_status: 2,
            desgid: desgid
        }
    }, [application_no, desgid])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/Applicationform/shortlistapprove', rejectpostdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity('Application Rejected Sucessfully')
            setIsModalOpen(false)
            setDetails({})
            setpersonaldata([])
            // setcount(count + 1)
        } else {
            warningNofity(message)
        }

    }, [rejectpostdata, setDetails, setpersonaldata, setIsModalOpen])

    const handleClose = useCallback(async (event) => {
        event.preventDefault()
        setIsModalOpen(false)

    }, [setIsModalOpen])
    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <Box sx={{ mt: 1 }}>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <CustmTypog title={' Information'} />
                            <TableContainer sx={{ mt: 2 }}>
                                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                    <TableBody>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Name </Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{first_name === '' ? "Not Updated" : first_name} </Typography>
                                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{last_name} </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>   Email Address</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{email === '' ? "Not Updated" : email}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}> Mobile Number</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}> {mobile_num === 0 ? 'Not Updated' : mobile_num}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Region</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{reg_name === null ? "Not Updated" : reg_name}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Religion</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{relg_name === '' ? "Not Updated" : relg_name}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Date of Birth</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>{dob === 0 ? "Not Updated" : moment(dob).format('DD-MM-YYYY')}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Submittedexp details={details} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Submittededu details={details} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {status === 1 ?
                            <Button sx={{ p: 0, width: "25%" }} size='sm' variant="outlined" color="success" onClick={handleClose}>
                                Application Shortlisted
                            </Button> : status === 2 ?
                                <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="danger" onClick={handleClose} >
                                    Application Rejected
                                </Button> :
                                <>
                                    <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="danger" onClick={handleOnClick} >
                                        Reject
                                    </Button>
                                    <Button sx={{ p: 0, width: "15%" }} size='sm' variant="outlined" color="success" onClick={handleCloseModal}>
                                        Add to ShortList
                                    </Button>
                                </>

                        }

                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(SubmittedModal)