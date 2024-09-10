import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const TrainingRecordScore = lazy(() => import('./TrainingRecordScore'))


const TrainingRecord = ({ Empdata, itemname, setformid }) => {

    const toRedirectToHome = useCallback(() => {
        setformid(0)
    }, [setformid])

    return (
        <Box >
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
            <Box >
                {/* <CustmTypog title={itemname} /> */}
                <TableContainer sx={{ mt: 1 }}>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}> Name of the Employee  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Employee Id</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Designation</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Department </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Name of HOD </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj} </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>


                </TableContainer>
                <TrainingRecordScore />
            </Box>
        </Box >
    )
}

export default memo(TrainingRecord)