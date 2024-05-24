import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';
import moment from 'moment'

const Expview = ({ details }) => {
    const { exp } = details;
    return (
        <TableContainer>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody>
                    <TableRow sx={{ p: 0 }}>
                        {/* <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>Sl No </Typography>
                        </TableCell> */}
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>EmployerName </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>JobTitle</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>StartDate</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>EndDate</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>AdditionalInformation</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography textColor="#000000" sx={{ ml: 1 }}>CurrentlyWorking</Typography>
                        </TableCell>
                    </TableRow>
                    {exp.map((val, index) => {
                        return (
                            <TableRow sx={{ p: 0 }} key={val.id}>
                                {/* <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}></Typography>
                                </TableCell> */}
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Employer === "" ? "not updated" : val?.Employer} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.jobexp === "" ? "not updated" : val?.jobexp} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{val?.expstartdate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{val?.expenddate === 0 ? "not updated" : moment(val?.expenddate).format('DD-MM-YYYY')} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Additionalinf === "" ? "not updated" : val?.Additionalinf} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{val?.Workingstatus === false ? "No" : val?.Workingstatus === true ? "Yes" : "not updated"}</Typography>
                                </TableCell>
                            </TableRow>

                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default memo(Expview)