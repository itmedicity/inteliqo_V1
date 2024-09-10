import React, { lazy, memo, useCallback } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const AssesmentSheetMark = lazy(() => import('./AssesmentSheetMark'))

const AssesmentSheet = ({ Empdata, itemname, setformid }) => {
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
            <Box sx={{ mt: 1 }}>
                <CustmTypog title={'Employee details'} />
                <TableContainer sx={{}}>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Name Of Candidate </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Job Position</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Department</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <AssesmentSheetMark Empdata={Empdata} />

                </TableContainer>
            </Box>
            {/* </Box>

            </Modal > */}
        </Box >
    )
}

export default memo(AssesmentSheet)