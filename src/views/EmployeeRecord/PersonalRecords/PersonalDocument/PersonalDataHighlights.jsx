import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';

const PersonalDataHighlights = () => {
    return (
        <>
            <CustmTypog title={"Professional Highlights"} />
            <TableContainer sx={{ mt: 2 }}>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Details of Assignment Handled </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Key result areas archieved </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>s</Typography>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <CustmTypog title={"Present Salary Package"} />
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Basic </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> DA </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Allowance </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Bonus </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Others </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Total </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Expected Monthly Salary </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Time required to Join </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}></Typography>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Career Goals"} />
                    <Typography sx={{ ml: 1 }}>aaaaaaaaaaaaaaa</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Interests/Hobbies"} />
                    <Typography sx={{ ml: 1 }}>aaaaaaaaaaaaaaa</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Any other skill set /activities important to selection which have not been highlighted above "} />
                    <Typography sx={{ ml: 1 }}>aaaaaaaaaaaaaaa</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Request/Demands"} />
                    <Typography sx={{ ml: 1 }}>aaaaaaaaaaaaaaa</Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Declaration"} />
                    <Typography sx={{ ml: 1 }}>I hereby declare that the information given above are true and correct to the best of my knowledge and belief .I agree if this information is found to be incorrect/false the company is free to terminate my contract/services.
                    </Typography>
                </Box>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}> Date </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> Signature</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography sx={{ ml: 1 }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>a</Typography>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </TableContainer>
        </>
    )
}

export default memo(PersonalDataHighlights) 