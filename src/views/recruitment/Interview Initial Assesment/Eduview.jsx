import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';
import moment from 'moment'
const eduView = ({ details }) => {
    const { edu } = details;
    return (
        <>
            <TableContainer>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000"
                                    sx={{ ml: 1 }}>Education </Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>SchoolName </Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>StartDate</Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>EndDate</Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Graduated</Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Grade</Typography>
                            </TableCell>
                            <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Gpa</Typography>
                            </TableCell>
                        </TableRow>
                        {edu.map((val, index) => {
                            return (
                                <TableRow sx={{ p: 0 }} key={val.id}>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.education === "" ? "not updated" : val?.education === 1 ? "DOCTORATE/PHD"
                                            : val?.education === 2 ? "Masters/Post-Graduation"
                                                : val?.education === 3 ? "Graduation/Diploma"
                                                    : val?.education === 4 ? "12TH"
                                                        : val?.education === 5 ? "10TH"
                                                            : val?.education === 6 ? "Training Courses"
                                                                : val?.education === 7 ? "Certification"
                                                                    : val?.education === 8 ? "International Training"
                                                                        : val?.education === 9 ? "International Certification"
                                                                            : null

                                        } </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.schoolname === "" ? "not updated" : val?.schoolname} </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.edustartdate === 0 ? "not updated" : moment(val?.edustartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.eduenddate === 0 ? "not updated" : moment(val?.eduenddate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Graduated === false ? "No" : val?.Graduated === true ? "Yes" : "not updated"}</Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.AvgGrade === "" ? "not updated" : val?.AvgGrade} </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2} padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.gpa === "" ? "not updated" : val?.gpa} </Typography>
                                    </TableCell>
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default memo(eduView)