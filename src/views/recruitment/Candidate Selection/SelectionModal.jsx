import { Box, Modal, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useState } from 'react'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment'


const MarkDetails = lazy(() => import('./MarkDetails'))
const CandidateSelection = lazy(() => import('./CandidateSelection'))

const SelectionModal = ({ isModalOpen, setIsModalOpen, personaldata, count, setcount, setOpenRowIndex, data }) => {

    const [Select_status, setSelect_status] = useState(false);
    const [Reject_status, setReject_status] = useState(false);
    const [Hold_status, setHold_status] = useState(false);
    const [Pending_status, setPending_status] = useState(false);
    const [desg_status, setdesg_status] = useState(false);

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

    const { email, first_name, last_name, dob, mobile_num, application_no } = details;

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
                        width: 900,

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
                    <Box sx={{ overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
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
                            <MarkDetails data={data} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <CandidateSelection
                                desg_status={desg_status}
                                setdesg_status={setdesg_status}
                                setOpenRowIndex={setOpenRowIndex}
                                count={count}
                                setcount={setcount}
                                setIsModalOpen={setIsModalOpen}
                                data={data}
                                Select_status={Select_status}
                                setSelect_status={setSelect_status}
                                Reject_status={Reject_status}
                                setReject_status={setReject_status}
                                Hold_status={Hold_status}
                                setHold_status={setHold_status}
                                Pending_status={Pending_status}
                                setPending_status={setPending_status}
                                details={details} />
                        </Box>
                    </Box>


                </Box>
            </Modal>
        </Box>
    )
}

export default memo(SelectionModal)