import { Box, Modal, ModalClose, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import React, { lazy, memo, useEffect, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const OfferletterSend = lazy(() => import('./OfferletterSend'))


const OfferLetterModal = ({ isModalOpen, setIsModalOpen, data, personaldata, count, setcount, item }) => {
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const [details, setDetails] = useState({
        email: '',
        first_name: '',
        last_name: '',
        dob: 0,
        mobile_num: 0,
        reg_name: '',
        relg_name: '',
        // edu: [],
        // exp: [],
        application_no: 0,
        gender: 0,
        address1: '',
        address2: '',

    })


    const { email, first_name, last_name, dob, mobile_num, application_no } = details;

    useEffect(() => {
        if (personaldata && personaldata.length > 0) {

            const { first_name, last_name, dob, mobile_num, reg_name, relg_name, email, application_no, gender, address1, address2 } = personaldata[0]
            // const exp = JSON.parse(personaldata[0].Experience_details)
            // const edu = JSON.parse(personaldata[0].Education_details)

            const details = {
                email: email ? email.toUpperCase() : '',
                first_name: first_name ? first_name.toUpperCase() : '',
                last_name: last_name ? last_name.toUpperCase() : '',
                dob: dob,
                mobile_num: mobile_num,
                reg_name: reg_name,
                relg_name: relg_name,
                // exp: exp,
                // edu: edu,
                application_no: application_no,
                gender: gender === 1 ? "MALE" : gender === 2 ? "FEMALE" : gender === 3 ? "OTHER" : "Not Updated",
                address1: address1 ? address1.toUpperCase() : 'Not Updated',
                address2: address2 ? address2.toUpperCase() : 'Not Updated'

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
                        width: 900,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <CustomBackDrop open={openBkDrop} text="Please wait !. Offer Letter Generating In Process" />
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography level="h4" sx={{ ml: 1 }}>Application No #
                                    <Typography color="primary"> {application_no === '' ? "Not Updated" : application_no} </Typography>
                                </Typography>
                                <Typography level="h4" sx={{ ml: 3 }}>Designation Selected For #
                                    <Typography level="title-md" color="primary">{data?.designation_name} </Typography>
                                </Typography>
                            </Box>

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
                        <OfferletterSend details={details} data={data} setIsModalOpen={setIsModalOpen} count={count}
                            setcount={setcount} setOpenBkDrop={setOpenBkDrop} item={item}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(OfferLetterModal)