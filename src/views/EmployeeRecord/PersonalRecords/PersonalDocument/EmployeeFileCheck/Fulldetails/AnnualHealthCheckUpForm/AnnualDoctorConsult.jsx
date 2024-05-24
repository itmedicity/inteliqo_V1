import React, { lazy, memo, } from 'react'
import { Box, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const AnnualHealthother = lazy(() => import('./AnnualHealthother'))


const AnnualDoctorConsult = () => {
    return (
        <Box >
            <CustmTypog title={'Doctors Consultation'} />
            <TableContainer sx={{ mt: 2 }}>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Name of the Candidate </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Gender  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Dept </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>MRD No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Unit </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Blood Group </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Consultant </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Date of Consultation </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Time of Consultation </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Pulse(/min) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Bp(mmHg)</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Resp(/min) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Temp(F) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Weight(kg) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Height(cm) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>BMI </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, }}>a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> a</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, }}>a </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1, }}> a</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <CustmTypog title={'General Examination'} />
                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Physican Note </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "80%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                            </TableCell>

                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Investigations (If required) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "80%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Blood tests:</Typography>
                                <Box sx={{ display: "flex" }}>


                                    <Box sx={{ borderTop: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', pt: 1, display: 'flex', width: '25%' }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                        // checked={workstation}
                                        // onchange={(e) => setworkstation(e.target.checked)}

                                        />
                                        <Typography level="title-md" sx={{ ml: 1 }}> HBs Ag titer</Typography>
                                    </Box>
                                    <Box sx={{ borderTop: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', pt: 1, display: 'flex', width: '25%' }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                        // checked={workstation}
                                        // onchange={(e) => setworkstation(e.target.checked)}

                                        />
                                        <Typography level="title-md" sx={{ ml: 1, }}> Chest X-ray</Typography>
                                    </Box>
                                    <Box sx={{ borderTop: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', pt: 1, display: 'flex', width: '25%' }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                        // checked={workstation}
                                        // onchange={(e) => setworkstation(e.target.checked)}

                                        />
                                        <Typography level="title-md" sx={{ ml: 1 }}>Blood Grouping</Typography>
                                    </Box>
                                    <Box sx={{ borderTop: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', pt: 1, display: 'flex', width: '25%' }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                        // checked={workstation}
                                        // onchange={(e) => setworkstation(e.target.checked)}

                                        />
                                        <Typography level="title-md" sx={{ ml: 1 }}> Serology</Typography>
                                    </Box>
                                </Box>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>

                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>HBs Ag Titer value </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>&gt;100 IU/L</Typography>
                                </Box>

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>12-100 IU/L</Typography>
                                </Box>

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>0-12 IU/L</Typography>
                                </Box>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Vaccination required </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>First Dose</Typography>
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1, }}>(O Month)</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>Second Dose</Typography>
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1, }}>(1 Month)</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>Third Dose</Typography>
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1, }}>(6 Month)</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "10%" }}>
                                <Box sx={{ pt: 1, display: 'flex', }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                    <Typography level="title-md" sx={{ ml: 1, }}>Booster Dose</Typography>
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1, }}>(If Required)</Typography>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <AnnualHealthother />
        </Box>
    )
}

export default memo(AnnualDoctorConsult)