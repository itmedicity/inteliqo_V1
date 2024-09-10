import React, { memo, Fragment } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
const Requestdetialspage = ({ statusData }) => {

    return (
        <TableContainer sx={{ mt: 2 }}>
            <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableHead>
                    <TableRow sx={{}}>
                        <TableCell padding='none' align='center' sx={{ color: "#0F0F0F", fontSize: 15, border: '1px solid #e0e0e0' }}>Designation</TableCell>
                        <TableCell padding='none' align='center' sx={{ color: "#0F0F0F", fontSize: 15, border: '1px solid #e0e0e0' }}>Requested date</TableCell>
                        <TableCell padding='none' align='center' sx={{ color: "#0F0F0F", fontSize: 15, border: '1px solid #e0e0e0' }}>Hod Approval Status</TableCell>
                        <TableCell padding='none' align='center' sx={{ color: "#0F0F0F", fontSize: 15, border: '1px solid #e0e0e0' }}>HR Approval Status</TableCell>
                        <TableCell padding='none' align='center' sx={{ color: "#0F0F0F", fontSize: 15, border: '1px solid #e0e0e0' }}>ED Approval Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {statusData.map((val, ind) => (
                        <Fragment key={ind}>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell align='center' sx={{ border: '1px solid #e0e0e0', p: 1 }}>
                                    {val?.desg_name.toLowerCase()}
                                </TableCell>
                                <TableCell align='center' sx={{ border: '1px solid #e0e0e0', p: 1 }}>
                                    {moment(val?.createdate).format('DD-MM-YYYY')}
                                </TableCell>
                                <TableCell align='center' sx={{ border: '1px solid #e0e0e0', p: 1 }}>
                                    {val.Hod_approval_status === 1 ? "Approved" :
                                        val.Hod_approval_status === 0 ? "Pending" :
                                            "Rejected"}
                                </TableCell>
                                <TableCell align='center' sx={{ border: '1px solid #e0e0e0', p: 1 }}>
                                    {val.Hr_approval_status === 1 ? "Approved" :
                                        val.Hr_approval_status === 0 ? "Pending" :
                                            "Rejected"}
                                </TableCell>
                                <TableCell align='center' sx={{ border: '1px solid #e0e0e0', p: 1 }}>
                                    {val.ed_approval_status === 1 ? "Approved" :
                                        val.ed_approval_status === 0 ? "Pending" :
                                            "Rejected"}
                                </TableCell>
                            </TableRow>

                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default memo(Requestdetialspage)