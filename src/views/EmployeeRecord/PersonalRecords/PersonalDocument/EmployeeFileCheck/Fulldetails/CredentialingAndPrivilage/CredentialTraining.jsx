import { Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialPrivileging = lazy(() => import('./CredentialPrivileging'))

const CredentialTraining = () => {
    return (
        <Box>
            <CustmTypog title={'Training Details'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Sl No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Name of the training/workshop program  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Condcuted </Typography>
                        </TableCell>


                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>a</Typography>
                        </TableCell>


                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>a</Typography>
                        </TableCell>


                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Please list your current life support certificate and the year of certification'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Certification </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Year  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Do you request area of sub specialization in your pratice at TMCH ?'} />
            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
            <Box>
                <CustmTypog title={'Declaration By Applicant'} />
                <Typography level="title-md" sx={{ ml: 1, }}> I declare that I am in sound physical and mental health .I do not have any medical legal or other suit against me before
                    a court of law or any professional bodies.I hereby declare that the information given above are true and correct to the best of my knowledge and belif.I agree if this
                    information is found to be incorrect/false the company is free to terminate my contract/service.</Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Name of the staff </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Signature</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Date</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <CustmTypog title={'Verification Status'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Academic Details </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Registration Details</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Training Details</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Orginal Certificates Verified
                                </Typography>
                            </Box>

                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Registration Verified
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Orginal Checked
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Copies received
                                </Typography>
                            </Box>

                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Screenshot attached
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    copies received
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >


                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                                    Copies Received
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Declaration By Ms Office/Hr'} />
            <Box sx={{}}>
                <Typography level="title-md" sx={{ ml: 1, pt: 1 }}>
                    The Above details are checked and verified
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Name of the staff </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Signature</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Date</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <CredentialPrivileging />
        </Box >
    )
}

export default memo(CredentialTraining)