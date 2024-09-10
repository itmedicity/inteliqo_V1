import { Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = lazy(() => import('./CredentialOperating'))


const CredentialPrivileging = () => {
    return (
        <Box>
            <CustmTypog title={'Privileging'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Are you covered by professional liability insurance </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>  <JoyCheckbox
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Please give details </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Do You Need ?'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Outpatient privilege ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>  <JoyCheckbox
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Request clinical days and time </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>R</Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Admitting Privilege ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>  <JoyCheckbox
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /></Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>Operating(Invasive procedure)privilege ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, pt: 1, textTransform: 'capitalize', textAlign: 'center' }}>  <JoyCheckbox
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title={'Operating Privilege'} />
            <Box sx={{ ml: 1 }}>
                <Typography level="title-md">
                    Operating privilege request can be listed in a separate sheet to level of supervision required.Your logbook will be a useful guide.Privilege
                    to perform emergency life saving procedure is automatially granted to all staff physicians.
                </Typography>
                <Typography level="title-md">
                    Please
                </Typography>
                <Typography level="title-md" sx={{ mt: 1 }}>
                    Please put tick in the appropriate column against each procedure
                </Typography>
                <Typography level="title-md">
                    O - Observer only
                </Typography>
                <Typography level="title-md">
                    S - Perform procedure and activities under supervision
                </Typography>
                <Typography level="title-md">
                    A - Assist Procedures
                </Typography>
                <Typography level="title-md">
                    P - Perform procedure and activities without supervision after privileging by authority
                    (Privileging authority shall be HOD/C&P Committee as decided By the Board of Management)
                </Typography>
            </Box>
            <CredentialOperating />
        </Box>
    )
}

export default memo(CredentialPrivileging)