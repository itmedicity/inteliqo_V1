import { Box, Button, Modal, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ModalClose from '@mui/joy/ModalClose';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';


const Expmodalinformation = lazy(() => import('./Expmodalinformation'))
const Edumodalinformation = lazy(() => import('./Edumodalinformation'))
const Vacancylistinf = lazy(() => import('./Vacancylistinf'))


const MainModal = ({ isModalOpen, setIsModalOpen, formdata, education, handleOnSave, expdata, edudata, eduname, vacancydata, selectedVacancies, setSelectedVacancies }) => {
    const { name, lname, email, mobile, date } = formdata
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
                            <Vacancylistinf vacancydata={vacancydata} selectedVacancies={selectedVacancies} setSelectedVacancies={setSelectedVacancies} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <CustmTypog title={'Your Information'} />
                            <TableContainer sx={{ mt: 2 }}>
                                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                    <TableBody>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Name </Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography sx={{ ml: 1 }}>{name === '' ? "Not Updated" : name} </Typography>
                                                    <Typography sx={{ ml: 1 }}>{lname} </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>   Email Address</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>{email === '' ? "Not Updated" : email}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}> Mobile Number</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}> {mobile === 0 ? 'Not Updated' : mobile}</Typography>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>Date of Birth</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography sx={{ ml: 1 }}>{date === 0 ? "Not Updated" : moment(date).format('DD-MM-YYYY')}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Expmodalinformation formdata={formdata} education={education} expdata={expdata} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Edumodalinformation formdata={formdata} education={education} edudata={edudata} eduname={eduname} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={handleOnSave}
                            >
                                Submit Application
                                {/* <SaveIcon /> */}
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(MainModal)