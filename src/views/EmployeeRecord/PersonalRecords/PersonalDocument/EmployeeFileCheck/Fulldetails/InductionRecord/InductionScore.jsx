import { Box } from '@mui/material'
import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';

const InductionScore = () => {
    return (
        <Box>

            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> Sl No</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Name of the training topic </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Duration </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Pre Test </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Post Test </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Name of the Trainer </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Signature of the Trainer </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Signature of the HOD  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> Remark</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> a </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>a</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box >
    )
}

export default memo(InductionScore)