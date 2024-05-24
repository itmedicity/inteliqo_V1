import { Box, IconButton, Typography } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const ViewDataModal = ({ itemname, setformid, Empdata }) => {
    const toRedirectToHome = useCallback(() => {
        setformid(0)
    }, [setformid])
    return (
        <Box>
            <Box >
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                {itemname}
                            </Typography>
                        </Box>
                        <Box >
                            <IconButton
                                variant="outlined"
                                size='xs'
                                color="danger"
                                onClick={toRedirectToHome}
                                sx={{ color: '#ef5350', }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <TableContainer sx={{ mt: 2 }}>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>

                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Position Applying For  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Date Of Joining</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === null ? "Not Updated" : moment(Empdata?.em_doj).format('DD-MM-YYYY')} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> Name</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Qualification</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography sx={{ ml: 1 }}>{Empdata?.edu_desc === '' ? "Not Updated" : Empdata?.edu_desc} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Gender</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{Empdata?.em_gender === 0 ? "Not Updated" : Empdata?.em_gender === 1 ? "Male" : Empdata?.em_gender === 2 ? "FeMale" : 'Other'}</Typography>

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Age</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? "Not Updated" : Empdata?.em_age_year}  </Typography>

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Date Of Birth</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_dob === null ? "Not Updated" : moment(Empdata?.em_dob).format('DD-MM-YYYY')}  </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Contact Address</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.addressPermnt1 === '' ? "Not Updated" : Empdata?.addressPermnt1} ,{Empdata?.addressPermnt2 === '' ? "Not Updated" : Empdata?.addressPermnt2} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Phone Number</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.em_mobile === 0 ? "Not Updated" : Empdata?.em_mobile} </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ mt: 1 }}>
                    <TableBody>
                        <TableRow sx={{}}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                <Typography sx={{ ml: 1 }}>Do you have any relative or friend who is employed in Travancore Medicity ?</Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{}}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Name</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Designation</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{}}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}> {Empdata?.relatives_friends_name === '' ? "Not Updated" : Empdata?.relatives_friends_name}  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}></Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ mt: 1 }}>
                    <TableBody>
                        <TableRow sx={{}}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                <Typography sx={{ ml: 1 }}>Have you worked with us before  ?</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{}}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                <Typography sx={{ ml: 1, }}>{Empdata?.recruitment_unit === '' ? "Not Updated" : Empdata?.recruitment_unit} </Typography>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        //     </Modal>
        // </Box>
    )
}

export default memo(ViewDataModal) 