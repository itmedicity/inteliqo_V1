import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


const PersonalDataAccademic = () => {
    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title={"Academic Details"} />
            <TableContainer sx={{ mt: 2 }}>
                {/* {edu?.map((val, index) => {
                    return ( */}
                <Table sx={{ p: 0, mt: 1, border: '1px solid #e0e0e0', width: '100%' }} >
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Education </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                {/* <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.education === "" ? "not updated" : val?.education === 1 ? "DOCTORATE/PHD"
                                    : val?.education === 2 ? "MASTERS/POST-GRADUATION"
                                        : val?.education === 3 ? "GRADUATION/DIPLOMA"
                                            : val?.education === 4 ? "12TH"
                                                : val?.education === 5 ? "10TH"
                                                    : val?.education === 6 ? "TRAINING COURSES"
                                                        : val?.education === 7 ? "CERTIFICATION"
                                                            : val?.education === 8 ? "INTERNATIONAL TRAINING"
                                                                : val?.education === 9 ? "INTERNATIONAL CERTIFICATION"
                                                                    : val?.education

                                } </Typography> */}

                            </TableCell>
                        </TableRow>

                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> School Name</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>

                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {/* {val?.schoolname === "" ? "not updated" : val?.schoolname} */}
                                </Typography>

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> Start Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>
                                    {/* {val?.edustartdate === 0 ? "not updated" : moment(val?.edustartdate).format('DD-MM-YYYY')} */}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>End Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                <Typography sx={{ ml: 1 }}>
                                    {/* {val?.eduenddate === 0 ? "not updated" : moment(val?.eduenddate).format('DD-MM-YYYY')} */}
                                </Typography>

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>
                                    Graduated</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>
                                    {/* {val?.Graduated === false ? "No" : val?.Graduated === true ? "Yes" : "not updated"} */}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Grade</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {/* {val?.AvgGrade === "" ? "not updated" : val?.AvgGrade} */}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Gpa</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {/* {val?.gpa === "" ? "not updated" : val?.gpa} */}
                                </Typography>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>
                {/* )
                })} */}
            </TableContainer>
            <CustmTypog title={"Computer awareness"} />
            <Table>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '100%' }}>
                            <Typography sx={{ ml: 1 }}>Family Details </Typography>
                        </TableCell>


                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

export default memo(PersonalDataAccademic) 