import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Typography } from '@mui/joy';
import moment from 'moment'

const eduview = ({ details }) => {
    const { edu } = details;

    return (
        <>
            <CustmTypog title={' Education Information'} />
            <TableContainer>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000"
                                    sx={{ ml: 1 }}>Education </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>School Name </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Start Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>End Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Graduated</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Grade</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Gpa</Typography>
                            </TableCell>
                        </TableRow>
                        {edu.map((val, index) => {
                            return (
                                <TableRow sx={{ p: 0 }} key={val.id}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
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
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.schoolname === "" ? "not updated" : val?.schoolname} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.edustartdate === 0 ? "not updated" : moment(val?.edustartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.eduenddate === 0 ? "not updated" : moment(val?.eduenddate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Graduated === false ? "No" : val?.Graduated === true ? "Yes" : "not updated"}</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.AvgGrade === "" ? "not updated" : val?.AvgGrade} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.gpa === "" ? "not updated" : val?.gpa} </Typography>
                                    </TableCell>
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TableContainer sx={{ mt: 2 }}>
                {edu?.map((val, index) => {
                    return (
                        <Table sx={{ p: 0, mt: 1, border: '1px solid #e0e0e0', width: '100%' }} key={val.id}>
                            <TableBody>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Education </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.education === "" ? "not updated" : val?.education === 1 ? "DOCTORATE/PHD"
                                            : val?.education === 2 ? "MASTERS/POST-GRADUATION"
                                                : val?.education === 3 ? "GRADUATION/DIPLOMA"
                                                    : val?.education === 4 ? "12TH"
                                                        : val?.education === 5 ? "10TH"
                                                            : val?.education === 6 ? "TRAINING COURSES"
                                                                : val?.education === 7 ? "CERTIFICATION"
                                                                    : val?.education === 8 ? "INTERNATIONAL TRAINING"
                                                                        : val?.education === 9 ? "INTERNATIONAL CERTIFICATION"
                                                                            : null

                                        } </Typography>

                                    </TableCell>
                                </TableRow>

                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> School Name</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>

                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.schoolname === "" ? "not updated" : val?.schoolname} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> Start Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.edustartdate === 0 ? "not updated" : moment(val?.edustartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>End Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                        <Typography sx={{ ml: 1 }}>{val?.eduenddate === 0 ? "not updated" : moment(val?.eduenddate).format('DD-MM-YYYY')} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>
                                            Graduated</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Graduated === false ? "No" : val?.Graduated === true ? "Yes" : "not updated"}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Grade</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.AvgGrade === "" ? "not updated" : val?.AvgGrade} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Gpa</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.gpa === "" ? "not updated" : val?.gpa} </Typography>
                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>
                    )
                })}
            </TableContainer> */}
        </>
    )
}

export default memo(eduview)