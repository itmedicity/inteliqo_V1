import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';

const CredentialOperating = () => {
    return (
        <Box sx={{ mt: 2 }}>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Sl No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Name of the procedure</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                O
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                S
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                A
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                P
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                Decision of the C&P committee
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>A </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>A</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                A
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                A
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                A
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                A
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>

                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Credentialing and Privileging Recommendations'} />
            <Box sx={{ ml: 1 }}>
                <Typography level="title-md">On the basis of experience ,certificates and available infrastructure in thte Hospital,the Managment will support the skills of the
                    Doctor with right technology required to carry out the procedures she/he asked for
                </Typography>
            </Box>
            <CustmTypog title={'Comments by Head of the Department'} />
            <Box sx={{ ml: 1 }}>
                <Typography level="title-md">
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Name  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Signature</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Date</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Comments by Medical Superintendent'} />
            <Box sx={{ ml: 1 }}>
                <Typography>
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Name  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Signature</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Date</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Comments and Approval by Credentialing and Privileging Committee (C & P Committee)'} />
            <Box sx={{ ml: 1 }}>
                <Typography>
                </Typography>
                <Typography level="title-md">
                    The Credentialing & privileging committee meeting held on ............ discussed the Privileges and recommended.
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>C & P Committee Chairman </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Signature</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Date</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Comments & Approval by Medical Director'} />
            <Box sx={{ ml: 1 }}>
                <Typography level="title-md">
                </Typography>

            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Signature </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Date</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

export default memo(CredentialOperating) 