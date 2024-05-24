import React, { memo, } from 'react'
import { Box, Card, } from '@mui/joy'
// import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import CloseIcon from '@mui/icons-material/Close';

// const HealthCheckUpHistory = lazy(() => import('./HealthCheckUpHistory'))
const HealthCheckForm = ({ Empdata, Files }) => {
    return (
        <Box sx={{ height: window.innerHeight - 170, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            {/* <CustmTypog title={itemname} /> */}
            {Files?.length !== 0 ?

                <Box sx={{
                    mt: 1,
                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {Files?.map((file, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {file.endsWith('.pdf') ? (
                                <Card>
                                    <embed
                                        src={file}
                                        type="application/pdf"
                                        height={window.innerHeight - 200}
                                        width="100%"
                                    />
                                </Card>

                            ) : (
                                <Card>
                                    <img
                                        src={file}
                                        height={window.innerHeight - 200}
                                        alt=''
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </Card>

                            )}
                        </Box>
                    ))}
                </Box>
                : <Box sx={{
                    display: "flex", alignItems: 'center', justifyContent: 'center',
                    overflowX: 'auto',
                    height: window.innerHeight - 200,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    <Box sx={{ width: '10%' }}>No Data Found</Box>
                </Box>}


            {/* <TableContainer sx={{}}>
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
            <HealthCheckUpHistory /> */}
        </Box>
    )
}

export default memo(HealthCheckForm)