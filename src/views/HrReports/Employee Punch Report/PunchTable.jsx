import React, { memo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/joy';

const PunchTable = ({ tableData }) => {

    return (

        <TableContainer>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        {/* Define your table headers based on your data structure */}
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >Id</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >Name</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >dep name</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >sec name</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >shift in</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >shift out</TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 16, }} size='small' >Punch</TableCell>
                        {/* Add more headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row?.em_no}</TableCell>
                            <TableCell>{row?.em_name}</TableCell>
                            <TableCell>{row?.dept_name}</TableCell>
                            <TableCell>{row?.sect_name}</TableCell>
                            <TableCell>{row?.shift_in}</TableCell>
                            <TableCell>{row?.shift_out}</TableCell>
                            <TableCell>
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

    );
};

export default memo(PunchTable);