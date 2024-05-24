import React, { memo, useState, useEffect, lazy, } from 'react'
import { Box, Modal, Typography } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ModalClose from '@mui/joy/ModalClose';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const Joiningpdfview = lazy(() => import('./Joiningpdfview'))


const JoiningLettermodal = ({ isModalOpen, setIsModalOpen, personaldata, dataitem }) => {

    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        application_no: 0,
        em_no: 0,
        desgid: 0
    })

    const { first_name, last_name, application_no, em_no, desgid } = details;

    useEffect(() => {
        if (personaldata && personaldata.length > 0) {
            const { first_name, last_name, application_no, em_no, desgid } = personaldata[0]
            const details = {
                first_name: first_name,
                last_name: last_name,
                application_no: application_no,
                em_no: em_no,
                desgid: desgid
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
                        width: 600,
                        height: 480,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 0
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
                        <CustmTypog title={'Information About Employe'} />

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
                                            <Typography sx={{ ml: 1 }}> Application No</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{application_no === '' ? "Not Updated" : application_no}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}> Department</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}> {dataitem?.dept_name === '' ? 'Not Updated' : dataitem?.dept_name}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}>Designation</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}> {dataitem?.desg_name === '' ? 'Not Updated' : dataitem?.desg_name}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}>Emp No</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography sx={{ ml: 1 }}> {em_no === 0 ? 'Not Updated' : em_no}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ mt: 1 }}>
                            <Joiningpdfview details={details} desgid={desgid} setIsModalOpen={setIsModalOpen} />
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(JoiningLettermodal)