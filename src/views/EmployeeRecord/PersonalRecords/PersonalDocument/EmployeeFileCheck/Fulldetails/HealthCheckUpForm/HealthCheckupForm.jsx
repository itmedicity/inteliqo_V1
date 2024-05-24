import React, { lazy, memo, useCallback, } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const HealthCheckUpHistory = lazy(() => import('./HealthCheckUpHistory'))
const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const HealthCheckupForm = ({ Empdata, itemname, setShowGeneral, Files }) => {
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box >
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Pre Employment Health Check Up Form
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
                            </IconButton></Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ height: window.innerHeight - 190, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    :
                    <Box >
                        {/* <CustmTypog title={itemname} /> */}
                        <TableContainer sx={{}}>
                            <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                <TableBody >
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> Name of the Candidate </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Gender  </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"} </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Blood Group </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Job Selected for  </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Emp.ID </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Department </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>


                        </TableContainer>
                        <HealthCheckUpHistory />
                    </Box>
                }</Box>
        </Box >
    )
}

export default memo(HealthCheckupForm)