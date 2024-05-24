import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Typography } from '@mui/joy';


const AssesmentMark = ({ data }) => {
    return (
        <>
            <CustmTypog title={'Assesment Mark'} />
            <TableContainer>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000"
                                    sx={{ ml: 1 }}>Initial assesment mark </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Hr   </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Incharge </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Hod  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Ms  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Dms  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Operation  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Ceo  </Typography>
                            </TableCell>


                        </TableRow>

                        <TableRow sx={{ p: 0 }} >
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.mark} </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.Hrmark === undefined ? 0 : data?.Hrmark} </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> {data?.inchargemark === undefined ? 0 : data?.inchargemark}</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> {data?.Hodmark === undefined ? 0 : data?.Hodmark}</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.Msmark === undefined ? 0 : data?.Msmark}</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.Dmsmark === undefined ? 0 : data?.Dmsmark} </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.Operationmark === undefined ? 0 : data?.Operationmark}</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{data?.Ceomark === undefined ? 0 : data?.Ceomark} </Typography>
                            </TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default memo(AssesmentMark)