import { Box } from '@mui/system'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
// import LeaveCancelUserModel from './Component/LeaveCancelUserModel';

const RequestedLeaveTable = () => {
    const [leavecanceldetl, setleavecanceldetl] = useState([])
    return (
        <Box sx={{ flex: 1, p: 0.5 }} >
            <TableContainer component={Paper}>
                <Table sx={{}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Request Type</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Date</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Reason</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Cancel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            leavecanceldetl && leavecanceldetl.map((val, index) => {

                                return < TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{val.leavetype} </TableCell>
                                    <TableCell align="left">{val.leave_date}</TableCell>
                                    <TableCell align="left">{val.leave_reason}</TableCell>
                                    <TableCell align="left">
                                        <IconButton size="small"
                                        // onClick={(e) => {
                                        //     LeaveCancel(val.leavetypeid, val.leave_slno)
                                        // }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>

                </Table>

            </TableContainer>
        </Box>
    )
}

export default RequestedLeaveTable