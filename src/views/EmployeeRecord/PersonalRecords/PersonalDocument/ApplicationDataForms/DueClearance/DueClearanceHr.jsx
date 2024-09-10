import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const DueClearanceHr = () => {
    return (
        <>
            {/* <CustmTypog title="Department of HR" /> */}
            <Typography level="title-md" sx={{ mt: 1 }}>
                Department of HR
            </Typography>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                            <Typography sx={{ ml: 1, }}>Notice Period </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Applicable</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Not Applicable </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>

                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography sx={{ ml: 1, }}> ID Card Received </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>

                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>

                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography sx={{ ml: 1, }}>Exit Interview Completed </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>

                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>

                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography sx={{ ml: 1, }}>Experience Certificate issued </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Yes</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>

                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>

                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography sx={{ ml: 1, pt: 1, textAlign: 'center' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>

            <Box sx={{ mt: 1 }}>
                {/* <CustmTypog title="Forwarding Comments By HRD" /> */}
                <Typography level="title-md" sx={{ mt: 1 }}>
                    Forwarding Comments By HRD
                </Typography>
                <Typography sx={{ mt: 1, ml: 1 }}></Typography>
                <Box sx={{ display: "flex" }}>
                    <Typography>Forwarded to Accounts Department</Typography>
                    <Box sx={{ ml: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </Box>
            </Box>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1 }}>Forwarded By Name </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}>Designation </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1 }}>Signature </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}>Date </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box sx={{ mt: 1 }}>
                {/* <CustmTypog title="Comments by Accounts Department" /> */}
                <Typography level="title-md" sx={{ mt: 1 }}>
                    Comments by Accounts Department
                </Typography>
                <Typography sx={{ mt: 1, ml: 1 }}></Typography>
            </Box>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1 }}> Name </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}>Designation </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1 }}>Signature </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}>Date </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                            <Typography sx={{ ml: 1, }}></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default memo(DueClearanceHr)