import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';

const DueClearanceDept = lazy(() => import('./DueClearanceDept'))
const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const DuesClearance = ({ Empdata, setShowGeneral, Files }) => {
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
                                Dues Clearance Certificate
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
                            <Box sx={{ ml: 1 }}>
                                <Box sx={{ display: "flex", width: '100%' }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Please Provide no dues clearance to Dr/Ms/Mr. </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>                    </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>EMP No.</Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> : {Empdata?.em_age_year === '' ? 'Not Updated' : Empdata?.em_age_year}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Designation </Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}> : {Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Date Of Joining </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Department</Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }} >Last Working Date</Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}>: {Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>PF No </Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}>: {Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Esi No</Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}>: {Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name}</Typography>
                                </Box>


                            </Box>

                            <Box sx={{ ml: 1, mt: 1 }}>
                                <Typography level="title-md"> Please ensure that there is nothing pending from the person in form of documents ,books, company assets,ID-card ,uniform items etc.In case if there
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
                                            <Typography level="title-md" sx={{ ml: 1 }}>Details of Leave :Availed </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>CL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>SL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>PL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Balance in Credit </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>CL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>SL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>PL </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '14%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table sx={{ mt: 0, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                <TableBody >
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Name </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Box sx={{ mt: 1 }}>
                                <CustmTypog title="Comments by Unit Incharge/Supervisor/Head of the Department" />
                                <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                                <Typography level="title-md" sx={{ ml: 1 }}>He/She handed over change to Mr/ms _________ and there is nothing outstanding /the following are outstanding against him/her.</Typography>
                            </Box>
                            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                <TableBody >
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Department Dues if any,please specify </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table sx={{ mt: 0, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                <TableBody >
                                    <TableRow sx={{ p: 0 }}>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Name </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Signature  </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography>
                                        </TableCell>
                                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <DueClearanceDept />
                    </Box>
                }
            </Box>
        </Box >
    )
}

export default memo(DuesClearance) 