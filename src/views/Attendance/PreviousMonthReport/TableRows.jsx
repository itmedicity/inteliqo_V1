import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { memo } from 'react';
import moment from 'moment';

const TableRows = ({ data }) => {
    return (
        <TableContainer>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        {/* Define your table headers based on your data structure */}
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Emp No</TableCell>
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Date</TableCell>
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Shift</TableCell>
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Shift In</TableCell>
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Shift Out</TableCell>
                        <TableCell align="center" sx={{ color: 'black', fontSize: 16, fontWeight: 550 }} size='small' >Punch Time</TableCell>
                        {/* Add more headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{row?.em_no}</TableCell>
                            <TableCell align="center">{moment(new Date(row?.duty_day)).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align="center">{row?.shft_desc}</TableCell>
                            <TableCell align="center">{moment(new Date(row?.shift_in)).format('DD-MM-YYYY HH:mm')}</TableCell>
                            <TableCell align="center">{moment(new Date(row?.shift_out)).format('DD-MM-YYYY HH:mm')}</TableCell>
                            <TableCell align="center">
                                {row.new_field && row.new_field.length > 0 ? (
                                    row?.new_field.map((punch, i) => (
                                        <Box key={i}>
                                            <Box> {punch}</Box>
                                        </Box>
                                    ))

                                ) : (
                                    'No Punch'
                                )}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default memo(TableRows)