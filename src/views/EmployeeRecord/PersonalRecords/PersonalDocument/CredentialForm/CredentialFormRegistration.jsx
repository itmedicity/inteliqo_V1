import { Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const CredentialTraining = lazy(() => import('./CredentialTraining'))

const CredentialFormRegistration = () => {
    return (
        <Box>
            <CustmTypog title={'Registration Details'} />
            <TableContainer sx={{ mt: 1 }}>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}>Sl No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Name Of the registration  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Registration Number </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Registration Date </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Validity </Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
                <CustmTypog title={'Academic Details'} />
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}>Sl No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Course  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Name Of the Institution </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Board/University </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Year </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Specialization </Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1 }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, }}>a </Typography>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
                <CredentialTraining />
            </TableContainer>

        </Box>
    )
}

export default memo(CredentialFormRegistration) 