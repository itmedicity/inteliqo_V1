import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';

const DueClearanceDept = lazy(() => import('./DueClearanceDept'))


const DuesClearance = ({ Empdata, itemname, setformid }) => {
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
                            </IconButton></Box>
                    </Box>
                </Paper>
            </Box>
            <Box >
                {/* <CustmTypog title={itemname} /> */}
                <TableContainer sx={{ mt: 2 }}>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Please Provide no dues clearance to Dr/Ms/Mr. </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>EMP No.</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Designation  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Date Of Joining </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Department  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Last Working Date </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>PF No </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Esi No </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box sx={{ ml: 1, mt: 1 }}>
                        <Typography> Please ensure that there is nothing pending from the person in form of documents ,books, company assets,ID-card ,uniform items etc.In case if there
                            is anything outstanding please indicate details(use separate sheet if necessary).Also please sign this certificate in appropriate place.
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <CustmTypog title="Comments by HRD" />
                        <Typography>

                        </Typography>
                    </Box>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>Details of Leave :Availed </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>CL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>SL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>PL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>Balance in Credit </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>CL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>SL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>PL </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table sx={{ mt: 0, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Name </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Signature</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Date </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box sx={{ mt: 1 }}>
                        <CustmTypog title="Comments by Unit Incharge/Supervisor/Head of the Department" />
                        <Typography sx={{ ml: 1 }}></Typography>
                        <Typography sx={{ ml: 1 }}>He/She handed over change to Mr/ms _________ and there is nothing outstanding /the following are outstanding against him/her.</Typography>
                    </Box>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Department Dues if any,please specify </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table sx={{ mt: 0, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Name </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Signature  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}>Date </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                    <Typography sx={{ ml: 1 }}> </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <DueClearanceDept />
            </Box>
        </Box >
    )
}

export default memo(DuesClearance) 