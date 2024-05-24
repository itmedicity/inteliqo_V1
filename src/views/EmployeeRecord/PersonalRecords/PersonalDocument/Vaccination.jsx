import React, { memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const Vaccination = ({ Empdata, itemname, setformid }) => {

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
            <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                <TableContainer sx={{ mt: 2 }}>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
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
                                    <Typography sx={{ ml: 1 }}>Age</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Gender  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>DOB </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_dob === '' ? 'Not Updated' : Empdata?.em_dob} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Blood Group </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Date of Joining </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Emp.ID </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Department </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Designation </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Mobile No </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_mobile === '' ? 'Not Updated' : Empdata?.em_mobile} </Typography>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                    <CustmTypog title='Vaccination Details' />
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>

                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>Vaccination </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>First Dose  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Second Dose </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Third Dose </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Booster Dose </Typography>
                                </TableCell>


                            </TableRow>

                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>Hepatitis B</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.firstdose_date === null ? 'Not Updated' : Empdata?.firstdose_date} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.second_dose_given_date === null ? 'Not Updated' : Empdata?.second_dose_given_date}</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.third_dose_given_date === null ? 'Not Updated' : Empdata?.third_dose_given_date} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.booster_dose_given_date === null ? 'Not Updated' : Empdata?.booster_dose_given_date}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>Vaccination Given By</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.first_verified === null ? 'Not Updated' : Empdata?.first_verified} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.second_verified === null ? 'Not Updated' : Empdata?.second_verified}</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.third_verified === null ? 'Not Updated' : Empdata?.third_verified} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.booster_verified === null ? 'Not Updated' : Empdata?.booster_verified}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>Verifed by Hic</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_name_first_verified === null ? 'Not Updated' : Empdata?.em_name_first_verified} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name_second_verified === null ? 'Not Updated' : Empdata?.em_name_second_verified}</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name_third_verified === null ? 'Not Updated' : Empdata?.em_name_third_verified} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name_booster_verified === null ? 'Not Updated' : Empdata?.em_name_booster_verified}</Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>Verifed Date</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.hic_first_dose_date === null ? 'Not Updated' : Empdata?.hic_first_dose_date} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.hic_second_dose_date === null ? 'Not Updated' : Empdata?.hic_second_dose_date}</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.hic_thirdt_dose_date === null ? 'Not Updated' : Empdata?.hic_thirdt_dose_date} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                    <Typography sx={{ ml: 1 }}>{Empdata?.hic_boostert_dose_date === null ? 'Not Updated' : Empdata?.hic_boostert_dose_date}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
            {/* </Box>

            </Modal > */}
        </Box >
    )
}

export default memo(Vaccination) 