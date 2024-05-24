import React, { memo, useCallback } from 'react'
import { Box, IconButton, Table, Typography } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Paper, TableContainer, } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

// const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const Vaccination = ({ Empdata, setShowGeneral, Files, Vaccdata }) => {

    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box>
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Vaccination Card
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
            <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>

                {/* {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    : */}
                <Box >

                    <TableContainer sx={{}}>
                        <Table sx={{ mt: 1, p: 0, width: '100%' }} size='sm' aria-label="basic table" borderAxis="both" >
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Name</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Gender  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>DOB </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_dob === '' ? 'Not Updated' : Empdata?.em_dob} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Blood Group </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Date of Joining </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Emp.ID </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Department </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Designation </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Mobile No </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_mobile === '' ? 'Not Updated' : Empdata?.em_mobile} </Typography>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>

                        <CustmTypog title='Vaccination Details' />
                        <Table sx={{ mt: 1, p: 0, width: '100%' }} size='sm' aria-label="basic table" borderAxis="both">

                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>Vaccination </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>First Dose  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Second Dose </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Third Dose </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Booster Dose </Typography>
                                    </td>


                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>Hepatitis B</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Vaccdata?.firstdose_date === null ? 'Not Updated' : Vaccdata?.firstdose_date} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.second_dose_given_date === null ? 'Not Updated' : Vaccdata?.second_dose_given_date}</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.third_dose_given_date === null ? 'Not Updated' : Vaccdata?.third_dose_given_date} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.booster_dose_given_date === null ? 'Not Updated' : Vaccdata?.booster_dose_given_date}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>Vaccination Given By</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Vaccdata?.first_verified === null ? 'Not Updated' : Vaccdata?.first_verified} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.second_verified === null ? 'Not Updated' : Vaccdata?.second_verified}</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.third_verified === null ? 'Not Updated' : Vaccdata?.third_verified} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.booster_verified === null ? 'Not Updated' : Vaccdata?.booster_verified}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>Verifed by Hic</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Vaccdata?.em_name_first_verified === null ? 'Not Updated' : Vaccdata?.em_name_first_verified} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.em_name_second_verified === null ? 'Not Updated' : Vaccdata?.em_name_second_verified}</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.em_name_third_verified === null ? 'Not Updated' : Vaccdata?.em_name_third_verified} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.em_name_booster_verified === null ? 'Not Updated' : Vaccdata?.em_name_booster_verified}</Typography>
                                    </td>

                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>Verifed Date</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Vaccdata?.hic_first_dose_date === null ? 'Not Updated' : Vaccdata?.hic_first_dose_date} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.hic_second_dose_date === null ? 'Not Updated' : Vaccdata?.hic_second_dose_date}</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.hic_thirdt_dose_date === null ? 'Not Updated' : Vaccdata?.hic_thirdt_dose_date} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Vaccdata?.hic_boostert_dose_date === null ? 'Not Updated' : Vaccdata?.hic_boostert_dose_date}</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </TableContainer>

                </Box>
                {/* } */}

            </Box>
        </Box >
    )
}

export default memo(Vaccination) 