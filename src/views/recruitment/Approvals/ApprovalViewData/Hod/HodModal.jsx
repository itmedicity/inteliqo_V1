import { Box, Modal, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useState } from 'react'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment'

const Interviewexp = lazy(() => import('./expview'))
const Interviewedu = lazy(() => import('./eduview'))
const HodMarkModal = lazy(() => import('./HodMarkModal'))
const Assesmentmark = lazy(() => import('./AssesmentMark'))
const HodModal = ({ isModalOpen, setIsModalOpen, personaldata, data, setcount, count, setOpenRowIndex }) => {

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
        application_no: 0
    })

    const { email, first_name, last_name, dob, mobile_num, reg_name, relg_name, application_no } = details;

    useEffect(() => {
        if (personaldata && personaldata.length > 0) {
            const { first_name, last_name, dob, mobile_num, reg_name, relg_name, email, application_no } = personaldata[0]
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
                application_no: application_no
            }
            setDetails(details)
        }
        else {
            setDetails({})
        }

    }, [personaldata])
    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1500,
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
                        <Box sx={{ mt: 2 }}>
                            <Typography level="h4" sx={{ ml: 1 }}>Application No # {application_no} </Typography>

                            <CustmTypog title={' Information About Applicant'} />
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
                            <Interviewexp details={details} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Interviewedu details={details} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Assesmentmark data={data} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <HodMarkModal data={data} setIsModalOpen={setIsModalOpen} setcount={setcount} count={count} setOpenRowIndex={setOpenRowIndex} />
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </Box>
    )
}

export default memo(HodModal)